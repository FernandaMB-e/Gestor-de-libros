from typing import Optional

from app.models.libro_model import Libro

from app.services.libros_service import (
    obtener_libros,
    guardar_libro,
    eliminar_libro,
    actualizar_libro,
    obtener_estadisticas
)

def listar_libros(
    busqueda: Optional[str] = None,
    estado: Optional[str] = None,
    disposicion: Optional[str] = None,
    puntuacion: Optional[int] = None,
    favoritos: Optional[bool] = None,
    usuarioId: Optional[str] = None
):
    return obtener_libros(
        busqueda,
        estado,
        disposicion,
        puntuacion,
        favoritos,
        usuarioId
    )

def crear_libro(libro: Libro):
    return guardar_libro(libro.model_dump())

def borrar_libro(id: str, usuarioId: Optional[str] = None):
    return eliminar_libro(id, usuarioId)

def editar_libro(id: str, libro: Libro):
    return actualizar_libro(
        id,
        libro.model_dump()
    )

def get_estadisticas(usuarioId: Optional[str] = None):
    return obtener_estadisticas(usuarioId)