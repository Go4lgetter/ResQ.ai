import React from 'react';
import { AlertTriangle, X, ShieldAlert, Check } from 'lucide-react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'info';
  details?: { label: string; value: string }[];
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = 'Confirm Action',
  cancelText = 'Cancel',
  variant = 'danger',
  details
}) => {
  if (!isOpen) return null;

  const isDanger = variant === 'danger';
  const isWarning = variant === 'warning';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden p-6 text-slate-100">
        {/* Top Glow Bar */}
        <div
          className={`absolute top-0 left-0 right-0 h-1.5 ${
            isDanger ? 'bg-gradient-to-r from-red-600 via-rose-500 to-orange-500' : isWarning ? 'bg-amber-500' : 'bg-cyan-500'
          }`}
        />

        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div
              className={`p-3 rounded-xl border ${
                isDanger
                  ? 'bg-red-500/10 border-red-500/30 text-red-400'
                  : isWarning
                  ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                  : 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400'
              }`}
            >
              {isDanger ? <ShieldAlert className="w-6 h-6 animate-pulse" /> : <AlertTriangle className="w-6 h-6" />}
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-100 tracking-tight">{title}</h3>
              <p className="text-xs text-slate-400 mt-0.5">Operator Authorization Required</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed mb-4">{description}</p>

        {details && details.length > 0 && (
          <div className="bg-slate-955/60 border border-slate-800 rounded-xl p-3 mb-5 space-y-2 font-mono text-xs">
            {details.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center text-slate-300">
                <span className="text-slate-400">{item.label}:</span>
                <span className="font-semibold text-slate-100">{item.value}</span>
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-all"
          >
            {cancelText}
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`px-5 py-2.5 text-xs font-bold text-white rounded-xl shadow-lg transition-all flex items-center gap-2 ${
              isDanger
                ? 'bg-red-600 hover:bg-red-500 shadow-red-950/50 hover:shadow-red-600/30'
                : isWarning
                ? 'bg-amber-600 hover:bg-amber-500 shadow-amber-950/50'
                : 'bg-cyan-600 hover:bg-cyan-500 shadow-cyan-950/50'
            }`}
          >
            <Check className="w-4 h-4" />
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};
