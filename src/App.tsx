import React from 'react';
import { EmergencyProvider, useEmergency } from './context/EmergencyContext';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { ToastContainer } from './components/modals/ToastContainer';
import { CommandCenterScreen } from './screens/CommandCenterScreen';
import { ActiveIncidentScreen } from './screens/ActiveIncidentScreen';
import { IncidentHistoryScreen } from './screens/IncidentHistoryScreen';
import { ResponseUnitsScreen } from './screens/ResponseUnitsScreen';
import { SettingsScreen } from './screens/SettingsScreen';

const MainContent: React.FC = () => {
  const { activeTab } = useEmergency();

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-950 text-slate-100 font-sans">
      {/* Toast Notification Layer */}
      <ToastContainer />

      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Workspace Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Command Center Top Header */}
        <Header />

        {/* Dynamic Screen Viewport */}
        <main className="flex-1 overflow-y-auto bg-slate-950 bg-grid-pattern">
          {activeTab === 'COMMAND_CENTER' && <CommandCenterScreen />}
          {activeTab === 'ACTIVE_INCIDENT' && <ActiveIncidentScreen />}
          {activeTab === 'INCIDENT_HISTORY' && <IncidentHistoryScreen />}
          {activeTab === 'RESPONSE_UNITS' && <ResponseUnitsScreen />}
          {activeTab === 'SETTINGS' && <SettingsScreen />}
        </main>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <EmergencyProvider>
      <MainContent />
    </EmergencyProvider>
  );
}
