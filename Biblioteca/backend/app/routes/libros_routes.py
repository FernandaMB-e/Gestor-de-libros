from fastapi import APIRouter

from app.controllers.libros_controller import (
    listar_libros,
    crear_libro
)

from app.models.libro_model import Libro

from app.controllers.libros_controller import (
    listar_libros,
    crear_libro,
    borrar_libro,
    editar_libro
)

router = APIRouter()

@router.get("/libros")
def get_libros():

    return listar_libros()


@router.post("/libros")
def post_libro(libro: Libro):

    return crear_libro(libro)

@router.delete("/libros/{id}")
def delete_libro(id: str):

    return borrar_libro(id)

@router.put("/libros/{id}")
def put_libro(id: str, libro: Libro):

    return editar_libro(id, libro)