import json
from django.contrib.auth import authenticate, login
from django.http import JsonResponse, HttpResponseForbidden
from django.shortcuts import render, redirect
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.http import require_POST

# =============================================================================
# 🛡️ CAPA DE SEGURIDAD PERIMETRAL: CONTROL DE ACCESOS POR ROL (OWASP A01)
# =============================================================================
def rol_requerido(roles_permitidos=[]):
    def decorator(view_func):
        def _wrapped_view(request, *args, **kwargs):
            # 1. Validar que el usuario haya iniciado sesión de forma nativa
            if not request.user.is_authenticated:
                return redirect('vista_login')
            
            # 2. Obtener el rol del usuario resguardando fallos de superusuarios antiguos
            rol_actual = getattr(request.user, 'rol', 'administrador')
            
            # 3. Intercerptar intrusos si el rol no está autorizado
            if rol_actual not in roles_permitidos:
                return HttpResponseForbidden("Acceso Denegado: Su rol no tiene permisos para ver esta sección.")
            return view_func(request, *args, **kwargs)
        return _wrapped_view
    return decorator

# =============================================================================
# 🔐 PROCESAMIENTO DE AUTENTICACIÓN (API REST PARA JAVASCRIPT)
# =============================================================================
@require_POST
@ensure_csrf_cookie  
def login_usuario(request):
    try:
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')  

        if not username or not password:
            return JsonResponse({'error': 'Faltan credenciales'}, status=400)

        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user) 
            
            # Variable de respaldo blindada contra nulos para superusuarios
            rol_usuario = getattr(user, 'rol', 'administrador')
            
            # Asignación de la URL destino exacta 
            if rol_usuario == 'administrador':
                url_destino = '/dashboard/'
            elif rol_usuario == 'tecnico':
                url_destino = '/dashboard-tecnico/'
            else:
                url_destino = '/login/'
            
            return JsonResponse({
                'message': 'Inicio de sesión exitoso',
                'usuario': user.username,
                'rol': rol_usuario,
                'redirect_url': url_destino  # <-- ¡Acoplado perfectamente con el Frontend!
            }, status=200)
        else:
            return JsonResponse({'error': 'Credenciales inválidas'}, status=401)

    except json.JSONDecodeError:
        return JsonResponse({'error': 'JSON inválido'}, status=400)

@ensure_csrf_cookie
def get_csrf_token(request):
    return JsonResponse({'status': 'ready'}, status=200)

# =============================================================================
# 🖥️ ENRUTAMIENTO DE INTERFACES PÚBLICAS Y VISTAS DE PANELES (FRONTEND)
# =============================================================================
def vista_login_html(request):
    return render(request, 'login.html')

# Vistas Exclusivas del Perímetro del Administrador (HU-04, HU-14)
@rol_requerido(roles_permitidos=['administrador'])
def vista_dashboard_admin(request):
    return render(request, 'dashboard_admin.html')

@rol_requerido(roles_permitidos=['administrador'])
def vista_gestion_personal(request):
    return render(request, 'gestion_personal.html')

@rol_requerido(roles_permitidos=['administrador'])
def vista_gestion_reportes(request):
    return render(request, 'gestion_reportes.html')

# Vista Exclusiva para el Rol: Técnico 
@rol_requerido(roles_permitidos=['administrador', 'tecnico']) # Ambos pueden ver paneles, pero este es el del técnico
def vista_dashboard_tecnico(request):
    return render(request, 'dashboard_tecnico.html')

# Vistas Compartidas Operativas (Técnicos y Administradores pueden entrar)
@rol_requerido(roles_permitidos=['administrador', 'tecnico'])
def vista_gestion_ordenes(request):
    return render(request, 'gestion_ordenes.html')

@rol_requerido(roles_permitidos=['administrador', 'tecnico'])
def vista_gestion_inventario(request):
    return render(request, 'gestion_inventario.html')
# Vista Pública: Portal de Rastreo para Clientes Finales (HU-06)
def vista_portal_cliente(request):
    return render(request, 'portal_cliente.html')
