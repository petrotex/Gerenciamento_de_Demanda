from datetime import timezone
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.core.validators import RegexValidator

class BaseModelQuerySet(models.QuerySet):
    def delete(self):
        self.update(deleted_at=timezone.now(), is_active=False)

class BaseManager(models.Manager):
    def get_queryset(self):
        return BaseModelQuerySet(self.model, using=self._db).filter(
            deleted_at__isnull=True,
            is_active=True
        )

class BaseModel(models.Model):
    class Meta:
        abstract = True

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(null=True, blank=True, editable=False)
    is_active = models.BooleanField(default=True, editable=False)

    objects = BaseManager()

    def delete(self, *args, **kwargs):
        self.is_active = False
        self.deleted_at = timezone.now()
        self.save()

    def hard_delete(self, *args, **kwargs):
        super(BaseModel, self).delete(*args, **kwargs)

PRIORIDADES = [
    ('baixa', 'Baixa'),
    ('media', 'Média'),
    ('alta', 'Alta'),
]

STATUS_CHOICES = [
    ('planejando', 'Planejando'),
    ('organizando', 'Organizando'),
    ('solucionando', 'Solucionando'),
]

class Demanda(BaseModel):
    tipo = models.CharField(max_length=100, null=False, blank=False)
    endereco = models.CharField(max_length=100, null=False, blank=False)
    ponto_referencia = models.CharField(max_length=100, null=False, blank=False)
    image = models.ImageField(upload_to='media/', null=False, blank=False)

    prior = models.CharField(
        max_length=10,
        choices=PRIORIDADES,
        null=False,
        blank=False
    )

    status = models.CharField(
        max_length=15,
        choices=STATUS_CHOICES,
        default='planejando',
        null=False,
        blank=False
    )

class CustomUser(AbstractUser):
    # Campos adicionais
    email = models.EmailField('E-mail', unique=True)
    
    cpf_validator = RegexValidator(
        regex=r'^\d{3}\.\d{3}\.\d{3}-\d{2}$',
        message="CPF deve estar no formato: 'XXX.XXX.XXX-XX'"
    )
    cpf = models.CharField(
        'CPF',
        max_length=14,
        validators=[cpf_validator],
        unique=True
    )
    
    senha_gov = models.CharField(
        'SenhaGov',
        max_length=128,
        blank=True,
        null=True
    )
    
    # Substitui o username padrão por email
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'cpf']  # Campos obrigatórios ao criar superuser

    def __str__(self):
        return self.email