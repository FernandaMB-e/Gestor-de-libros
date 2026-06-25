from app.data.libros_data import libros_collection
from bson import ObjectId
from typing import Optional
from fastapi import HTTPException

def obtener_libros(
    busqueda: Optional[str] = None,
    estado: Optional[str] = None,
    disposicion: Optional[str] = None,
    puntuacion: Optional[int] = None,
    favoritos: Optional[bool] = None,
    usuarioId: Optional[str] = None
):
    filtro_mongodb = {}

    # Si no hay usuario, no mostramos libros
    if not usuarioId or str(usuarioId).lower() == "null" or str(usuarioId).strip() == "":
        return []

    # Cada usuario solo ve sus propios libros
    filtro_mongodb["usuarioId"] = usuarioId

    if estado and str(estado).lower() != "null" and estado != "":
        filtro_mongodb["estadoLectura"] = estado

    if disposicion and str(disposicion).lower() != "null" and disposicion != "":
        if disposicion == "Disponible":
            filtro_mongodb["disponible"] = True
        elif disposicion == "Prestado":
            filtro_mongodb["disponible"] = False

    if puntuacion is not None and str(puntuacion).lower() != "null" and str(puntuacion) != "":
        try:
            filtro_mongodb["calificacion"] = int(puntuacion)
        except ValueError:
            pass

    if favoritos is True or str(favoritos).lower() == "true":
        filtro_mongodb["favorito"] = True

    if busqueda and str(busqueda).lower() != "null" and str(busqueda).strip() != "":
        regex = {"$regex": str(busqueda).strip(), "$options": "i"}
        filtro_mongodb["$or"] = [
            {"titulo": regex},
            {"autor": regex},
            {"genero": regex}
        ]

    libros = []

    for libro in libros_collection.find(filtro_mongodb):
        libro["_id"] = str(libro["_id"])
        libros.append(libro)

    return libros


def obtener_estadisticas(usuarioId: Optional[str] = None):
    if not usuarioId or str(usuarioId).lower() == "null" or str(usuarioId).strip() == "":
        return {
            "total": 0,
            "leyendo": 0,
            "leidos": 0,
            "pendientes": 0,
            "prestados": 0,
            "favoritos": 0
        }

    filtro_usuario = {"usuarioId": usuarioId}

    return {
        "total": libros_collection.count_documents(filtro_usuario),
        "leyendo": libros_collection.count_documents({
            "usuarioId": usuarioId,
            "estadoLectura": "Leyendo"
        }),
        "leidos": libros_collection.count_documents({
            "usuarioId": usuarioId,
            "estadoLectura": "Leídos"
        }),
        "pendientes": libros_collection.count_documents({
            "usuarioId": usuarioId,
            "estadoLectura": "Pendiente por leer"
        }),
        "prestados": libros_collection.count_documents({
            "usuarioId": usuarioId,
            "disponible": False
        }),
        "favoritos": libros_collection.count_documents({
            "usuarioId": usuarioId,
            "favorito": True
        })
    }


def guardar_libro(libro):
    if not libro.get("usuarioId"):
        raise HTTPException(
            status_code=400,
            detail="No se recibió el usuario del libro"
        )

    libros_collection.insert_one(libro)

    return {"mensaje": "Libro guardado correctamente"}


def eliminar_libro(id: str, usuarioId: Optional[str] = None):
    filtro = {"_id": ObjectId(id)}

    if usuarioId:
        filtro["usuarioId"] = usuarioId

    resultado = libros_collection.delete_one(filtro)

    if resultado.deleted_count == 1:
        return {"mensaje": "Libro eliminado correctamente"}

    return {"mensaje": "Libro no encontrado"}


def actualizar_libro(id: str, libro):
    filtro = {"_id": ObjectId(id)}

    if libro.get("usuarioId"):
        filtro["usuarioId"] = libro["usuarioId"]

    resultado = libros_collection.update_one(
        filtro,
        {"$set": libro}
    )

    if resultado.modified_count == 1:
        return {"mensaje": "Libro actualizado correctamente"}

    return {"mensaje": "No se realizaron cambios"}


