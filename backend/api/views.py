from django.shortcuts import render
from django.contrib.auth.models import User
from django.utils import timezone
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import UserSerializer, CustomTokenObtainPairSerializer
import json
import os
from api.api_calls.api_calls_amadeus import *
from api.functions.get_location_info import *
from api.functions.airport_to_code import *


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

class CreateUserView(generics.CreateAPIView):
    permission_classes = [AllowAny]
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        user.last_login = timezone.now()
        user.save(update_fields=['last_login'])
        serializer = UserSerializer(user)
        return Response(serializer.data)

    def put(self, request):
        user = request.user
        serializer = UserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

    def delete(self, request):
        user = request.user
        user.delete()
        return Response(status=204)

# Load data from an API call
class AttractionsView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        location = request.query_params.get('location', '')
        radius = request.query_params.get('radius', 5)
        if not location:
            return Response({'error': 'Location parameter is required'}, status=400)
        
        try:
            location_info = get_location_info(location)
            if location_info:
                attractions_data = get_attrs(location_info[0], location_info[1], radius)
                return Response(attractions_data)
            else:
                return Response({'error': 'Location not found'}, status=404)
        except Exception as e:
            return Response({'error': str(e)}, status=500)

class HotelsView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        location = request.query_params.get('location', '')
        radius = request.query_params.get('radius', 5)
        if not location:
            return Response({'error': 'Location parameter is required'}, status=400)
        
        try:
            location_info = get_location_info(location)
            if location_info:
                hotels_data = get_hotels(location_info[0], location_info[1], radius)
                return Response(hotels_data)
            else:
                return Response({'error': 'Location not found'}, status=404)
        except Exception as e:
            return Response({'error': str(e)}, status=500)

