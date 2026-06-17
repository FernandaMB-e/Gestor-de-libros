from pydantic import BaseModel

class Libro(BaseModel):
    titulo: str
    autor: str
    anio: int
    totalPaginas: int
    genero: str

    portada: str | None = None

    estadoLectura: str
    disponible: bool

    favorito: bool
    calificacion: int

    resena: str