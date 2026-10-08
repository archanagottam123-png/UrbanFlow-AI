from fastapi import APIRouter, Query
from typing import Optional, List
from app.services.traffic_service import get_all_junctions, get_junction_by_id
from fastapi import HTTPException

router = APIRouter(prefix="/traffic", tags=["Traffic"])

@router.get("/live")
async def get_live_traffic(city: Optional[str] = Query(None)):
    """Get live (simulated) traffic data for all junctions."""
    junctions = get_all_junctions(city)
    return {
        'data_type': 'simulated',
        'disclaimer': 'This is simulated/synthetic data for demonstration purposes.',
        'junctions': junctions,
        'total': len(junctions),
    }

@router.get("/junction/{junction_id}")
async def get_junction_detail(junction_id: str):
    """Get detailed information for a specific junction."""
    junction = get_junction_by_id(junction_id)
    if not junction:
        raise HTTPException(status_code=404, detail="Junction not found")
    return {'data_type': 'simulated', **junction}
