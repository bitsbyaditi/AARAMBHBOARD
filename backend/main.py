from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.auth.routes import router as auth_router
from backend.chatbot.routes import router as chatbot_router
from backend.routes.widgets import router as widgets_router  # Added

app = FastAPI()

# ✅ CORS setup for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vite dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Route registration
app.include_router(auth_router, prefix="/auth")
app.include_router(chatbot_router, prefix="/chatbot")
app.include_router(widgets_router, prefix="/api")  # Added

@app.get("/")
def read_root():
    return {"message": "AarambhBoard backend is running"}
