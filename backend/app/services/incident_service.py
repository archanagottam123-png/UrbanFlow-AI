import uuid
from datetime import datetime
from typing import List, Dict, Any

# In-memory store for incidents (use DB in production)
_incidents: List[Dict[str, Any]] = [
    {
        'id': 'inc-001', 'type': 'accident', 'location': 'Silk Board Junction, Bengaluru',
        'city': 'Bengaluru', 'lat': 12.9170, 'lng': 77.6228,
        'date_time': datetime.now().isoformat(), 'severity': 'high',
        'description': 'Two-vehicle collision on Hosur Road northbound.', 'impact_radius': 800,
        'status': 'active', 'reported_by': 'Traffic Control Center',
    },
    {
        'id': 'inc-002', 'type': 'construction', 'location': 'KR Puram, Bengaluru',
        'city': 'Bengaluru', 'lat': 12.9963, 'lng': 77.6939,
        'date_time': datetime.now().isoformat(), 'severity': 'medium',
        'description': 'Metro construction causing lane reduction.', 'impact_radius': 500,
        'status': 'monitoring', 'reported_by': 'BMRCL',
    },
    {
        'id': 'inc-003', 'type': 'waterlogging', 'location': 'Kathipara Junction, Chennai',
        'city': 'Chennai', 'lat': 13.0145, 'lng': 80.2009,
        'date_time': datetime.now().isoformat(), 'severity': 'critical',
        'description': 'Waterlogging post overnight rain reducing road width by 50%.', 'impact_radius': 600,
        'status': 'active', 'reported_by': 'Field Inspector',
    },
]

def get_all_incidents(city: str | None = None) -> List[Dict[str, Any]]:
    if city:
        return [i for i in _incidents if i['city'] == city]
    return list(reversed(_incidents))

def create_incident(data: Dict[str, Any]) -> Dict[str, Any]:
    incident = {
        'id': f'inc-{uuid.uuid4().hex[:6]}',
        'date_time': datetime.now().isoformat(),
        'status': 'active',
        **data,
    }
    _incidents.insert(0, incident)
    return incident

def update_incident_status(incident_id: str, status: str) -> Dict[str, Any] | None:
    for inc in _incidents:
        if inc['id'] == incident_id:
            inc['status'] = status
            return inc
    return None
