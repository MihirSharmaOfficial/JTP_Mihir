# This File contains the recommender logic. 

import numpy as np # for linear algebra
import pandas as pd # for data processing
import ast # literal_eval function in this module has been used to get data in desired format
from sklearn.feature_extraction.text import CountVectorizer # vectorization
from sklearn.metrics.pairwise import cosine_similarity # cosine similarity

# This function is used to modify the genre data.
def convert(text):
    L = []
    for i in ast.literal_eval(text):
        L.append(i['name']) 
    return L 

# This function is used to modify the cast data.
def convert3(text):
    L = []
    counter = 0
    for i in ast.literal_eval(text):
        if counter < 3:
            L.append(i['name'])
        counter+=1
    return L 

# This function is used get the director's name.
def fetch_director(text):
    L = []
    for i in ast.literal_eval(text):
        if i['job'] == 'Director':
            L.append(i['name'])
    return L 

# This function is used to remove the spaces between the words.
def collapse(L):
    L1 = []
    for i in L:
        L1.append(i.replace(" ",""))
    return L1


# This function is used to process the movie data before applying cosine similarity.
def prepocessing():
    movies = pd.read_csv('./dataset/tmdb_5000_movies.csv')
    credits = pd.read_csv('./dataset/tmdb_5000_credits.csv') 
    movies = movies.merge(credits,on='title')
    movies = movies[['movie_id','title','overview','genres','keywords','cast','crew']]
    movies.dropna(inplace=True)
    movies['genres'] = movies['genres'].apply(convert)
    movies['keywords'] = movies['keywords'].apply(convert)
    ast.literal_eval('[{"id": 28, "name": "Action"}, {"id": 12, "name": "Adventure"}, {"id": 14, "name": "Fantasy"}, {"id": 878, "name": "Science Fiction"}]')
    movies['cast'] = movies['cast'].apply(convert)
    movies['cast'] = movies['cast'].apply(lambda x:x[0:3])
    movies['crew'] = movies['crew'].apply(fetch_director)
    movies['cast'] = movies['cast'].apply(collapse)
    movies['crew'] = movies['crew'].apply(collapse)
    movies['genres'] = movies['genres'].apply(collapse)
    movies['keywords'] = movies['keywords'].apply(collapse)
    movies['overview'] = movies['overview'].apply(lambda x:x.split())
    movies['tags'] = movies['overview'] + movies['genres'] + movies['keywords'] + movies['cast'] + movies['crew']
    new = movies.drop(columns=['overview','genres','keywords','cast','crew'])
    new['tags'] = new['tags'].apply(lambda x: " ".join(x))
    return new

# This function returns a list of 5 recommended movies based on the input movie. 
def recommend(movie):
    new = prepocessing()   
    cv = CountVectorizer(max_features=5000,stop_words='english')
    vector = cv.fit_transform(new['tags']).toarray()
    vector.shape
    similarity = cosine_similarity(vector)
    index = new[new['title'] == movie].index[0]
    distances = sorted(list(enumerate(similarity[index])),reverse=True,key = lambda x: x[1])
    result_list = []
    for i in distances[1:6]:
        result_list.append(new.iloc[i[0]].movie_id)
    return result_list




