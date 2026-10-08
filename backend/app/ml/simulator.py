"""
UrbanFlow AI — What-If Traffic Simulator

Rule-based simulation engine for traffic intervention scenarios.
All outputs are simulated/model-generated estimates for planning purposes only.
"""

import numpy as np
from typing import Dict, Any

WEATHER_IMPACT = {'Clear': 1.0, 'Cloudy': 0.97, 'Rain': 0.85, 'Heavy Rain': 0.70, 'Fog': 0.80}

def compute_scenario(vehicle_volume: int, green_signal: int, red_signal: int,
                     available_lanes: int, diversion_pct: float,
                     has_blockage: bool, weather: str) -> Dict[str, Any]:
    """
    Compute traffic metrics for a given scenario.
    Returns queue_length, travel_time, average_speed, congestion_level, vehicle_throughput.
    """
    # Effective volume after diversion
    effective_volume = vehicle_volume * (1 - diversion_pct / 100)

    # Signal efficiency: ratio of green time
    signal_efficiency = green_signal / (green_signal + red_signal)

    # Lane capacity (simplified: 450 vehicles/hr per lane under ideal conditions)
    lane_capacity = 450 * available_lanes * signal_efficiency

    # Weather degradation
    weather_factor = WEATHER_IMPACT.get(weather, 1.0)
    effective_capacity = lane_capacity * weather_factor

    # Blockage factor (blocks 40% of capacity)
    if has_blockage:
        effective_capacity *= 0.6

    # Throughput (can't exceed capacity)
    throughput = int(min(effective_volume, effective_capacity))

    # Queue builds when volume exceeds capacity
    excess_volume = max(0, effective_volume - effective_capacity)
    queue_length = round(excess_volume * 0.3 + np.random.uniform(-10, 10), 0)
    queue_length = max(0, queue_length)

    # Speed estimation: inversely related to queue
    base_speed = 60 * (1 - min(effective_volume / (effective_capacity * 1.5), 1))
    average_speed = max(5, round(base_speed * weather_factor, 1))

    # Travel time (assume 2km stretch)
    travel_time = round(2 / max(average_speed, 0.1) * 60, 1)  # minutes

    # Congestion level
    ratio = effective_volume / max(effective_capacity, 1)
    if ratio >= 1.3:
        congestion_level = 'severe'
    elif ratio >= 1.0:
        congestion_level = 'high'
    elif ratio >= 0.7:
        congestion_level = 'moderate'
    else:
        congestion_level = 'low'

    return {
        'queue_length': float(queue_length),
        'travel_time': float(travel_time),
        'average_speed': float(average_speed),
        'congestion_level': congestion_level,
        'vehicle_throughput': throughput,
    }

def run_simulation(green_signal: int, red_signal: int, vehicle_volume: int,
                   diversion_percentage: float, available_lanes: int,
                   has_road_blockage: bool, weather_condition: str,
                   junction_id: str = 'blr-001') -> Dict[str, Any]:
    """
    Run what-if simulation comparing current scenario vs proposed scenario.
    Current scenario uses default parameters (60s green, 60s red, 0% diversion, 4 lanes).
    """
    # Current scenario (default parameters)
    current = compute_scenario(
        vehicle_volume=vehicle_volume,
        green_signal=45,   # typical current green
        red_signal=75,     # typical current red
        available_lanes=max(available_lanes - 1, 1),  # one less lane as baseline
        diversion_pct=0,
        has_blockage=has_road_blockage,
        weather=weather_condition,
    )

    # Proposed scenario
    proposed = compute_scenario(
        vehicle_volume=vehicle_volume,
        green_signal=green_signal,
        red_signal=red_signal,
        available_lanes=available_lanes,
        diversion_pct=diversion_percentage,
        has_blockage=has_road_blockage,
        weather=weather_condition,
    )

    # Compute improvement
    improvement = {
        'queue_reduction': round(((current['queue_length'] - proposed['queue_length']) / max(current['queue_length'], 1)) * 100, 1),
        'travel_time_reduction': round(((current['travel_time'] - proposed['travel_time']) / max(current['travel_time'], 1)) * 100, 1),
        'speed_increase': round(((proposed['average_speed'] - current['average_speed']) / max(current['average_speed'], 1)) * 100, 1),
        'throughput_increase': proposed['vehicle_throughput'] - current['vehicle_throughput'],
    }

    return {
        'current': current,
        'proposed': proposed,
        'improvement': improvement,
    }
