import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Activity, TrendingUp, Zap, AlertTriangle, BarChart3, Brain, ArrowRight,
  MapPin, Users, Building, Globe, ChevronRight, Shield, Database
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

const FEATURES = [
  { icon: TrendingUp, title: 'Congestion Prediction', desc: 'ML-powered forecasting of traffic congestion up to 2 hours ahead, with probability scores and confidence intervals.', color: 'text-blue-400', bg: 'bg-blue-600/10 border-blue-700/30' },
  { icon: Brain, title: 'Explainable AI', desc: 'Understand why congestion is predicted with factor breakdown charts and plain-language AI explanations.', color: 'text-purple-400', bg: 'bg-purple-600/10 border-purple-700/30' },
  { icon: Zap, title: 'What-If Simulation', desc: 'Test interventions — signal timing changes, diversions, lane management — and see the simulated impact before acting.', color: 'text-yellow-400', bg: 'bg-yellow-600/10 border-yellow-700/30' },
  { icon: AlertTriangle, title: 'Incident Management', desc: 'Track and manage accidents, construction, waterlogging and other incidents with severity and impact radius mapping.', color: 'text-red-400', bg: 'bg-red-600/10 border-red-700/30' },
  { icon: BarChart3, title: 'Traffic Analytics', desc: 'Deep-dive into hourly, daily and weekly patterns. Identify peak hours and high-risk junctions with historical charts.', color: 'text-green-400', bg: 'bg-green-600/10 border-green-700/30' },
  { icon: Shield, title: 'Intelligent Recommendations', desc: 'AI-generated action recommendations with expected impact, confidence scores and simulation results.', color: 'text-cyan-400', bg: 'bg-cyan-600/10 border-cyan-700/30' },
];

const FLOW_STEPS = [
  { label: 'Traffic Data', desc: 'Multi-source data ingestion', icon: Database },
  { label: 'Processing', desc: 'Cleaning & feature engineering', icon: Activity },
  { label: 'AI Prediction', desc: 'ML-based forecasting', icon: Brain },
  { label: 'Cause Analysis', desc: 'Factor attribution', icon: TrendingUp },
  { label: 'Simulation', desc: 'What-if scenario testing', icon: Zap },
  { label: 'Recommendation', desc: 'Action suggestions', icon: Shield },
  { label: 'Monitoring', desc: 'Continuous feedback loop', icon: BarChart3 },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const { login, setDemoMode } = useAppStore();

  const handleRecruiterDemo = async () => {
    await login('demo@urbanflow.ai', 'demo123');
    setDemoMode(true);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold">UrbanFlow<span className="text-blue-400"> AI</span></span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/public" className="text-sm text-slate-400 hover:text-white transition-colors">Public View</Link>
            <Link to="/login" className="btn-secondary text-sm">Login</Link>
            <button onClick={handleRecruiterDemo} className="btn-primary text-sm flex items-center gap-1.5">
              <Zap size={14} />
              Recruiter Demo
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-28 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/30 via-slate-950 to-slate-950" />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl" />
        <div className="absolute top-40 right-1/4 w-64 h-64 bg-purple-600/5 rounded-full blur-3xl" />
        <div className="max-w-5xl mx-auto text-center relative">
          <div className="demo-banner inline-flex mb-6">⚠ Prototype — Demonstration Data Only</div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight mb-6">
            Predict Traffic<br />
            <span className="text-blue-400">Before It Becomes</span><br />
            a Problem.
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            UrbanFlow AI uses traffic data, predictive analytics and simulation to help identify emerging congestion and evaluate possible interventions — designed for Indian cities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/login"
              className="btn-primary text-base px-8 py-3 flex items-center justify-center gap-2"
            >
              Explore Dashboard <ArrowRight size={18} />
            </Link>
            <Link
              to="/login"
              className="btn-secondary text-base px-8 py-3 flex items-center justify-center gap-2"
            >
              <Zap size={18} />
              Try Simulation
            </Link>
            <button
              onClick={handleRecruiterDemo}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium text-base px-8 py-3 rounded-lg flex items-center justify-center gap-2 transition-all duration-200 shadow-lg shadow-blue-900/30"
            >
              <Zap size={18} />
              🎯 Recruiter Demo — 2 min tour
            </button>
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm text-slate-500">
            {['Bengaluru', 'Hyderabad', 'Chennai'].map(city => (
              <span key={city} className="flex items-center gap-1"><MapPin size={12} />{city}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-t border-b border-slate-800">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: '3', label: 'Cities Modelled', sub: 'Bengaluru, Hyderabad, Chennai' },
              { value: '15+', label: 'Junctions Tracked', sub: 'High-traffic intersections' },
              { value: '82%', label: 'Prediction Accuracy', sub: 'Simulated model performance' },
              { value: '6', label: 'Core Features', sub: 'End-to-end pipeline' },
            ].map(({ value, label, sub }) => (
              <div key={label}>
                <p className="text-4xl font-extrabold text-blue-400">{value}</p>
                <p className="text-sm font-semibold text-white mt-1">{label}</p>
                <p className="text-xs text-slate-500 mt-0.5">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-4">The Problem</h2>
          <p className="text-slate-400 text-center max-w-2xl mx-auto mb-12">
            Urban congestion in Indian cities like Bengaluru, Hyderabad and Chennai costs billions in productivity, fuel and time — every year.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: '⏱', stat: '60+ min', label: 'Average peak-hour delay', sub: 'On major corridors like Silk Board' },
              { icon: '⛽', stat: '35%', label: 'Excess fuel consumption', sub: 'Due to stop-and-go traffic patterns' },
              { icon: '📉', stat: '₹1.5L Cr', label: 'Annual productivity loss', sub: 'India urban congestion cost estimate' },
            ].map(({ icon, stat, label, sub }) => (
              <div key={label} className="card p-6 text-center">
                <div className="text-4xl mb-3">{icon}</div>
                <p className="text-3xl font-extrabold text-white">{stat}</p>
                <p className="text-sm font-semibold text-slate-300 mt-1">{label}</p>
                <p className="text-xs text-slate-500 mt-1">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-20 px-6 bg-slate-900/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-4">Our Approach</h2>
          <p className="text-slate-400 text-center max-w-xl mx-auto mb-12">A complete end-to-end pipeline from raw data to actionable insights.</p>
          <div className="flex flex-wrap justify-center items-center gap-2">
            {FLOW_STEPS.map(({ label, desc, icon: Icon }, i) => (
              <React.Fragment key={label}>
                <div className="flex flex-col items-center gap-2 p-4 card min-w-[110px]">
                  <div className="w-10 h-10 bg-blue-600/20 rounded-xl flex items-center justify-center">
                    <Icon className="w-5 h-5 text-blue-400" />
                  </div>
                  <p className="text-xs font-semibold text-white text-center">{label}</p>
                  <p className="text-[10px] text-slate-500 text-center">{desc}</p>
                </div>
                {i < FLOW_STEPS.length - 1 && (
                  <ChevronRight className="text-slate-600 flex-shrink-0" size={20} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-4">Key Features</h2>
          <p className="text-slate-400 text-center max-w-xl mx-auto mb-12">Everything you need to understand and manage urban traffic congestion.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map(({ icon: Icon, title, desc, color, bg }) => (
              <div key={title} className={`card p-6 border ${bg}`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${bg}`}>
                  <Icon className={`w-5 h-5 ${color}`} />
                </div>
                <h3 className="text-sm font-bold text-white mb-2">{title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Target Users */}
      <section className="py-20 px-6 bg-slate-900/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Built For</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { icon: Building, label: 'Traffic Authorities', desc: 'Monitor and respond to congestion in real time' },
              { icon: Globe, label: 'City Planners', desc: 'Identify infrastructure needs from data' },
              { icon: Users, label: 'Researchers', desc: 'Study traffic patterns and test interventions' },
              { icon: Activity, label: 'Transport Companies', desc: 'Plan routes and reduce fleet delays' },
              { icon: AlertTriangle, label: 'Emergency Planners', desc: 'Optimize emergency vehicle corridors' },
              { icon: Brain, label: 'Students & Academics', desc: 'Explore AI/ML in a real-world context' },
            ].map(({ icon: Icon, label, desc }) => (
              <div key={label} className="card p-4 flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-600/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{label}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to explore?</h2>
          <p className="text-slate-400 mb-8">Jump into the dashboard or try the Recruiter Demo for a guided 2-minute tour of all features.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleRecruiterDemo}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold text-base px-8 py-3 rounded-lg flex items-center justify-center gap-2 shadow-lg shadow-blue-900/30"
            >
              <Zap size={18} />
              🎯 Launch Recruiter Demo
            </button>
            <Link to="/login" className="btn-secondary text-base px-8 py-3">Login / Register</Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-slate-800">
        <div className="max-w-5xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="w-6 h-6 bg-blue-600 rounded-md flex items-center justify-center">
              <Activity className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-sm">UrbanFlow<span className="text-blue-400"> AI</span></span>
          </div>
          <p className="text-xs text-slate-500 max-w-2xl mx-auto">
            UrbanFlow AI is a research and demonstration platform. Predictions and recommendations are model-generated and should not be treated as authoritative instructions for real-world traffic control.
          </p>
          <p className="text-xs text-slate-600 mt-2">Built with React · TypeScript · Tailwind CSS · Python FastAPI · Scikit-learn</p>
        </div>
      </footer>
    </div>
  );
}
