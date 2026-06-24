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

# Definimos el prefijo aquí para que todas las rutas sean /libros/...
router = APIRouter(prefix="/libros")

@router.get("/estadisticas")
def estadisticas():
    return get_estadisticas()

@router.get("/")
def get_libros(
    busqueda: Optional[str] = Query(None),
    estado: Optional[str] = Query(None),
    disposicion: Optional[str] = Query(None),
    puntuacion: Optional[int] = Query(None),
    favoritos: Optional[bool] = Query(None)
):
    return listar_libros(busqueda, estado, disposicion, puntuacion, favoritos)

@router.post("/")
def post_libro(libro: Libro):
    return crear_libro(libro)

@router.delete("/{id}")
def delete_libro(id: str):
    return borrar_libro(id)

@router.put("/{id}")
def put_libro(id: str, libro: Libro):
    return editar_libro(id, libro)