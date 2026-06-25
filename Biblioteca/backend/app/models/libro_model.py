from pydantic import BaseModel

class Libro(BaseModel):
    titulo: str
    autor: str
    anio: int
    totalPaginas: int

    genero: str

    portada: str | None = None

    estadoLectura: str
    tiempoLectura: str | None = None

    disponible: bool

    prestadoA: str | None = None
    fechaPrestamo: str | None = None

    favorito: bool
    calificacion: int

    resena: str

    usuarioId: str | None = None