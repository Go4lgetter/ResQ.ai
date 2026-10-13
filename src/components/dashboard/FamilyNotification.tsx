import React from 'react';
import { useEmergency } from '../../context/EmergencyContext';
import { Users, Send, CheckCircle2, MessageSquare, PhoneCall } from 'lucide-react';

export const FamilyNotification: React.FC = () => {
  const { familyContact, sendFamilyNotification } = useEmergency();

  const isSent = familyContact.notificationStatus === 'Sent';

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-2xl flex flex-col justify-between h-full">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider font-mono">
                Family Contact
              </h3>
              <p className="text-[11px] text-slate-400">Automated next-of-kin notification package</p>
            </div>
          </div>

          <span
            className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full font-bold ${
              isSent
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
            }`}
          >
            {isSent ? 'NOTIFICATION SENT' : 'READY TO SEND'}
          </span>
        </div>

        {/* Contact Info */}
        <div className="p-3.5 rounded-xl bg-slate-955 border border-slate-800 mb-3 font-mono text-xs">
          <div className="flex items-center justify-between mb-1">
            <span className="font-bold text-white text-sm">{familyContact.name}</span>
            <span className="text-slate-400">({familyContact.relationship})</span>
          </div>
          <div className="text-cyan-400 text-xs flex items-center gap-1">
            <PhoneCall className="w-3.5 h-3.5 inline" />
            {familyContact.phone}
          </div>
        </div>

        {/* Message Preview Box */}
        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 mb-4">
          <div className="flex items-center gap-1.5 text-slate-400 text-xs font-mono mb-1.5">
            <MessageSquare className="w-3.5 h-3.5 text-indigo-400" />
            <span>AI Drafted SMS Preview:</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed font-sans italic">
            "{familyContact.messagePreview}"
          </p>
        </div>
      </div>

      {/* Send Action Button */}
      <button
        onClick={sendFamilyNotification}
        disabled={isSent}
        className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold font-mono transition flex items-center justify-center gap-2 shadow-lg ${
          isSent
            ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40 cursor-default'
            : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-950/50'
        }`}
      >
        {isSent ? (
          <>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            Notification Sent ({familyContact.lastSentTimestamp || '10:43 AM'})
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            Send Notification
          </>
        )}
      </button>
    </div>
  );
};
