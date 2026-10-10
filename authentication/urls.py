from django.urls import path
from .views import login_usuario, get_csrf_token, vista_login_html

urlpatterns = [
     path('login/', vista_login_html, name='vista_login'),
    path('api/auth/login/', login_usuario, name='api_login'),
    path('api/auth/csrf/', get_csrf_token, name='api_csrf'), # Ruta
]
