from django.db import models
from django.contrib.auth.models import AbstractUser

class UsuarioPersonal(AbstractUser):
    # Opciones de rol simples alineadas a tu ENUM de MySQL
    ROLES_CHOICES = [
        ('tecnico', 'Técnico'),
        ('administrador', 'Administrador'),
    ]
    rol = models.CharField(max_length=20, choices=ROLES_CHOICES, default='tecnico')

    def __str__(self):
        return f"{self.username} - {self.get_rol_display()}"
