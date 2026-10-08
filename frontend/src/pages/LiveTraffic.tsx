import React, { useState } from 'react';
import AppLayout from '../components/layout/AppLayout';
import DemoBanner from '../components/ui/DemoBanner';
import TrafficMap from '../components/map/TrafficMap';
import JunctionPanel from '../components/map/JunctionPanel';
import { JUNCTIONS, CITIES } from '../data/demoData';
import type { Junction, City } from '../types';
import { getCongestionBadgeClass } from '../utils/helpers';
import { MapPin, Filter } from 'lucide-react';

export default function LiveTraffic() {
  const [selectedCity, setSelectedCity] = useState<City>('Bengaluru');
  const [selectedJunction, setSelectedJunction] = useState<Junction | null>(null);

  const filteredJunctions = JUNCTIONS.filter(j => j.city === selectedCity);
  const cityCenter: Record<City, [number, number]> = {
    'Bengaluru': [12.9716, 77.5946],
    'Hyderabad': [17.4125, 78.4095],
    'Chennai': [13.0827, 80.2707],
  };

  return (
    <AppLayout>
      <div className="p-6 space-y-4 h-full">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Live Traffic Map</h1>
            <p className="text-sm text-slate-400">Interactive junction monitoring (Demonstration Data)</p>
          </div>
          <div className="flex items-center gap-3">
            {CITIES.map(city => (
              <button
                key={city}
                onClick={() => { setSelectedCity(city); setSelectedJunction(null); }}
                className={selectedCity === city ? 'btn-primary text-sm' : 'btn-secondary text-sm'}
              >
                {city}
              </button>
            ))}
          </div>
        </div>

        <DemoBanner />

        {/* Legend */}
        <div className="flex items-center gap-4 text-xs text-slate-400">
          <span className="font-medium text-slate-300">Congestion:</span>
          {[['#22c55e', 'Low'], ['#eab308', 'Moderate'], ['#f97316', 'High'], ['#ef4444', 'Severe']].map(([color, label]) => (
            <span key={label} className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
              {label}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4" style={{ height: 'calc(100vh - 280px)' }}>
          {/* Junction List */}
          <div className="card p-4 overflow-y-auto lg:col-span-1">
            <h3 className="text-sm font-semibold text-white mb-3">Junctions ({filteredJunctions.length})</h3>
            <div className="space-y-2">
              {filteredJunctions.map(j => (
                <button
                  key={j.id}
                  onClick={() => setSelectedJunction(j)}
                  className={`w-full text-left p-2.5 rounded-lg transition-colors ${
                    selectedJunction?.id === j.id ? 'bg-blue-600/20 border border-blue-500/40' : 'bg-slate-700/30 hover:bg-slate-700/50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-xs font-medium text-white leading-tight">{j.name}</p>
                      <p className="text-[10px] text-slate-500 mt-0.5">{j.vehicleCount} veh/hr · {j.averageSpeed} km/h</p>
                    </div>
                    <span className={getCongestionBadgeClass(j.congestionLevel)}>{j.congestionLevel}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Map */}
          <div className="lg:col-span-3 relative">
            <TrafficMap
              junctions={filteredJunctions}
              center={cityCenter[selectedCity]}
              zoom={12}
              onJunctionClick={setSelectedJunction}
              height="100%"
            />
            {selectedJunction && (
              <JunctionPanel junction={selectedJunction} onClose={() => setSelectedJunction(null)} />
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
