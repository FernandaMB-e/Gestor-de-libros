from pymongo import MongoClient

cliente = MongoClient("mongodb://localhost:27017")

db = cliente["biblioteca"]

libros_collection = db["libros"]