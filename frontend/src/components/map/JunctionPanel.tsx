import React from 'react';
import type { Junction } from '../../types';
import { getCongestionBadgeClass } from '../../utils/helpers';
import { X, MapPin, Car, Gauge, AlignRight, Clock, Lightbulb, AlertCircle } from 'lucide-react';

interface JunctionPanelProps {
  junction: Junction;
  onClose: () => void;
}

export default function JunctionPanel({ junction, onClose }: JunctionPanelProps) {
  return (
    <div className="absolute right-4 top-4 bottom-4 w-80 z-[500] overflow-y-auto">
      <div className="card p-5 space-y-4 shadow-2xl">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-bold text-white text-base">{junction.name}</h3>
            <div className="flex items-center gap-1 text-xs text-slate-400 mt-0.5">
              <MapPin size={11} />
              <span>{junction.city} — {junction.road}</span>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-white">
            <X size={16} />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {[
            { icon: Car, label: 'Vehicle Count', value: `${junction.vehicleCount} veh/hr` },
            { icon: Gauge, label: 'Avg Speed', value: `${junction.averageSpeed} km/h` },
            { icon: AlignRight, label: 'Queue Length', value: `${junction.queueLength} m` },
            { icon: Clock, label: 'Signal Cycle', value: `${junction.signalCycle}s` },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="bg-slate-700/40 rounded-lg p-3">
              <div className="flex items-center gap-1.5 mb-1">
                <Icon size={12} className="text-slate-400" />
                <span className="text-xs text-slate-400">{label}</span>
              </div>
              <p className="text-sm font-semibold text-white">{value}</p>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400">Current Congestion</span>
            <span className={getCongestionBadgeClass(junction.congestionLevel)}>
              {junction.congestionLevel.toUpperCase()}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400">Predicted ({junction.predictionTime})</span>
            <span className={getCongestionBadgeClass(junction.predictedCongestion)}>
              {junction.predictedCongestion.toUpperCase()}
            </span>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-1.5 mb-2">
            <AlertCircle size={13} className="text-orange-400" />
            <p className="text-xs font-medium text-slate-300">Possible Causes</p>
          </div>
          <ul className="space-y-1">
            {junction.possibleCauses.map((cause, i) => (
              <li key={i} className="text-xs text-slate-400 flex items-start gap-1.5">
                <span className="text-slate-600 mt-0.5">•</span>
                {cause}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="flex items-center gap-1.5 mb-2">
            <Lightbulb size={13} className="text-blue-400" />
            <p className="text-xs font-medium text-slate-300">Recommended Intervention</p>
          </div>
          <p className="text-xs text-slate-400 bg-blue-900/20 border border-blue-700/30 rounded-lg p-3">
            {junction.recommendedIntervention}
          </p>
        </div>

        <p className="text-[10px] text-slate-500 italic">
          Model-generated prediction. Not a guaranteed outcome.
        </p>
      </div>
    </div>
  );
}
