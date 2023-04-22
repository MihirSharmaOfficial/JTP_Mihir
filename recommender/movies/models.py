# This file contains the defination for the database tables related to movies. 
from django.db import models

# Create your models here.

class Movies(models.Model):
    id = models.IntegerField(primary_key=True)
    title = models.CharField(max_length=1000)
    genres = models.TextField()
    
    def __str__(self) -> str:
        return str(self.title)