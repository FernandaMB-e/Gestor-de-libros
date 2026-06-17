from app.services.libros_service import (
    obtener_libros,
    guardar_libro,
    eliminar_libro
)

from app.models.libro_model import Libro

from app.services.libros_service import (
    obtener_libros,
    guardar_libro,
    eliminar_libro,
    actualizar_libro
)

def listar_libros():

    return obtener_libros()


def crear_libro(libro: Libro):

    return guardar_libro(libro.model_dump())

def borrar_libro(id):

    return eliminar_libro(id)

def editar_libro(id, libro: Libro):

    return actualizar_libro(
        id,
        libro.model_dump()
    )