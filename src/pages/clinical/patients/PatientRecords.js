import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PatientRecords = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid'); // grid or list view for tablet optimization
  const [showAlert, setShowAlert] = useState({ show: false, message: '', type: 'info' });
  const [exportFormat, setExportFormat] = useState('pdf');

  // Mock data - replace with actual API call
  useEffect(() => {
    const fetchPatients = async () => {
      setIsLoading(true);
      // Simulating API call delay
      setTimeout(() => {
        setPatients(mockPatientData);
        setIsLoading(false);
      }, 1000);
    };
    fetchPatients();
  }, []);

  // Mock patient data
  const mockPatientData = [
    {
      id: 'PAT001',
      name: 'Rajesh Kumar',
      age: 32,
      gender: 'Male',
      phone: '+91 9876543210',
      email: 'rajesh.kumar@email.com',
      lastVisit: '2025-01-15',
      nextAppointment: '2025-02-01',
      status: 'active',
      diagnosis: 'Anxiety Disorder',
      assignedDoctor: 'Dr. Priya Sharma',
      riskLevel: 'low',
      medications: ['Sertraline 50mg', 'Alprazolam 0.25mg'],
      totalVisits: 12,
      registrationDate: '2024-06-15'
    },
    {
      id: 'PAT002',
      name: 'Anita Patel',
      age: 28,
      gender: 'Female',
      phone: '+91 9876543211',
      email: 'anita.patel@email.com',
      lastVisit: '2025-01-20',
      nextAppointment: '2025-01-28',
      status: 'active',
      diagnosis: 'Depression',
      assignedDoctor: 'Dr. Amit Verma',
      riskLevel: 'medium',
      medications: ['Fluoxetine 20mg', 'Vitamin D'],
      totalVisits: 8,
      registrationDate: '2024-09-10'
    },
    {
      id: 'PAT003',
      name: 'Mohammed Ali',
      age: 45,
      gender: 'Male',
      phone: '+91 9876543212',
      email: 'mohammed.ali@email.com',
      lastVisit: '2025-01-10',
      nextAppointment: '2025-02-10',
      status: 'follow-up',
      diagnosis: 'Bipolar Disorder',
      assignedDoctor: 'Dr. Priya Sharma',
      riskLevel: 'high',
      medications: ['Lithium 300mg', 'Quetiapine 100mg'],
      totalVisits: 24,
      registrationDate: '2023-12-01'
    },
    {
      id: 'PAT004',
      name: 'Sneha Reddy',
      age: 35,
      gender: 'Female',
      phone: '+91 9876543213',
      email: 'sneha.reddy@email.com',
      lastVisit: '2024-12-20',
      nextAppointment: null,
      status: 'inactive',
      diagnosis: 'PTSD',
      assignedDoctor: 'Dr. Rahul Mehta',
      riskLevel: 'low',
      medications: ['Prazosin 2mg'],
      totalVisits: 15,
      registrationDate: '2024-03-20'
    }
  ];

  // Show alert helper
  const showAlertMessage = (message, type = 'info') => {
    setShowAlert({ show: true, message, type });
    setTimeout(() => setShowAlert({ show: false, message: '', type: 'info' }), 3000);
  };

  // Action Handlers
  const handleScheduleAppointment = (patient) => {
    // Navigate to appointment booking with patient pre-selected
    navigate(`/clinical/calendar/appointments?patientId=${patient.id}`, {
      state: { patientName: patient.name, patientId: patient.id }
    });
    showAlertMessage(`Opening appointment scheduler for ${patient.name}`, 'success');
  };

  const handleEditPatient = (patientId) => {
    navigate(`/clinical/patients/${patientId}/edit`);
    showAlertMessage('Opening patient edit form', 'info');
  };

  const handleDeletePatient = (patient) => {
    if (window.confirm(`Are you sure you want to archive ${patient.name}'s record? This action can be reversed.`)) {
      // In production, this would call an API
      setPatients(prev => prev.filter(p => p.id !== patient.id));
      setSelectedPatient(null);
      showAlertMessage(`${patient.name}'s record has been archived`, 'warning');
    }
  };

  const handleSendMessage = (patient) => {
    navigate(`/communication/messages?patientId=${patient.id}`, {
      state: { recipientName: patient.name, recipientEmail: patient.email }
    });
    showAlertMessage(`Opening secure messaging for ${patient.name}`, 'info');
  };

  const handleExportRecord = (patient) => {
    // In production, this would trigger a download
    console.log(`Exporting ${patient.name}'s record as ${exportFormat.toUpperCase()}`);
    showAlertMessage(`Exporting ${patient.name}'s record as ${exportFormat.toUpperCase()}`, 'success');
    
    // Simulate download
    const data = JSON.stringify(patient, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${patient.id}_${patient.name.replace(/\s+/g, '_')}_record.json`;
    link.click();
  };

  const handlePrintRecord = (patient) => {
    showAlertMessage(`Preparing ${patient.name}'s record for printing`, 'info');
    setTimeout(() => window.print(), 1000);
  };

  const handleViewHistory = (patient) => {
    navigate(`/clinical/patients/${patient.id}/history`);
    showAlertMessage('Loading patient history', 'info');
  };

  const handleAddNote = (patient) => {
    // In production, this would open a modal or navigate to notes section
    const note = window.prompt(`Add a quick note for ${patient.name}:`);
    if (note) {
      console.log(`Note added for ${patient.id}: ${note}`);
      showAlertMessage('Note added successfully', 'success');
    }
  };

  const handleRefreshData = () => {
    setIsLoading(true);
    showAlertMessage('Refreshing patient data...', 'info');
    setTimeout(() => {
      setPatients(mockPatientData);
      setIsLoading(false);
      showAlertMessage('Patient data refreshed', 'success');
    }, 1000);
  };

  const handleBulkAction = (action) => {
    const selectedCount = filteredPatients.length;
    switch(action) {
      case 'export':
        showAlertMessage(`Exporting ${selectedCount} patient records`, 'info');
        break;
      case 'email':
        showAlertMessage(`Preparing bulk email for ${selectedCount} patients`, 'info');
        break;
      case 'report':
        showAlertMessage(`Generating report for ${selectedCount} patients`, 'info');
        break;
      default:
        break;
    }
  };

  // Filter and sort patients
  const filteredPatients = patients
    .filter(patient => {
      const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           patient.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === 'all' || patient.status === filterStatus;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch(sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'recent':
          return new Date(b.lastVisit) - new Date(a.lastVisit);
        case 'id':
          return a.id.localeCompare(b.id);
        default:
          return 0;
      }
    });

  // Handle patient selection
  const handlePatientSelect = (patient) => {
    setSelectedPatient(patient);
  };

  // Navigate to detailed patient view
  const handleViewDetails = (patientId) => {
    navigate(`/clinical/patients/${patientId}`);
  };

  // Handle new patient registration
  const handleNewPatient = () => {
    navigate('/clinical/patients/register');
  };

  // Risk level badge component
  const RiskBadge = ({ level }) => {
    const colors = {
      low: 'bg-green-100 text-green-800',
      medium: 'bg-yellow-100 text-yellow-800',
      high: 'bg-red-100 text-red-800'
    };
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${colors[level]}`}>
        {level.charAt(0).toUpperCase() + level.slice(1)} Risk
      </span>
    );
  };

  // Status badge component
  const StatusBadge = ({ status }) => {
    const colors = {
      active: 'bg-blue-100 text-blue-800',
      'follow-up': 'bg-purple-100 text-purple-800',
      inactive: 'bg-gray-100 text-gray-800'
    };
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${colors[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
      </span>
    );
  };

  // Alert Component
  const Alert = ({ show, message, type }) => {
    if (!show) return null;
    
    const colors = {
      success: 'bg-green-100 border-green-400 text-green-700',
      warning: 'bg-yellow-100 border-yellow-400 text-yellow-700',
      error: 'bg-red-100 border-red-400 text-red-700',
      info: 'bg-blue-100 border-blue-400 text-blue-700'
    };
    
    const icons = {
      success: 'fa-check-circle',
      warning: 'fa-exclamation-triangle',
      error: 'fa-times-circle',
      info: 'fa-info-circle'
    };
    
    return (
      <div className={`fixed top-20 right-4 z-50 border-l-4 p-4 rounded-lg shadow-lg ${colors[type]} animate-pulse`}>
        <div className="flex items-center">
          <i className={`fas ${icons[type]} mr-2`}></i>
          <span>{message}</span>
        </div>
      </div>
    );
  };

  // Patient card component for grid view
  const PatientCard = ({ patient }) => (
    <div 
      className="bg-white rounded-lg shadow-md p-4 md:p-6 hover:shadow-lg transition-shadow"
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-serene-blue-100 rounded-full flex items-center justify-center">
            <span className="text-serene-blue-600 font-semibold text-lg">
              {patient.name.charAt(0)}
            </span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{patient.name}</h3>
            <p className="text-sm text-gray-500">{patient.id}</p>
          </div>
        </div>
        <div className="flex gap-1">
          <button 
            onClick={() => handleEditPatient(patient.id)}
            className="text-gray-400 hover:text-gray-600 p-1"
            title="Edit Patient"
          >
            <i className="fas fa-edit"></i>
          </button>
          <button 
            onClick={() => handleViewDetails(patient.id)}
            className="text-serene-blue-600 hover:text-serene-blue-700 p-1"
            title="View Details"
          >
            <i className="fas fa-external-link-alt"></i>
          </button>
        </div>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex items-center text-gray-600">
          <i className="fas fa-user-md w-5"></i>
          <span>{patient.assignedDoctor}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <i className="fas fa-stethoscope w-5"></i>
          <span>{patient.diagnosis}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <i className="fas fa-calendar w-5"></i>
          <span>Last: {new Date(patient.lastVisit).toLocaleDateString()}</span>
        </div>
      </div>

      <div className="flex justify-between items-center mt-4 mb-3">
        <RiskBadge level={patient.riskLevel} />
        <StatusBadge status={patient.status} />
      </div>

      <div className="flex gap-2 pt-3 border-t">
        <button
          onClick={() => handleScheduleAppointment(patient)}
          className="flex-1 px-2 py-1 text-xs bg-serene-blue-600 text-white rounded hover:bg-serene-blue-700 transition-colors"
          title="Schedule Appointment"
        >
          <i className="fas fa-calendar-plus mr-1"></i>
          <span className="hidden sm:inline">Schedule</span>
        </button>
        <button
          onClick={() => handleSendMessage(patient)}
          className="flex-1 px-2 py-1 text-xs border border-serene-blue-600 text-serene-blue-600 rounded hover:bg-serene-blue-50 transition-colors"
          title="Send Message"
        >
          <i className="fas fa-envelope mr-1"></i>
          <span className="hidden sm:inline">Message</span>
        </button>
        <button
          onClick={() => handleAddNote(patient)}
          className="flex-1 px-2 py-1 text-xs border border-gray-400 text-gray-600 rounded hover:bg-gray-50 transition-colors"
          title="Add Note"
        >
          <i className="fas fa-sticky-note mr-1"></i>
          <span className="hidden sm:inline">Note</span>
        </button>
      </div>
    </div>
  );

  // Patient row component for list view
  const PatientRow = ({ patient }) => (
    <tr 
      className="hover:bg-gray-50"
    >
      <td className="px-4 py-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-serene-blue-100 rounded-full flex items-center justify-center">
            <span className="text-serene-blue-600 font-semibold">
              {patient.name.charAt(0)}
            </span>
          </div>
          <div>
            <p className="font-medium text-gray-900">{patient.name}</p>
            <p className="text-sm text-gray-500">{patient.id}</p>
          </div>
        </div>
      </td>
      <td className="px-4 py-3 text-sm text-gray-600">
        <span className="hidden md:inline">{patient.age} yrs, </span>{patient.gender}
      </td>
      <td className="px-4 py-3 text-sm text-gray-600 hidden lg:table-cell">
        {patient.diagnosis}
      </td>
      <td className="px-4 py-3 text-sm text-gray-600">
        {patient.assignedDoctor}
      </td>
      <td className="px-4 py-3 text-sm text-gray-600 hidden md:table-cell">
        {new Date(patient.lastVisit).toLocaleDateString()}
      </td>
      <td className="px-4 py-3">
        <RiskBadge level={patient.riskLevel} />
      </td>
      <td className="px-4 py-3">
        <StatusBadge status={patient.status} />
      </td>
      <td className="px-4 py-3">
        <div className="flex gap-1">
          <button 
            onClick={() => handleViewDetails(patient.id)}
            className="text-serene-blue-600 hover:text-serene-blue-700 p-1"
            title="View Details"
          >
            <i className="fas fa-eye"></i>
          </button>
          <button 
            onClick={() => handleEditPatient(patient.id)}
            className="text-gray-600 hover:text-gray-800 p-1"
            title="Edit"
          >
            <i className="fas fa-edit"></i>
          </button>
          <button 
            onClick={() => handleScheduleAppointment(patient)}
            className="text-green-600 hover:text-green-700 p-1"
            title="Schedule"
          >
            <i className="fas fa-calendar-plus"></i>
          </button>
          <button 
            onClick={() => handleSendMessage(patient)}
            className="text-purple-600 hover:text-purple-700 p-1"
            title="Message"
          >
            <i className="fas fa-envelope"></i>
          </button>
        </div>
      </td>
    </tr>
  );

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      {/* Alert Display */}
      <Alert show={showAlert.show} message={showAlert.message} type={showAlert.type} />
      
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Patient Records</h1>
            <p className="text-gray-600">Manage and view patient medical records</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleRefreshData}
              className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              title="Refresh Data"
            >
              <i className="fas fa-sync-alt"></i>
            </button>
            <button
              onClick={() => handleBulkAction('export')}
              className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              title="Export Records"
            >
              <i className="fas fa-download"></i>
            </button>
            <button
              onClick={() => handleBulkAction('report')}
              className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              title="Generate Report"
            >
              <i className="fas fa-chart-bar"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Patients</p>
              <p className="text-2xl font-bold text-gray-900">{patients.length}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <i className="fas fa-users text-blue-600"></i>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active</p>
              <p className="text-2xl font-bold text-green-600">
                {patients.filter(p => p.status === 'active').length}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <i className="fas fa-user-check text-green-600"></i>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">High Risk</p>
              <p className="text-2xl font-bold text-red-600">
                {patients.filter(p => p.riskLevel === 'high').length}
              </p>
            </div>
            <div className="p-3 bg-red-100 rounded-full">
              <i className="fas fa-exclamation-triangle text-red-600"></i>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Today's Visits</p>
              <p className="text-2xl font-bold text-purple-600">
                {patients.filter(p => {
                  const today = new Date().toDateString();
                  const visitDate = new Date(p.nextAppointment || p.lastVisit).toDateString();
                  return visitDate === today;
                }).length}
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <i className="fas fa-calendar-day text-purple-600"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Actions Bar */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search Bar */}
          <div className="flex-1">
            <div className="relative">
              <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              <input
                type="text"
                placeholder="Search by name, ID, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-serene-blue-500"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            {/* Status Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-serene-blue-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="follow-up">Follow-up</option>
              <option value="inactive">Inactive</option>
            </select>

            {/* Sort By */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-serene-blue-500"
            >
              <option value="name">Sort by Name</option>
              <option value="recent">Recent Visit</option>
              <option value="id">Patient ID</option>
            </select>

            {/* View Toggle - Tablet Optimization */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1 rounded ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}
              >
                <i className="fas fa-th-large"></i>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-1 rounded ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}
              >
                <i className="fas fa-list"></i>
              </button>
            </div>

            {/* Add New Patient */}
            <button
              onClick={handleNewPatient}
              className="px-4 py-2 bg-serene-blue-600 text-white rounded-lg hover:bg-serene-blue-700 transition-colors flex items-center gap-2"
            >
              <i className="fas fa-plus"></i>
              <span className="hidden md:inline">New Patient</span>
            </button>
            
            {/* Import Button */}
            <button
              onClick={() => {
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = '.csv,.xlsx,.json';
                input.onchange = (e) => {
                  const file = e.target.files[0];
                  if (file) {
                    showAlertMessage(`Importing patients from ${file.name}`, 'info');
                    // In production, handle file upload here
                  }
                };
                input.click();
              }}
              className="px-4 py-2 border border-gray-400 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
              title="Import Records"
            >
              <i className="fas fa-file-import"></i>
              <span className="hidden md:inline">Import</span>
            </button>
          </div>
        </div>
      </div>

      {/* Patient Records Display */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-serene-blue-600"></div>
        </div>
      ) : filteredPatients.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <i className="fas fa-search text-4xl text-gray-400 mb-4"></i>
          <p className="text-gray-600">No patients found matching your criteria</p>
        </div>
      ) : viewMode === 'grid' ? (
        /* Grid View - Optimized for tablets */
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredPatients.map(patient => (
            <PatientCard key={patient.id} patient={patient} />
          ))}
        </div>
      ) : (
        /* List View */
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Patient
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Age/Gender
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                    Diagnosis
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Doctor
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                    Last Visit
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Risk
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredPatients.map(patient => (
                  <PatientRow key={patient.id} patient={patient} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Quick View Modal/Sidebar for Selected Patient */}
      {selectedPatient && (
        <div className="fixed inset-y-0 right-0 w-full md:w-96 bg-white shadow-2xl z-50 overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-xl font-bold text-gray-900">Patient Details</h2>
              <div className="flex gap-2">
                <button 
                  onClick={() => handlePrintRecord(selectedPatient)}
                  className="text-gray-400 hover:text-gray-600"
                  title="Print Record"
                >
                  <i className="fas fa-print"></i>
                </button>
                <button 
                  onClick={() => handleExportRecord(selectedPatient)}
                  className="text-gray-400 hover:text-gray-600"
                  title="Export Record"
                >
                  <i className="fas fa-download"></i>
                </button>
                <button 
                  onClick={() => setSelectedPatient(null)}
                  className="text-gray-400 hover:text-gray-600"
                  title="Close"
                >
                  <i className="fas fa-times text-xl"></i>
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {/* Patient Header */}
              <div className="flex items-center space-x-4 pb-4 border-b">
                <div className="w-16 h-16 bg-serene-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-serene-blue-600 font-bold text-2xl">
                    {selectedPatient.name.charAt(0)}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">{selectedPatient.name}</h3>
                  <p className="text-sm text-gray-500">{selectedPatient.id}</p>
                  <div className="flex gap-2 mt-2">
                    <button 
                      onClick={() => handleEditPatient(selectedPatient.id)}
                      className="text-xs text-serene-blue-600 hover:text-serene-blue-700"
                    >
                      <i className="fas fa-edit mr-1"></i>Edit
                    </button>
                    <button 
                      onClick={() => handleDeletePatient(selectedPatient)}
                      className="text-xs text-red-600 hover:text-red-700"
                    >
                      <i className="fas fa-archive mr-1"></i>Archive
                    </button>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-2">
                <button 
                  onClick={() => handleScheduleAppointment(selectedPatient)}
                  className="flex items-center justify-center px-3 py-2 bg-serene-blue-50 text-serene-blue-700 rounded-lg hover:bg-serene-blue-100 transition-colors text-sm"
                >
                  <i className="fas fa-calendar-plus mr-2"></i>
                  Schedule
                </button>
                <button 
                  onClick={() => handleSendMessage(selectedPatient)}
                  className="flex items-center justify-center px-3 py-2 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors text-sm"
                >
                  <i className="fas fa-envelope mr-2"></i>
                  Message
                </button>
                <button 
                  onClick={() => handleAddNote(selectedPatient)}
                  className="flex items-center justify-center px-3 py-2 bg-yellow-50 text-yellow-700 rounded-lg hover:bg-yellow-100 transition-colors text-sm"
                >
                  <i className="fas fa-sticky-note mr-2"></i>
                  Add Note
                </button>
                <button 
                  onClick={() => handleViewHistory(selectedPatient)}
                  className="flex items-center justify-center px-3 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors text-sm"
                >
                  <i className="fas fa-history mr-2"></i>
                  History
                </button>
              </div>

              {/* Contact Information */}
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-700">Contact Information</h4>
                <div className="text-sm space-y-1">
                  <p className="flex items-center text-gray-600">
                    <i className="fas fa-phone w-5"></i> 
                    <a href={`tel:${selectedPatient.phone}`} className="hover:text-serene-blue-600">
                      {selectedPatient.phone}
                    </a>
                  </p>
                  <p className="flex items-center text-gray-600">
                    <i className="fas fa-envelope w-5"></i> 
                    <a href={`mailto:${selectedPatient.email}`} className="hover:text-serene-blue-600">
                      {selectedPatient.email}
                    </a>
                  </p>
                  <p className="flex items-center text-gray-600">
                    <i className="fas fa-birthday-cake w-5"></i> {selectedPatient.age} years, {selectedPatient.gender}
                  </p>
                </div>
              </div>

              {/* Medical Information */}
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-700">Medical Information</h4>
                <div className="text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Primary Diagnosis:</span>
                    <span className="font-medium">{selectedPatient.diagnosis}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Assigned Doctor:</span>
                    <span className="font-medium">{selectedPatient.assignedDoctor}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Risk Level:</span>
                    <RiskBadge level={selectedPatient.riskLevel} />
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <StatusBadge status={selectedPatient.status} />
                  </div>
                </div>
              </div>

              {/* Medications */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold text-gray-700">Current Medications</h4>
                  <button 
                    onClick={() => navigate(`/clinical/treatment/prescriptions?patientId=${selectedPatient.id}`)}
                    className="text-xs text-serene-blue-600 hover:text-serene-blue-700"
                  >
                    <i className="fas fa-pills mr-1"></i>Manage
                  </button>
                </div>
                <div className="space-y-1">
                  {selectedPatient.medications.map((med, index) => (
                    <div key={index} className="flex items-center text-sm text-gray-600">
                      <i className="fas fa-pills w-5"></i>
                      <span>{med}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Visit Information */}
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-700">Visit Information</h4>
                <div className="text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Registration Date:</span>
                    <span className="font-medium">
                      {new Date(selectedPatient.registrationDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Visits:</span>
                    <span className="font-medium">{selectedPatient.totalVisits}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Last Visit:</span>
                    <span className="font-medium">
                      {new Date(selectedPatient.lastVisit).toLocaleDateString()}
                    </span>
                  </div>
                  {selectedPatient.nextAppointment && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Next Appointment:</span>
                      <span className="font-medium">
                        {new Date(selectedPatient.nextAppointment).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Export Options */}
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-700">Export Options</h4>
                <div className="flex gap-2">
                  <select 
                    value={exportFormat}
                    onChange={(e) => setExportFormat(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-serene-blue-500 text-sm"
                  >
                    <option value="pdf">PDF Format</option>
                    <option value="excel">Excel Format</option>
                    <option value="json">JSON Format</option>
                    <option value="csv">CSV Format</option>
                  </select>
                  <button 
                    onClick={() => handleExportRecord(selectedPatient)}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm"
                  >
                    Export
                  </button>
                </div>
              </div>

              {/* Main Action Buttons */}
              <div className="pt-4 space-y-2 border-t">
                <button 
                  onClick={() => handleViewDetails(selectedPatient.id)}
                  className="w-full px-4 py-2 bg-serene-blue-600 text-white rounded-lg hover:bg-serene-blue-700 transition-colors flex items-center justify-center"
                >
                  <i className="fas fa-folder-open mr-2"></i>
                  View Full Record
                </button>
                <button 
                  onClick={() => handleScheduleAppointment(selectedPatient)}
                  className="w-full px-4 py-2 border border-serene-blue-600 text-serene-blue-600 rounded-lg hover:bg-serene-blue-50 transition-colors flex items-center justify-center"
                >
                  <i className="fas fa-calendar-check mr-2"></i>
                  Schedule Appointment
                </button>
                <button 
                  onClick={() => navigate(`/clinical/therapy/sessions?patientId=${selectedPatient.id}`)}
                  className="w-full px-4 py-2 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors flex items-center justify-center"
                >
                  <i className="fas fa-brain mr-2"></i>
                  Start Therapy Session
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientRecords;