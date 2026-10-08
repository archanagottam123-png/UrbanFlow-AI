import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Activity, MapPin, Search, Clock, AlertTriangle, Navigation, TrendingUp, ChevronRight } from 'lucide-react';

const ROUTES = [
  {
    from: 'Electronic City',
    to: 'MG Road',
    via: 'Hosur Road → Silk Board → Richmond Road',
    time: 42,
    distance: '18 km',
    congestion: 'Severe',
    congestionColor: 'text-red-400',
    incidents: 1,
  },
  {
    from: 'Electronic City',
    to: 'MG Road',
    via: 'Hosur Road → BTM Layout → Langford Road',
    time: 35,
    distance: '22 km',
    congestion: 'Moderate',
    congestionColor: 'text-yellow-400',
    incidents: 0,
    recommended: true,
  },
  {
    from: 'Electronic City',
    to: 'MG Road',
    via: 'Bannerghatta Road → Jayanagar → Residency Road',
    time: 38,
    distance: '24 km',
    congestion: 'High',
    congestionColor: 'text-orange-400',
    incidents: 0,
  },
];

const POPULAR_ROUTES = [
  { from: 'Whitefield', to: 'Silk Board', time: 55, congestion: 'Severe' },
  { from: 'Hebbal', to: 'KR Puram', time: 28, congestion: 'High' },
  { from: 'HITEC City', to: 'Banjara Hills', time: 22, congestion: 'Moderate' },
  { from: 'Koyambedu', to: 'Anna Salai', time: 18, congestion: 'High' },
];

export default function PublicView() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [searched, setSearched] = useState(false);

  const handleSearch = () => {
    if (from.trim() || to.trim()) setSearched(true);
  };

  const handlePopular = (route: typeof POPULAR_ROUTES[0]) => {
    setFrom(route.from);
    setTo(route.to);
    setSearched(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Nav */}
      <nav className="bg-slate-900/80 border-b border-slate-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
            <Activity className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold">UrbanFlow<span className="text-blue-400"> AI</span></span>
          <span className="text-xs text-slate-500 ml-2">Public Portal</span>
        </div>
        <Link to="/login" className="btn-primary text-sm">Traffic Dashboard →</Link>
      </nav>

      <div className="max-w-2xl mx-auto px-4 py-10 space-y-6">
        {/* Hero */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-white">Plan Your Route</h1>
          <p className="text-slate-400 text-sm">Check current congestion and predicted travel times across Indian cities.</p>
          <div className="inline-flex items-center gap-2 bg-amber-900/30 border border-amber-700/40 text-amber-400 text-xs px-3 py-1.5 rounded-full">
            <AlertTriangle size={12} />
            Prototype — Simulated Data Only
          </div>
        </div>

        {/* Search Card */}
        <div className="card p-5 space-y-4">
          <div className="grid grid-cols-1 gap-3">
            <div>
              <label className="text-xs text-slate-400 block mb-1.5">From</label>
              <div className="relative">
                <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={from}
                  onChange={e => setFrom(e.target.value)}
                  className="input-field pl-8"
                  placeholder="e.g., Electronic City, Bengaluru"
                />
              </div>
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1.5">To</label>
              <div className="relative">
                <Navigation size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={to}
                  onChange={e => setTo(e.target.value)}
                  className="input-field pl-8"
                  placeholder="e.g., MG Road, Bengaluru"
                />
              </div>
            </div>
          </div>
          <button
            onClick={handleSearch}
            className="btn-primary w-full flex items-center justify-center gap-2"
          >
            <Search size={16} />
            Find Routes & Estimated Time
          </button>
        </div>

        {/* Popular Routes */}
        {!searched && (
          <div className="card p-5">
            <h3 className="text-sm font-semibold text-white mb-3">Popular Routes Right Now</h3>
            <div className="space-y-2">
              {POPULAR_ROUTES.map((route, i) => (
                <button
                  key={i}
                  onClick={() => handlePopular(route)}
                  className="w-full flex items-center justify-between p-3 bg-slate-700/30 hover:bg-slate-700/50 rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-2 text-sm text-slate-200">
                    <MapPin size={12} className="text-slate-400" />
                    <span>{route.from}</span>
                    <ChevronRight size={12} className="text-slate-500" />
                    <span>{route.to}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="flex items-center gap-1 text-slate-400">
                      <Clock size={11} />{route.time} min
                    </span>
                    <span className={`font-medium ${
                      route.congestion === 'Severe' ? 'text-red-400' :
                      route.congestion === 'High' ? 'text-orange-400' : 'text-yellow-400'
                    }`}>{route.congestion}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Route Results */}
        {searched && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white">
                Route Options — {from || 'Origin'} → {to || 'Destination'}
              </h3>
              <button onClick={() => setSearched(false)} className="text-xs text-slate-400 hover:text-slate-200">
                ← Back
              </button>
            </div>

            {ROUTES.map((route, i) => (
              <div key={i} className={`card p-4 ${route.recommended ? 'border-green-700/50 bg-green-950/10' : ''}`}>
                {route.recommended && (
                  <div className="flex items-center gap-1 text-green-400 text-xs font-medium mb-2">
                    <TrendingUp size={12} />
                    Recommended Route
                  </div>
                )}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs text-slate-400 mb-1">Via</p>
                    <p className="text-sm text-white font-medium leading-relaxed">{route.via}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                      <span>{route.distance}</span>
                      {route.incidents > 0 && (
                        <span className="flex items-center gap-1 text-orange-400">
                          <AlertTriangle size={11} />{route.incidents} incident
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-2xl font-extrabold text-white">{route.time}</p>
                    <p className="text-xs text-slate-400">min</p>
                    <p className={`text-xs font-semibold mt-1 ${route.congestionColor}`}>
                      {route.congestion}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            <div className="card p-4 bg-blue-950/20 border-blue-800/30">
              <div className="flex items-start gap-3">
                <TrendingUp size={16} className="text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-white">Predicted Congestion in 30 min</p>
                  <p className="text-xs text-slate-400 mt-1">
                    Silk Board Junction is predicted to reach <strong className="text-red-400">SEVERE</strong> congestion
                    within 30 minutes. Consider departing now or waiting 45+ minutes.
                  </p>
                  <p className="text-[10px] text-slate-600 mt-2 italic">
                    Model-generated prediction — not a guaranteed outcome.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center text-xs text-slate-600 space-y-1 pt-4 border-t border-slate-800">
          <p>UrbanFlow AI is a research and demonstration platform.</p>
          <p>All data is synthetic and for portfolio demonstration only.</p>
          <Link to="/" className="text-blue-500 hover:text-blue-400">Learn more →</Link>
        </div>
      </div>
    </div>
  );
}
