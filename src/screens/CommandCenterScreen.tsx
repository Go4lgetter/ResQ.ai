import React from 'react';
import { KPICards } from '../components/dashboard/KPICards';
import { LiveResponseMap } from '../components/dashboard/LiveResponseMap';
import { ActiveIncidentSummary } from '../components/dashboard/ActiveIncidentSummary';
import { AIAgentActivity } from '../components/dashboard/AIAgentActivity';
import { LiveCallTranscript } from '../components/dashboard/LiveCallTranscript';
import { ExtractedInformation } from '../components/dashboard/ExtractedInformation';
import { ResponseCoordination } from '../components/dashboard/ResponseCoordination';
import { HospitalRecommendation } from '../components/dashboard/HospitalRecommendation';
import { FamilyNotification } from '../components/dashboard/FamilyNotification';
import { EmergencyActionBar } from '../components/dashboard/EmergencyActionBar';
import { AIAgentWorkflowDiagram } from '../components/workflow/AIAgentWorkflowDiagram';

export const CommandCenterScreen: React.FC = () => {
  return (
    <div className="p-6 space-y-6 max-w-[1700px] mx-auto">
      {/* Autonomous AI Agent Workflow Bar */}
      <AIAgentWorkflowDiagram />

      {/* Top Metric Cards */}
      <KPICards />

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (8 cols on lg): Live Map & Transcript */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-6 flex flex-col">
          {/* Live Response City Vector Map */}
          <LiveResponseMap />

          {/* Live Call Transcript + Extracted Info split */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <LiveCallTranscript />
            <ExtractedInformation />
          </div>

          {/* Bottom Action Bar */}
          <EmergencyActionBar />
        </div>

        {/* Right Column (5 cols on lg / 4 cols on xl): AI Agent & Incident Analysis */}
        <div className="lg:col-span-5 xl:col-span-4 space-y-6 flex flex-col">
          {/* Active Incident Summary */}
          <ActiveIncidentSummary />

          {/* AI Agent Activity Timeline */}
          <AIAgentActivity />

          {/* Response Units Coordination */}
          <ResponseCoordination />

          {/* Recommended Hospital */}
          <HospitalRecommendation />

          {/* Family Contact Alert */}
          <FamilyNotification />
        </div>
      </div>
    </div>
  );
};
