import React from 'react';
import { useEmergency } from '../../context/EmergencyContext';
import {
  PhoneCall,
  Brain,
  FileText,
  AlertTriangle,
  Flame,
  Truck,
  Building2,
  Users,
  CheckCircle,
  ArrowRight,
  ShieldAlert,
  Sparkles
} from 'lucide-react';

export const AIAgentWorkflowDiagram: React.FC = () => {
  const { isSimulating, simStep } = useEmergency();

  const workflowSteps = [
    { title: 'Emergency Call', icon: PhoneCall, desc: 'Voice Stream Ingestion' },
    { title: 'AI STT & NLU', icon: Brain, desc: 'Neural Audio Translation' },
    { title: 'Extract Info', icon: FileText, desc: 'Caller, Symptoms, Location' },
    { title: 'Triage & Severity', icon: AlertTriangle, desc: 'Medical Priority 1' },
    { title: 'Resource Search', icon: Truck, desc: 'Nearest EMS Unit A-12' },
    { title: 'Hospital Routing', icon: Building2, desc: 'City General ER Sync' },
    { title: 'Family Alert', icon: Users, desc: 'Auto SMS Drafted' },
    { title: 'Operator Review', icon: ShieldAlert, desc: 'Human Verification' },
    { title: 'Response Dispatched', icon: CheckCircle, desc: 'Units En Route' }
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-2xl overflow-hidden relative">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider font-mono flex items-center gap-2">
              Autonomous AI Agentic Workflow
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-sans font-bold border border-indigo-500/30">
                MULTI-AGENT GRAPH
              </span>
            </h3>
            <p className="text-[11px] text-slate-400">End-to-end autonomous triage, resource allocation & human confirmation</p>
          </div>
        </div>

        <div className="text-[10px] font-mono text-slate-400">
          Pipeline Status: <strong className="text-emerald-400">ACTIVE CO-PILOT</strong>
        </div>
      </div>

      {/* Stepper Pipeline Flow */}
      <div className="flex items-center justify-between gap-1 overflow-x-auto pb-2 scrollbar-none">
        {workflowSteps.map((step, idx) => {
          const Icon = step.icon;
          const isActive = isSimulating ? idx <= simStep + 2 : true;
          const isCurrentSim = isSimulating && idx === simStep + 1;

          return (
            <React.Fragment key={idx}>
              <div
                className={`flex flex-col items-center shrink-0 p-2.5 rounded-xl border transition-all duration-300 w-28 text-center ${
                  isCurrentSim
                    ? 'bg-cyan-950/80 border-cyan-400 text-cyan-300 shadow-lg shadow-cyan-950 animate-pulse scale-105'
                    : isActive
                    ? 'bg-slate-955 border-slate-800 text-slate-200'
                    : 'bg-slate-950 border-slate-900 text-slate-600 opacity-40'
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-lg mb-1.5 flex items-center justify-center text-xs ${
                    isCurrentSim
                      ? 'bg-cyan-500 text-slate-950 font-bold'
                      : isActive
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                      : 'bg-slate-800 text-slate-500'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <h4 className="text-[10px] font-bold font-mono tracking-tight leading-tight line-clamp-1">
                  {step.title}
                </h4>
                <p className="text-[9px] text-slate-400 font-sans mt-0.5 leading-none line-clamp-1">{step.desc}</p>
              </div>

              {idx < workflowSteps.length - 1 && (
                <ArrowRight
                  className={`w-4 h-4 shrink-0 font-bold transition-colors ${
                    isActive ? 'text-cyan-500/70' : 'text-slate-800'
                  }`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
