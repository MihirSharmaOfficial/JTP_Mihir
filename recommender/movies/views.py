from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from movies.models import *
from .serializers import *
from rest_framework.response import Response
from recommender_sys import recommend

# Create your views here.

class MovieList(APIView):
    permission_classes=[IsAuthenticated]
    # Function to supply the list of all movies. 
    def get(self, request, *args, **kwargs):
        movies = Movies.objects.all()
        serializer = MovieSerializer(movies, many= True)
        return Response(status = 200, data = serializer.data)


class Recommender(APIView):
    permission_classes=[IsAuthenticated]
    # Function to provide a list of 5 recommended movies based on the input movie. 
    def post(self, request, *args, **kwargs):
        movie = request.data.get('movie', None)
        recommList = recommend(movie)
        resultList = []
        for recomm in recommList:
            if Movies.objects.filter(id = recomm).exists():
                mov = Movies.objects.filter(id = recomm)[0]
                serializedMov = MovieSerializer(mov)
                resultList.append(serializedMov.data)
        
        return Response(status = 200, data = resultList)