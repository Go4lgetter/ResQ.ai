import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import type {
  Incident,
  ResponseUnit,
  Hospital,
  FamilyContact,
  AIAgentStep,
  CallTranscriptMessage,
  SystemSettings,
  ToastNotification,
  IncidentStatus
} from '../types';
import {
  initialActiveIncident,
  mockIncidentsHistory,
  mockResponseUnits,
  mockHospitals,
  initialFamilyContact,
  initialAISteps,
  initialTranscript,
  initialSettings
} from '../data/mockData';

export type ActiveTab = 'COMMAND_CENTER' | 'ACTIVE_INCIDENT' | 'INCIDENT_HISTORY' | 'RESPONSE_UNITS' | 'SETTINGS';

interface EmergencyContextType {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  activeIncident: Incident;
  incidentsHistory: Incident[];
  responseUnits: ResponseUnit[];
  hospitals: Hospital[];
  familyContact: FamilyContact;
  aiSteps: AIAgentStep[];
  transcript: CallTranscriptMessage[];
  settings: SystemSettings;
  toasts: ToastNotification[];
  isSimulating: boolean;
  simStep: number;
  mapFilter: 'All' | 'EMS' | 'POLICE' | 'FIRE' | 'HOSPITALS';
  setMapFilter: (filter: 'All' | 'EMS' | 'POLICE' | 'FIRE' | 'HOSPITALS') => void;
  selectedIncidentDetail: Incident | null;
  setSelectedIncidentDetail: (incident: Incident | null) => void;
  
  // Actions
  dispatchUnit: (unitId: string) => void;
  notifyPolice: () => void;
  notifyFire: () => void;
  sendHospitalPatientInfo: (hospitalId: string) => void;
  sendFamilyNotification: () => void;
  updateIncidentStatus: (status: IncidentStatus) => void;
  startEmergencySimulation: () => void;
  resetDemo: () => void;
  addToast: (toast: Omit<ToastNotification, 'id' | 'timestamp'>) => void;
  removeToast: (id: string) => void;
  viewIncidentDetails: (incidentId: string) => void;
  updateSettings: (newSettings: Partial<SystemSettings>) => void;
}

const EmergencyContext = createContext<EmergencyContextType | undefined>(undefined);

export const EmergencyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('COMMAND_CENTER');
  const [activeIncident, setActiveIncident] = useState<Incident>(initialActiveIncident);
  const [incidentsHistory, setIncidentsHistory] = useState<Incident[]>(mockIncidentsHistory);
  const [responseUnits, setResponseUnits] = useState<ResponseUnit[]>(mockResponseUnits);
  const [hospitals, setHospitals] = useState<Hospital[]>(mockHospitals);
  const [familyContact, setFamilyContact] = useState<FamilyContact>(initialFamilyContact);
  const [aiSteps, setAiSteps] = useState<AIAgentStep[]>(initialAISteps);
  const [transcript, setTranscript] = useState<CallTranscriptMessage[]>(initialTranscript);
  const [settings, setSettings] = useState<SystemSettings>(initialSettings);
  const [toasts, setToasts] = useState<ToastNotification[]>([]);
  const [mapFilter, setMapFilter] = useState<'All' | 'EMS' | 'POLICE' | 'FIRE' | 'HOSPITALS'>('All');
  const [selectedIncidentDetail, setSelectedIncidentDetail] = useState<Incident | null>(initialActiveIncident);
  
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simStep, setSimStep] = useState<number>(0);

  // Toast Helper
  const addToast = useCallback((toast: Omit<ToastNotification, 'id' | 'timestamp'>) => {
    const newToast: ToastNotification = {
      ...toast,
      id: `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    };
    setToasts((prev) => [newToast, ...prev].slice(0, 5));
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Dispatch EMS/Unit
  const dispatchUnit = useCallback((unitId: string) => {
    setResponseUnits((prev) =>
      prev.map((unit) =>
        unit.id === unitId
          ? { ...unit, status: 'En route', assignedIncidentId: activeIncident.incidentId, etaMinutes: 3 }
          : unit
      )
    );

    setActiveIncident((prev) => ({
      ...prev,
      status: 'DISPATCHED',
      assignedAmbulance: unitId.includes('A-') ? `Unit ${unitId}` : prev.assignedAmbulance
    }));

    addToast({
      type: 'success',
      title: 'Dispatch Confirmed',
      message: `${unitId} dispatched to ${activeIncident.location} (ETA 03 min)`
    });
  }, [activeIncident, addToast]);

  const notifyPolice = useCallback(() => {
    setResponseUnits((prev) =>
      prev.map((unit) =>
        unit.id === 'P-07'
          ? { ...unit, status: 'En route', assignedIncidentId: activeIncident.incidentId, etaMinutes: 4 }
          : unit
      )
    );
    setActiveIncident((prev) => ({ ...prev, assignedPolice: 'Unit P-07' }));
    addToast({
      type: 'info',
      title: 'Police Dispatched',
      message: 'Police Unit P-07 assigned for perimeter & traffic control.'
    });
  }, [activeIncident.incidentId, addToast]);

  const notifyFire = useCallback(() => {
    setResponseUnits((prev) =>
      prev.map((unit) =>
        unit.id === 'F-03'
          ? { ...unit, status: 'En route', assignedIncidentId: activeIncident.incidentId, etaMinutes: 5 }
          : unit
      )
    );
    setActiveIncident((prev) => ({ ...prev, assignedFire: 'Unit F-03' }));
    addToast({
      type: 'warning',
      title: 'Fire Crew Alerted',
      message: 'Fire Unit F-03 mobilized for backup support.'
    });
  }, [activeIncident.incidentId, addToast]);

  // Send Hospital Patient Info
  const sendHospitalPatientInfo = useCallback((hospitalId: string) => {
    setHospitals((prev) =>
      prev.map((h) => (h.id === hospitalId ? { ...h, patientInfoSent: true } : h))
    );
    const hosp = hospitals.find((h) => h.id === hospitalId);
    addToast({
      type: 'success',
      title: 'Hospital Telemetry Sent',
      message: `Patient emergency card & vital metrics transmitted to ${hosp?.name || 'Hospital'}.`
    });
  }, [hospitals, addToast]);

  // Send Family Notification
  const sendFamilyNotification = useCallback(() => {
    setFamilyContact((prev) => ({
      ...prev,
      notificationStatus: 'Sent',
      lastSentTimestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }));
    setActiveIncident((prev) => ({ ...prev, familyNotificationSent: true }));
    addToast({
      type: 'success',
      title: 'Family Notification Sent',
      message: `SMS alert successfully sent to ${familyContact.name} (${familyContact.relationship}).`
    });
  }, [familyContact, addToast]);

  // Update Incident Status
  const updateIncidentStatus = useCallback((status: IncidentStatus) => {
    setActiveIncident((prev) => ({ ...prev, status }));
    addToast({
      type: 'info',
      title: 'Incident Status Updated',
      message: `Incident ${activeIncident.incidentId} changed to ${status}.`
    });
  }, [activeIncident.incidentId, addToast]);

  // View Incident Details
  const viewIncidentDetails = useCallback((incidentId: string) => {
    const found = incidentsHistory.find((inc) => inc.incidentId === incidentId) || activeIncident;
    setSelectedIncidentDetail(found);
    setActiveTab('ACTIVE_INCIDENT');
  }, [incidentsHistory, activeIncident]);

  // Update Settings
  const updateSettings = useCallback((newSettings: Partial<SystemSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
    addToast({
      type: 'info',
      title: 'Settings Updated',
      message: 'AI Emergency Response System parameters updated.'
    });
  }, [addToast]);

  // Reset Demo State
  const resetDemo = useCallback(() => {
    setIsSimulating(false);
    setSimStep(0);
    setActiveIncident(initialActiveIncident);
    setResponseUnits(mockResponseUnits);
    setHospitals(mockHospitals);
    setFamilyContact(initialFamilyContact);
    setAiSteps(initialAISteps);
    setTranscript(initialTranscript);
    setSelectedIncidentDetail(initialActiveIncident);
    addToast({
      type: 'info',
      title: 'Demo Reset',
      message: 'System state restored to initial demo configuration.'
    });
  }, [addToast]);

  // Interactive Real-Time Emergency Simulation
  const startEmergencySimulation = useCallback(() => {
    if (isSimulating) return;

    setIsSimulating(true);
    setSimStep(1);

    const newSimIncident: Incident = {
      incidentId: 'INC-2049',
      caller: 'Marcus Sterling',
      callerPhone: '+1 (555) 710-4490',
      emergencyType: 'EMS',
      location: '88 Cybernetics Plaza',
      coordinates: { x: 58, y: 50 },
      symptoms: ['Acute chest pressure', 'Shortness of breath', 'Profuse sweating'],
      situationDescription: 'Caller reports 52-year-old male suddenly collapsed near elevator bank experiencing acute coronary symptoms.',
      severity: 'Critical',
      status: 'CRITICAL',
      confidence: 96,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      patientStatus: 'Semi-conscious / High distress',
      locationConfidence: 99,
      medicalConfidence: 96,
      aiSummary: 'High-probability cardiac arrest emergency at 88 Cybernetics Plaza. Immediate defibrillator & ALS response required.'
    };

    // Step 0: Clear state
    setActiveIncident(newSimIncident);
    setSelectedIncidentDetail(newSimIncident);
    setFamilyContact({
      name: 'Jennifer Sterling',
      relationship: 'Spouse',
      phone: '+1 (555) 881-2049',
      notificationStatus: 'Ready',
      messagePreview: 'An emergency has been reported involving Marcus Sterling at 88 Cybernetics Plaza. EMS unit A-07 dispatched.'
    });

    setAiSteps([
      { id: 's-1', time: '10:45:00', description: 'CALL RECEIVED', status: 'processing', category: 'ingestion' },
      { id: 's-2', time: '10:45:01', description: 'Voice converted to text', status: 'pending', category: 'ingestion' },
      { id: 's-3', time: '10:45:02', description: 'Emergency type identified: EMS', status: 'pending', category: 'analysis' },
      { id: 's-4', time: '10:45:03', description: 'Critical symptoms detected', status: 'pending', category: 'triage' },
      { id: 's-5', time: '10:45:04', description: 'Location extracted', status: 'pending', category: 'analysis' },
      { id: 's-6', time: '10:45:05', description: 'Nearest ambulance identified', status: 'pending', category: 'routing' },
      { id: 's-7', time: '10:45:06', description: 'Hospital recommendation generated', status: 'pending', category: 'routing' },
      { id: 's-8', time: '10:45:07', description: 'Family notification prepared', status: 'pending', category: 'dispatch' }
    ]);

    setTranscript([
      { id: 'st-1', sender: 'AI DISPATCHER', text: '911 Emergency Command, speak your location.', timestamp: '10:45:00' }
    ]);

    addToast({
      type: 'critical',
      title: 'NEW INCOMING EMERGENCY',
      message: 'Autonomous AI processing new call from 88 Cybernetics Plaza...'
    });

    // Step-by-step timer simulation pipeline
    const timer1 = setTimeout(() => {
      setSimStep(2);
      setTranscript((prev) => [
        ...prev,
        { id: 'st-2', sender: 'CALLER', text: "Help! My colleague Marcus just collapsed! He's holding his chest and can't breathe!", timestamp: '10:45:01', isKeyInfo: true }
      ]);
      setAiSteps((prev) =>
        prev.map((s) => (s.id === 's-1' ? { ...s, status: 'completed' } : s.id === 's-2' ? { ...s, status: 'processing' } : s))
      );
    }, 1200);

    const timer2 = setTimeout(() => {
      setSimStep(3);
      setTranscript((prev) => [
        ...prev,
        { id: 'st-3', sender: 'AI DISPATCHER', text: 'Confirmed. Stay calm. What is the address or building name?', timestamp: '10:45:02' }
      ]);
      setAiSteps((prev) =>
        prev.map((s) => (s.id === 's-2' ? { ...s, status: 'completed' } : s.id === 's-3' ? { ...s, status: 'completed' } : s.id === 's-4' ? { ...s, status: 'processing' } : s))
      );
    }, 2400);

    const timer3 = setTimeout(() => {
      setSimStep(4);
      setTranscript((prev) => [
        ...prev,
        { id: 'st-4', sender: 'CALLER', text: "We are at 88 Cybernetics Plaza in the 2nd floor lobby!", timestamp: '10:45:03', isKeyInfo: true }
      ]);
      setAiSteps((prev) =>
        prev.map((s) => (s.id === 's-4' ? { ...s, status: 'completed' } : s.id === 's-5' ? { ...s, status: 'completed' } : s.id === 's-6' ? { ...s, status: 'processing' } : s))
      );
    }, 3600);

    const timer4 = setTimeout(() => {
      setSimStep(5);
      setTranscript((prev) => [
        ...prev,
        { id: 'st-5', sender: 'AI DISPATCHER', text: 'Ambulance Unit A-07 dispatched on Priority 1 Code Red. Hospital St. Jude notified.', timestamp: '10:45:05' }
      ]);
      setAiSteps((prev) =>
        prev.map((s) => (s.id === 's-6' ? { ...s, status: 'completed' } : s.id === 's-7' ? { ...s, status: 'completed' } : s.id === 's-8' ? { ...s, status: 'processing' } : s))
      );
      // Auto assign nearest ambulance
      setResponseUnits((prev) =>
        prev.map((u) => (u.id === 'A-07' ? { ...u, status: 'En route', assignedIncidentId: 'INC-2049', etaMinutes: 2 } : u))
      );
    }, 4800);

    const timer5 = setTimeout(() => {
      setSimStep(6);
      setAiSteps((prev) => prev.map((s) => ({ ...s, status: 'completed' })));
      setIsSimulating(false);
      addToast({
        type: 'success',
        title: 'AI Workflow Complete',
        message: 'Emergency classification, unit dispatch & family alert ready for operator review.'
      });
    }, 6000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
    };
  }, [isSimulating, addToast]);

  return (
    <EmergencyContext.Provider
      value={{
        activeTab,
        setActiveTab,
        activeIncident,
        incidentsHistory,
        responseUnits,
        hospitals,
        familyContact,
        aiSteps,
        transcript,
        settings,
        toasts,
        isSimulating,
        simStep,
        mapFilter,
        setMapFilter,
        selectedIncidentDetail,
        setSelectedIncidentDetail,
        dispatchUnit,
        notifyPolice,
        notifyFire,
        sendHospitalPatientInfo,
        sendFamilyNotification,
        updateIncidentStatus,
        startEmergencySimulation,
        resetDemo,
        addToast,
        removeToast,
        viewIncidentDetails,
        updateSettings
      }}
    >
      {children}
    </EmergencyContext.Provider>
  );
};

export const useEmergency = () => {
  const context = useContext(EmergencyContext);
  if (!context) {
    throw new Error('useEmergency must be used within an EmergencyProvider');
  }
  return context;
};
