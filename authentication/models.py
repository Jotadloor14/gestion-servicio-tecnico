from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models

class UsuarioPersonalManager(BaseUserManager):
    def create_user(self, username, password=None, **extra_fields):
        if not username:
            raise ValueError('El usuario es obligatorio')
        user = self.model(username=username, **extra_fields)
        user.set_password(password) # Encriptación nativa PBKDF2 (OWASP A04)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, password=None, **extra_fields):
        extra_fields.setdefault('rol', 'administrador')
        return self.create_user(username, password, **extra_fields)

# 🔐 Modelo principal alineado con AUTH_USER_MODEL en settings.py
class UsuarioPersonal(AbstractBaseUser):
    id = models.AutoField(primary_key=True)
    username = models.CharField(unique=True, max_length=100)
    password_hash = models.CharField(max_length=255, db_column='password_hash')
    
    ROLES = [
        ('tecnico', 'tecnico'),
        ('administrador', 'administrador')
    ]
    rol = models.CharField(max_length=20, choices=ROLES)
    fecha_creacion = models.DateTimeField(auto_now_add=True)

    objects = UsuarioPersonalManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = []

    class Meta:
        db_table = 'USUARIOS' # Se conecta directo a tu tabla en MySQL Workbench

    @property
    def password(self):
        return self.password_hash

    @password.setter
    def password(self, value):
        self.password_hash = value


class Clientes(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=150)
    telefono = models.CharField(max_length=20)
    email = models.CharField(max_length=100, blank=True, null=True)
    fecha_registro = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'CLIENTES'


class OrdenesServicio(models.Model):
    # Criterio UUID de 36 caracteres exigido por la HU #5 y control IDOR (A01)
    id = models.CharField(primary_key=True, max_length=36) 
    tecnico = models.ForeignKey(UsuarioPersonal, on_delete=models.RESTRICT, db_column='tecnico_id')
    cliente = models.ForeignKey(Clientes, on_delete=models.RESTRICT, db_column='cliente_id')
    equipo_modelo = models.CharField(max_length=150)
    falla_reportada = models.TextField()
    
    # Parámetros económicos con mitigación CHECK (OWASP A06)
    costo_total = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    abono_economico = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    
    ESTADOS = [
        ('Recibido', 'Recibido'),
        ('En Reparación', 'En Reparación'),
        ('Listo', 'Listo'),
        ('Entregado', 'Entregado')
    ]
    estado = models.CharField(max_length=20, choices=ESTADOS, default='Recibido')
    fecha_ingreso = models.DateTimeField(auto_now_add=True)
    fecha_salida = models.DateTimeField(blank=True, null=True)

    class Meta:
        db_table = 'ORDENES_SERVICIO'
