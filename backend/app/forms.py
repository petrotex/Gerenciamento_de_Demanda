from django import forms
from django.contrib.auth.forms import UserCreationForm
from app.models import CustomUser

class CustomUserCreationForm(UserCreationForm):
    class Meta:
        model = CustomUser
        fields = ('username', 'email', 'cpf', 'password1', 'password2')
        
    def clean_cpf(self):
        cpf = self.cleaned_data.get('cpf')
        # Adicione aqui validações adicionais do CPF se necessário
        return cpf