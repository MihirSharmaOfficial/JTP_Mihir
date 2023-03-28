from django.urls import path
from .views import *
from rest_framework.authtoken.views import obtain_auth_token


urlpatterns = [
    path('movie_list/', MovieList.as_view(), name = 'movies'),
    path('recommended_movies/', Recommender.as_view(), name = 'recomm'),
]