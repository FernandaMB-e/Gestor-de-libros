from fastapi import APIRouter

from app.controllers.libros_controller import (
    listar_libros,
    crear_libro
)

from app.models.libro_model import Libro

router = APIRouter()

@router.get("/libros")
def get_libros():

    return listar_libros()


@router.post("/libros")
def post_libro(libro: Libro):

    return crear_libro(libro)