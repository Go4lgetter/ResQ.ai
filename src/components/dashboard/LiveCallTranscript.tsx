import React from 'react';
import { useEmergency } from '../../context/EmergencyContext';
import { Phone, Bot, User, Mic, Volume2, Sparkles } from 'lucide-react';

export const LiveCallTranscript: React.FC = () => {
  const { transcript, isSimulating } = useEmergency();

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-2xl flex flex-col justify-between h-[480px]">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400">
              <Phone className="w-4 h-4 animate-pulse" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider font-mono">Live Call Transcript</h3>
              <p className="text-[11px] text-slate-400">Audio Ingest Stream • Neural Speech-to-Text</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Waveform visualizer simulation */}
            <div className="hidden sm:flex items-center gap-0.5 h-4">
              <span className="w-0.5 h-3 bg-red-500 animate-pulse" />
              <span className="w-0.5 h-4 bg-red-400 animate-bounce" />
              <span className="w-0.5 h-2 bg-red-500 animate-pulse" />
              <span className="w-0.5 h-4 bg-red-400 animate-bounce" />
              <span className="w-0.5 h-1.5 bg-red-500 animate-pulse" />
            </div>

            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-extrabold bg-red-950 text-red-400 border border-red-500/50 shadow-lg animate-pulse">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              LIVE TRANSCRIPT
            </span>
          </div>
        </div>

        {/* Scrollable Transcript Messages */}
        <div className="space-y-3 max-h-[340px] overflow-y-auto pr-2">
          {transcript.map((msg) => {
            const isAI = msg.sender === 'AI DISPATCHER';

            return (
              <div
                key={msg.id}
                className={`flex gap-3 text-xs ${isAI ? 'justify-start' : 'justify-start'}`}
              >
                {/* Avatar Icon */}
                <div className="shrink-0 mt-0.5">
                  {isAI ? (
                    <div className="w-7 h-7 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 flex items-center justify-center shadow-md">
                      <Bot className="w-4 h-4" />
                    </div>
                  ) : (
                    <div className="w-7 h-7 rounded-xl bg-red-500/20 border border-red-500/40 text-red-300 flex items-center justify-center shadow-md">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>

                {/* Bubble Container */}
                <div
                  className={`flex-1 p-3 rounded-2xl border transition-all ${
                    isAI
                      ? 'bg-slate-955 border-slate-800 text-slate-200'
                      : 'bg-red-950/20 border-red-500/30 text-slate-100 shadow-sm'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1 font-mono text-[10px]">
                    <span className={`font-bold ${isAI ? 'text-cyan-400' : 'text-red-400'}`}>
                      {msg.sender}
                    </span>
                    <span className="text-slate-400">{msg.timestamp}</span>
                  </div>
                  <p className="text-xs leading-relaxed font-sans font-normal">{msg.text}</p>

                  {msg.isKeyInfo && (
                    <div className="mt-2 pt-1.5 border-t border-red-500/20 flex items-center gap-1 text-[10px] font-mono text-cyan-400">
                      <Sparkles className="w-3 h-3" />
                      <span>AI Extracted Key Evidence</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Audio Stream Footer */}
      <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
        <div className="flex items-center gap-2 text-slate-300">
          <Mic className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span>Codec: Opus 24kHz • Loss: 0%</span>
        </div>
        <div className="flex items-center gap-1 text-slate-400 hover:text-slate-200 cursor-pointer">
          <Volume2 className="w-3.5 h-3.5 text-slate-400" />
          <span>Audio Playback</span>
        </div>
      </div>
    </div>
  );
};
