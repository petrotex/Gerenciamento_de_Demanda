from rest_framework import serializers
from app import models
from app.models import CustomUser
from django.contrib.auth.hashers import make_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from ..models import CustomUser

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)
    password2 = serializers.CharField(write_only=True, required=True)
    senha_gov = serializers.CharField(write_only=True, required=False, allow_blank=True)

    class Meta:
        model = CustomUser
        fields = ['username', 'email', 'cpf', 'password', 'password2', 'senha_gov']
        extra_kwargs = {
            'email': {'required': True},
            'cpf': {'required': True},
            'senha_gov': {'write_only': True, 'required': False}
        }

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "As senhas não coincidem."})
        return attrs

    def create(self, validated_data):
        validated_data.pop('password2')
        senha_gov = validated_data.pop('senha_gov', None)

        user = CustomUser.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            cpf=validated_data['cpf'],
            password=make_password(validated_data['password']),
            senha_gov=senha_gov
        )
        return user

    def validate_email(self, value):
        if CustomUser.objects.filter(email=value).exists():
            raise serializers.ValidationError("Este email já está em uso.")
        return value

    def validate_cpf(self, value):
        if CustomUser.objects.filter(cpf=value).exists():
            raise serializers.ValidationError("Este CPF já está cadastrado.")
        if len(value) != 14 or not value.replace('.', '').replace('-', '').isdigit():
            raise serializers.ValidationError("CPF deve estar no formato XXX.XXX.XXX-XX")
        return value

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        # Modifica para aceitar email no lugar de username
        attrs['username'] = attrs.get('email', attrs.get('username'))
        return super().validate(attrs)

class DemandaSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = models.Demanda
        fields = '__all__'

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'cpf', 'senha_gov', 'password']
        extra_kwargs = {
            'password': {'write_only': True},
            'senha_gov': {'write_only': True, 'required': False}
        }

    def create(self, validated_data):
        # Criptografa a senha principal
        validated_data['password'] = make_password(validated_data['password'])
        
        # Criptografa a senha_gov se for fornecida
        if 'senha_gov' in validated_data and validated_data['senha_gov']:
            validated_data['senha_gov'] = make_password(validated_data['senha_gov'])
        
        return super().create(validated_data)

    def validate_cpf(self, value):
        from django.core.validators import validate_email
        from django.core.exceptions import ValidationError
        
        # Validação básica de CPF (adicione sua lógica completa)
        if len(value) != 14:  # Formato XXX.XXX.XXX-XX
            raise serializers.ValidationError("CPF deve estar no formato XXX.XXX.XXX-XX")
        return value

    def validate_email(self, value):
        if CustomUser.objects.filter(email=value).exists():
            raise serializers.ValidationError("Este email já está em uso")
        return value

class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)