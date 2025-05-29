import django_filters
from ..models import Demanda

class DemandaFilter(django_filters.FilterSet):
    tipo = django_filters.CharFilter(field_name='tipo', lookup_expr='icontains')

    class Meta:
        model = Demanda
        fields = ['tipo']
