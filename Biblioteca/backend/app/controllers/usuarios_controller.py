
from app.models.usuario_model import UsuarioLogin, UsuarioRegistro
from app.services.usuarios_service import registrar_usuario, iniciar_sesion

def registrar(usuario: UsuarioRegistro):
    return registrar_usuario(usuario.model_dump())

def login(usuario: UsuarioLogin):
    return iniciar_sesion(usuario.model_dump())