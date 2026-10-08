import { CongestionLevel } from '../types';

export function getCongestionColor(level: CongestionLevel): string {
  const colors: Record<CongestionLevel, string> = {
    low: '#22c55e',
    moderate: '#eab308',
    high: '#f97316',
    severe: '#ef4444',
  };
  return colors[level];
}

export function getCongestionBadgeClass(level: CongestionLevel): string {
  const classes: Record<CongestionLevel, string> = {
    low: 'badge-green',
    moderate: 'badge-yellow',
    high: 'badge-orange',
    severe: 'badge-red',
  };
  return classes[level];
}

export function formatTimeAgo(dateString: string): string {
  const diff = Math.floor((Date.now() - new Date(dateString).getTime()) / 60000);
  if (diff < 1) return 'Just now';
  if (diff < 60) return `${diff} min ago`;
  if (diff < 1440) return `${Math.floor(diff / 60)} hr ago`;
  return `${Math.floor(diff / 1440)} day ago`;
}

export function getRiskBadgeClass(level: string): string {
  const map: Record<string, string> = {
    critical: 'badge-red',
    high: 'badge-orange',
    medium: 'badge-yellow',
    low: 'badge-green',
  };
  return map[level] || 'badge-green';
}

export function getSeverityBadgeClass(severity: string): string {
  const map: Record<string, string> = {
    critical: 'badge-red',
    high: 'badge-orange',
    medium: 'badge-yellow',
    low: 'badge-green',
  };
  return map[severity] || 'badge-green';
}
