from sqlalchemy import Column, String, Integer, Float, DateTime, Text, Enum
from sqlalchemy.sql import func
import enum
from app.database import Base

class IncidentType(str, enum.Enum):
    accident = "accident"
    construction = "construction"
    breakdown = "breakdown"
    closure = "closure"
    waterlogging = "waterlogging"
    event = "event"
    other = "other"

class IncidentStatus(str, enum.Enum):
    active = "active"
    monitoring = "monitoring"
    resolved = "resolved"

class SeverityLevel(str, enum.Enum):
    low = "low"
    medium = "medium"
    high = "high"
    critical = "critical"

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(200), unique=True, index=True, nullable=False)
    hashed_password = Column(String(200), nullable=False)
    role = Column(String(50), default="analyst")
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class Incident(Base):
    __tablename__ = "incidents"
    id = Column(String(36), primary_key=True)
    type = Column(String(50), nullable=False)
    location = Column(String(200), nullable=False)
    city = Column(String(100), nullable=False)
    lat = Column(Float)
    lng = Column(Float)
    date_time = Column(DateTime(timezone=True), nullable=False)
    severity = Column(String(20), nullable=False)
    description = Column(Text)
    impact_radius = Column(Integer, default=500)
    status = Column(String(20), default="active")
    reported_by = Column(String(100))
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class TrafficSnapshot(Base):
    __tablename__ = "traffic_snapshots"
    id = Column(Integer, primary_key=True, index=True)
    timestamp = Column(DateTime(timezone=True), nullable=False)
    city = Column(String(100))
    road = Column(String(200))
    junction = Column(String(200))
    vehicle_count = Column(Integer)
    average_speed = Column(Float)
    queue_length = Column(Float)
    weather = Column(String(50))
    incident = Column(String(50), nullable=True)
    lane_count = Column(Integer)
    signal_cycle = Column(Integer)
    congestion_level = Column(String(20))
    data_type = Column(String(20), default="simulated")
