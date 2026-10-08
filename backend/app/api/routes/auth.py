from fastapi import APIRouter, HTTPException, status
from passlib.context import CryptContext
from jose import jwt
from datetime import datetime, timedelta
from app.schemas.schemas import LoginRequest, RegisterRequest, TokenResponse
from app.config import settings

router = APIRouter(prefix="/auth", tags=["Authentication"])
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Demo users (use database in production)
DEMO_USERS = [
    {'id': '1', 'name': 'Demo User', 'email': 'demo@urbanflow.ai', 'password': 'demo123', 'role': 'analyst'},
    {'id': '2', 'name': 'Admin User', 'email': 'admin@urbanflow.ai', 'password': 'admin123', 'role': 'admin'},
    {'id': '3', 'name': 'Recruiter', 'email': 'recruiter@urbanflow.ai', 'password': 'recruit123', 'role': 'researcher'},
]

def create_token(data: dict) -> str:
    expire = datetime.utcnow() + timedelta(minutes=settings.access_token_expire_minutes)
    return jwt.encode({**data, 'exp': expire}, settings.secret_key, algorithm=settings.algorithm)

@router.post("/login", response_model=TokenResponse)
async def login(request: LoginRequest):
    user = next((u for u in DEMO_USERS if u['email'] == request.email and u['password'] == request.password), None)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    token = create_token({'sub': user['email'], 'role': user['role']})
    return TokenResponse(access_token=token, user_name=user['name'], user_role=user['role'])

@router.post("/register", response_model=TokenResponse)
async def register(request: RegisterRequest):
    # In production, save to DB. Here we just return a token.
    token = create_token({'sub': request.email, 'role': request.role})
    return TokenResponse(access_token=token, user_name=request.name, user_role=request.role)
