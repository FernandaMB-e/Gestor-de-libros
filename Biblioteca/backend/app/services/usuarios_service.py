from fastapi import HTTPException
from app.data.usuarios_data import usuarios_collection

def registrar_usuario(usuario):
    usuario_existente = usuarios_collection.find_one({
        "correo": usuario["correo"]
    })

    if usuario_existente:
        raise HTTPException(
            status_code=400,
            detail="El correo ya está registrado"
        )

    usuarios_collection.insert_one(usuario)

    return {
        "mensaje": "Usuario registrado correctamente"
    }


def iniciar_sesion(datos):
    usuario = usuarios_collection.find_one({
        "correo": datos["correo"]
    })

    if not usuario:
        raise HTTPException(
            status_code=401,
            detail="Correo o contraseña incorrectos"
        )

    if usuario["password"] != datos["password"]:
        raise HTTPException(
            status_code=401,
            detail="Correo o contraseña incorrectos"
        )

    return {
        "mensaje": "Login correcto",
        "usuario": {
            "id": str(usuario["_id"]),
            "nombre": usuario["nombre"],
            "correo": usuario["correo"]
        },
        "token": "token-de-prueba"
    }


def obtener_usuarios():
    usuarios = []

    for usuario in usuarios_collection.find():
        usuarios.append({
            "id": str(usuario["_id"]),
            "nombre": usuario["nombre"],
            "correo": usuario["correo"],
            "password": usuario["password"]
        })

    return usuarios