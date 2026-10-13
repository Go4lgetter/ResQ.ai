import React, { useState } from 'react';
import { useEmergency } from '../../context/EmergencyContext';
import {
  Navigation,
  Truck,
  Shield,
  Flame,
  Building2,
  ZoomIn,
  ZoomOut,
  Crosshair,
  X,
  AlertCircle,
  Radio,
  Compass,
  Layers,
  Activity,
  Maximize2
} from 'lucide-react';

export const LiveResponseMap: React.FC = () => {
  const {
    activeIncident,
    responseUnits,
    hospitals,
    mapFilter,
    setMapFilter,
    dispatchUnit,
    sendHospitalPatientInfo
  } = useEmergency();

  const [mapStyle, setMapStyle] = useState<'TACTICAL' | 'SATELLITE' | 'HEATMAP' | 'TRAFFIC'>('TACTICAL');
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [showRadarSweep, setShowRadarSweep] = useState<boolean>(true);
  const [showTrafficOverlay, setShowTrafficOverlay] = useState<boolean>(true);

  const [selectedMarker, setSelectedMarker] = useState<{
    id: string;
    type: 'INCIDENT' | 'EMS' | 'POLICE' | 'FIRE' | 'HOSPITAL';
    name: string;
    details: string;
    status: string;
    coordinates: { x: number; y: number };
    distance?: string;
    speed?: string;
    heading?: string;
  } | null>(null);

  // Filter conditions
  const showEMS = mapFilter === 'All' || mapFilter === 'EMS';
  const showPolice = mapFilter === 'All' || mapFilter === 'POLICE';
  const showFire = mapFilter === 'All' || mapFilter === 'FIRE';
  const showHospitals = mapFilter === 'All' || mapFilter === 'HOSPITALS';

  const assignedAmbulance = responseUnits.find((u) => u.id === 'A-12') || responseUnits[0];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-2xl flex flex-col h-[560px] relative overflow-hidden group">
      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3 z-10">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <Compass className="w-5 h-5 animate-spin-slow" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider font-mono flex items-center gap-2">
              ResQ.ai Tactical GIS Command Map
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 font-sans font-bold border border-red-500/30 animate-pulse">
                ● LIVE SECTOR SCAN
              </span>
            </h3>
            <p className="text-[11px] text-slate-400 font-mono">
              GPS Precision: 0.2m • Grid Ref: 40.7128°N, 74.0060°W • Metropolis Metro
            </p>
          </div>
        </div>

        {/* Controls: Map Viewport Style Toggles */}
        <div className="flex items-center gap-2">
          {/* Map Layer Switcher */}
          <div className="flex items-center gap-1 bg-slate-955 border border-slate-800 p-1 rounded-xl text-[11px] font-mono font-bold">
            {(['TACTICAL', 'SATELLITE', 'HEATMAP'] as const).map((style) => (
              <button
                key={style}
                onClick={() => setMapStyle(style)}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  mapStyle === style
                    ? 'bg-cyan-500 text-slate-955 shadow'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                {style}
              </button>
            ))}
          </div>

          {/* Sector Category Filters */}
          <div className="flex items-center gap-1 bg-slate-955 border border-slate-800 p-1 rounded-xl text-[11px] font-mono font-medium">
            {(['All', 'EMS', 'POLICE', 'FIRE', 'HOSPITALS'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setMapFilter(filter)}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  mapFilter === filter
                    ? 'bg-slate-800 text-cyan-300 font-bold border border-cyan-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Map Viewport Canvas */}
      <div
        className={`relative flex-1 rounded-xl border border-slate-800/80 overflow-hidden select-none transition-colors duration-300 ${
          mapStyle === 'SATELLITE'
            ? 'bg-slate-955'
            : mapStyle === 'HEATMAP'
            ? 'bg-slate-950'
            : 'bg-slate-950 bg-grid-pattern'
        }`}
      >
        {/* Sophisticated SVG Vector Map Layout */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none transition-transform duration-300"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          <defs>
            {/* Gradient definition for river */}
            <linearGradient id="riverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0284c7" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#0369a1" stopOpacity="0.5" />
            </linearGradient>

            {/* Radial glow for emergency incident heatmap */}
            <radialGradient id="incidentHeat" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#f97316" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* 1. Parks & Natural Green Zones */}
          <path d="M 60 40 Q 180 20, 240 100 T 140 180 Z" fill="#065f46" fillOpacity="0.25" stroke="#10b981" strokeWidth="1" strokeDasharray="3 3" />
          <path d="M 520 320 Q 640 300, 700 400 T 580 480 Z" fill="#065f46" fillOpacity="0.2" stroke="#10b981" strokeWidth="1" />

          {/* 2. Waterways & Harbor Channel */}
          <path
            d="M -50 220 C 200 180, 320 380, 650 310 C 850 260, 1000 420, 1250 380 L 1250 500 L -50 500 Z"
            fill="url(#riverGrad)"
            stroke="#38bdf8"
            strokeWidth="3"
            strokeOpacity="0.6"
          />

          {/* 3. City Building Footprint Blocks (Realistic Urban Isometric Polygons) */}
          <g fill="#1e293b" stroke="#334155" strokeWidth="1">
            {/* Financial District Footprints */}
            <rect x="420" y="320" width="45" height="35" rx="3" />
            <rect x="475" y="320" width="30" height="50" rx="3" />
            <rect x="420" y="365" width="50" height="40" rx="3" />
            <rect x="520" y="240" width="60" height="40" rx="3" />
            <rect x="590" y="240" width="40" height="60" rx="3" />

            {/* Medical Center Complex */}
            <rect x="630" y="390" width="55" height="45" rx="4" fill="#022c22" stroke="#059669" />
            <rect x="690" y="390" width="40" height="45" rx="4" fill="#022c22" stroke="#059669" />

            {/* Residential Blocks */}
            <rect x="120" y="100" width="40" height="30" rx="2" />
            <rect x="170" y="100" width="40" height="30" rx="2" />
            <rect x="220" y="100" width="40" height="30" rx="2" />
            <rect x="120" y="140" width="40" height="30" rx="2" />
            <rect x="170" y="140" width="40" height="30" rx="2" />
          </g>

          {/* 4. Major Road Networks & Highway Bridges */}
          {/* Ring Road Expressway */}
          <circle cx="500" cy="300" r="280" fill="none" stroke="#475569" strokeWidth="4" strokeDasharray="14 6" opacity="0.6" />

          {/* Primary Avenues */}
          <line x1="0" y1="150" x2="1100" y2="150" stroke="#64748b" strokeWidth="4" />
          <line x1="0" y1="280" x2="1100" y2="280" stroke="#0284c7" strokeWidth="6" strokeOpacity="0.8" />
          <line x1="0" y1="430" x2="1100" y2="430" stroke="#64748b" strokeWidth="5" />

          <line x1="260" y1="0" x2="260" y2="600" stroke="#64748b" strokeWidth="5" />
          <line x1="480" y1="0" x2="480" y2="600" stroke="#38bdf8" strokeWidth="7" strokeOpacity="0.8" />
          <line x1="740" y1="0" x2="740" y2="600" stroke="#64748b" strokeWidth="5" />

          {/* Diagonal Transit Arteries */}
          <line x1="80" y1="500" x2="880" y2="50" stroke="#334155" strokeWidth="4" strokeDasharray="8 4" />

          {/* Bridges across river */}
          <rect x="250" y="225" width="20" height="40" fill="#475569" stroke="#94a3b8" strokeWidth="1" />
          <rect x="470" y="275" width="20" height="50" fill="#0284c7" stroke="#38bdf8" strokeWidth="1" />

          {/* 5. Live Traffic Congestion Overlays */}
          {showTrafficOverlay && (
            <g>
              {/* Heavy Congestion Segment */}
              <line x1="280" y1="280" x2="440" y2="280" stroke="#ef4444" strokeWidth="6" className="animate-pulse" />
              {/* Moderate Traffic Segment */}
              <line x1="480" y1="150" x2="700" y2="150" stroke="#f59e0b" strokeWidth="5" />
              {/* Clear Flow Segment */}
              <line x1="480" y1="280" x2="740" y2="280" stroke="#10b981" strokeWidth="5" />
            </g>
          )}

          {/* 6. Heatmap Overlay Mode */}
          {mapStyle === 'HEATMAP' && (
            <circle
              cx={`${activeIncident.coordinates.x}%`}
              cy={`${activeIncident.coordinates.y}%`}
              r="140"
              fill="url(#incidentHeat)"
            />
          )}

          {/* 7. Sector Grid Labels */}
          <text x="60" y="60" fill="#94a3b8" fontSize="11" fontFamily="monospace" fontWeight="bold">SECTOR 01 • NORTH PATROL</text>
          <text x="500" y="60" fill="#94a3b8" fontSize="11" fontFamily="monospace" fontWeight="bold">SECTOR 02 • EAST HARBOR</text>
          <text x="60" y="520" fill="#94a3b8" fontSize="11" fontFamily="monospace" fontWeight="bold">SECTOR 03 • WEST PLAZA</text>
          <text x="500" y="520" fill="#94a3b8" fontSize="11" fontFamily="monospace" fontWeight="bold">SECTOR 04 • COMMAND CENTRAL</text>
        </svg>

        {/* 8. DYNAMIC ROUTE TRAJECTORY BEACON */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
          <path
            d={`M ${assignedAmbulance.coordinates.x}% ${assignedAmbulance.coordinates.y}% C ${assignedAmbulance.coordinates.x + 4}% ${activeIncident.coordinates.y}%, ${activeIncident.coordinates.x - 3}% ${assignedAmbulance.coordinates.y}%, ${activeIncident.coordinates.x}% ${activeIncident.coordinates.y}%`}
            stroke="#06b6d4"
            strokeWidth="3"
            strokeDasharray="8 5"
            fill="none"
            className="animate-pulse"
          />

          {/* Waypoint Midpoint Pulse Node */}
          <circle
            cx={`${(assignedAmbulance.coordinates.x + activeIncident.coordinates.x) / 2}%`}
            cy={`${(assignedAmbulance.coordinates.y + activeIncident.coordinates.y) / 2}%`}
            r="4"
            fill="#06b6d4"
            className="animate-ping"
          />
        </svg>

        {/* 9. RADAR SWEEP SCAN OVERLAY */}
        {showRadarSweep && (
          <div
            className="absolute z-20 pointer-events-none transform -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-500/20"
            style={{
              left: `${activeIncident.coordinates.x}%`,
              top: `${activeIncident.coordinates.y}%`,
              width: '320px',
              height: '320px'
            }}
          >
            <div className="w-full h-full rounded-full border border-cyan-500/10 animate-ping" />
          </div>
        )}

        {/* 10. ACTIVE EMERGENCY INCIDENT MARKER */}
        <div
          className="absolute z-30 cursor-pointer transform -translate-x-1/2 -translate-y-1/2 group/pin"
          style={{ left: `${activeIncident.coordinates.x}%`, top: `${activeIncident.coordinates.y}%` }}
          onClick={() =>
            setSelectedMarker({
              id: activeIncident.incidentId,
              type: 'INCIDENT',
              name: `CRITICAL CALL: ${activeIncident.incidentId}`,
              details: activeIncident.location,
              status: activeIncident.symptoms.join(', '),
              coordinates: activeIncident.coordinates,
              distance: '0 km (Target Incident Location)'
            })
          }
        >
          {/* Concentric Sonar Pulse Beacons */}
          <div className="absolute -inset-6 rounded-full bg-red-500/30 animate-radar-ping pointer-events-none" />
          <div className="absolute -inset-3 rounded-full bg-red-500/40 animate-ping pointer-events-none" />

          {/* Marker Beacon Badge */}
          <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-tr from-red-700 to-rose-600 text-white shadow-2xl shadow-red-950 border-2 border-white animate-bounce">
            <AlertCircle className="w-6 h-6 text-white" />
          </div>

          {/* Floating Address HUD Badge */}
          <div className="absolute top-11 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-red-950/90 border border-red-500/80 text-[10px] font-mono font-bold text-white rounded-lg whitespace-nowrap shadow-2xl backdrop-blur">
            <span className="text-red-400">● 194 ESC STREET</span> (TARGET)
          </div>
        </div>

        {/* 11. EMS AMBULANCE MARKERS */}
        {showEMS &&
          responseUnits
            .filter((u) => u.type === 'AMBULANCE')
            .map((unit) => (
              <div
                key={unit.id}
                className="absolute z-20 cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all hover:scale-125 group/unit"
                style={{ left: `${unit.coordinates.x}%`, top: `${unit.coordinates.y}%` }}
                onClick={() =>
                  setSelectedMarker({
                    id: unit.id,
                    type: 'EMS',
                    name: unit.name,
                    details: unit.location,
                    status: unit.status,
                    coordinates: unit.coordinates,
                    distance: `${unit.distanceKm} km`,
                    speed: '48 km/h',
                    heading: '240° SW'
                  })
                }
              >
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center text-white border-2 border-white/90 shadow-xl ${
                    unit.status === 'En route'
                      ? 'bg-gradient-to-tr from-cyan-600 to-teal-500 animate-pulse shadow-cyan-950'
                      : 'bg-slate-800 border-slate-600'
                  }`}
                >
                  <Truck className="w-4 h-4" />
                </div>
                <span className="absolute top-9 left-1/2 -translate-x-1/2 px-1.5 py-0.5 bg-slate-900/90 border border-slate-700 text-[9px] font-mono text-cyan-300 rounded whitespace-nowrap shadow backdrop-blur">
                  {unit.id}
                </span>
              </div>
            ))}

        {/* 12. POLICE MARKERS */}
        {showPolice &&
          responseUnits
            .filter((u) => u.type === 'POLICE')
            .map((unit) => (
              <div
                key={unit.id}
                className="absolute z-20 cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all hover:scale-125"
                style={{ left: `${unit.coordinates.x}%`, top: `${unit.coordinates.y}%` }}
                onClick={() =>
                  setSelectedMarker({
                    id: unit.id,
                    type: 'POLICE',
                    name: unit.name,
                    details: unit.location,
                    status: unit.status,
                    coordinates: unit.coordinates,
                    distance: `${unit.distanceKm} km`,
                    speed: '35 km/h'
                  })
                }
              >
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-700 to-indigo-600 flex items-center justify-center text-white border-2 border-white/90 shadow-xl">
                  <Shield className="w-4 h-4" />
                </div>
                <span className="absolute top-9 left-1/2 -translate-x-1/2 px-1.5 py-0.5 bg-slate-900/90 border border-slate-700 text-[9px] font-mono text-blue-300 rounded whitespace-nowrap shadow backdrop-blur">
                  {unit.id}
                </span>
              </div>
            ))}

        {/* 13. FIRE MARKERS */}
        {showFire &&
          responseUnits
            .filter((u) => u.type === 'FIRE')
            .map((unit) => (
              <div
                key={unit.id}
                className="absolute z-20 cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all hover:scale-125"
                style={{ left: `${unit.coordinates.x}%`, top: `${unit.coordinates.y}%` }}
                onClick={() =>
                  setSelectedMarker({
                    id: unit.id,
                    type: 'FIRE',
                    name: unit.name,
                    details: unit.location,
                    status: unit.status,
                    coordinates: unit.coordinates,
                    distance: `${unit.distanceKm} km`
                  })
                }
              >
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center text-white border-2 border-white/90 shadow-xl">
                  <Flame className="w-4 h-4" />
                </div>
                <span className="absolute top-9 left-1/2 -translate-x-1/2 px-1.5 py-0.5 bg-slate-900/90 border border-slate-700 text-[9px] font-mono text-orange-300 rounded whitespace-nowrap shadow backdrop-blur">
                  {unit.id}
                </span>
              </div>
            ))}

        {/* 14. HOSPITAL MARKERS */}
        {showHospitals &&
          hospitals.map((hosp) => (
            <div
              key={hosp.id}
              className="absolute z-20 cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all hover:scale-125"
              style={{ left: `${hosp.coordinates.x}%`, top: `${hosp.coordinates.y}%` }}
              onClick={() =>
                setSelectedMarker({
                  id: hosp.id,
                  type: 'HOSPITAL',
                  name: hosp.name,
                  details: hosp.traumaCenterLevel,
                  status: `ER: ${hosp.availableBeds} beds free`,
                  coordinates: hosp.coordinates,
                  distance: `${hosp.distanceKm} km`
                })
              }
            >
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-500 border-2 border-white flex items-center justify-center text-white shadow-2xl">
                <Building2 className="w-4 h-4" />
              </div>
              <span className="absolute top-10 left-1/2 -translate-x-1/2 px-1.5 py-0.5 bg-slate-900/90 border border-slate-700 text-[9px] font-mono text-emerald-300 rounded whitespace-nowrap shadow backdrop-blur">
                {hosp.name.split(' ')[0]}
              </span>
            </div>
          ))}

        {/* Floating Zoom Controls & HUD Options */}
        <div className="absolute top-3 right-3 z-30 flex flex-col gap-1.5 bg-slate-900/90 border border-slate-800 p-1.5 rounded-2xl backdrop-blur-md shadow-2xl">
          <button
            onClick={() => setZoomLevel((z) => Math.min(z + 0.25, 1.75))}
            className="p-1.5 hover:bg-slate-800 text-slate-300 hover:text-white rounded-xl transition"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoomLevel((z) => Math.max(z - 0.25, 0.75))}
            className="p-1.5 hover:bg-slate-800 text-slate-300 hover:text-white rounded-xl transition"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoomLevel(1)}
            className="p-1.5 hover:bg-slate-800 text-slate-300 hover:text-white rounded-xl transition"
            title="Reset Map View"
          >
            <Crosshair className="w-4 h-4" />
          </button>
          <div className="h-px bg-slate-800 my-0.5" />
          <button
            onClick={() => setShowRadarSweep(!showRadarSweep)}
            className={`p-1.5 rounded-xl transition ${
              showRadarSweep ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40' : 'text-slate-500'
            }`}
            title="Toggle Radar Sweep"
          >
            <Radio className="w-4 h-4" />
          </button>
        </div>

        {/* Bottom Left Coordinate HUD */}
        <div className="absolute bottom-3 left-3 z-30 px-3 py-1.5 bg-slate-900/90 border border-slate-800 rounded-xl backdrop-blur font-mono text-[10px] text-slate-400 flex items-center gap-3">
          <div className="flex items-center gap-1 text-cyan-400 font-bold">
            <Activity className="w-3 h-3" />
            <span>GPS LOCKED</span>
          </div>
          <span>N 40°42'46" W 74°00'21"</span>
          <span>ELEV: 18m</span>
        </div>

        {/* Selected Marker Detail Card Popup Drawer */}
        {selectedMarker && (
          <div className="absolute bottom-4 right-4 z-40 w-80 bg-slate-900/95 border border-slate-700 rounded-2xl shadow-2xl p-4 backdrop-blur-md animate-in slide-in-from-bottom-4">
            <div className="flex items-start justify-between gap-2 mb-2 pb-2 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-mono uppercase font-bold text-cyan-400">{selectedMarker.type} HUD</span>
                <h4 className="text-xs font-bold text-white leading-tight">{selectedMarker.name}</h4>
              </div>
              <button
                onClick={() => setSelectedMarker(null)}
                className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[11px] text-slate-300 mb-2 font-sans">{selectedMarker.details}</p>

            <div className="space-y-1.5 text-[11px] font-mono text-slate-400 mb-3 p-2 rounded-xl bg-slate-955 border border-slate-800">
              <div className="flex justify-between">
                <span>Status:</span>
                <strong className="text-slate-100">{selectedMarker.status}</strong>
              </div>
              {selectedMarker.distance && (
                <div className="flex justify-between">
                  <span>Distance:</span>
                  <strong className="text-cyan-300">{selectedMarker.distance}</strong>
                </div>
              )}
              {selectedMarker.speed && (
                <div className="flex justify-between">
                  <span>Speed / Heading:</span>
                  <strong className="text-slate-200">{selectedMarker.speed} ({selectedMarker.heading})</strong>
                </div>
              )}
            </div>

            {selectedMarker.type === 'EMS' && (
              <button
                onClick={() => dispatchUnit(selectedMarker.id)}
                className="w-full py-2 px-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-bold font-mono transition shadow-lg shadow-cyan-950/50"
              >
                Assign / Dispatch Unit
              </button>
            )}
            {selectedMarker.type === 'HOSPITAL' && (
              <button
                onClick={() => sendHospitalPatientInfo(selectedMarker.id)}
                className="w-full py-2 px-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold font-mono transition shadow-lg shadow-emerald-950/50"
              >
                Send Patient Information
              </button>
            )}
          </div>
        )}
      </div>

      {/* Map Legend Footer */}
      <div className="mt-3 pt-2 border-t border-slate-800 flex flex-wrap items-center justify-between text-[11px] font-mono text-slate-400 gap-2 z-10">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
            <span>Target Incident (194 ESC St)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded bg-cyan-400" />
            <span>EMS Ambulance</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded bg-blue-500" />
            <span>Police Unit</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded bg-orange-500" />
            <span>Fire Engine</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span>Hospital</span>
          </div>
        </div>
        <div className="text-[10px] text-slate-500">Vector GIS Engine • 60 FPS</div>
      </div>
    </div>
  );
};
