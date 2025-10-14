from backend.db_connection import engine
from backend.auth.models import Base as AuthBase

def init_db():
    AuthBase.metadata.create_all(bind=engine)
