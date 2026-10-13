import React, { useState } from 'react';
import { useEmergency } from '../../context/EmergencyContext';
import { Truck, Shield, Flame, Building2, Users, AlertTriangle, Check } from 'lucide-react';
import { ConfirmationModal } from '../modals/ConfirmationModal';

export const EmergencyActionBar: React.FC = () => {
  const {
    activeIncident,
    dispatchUnit,
    notifyPolice,
    notifyFire,
    sendHospitalPatientInfo,
    sendFamilyNotification,
    hospitals,
    familyContact
  } = useEmergency();

  const [modalConfig, setModalConfig] = useState<{
    isOpen: boolean;
    title: string;
    description: string;
    onConfirm: () => void;
    variant?: 'danger' | 'warning' | 'info';
    details?: { label: string; value: string }[];
  }>({
    isOpen: false,
    title: '',
    description: '',
    onConfirm: () => {}
  });

  const handleAmbulanceClick = () => {
    setModalConfig({
      isOpen: true,
      title: 'Dispatch Ambulance Unit A-12?',
      description: 'This will simulate dispatching the nearest available Emergency Medical Services unit (A-12) to 194 ESC Street.',
      variant: 'danger',
      details: [
        { label: 'Unit ID', value: 'Ambulance A-12' },
        { label: 'Priority', value: 'Code 3 / Critical ALS' },
        { label: 'Target Location', value: activeIncident.location },
        { label: 'Est. Response', value: '03 mins' }
      ],
      onConfirm: () => dispatchUnit('A-12')
    });
  };

  const handlePoliceClick = () => {
    setModalConfig({
      isOpen: true,
      title: 'Notify & Dispatch Police Unit P-07?',
      description: 'This will dispatch Police Patrol Unit P-07 to manage perimeter security and clear traffic corridors.',
      variant: 'info',
      details: [
        { label: 'Unit', value: 'Police P-07' },
        { label: 'Sector', value: 'District 4 Patrol' }
      ],
      onConfirm: () => notifyPolice()
    });
  };

  const handleFireClick = () => {
    setModalConfig({
      isOpen: true,
      title: 'Notify & Dispatch Fire Unit F-03?',
      description: 'This will mobilize Fire Rescue Unit F-03 for emergency extraction support.',
      variant: 'warning',
      details: [
        { label: 'Station', value: 'Station 4 Fire HQ' }
      ],
      onConfirm: () => notifyFire()
    });
  };

  const handleHospitalClick = () => {
    setModalConfig({
      isOpen: true,
      title: 'Contact & Transmit to City General Hospital?',
      description: 'This will transmit patient trauma vitals and reserve emergency room bed space.',
      variant: 'info',
      details: [
        { label: 'Hospital', value: 'City General Hospital' },
        { label: 'Trauma Level', value: 'Level 1 Trauma Center' }
      ],
      onConfirm: () => sendHospitalPatientInfo('HOSP-01')
    });
  };

  const handleFamilyClick = () => {
    setModalConfig({
      isOpen: true,
      title: 'Notify Next-of-Kin Contact?',
      description: `This will send an automated SMS alert to ${familyContact.name} (${familyContact.relationship}).`,
      variant: 'info',
      details: [
        { label: 'Contact Name', value: familyContact.name },
        { label: 'Phone', value: familyContact.phone }
      ],
      onConfirm: () => sendFamilyNotification()
    });
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-2xl select-none">
      <div className="flex items-center justify-between mb-3 px-1 font-mono text-xs">
        <div className="flex items-center gap-2 text-slate-300 font-bold uppercase tracking-wider">
          <AlertTriangle className="w-4 h-4 text-red-400" />
          <span>Emergency Operator Command Bar</span>
        </div>
        <span className="text-[10px] text-slate-400">Human Approval Required</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 font-mono text-xs">
        <button
          onClick={handleAmbulanceClick}
          className="py-3 px-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold transition flex items-center justify-center gap-2 shadow-lg shadow-red-950/60 active:scale-95"
        >
          <Truck className="w-4 h-4" />
          <span>DISPATCH AMBULANCE</span>
        </button>

        <button
          onClick={handlePoliceClick}
          className="py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition flex items-center justify-center gap-2 shadow-lg shadow-blue-950/60 active:scale-95"
        >
          <Shield className="w-4 h-4" />
          <span>NOTIFY POLICE</span>
        </button>

        <button
          onClick={handleFireClick}
          className="py-3 px-4 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold transition flex items-center justify-center gap-2 shadow-lg shadow-orange-950/60 active:scale-95"
        >
          <Flame className="w-4 h-4" />
          <span>NOTIFY FIRE</span>
        </button>

        <button
          onClick={handleHospitalClick}
          className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/60 active:scale-95"
        >
          <Building2 className="w-4 h-4" />
          <span>CONTACT HOSPITAL</span>
        </button>

        <button
          onClick={handleFamilyClick}
          className="py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition flex items-center justify-center gap-2 shadow-lg shadow-indigo-950/60 active:scale-95"
        >
          <Users className="w-4 h-4" />
          <span>NOTIFY FAMILY</span>
        </button>
      </div>

      <ConfirmationModal
        isOpen={modalConfig.isOpen}
        onClose={() => setModalConfig((prev) => ({ ...prev, isOpen: false }))}
        onConfirm={modalConfig.onConfirm}
        title={modalConfig.title}
        description={modalConfig.description}
        variant={modalConfig.variant}
        details={modalConfig.details}
      />
    </div>
  );
};
