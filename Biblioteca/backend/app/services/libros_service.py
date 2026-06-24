from app.data.libros_data import libros_collection
from bson import ObjectId
from app.data.libros_data import libros_collection
from typing import Optional

def obtener_libros(
    busqueda: Optional[str] = None,
    estado: Optional[str] = None,
    disposicion: Optional[str] = None,
    puntuacion: Optional[int] = None,
    favoritos: Optional[bool] = None
):
    filtro_mongodb = {}

    # 1. Filtro de Estado
    if estado and str(estado).lower() != "null" and estado != "":
        filtro_mongodb["estadoLectura"] = estado
        
    # 2. Filtro de Disposición
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


def obtener_estadisticas():
    return {
        "total": libros_collection.count_documents({}),
        "leyendo": libros_collection.count_documents({"estadoLectura": "Leyendo"}),
        "leidos": libros_collection.count_documents({"estadoLectura": "Leídos"}),
        "pendientes": libros_collection.count_documents({"estadoLectura": "Pendiente por leer"}),
        "prestados": libros_collection.count_documents({"disponible": False}),
        "favoritos": libros_collection.count_documents({"favorito": True})
    }


def guardar_libro(libro):

    libros_collection.insert_one(libro)

    return {"mensaje": "Libro guardado correctamente"}

def eliminar_libro(id):

    resultado = libros_collection.delete_one(
        {"_id": ObjectId(id)}
    )

    if resultado.deleted_count == 1:
        return {"mensaje": "Libro eliminado correctamente"}

    return {"mensaje": "Libro no encontrado"}

def actualizar_libro(id, libro):

    resultado = libros_collection.update_one(
        {"_id": ObjectId(id)},
        {"$set": libro}
    )

    if resultado.modified_count == 1:
        return {"mensaje": "Libro actualizado correctamente"}

    return {"mensaje": "No se realizaron cambios"}


