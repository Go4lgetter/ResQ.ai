import React from 'react';
import { useEmergency } from '../context/EmergencyContext';
import { Settings as SettingsIcon, Cpu, Sliders, ShieldCheck, Bell, Activity, Save, RefreshCw } from 'lucide-react';

export const SettingsScreen: React.FC = () => {
  const { settings, updateSettings, resetDemo } = useEmergency();

  return (
    <div className="p-6 space-y-6 max-w-[1200px] mx-auto">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">System Settings & AI Parameters</h1>
          <p className="text-xs text-slate-400 mt-1">Configure autonomous dispatch neural core & human-in-the-loop policies</p>
        </div>

        <button
          onClick={resetDemo}
          className="flex items-center gap-2 px-3.5 py-2 bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 rounded-xl font-mono text-xs transition"
        >
          <RefreshCw className="w-4 h-4 text-cyan-400" />
          <span>Reset Configuration</span>
        </button>
      </div>

      {/* Settings Grid */}
      <div className="space-y-6">
        {/* Section 1: AI Engine Configuration */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-5">
          <div className="flex items-center gap-2 text-cyan-400 font-mono font-bold text-sm pb-3 border-b border-slate-800">
            <Cpu className="w-5 h-5" />
            <span>AI ENGINE & CLASSIFICATION PROTOCOLS</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
            {/* AI Model */}
            <div className="space-y-2">
              <label className="text-slate-300 font-bold block">Active AI Core Model</label>
              <select
                value={settings.aiModel}
                onChange={(e) => updateSettings({ aiModel: e.target.value })}
                className="w-full bg-slate-955 border border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-200 focus:outline-none focus:border-cyan-500"
              >
                <option value="ResQ.ai Emergency Agent v2.4 (Autonomous Core)">ResQ.ai Emergency Agent v2.4 (Autonomous Core)</option>
                <option value="ResQ.ai Emergency Agent v2.3 (Legacy Triage)">ResQ.ai Emergency Agent v2.3 (Legacy Triage)</option>
              </select>
            </div>

            {/* Confidence Threshold */}
            <div className="space-y-2">
              <div className="flex justify-between text-slate-300 font-bold">
                <span>Confidence Triage Threshold</span>
                <span className="text-cyan-400">{settings.confidenceThreshold}%</span>
              </div>
              <input
                type="range"
                min="50"
                max="99"
                value={settings.confidenceThreshold}
                onChange={(e) => updateSettings({ confidenceThreshold: parseInt(e.target.value) })}
                className="w-full accent-cyan-500 cursor-pointer"
              />
            </div>

            {/* Voice Recognition Toggle */}
            <div className="p-4 rounded-xl bg-slate-955 border border-slate-800/80 flex items-center justify-between">
              <div>
                <div className="text-slate-200 font-bold">Real-time Voice Recognition</div>
                <div className="text-[11px] text-slate-400 font-sans mt-0.5">Opus neural speech-to-text audio stream</div>
              </div>
              <button
                onClick={() => updateSettings({ voiceRecognition: !settings.voiceRecognition })}
                className={`w-12 h-6 rounded-full transition-colors p-1 ${
                  settings.voiceRecognition ? 'bg-cyan-500' : 'bg-slate-800'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-slate-950 transition-transform ${
                    settings.voiceRecognition ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Auto Incident Classification */}
            <div className="p-4 rounded-xl bg-slate-955 border border-slate-800/80 flex items-center justify-between">
              <div>
                <div className="text-slate-200 font-bold">Automatic Incident Classification</div>
                <div className="text-[11px] text-slate-400 font-sans mt-0.5">NLP entity parsing & priority tagging</div>
              </div>
              <button
                onClick={() => updateSettings({ autoClassification: !settings.autoClassification })}
                className={`w-12 h-6 rounded-full transition-colors p-1 ${
                  settings.autoClassification ? 'bg-cyan-500' : 'bg-slate-800'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-slate-950 transition-transform ${
                    settings.autoClassification ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Section 2: Human-in-the-Loop & Safety Protocols */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-5">
          <div className="flex items-center gap-2 text-indigo-400 font-mono font-bold text-sm pb-3 border-b border-slate-800">
            <ShieldCheck className="w-5 h-5" />
            <span>DISPATCH SAFETY & HUMAN CONFIRMATION</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
            {/* Human Confirmation Required */}
            <div className="p-4 rounded-xl bg-slate-955 border border-slate-800/80 flex items-center justify-between">
              <div>
                <div className="text-slate-200 font-bold">Human Operator Confirmation</div>
                <div className="text-[11px] text-slate-400 font-sans mt-0.5">Require explicit authorization before dispatching units</div>
              </div>
              <button
                onClick={() => updateSettings({ humanConfirmationRequired: !settings.humanConfirmationRequired })}
                className={`w-12 h-6 rounded-full transition-colors p-1 ${
                  settings.humanConfirmationRequired ? 'bg-indigo-500' : 'bg-slate-800'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-slate-950 transition-transform ${
                    settings.humanConfirmationRequired ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Auto Hospital Routing */}
            <div className="p-4 rounded-xl bg-slate-955 border border-slate-800/80 flex items-center justify-between">
              <div>
                <div className="text-slate-200 font-bold">Auto Hospital Capacity Matching</div>
                <div className="text-[11px] text-slate-400 font-sans mt-0.5">Route based on real-time ER bed availability</div>
              </div>
              <button
                onClick={() => updateSettings({ autoHospitalRouting: !settings.autoHospitalRouting })}
                className={`w-12 h-6 rounded-full transition-colors p-1 ${
                  settings.autoHospitalRouting ? 'bg-indigo-500' : 'bg-slate-800'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-slate-950 transition-transform ${
                    settings.autoHospitalRouting ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Section 3: Diagnostic System Health */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4 font-mono text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2 text-emerald-400 font-bold">
              <Activity className="w-5 h-5" />
              <span>SYSTEM DIAGNOSTICS & HARDWARE CLUSTER</span>
            </div>
            <span className="text-[10px] text-emerald-400 font-bold">● HEALTHY</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-3 rounded-xl bg-slate-955 border border-slate-800">
              <span className="text-slate-400 text-[10px]">Inference Latency</span>
              <div className="text-sm font-bold text-cyan-300 mt-0.5">42 ms</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-955 border border-slate-800">
              <span className="text-slate-400 text-[10px]">Speech Accuracy</span>
              <div className="text-sm font-bold text-emerald-300 mt-0.5">99.2%</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-955 border border-slate-800">
              <span className="text-slate-400 text-[10px]">GPU Cluster Load</span>
              <div className="text-sm font-bold text-slate-200 mt-0.5">18.4%</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-955 border border-slate-800">
              <span className="text-slate-400 text-[10px]">Active Node Cluster</span>
              <div className="text-sm font-bold text-indigo-300 mt-0.5">Node-04 US East</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
