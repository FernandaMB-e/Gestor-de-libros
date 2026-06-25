from fastapi import APIRouter
from app.models.usuario_model import UsuarioLogin, UsuarioRegistro, UsuarioActualizar, fotoPerfil
from app.controllers.usuarios_controller import (
    registrar,
    login,
    listar_usuarios,
    editar_usuario,
    editar_foto
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

@router.put("/usuarios/actualizarfoto/{id}")
def put_actualizar_foto(id: str, foto: fotoPerfil):
    return editar_foto(id, foto)