import json

from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.http import require_POST


@require_POST
@ensure_csrf_cookie  #Usamos este para que Dennis pueda leer la cookie CRSF desde JavaScript
def login_usuario(request):
    try:
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')

        if not username or not password:
            return JsonResponse({'error': 'Faltan credenciales'}, status=400)

        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user) #Aqui se crea la cookie de sesion de forma nativa
            return JsonResponse({
                'message': 'Inicio de sesión exitoso',
                'usuario': user.username,
                'rol': user.rol
            }, status=200)
        else:
            return JsonResponse({'error': 'Credenciales inválidas'}, status=401)

    except json.JSONDecodeError:
        return JsonResponse({'error': 'JSON inválido'}, status=400)

@ensure_csrf_cookie
def get_csrf_token(request):
    #Endpoint auxiliar indispensable para que el Frontend obtenga el token CSRF inicial
    return JsonResponse({'status': 'ready'}, status=200)