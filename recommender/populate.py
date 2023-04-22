# This file contains the logic to populate the database from the available csv files.  

import csv
from movies.models import *


def createEntry(movie_id, title, genres):
    print(movie_id)
    movie = Movies.objects.create(
        id = movie_id, 
        title = title, 
        genres = genres
    )

def readCSV(path_to_csv):
    with open(path_to_csv, 'r') as file_obj:
        read_obj = csv.reader(file_obj)
        count = 0
        for row in read_obj:
            movie_id = row[0]
            title = row[1]
            genres = row[2]
            if Movies.objects.filter(id = movie_id).exists() != True: 
                try:
                    createEntry(movie_id, title, genres)
                except:
                    print("Entry for row number "+ row+" not created")
        print("total entries "+str(count))

readCSV('/home/parwaan/Desktop/mihir/recommender/dataset/output.csv')