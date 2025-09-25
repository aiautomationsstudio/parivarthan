import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../components/navigation/AdminSidebar';
import DashboardHeader from '../components/common/DashboardHeader';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader 
        onMenuClick={() => setSidebarOpen(!sidebarOpen)} 
        userRole="Super Admin"
      />
      
      <div className="flex">
        <AdminSidebar isOpen={sidebarOpen} />
        
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

export default AdminLayout;
