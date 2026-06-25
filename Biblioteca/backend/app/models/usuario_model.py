from typing import Optional
from pydantic import BaseModel


class UsuarioLogin(BaseModel):
    correo: str
    password: str


class UsuarioRegistro(BaseModel):
    nombre: str
    correo: str
    password: str


class UsuarioActualizar(BaseModel):
    nombre: Optional[str] = None
    password: Optional[str] = None
    fotoPerfil: Optional[str] = None

class fotoPerfil(BaseModel):
    fotoPerfil: Optional[str] = None