import React from 'react';
import { useEmergency } from '../../context/EmergencyContext';
import { AlertTriangle, MapPin, User, Clock, ShieldAlert, Cpu, Sparkles } from 'lucide-react';

export const ActiveIncidentSummary: React.FC = () => {
  const { activeIncident } = useEmergency();

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-2xl relative overflow-hidden flex flex-col justify-between">
      {/* Top Red Glow Accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-rose-500 to-orange-500" />

      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400">
              <ShieldAlert className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider font-mono">Active Incident</h3>
              <span className="text-[10px] text-slate-400 font-mono">ID: {activeIncident.incidentId}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-extrabold bg-red-950 text-red-400 border border-red-500/50 shadow-lg shadow-red-950/50 animate-critical-glow">
              ● {activeIncident.status}
            </span>
          </div>
        </div>

        {/* Incident Metadata Key-Value Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4 font-mono text-xs">
          <div className="p-2.5 rounded-xl bg-slate-955 border border-slate-800/80">
            <div className="text-[10px] text-slate-400 uppercase">Emergency Type</div>
            <div className="text-sm font-bold text-red-400 mt-0.5">{activeIncident.emergencyType}</div>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-955 border border-slate-800/80">
            <div className="text-[10px] text-slate-400 uppercase">Time Received</div>
            <div className="text-sm font-bold text-slate-200 mt-0.5 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-cyan-400 inline" />
              {activeIncident.timestamp}
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-955 border border-slate-800/80">
            <div className="text-[10px] text-slate-400 uppercase">Location</div>
            <div className="text-xs font-bold text-cyan-300 mt-0.5 truncate flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-cyan-400 inline shrink-0" />
              {activeIncident.location}
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-955 border border-slate-800/80">
            <div className="text-[10px] text-slate-400 uppercase">Caller Name</div>
            <div className="text-xs font-bold text-slate-200 mt-0.5 flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-indigo-400 inline" />
              {activeIncident.caller}
            </div>
          </div>
        </div>

        {/* AI Incident Summary Block */}
        <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/30 mb-4">
          <div className="flex items-center gap-2 mb-1.5 text-cyan-400 text-xs font-bold font-mono">
            <Cpu className="w-4 h-4" />
            <span>AI INCIDENT SUMMARY</span>
          </div>
          <p className="text-xs text-slate-200 leading-relaxed font-sans font-medium">
            "{activeIncident.aiSummary}"
          </p>
        </div>
      </div>

      {/* Footer Metrics (AI Confidence & Severity) */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-xs font-mono">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span className="text-slate-400">AI Confidence:</span>
          <span className="font-bold text-cyan-300 px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30">
            {activeIncident.confidence}%
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-400">Severity:</span>
          <span className="font-bold text-red-400 uppercase px-2 py-0.5 rounded bg-red-500/10 border border-red-500/30">
            {activeIncident.severity}
          </span>
        </div>
      </div>
    </div>
  );
};
