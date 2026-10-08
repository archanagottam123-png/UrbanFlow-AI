import numpy as np
from typing import List, Dict, Any

def generate_hourly_data(city: str = 'Bengaluru') -> List[Dict[str, Any]]:
    """Generate realistic hourly traffic data for a city."""
    base_volumes = [200,150,100,80,120,450,1200,2100,2400,1800,1400,1600,
                    1800,1500,1300,1600,2000,2200,1800,1400,1000,700,450,300]
    base_speeds = [55,60,62,65,58,40,22,14,12,18,24,22,
                   20,24,26,22,16,14,18,24,32,40,48,55]
    hourly = []
    for h in range(24):
        vol = int(base_volumes[h] + np.random.randint(-50, 50))
        speed = max(8, base_speeds[h] + np.random.randint(-3, 3))
        queue = max(0, int((2400 - vol) * 0.3 + np.random.randint(-20, 20)))
        if vol > 2000: cl = 'severe'
        elif vol > 1500: cl = 'high'
        elif vol > 800: cl = 'moderate'
        else: cl = 'low'
        hourly.append({'time': f'{h:02d}:00', 'vehicle_count': vol, 'average_speed': float(speed), 'queue_length': float(queue), 'congestion_level': cl})
    return hourly

def generate_weekly_data() -> List[Dict[str, Any]]:
    days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']
    multipliers = [1.0, 1.0, 1.05, 1.0, 1.1, 0.75, 0.5]
    return [{'day': d, 'avg_congestion': int(65 * m + np.random.randint(-5, 5)),
              'peak_volume': int(2200 * m + np.random.randint(-50, 50)),
              'avg_delay': int(18 * m + np.random.randint(-2, 3))}
            for d, m in zip(days, multipliers)]

def get_peak_hours() -> List[Dict[str, Any]]:
    return [
        {'period': 'Morning Peak', 'time': '8:00 AM – 10:00 AM', 'avg_volume': 2250, 'avg_delay': 22, 'congestion': 'Severe'},
        {'period': 'Lunch Peak', 'time': '12:30 PM – 2:00 PM', 'avg_volume': 1650, 'avg_delay': 12, 'congestion': 'High'},
        {'period': 'Evening Peak', 'time': '5:30 PM – 8:00 PM', 'avg_volume': 2100, 'avg_delay': 20, 'congestion': 'Severe'},
        {'period': 'Off-Peak Night', 'time': '11:00 PM – 5:00 AM', 'avg_volume': 180, 'avg_delay': 2, 'congestion': 'Low'},
    ]
