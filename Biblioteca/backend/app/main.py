from fastapi import FastAPI
from app.routes.libros_routes import router

app = FastAPI()

app.include_router(router)


@app.get("/")
def inicio():

    return {
        "mensaje": "API Biblioteca funcionando"
    }