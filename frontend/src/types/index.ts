export type CongestionLevel = 'low' | 'moderate' | 'high' | 'severe';
export type City = 'Bengaluru' | 'Hyderabad' | 'Chennai';
export type WeatherCondition = 'Clear' | 'Cloudy' | 'Rain' | 'Heavy Rain' | 'Fog';
export type IncidentType = 'accident' | 'construction' | 'breakdown' | 'closure' | 'waterlogging' | 'event' | 'other';
export type IncidentStatus = 'active' | 'monitoring' | 'resolved';
export type UserRole = 'admin' | 'analyst' | 'researcher' | 'public';

export interface Junction {
  id: string;
  name: string;
  city: City;
  road: string;
  lat: number;
  lng: number;
  vehicleCount: number;
  averageSpeed: number;
  queueLength: number;
  congestionLevel: CongestionLevel;
  predictedCongestion: CongestionLevel;
  predictionTime: string;
  possibleCauses: string[];
  recommendedIntervention: string;
  laneCount: number;
  signalCycle: number;
}

export interface TrafficDataPoint {
  time: string;
  vehicleCount: number;
  averageSpeed: number;
  queueLength: number;
  congestionLevel: CongestionLevel;
}

export interface PredictionResult {
  probability: number;
  confidence: number;
  expectedVehicleVolume: number;
  expectedAverageSpeed: number;
  expectedQueueLength: number;
  expectedTravelTime: number;
  congestionLevel: CongestionLevel;
  forecast: { time: string; probability: number }[];
  factors: { label: string; percentage: number; color: string }[];
  explanation: string;
  dataType: 'simulated';
}

export interface SimulationScenario {
  greenSignalDuration: number;
  redSignalDuration: number;
  vehicleVolume: number;
  diversionPercentage: number;
  availableLanes: number;
  hasRoadBlockage: boolean;
  weatherCondition: WeatherCondition;
}

export interface SimulationResult {
  current: ScenarioOutput;
  proposed: ScenarioOutput;
  improvement: {
    queueReduction: number;
    travelTimeReduction: number;
    speedIncrease: number;
    throughputIncrease: number;
  };
  dataType: 'simulated';
}

export interface ScenarioOutput {
  queueLength: number;
  travelTime: number;
  averageSpeed: number;
  congestionLevel: CongestionLevel;
  vehicleThroughput: number;
}

export interface Incident {
  id: string;
  type: IncidentType;
  location: string;
  city: City;
  lat: number;
  lng: number;
  dateTime: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  impactRadius: number;
  status: IncidentStatus;
  reportedBy: string;
}

export interface HighRiskJunction {
  id: string;
  name: string;
  city: City;
  road: string;
  congestionFrequency: number;
  averageDelay: number;
  peakCongestionTime: string;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  mainFactors: string[];
  weeklyIncidents: number;
  avgVehicleCount: number;
}

export interface Recommendation {
  id: string;
  title: string;
  reason: string;
  expectedImpact: string;
  confidence: number;
  simulationResult: string;
  priority: 'low' | 'medium' | 'high';
  junctionId: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface DashboardStats {
  currentCongestionLevel: number;
  predictedCongestionLevel: number;
  averageTravelTime: number;
  averageVehicleSpeed: number;
  activeIncidents: number;
  highRiskJunctions: number;
  dataType: 'simulated';
}
