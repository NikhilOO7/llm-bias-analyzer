import os
from pymongo import MongoClient
from dotenv import load_dotenv
import certifi

load_dotenv()

client = None
db = None

def connect_mongo():
    global client, db
    mongo_uri = os.getenv("MONGODB_ATLAS_URI")  # Set this in .env file
    if not mongo_uri:
        raise ValueError("MONGODB_ATLAS_URI environment variable not set")
    client = MongoClient(mongo_uri, tlsCAFile=certifi.where())
    db = client[os.getenv("MONGODB_DB_NAME")]
    print("✅ MongoDB connected successfully!")

def get_db():
    return db