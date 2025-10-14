from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from backend.auth.utils import verify_token

router = APIRouter()

# 🔐 Login schema
class LoginSchema(BaseModel):
    email: str
    password: str

# ✅ Login route
@router.post("/login")
def login(data: LoginSchema):
    # 🔒 Replace this with real authentication logic
    if data.email == "admin@example.com" and data.password == "admin123":
        return {
            "token": "mock-jwt-token",
            "user": {
                "id": "user-123",
                "email": data.email,
                "name": "Admin User"
            }
        }
    raise HTTPException(status_code=401, detail="Invalid credentials")

# ✅ Token verification route
@router.get("/verify")
def verify_user(token: str = Depends(verify_token)):
    return {"status": "verified"}
