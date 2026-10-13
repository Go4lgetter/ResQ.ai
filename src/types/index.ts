export type EmergencyType = 'EMS' | 'FIRE' | 'POLICE' | 'HAZMAT';

export type SeverityLevel = 'Critical' | 'High' | 'Medium' | 'Low';

export type IncidentStatus = 'CRITICAL' | 'DISPATCHED' | 'EN_ROUTE' | 'ON_SCENE' | 'RESOLVED';

export type UnitType = 'AMBULANCE' | 'POLICE' | 'FIRE';

export type UnitStatus = 'En route' | 'Available' | 'On Scene' | 'Standby' | 'Busy';

export interface Incident {
  incidentId: string;
  caller: string;
  callerPhone: string;
  emergencyType: EmergencyType;
  location: string;
  coordinates: { x: number; y: number }; // Percentage offset on mock city grid map
  symptoms: string[];
  situationDescription: string;
  severity: SeverityLevel;
  status: IncidentStatus;
  confidence: number;
  timestamp: string;
  patientStatus: string;
  locationConfidence: number;
  medicalConfidence: number;
  assignedAmbulance?: string;
  assignedPolice?: string;
  assignedFire?: string;
  recommendedHospitalId?: string;
  familyNotificationSent?: boolean;
  aiSummary: string;
}

export interface ResponseUnit {
  id: string;
  name: string;
  type: UnitType;
  status: UnitStatus;
  location: string;
  coordinates: { x: number; y: number };
  assignedIncidentId?: string;
  etaMinutes?: number;
  distanceKm: number;
  fuelLevel: number;
  crew: string[];
}

export interface Hospital {
  id: string;
  name: string;
  distanceKm: number;
  etaMinutes: number;
  erCapacity: 'Available' | 'Busy' | 'Full';
  availableBeds: number;
  icuBeds: number;
  traumaCenterLevel: string;
  coordinates: { x: number; y: number };
  aiRecommendationNote: string;
  patientInfoSent?: boolean;
}

export interface FamilyContact {
  name: string;
  relationship: string;
  phone: string;
  notificationStatus: 'Ready' | 'Sending' | 'Sent' | 'Failed';
  messagePreview: string;
  lastSentTimestamp?: string;
}

export interface AIAgentStep {
  id: string;
  time: string;
  description: string;
  status: 'completed' | 'processing' | 'pending';
  detail?: string;
  category: 'ingestion' | 'analysis' | 'triage' | 'routing' | 'dispatch';
}

export interface CallTranscriptMessage {
  id: string;
  sender: 'AI DISPATCHER' | 'CALLER';
  text: string;
  timestamp: string;
  isKeyInfo?: boolean;
}

export interface ToastNotification {
  id: string;
  type: 'success' | 'warning' | 'info' | 'critical';
  title: string;
  message: string;
  timestamp: string;
}

export interface SystemSettings {
  aiModel: string;
  voiceRecognition: boolean;
  autoClassification: boolean;
  humanConfirmationRequired: boolean;
  demoModeLocation: string;
  confidenceThreshold: number;
  autoHospitalRouting: boolean;
  familySmsAlerts: boolean;
  audioLanguage: string;
}
