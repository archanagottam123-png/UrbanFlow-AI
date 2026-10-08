import React from 'react';
import AppLayout from '../components/layout/AppLayout';
import PageHeader from '../components/ui/PageHeader';
import { MapPin, AlertTriangle } from 'lucide-react';
import { HIGH_RISK_JUNCTIONS } from '../data/demoData';
import { getRiskBadgeClass } from '../utils/helpers';

export default function HighRiskJunctions() {
  return (
    <AppLayout>
      <div className="p-6 space-y-6">
        <PageHeader icon={MapPin} title="High-Risk Junctions" subtitle="Areas requiring immediate attention or long-term planning" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {HIGH_RISK_JUNCTIONS.map(j => (
            <div key={j.id} className="card p-5 border-t-4" style={{ borderTopColor: j.riskLevel === 'critical' ? '#ef4444' : '#f97316' }}>
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-bold text-white">{j.name}</h3>
                  <p className="text-xs text-slate-400">{j.city} — {j.road}</p>
                </div>
                <span className={getRiskBadgeClass(j.riskLevel)}>{j.riskLevel}</span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-slate-300"><span>Peak Time</span><span>{j.peakCongestionTime}</span></div>
                <div className="flex justify-between text-slate-300"><span>Avg Delay</span><span className="text-red-400">{j.averageDelay} min</span></div>
                <div className="flex justify-between text-slate-300"><span>Congestion Freq</span><span>{j.congestionFrequency}%</span></div>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-700/50">
                <p className="text-xs font-medium text-slate-400 flex items-center gap-1 mb-2"><AlertTriangle size={12}/> Key Factors</p>
                <div className="flex flex-wrap gap-1.5">
                  {j.mainFactors.map((f, i) => <span key={i} className="text-[10px] bg-slate-700 px-2 py-1 rounded text-slate-300">{f}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
