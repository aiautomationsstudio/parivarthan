import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import ClinicSidebar from '../components/navigation/ClinicSidebar';
import DashboardHeader from '../components/common/DashboardHeader';
import { useAuth } from '../contexts/AuthContext';

const ClinicLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user } = useAuth();

  const getUserRoleDisplay = () => {
    const roleDisplayMap = {
      clinic_admin: 'Clinic Admin',
      psychiatrist: 'Psychiatrist',
      psychologist: 'Psychologist',
      social_worker: 'Social Worker',
      receptionist: 'Receptionist',
      nursing_staff: 'Nursing Staff',
      billing_staff: 'Billing Staff'
    };
    return roleDisplayMap[user?.role] || 'Staff';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader 
        onMenuClick={() => setSidebarOpen(!sidebarOpen)} 
        userRole={getUserRoleDisplay()}
      />
      
      <div className="flex">
        <ClinicSidebar isOpen={sidebarOpen} userRole={user?.role} />
        
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

export default ClinicLayout;
