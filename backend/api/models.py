from django.db import models


class Usuario(models.Model):
    usuario = models.CharField(max_length=50, unique=True)
    nombre = models.CharField(max_length=100)
    password = models.CharField(max_length=100)

    ROLES = (
        ("Administrador", "Administrador"),
        ("Empleado", "Empleado"),
    )

    rol = models.CharField(max_length=20, choices=ROLES)

    def __str__(self):
        return self.usuario


class Producto(models.Model):
    codigo = models.CharField(max_length=20, unique=True)
    nombre = models.CharField(max_length=100)
    categoria = models.CharField(max_length=100)
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.IntegerField(default=0)

    def __str__(self):
        return self.nombre