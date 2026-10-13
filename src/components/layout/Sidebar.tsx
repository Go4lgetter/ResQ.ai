import React from 'react';
import { useEmergency, ActiveTab } from '../../context/EmergencyContext';
import {
  LayoutDashboard,
  AlertCircle,
  History,
  Truck,
  Settings as SettingsIcon,
  Activity,
  Play,
  RotateCcw,
  ShieldAlert,
  Sparkles
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    startEmergencySimulation,
    resetDemo,
    isSimulating
  } = useEmergency();

  const navItems: { id: ActiveTab; label: string; icon: React.ElementType; badge?: string }[] = [
    { id: 'COMMAND_CENTER', label: 'Command Center', icon: LayoutDashboard },
    { id: 'ACTIVE_INCIDENT', label: 'Active Incident', icon: AlertCircle, badge: 'LIVE' },
    { id: 'RESPONSE_UNITS', label: 'Response Units', icon: Truck },
    { id: 'INCIDENT_HISTORY', label: 'Incident History', icon: History },
    { id: 'SETTINGS', label: 'Settings', icon: SettingsIcon }
  ];

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between shrink-0 select-none z-30 min-h-screen">
      <div>
        {/* Logo Header */}
        <div className="p-5 border-b border-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 via-red-700 to-slate-900 border border-red-500/40 shadow-lg shadow-red-950/50">
              <ShieldAlert className="w-6 h-6 text-white" />
              <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-cyan-400 animate-ping opacity-75" />
              <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-cyan-400" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-xl font-black tracking-tight text-white font-sans">
                  ResQ<span className="text-cyan-400 font-mono">.ai</span>
                </h1>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  v2.4
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">AI Emergency Response</p>
            </div>
          </div>
        </div>

        {/* Demo Mode Action Panel */}
        <div className="p-4 mx-3 my-4 rounded-2xl bg-slate-950/70 border border-cyan-500/20 shadow-inner">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-cyan-300">Demo Controls</h2>
          </div>
          <p className="text-[11px] text-slate-400 leading-tight mb-3">
            Simulate real-time AI autonomous ingestion & response workflow.
          </p>
          <div className="flex flex-col gap-2">
            <button
              onClick={startEmergencySimulation}
              disabled={isSimulating}
              className={`w-full py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-lg ${
                isSimulating
                  ? 'bg-cyan-950 text-cyan-400 border border-cyan-500/40 cursor-wait animate-pulse'
                  : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white border border-cyan-400/30 shadow-cyan-950/60'
              }`}
            >
              <Play className={`w-3.5 h-3.5 fill-current ${isSimulating ? 'animate-spin' : ''}`} />
              {isSimulating ? 'Simulating Incident...' : 'Simulate Emergency'}
            </button>

            <button
              onClick={resetDemo}
              className="w-full py-1.5 px-3 rounded-xl text-xs font-medium text-slate-400 hover:text-slate-200 bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50 transition-all flex items-center justify-center gap-1.5"
            >
              <RotateCcw className="w-3 h-3" />
              Reset Demo
            </button>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="px-3 space-y-1">
          <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest text-slate-500 font-semibold">
            Dispatch Platform
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                  isActive
                    ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 shadow-md shadow-cyan-950/20'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 transition-colors ${
                      isActive ? 'text-cyan-400' : 'text-slate-500 group-hover:text-slate-300'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="px-1.5 py-0.5 text-[9px] font-mono font-bold rounded-full bg-red-500/20 text-red-400 border border-red-500/40 animate-pulse">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer System Operational Status */}
      <div className="p-4 border-t border-slate-800/80 bg-slate-950/40">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-3 h-3">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </div>
          <div>
            <div className="text-[11px] font-semibold text-slate-200">System Status</div>
            <div className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
              <Activity className="w-3 h-3 inline" />
              All systems operational
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
