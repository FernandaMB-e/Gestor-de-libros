from pydantic import BaseModel

class UsuarioLogin(BaseModel):
    correo: str
    password: str

class UsuarioRegistro(BaseModel):
    nombre: str
    correo: str
    password: str