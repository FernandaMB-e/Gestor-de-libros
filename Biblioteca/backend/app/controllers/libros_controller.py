from app.services.libros_service import (
    obtener_libros,
    guardar_libro,
    eliminar_libro
)

from app.models.libro_model import Libro


def listar_libros():

    return obtener_libros()


def crear_libro(libro: Libro):

    return guardar_libro(libro.model_dump())

def borrar_libro(id):

    return eliminar_libro(id)