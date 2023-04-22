from django.shortcuts import render
from rest_framework.decorators import APIView
from rest_framework.response import Response
from login.models import * 
from login.serializers import *
from rest_framework.permissions import IsAuthenticated

class RegistrationView(APIView):
    # Function to create a new user. 
    def post(self, request, *args, **kwargs):
        requester = {
            'email': request.data.get('email', None),
            'username': request.data.get('username', None),
            'password' : request.data.get('password', None), 
        }
        serializer = RegistrationSerializer(data = requester)
        data = {}
        if serializer.is_valid():
            Caccount = serializer.save()
            Caccount.save()
            data['response'] = "Successfully registered a new user"
            status = 200
        else:
            data = serializer.errors
            status = 422

        return Response(data, status)



class UserView(APIView):
    permission_classes = [IsAuthenticated]
    # Function to get the details of the user. 
    def get(self, request, *args, **kwargs):
        user = request.user
        userSerialized = UserSerializer(user)
        return Response(data = userSerialized.data, status = 200)


class PasswordReset(APIView):
    permission_classes = [IsAuthenticated]
    # Funciton to reset the password of the user. 
    def post(self, request, *args, **kwargs):
        cuser = request.user
        if cuser != None:
            serializer = ChangePasswordSerializer(data = request.data)
            if serializer.is_valid():
                oldPassword = serializer.validated_data['old_password']
                newPassword = serializer.validated_data['new_password']
                if not cuser.check_password(oldPassword):
                    return Response(data = "Old password was wrong", status=400)
                elif oldPassword == newPassword:
                    return Response(data= "Cannot keep same password", status = 420)
                else:
                    cuser.set_password(newPassword)
                    print(newPassword)
                    cuser.save()
                    return Response(status = 200, data = "Successfully updated password")
            else:
                return Response(data = serializer.errors, status = 430)
        else:
            return Response(data = "Cuser does not exist", status = 404)
            
    