from app.services.libros_service import (
    obtener_libros,
    guardar_libro
)

from app.models.libro_model import Libro


def listar_libros():

    return obtener_libros()


def crear_libro(libro: Libro):

    return guardar_libro(libro.model_dump())