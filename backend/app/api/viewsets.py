from rest_framework import viewsets, permissions, generics
from app import models
from app.api import serializers
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.response import Response
from django.shortcuts import render, redirect
from django.contrib.auth import login
from app.forms import CustomUserCreationForm
from app.models import CustomUser
from .serializers import CustomUserSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import CustomTokenObtainPairSerializer
from rest_framework import status
from .serializers import RegisterSerializer

class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]  # Permite acesso sem autenticação

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "message": "Usuário criado com sucesso!",
            "user": {
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "cpf": user.cpf
            }
        }, status=status.HTTP_201_CREATED)

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

class IsInSpecificGroup(permissions.BasePermission):
    governo = 'governo'

    def has_permission (self, request, view):
        return request.user.groups.filter( name=self.governo).exists()

class DemandaViewSet(viewsets.ModelViewSet):
    queryset = models.Demanda.objects.all().order_by('id')
    serializer_class = serializers.DemandaSerializer
    permission_classes = [permissions.IsAuthenticated]

class CustomUserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all().order_by('id')
    serializer_class = CustomUserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_permissions(self):
        # Permite criação sem autenticação (para registro)
        if self.action == 'create':
            return []
        return [permission() for permission in self.permission_classes]

