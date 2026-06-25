from fastapi import HTTPException
from app.data.usuarios_data import usuarios_collection
from bson import ObjectId

FOTO_DEFAULT = "https://cdn-icons-png.flaticon.com/512/149/149071.png"


def registrar_usuario(usuario):
    usuario_existente = usuarios_collection.find_one({
        "correo": usuario["correo"]
    })

    if usuario_existente:
        raise HTTPException(
            status_code=400,
            detail="El correo ya está registrado"
        )

    usuario["fotoPerfil"] = FOTO_DEFAULT

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
            "correo": usuario["correo"],
            "fotoPerfil": usuario.get("fotoPerfil", FOTO_DEFAULT)
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
            "password": usuario["password"],
            "fotoPerfil": usuario.get("fotoPerfil", FOTO_DEFAULT)
        })

    return usuarios


def actualizar_usuario(id, datos):
    datos_actualizar = {}

    if datos.get("nombre"):
        datos_actualizar["nombre"] = datos["nombre"]

    if datos.get("password"):
        datos_actualizar["password"] = datos["password"]

    if datos.get("fotoPerfil"):
        datos_actualizar["fotoPerfil"] = datos["fotoPerfil"]

    if not datos_actualizar:
        raise HTTPException(
            status_code=400,
            detail="No hay datos para actualizar"
        )

    resultado = usuarios_collection.update_one(
        {"_id": ObjectId(id)},
        {"$set": datos_actualizar}
    )

    if resultado.matched_count == 0:
        raise HTTPException(
            status_code=404,
            detail="Usuario no encontrado"
        )

    usuario_actualizado = usuarios_collection.find_one({"_id": ObjectId(id)})

    return {
        "mensaje": "Usuario actualizado correctamente",
        "usuario": {
            "id": str(usuario_actualizado["_id"]),
            "nombre": usuario_actualizado["nombre"],
            "correo": usuario_actualizado["correo"],
            "fotoPerfil": usuario_actualizado.get("fotoPerfil", FOTO_DEFAULT)
        }
    }


def actualizar_foto(id, datos):
    datos_actualizar = {}

    if datos.get("fotoPerfil"):
        datos_actualizar["fotoPerfil"] = datos["fotoPerfil"]

    if not datos_actualizar:
        raise HTTPException(
            status_code=400,
            detail="No hay datos para actualizar"
        )

    resultado = usuarios_collection.update_one(
        {"_id": ObjectId(id)},
        {"$set": datos_actualizar}
    )

    if resultado.matched_count == 0:
        raise HTTPException(
            status_code=404,
            detail="Usuario no encontrado"
        )

    usuario_actualizado = usuarios_collection.find_one({"_id": ObjectId(id)})

    return {
        "mensaje": "Foto de perfil actualizada correctamente",
        "usuario": {
            "id": str(usuario_actualizado["_id"]),
            "nombre": usuario_actualizado["nombre"],
            "correo": usuario_actualizado["correo"],
            "fotoPerfil": usuario_actualizado.get("fotoPerfil", FOTO_DEFAULT)
        }
    }