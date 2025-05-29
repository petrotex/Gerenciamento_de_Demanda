from django.conf import settings
from django.urls import path, include
from django.conf.urls.static import static
from django.contrib import admin
from app.api.router import router
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework import permissions
from app.api.viewsets import CustomTokenObtainPairView, RegisterView, UserDetailView

schema_view = get_schema_view(
   openapi.Info(
      title="API GOV",
      default_version='v1',
      description="Documentação automática com Swagger",
      terms_of_service="https://www.google.com/policies/terms/",
      contact=openapi.Contact(email="seuemail@exemplo.com"),
      license=openapi.License(name="BSD License"),
   ),
   public=True,
   permission_classes=[permissions.AllowAny],
)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/register/', RegisterView.as_view(), name='register'),
    path('api/login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/user/', UserDetailView.as_view(), name='user-detail'),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),  # se usar JWT
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    path('swagger.json', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    
] + static(settings.MEDIA_URL , document_root =settings.MEDIA_ROOT)