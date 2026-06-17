from app.data.libros_data import libros_collection
from bson import ObjectId
from app.data.libros_data import libros_collection

def obtener_libros():

    libros = []

    for libro in libros_collection.find():

        libro["_id"] = str(libro["_id"])

        libros.append(libro)

    return libros


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