import React, { useState } from 'react';
import { useEmergency } from '../context/EmergencyContext';
import {
  AlertTriangle,
  Clock,
  MapPin,
  User,
  Phone,
  ShieldAlert,
  Building2,
  Users,
  CheckSquare,
  Sparkles,
  Bot,
  Activity,
  ArrowLeft,
  CheckCircle2,
  Cpu
} from 'lucide-react';

export const ActiveIncidentScreen: React.FC = () => {
  const { selectedIncidentDetail, activeIncident, setActiveTab, dispatchUnit, sendFamilyNotification, sendHospitalPatientInfo } = useEmergency();

  const incident = selectedIncidentDetail || activeIncident;

  // Actionable Checkboxes state for "Recommended Next Actions"
  const [completedActions, setCompletedActions] = useState<{ [key: string]: boolean }>({
    'action-1': true,
    'action-2': true,
    'action-3': false,
    'action-4': false
  });

  const toggleAction = (id: string) => {
    setCompletedActions((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="p-6 space-y-6 max-w-[1500px] mx-auto">
      {/* Top Header & Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('COMMAND_CENTER')}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 hover:text-white transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-extrabold text-white font-mono tracking-tight">{incident.incidentId}</h1>
              <span className="px-3 py-0.5 rounded-full text-xs font-mono font-bold bg-red-950 text-red-400 border border-red-500/40 animate-pulse">
                ● {incident.status}
              </span>
              <span className="px-2.5 py-0.5 rounded-md text-xs font-mono font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                {incident.emergencyType}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">Detailed Incident Dossier & AI Reasoning Diagnostics</p>
          </div>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs">
          <span className="text-slate-400">Timestamp: <strong className="text-slate-200">{incident.timestamp}</strong></span>
          <span className="text-slate-400">AI Confidence: <strong className="text-cyan-400">{incident.confidence}%</strong></span>
        </div>
      </div>

      {/* Main Grid breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (8 cols): Incident Overview & AI Analysis */}
        <div className="lg:col-span-8 space-y-6">
          {/* AI Incident Summary Card */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center gap-2 text-cyan-400 font-mono font-bold text-sm">
              <Cpu className="w-5 h-5" />
              <span>AI-GENERATED INCIDENT SUMMARY</span>
            </div>
            <p className="text-sm text-slate-200 leading-relaxed font-sans bg-slate-950 p-4 rounded-xl border border-slate-800/80">
              "{incident.aiSummary}"
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs pt-2">
              <div className="p-3 rounded-xl bg-slate-955 border border-slate-800">
                <span className="text-slate-400 uppercase text-[10px]">Caller Identity</span>
                <div className="text-sm font-bold text-slate-200 mt-1">{incident.caller}</div>
                <div className="text-[11px] text-cyan-400">{incident.callerPhone}</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-955 border border-slate-800">
                <span className="text-slate-400 uppercase text-[10px]">Location Coordinates</span>
                <div className="text-sm font-bold text-cyan-300 mt-1">{incident.location}</div>
                <div className="text-[11px] text-emerald-400">Confidence: {incident.locationConfidence}%</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-955 border border-slate-800">
                <span className="text-slate-400 uppercase text-[10px]">Patient Condition</span>
                <div className="text-sm font-bold text-red-400 mt-1">{incident.patientStatus}</div>
                <div className="text-[11px] text-amber-400">Severity: {incident.severity}</div>
              </div>
            </div>
          </div>

          {/* Recommended Next Actions (Checklist) */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2 text-emerald-400 font-mono font-bold text-sm">
                <CheckSquare className="w-5 h-5" />
                <span>RECOMMENDED NEXT ACTIONS (AI DISPATCH PROTOCOL)</span>
              </div>
              <span className="text-xs font-mono text-slate-400">
                {Object.values(completedActions).filter(Boolean).length} / 4 Completed
              </span>
            </div>

            <div className="space-y-2.5 font-mono text-xs">
              {[
                { id: 'action-1', label: 'Verify speech-to-text transcript accuracy for emergency address', desc: 'Matched 194 ESC Street via GPS node alignment.' },
                { id: 'action-2', label: 'Authorize EMS Unit A-12 priority dispatch', desc: 'Unit A-12 assigned with 3-minute ETA.' },
                { id: 'action-3', label: 'Transmit trauma telemetry to City General Hospital ER', desc: 'Pre-routes patient record for triage bed prep.' },
                { id: 'action-4', label: 'Send automated next-of-kin SMS to Sarah Johnson', desc: 'Provides hospital location & incident update.' }
              ].map((item) => (
                <div
                  key={item.id}
                  onClick={() => toggleAction(item.id)}
                  className={`p-3.5 rounded-xl border transition cursor-pointer flex items-start gap-3 ${
                    completedActions[item.id]
                      ? 'bg-emerald-955/20 border-emerald-500/40 text-slate-200'
                      : 'bg-slate-955 border-slate-800 hover:border-slate-700 text-slate-400'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={completedActions[item.id]}
                    onChange={() => {}}
                    className="mt-1 w-4 h-4 rounded border-slate-700 text-cyan-500 focus:ring-0"
                  />
                  <div>
                    <div className={`font-bold ${completedActions[item.id] ? 'text-emerald-300' : 'text-slate-200'}`}>
                      {item.label}
                    </div>
                    <div className="text-[11px] text-slate-400 font-sans mt-0.5">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Extracted Symptoms & Clinical Evidence */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
            <h3 className="text-sm font-bold text-slate-100 font-mono uppercase">Clinical Extracted Evidence</h3>
            <div className="flex flex-wrap gap-2">
              {incident.symptoms.map((symptom, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 font-mono text-xs font-bold"
                >
                  • {symptom}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Response Unit & Hospital Assignment */}
        <div className="lg:col-span-4 space-y-6">
          {/* Assigned Units Card */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4 font-mono">
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Assigned Response Fleet</h3>
            
            <div className="p-3 rounded-xl bg-slate-955 border border-cyan-500/30">
              <div className="flex justify-between items-center text-xs font-bold text-white mb-1">
                <span>AMBULANCE</span>
                <span className="text-cyan-300">{incident.assignedAmbulance || 'Unit A-12'}</span>
              </div>
              <p className="text-[11px] text-slate-400">Status: En route • ETA: 03 min</p>
              <button
                onClick={() => dispatchUnit('A-12')}
                className="mt-2 w-full py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-bold transition"
              >
                Re-assign Unit
              </button>
            </div>

            <div className="p-3 rounded-xl bg-slate-955 border border-slate-800">
              <div className="flex justify-between items-center text-xs font-bold text-white mb-1">
                <span>POLICE</span>
                <span className="text-blue-400">{incident.assignedPolice || 'Unit P-07'}</span>
              </div>
              <p className="text-[11px] text-slate-400">Status: Standby • 1.2 km distance</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-955 border border-slate-800">
              <div className="flex justify-between items-center text-xs font-bold text-white mb-1">
                <span>FIRE DISPATCH</span>
                <span className="text-orange-400">{incident.assignedFire || 'Unit F-03'}</span>
              </div>
              <p className="text-[11px] text-slate-400">Status: Standby • Station 4</p>
            </div>
          </div>

          {/* Hospital Telemetry Card */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-3 font-mono">
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Destination Facility</h3>
            <div className="p-3 rounded-xl bg-slate-955 border border-slate-800">
              <div className="font-bold text-white text-xs">City General Hospital</div>
              <div className="text-[11px] text-emerald-400 mt-0.5">Level 1 Trauma • 14 Beds Free</div>
              <button
                onClick={() => sendHospitalPatientInfo('HOSP-01')}
                className="mt-3 w-full py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition"
              >
                Transmit Vitals Package
              </button>
            </div>
          </div>

          {/* Family Contact Status */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-3 font-mono">
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Next-of-Kin Contact</h3>
            <div className="p-3 rounded-xl bg-slate-955 border border-slate-800">
              <div className="font-bold text-white text-xs">Sarah Johnson (Sister)</div>
              <div className="text-[11px] text-slate-400 mt-0.5">+1 (555) 948-3310</div>
              <button
                onClick={sendFamilyNotification}
                className="mt-3 w-full py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold transition"
              >
                Send SMS Notification
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
