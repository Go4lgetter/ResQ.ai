import React from 'react';
import { useEmergency } from '../../context/EmergencyContext';
import { Cpu, CheckCircle2, User, MapPin, Activity, AlertCircle, Sparkles } from 'lucide-react';

export const ExtractedInformation: React.FC = () => {
  const { activeIncident } = useEmergency();

  const items = [
    { label: 'Caller', value: activeIncident.caller, icon: User, color: 'text-slate-200' },
    { label: 'Emergency Type', value: activeIncident.emergencyType, icon: AlertCircle, color: 'text-red-400 font-bold' },
    { label: 'Location', value: activeIncident.location, icon: MapPin, color: 'text-cyan-300 font-semibold' },
    { label: 'Symptoms', value: activeIncident.symptoms.join(', '), icon: Activity, color: 'text-amber-300' },
    { label: 'Severity', value: activeIncident.severity, icon: Sparkles, color: 'text-red-400 font-bold uppercase' },
    { label: 'Patient Status', value: activeIncident.patientStatus, icon: CheckCircle2, color: 'text-slate-200' }
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-2xl flex flex-col justify-between h-full">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider font-mono">
                AI Extracted Information
              </h3>
              <p className="text-[11px] text-slate-400">Entities extracted from live stream</p>
            </div>
          </div>

          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
            AUTO PARSED
          </span>
        </div>

        {/* Compact Key-Value Rows */}
        <div className="space-y-2 font-mono text-xs">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-955 border border-slate-800/80 hover:border-slate-700 transition"
              >
                <div className="flex items-center gap-2 text-slate-400">
                  <Icon className="w-4 h-4 text-cyan-400" />
                  <span>{item.label}</span>
                </div>
                <div className={`text-right ${item.color} truncate max-w-[200px]`}>
                  {item.value}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Confidence Gauges Footer */}
      <div className="mt-4 pt-3 border-t border-slate-800 grid grid-cols-2 gap-3 text-[11px] font-mono">
        <div className="p-2 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between">
          <span className="text-slate-400">Location Conf:</span>
          <span className="font-bold text-cyan-400">{activeIncident.locationConfidence}%</span>
        </div>
        <div className="p-2 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between">
          <span className="text-slate-400">Medical Conf:</span>
          <span className="font-bold text-emerald-400">{activeIncident.medicalConfidence}%</span>
        </div>
      </div>
    </div>
  );
};
