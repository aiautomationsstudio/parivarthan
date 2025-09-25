import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import PatientSidebar from '../components/navigation/PatientSidebar';
import DashboardHeader from '../components/common/DashboardHeader';

const PatientLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader 
        onMenuClick={() => setSidebarOpen(!sidebarOpen)} 
        userRole="Patient"
      />
      
      <div className="flex">
        <PatientSidebar isOpen={sidebarOpen} />
        
        <main className={`flex-1 p-6 transition-all duration-300 ${
          sidebarOpen ? 'ml-64' : 'ml-20'
        }`}>
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default PatientLayout;
