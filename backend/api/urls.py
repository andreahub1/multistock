from django.urls import path
from . import views

urlpatterns = [

    path(
        "login/",
        views.login
    ),

    path(
        "usuarios/",
        views.usuarios
    ),

    path(
        "usuarios/<int:id>/",
        views.usuario_detalle
    ),

    path(
        "productos/",
        views.productos
    ),

    path(
        "productos/<int:id>/",
        views.producto_detalle
    ),
]