from pymongo import MongoClient

cliente = MongoClient("mongodb://localhost:27017")

db = cliente["biblioteca"]

usuarios_collection = db["usuarios"]