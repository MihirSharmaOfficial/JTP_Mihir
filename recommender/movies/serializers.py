# This file contains the serializers code, which is used to pack/unpack the data sent/recieved by the API.
from rest_framework import serializers
from login.serializers import UserSerializer
from django.core.validators import MaxValueValidator
from .models import *


class MovieSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Movies
        fields = '__all__'