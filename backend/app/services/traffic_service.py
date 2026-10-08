import numpy as np
from typing import List, Dict, Any
from app.ml.explainer import generate_recommendations

# Realistic junction data for Indian cities
JUNCTIONS = [
    {
        'id': 'blr-001', 'name': 'Silk Board Junction', 'city': 'Bengaluru',
        'road': 'Hosur Road / Outer Ring Road', 'lat': 12.9170, 'lng': 77.6228,
        'vehicle_count': 2840, 'average_speed': 12, 'queue_length': 920,
        'congestion_level': 'severe', 'predicted_congestion': 'severe',
        'prediction_time': '30 minutes',
        'possible_causes': ['School/office opening hours', 'Signal timing imbalance', 'Lane merging conflict'],
        'recommended_intervention': 'Extend green phase on Hosur Road by 20s',
        'lane_count': 6, 'signal_cycle': 120,
    },
    {
        'id': 'blr-002', 'name': 'KR Puram Junction', 'city': 'Bengaluru',
        'road': 'Old Madras Road / ITPL Main Road', 'lat': 12.9963, 'lng': 77.6939,
        'vehicle_count': 1980, 'average_speed': 18, 'queue_length': 680,
        'congestion_level': 'high', 'predicted_congestion': 'severe',
        'prediction_time': '15 minutes',
        'possible_causes': ['Peak hour traffic from Whitefield', 'Metro construction nearby'],
        'recommended_intervention': 'Divert 20% traffic via NH44',
        'lane_count': 4, 'signal_cycle': 90,
    },
    {
        'id': 'blr-003', 'name': 'Marathahalli Bridge', 'city': 'Bengaluru',
        'road': 'Outer Ring Road', 'lat': 12.9591, 'lng': 77.6974,
        'vehicle_count': 1650, 'average_speed': 22, 'queue_length': 480,
        'congestion_level': 'high', 'predicted_congestion': 'high',
        'prediction_time': '45 minutes',
        'possible_causes': ['Office peak hours', 'Heavy vehicles on bridge'],
        'recommended_intervention': 'Coordinate signals with Tin Factory junction',
        'lane_count': 4, 'signal_cycle': 100,
    },
    {
        'id': 'hyd-001', 'name': 'HITEC City Junction', 'city': 'Hyderabad',
        'road': 'HITEC City Main Road', 'lat': 17.4474, 'lng': 78.3762,
        'vehicle_count': 2100, 'average_speed': 15, 'queue_length': 740,
        'congestion_level': 'severe', 'predicted_congestion': 'severe',
        'prediction_time': '20 minutes',
        'possible_causes': ['IT hub peak hours', 'Metro feeder traffic'],
        'recommended_intervention': 'Extend green phase by 25s, coordinate with metro',
        'lane_count': 4, 'signal_cycle': 110,
    },
    {
        'id': 'che-001', 'name': 'Kathipara Junction', 'city': 'Chennai',
        'road': 'GST Road / Inner Ring Road', 'lat': 13.0145, 'lng': 80.2009,
        'vehicle_count': 2380, 'average_speed': 14, 'queue_length': 860,
        'congestion_level': 'severe', 'predicted_congestion': 'severe',
        'prediction_time': '25 minutes',
        'possible_causes': ['4-way merge complexity', 'High freight vehicle density'],
        'recommended_intervention': 'Deploy traffic personnel, activate alternate route signs',
        'lane_count': 5, 'signal_cycle': 130,
    },
]

def get_all_junctions(city: str | None = None) -> List[Dict[str, Any]]:
    if city:
        return [j for j in JUNCTIONS if j['city'] == city]
    return JUNCTIONS

def get_junction_by_id(junction_id: str) -> Dict[str, Any] | None:
    for j in JUNCTIONS:
        if j['id'] == junction_id:
            return j
    return None
