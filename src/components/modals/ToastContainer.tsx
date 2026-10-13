import React from 'react';
import { useEmergency } from '../../context/EmergencyContext';
import { AlertTriangle, CheckCircle2, Info, X, ShieldAlert } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useEmergency();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-5 right-5 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isCritical = toast.type === 'critical';
        const isWarning = toast.type === 'warning';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border backdrop-blur-md shadow-2xl transition-all duration-300 animate-in slide-in-from-right-5 ${
              isCritical
                ? 'bg-red-950/90 border-red-500/50 text-red-200 animate-critical-glow'
                : isSuccess
                ? 'bg-emerald-950/90 border-emerald-500/50 text-emerald-200'
                : isWarning
                ? 'bg-amber-950/90 border-amber-500/50 text-amber-200'
                : 'bg-slate-900/95 border-cyan-500/40 text-slate-200'
            }`}
          >
            <div className="shrink-0 mt-0.5">
              {isCritical && <ShieldAlert className="w-5 h-5 text-red-400 animate-pulse" />}
              {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
              {isWarning && <AlertTriangle className="w-5 h-5 text-amber-400" />}
              {!isCritical && !isSuccess && !isWarning && <Info className="w-5 h-5 text-cyan-400" />}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <h4 className="text-sm font-semibold tracking-wide uppercase font-mono">{toast.title}</h4>
                <span className="text-[10px] opacity-60 font-mono">{toast.timestamp}</span>
              </div>
              <p className="text-xs mt-1 text-slate-300 leading-relaxed">{toast.message}</p>
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="shrink-0 p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
