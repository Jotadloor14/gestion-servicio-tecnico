from django.urls import path
from django.contrib.auth.views import LogoutView  
from .views import (
    login_usuario, get_csrf_token, vista_login_html,
    vista_dashboard_admin, vista_dashboard_tecnico,
    vista_gestion_personal, vista_gestion_reportes,
    vista_gestion_ordenes, vista_gestion_inventario,
    vista_portal_cliente
)

urlpatterns = [
    #  Interfaz Pública del Cliente 
    path('rastreo/', vista_portal_cliente, name='portal_cliente'),

    # Interfaz de Acceso Visual General
    path('login/', vista_login_html, name='vista_login'),

    # Flujo de Cierre de Sesión Seguro (Regresa automáticamente al login)
    path('logout/', LogoutView.as_view(next_page='vista_login'), name='logout'),

    # Dirección del Dashboard del Técnico 
    path('dashboard-tecnico/', vista_dashboard_tecnico, name='vista_dashboard_tecnico'),
    
    # Perímetro Privado y Exclusivo del Administrador 
    path('dashboard/', vista_dashboard_admin, name='vista_dashboard'),
    path('personal/', vista_gestion_personal, name='vista_personal'),
    path('reportes/', vista_gestion_reportes, name='vista_reportes'),
    
    # Perímetro Operativo (Compartido entre Administradores y Técnicos)
    path('ordenes/', vista_gestion_ordenes, name='vista_ordenes'),
    path('inventario/', vista_gestion_inventario, name='vista_inventario'),
    
    # Endpoints de la API REST consumidos por JavaScript
    path('api/auth/login/', login_usuario, name='api_login'),
    path('api/auth/csrf/', get_csrf_token, name='api_csrf'),
]
