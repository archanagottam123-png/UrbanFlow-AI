import React, { useState } from 'react';
import AppLayout from '../components/layout/AppLayout';
import PageHeader from '../components/ui/PageHeader';
import DemoBanner from '../components/ui/DemoBanner';
import ComparisonChart from '../components/charts/ComparisonChart';
import { Zap, Play } from 'lucide-react';
import { JUNCTIONS } from '../data/demoData';

export default function Simulation() {
  const [running, setRunning] = useState(false);
  const [ran, setRan] = useState(false);

  const [params, setParams] = useState({
    green: 45,
    red: 45,
    vol: 2840,
    div: 0,
    lanes: 6,
  });

  const currentResult = { queue: 800, time: 18, speed: 12 };
  const proposedResult = { 
    queue: Math.max(100, 800 - (params.green - 45) * 10 - params.div * 15),
    time: Math.max(5, 18 - (params.green - 45) * 0.2 - params.div * 0.3),
    speed: Math.min(60, 12 + (params.green - 45) * 0.5 + params.div * 0.5)
  };

  const compData = [
    { metric: 'Queue (m)', current: currentResult.queue, proposed: proposedResult.queue },
    { metric: 'Time (min)', current: currentResult.time, proposed: proposedResult.time },
    { metric: 'Speed (km/h)', current: currentResult.speed, proposed: proposedResult.speed },
  ];

  const handleRun = () => {
    setRunning(true);
    setTimeout(() => {
      setRunning(false);
      setRan(true);
    }, 1000);
  };

  return (
    <AppLayout>
      <div className="p-6 space-y-6">
        <PageHeader icon={Zap} title="What-If Simulation" subtitle="Test interventions and see simulated impact" />
        <DemoBanner />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="card p-5 space-y-5">
            <h3 className="font-semibold text-white text-sm">Scenario Parameters</h3>
            <div>
              <label className="text-xs text-slate-400 block mb-1">Target Junction</label>
              <select className="select-field">
                {JUNCTIONS.map(j => <option key={j.id} value={j.id}>{j.name}</option>)}
              </select>
            </div>
            
            <div className="space-y-4 pt-2">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300">Green Signal</span>
                  <span className="text-blue-400">{params.green}s</span>
                </div>
                <input type="range" min="15" max="120" value={params.green} onChange={e => setParams({...params, green: +e.target.value})} className="w-full accent-blue-500" />
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300">Red Signal</span>
                  <span className="text-red-400">{params.red}s</span>
                </div>
                <input type="range" min="15" max="120" value={params.red} onChange={e => setParams({...params, red: +e.target.value})} className="w-full accent-red-500" />
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300">Incoming Volume</span>
                  <span className="text-amber-400">{params.vol} veh/hr</span>
                </div>
                <input type="range" min="500" max="4000" step="50" value={params.vol} onChange={e => setParams({...params, vol: +e.target.value})} className="w-full accent-amber-500" />
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300">Upstream Diversion</span>
                  <span className="text-purple-400">{params.div}%</span>
                </div>
                <input type="range" min="0" max="50" value={params.div} onChange={e => setParams({...params, div: +e.target.value})} className="w-full accent-purple-500" />
              </div>
            </div>

            <button onClick={handleRun} disabled={running} className="btn-primary w-full flex items-center justify-center gap-2">
              <Play size={16} /> {running ? 'Simulating...' : 'Run Simulation'}
            </button>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="card p-5 border-red-900/30">
                <h3 className="font-semibold text-white text-sm mb-4">Current Baseline</h3>
                <div className="space-y-3">
                  <div className="flex justify-between"><span className="text-sm text-slate-400">Queue Length</span><span className="text-lg font-bold text-red-400">{currentResult.queue}m</span></div>
                  <div className="flex justify-between"><span className="text-sm text-slate-400">Travel Time</span><span className="text-lg font-bold text-orange-400">{currentResult.time} min</span></div>
                  <div className="flex justify-between"><span className="text-sm text-slate-400">Avg Speed</span><span className="text-lg font-bold text-yellow-400">{currentResult.speed} km/h</span></div>
                </div>
              </div>
              <div className="card p-5 border-green-900/30">
                <h3 className="font-semibold text-white text-sm mb-4">Proposed Outcome</h3>
                {ran ? (
                  <div className="space-y-3">
                    <div className="flex justify-between"><span className="text-sm text-slate-400">Queue Length</span><span className="text-lg font-bold text-green-400">{Math.round(proposedResult.queue)}m</span></div>
                    <div className="flex justify-between"><span className="text-sm text-slate-400">Travel Time</span><span className="text-lg font-bold text-green-400">{Math.round(proposedResult.time)} min</span></div>
                    <div className="flex justify-between"><span className="text-sm text-slate-400">Avg Speed</span><span className="text-lg font-bold text-green-400">{Math.round(proposedResult.speed)} km/h</span></div>
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center text-sm text-slate-500">Run simulation to view results</div>
                )}
              </div>
            </div>

            {ran && (
              <div className="card p-5">
                <h3 className="font-semibold text-white text-sm mb-4">Impact Comparison</h3>
                <ComparisonChart data={compData} height={250} />
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
