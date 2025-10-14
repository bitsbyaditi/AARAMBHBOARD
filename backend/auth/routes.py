from fastapi import APIRouter, Depends
from backend.auth.utils import verify_token

router = APIRouter()

@router.get("/verify")
def verify_user(token: str = Depends(verify_token)):
    return {"status": "verified"}
