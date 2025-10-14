from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session
#from backend.db_connection import SessionLocal
from backend.models.dashboard import Dashboard
from backend.auth.utils import verify_token  # Added

router = APIRouter()

class DashboardSchema(BaseModel):
    user_id: str
    config: dict

# ✅ Save dashboard with auth
@router.post("/dashboard/save")
async def save_dashboard(data: DashboardSchema, token: str = Depends(verify_token)):
    db: Session = SessionLocal()
    dashboard = Dashboard(user_id=data.user_id, config=data.config)
    db.add(dashboard)
    db.commit()
    db.refresh(dashboard)
    return {"message": "Dashboard saved", "id": dashboard.id}

# ✅ Load dashboard with auth
@router.get("/dashboard/load/{user_id}")
async def load_dashboard(user_id: str, token: str = Depends(verify_token)):
    db: Session = SessionLocal()
    dashboard = db.query(Dashboard).filter(Dashboard.user_id == user_id).first()
    if not dashboard:
        raise HTTPException(status_code=404, detail="Dashboard not found")
    return {"user_id": dashboard.user_id, "config": dashboard.config}
