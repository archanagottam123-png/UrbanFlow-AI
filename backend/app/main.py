"""
UrbanFlow AI — FastAPI Backend

IMPORTANT: This platform uses simulated/synthetic data for demonstration purposes.
Do not connect to real government traffic APIs without proper authorization.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from app.config import settings
from app.database import create_tables
from app.api.routes import auth, traffic, predictions, simulation, incidents, analytics

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Create database tables on startup
    await create_tables()
    yield

app = FastAPI(
    title="UrbanFlow AI API",
    description="AI-powered Traffic Congestion Prediction & Simulation Platform — Prototype/Demo",
    version="1.0.0",
    lifespan=lifespan,
    docs_url="/docs",
    redoc_url="/redoc",
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.frontend_url, "http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/api")
app.include_router(traffic.router, prefix="/api")
app.include_router(predictions.router, prefix="/api")
app.include_router(simulation.router, prefix="/api")
app.include_router(incidents.router, prefix="/api")
app.include_router(analytics.router, prefix="/api")

@app.get("/")
async def root():
    return {
        "platform": "UrbanFlow AI",
        "version": "1.0.0",
        "status": "running",
        "data_type": "simulated",
        "disclaimer": "This is a research and demonstration platform. All data is synthetic.",
        "docs": "/docs",
    }

@app.get("/health")
async def health():
    return {"status": "healthy", "data_type": "simulated"}
