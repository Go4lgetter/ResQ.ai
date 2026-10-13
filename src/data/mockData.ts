import type { Incident, ResponseUnit, Hospital, FamilyContact, AIAgentStep, CallTranscriptMessage, SystemSettings } from '../types';

export const initialActiveIncident: Incident = {
  incidentId: 'INC-2048',
  caller: 'Amy Johnson',
  callerPhone: '+1 (555) 234-8901',
  emergencyType: 'EMS',
  location: '194 ESC Street',
  coordinates: { x: 48, y: 38 }, // Center-left on map
  symptoms: ['Severe breathing difficulty', 'Acute physical collapse', 'Loss of consciousness'],
  situationDescription: 'Caller reports that a person has collapsed and is experiencing severe breathing difficulty. Emergency medical response is required immediately.',
  severity: 'Critical',
  status: 'CRITICAL',
  confidence: 94,
  timestamp: '10:42 AM',
  patientStatus: 'Unconscious / Shallow breathing',
  locationConfidence: 98,
  medicalConfidence: 91,
  assignedAmbulance: 'Unit A-12',
  assignedPolice: 'Unit P-07',
  assignedFire: 'Unit F-03',
  recommendedHospitalId: 'HOSP-01',
  familyNotificationSent: false,
  aiSummary: 'Caller reports that a person has collapsed and is experiencing severe breathing difficulty. Emergency medical response is required.'
};

export const mockIncidentsHistory: Incident[] = [
  { ...initialActiveIncident },
  {
    incidentId: 'INC-2047',
    caller: 'Robert Davis',
    callerPhone: '+1 (555) 892-1144',
    emergencyType: 'FIRE',
    location: 'Main Street & 4th Ave',
    coordinates: { x: 72, y: 24 },
    symptoms: ['Heavy smoke', 'Structural flames'],
    situationDescription: 'Commercial kitchen grease fire spreading to roof ventilation.',
    severity: 'High',
    status: 'RESOLVED',
    confidence: 96,
    timestamp: '09:31 AM',
    patientStatus: 'No injuries reported',
    locationConfidence: 99,
    medicalConfidence: 88,
    assignedFire: 'Unit F-01',
    aiSummary: 'Structure fire reported at commercial restaurant. Fire suppression dispatch confirmed.'
  },
  {
    incidentId: 'INC-2046',
    caller: 'Elena Rostova',
    callerPhone: '+1 (555) 301-9922',
    emergencyType: 'EMS',
    location: 'Sector 17 Plaza',
    coordinates: { x: 28, y: 65 },
    symptoms: ['Chest pain', 'Left arm numbness'],
    situationDescription: '58-year-old male experiencing acute cardiac symptoms outside subway entrance.',
    severity: 'Critical',
    status: 'RESOLVED',
    confidence: 97,
    timestamp: '08:52 AM',
    patientStatus: 'Stabilized in transit',
    locationConfidence: 97,
    medicalConfidence: 95,
    assignedAmbulance: 'Unit A-07',
    aiSummary: 'High-priority cardiac emergency. Direct transport to Saint Jude Heart Center.'
  },
  {
    incidentId: 'INC-2045',
    caller: 'Officer Marcus Vance',
    callerPhone: '+1 (555) 441-2090',
    emergencyType: 'POLICE',
    location: 'Market Road Mall',
    coordinates: { x: 60, y: 75 },
    symptoms: ['Vehicle collision', 'Traffic block'],
    situationDescription: 'Two-vehicle minor collision causing severe traffic bottleneck.',
    severity: 'Medium',
    status: 'RESOLVED',
    confidence: 92,
    timestamp: '08:21 AM',
    patientStatus: 'Minor contusions',
    locationConfidence: 95,
    medicalConfidence: 90,
    assignedPolice: 'Unit P-03',
    aiSummary: 'Traffic incident dispatch. Police unit cleared intersection.'
  },
  {
    incidentId: 'INC-2044',
    caller: 'David Miller',
    callerPhone: '+1 (555) 129-3388',
    emergencyType: 'HAZMAT',
    location: 'Industrial Park Way',
    coordinates: { x: 82, y: 55 },
    symptoms: ['Chemical vapor leak', 'Pungent odor'],
    situationDescription: 'Accidental containment breach of ammonia fluid tank during routine servicing.',
    severity: 'High',
    status: 'RESOLVED',
    confidence: 95,
    timestamp: '07:15 AM',
    patientStatus: 'Evacuated site safely',
    locationConfidence: 99,
    medicalConfidence: 94,
    assignedFire: 'Unit F-08',
    assignedPolice: 'Unit P-11',
    aiSummary: 'Chemical spill protocol initiated. Hazmat perimeter established.'
  },
  {
    incidentId: 'INC-2043',
    caller: 'Linda Smith',
    callerPhone: '+1 (555) 772-9012',
    emergencyType: 'EMS',
    location: '74 Oakridge Avenue',
    coordinates: { x: 35, y: 45 },
    symptoms: ['Pedestrian slip', 'Fractured wrist'],
    situationDescription: 'Elderly citizen slipped on icy pavement outside residence.',
    severity: 'Low',
    status: 'RESOLVED',
    confidence: 91,
    timestamp: '06:40 AM',
    patientStatus: 'Conscious, stable',
    locationConfidence: 96,
    medicalConfidence: 92,
    assignedAmbulance: 'Unit A-09',
    aiSummary: 'Non-life-threatening fracture transport to Community Health center.'
  }
];

export const mockResponseUnits: ResponseUnit[] = [
  // EMS
  {
    id: 'A-12',
    name: 'Ambulance A-12',
    type: 'AMBULANCE',
    status: 'En route',
    location: '2.1 km from 194 ESC Street',
    coordinates: { x: 42, y: 45 },
    assignedIncidentId: 'INC-2048',
    etaMinutes: 3,
    distanceKm: 2.1,
    fuelLevel: 88,
    crew: ['Paramedic J. Chen', 'EMT R. Taylor']
  },
  {
    id: 'A-07',
    name: 'Ambulance A-07',
    type: 'AMBULANCE',
    status: 'Available',
    location: 'St. Jude Base Station',
    coordinates: { x: 22, y: 60 },
    distanceKm: 4.8,
    fuelLevel: 94,
    crew: ['Paramedic M. Ross', 'EMT K. Patel']
  },
  {
    id: 'A-09',
    name: 'Ambulance A-09',
    type: 'AMBULANCE',
    status: 'Busy',
    location: 'Oakridge Sector',
    coordinates: { x: 36, y: 40 },
    assignedIncidentId: 'INC-2043',
    etaMinutes: 12,
    distanceKm: 6.2,
    fuelLevel: 65,
    crew: ['Paramedic D. Vance', 'EMT S. Adams']
  },
  // POLICE
  {
    id: 'P-07',
    name: 'Police Unit P-07',
    type: 'POLICE',
    status: 'Standby',
    location: 'Central Patrol (1.2 km away)',
    coordinates: { x: 55, y: 32 },
    assignedIncidentId: 'INC-2048',
    distanceKm: 1.2,
    fuelLevel: 91,
    crew: ['Officer B. Wright', 'Officer H. Lopez']
  },
  {
    id: 'P-03',
    name: 'Police Unit P-03',
    type: 'POLICE',
    status: 'Available',
    location: 'Market Road Precinct',
    coordinates: { x: 62, y: 72 },
    distanceKm: 5.4,
    fuelLevel: 79,
    crew: ['Sergeant T. Jenkins']
  },
  {
    id: 'P-11',
    name: 'Police Unit P-11',
    type: 'POLICE',
    status: 'En route',
    location: 'Industrial Perimeter',
    coordinates: { x: 80, y: 52 },
    distanceKm: 7.1,
    fuelLevel: 82,
    crew: ['Officer C. Diaz', 'Officer A. Wong']
  },
  // FIRE
  {
    id: 'F-03',
    name: 'Fire Unit F-03',
    type: 'FIRE',
    status: 'Standby',
    location: 'Station 4 (2.8 km away)',
    coordinates: { x: 50, y: 22 },
    assignedIncidentId: 'INC-2048',
    distanceKm: 2.8,
    fuelLevel: 96,
    crew: ['Captain E. Gallagher', 'Firefighter L. Gomez', 'Firefighter N. Scott']
  },
  {
    id: 'F-01',
    name: 'Fire Truck F-01',
    type: 'FIRE',
    status: 'Available',
    location: 'Central Fire Headquarters',
    coordinates: { x: 70, y: 28 },
    distanceKm: 3.9,
    fuelLevel: 89,
    crew: ['Captain M. Sterling', 'Firefighter D. Cole']
  }
];

export const mockHospitals: Hospital[] = [
  {
    id: 'HOSP-01',
    name: 'City General Hospital',
    distanceKm: 2.4,
    etaMinutes: 7,
    erCapacity: 'Available',
    availableBeds: 14,
    icuBeds: 4,
    traumaCenterLevel: 'Level 1 Trauma Center',
    coordinates: { x: 65, y: 42 },
    aiRecommendationNote: 'Suitable based on emergency type (Acute Respiratory Triage) and available emergency capacity.',
    patientInfoSent: false
  },
  {
    id: 'HOSP-02',
    name: 'Saint Jude Medical Center',
    distanceKm: 4.8,
    etaMinutes: 12,
    erCapacity: 'Available',
    availableBeds: 6,
    icuBeds: 1,
    traumaCenterLevel: 'Level 2 Trauma Center',
    coordinates: { x: 25, y: 58 },
    aiRecommendationNote: 'Secondary option; higher transit ETA during morning traffic congestion.',
    patientInfoSent: false
  },
  {
    id: 'HOSP-03',
    name: 'Metro Health Emergency Hub',
    distanceKm: 6.1,
    etaMinutes: 16,
    erCapacity: 'Busy',
    availableBeds: 2,
    icuBeds: 0,
    traumaCenterLevel: 'Level 1 Trauma Center',
    coordinates: { x: 80, y: 70 },
    aiRecommendationNote: 'High ER workload; not recommended for immediate cardiac/respiratory transfer.',
    patientInfoSent: false
  }
];

export const initialFamilyContact: FamilyContact = {
  name: 'Sarah Johnson',
  relationship: 'Sister',
  phone: '+1 (555) 948-3310',
  notificationStatus: 'Ready',
  messagePreview: 'An emergency has been reported involving Amy Johnson. Emergency services are responding. Please proceed to City General Hospital.'
};

export const initialAISteps: AIAgentStep[] = [
  {
    id: 'step-1',
    time: '10:42:03',
    description: 'CALL RECEIVED',
    status: 'completed',
    detail: 'Inbound high-priority voice line connected on Node-04',
    category: 'ingestion'
  },
  {
    id: 'step-2',
    time: '10:42:04',
    description: 'Voice converted to text',
    status: 'completed',
    detail: 'Real-time neural audio stream transcribed with 99.2% accuracy',
    category: 'ingestion'
  },
  {
    id: 'step-3',
    time: '10:42:05',
    description: 'Emergency type identified: EMS',
    status: 'completed',
    detail: 'NLP Classifier tagged Medical Priority 1 (EMS)',
    category: 'analysis'
  },
  {
    id: 'step-4',
    time: '10:42:06',
    description: 'Critical symptoms detected',
    status: 'completed',
    detail: 'Extracted: Breathing difficulty, loss of consciousness, sudden collapse',
    category: 'triage'
  },
  {
    id: 'step-5',
    time: '10:42:07',
    description: 'Location extracted',
    status: 'completed',
    detail: 'GPS & speech alignment verified 194 ESC Street (98% confidence)',
    category: 'analysis'
  },
  {
    id: 'step-6',
    time: '10:42:08',
    description: 'Nearest ambulance identified',
    status: 'completed',
    detail: 'Unit A-12 selected (ETA 3 mins, 2.1 km distance)',
    category: 'routing'
  },
  {
    id: 'step-7',
    time: '10:42:09',
    description: 'Hospital recommendation generated',
    status: 'completed',
    detail: 'City General Hospital selected (14 ER beds, Level 1 Trauma)',
    category: 'routing'
  },
  {
    id: 'step-8',
    time: '10:42:10',
    description: 'Family notification prepared',
    status: 'completed',
    detail: 'SMS draft compiled for emergency contact Sarah Johnson (Sister)',
    category: 'dispatch'
  }
];

export const initialTranscript: CallTranscriptMessage[] = [
  {
    id: 't-1',
    sender: 'AI DISPATCHER',
    text: "911 Emergency Response, what is the location and nature of your emergency?",
    timestamp: '10:42:03'
  },
  {
    id: 't-2',
    sender: 'CALLER',
    text: "My friend collapsed! She's on the floor and having severe difficulty breathing!",
    timestamp: '10:42:04',
    isKeyInfo: true
  },
  {
    id: 't-3',
    sender: 'AI DISPATCHER',
    text: "I am routing medical assistance right now. What is your exact location?",
    timestamp: '10:42:05'
  },
  {
    id: 't-4',
    sender: 'CALLER',
    text: "We are at 194 ESC Street inside the main office lobby!",
    timestamp: '10:42:07',
    isKeyInfo: true
  },
  {
    id: 't-5',
    sender: 'AI DISPATCHER',
    text: "Ambulance Unit A-12 is dispatched and en route with an ETA of 3 minutes. Is she conscious or speaking?",
    timestamp: '10:42:08'
  },
  {
    id: 't-6',
    sender: 'CALLER',
    text: "No, she's unconscious now but still breathing shallowly. My name is Amy Johnson.",
    timestamp: '10:42:09',
    isKeyInfo: true
  },
  {
    id: 't-7',
    sender: 'AI DISPATCHER',
    text: "Help is on the way, Amy. Please clear space around her, tilt her head back slightly, and keep the line open. I have notified City General Hospital and prepared an update for family contacts.",
    timestamp: '10:42:10'
  }
];

export const initialSettings: SystemSettings = {
  aiModel: 'ResQ.ai Emergency Agent v2.4 (Autonomous Core)',
  voiceRecognition: true,
  autoClassification: true,
  humanConfirmationRequired: true,
  demoModeLocation: 'Metropolis Metro District (Demo)',
  confidenceThreshold: 85,
  autoHospitalRouting: true,
  familySmsAlerts: true,
  audioLanguage: 'English (US) Neural Engine'
};
