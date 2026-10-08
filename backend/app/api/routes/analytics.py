from fastapi import APIRouter, Query
from typing import Optional
from app.services.analytics_service import generate_hourly_data, generate_weekly_data, get_peak_hours

router = APIRouter(prefix="/analytics", tags=["Analytics"])

@router.get("/hourly")
async def hourly_data(city: Optional[str] = Query('Bengaluru')):
    return {'data_type': 'simulated', 'city': city, 'data': generate_hourly_data(city or 'Bengaluru')}

@router.get("/weekly")
async def weekly_data():
    return {'data_type': 'simulated', 'data': generate_weekly_data()}

@router.get("/peak-hours")
async def peak_hours():
    return {'data_type': 'simulated', 'data': get_peak_hours()}

@router.get("/junctions")
async def junction_performance():
    from app.services.traffic_service import get_all_junctions
    junctions = get_all_junctions()
    perf = [{
        'name': j['name'], 'city': j['city'],
        'avg_speed': j['average_speed'], 'vehicle_count': j['vehicle_count'],
        'queue_length': j['queue_length'], 'congestion': j['congestion_level'],
    } for j in junctions]
    return {'data_type': 'simulated', 'data': perf}
