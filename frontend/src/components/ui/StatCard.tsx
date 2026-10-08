import React from 'react';
import clsx from 'clsx';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  unit?: string;
  trend?: number;
  icon: LucideIcon;
  iconColor?: string;
  iconBg?: string;
  subtitle?: string;
  alert?: boolean;
}

export default function StatCard({ title, value, unit, trend, icon: Icon, iconColor = 'text-blue-400', iconBg = 'bg-blue-600/20', subtitle, alert }: StatCardProps) {
  return (
    <div className={clsx('card p-5 flex flex-col gap-3', alert && 'border-red-500/40 bg-red-900/10')}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">{title}</p>
          <div className="flex items-baseline gap-1.5 mt-1">
            <span className="text-3xl font-bold text-white">{value}</span>
            {unit && <span className="text-sm text-slate-400">{unit}</span>}
          </div>
        </div>
        <div className={clsx('w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0', iconBg)}>
          <Icon className={clsx('w-5 h-5', iconColor)} />
        </div>
      </div>
      {(trend !== undefined || subtitle) && (
        <div className="flex items-center gap-2">
          {trend !== undefined && (
            <span className={clsx('text-xs font-medium', trend > 0 ? 'text-red-400' : 'text-green-400')}>
              {trend > 0 ? '▲' : '▼'} {Math.abs(trend)}%
            </span>
          )}
          {subtitle && <span className="text-xs text-slate-500">{subtitle}</span>}
        </div>
      )}
    </div>
  );
}
