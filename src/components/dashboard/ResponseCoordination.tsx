import React, { useState } from 'react';
import { useEmergency } from '../../context/EmergencyContext';
import { Truck, Shield, Flame, Navigation, Clock, CheckCircle2, ChevronRight, AlertTriangle } from 'lucide-react';
import { ConfirmationModal } from '../modals/ConfirmationModal';

export const ResponseCoordination: React.FC = () => {
  const { responseUnits, activeIncident, dispatchUnit, notifyPolice, notifyFire } = useEmergency();

  const [modalConfig, setModalConfig] = useState<{
    isOpen: boolean;
    title: string;
    description: string;
    onConfirm: () => void;
    details?: { label: string; value: string }[];
  }>({
    isOpen: false,
    title: '',
    description: '',
    onConfirm: () => {}
  });

  const ambulance = responseUnits.find((u) => u.id === 'A-12') || responseUnits[0];
  const police = responseUnits.find((u) => u.id === 'P-07') || responseUnits[3];
  const fire = responseUnits.find((u) => u.id === 'F-03') || responseUnits[6];

  const handleDispatchAmbulance = () => {
    setModalConfig({
      isOpen: true,
      title: 'Dispatch Ambulance A-12?',
      description: 'This will dispatch the nearest available Emergency Medical Services unit to 194 ESC Street on Code Red Priority 1.',
      details: [
        { label: 'Unit', value: 'Ambulance A-12' },
        { label: 'Destination', value: activeIncident.location },
        { label: 'Estimated Transit', value: '03 mins (2.1 km)' }
      ],
      onConfirm: () => dispatchUnit('A-12')
    });
  };

  const handleDispatchPolice = () => {
    setModalConfig({
      isOpen: true,
      title: 'Authorize Police Unit P-07 Dispatch?',
      description: 'This will dispatch Police Unit P-07 for perimeter security & emergency traffic routing.',
      details: [
        { label: 'Unit', value: 'Police P-07' },
        { label: 'Incident', value: activeIncident.incidentId },
        { label: 'Distance', value: '1.2 km' }
      ],
      onConfirm: () => notifyPolice()
    });
  };

  const handleDispatchFire = () => {
    setModalConfig({
      isOpen: true,
      title: 'Mobilize Fire Unit F-03?',
      description: 'This will dispatch Fire Engine F-03 to provide rescue equipment & heavy lifting support.',
      details: [
        { label: 'Unit', value: 'Fire Unit F-03' },
        { label: 'Station', value: 'Station 4' }
      ],
      onConfirm: () => notifyFire()
    });
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-2xl flex flex-col justify-between h-full">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Navigation className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider font-mono">
                Response Coordination
              </h3>
              <p className="text-[11px] text-slate-400">Multi-agency tactical emergency unit status</p>
            </div>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
            OPTIMIZED
          </span>
        </div>

        {/* 3 Unit Cards */}
        <div className="space-y-3 font-mono">
          {/* Card 1: Ambulance */}
          <div className="p-3.5 rounded-xl bg-slate-955 border border-cyan-500/30 hover:border-cyan-500/50 transition">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase">{ambulance.name}</h4>
                  <span className="text-[10px] text-slate-400">EMS Medical Response</span>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-cyan-950 text-cyan-300 border border-cyan-500/40">
                {ambulance.status}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-300 mb-3 pt-2 border-t border-slate-800/80">
              <span>ETA: <strong className="text-cyan-300">03 min</strong></span>
              <span>Dist: <strong>2.1 km</strong></span>
              <span>Crew: <strong>2 EMTs</strong></span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleDispatchAmbulance}
                className="flex-1 py-1.5 px-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-bold transition flex items-center justify-center gap-1 shadow-md shadow-cyan-950/50"
              >
                Dispatch
              </button>
              <button
                onClick={() => handleDispatchAmbulance()}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-medium transition"
              >
                Update
              </button>
            </div>
          </div>

          {/* Card 2: Police */}
          <div className="p-3.5 rounded-xl bg-slate-955 border border-slate-800 hover:border-slate-700 transition">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-400">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase">{police.name}</h4>
                  <span className="text-[10px] text-slate-400">Police Patrol</span>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-800 text-slate-400 border border-slate-700">
                {police.status}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-300 mb-3 pt-2 border-t border-slate-800/80">
              <span>Dist: <strong>1.2 km</strong></span>
              <span>Officers: <strong>2 Officers</strong></span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleDispatchPolice}
                className="flex-1 py-1.5 px-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold transition"
              >
                Dispatch Police
              </button>
            </div>
          </div>

          {/* Card 3: Fire */}
          <div className="p-3.5 rounded-xl bg-slate-955 border border-slate-800 hover:border-slate-700 transition">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-orange-500/10 border border-orange-500/30 text-orange-400">
                  <Flame className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase">{fire.name}</h4>
                  <span className="text-[10px] text-slate-400">Fire & Heavy Rescue</span>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-800 text-slate-400 border border-slate-700">
                {fire.status}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-300 mb-3 pt-2 border-t border-slate-800/80">
              <span>Station: <strong>Station 4</strong></span>
              <span>Crew: <strong>3 Firefighters</strong></span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleDispatchFire}
                className="flex-1 py-1.5 px-3 bg-orange-600 hover:bg-orange-500 text-white rounded-lg text-xs font-bold transition"
              >
                Notify Fire
              </button>
            </div>
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={modalConfig.isOpen}
        onClose={() => setModalConfig((prev) => ({ ...prev, isOpen: false }))}
        onConfirm={modalConfig.onConfirm}
        title={modalConfig.title}
        description={modalConfig.description}
        details={modalConfig.details}
        confirmText="Confirm Dispatch"
      />
    </div>
  );
};
