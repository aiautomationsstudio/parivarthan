import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const DashboardHeader = ({ onMenuClick, userRole }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button
              onClick={onMenuClick}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
            >
              <i className="fas fa-bars text-xl"></i>
            </button>
            
            <div className="ml-4 flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-serene-blue-500 to-growth-green-500 rounded-full flex items-center justify-center">
                <i className="fas fa-heart text-white text-sm"></i>
              </div>
              <span className="ml-2 font-bold text-lg text-serene-blue-700">Parivarthan</span>
              <span className="ml-4 text-sm text-gray-500">{userRole} Portal</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <button className="relative p-2 text-gray-400 hover:text-gray-500">
              <i className="fas fa-bell text-xl"></i>
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Messages */}
            <button className="p-2 text-gray-400 hover:text-gray-500">
              <i className="fas fa-envelope text-xl"></i>
            </button>

            {/* User Dropdown */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100"
              >
                <div className="w-8 h-8 bg-serene-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">
                    {user?.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-gray-700">{user?.name}</p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
                <i className="fas fa-chevron-down text-gray-400"></i>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  <Link
                    to={`/${user?.role === 'patient' ? 'patient' : 
                         user?.role === 'super_admin' ? 'admin' :
                         user?.role === 'clinic_admin' ? 'clinic-admin' :
                         'clinical'}/profile`}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <i className="fas fa-user mr-2"></i>Profile
                  </Link>
                  <Link
                    to={`/${user?.role === 'patient' ? 'patient' : 
                         user?.role === 'super_admin' ? 'admin' :
                         user?.role === 'clinic_admin' ? 'clinic-admin' :
                         'clinical'}/settings`}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <i className="fas fa-cog mr-2"></i>Settings
                  </Link>
                  <hr className="my-1" />
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <i className="fas fa-sign-out-alt mr-2"></i>Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
