from rest_framework import serializers
from login.serializers import UserSerializer
from django.core.validators import MaxValueValidator
from .models import *


class MovieSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Movies
        fields = '__all__'