from app.models.usuario_model import UsuarioLogin, UsuarioRegistro, UsuarioActualizar, fotoPerfil
from app.services.usuarios_service import (
    registrar_usuario,
    iniciar_sesion,
    obtener_usuarios,
    actualizar_usuario,
    actualizar_foto
)


def registrar(usuario: UsuarioRegistro):
    return registrar_usuario(usuario.model_dump())


def login(usuario: UsuarioLogin):
    return iniciar_sesion(usuario.model_dump())


def listar_usuarios():
    return obtener_usuarios()


def editar_usuario(id: str, usuario: UsuarioActualizar):
    return actualizar_usuario(id, usuario.model_dump())


def editar_foto(id: str, foto: fotoPerfil):
    return actualizar_foto(id, foto.model_dump())
