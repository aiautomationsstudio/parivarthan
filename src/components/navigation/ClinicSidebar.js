import React from 'react';
import { NavLink } from 'react-router-dom';

const ClinicSidebar = ({ isOpen, userRole }) => {
  // Define menu items based on user role
  const getMenuItems = () => {
    const baseItems = [
      {
        title: 'Dashboard',
        icon: 'fa-dashboard',
        path: userRole === 'clinic_admin' ? '/clinic-admin' :
              ['psychiatrist', 'psychologist', 'social_worker'].includes(userRole) ? '/clinical' :
              '/support'
      }
    ];

    // Clinic Admin specific menu
    if (userRole === 'clinic_admin') {
      return [
        ...baseItems,
        {
          title: 'Staff Management',
          icon: 'fa-users',
          path: '/clinic-admin/staff',
          subItems: [
            { title: 'All Staff', path: '/clinic-admin/staff' },
            { title: 'Roles & Permissions', path: '/clinic-admin/staff/roles' },
          ]
        },
        {
          title: 'Departments',
          icon: 'fa-building',
          path: '/clinic-admin/departments'
        },
        {
          title: 'Services',
          icon: 'fa-concierge-bell',
          path: '/clinic-admin/services'
        },
        {
          title: 'Working Hours',
          icon: 'fa-clock',
          path: '/clinic-admin/working-hours'
        },
        {
          title: 'Resources',
          icon: 'fa-boxes',
          path: '/clinic-admin/resources'
        },
        {
          title: 'Reports',
          icon: 'fa-chart-bar',
          path: '/clinic-admin/reports'
        },
        {
          title: 'Quality Metrics',
          icon: 'fa-medal',
          path: '/clinic-admin/quality'
        }
      ];
    }

    // Clinical Staff (Psychiatrist, Psychologist, Social Worker)
    if (['psychiatrist', 'psychologist', 'social_worker'].includes(userRole)) {
      return [
        ...baseItems,
        {
          title: 'Patient Queue',
          icon: 'fa-list',
          path: '/clinical/queue',
          subItems: [
            { title: 'Current Queue', path: '/clinical/queue' },
            { title: 'Triage System', path: '/clinical/queue/triage' },
          ]
        },
        {
          title: 'Patients',
          icon: 'fa-user-injured',
          path: '/clinical/patients',
          subItems: [
            { title: 'All Patients', path: '/clinical/patients' },
            { title: 'Register New', path: '/clinical/patients/register' },
          ]
        },
        {
          title: 'Assessments',
          icon: 'fa-clipboard-check',
          path: '/clinical/assessment',
          subItems: [
            { title: 'Clinical Assessment', path: '/clinical/assessment/clinical' },
            { title: 'Mental Status Exam', path: '/clinical/assessment/mse' },
            { title: 'Psychological Tests', path: '/clinical/assessment/psychological' },
            { title: 'Risk Assessment', path: '/clinical/assessment/risk' },
          ]
        },
        {
          title: 'Treatment',
          icon: 'fa-stethoscope',
          path: '/clinical/treatment',
          subItems: [
            { title: 'Treatment Planning', path: '/clinical/treatment/planning' },
            { title: 'Prescriptions', path: '/clinical/treatment/prescriptions' },
            { title: 'Lab Orders', path: '/clinical/treatment/lab-orders' },
          ]
        },
        {
          title: 'Therapy',
          icon: 'fa-comments',
          path: '/clinical/therapy',
          subItems: [
            { title: 'Sessions', path: '/clinical/therapy/sessions' },
            { title: 'Group Therapy', path: '/clinical/therapy/group' },
            { title: 'Session Notes', path: '/clinical/therapy/notes' },
          ]
        },
        {
          title: 'Calendar',
          icon: 'fa-calendar-alt',
          path: '/clinical/calendar',
          subItems: [
            { title: 'My Schedule', path: '/clinical/calendar' },
            { title: 'Appointments', path: '/clinical/calendar/appointments' },
          ]
        },
        {
          title: 'Reports',
          icon: 'fa-file-medical',
          path: '/clinical/reports',
          subItems: [
            { title: 'Clinical Reports', path: '/clinical/reports' },
            { title: 'Progress Tracking', path: '/clinical/reports/progress' },
          ]
        }
      ];
    }

    // Support Staff (Receptionist, Nursing, Billing)
    if (['receptionist', 'nursing_staff', 'billing_staff'].includes(userRole)) {
      const supportMenus = [...baseItems];

      if (userRole === 'receptionist' || userRole === 'nursing_staff') {
        supportMenus.push(
          {
            title: 'Appointments',
            icon: 'fa-calendar-check',
            path: '/support/appointments'
          },
          {
            title: 'Token Management',
            icon: 'fa-ticket-alt',
            path: '/support/tokens'
          }
        );
      }

      if (userRole === 'nursing_staff') {
        supportMenus.push({
          title: 'Vitals Entry',
          icon: 'fa-heartbeat',
          path: '/support/vitals'
        });
      }

      if (userRole === 'billing_staff') {
        supportMenus.push(
          {
            title: 'Billing',
            icon: 'fa-file-invoice-dollar',
            path: '/support/billing',
            subItems: [
              { title: 'Billing Desk', path: '/support/billing' },
              { title: 'Generate Invoice', path: '/support/billing/invoices' },
              { title: 'Payments', path: '/support/billing/payments' },
              { title: 'Insurance Claims', path: '/support/billing/insurance' },
            ]
          }
        );
      }

      return supportMenus;
    }

    return baseItems;
  };

  const menuItems = getMenuItems();

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

        {/* Communication & Analytics - Common for authorized roles */}
        {['clinic_admin', 'psychiatrist', 'psychologist'].includes(userRole) && (
          <>
            <div className="mb-2 mt-4 pt-4 border-t">
              <NavLink
                to="/analytics"
                className={({ isActive }) =>
                  `flex items-center px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-serene-blue-50 text-serene-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                <i className={`fas fa-chart-line ${isOpen ? 'mr-3' : 'mx-auto'} text-lg`}></i>
                {isOpen && <span className="font-medium">Analytics</span>}
              </NavLink>
            </div>
          </>
        )}

        {/* Messages - Available to all clinic staff */}
        <div className="mb-2">
          <NavLink
            to="/communication/messages"
            className={({ isActive }) =>
              `flex items-center px-3 py-2 rounded-lg transition-colors ${
                isActive
                  ? 'bg-serene-blue-50 text-serene-blue-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`
            }
          >
            <i className={`fas fa-envelope ${isOpen ? 'mr-3' : 'mx-auto'} text-lg`}></i>
            {isOpen && <span className="font-medium">Messages</span>}
          </NavLink>
        </div>
      </nav>
    </aside>
  );
};

export default ClinicSidebar;
