from fastapi import APIRouter, Query
from typing import Optional
from app.controllers.libros_controller import (
    listar_libros,
    crear_libro,
    borrar_libro,
    editar_libro,
    get_estadisticas
)
from app.models.libro_model import Libro

router = APIRouter(prefix="/libros")

@router.get("/estadisticas")
def estadisticas(
    usuarioId: Optional[str] = Query(None)
):
    return get_estadisticas(usuarioId)

@router.get("/")
def get_libros(
    busqueda: Optional[str] = Query(None),
    estado: Optional[str] = Query(None),
    disposicion: Optional[str] = Query(None),
    puntuacion: Optional[int] = Query(None),
    favoritos: Optional[bool] = Query(None),
    usuarioId: Optional[str] = Query(None)
):
    return listar_libros(
        busqueda,
        estado,
        disposicion,
        puntuacion,
        favoritos,
        usuarioId
    )

@router.post("/")
def post_libro(libro: Libro):
    return crear_libro(libro)

@router.delete("/{id}")
def delete_libro(
    id: str,
    usuarioId: Optional[str] = Query(None)
):
    return borrar_libro(id, usuarioId)

@router.put("/{id}")
def put_libro(id: str, libro: Libro):
    return editar_libro(id, libro)