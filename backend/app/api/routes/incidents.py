from fastapi import APIRouter, Query
from typing import Optional
from app.schemas.schemas import IncidentCreate, IncidentResponse, IncidentStatusUpdate
from app.services.incident_service import get_all_incidents, create_incident, update_incident_status
from fastapi import HTTPException

router = APIRouter(prefix="/incidents", tags=["Incidents"])

@router.get("/")
async def list_incidents(city: Optional[str] = Query(None)):
    incidents = get_all_incidents(city)
    return {'data_type': 'simulated', 'incidents': incidents, 'total': len(incidents)}

@router.post("/", response_model=IncidentResponse)
async def add_incident(data: IncidentCreate):
    incident = create_incident(data.model_dump())
    return IncidentResponse(**incident)

@router.patch("/{incident_id}")
async def patch_incident_status(incident_id: str, data: IncidentStatusUpdate):
    result = update_incident_status(incident_id, data.status)
    if not result:
        raise HTTPException(status_code=404, detail="Incident not found")
    return {'data_type': 'simulated', **result}
