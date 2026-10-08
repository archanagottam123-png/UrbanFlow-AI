import React from 'react';
import clsx from 'clsx';

interface RadialGaugeProps {
  value: number; // 0-100
  label?: string;
  size?: number;
}

export default function RadialGauge({ value, label = 'Probability', size = 180 }: RadialGaugeProps) {
  const radius = 70;
  const circumference = Math.PI * radius; // half circle
  const strokeDashoffset = circumference - (value / 100) * circumference;

  const color = value >= 80 ? '#ef4444' : value >= 60 ? '#f97316' : value >= 40 ? '#eab308' : '#22c55e';
  const levelText = value >= 80 ? 'SEVERE' : value >= 60 ? 'HIGH' : value >= 40 ? 'MODERATE' : 'LOW';

  return (
    <div className="flex flex-col items-center gap-2">
      <svg width={size} height={size / 2 + 30} viewBox={`0 0 ${size} ${size / 2 + 30}`}>
        {/* Background arc */}
        <path
          d={`M ${size * 0.1} ${size / 2} A ${radius} ${radius} 0 0 1 ${size * 0.9} ${size / 2}`}
          fill="none"
          stroke="#1e293b"
          strokeWidth="14"
          strokeLinecap="round"
        />
        {/* Value arc */}
        <path
          d={`M ${size * 0.1} ${size / 2} A ${radius} ${radius} 0 0 1 ${size * 0.9} ${size / 2}`}
          fill="none"
          stroke={color}
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          style={{ transition: 'stroke-dashoffset 0.8s ease' }}
        />
        {/* Value text */}
        <text x="50%" y="55%" textAnchor="middle" fill="white" fontSize="32" fontWeight="700">
          {value}%
        </text>
        <text x="50%" y="75%" textAnchor="middle" fill={color} fontSize="12" fontWeight="600">
          {levelText}
        </text>
      </svg>
      <p className="text-xs text-slate-400">{label}</p>
    </div>
  );
}
