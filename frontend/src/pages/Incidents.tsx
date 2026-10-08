import React, { useState } from 'react';
import AppLayout from '../components/layout/AppLayout';
import PageHeader from '../components/ui/PageHeader';
import { AlertTriangle, Plus } from 'lucide-react';
import { INCIDENTS } from '../data/demoData';
import { getSeverityBadgeClass, formatTimeAgo } from '../utils/helpers';

export default function Incidents() {
  const [incidents] = useState(INCIDENTS);

  return (
    <AppLayout>
      <div className="p-6 space-y-6">
        <PageHeader 
          icon={AlertTriangle} 
          title="Incident Management" 
          subtitle="Track and manage road incidents"
          actions={<button className="btn-primary text-sm flex items-center gap-1.5"><Plus size={16}/> Report Incident</button>}
        />
        
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-800/50 text-slate-400 border-b border-slate-700/50">
                <tr>
                  <th className="px-4 py-3 font-medium">Type</th>
                  <th className="px-4 py-3 font-medium">Location</th>
                  <th className="px-4 py-3 font-medium">Description</th>
                  <th className="px-4 py-3 font-medium">Severity</th>
                  <th className="px-4 py-3 font-medium">Time</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {incidents.map(inc => (
                  <tr key={inc.id} className="hover:bg-slate-800/30">
                    <td className="px-4 py-3 text-white capitalize">{inc.type}</td>
                    <td className="px-4 py-3 text-slate-300">{inc.location}</td>
                    <td className="px-4 py-3 text-slate-400 max-w-xs truncate">{inc.description}</td>
                    <td className="px-4 py-3"><span className={getSeverityBadgeClass(inc.severity)}>{inc.severity}</span></td>
                    <td className="px-4 py-3 text-slate-400">{formatTimeAgo(inc.dateTime)}</td>
                    <td className="px-4 py-3">
                      <select className="bg-slate-700/50 border border-slate-600 rounded px-2 py-1 text-xs text-white">
                        <option value="active">Active</option>
                        <option value="monitoring">Monitoring</option>
                        <option value="resolved">Resolved</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
