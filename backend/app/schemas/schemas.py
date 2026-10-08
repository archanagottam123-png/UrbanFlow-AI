from pydantic import BaseModel, Field
from typing import Optional, List, Literal
from datetime import datetime

# Auth
class LoginRequest(BaseModel):
    email: str
    password: str

class RegisterRequest(BaseModel):
    name: str
    email: str
    password: str = Field(min_length=6)
    role: str = "analyst"

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user_name: str
    user_role: str
    data_type: Literal["simulated"] = "simulated"

# Traffic
class JunctionResponse(BaseModel):
    id: str
    name: str
    city: str
    road: str
    lat: float
    lng: float
    vehicle_count: int
    average_speed: float
    queue_length: float
    congestion_level: str
    predicted_congestion: str
    prediction_time: str
    possible_causes: List[str]
    recommended_intervention: str
    lane_count: int
    signal_cycle: int
    data_type: Literal["simulated"] = "simulated"

# Predictions
class PredictionRequest(BaseModel):
    city: str
    road: str
    junction: str
    date: str
    time: str
    day_of_week: str
    weather: str
    vehicle_volume: int

class PredictionFactor(BaseModel):
    label: str
    percentage: float
    color: str

class ForecastPoint(BaseModel):
    time: str
    probability: float

class PredictionResponse(BaseModel):
    probability: float
    confidence: float
    expected_vehicle_volume: int
    expected_average_speed: float
    expected_queue_length: float
    expected_travel_time: float
    congestion_level: str
    forecast: List[ForecastPoint]
    factors: List[PredictionFactor]
    explanation: str
    data_type: Literal["simulated"] = "simulated"
    disclaimer: str = "This is a model-generated prediction, not a guaranteed outcome."

# Simulation
class SimulationRequest(BaseModel):
    green_signal_duration: int = Field(ge=10, le=120)
    red_signal_duration: int = Field(ge=10, le=120)
    vehicle_volume: int = Field(ge=100, le=5000)
    diversion_percentage: float = Field(ge=0, le=100)
    available_lanes: int = Field(ge=1, le=8)
    has_road_blockage: bool = False
    weather_condition: str = "Clear"
    junction_id: Optional[str] = "blr-001"

class ScenarioOutput(BaseModel):
    queue_length: float
    travel_time: float
    average_speed: float
    congestion_level: str
    vehicle_throughput: int

class SimulationResponse(BaseModel):
    current: ScenarioOutput
    proposed: ScenarioOutput
    improvement: dict
    data_type: Literal["simulated"] = "simulated"
    disclaimer: str = "These are simulated/model-generated values for scenario planning only."

# Incidents
class IncidentCreate(BaseModel):
    type: str
    location: str
    city: str
    lat: Optional[float] = 12.9716
    lng: Optional[float] = 77.5946
    severity: str
    description: str
    impact_radius: int = 500
    reported_by: str = "System"

class IncidentResponse(BaseModel):
    id: str
    type: str
    location: str
    city: str
    lat: float
    lng: float
    date_time: str
    severity: str
    description: str
    impact_radius: int
    status: str
    reported_by: str
    data_type: Literal["simulated"] = "simulated"

class IncidentStatusUpdate(BaseModel):
    status: str

# Analytics
class HourlyDataPoint(BaseModel):
    time: str
    vehicle_count: int
    average_speed: float
    queue_length: float
    congestion_level: str

class AnalyticsResponse(BaseModel):
    hourly: List[HourlyDataPoint]
    weekly: List[dict]
    peak_hours: List[dict]
    data_type: Literal["simulated"] = "simulated"
