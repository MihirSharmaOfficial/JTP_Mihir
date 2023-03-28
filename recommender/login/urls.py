from django.urls import path
from login.views import *
from rest_framework.authtoken.views import obtain_auth_token


urlpatterns = [
    path('register/', RegistrationView.as_view(), name = 'register'), #not yet used
    path('login/', obtain_auth_token, name = 'login'),  #this has been used
]