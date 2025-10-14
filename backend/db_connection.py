from dotenv import load_dotenv
import os
from sqlalchemy.orm import declarative_base

# Load environment variables from .env file (if present)
load_dotenv()

# Extract individual components (optional for future DB setup)
DB_HOST = os.getenv("DB_HOST")
DB_PORT = os.getenv("DB_PORT")
DB_NAME = os.getenv("DB_NAME")
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")

# Construct the full DB URL (uncomment when DB is ready)
# DB_URL = f"postgresql+psycopg2://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

# Optional: print for debugging
# print("DB_URL =", DB_URL)

# SQLAlchemy base setup (required for model definitions)
Base = declarative_base()

# Uncomment below when DB is ready
# from sqlalchemy import create_engine
# from sqlalchemy.orm import sessionmaker
# engine = create_engine(DB_URL)
# SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
