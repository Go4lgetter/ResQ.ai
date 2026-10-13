import React, { useState, useEffect } from 'react';
import { useEmergency } from '../../context/EmergencyContext';
import { Clock, Bell, User, Cpu, ShieldCheck, Sparkles } from 'lucide-react';

export const Header: React.FC = () => {
  const { isSimulating, toasts } = useEmergency();
  const [timeString, setTimeString] = useState<string>('');
  const [dateString, setDateString] = useState<string>('');
  const [showNotifications, setShowNotifications] = useState<boolean>(false);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTimeString(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      setDateString(now.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }));
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="h-16 bg-slate-900 border-b border-slate-800 px-6 flex items-center justify-between z-20 shrink-0 select-none">
      {/* Main Dashboard Title */}
      <div className="flex items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-white tracking-tight font-sans">Emergency Command Center</h2>
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-[10px] text-cyan-400 font-mono">
              <Cpu className="w-3 h-3 animate-spin text-cyan-400" />
              <span>AI Engine Active</span>
            </div>
          </div>
          <p className="text-xs text-slate-400 font-normal">AI-assisted emergency coordination</p>
        </div>
      </div>

      {/* Top Right Controls */}
      <div className="flex items-center gap-5">
        {/* Live Simulation Alert Pill */}
        {isSimulating && (
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/80 border border-red-500/50 text-red-300 text-xs font-mono font-bold animate-pulse">
            <Sparkles className="w-3.5 h-3.5 text-red-400" />
            <span>AI DISPATCH SIMULATION ACTIVE</span>
          </div>
        )}

        {/* Live Clock & Date */}
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-955 border border-slate-800 text-xs font-mono text-slate-300">
          <Clock className="w-3.5 h-3.5 text-cyan-400" />
          <span className="font-semibold text-white">{timeString || '10:42:00'}</span>
          <span className="text-slate-500">|</span>
          <span className="text-slate-400 text-[11px]">{dateString}</span>
        </div>

        {/* Notifications Icon Button */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-xl bg-slate-955 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-all"
          >
            <Bell className="w-4 h-4" />
            {toasts.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-cyan-500 text-slate-950 font-mono text-[9px] font-extrabold flex items-center justify-center">
                {toasts.length}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-4 z-50 text-xs animate-in fade-in duration-150">
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800">
                <span className="font-bold text-slate-200">Recent System Logs</span>
                <span className="text-[10px] text-slate-400 font-mono">{toasts.length} alerts</span>
              </div>
              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {toasts.length === 0 ? (
                  <p className="text-slate-500 text-center py-4">No unread notifications</p>
                ) : (
                  toasts.map((t) => (
                    <div key={t.id} className="p-2.5 rounded-xl bg-slate-955 border border-slate-800">
                      <div className="flex justify-between font-mono text-[10px] text-slate-400 mb-1">
                        <span className="font-bold text-cyan-400">{t.title}</span>
                        <span>{t.timestamp}</span>
                      </div>
                      <p className="text-slate-300 text-[11px] leading-tight">{t.message}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Operator Profile */}
        <div className="flex items-center gap-3 pl-3 border-l border-slate-800">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-600 to-indigo-600 p-0.5 flex items-center justify-center shadow-md">
            <div className="w-full h-full rounded-[10px] bg-slate-900 flex items-center justify-center">
              <User className="w-4 h-4 text-cyan-300" />
            </div>
          </div>
          <div className="hidden sm:block">
            <div className="text-xs font-bold text-slate-200">Disp. J. Miller</div>
            <div className="text-[10px] text-slate-400 flex items-center gap-1 font-mono">
              <ShieldCheck className="w-3 h-3 text-cyan-400" />
              Sector 4 Lead
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
