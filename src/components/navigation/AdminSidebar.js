import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminSidebar = ({ isOpen }) => {
  const menuItems = [
    {
      title: 'Dashboard',
      icon: 'fa-dashboard',
      path: '/admin'
    },
    {
      title: 'Clinic Management',
      icon: 'fa-hospital',
      path: '/admin/clinics',
      subItems: [
        { title: 'All Clinics', path: '/admin/clinics' },
        { title: 'Add New Clinic', path: '/admin/clinics/new' },
      ]
    },
    {
      title: 'System Configuration',
      icon: 'fa-cogs',
      path: '/admin/system'
    },
    {
      title: 'Global Reports',
      icon: 'fa-chart-bar',
      path: '/admin/reports'
    },
    {
      title: 'License Management',
      icon: 'fa-key',
      path: '/admin/licenses'
    },
    {
      title: 'Platform Analytics',
      icon: 'fa-chart-line',
      path: '/admin/analytics'
    },
    {
      title: 'API Configuration',
      icon: 'fa-plug',
      path: '/admin/api-config'
    },
    {
      title: 'Compliance',
      icon: 'fa-shield-alt',
      path: '/admin/compliance'
    },
    {
      title: 'Audit Logs',
      icon: 'fa-file-alt',
      path: '/admin/audit-logs'
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
      </nav>
    </aside>
  );
};

export default AdminSidebar;
