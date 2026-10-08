from fastapi import APIRouter
from app.schemas.schemas import SimulationRequest, SimulationResponse
from app.ml.simulator import run_simulation

router = APIRouter(prefix="/simulation", tags=["Simulation"])

@router.post("/run", response_model=SimulationResponse)
async def simulate(request: SimulationRequest):
    """Run a what-if traffic simulation. All results are model-generated estimates."""
    result = run_simulation(
        green_signal=request.green_signal_duration,
        red_signal=request.red_signal_duration,
        vehicle_volume=request.vehicle_volume,
        diversion_percentage=request.diversion_percentage,
        available_lanes=request.available_lanes,
        has_road_blockage=request.has_road_blockage,
        weather_condition=request.weather_condition,
        junction_id=request.junction_id or 'blr-001',
    )
    return SimulationResponse(**result)
