import React from 'react';
import { useEmergency } from '../../context/EmergencyContext';
import { Building2, Sparkles, Send, CheckCircle2, Bed, HeartPulse } from 'lucide-react';

export const HospitalRecommendation: React.FC = () => {
  const { hospitals, sendHospitalPatientInfo } = useEmergency();

  const recommendedHospital = hospitals.find((h) => h.id === 'HOSP-01') || hospitals[0];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-2xl flex flex-col justify-between h-full">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider font-mono">
                Recommended Hospital
              </h3>
              <p className="text-[11px] text-slate-400">AI-optimized trauma routing destination</p>
            </div>
          </div>

          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            TOP MATCH
          </span>
        </div>

        {/* Hospital Card */}
        <div className="p-4 rounded-xl bg-slate-955 border border-slate-800 mb-4 font-mono">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-bold text-white">{recommendedHospital.name}</h4>
            <span className="text-xs text-emerald-400 font-bold">{recommendedHospital.traumaCenterLevel}</span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs mb-3 pt-2 border-t border-slate-800">
            <div>
              <span className="text-slate-400">Distance:</span>
              <div className="text-slate-200 font-bold mt-0.5">{recommendedHospital.distanceKm} km</div>
            </div>
            <div>
              <span className="text-slate-400">Transit ETA:</span>
              <div className="text-cyan-400 font-bold mt-0.5">{recommendedHospital.etaMinutes} min</div>
            </div>
            <div>
              <span className="text-slate-400">ER Capacity:</span>
              <div className="text-emerald-400 font-bold mt-0.5 flex items-center gap-1">
                <Bed className="w-3.5 h-3.5 inline" />
                {recommendedHospital.availableBeds} beds
              </div>
            </div>
            <div>
              <span className="text-slate-400">ICU Capacity:</span>
              <div className="text-emerald-400 font-bold mt-0.5 flex items-center gap-1">
                <HeartPulse className="w-3.5 h-3.5 inline" />
                {recommendedHospital.icuBeds} beds
              </div>
            </div>
          </div>

          {/* AI Recommendation Reason */}
          <div className="p-3 rounded-lg bg-cyan-950/30 border border-cyan-500/20 font-sans text-xs">
            <div className="flex items-center gap-1.5 text-cyan-400 font-bold mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Recommendation Logic</span>
            </div>
            <p className="text-slate-300 leading-snug">"{recommendedHospital.aiRecommendationNote}"</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 font-mono">
        <button
          onClick={() => sendHospitalPatientInfo(recommendedHospital.id)}
          disabled={recommendedHospital.patientInfoSent}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 shadow-lg ${
            recommendedHospital.patientInfoSent
              ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40 cursor-default'
              : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-950/50'
          }`}
        >
          {recommendedHospital.patientInfoSent ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Information Sent
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              Send Patient Information
            </>
          )}
        </button>
      </div>
    </div>
  );
};
