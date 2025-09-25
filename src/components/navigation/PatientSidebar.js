import React from 'react';
import { NavLink } from 'react-router-dom';

const PatientSidebar = ({ isOpen }) => {
  const menuItems = [
    {
      title: 'Dashboard',
      icon: 'fa-home',
      path: '/patient'
    },
    {
      title: 'Appointments',
      icon: 'fa-calendar-alt',
      path: '/patient/appointments',
      subItems: [
        { title: 'My Appointments', path: '/patient/appointments' },
        { title: 'Book New', path: '/patient/appointments/book' },
      ]
    },
    {
      title: 'Medical Records',
      icon: 'fa-file-medical',
      path: '/patient/records',
      subItems: [
        { title: 'My Records', path: '/patient/records' },
        { title: 'Test Results', path: '/patient/records/test-results' },
        { title: 'Prescriptions', path: '/patient/records/prescriptions' },
      ]
    },
    {
      title: 'Self-Tracking',
      icon: 'fa-chart-line',
      path: '/patient/tracking',
      subItems: [
        { title: 'Mood Diary', path: '/patient/tracking/mood' },
        { title: 'Symptom Tracker', path: '/patient/tracking/symptoms' },
        { title: 'Medication Reminders', path: '/patient/tracking/medications' },
      ]
    },
    {
      title: 'Therapy',
      icon: 'fa-brain',
      path: '/patient/therapy',
      subItems: [
        { title: 'Homework', path: '/patient/therapy/homework' },
        { title: 'Resources', path: '/patient/therapy/resources' },
      ]
    },
    {
      title: 'Progress Reports',
      icon: 'fa-chart-bar',
      path: '/patient/reports'
    },
    {
      title: 'Billing',
      icon: 'fa-credit-card',
      path: '/patient/billing',
      subItems: [
        { title: 'History', path: '/patient/billing/history' },
        { title: 'Make Payment', path: '/patient/billing/payment' },
      ]
    },
    {
      title: 'Messages',
      icon: 'fa-envelope',
      path: '/communication/messages'
    },
    {
      title: 'Profile',
      icon: 'fa-user',
      path: '/patient/profile',
      subItems: [
        { title: 'My Profile', path: '/patient/profile' },
        { title: 'Emergency Contacts', path: '/patient/profile/emergency-contacts' },
        { title: 'Settings', path: '/patient/profile/settings' },
      ]
    },
    {
      title: 'Crisis Support',
      icon: 'fa-life-ring',
      path: '/emergency',
      className: 'text-red-600 hover:text-red-700'
    }
  ];

  return (
    <aside className={`fixed left-0 top-16 h-full bg-white shadow-lg transition-all duration-300 z-40 ${
      isOpen ? 'w-64' : 'w-20'
    }`}>
      <nav className="p-4">
        {menuItems.map((item) => (
          <div key={item.path} className="mb-2">
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                item.className || 
                `flex items-center px-3 py-2 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-serene-blue-50 text-serene-blue-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              <i className={`fas ${item.icon} ${isOpen ? 'mr-3' : 'mx-auto'} text-lg`}></i>
              {isOpen && <span className="font-medium">{item.title}</span>}
            </NavLink>
            
            {isOpen && item.subItems && (
              <div className="ml-8 mt-1">
                {item.subItems.map((subItem) => (
                  <NavLink
                    key={subItem.path}
                    to={subItem.path}
                    className={({ isActive }) =>
                      `block px-3 py-1 text-sm rounded transition-colors ${
                        isActive
                          ? 'text-serene-blue-700 bg-serene-blue-50'
                          : 'text-gray-600 hover:text-gray-900'
                      }`
                    }
                  >
                    {subItem.title}
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Quick Actions */}
        {isOpen && (
          <div className="mt-6 pt-6 border-t">
            <h3 className="text-xs font-semibold text-gray-500 uppercase mb-3">Quick Actions</h3>
            <NavLink
              to="/self-help"
              className="flex items-center px-3 py-2 text-sm text-growth-green-600 hover:bg-growth-green-50 rounded-lg"
            >
              <i className="fas fa-hands-helping mr-2"></i>
              Self-Help Tools
            </NavLink>
            <NavLink
              to="/booking/find-provider"
              className="flex items-center px-3 py-2 text-sm text-serene-blue-600 hover:bg-serene-blue-50 rounded-lg"
            >
              <i className="fas fa-user-md mr-2"></i>
              Find Provider
            </NavLink>
          </div>
        )}
      </nav>
    </aside>
  );
};

export default PatientSidebar;
