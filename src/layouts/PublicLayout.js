import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import PublicNavbar from '../components/navigation/PublicNavbar';
import Footer from '../components/common/Footer';

const PublicLayout = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <PublicNavbar />
      
      {/* Emergency Banner REMOVED - Previously contained Crisis Helpline: 1800-599-0019 */}
      
      <main className="flex-grow">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default PublicLayout;