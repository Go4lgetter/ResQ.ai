import React, { useState } from 'react';
import { useEmergency } from '../context/EmergencyContext';
import { Incident } from '../types';
import { Search, Filter, Calendar, ChevronRight, AlertCircle, FileText, CheckCircle2 } from 'lucide-react';

export const IncidentHistoryScreen: React.FC = () => {
  const { incidentsHistory, viewIncidentDetails } = useEmergency();

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [typeFilter, setTypeFilter] = useState<string>('All');
  const [severityFilter, setSeverityFilter] = useState<string>('All');

  const filteredIncidents = incidentsHistory.filter((inc) => {
    const matchesSearch =
      inc.incidentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inc.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inc.caller.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = typeFilter === 'All' || inc.emergencyType === typeFilter;
    const matchesSeverity = severityFilter === 'All' || inc.severity === severityFilter;

    return matchesSearch && matchesType && matchesSeverity;
  });

  return (
    <div className="p-6 space-y-6 max-w-[1700px] mx-auto">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">Incident History</h1>
          <p className="text-xs text-slate-400 mt-1">Archive of all processed emergency calls & AI dispatch logs</p>
        </div>
        <div className="text-xs font-mono text-slate-400">
          Total Incidents Logged: <strong className="text-cyan-400">{incidentsHistory.length}</strong>
        </div>
      </div>

      {/* Filter and Search Toolbar */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl flex flex-wrap items-center justify-between gap-4">
        {/* Search Bar */}
        <div className="relative flex-1 min-w-[260px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by ID, location, or caller..."
            className="w-full bg-slate-955 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs font-mono text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 transition"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
          {/* Emergency Type Filter */}
          <div className="flex items-center gap-2">
            <span className="text-slate-400 text-[11px]">Type:</span>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="bg-slate-955 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
            >
              <option value="All">All Types</option>
              <option value="EMS">EMS</option>
              <option value="FIRE">FIRE</option>
              <option value="POLICE">POLICE</option>
              <option value="HAZMAT">HAZMAT</option>
            </select>
          </div>

          {/* Severity Filter */}
          <div className="flex items-center gap-2">
            <span className="text-slate-400 text-[11px]">Severity:</span>
            <select
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
              className="bg-slate-955 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
            >
              <option value="All">All Severities</option>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Incidents Data Table */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead className="bg-slate-955 border-b border-slate-800 text-slate-400 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3.5 px-4">Incident ID</th>
                <th className="py-3.5 px-4">Time</th>
                <th className="py-3.5 px-4">Emergency Type</th>
                <th className="py-3.5 px-4">Location</th>
                <th className="py-3.5 px-4">Severity</th>
                <th className="py-3.5 px-4">AI Confidence</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-200">
              {filteredIncidents.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-slate-500">
                    No emergency records match the search filter.
                  </td>
                </tr>
              ) : (
                filteredIncidents.map((inc) => {
                  const isCritical = inc.severity === 'Critical';
                  const isHigh = inc.severity === 'High';

                  return (
                    <tr
                      key={inc.incidentId}
                      onClick={() => viewIncidentDetails(inc.incidentId)}
                      className="hover:bg-slate-800/50 cursor-pointer transition"
                    >
                      <td className="py-3.5 px-4 font-bold text-cyan-300">{inc.incidentId}</td>
                      <td className="py-3.5 px-4 text-slate-400">{inc.timestamp}</td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            inc.emergencyType === 'EMS'
                              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                              : inc.emergencyType === 'FIRE'
                              ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30'
                              : inc.emergencyType === 'POLICE'
                              ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                              : 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                          }`}
                        >
                          {inc.emergencyType}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-300 max-w-[200px] truncate">{inc.location}</td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            isCritical
                              ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                              : isHigh
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                              : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          }`}
                        >
                          {inc.severity}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-300">{inc.confidence}%</td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            inc.status === 'CRITICAL'
                              ? 'bg-red-950 text-red-400 border border-red-500/50 animate-pulse'
                              : 'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
                          }`}
                        >
                          {inc.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition">
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
