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