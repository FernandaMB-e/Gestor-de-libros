from fastapi import APIRouter
from app.models.usuario_model import UsuarioLogin, UsuarioRegistro
from app.controllers.usuarios_controller import registrar, login

router = APIRouter(prefix="/auth")

@router.post("/registro")
def post_registro(usuario: UsuarioRegistro):
    return registrar(usuario)

@router.post("/login")
def post_login(usuario: UsuarioLogin):
    return login(usuario)