import React from 'react';
import { useEmergency } from '../../context/EmergencyContext';
import { AlertTriangle, Truck, Clock, Sparkles, TrendingDown, ArrowUpRight } from 'lucide-react';

export const KPICards: React.FC = () => {
  const { activeIncident, responseUnits } = useEmergency();

  const activeCount = 3;
  const respondingCount = responseUnits.filter((u) => u.status === 'En route' || u.status === 'On Scene').length || 8;
  const avgResponseTime = '04:32';
  const aiConfidence = `${activeIncident.confidence}%`;

  const kpis = [
    {
      title: 'ACTIVE INCIDENTS',
      value: activeCount,
      change: '+1 priority case',
      isCritical: true,
      icon: AlertTriangle,
      color: 'text-red-400',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/30'
    },
    {
      title: 'RESPONDING UNITS',
      value: respondingCount,
      change: '8 of 12 units deployed',
      isCritical: false,
      icon: Truck,
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-500/10',
      borderColor: 'border-cyan-500/30'
    },
    {
      title: 'AVG RESPONSE TIME',
      value: avgResponseTime,
      change: '-18s vs target (05:00)',
      isCritical: false,
      icon: Clock,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/30'
    },
    {
      title: 'AI CONFIDENCE',
      value: aiConfidence,
      change: 'Model accuracy 98.6%',
      isCritical: false,
      icon: Sparkles,
      color: 'text-indigo-400',
      bgColor: 'bg-indigo-500/10',
      borderColor: 'border-indigo-500/30'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {kpis.map((kpi, index) => {
        const Icon = kpi.icon;
        return (
          <div
            key={index}
            className={`p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl relative overflow-hidden transition-all duration-200 hover:border-slate-700 group ${
              kpi.isCritical ? 'border-red-500/20 hover:border-red-500/40' : ''
            }`}
          >
            {/* Background subtle light blur */}
            <div className={`absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl opacity-15 pointer-events-none ${kpi.bgColor}`} />

            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono font-bold tracking-wider text-slate-400 uppercase">
                {kpi.title}
              </span>
              <div className={`p-2 rounded-xl border ${kpi.bgColor} ${kpi.borderColor} ${kpi.color}`}>
                <Icon className="w-4 h-4" />
              </div>
            </div>

            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-2xl font-black text-white font-mono tracking-tight">{kpi.value}</span>
            </div>

            <div className="flex items-center gap-1 text-[11px] text-slate-400 font-medium">
              {kpi.title === 'AVG RESPONSE TIME' ? (
                <TrendingDown className="w-3 h-3 text-emerald-400" />
              ) : (
                <ArrowUpRight className="w-3 h-3 text-cyan-400" />
              )}
              <span>{kpi.change}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
