import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import PublicNavbar from '../components/navigation/PublicNavbar';
import Footer from '../components/common/Footer';

const PublicLayout = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <PublicNavbar />
      
      {/* Emergency Banner */}
      <div className="bg-red-600 text-white py-2 px-4">
        <div className="container mx-auto flex items-center justify-center text-sm">
          <i className="fas fa-phone-alt mr-2"></i>
          <span className="font-medium">Crisis Helpline: </span>
          <a href="tel:1800-599-0019" className="ml-2 underline font-bold">
            1800-599-0019
          </a>
          <span className="mx-2">|</span>
          <Link to="/emergency" className="underline">
            Emergency Support
          </Link>
        </div>
      </div>

      <main className="flex-grow">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default PublicLayout;
