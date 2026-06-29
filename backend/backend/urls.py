from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from api.views import RegisterView, ProfileView

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # Endpoints solicitados por la actividad
    path('api/register/', RegisterView.as_view(), name='auth_register'),
    path('api/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/profile/', ProfileView.as_view(), name='auth_profile'),

    # Rutas existentes del proyecto multistock
    path('api/', include('api.urls')), 
]
