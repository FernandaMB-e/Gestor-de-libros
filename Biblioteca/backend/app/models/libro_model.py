from pydantic import BaseModel

class Libro(BaseModel):
    titulo: str
    autor: str
    anio: int
    paginas: int
    genero: str