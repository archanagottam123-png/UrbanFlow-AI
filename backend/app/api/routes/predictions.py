from fastapi import APIRouter
from app.schemas.schemas import PredictionRequest, PredictionResponse
from app.ml.predictor import predict_congestion

router = APIRouter(prefix="/predictions", tags=["Predictions"])

@router.post("/predict", response_model=PredictionResponse)
async def predict(request: PredictionRequest):
    """Predict traffic congestion for a given scenario. Returns model-generated estimates."""
    result = predict_congestion(
        city=request.city, road=request.road, junction=request.junction,
        date=request.date, time_str=request.time, day_of_week=request.day_of_week,
        weather=request.weather, vehicle_volume=request.vehicle_volume,
    )
    return PredictionResponse(**result)
