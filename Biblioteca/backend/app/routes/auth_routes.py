from fastapi import APIRouter
from app.models.usuario_model import UsuarioLogin, UsuarioRegistro, UsuarioActualizar
from app.controllers.usuarios_controller import (
    registrar,
    login,
    listar_usuarios,
    editar_usuario
)

router = APIRouter(prefix="/auth")

@router.post("/registro")
def post_registro(usuario: UsuarioRegistro):
    return registrar(usuario)

@router.post("/login")
def post_login(usuario: UsuarioLogin):
    return login(usuario)

@router.get("/usuarios")
def get_usuarios():
    return listar_usuarios()

@router.put("/usuarios/{id}")
def put_usuario(id: str, usuario: UsuarioActualizar):
    return editar_usuario(id, usuario)