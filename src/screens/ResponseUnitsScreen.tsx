import React, { useState } from 'react';
import { useEmergency } from '../context/EmergencyContext';
import { ResponseUnit, UnitType } from '../types';
import { Truck, Shield, Flame, Navigation, Battery, Users, Clock, AlertCircle } from 'lucide-react';

export const ResponseUnitsScreen: React.FC = () => {
  const { responseUnits, dispatchUnit, viewIncidentDetails } = useEmergency();
  const [activeTab, setActiveTab] = useState<UnitType>('AMBULANCE');

  const filteredUnits = responseUnits.filter((u) => u.type === activeTab);

  return (
    <div className="p-6 space-y-6 max-w-[1700px] mx-auto">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">Response Fleet Management</h1>
          <p className="text-xs text-slate-400 mt-1">Real-time status tracking & tactical unit readiness</p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 p-1.5 rounded-2xl text-xs font-mono font-bold">
          <button
            onClick={() => setActiveTab('AMBULANCE')}
            className={`px-4 py-2 rounded-xl transition flex items-center gap-2 ${
              activeTab === 'AMBULANCE'
                ? 'bg-cyan-500 text-slate-950 shadow'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Truck className="w-4 h-4" />
            <span>Ambulance ({responseUnits.filter((u) => u.type === 'AMBULANCE').length})</span>
          </button>

          <button
            onClick={() => setActiveTab('POLICE')}
            className={`px-4 py-2 rounded-xl transition flex items-center gap-2 ${
              activeTab === 'POLICE'
                ? 'bg-blue-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>Police ({responseUnits.filter((u) => u.type === 'POLICE').length})</span>
          </button>

          <button
            onClick={() => setActiveTab('FIRE')}
            className={`px-4 py-2 rounded-xl transition flex items-center gap-2 ${
              activeTab === 'FIRE'
                ? 'bg-orange-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Flame className="w-4 h-4" />
            <span>Fire ({responseUnits.filter((u) => u.type === 'FIRE').length})</span>
          </button>
        </div>
      </div>

      {/* Grid of Unit Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUnits.map((unit) => {
          const isEnRoute = unit.status === 'En route';
          const isAvailable = unit.status === 'Available';
          const isBusy = unit.status === 'Busy';

          return (
            <div
              key={unit.id}
              className={`p-5 rounded-2xl bg-slate-900 border shadow-xl flex flex-col justify-between transition group hover:border-slate-700 ${
                isEnRoute ? 'border-cyan-500/40 bg-slate-900/90' : 'border-slate-800'
              }`}
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800">
                  <div className="flex items-center gap-2 font-mono">
                    <div
                      className={`p-2 rounded-xl border ${
                        unit.type === 'AMBULANCE'
                          ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400'
                          : unit.type === 'POLICE'
                          ? 'bg-blue-500/10 border-blue-500/30 text-blue-400'
                          : 'bg-orange-500/10 border-orange-500/30 text-orange-400'
                      }`}
                    >
                      {unit.type === 'AMBULANCE' ? (
                        <Truck className="w-4 h-4" />
                      ) : unit.type === 'POLICE' ? (
                        <Shield className="w-4 h-4" />
                      ) : (
                        <Flame className="w-4 h-4" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white uppercase">{unit.name}</h3>
                      <span className="text-[10px] text-slate-400">{unit.id}</span>
                    </div>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-mono font-bold ${
                      isEnRoute
                        ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/40 animate-pulse'
                        : isAvailable
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                        : 'bg-amber-950 text-amber-300 border border-amber-500/40'
                    }`}
                  >
                    ● {unit.status}
                  </span>
                </div>

                {/* Details Grid */}
                <div className="space-y-2 font-mono text-xs mb-4">
                  <div className="p-2.5 rounded-xl bg-slate-955 border border-slate-800/80 flex justify-between">
                    <span className="text-slate-400">Base Location:</span>
                    <span className="text-slate-200 font-semibold">{unit.location}</span>
                  </div>

                  {unit.assignedIncidentId && (
                    <div
                      onClick={() => viewIncidentDetails(unit.assignedIncidentId!)}
                      className="p-2.5 rounded-xl bg-cyan-950/30 border border-cyan-500/30 flex justify-between items-center cursor-pointer hover:border-cyan-500/50"
                    >
                      <span className="text-cyan-400">Assigned Call:</span>
                      <span className="text-white font-bold underline">{unit.assignedIncidentId}</span>
                    </div>
                  )}

                  {unit.etaMinutes && (
                    <div className="p-2.5 rounded-xl bg-slate-955 border border-slate-800/80 flex justify-between">
                      <span className="text-slate-400">Transit ETA:</span>
                      <span className="text-cyan-300 font-bold">{unit.etaMinutes} mins</span>
                    </div>
                  )}

                  <div className="p-2.5 rounded-xl bg-slate-955 border border-slate-800/80 flex justify-between items-center">
                    <span className="text-slate-400 flex items-center gap-1">
                      <Battery className="w-3.5 h-3.5 text-emerald-400 inline" /> Fuel/Battery:
                    </span>
                    <span className="text-slate-200 font-bold">{unit.fuelLevel}%</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-955 border border-slate-800/80">
                    <span className="text-slate-400 text-[10px] block mb-1">On-Duty Crew:</span>
                    <div className="text-[11px] text-slate-300 font-sans">{unit.crew.join(' • ')}</div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => dispatchUnit(unit.id)}
                className="w-full py-2 px-4 rounded-xl text-xs font-mono font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 transition"
              >
                {isEnRoute ? 'Update Route / Status' : 'Dispatch Unit'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
