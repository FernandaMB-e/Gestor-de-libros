from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.libros_routes import router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:4200"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)

@app.get("/")
def inicio():

    return {
        "mensaje": "API Biblioteca funcionando"
    }