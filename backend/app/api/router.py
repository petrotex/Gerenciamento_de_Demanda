from rest_framework.routers import DefaultRouter
from .viewsets import *

router = DefaultRouter()
router.register(r'demandas', DemandaViewSet)
router.register(r'usuarios', CustomUserViewSet, basename='usuario')