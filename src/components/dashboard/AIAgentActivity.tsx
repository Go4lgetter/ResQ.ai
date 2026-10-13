import React, { useState } from 'react';
import { useEmergency } from '../../context/EmergencyContext';
import { CheckCircle2, Loader2, Clock, Bot, Cpu, Network, ShieldCheck, ChevronRight, X } from 'lucide-react';

export const AIAgentActivity: React.FC = () => {
  const { aiSteps, isSimulating } = useEmergency();
  const [showLogicInspector, setShowLogicInspector] = useState<boolean>(false);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-2xl flex flex-col justify-between h-full relative overflow-hidden">
      {/* Background subtle glowing grid line */}
      <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
        <Bot className="w-32 h-32 text-cyan-400" />
      </div>

      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Bot className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider font-mono flex items-center gap-2">
                AI Agent Activity
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-sans font-bold border border-cyan-500/30">
                  AUTONOMOUS PIPELINE
                </span>
              </h3>
              <p className="text-[11px] text-slate-400">Real-time reasoning & multi-agent coordination workflow</p>
            </div>
          </div>

          <button
            onClick={() => setShowLogicInspector(true)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] font-mono font-medium text-cyan-300 border border-cyan-500/30 transition"
          >
            <Network className="w-3.5 h-3.5" />
            <span>Logic Tree</span>
          </button>
        </div>

        {/* Steps Timeline Stream */}
        <div className="space-y-3 relative pl-3 before:absolute before:left-6 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
          {aiSteps.map((step, idx) => {
            const isCompleted = step.status === 'completed';
            const isProcessing = step.status === 'processing';
            const isPending = step.status === 'pending';

            return (
              <div key={step.id} className="relative flex items-start gap-3 group">
                {/* Status Node Circle */}
                <div className="relative z-10 shrink-0 mt-0.5">
                  {isCompleted && (
                    <div className="w-6 h-6 rounded-full bg-slate-900 border-2 border-emerald-500 flex items-center justify-center text-emerald-400 shadow-md">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                  )}
                  {isProcessing && (
                    <div className="w-6 h-6 rounded-full bg-slate-900 border-2 border-cyan-400 flex items-center justify-center text-cyan-400 animate-spin shadow-lg shadow-cyan-950">
                      <Loader2 className="w-4 h-4" />
                    </div>
                  )}
                  {isPending && (
                    <div className="w-6 h-6 rounded-full bg-slate-900 border-2 border-slate-700 flex items-center justify-center text-slate-500">
                      <Clock className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>

                {/* Step Content Card */}
                <div
                  className={`flex-1 p-2.5 rounded-xl border transition-all ${
                    isProcessing
                      ? 'bg-cyan-950/30 border-cyan-500/50 shadow-md shadow-cyan-950/40'
                      : isCompleted
                      ? 'bg-slate-955 border-slate-800/80 hover:border-slate-700'
                      : 'bg-slate-950/40 border-slate-800/40 opacity-50'
                  }`}
                >
                  <div className="flex items-center justify-between font-mono">
                    <span
                      className={`text-xs font-bold ${
                        isCompleted ? 'text-slate-200' : isProcessing ? 'text-cyan-300' : 'text-slate-400'
                      }`}
                    >
                      {step.description}
                    </span>
                    <span className="text-[10px] text-slate-400">{step.time}</span>
                  </div>
                  {step.detail && (
                    <p className="text-[11px] text-slate-400 mt-1 leading-snug">{step.detail}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer Pipeline Metrics */}
      <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
        <div className="flex items-center gap-1.5 text-emerald-400">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Zero Human Latency</span>
        </div>
        <div className="text-[10px] text-slate-500">Execution Time: 0.84s</div>
      </div>

      {/* AI Logic Inspector Modal */}
      {showLogicInspector && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-955/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 text-slate-200 font-mono">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2 text-cyan-400">
                <Cpu className="w-5 h-5" />
                <h4 className="text-sm font-bold uppercase">ResQ.ai Agent Logic Tree</h4>
              </div>
              <button
                onClick={() => setShowLogicInspector(false)}
                className="p-1 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs bg-slate-950 p-4 rounded-xl border border-slate-800 text-slate-300">
              <div>
                <span className="text-slate-500">// Transformer Multi-Head Attention Graph</span>
                <div className="text-cyan-400 font-bold mt-1">Prompt Input ➔ Emergency Classification Node</div>
              </div>
              <div className="pl-3 border-l border-cyan-500/40 space-y-2 text-[11px]">
                <div>• Token Embeddings: ["collapsed", "breathing difficulty", "194 ESC Street"]</div>
                <div>• Intent Probability: EMS Medical Triage (99.4%)</div>
                <div>• Geocoding Engine: Matched 194 ESC St. lat/long (Confidence: 98%)</div>
                <div>• Routing Subagent: Dispatched Ambulance A-12 (Distance: 2.1km)</div>
                <div>• Hospital Protocol: Auto-queried City General ER capacity (14 beds available)</div>
              </div>
              <div className="pt-2 border-t border-slate-800 text-[10px] text-slate-400">
                Model: ResQ.ai Emergency Agent v2.4 • Verification: Operator Approval Required
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
