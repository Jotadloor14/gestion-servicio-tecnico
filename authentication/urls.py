from django.urls import path
from .views import login_usuario, get_csrf_token

urlpatterns = [
    path('api/auth/login/', login_usuario, name='api_login'),
    path('api/auth/csrf/', get_csrf_token, name='api_csrf'), # Ruta clave para Dennis
]
