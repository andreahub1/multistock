from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Usuario, Producto
from .serializers import UsuarioSerializer, ProductoSerializer


# ==================================
# LOGIN
# ==================================

@api_view(["POST"])
def login(request):

    usuario = request.data.get("username")
    password = request.data.get("password")

    try:
        user = Usuario.objects.get(
            usuario=usuario,
            password=password
        )

        return Response({
            "id": user.id,
            "usuario": user.usuario,
            "nombre": user.nombre,
            "rol": user.rol
        })

    except Usuario.DoesNotExist:
        return Response(
            {"error": "Usuario o contraseña incorrectos"},
            status=401
        )


# ==================================
# USUARIOS
# ==================================

@api_view(["GET", "POST"])
def usuarios(request):

    if request.method == "GET":

        usuarios = Usuario.objects.all()
        serializer = UsuarioSerializer(
            usuarios,
            many=True
        )

        return Response(serializer.data)

    if request.method == "POST":

        serializer = UsuarioSerializer(
            data=request.data
        )

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(
            serializer.errors,
            status=400
        )


@api_view(["PUT", "DELETE"])
def usuario_detalle(request, id):

    try:
        usuario = Usuario.objects.get(id=id)

    except Usuario.DoesNotExist:
        return Response(
            {"error": "Usuario no encontrado"},
            status=404
        )

    if request.method == "PUT":

        serializer = UsuarioSerializer(
            usuario,
            data=request.data
        )

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(
            serializer.errors,
            status=400
        )

    if request.method == "DELETE":
        usuario.delete()

        return Response({
            "mensaje": "Usuario eliminado"
        })


# ==================================
# PRODUCTOS
# ==================================

@api_view(["GET", "POST"])
def productos(request):

    if request.method == "GET":

        productos = Producto.objects.all()

        serializer = ProductoSerializer(
            productos,
            many=True
        )

        return Response(serializer.data)

    if request.method == "POST":

        serializer = ProductoSerializer(
            data=request.data
        )

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(
            serializer.errors,
            status=400
        )


@api_view(["PUT", "DELETE"])
def producto_detalle(request, id):

    try:
        producto = Producto.objects.get(id=id)

    except Producto.DoesNotExist:
        return Response(
            {"error": "Producto no encontrado"},
            status=404
        )

    if request.method == "PUT":

        serializer = ProductoSerializer(
            producto,
            data=request.data
        )

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(
            serializer.errors,
            status=400
        )

    if request.method == "DELETE":

        producto.delete()

        return Response({
            "mensaje": "Producto eliminado"
        })