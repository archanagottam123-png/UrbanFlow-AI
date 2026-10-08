import React from 'react';
import { AlertCircle } from 'lucide-react';

export default function DemoBanner() {
  return (
    <div className="flex items-center gap-2 bg-amber-950/40 border border-amber-700/40 rounded-lg px-4 py-2.5 text-amber-400 text-xs">
      <AlertCircle size={14} className="flex-shrink-0" />
      <span>
        <strong>Prototype — Demonstration Data.</strong> All predictions, statistics, and recommendations are model-generated simulations and do not represent real-time traffic conditions.
      </span>
    </div>
  );
}
