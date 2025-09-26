import React, { useState, useEffect, useMemo } from 'react';
import { useMediaQuery } from 'react-responsive';
import { 
  Users, 
  Clock, 
  AlertCircle, 
  CheckCircle, 
  UserPlus, 
  Search,
  Filter,
  ChevronRight,
  Calendar,
  Activity,
  Phone,
  Mail,
  MoreVertical,
  ArrowUp,
  ArrowDown,
  X,
  Edit2,
  Trash2,
  FileText,
  Video,
  MessageCircle,
  Printer,
  Download,
  RefreshCw,
  Bell,
  User,
  MapPin,
  CreditCard,
  Shield
} from 'lucide-react';

/**
 * PatientQueue Component
 * A comprehensive patient queue management system for healthcare facilities
 * Designed to be tablet-friendly with responsive design patterns
 * References: GitHub best practices for queue management and responsive design
 */

const PatientQueue = () => {
  // Responsive breakpoints
  const isDesktop = useMediaQuery({ minWidth: 1024 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
  const isMobile = useMediaQuery({ maxWidth: 767 });

  // State management
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('queueNumber');
  const [sortOrder, setSortOrder] = useState('asc');
  const [loading, setLoading] = useState(true);
  
  // Modal states
  const [showAddPatientModal, setShowAddPatientModal] = useState(false);
  const [showStatusUpdateModal, setShowStatusUpdateModal] = useState(false);
  const [showActionMenu, setShowActionMenu] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [showMedicalHistory, setShowMedicalHistory] = useState(false);
  
  // Form states
  const [newPatientData, setNewPatientData] = useState({
    name: '',
    age: '',
    gender: 'Male',
    phone: '',
    email: '',
    appointmentTime: '',
    doctor: '',
    department: 'Psychiatry',
    priority: 'normal',
    visitReason: ''
  });
  
  const [selectedStatus, setSelectedStatus] = useState('');
  const [notification, setNotification] = useState({ type: '', message: '' });

  // Mock data for demonstration
  const mockPatients = [
    {
      id: 1,
      queueNumber: 'Q001',
      name: 'John Doe',
      age: 35,
      gender: 'Male',
      phone: '+91 9876543210',
      email: 'john.doe@email.com',
      appointmentTime: '09:00 AM',
      doctor: 'Dr. Sarah Wilson',
      department: 'Psychiatry',
      status: 'waiting',
      priority: 'normal',
      waitingTime: 15,
      visitReason: 'Follow-up consultation',
      registrationTime: '08:45 AM',
      estimatedTime: '09:15 AM',
      vitals: {
        bp: '120/80',
        pulse: '72',
        temp: '98.6°F'
      }
    },
    {
      id: 2,
      queueNumber: 'Q002',
      name: 'Sarah Johnson',
      age: 28,
      gender: 'Female',
      phone: '+91 9876543211',
      email: 'sarah.j@email.com',
      appointmentTime: '09:30 AM',
      doctor: 'Dr. Michael Chen',
      department: 'Psychology',
      status: 'in-consultation',
      priority: 'high',
      waitingTime: 5,
      visitReason: 'Initial assessment',
      registrationTime: '09:25 AM',
      estimatedTime: '09:35 AM',
      vitals: {
        bp: '118/75',
        pulse: '68',
        temp: '98.4°F'
      }
    },
    {
      id: 3,
      queueNumber: 'Q003',
      name: 'Robert Smith',
      age: 45,
      gender: 'Male',
      phone: '+91 9876543212',
      email: 'robert.smith@email.com',
      appointmentTime: '10:00 AM',
      doctor: 'Dr. Sarah Wilson',
      department: 'Psychiatry',
      status: 'waiting',
      priority: 'urgent',
      waitingTime: 30,
      visitReason: 'Medication review',
      registrationTime: '09:30 AM',
      estimatedTime: '10:00 AM',
      vitals: {
        bp: '130/85',
        pulse: '78',
        temp: '99.1°F'
      }
    },
    {
      id: 4,
      queueNumber: 'Q004',
      name: 'Emily Davis',
      age: 22,
      gender: 'Female',
      phone: '+91 9876543213',
      email: 'emily.d@email.com',
      appointmentTime: '10:30 AM',
      doctor: 'Dr. Michael Chen',
      department: 'Psychology',
      status: 'completed',
      priority: 'normal',
      waitingTime: 0,
      visitReason: 'Therapy session',
      registrationTime: '10:15 AM',
      estimatedTime: '10:30 AM',
      vitals: {
        bp: '115/72',
        pulse: '70',
        temp: '98.6°F'
      }
    },
    {
      id: 5,
      queueNumber: 'Q005',
      name: 'Michael Brown',
      age: 38,
      gender: 'Male',
      phone: '+91 9876543214',
      email: 'michael.b@email.com',
      appointmentTime: '11:00 AM',
      doctor: 'Dr. Sarah Wilson',
      department: 'Psychiatry',
      status: 'waiting',
      priority: 'normal',
      waitingTime: 20,
      visitReason: 'Routine check-up',
      registrationTime: '10:40 AM',
      estimatedTime: '11:00 AM',
      vitals: {
        bp: '122/78',
        pulse: '74',
        temp: '98.5°F'
      }
    }
  ];

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        setPatients(mockPatients);
        setLoading(false);
      }, 1000);
    };
    loadData();
  }, []);

  // Filter and sort patients
  const filteredAndSortedPatients = useMemo(() => {
    let filtered = [...patients];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(patient =>
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.queueNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.phone.includes(searchTerm)
      );
    }

    // Apply status filter
    if (filterStatus !== 'all') {
      filtered = filtered.filter(patient => patient.status === filterStatus);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];

      if (sortBy === 'waitingTime') {
        aValue = parseInt(aValue);
        bValue = parseInt(bValue);
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [patients, searchTerm, filterStatus, sortBy, sortOrder]);

  // Status color mapping
  const getStatusColor = (status) => {
    switch (status) {
      case 'waiting':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'in-consultation':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  // Priority color mapping
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 text-red-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'normal':
        return 'bg-gray-100 text-gray-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  // Handler Functions
  
  // Handle patient selection
  const handlePatientSelect = (patient) => {
    setSelectedPatient(patient);
    setShowActionMenu(null);
  };

  // Handle status update
  const handleStatusUpdate = (patientId, newStatus) => {
    setPatients(prev => prev.map(p => 
      p.id === patientId ? { ...p, status: newStatus } : p
    ));
    if (selectedPatient?.id === patientId) {
      setSelectedPatient(prev => ({ ...prev, status: newStatus }));
    }
    setShowStatusUpdateModal(false);
    showNotificationMessage('success', `Patient status updated to ${newStatus}`);
  };

  // Handle sorting
  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };
  
  // Add new patient
  const handleAddPatient = () => {
    const newPatient = {
      id: patients.length + 1,
      queueNumber: `Q${String(patients.length + 1).padStart(3, '0')}`,
      ...newPatientData,
      status: 'waiting',
      waitingTime: 0,
      registrationTime: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      estimatedTime: newPatientData.appointmentTime,
      vitals: {
        bp: 'Pending',
        pulse: 'Pending',
        temp: 'Pending'
      }
    };
    
    setPatients([...patients, newPatient]);
    setShowAddPatientModal(false);
    resetNewPatientForm();
    showNotificationMessage('success', 'Patient added to queue successfully');
  };
  
  // Delete patient
  const handleDeletePatient = (patientId) => {
    setPatients(prev => prev.filter(p => p.id !== patientId));
    if (selectedPatient?.id === patientId) {
      setSelectedPatient(null);
    }
    setShowDeleteConfirm(false);
    setShowActionMenu(null);
    showNotificationMessage('info', 'Patient removed from queue');
  };
  
  // Start consultation
  const handleStartConsultation = (patient) => {
    handleStatusUpdate(patient.id, 'in-consultation');
    // Simulate opening consultation interface
    showNotificationMessage('success', `Consultation started for ${patient.name}`);
  };
  
  // Complete consultation
  const handleCompleteConsultation = (patient) => {
    handleStatusUpdate(patient.id, 'completed');
    showNotificationMessage('success', `Consultation completed for ${patient.name}`);
  };
  
  // Call patient
  const handleCallPatient = (patient) => {
    showNotificationMessage('info', `Calling ${patient.name} - ${patient.phone}`);
    // Integrate with actual calling system
  };
  
  // Send message
  const handleSendMessage = (patient) => {
    showNotificationMessage('info', `Message interface opened for ${patient.name}`);
    // Open message dialog
  };
  
  // Print queue ticket
  const handlePrintTicket = (patient) => {
    window.print();
    showNotificationMessage('info', `Printing ticket for ${patient.name}`);
  };
  
  // Export queue data
  const handleExportData = () => {
    const dataStr = JSON.stringify(filteredAndSortedPatients, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `queue-data-${new Date().toISOString()}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    showNotificationMessage('success', 'Queue data exported successfully');
  };
  
  // Refresh queue
  const handleRefreshQueue = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      showNotificationMessage('info', 'Queue refreshed');
    }, 1000);
  };
  
  // Reset form
  const resetNewPatientForm = () => {
    setNewPatientData({
      name: '',
      age: '',
      gender: 'Male',
      phone: '',
      email: '',
      appointmentTime: '',
      doctor: '',
      department: 'Psychiatry',
      priority: 'normal',
      visitReason: ''
    });
  };
  
  // Show notification
  const showNotificationMessage = (type, message) => {
    setNotification({ type, message });
    setShowNotificationModal(true);
    setTimeout(() => {
      setShowNotificationModal(false);
    }, 3000);
  };

  // Queue statistics
  const queueStats = useMemo(() => {
    const waiting = patients.filter(p => p.status === 'waiting').length;
    const inConsultation = patients.filter(p => p.status === 'in-consultation').length;
    const completed = patients.filter(p => p.status === 'completed').length;
    const avgWaitTime = patients.reduce((acc, p) => acc + p.waitingTime, 0) / (patients.length || 1);

    return {
      total: patients.length,
      waiting,
      inConsultation,
      completed,
      avgWaitTime: Math.round(avgWaitTime)
    };
  }, [patients]);

  // Modal Components
  
  // Add Patient Modal
  const AddPatientModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Add New Patient to Queue</h2>
          <button 
            onClick={() => setShowAddPatientModal(false)}
            className="p-2 hover:bg-gray-100 rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={newPatientData.name}
              onChange={(e) => setNewPatientData({...newPatientData, name: e.target.value})}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Age *</label>
            <input
              type="number"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={newPatientData.age}
              onChange={(e) => setNewPatientData({...newPatientData, age: e.target.value})}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={newPatientData.gender}
              onChange={(e) => setNewPatientData({...newPatientData, gender: e.target.value})}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
            <input
              type="tel"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={newPatientData.phone}
              onChange={(e) => setNewPatientData({...newPatientData, phone: e.target.value})}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={newPatientData.email}
              onChange={(e) => setNewPatientData({...newPatientData, email: e.target.value})}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Appointment Time</label>
            <input
              type="time"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={newPatientData.appointmentTime}
              onChange={(e) => setNewPatientData({...newPatientData, appointmentTime: e.target.value})}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Doctor *</label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={newPatientData.doctor}
              onChange={(e) => setNewPatientData({...newPatientData, doctor: e.target.value})}
              required
            >
              <option value="">Select Doctor</option>
              <option value="Dr. Sarah Wilson">Dr. Sarah Wilson</option>
              <option value="Dr. Michael Chen">Dr. Michael Chen</option>
              <option value="Dr. Emily Johnson">Dr. Emily Johnson</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={newPatientData.department}
              onChange={(e) => setNewPatientData({...newPatientData, department: e.target.value})}
            >
              <option value="Psychiatry">Psychiatry</option>
              <option value="Psychology">Psychology</option>
              <option value="Counseling">Counseling</option>
              <option value="General">General</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={newPatientData.priority}
              onChange={(e) => setNewPatientData({...newPatientData, priority: e.target.value})}
            >
              <option value="normal">Normal</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Visit Reason</label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
              value={newPatientData.visitReason}
              onChange={(e) => setNewPatientData({...newPatientData, visitReason: e.target.value})}
            />
          </div>
        </div>
        
        <div className="flex justify-end space-x-3 mt-6">
          <button 
            onClick={() => setShowAddPatientModal(false)}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button 
            onClick={handleAddPatient}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            disabled={!newPatientData.name || !newPatientData.age || !newPatientData.phone || !newPatientData.doctor}
          >
            Add Patient
          </button>
        </div>
      </div>
    </div>
  );
  
  // Status Update Modal
  const StatusUpdateModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Update Patient Status</h2>
          <button 
            onClick={() => setShowStatusUpdateModal(false)}
            className="p-2 hover:bg-gray-100 rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {selectedPatient && (
          <div>
            <p className="text-gray-600 mb-4">
              Update status for <strong>{selectedPatient.name}</strong>
            </p>
            
            <div className="space-y-2">
              <button 
                onClick={() => handleStatusUpdate(selectedPatient.id, 'waiting')}
                className={`w-full px-4 py-3 rounded-lg border-2 transition-colors ${
                  selectedPatient.status === 'waiting' 
                    ? 'bg-yellow-50 border-yellow-400' 
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">Waiting</span>
                  <Clock className="w-5 h-5 text-yellow-600" />
                </div>
              </button>
              
              <button 
                onClick={() => handleStatusUpdate(selectedPatient.id, 'in-consultation')}
                className={`w-full px-4 py-3 rounded-lg border-2 transition-colors ${
                  selectedPatient.status === 'in-consultation' 
                    ? 'bg-blue-50 border-blue-400' 
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">In Consultation</span>
                  <Activity className="w-5 h-5 text-blue-600" />
                </div>
              </button>
              
              <button 
                onClick={() => handleStatusUpdate(selectedPatient.id, 'completed')}
                className={`w-full px-4 py-3 rounded-lg border-2 transition-colors ${
                  selectedPatient.status === 'completed' 
                    ? 'bg-green-50 border-green-400' 
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">Completed</span>
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
  
  // Delete Confirmation Modal
  const DeleteConfirmModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <div className="flex items-center mb-4">
          <AlertCircle className="w-8 h-8 text-red-500 mr-3" />
          <h2 className="text-xl font-bold">Confirm Delete</h2>
        </div>
        
        <p className="text-gray-600 mb-6">
          Are you sure you want to remove <strong>{selectedPatient?.name}</strong> from the queue?
          This action cannot be undone.
        </p>
        
        <div className="flex justify-end space-x-3">
          <button 
            onClick={() => setShowDeleteConfirm(false)}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button 
            onClick={() => handleDeletePatient(selectedPatient?.id)}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
  
  // Medical History Modal
  const MedicalHistoryModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Medical History - {selectedPatient?.name}</h2>
          <button 
            onClick={() => setShowMedicalHistory(false)}
            className="p-2 hover:bg-gray-100 rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Previous Visits</h3>
            <div className="space-y-2">
              <div className="bg-white p-3 rounded border border-gray-200">
                <div className="flex justify-between">
                  <span className="font-medium">January 15, 2025</span>
                  <span className="text-sm text-gray-500">Dr. Sarah Wilson</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">Follow-up consultation - Depression management</p>
              </div>
              <div className="bg-white p-3 rounded border border-gray-200">
                <div className="flex justify-between">
                  <span className="font-medium">December 20, 2024</span>
                  <span className="text-sm text-gray-500">Dr. Michael Chen</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">Initial assessment - Anxiety disorder</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Current Medications</h3>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span>Sertraline 50mg</span>
                <span className="text-sm text-gray-500">Once daily</span>
              </li>
              <li className="flex justify-between">
                <span>Alprazolam 0.25mg</span>
                <span className="text-sm text-gray-500">As needed</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Allergies</h3>
            <p className="text-gray-600">No known drug allergies</p>
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button 
            onClick={() => setShowMedicalHistory(false)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
  
  // Notification Toast
  const NotificationToast = () => {
    // Add CSS for animation
    const animationStyle = `
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .animate-fade-in {
        animation: fadeIn 0.3s ease-in-out;
      }
    `;
    
    return showNotificationModal ? (
      <>
        <style>{animationStyle}</style>
        <div className="fixed top-4 right-4 z-50 animate-fade-in">
          <div className={`px-4 py-3 rounded-lg shadow-lg flex items-center space-x-3 ${
            notification.type === 'success' ? 'bg-green-500 text-white' :
            notification.type === 'error' ? 'bg-red-500 text-white' :
            'bg-blue-500 text-white'
          }`}>
            {notification.type === 'success' && <CheckCircle className="w-5 h-5" />}
            {notification.type === 'error' && <AlertCircle className="w-5 h-5" />}
            {notification.type === 'info' && <Bell className="w-5 h-5" />}
            <span>{notification.message}</span>
          </div>
        </div>
      </>
    ) : null;
  };

  // Mobile Card Component
  const MobilePatientCard = ({ patient }) => (
    <div 
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-3"
    >
      <div 
        className="cursor-pointer"
        onClick={() => handlePatientSelect(patient)}
      >
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-semibold text-gray-700">{patient.queueNumber}</span>
            <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(patient.priority)}`}>
              {patient.priority}
            </span>
          </div>
          <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(patient.status)}`}>
            {patient.status.replace('-', ' ')}
          </span>
        </div>
        
        <h3 className="font-medium text-gray-900 mb-1">{patient.name}</h3>
        <div className="text-sm text-gray-600 space-y-1">
          <div className="flex items-center space-x-2">
            <Clock className="w-3 h-3" />
            <span>{patient.appointmentTime}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="w-3 h-3" />
            <span>{patient.doctor}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Activity className="w-3 h-3" />
            <span>Wait: {patient.waitingTime} min</span>
          </div>
        </div>
      </div>
      
      {/* Action Buttons for Mobile */}
      <div className="flex gap-2 mt-3 pt-3 border-t border-gray-100">
        <button 
          onClick={(e) => {
            e.stopPropagation();
            handleStartConsultation(patient);
          }}
          className="flex-1 px-3 py-1.5 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors disabled:bg-gray-400"
          disabled={patient.status === 'in-consultation' || patient.status === 'completed'}
        >
          Start
        </button>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            setSelectedPatient(patient);
            setShowStatusUpdateModal(true);
          }}
          className="flex-1 px-3 py-1.5 border border-gray-300 text-gray-700 text-sm rounded hover:bg-gray-50 transition-colors"
        >
          Status
        </button>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            handleCallPatient(patient);
          }}
          className="px-3 py-1.5 border border-gray-300 text-gray-700 text-sm rounded hover:bg-gray-50 transition-colors"
        >
          <Phone className="w-4 h-4" />
        </button>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            setShowActionMenu(showActionMenu === patient.id ? null : patient.id);
            setSelectedPatient(patient);
          }}
          className="px-3 py-1.5 border border-gray-300 text-gray-700 text-sm rounded hover:bg-gray-50 transition-colors"
        >
          <MoreVertical className="w-4 h-4" />
        </button>
      </div>
      
      {/* Mobile Action Menu */}
      {showActionMenu === patient.id && (
        <div className="mt-2 bg-gray-50 rounded-lg p-2">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setShowMedicalHistory(true);
              setShowActionMenu(null);
            }}
            className="w-full px-3 py-2 text-left text-sm hover:bg-white rounded flex items-center"
          >
            <FileText className="w-4 h-4 mr-2" />
            Medical History
          </button>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              handleSendMessage(patient);
              setShowActionMenu(null);
            }}
            className="w-full px-3 py-2 text-left text-sm hover:bg-white rounded flex items-center"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Send Message
          </button>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              handlePrintTicket(patient);
              setShowActionMenu(null);
            }}
            className="w-full px-3 py-2 text-left text-sm hover:bg-white rounded flex items-center"
          >
            <Printer className="w-4 h-4 mr-2" />
            Print Ticket
          </button>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setShowDeleteConfirm(true);
              setShowActionMenu(null);
            }}
            className="w-full px-3 py-2 text-left text-sm hover:bg-red-50 text-red-600 rounded flex items-center"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Remove from Queue
          </button>
        </div>
      )}
    </div>
  );

  // Desktop/Tablet Table Row Component
  const TableRow = ({ patient }) => (
    <tr 
      className="hover:bg-gray-50 cursor-pointer transition-colors"
      onClick={() => handlePatientSelect(patient)}
    >
      <td className="px-4 py-3 whitespace-nowrap">
        <div className="flex items-center space-x-2">
          <span className="font-medium text-gray-900">{patient.queueNumber}</span>
          <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(patient.priority)}`}>
            {patient.priority}
          </span>
        </div>
      </td>
      <td className="px-4 py-3">
        <div>
          <p className="font-medium text-gray-900">{patient.name}</p>
          <p className="text-sm text-gray-500">{patient.age} yrs, {patient.gender}</p>
        </div>
      </td>
      {isDesktop && (
        <td className="px-4 py-3">
          <div className="text-sm">
            <p className="text-gray-900">{patient.phone}</p>
            <p className="text-gray-500">{patient.email}</p>
          </div>
        </td>
      )}
      <td className="px-4 py-3 whitespace-nowrap">
        <div className="text-sm">
          <p className="font-medium text-gray-900">{patient.appointmentTime}</p>
          <p className="text-gray-500">Wait: {patient.waitingTime} min</p>
        </div>
      </td>
      <td className="px-4 py-3">
        <div className="text-sm">
          <p className="font-medium text-gray-900">{patient.doctor}</p>
          <p className="text-gray-500">{patient.department}</p>
        </div>
      </td>
      <td className="px-4 py-3 whitespace-nowrap">
        <span className={`px-3 py-1 text-xs rounded-full border ${getStatusColor(patient.status)}`}>
          {patient.status.replace('-', ' ')}
        </span>
      </td>
      <td className="px-4 py-3 whitespace-nowrap relative">
        <button 
          className="text-gray-400 hover:text-gray-600"
          onClick={(e) => {
            e.stopPropagation();
            setShowActionMenu(showActionMenu === patient.id ? null : patient.id);
            setSelectedPatient(patient);
          }}
        >
          <MoreVertical className="w-5 h-5" />
        </button>
        
        {/* Action Menu Dropdown */}
        {showActionMenu === patient.id && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                handleStartConsultation(patient);
                setShowActionMenu(null);
              }}
              className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center"
              disabled={patient.status === 'in-consultation'}
            >
              <Activity className="w-4 h-4 mr-2" />
              Start Consultation
            </button>
            
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setShowStatusUpdateModal(true);
                setShowActionMenu(null);
              }}
              className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Update Status
            </button>
            
            <button 
              onClick={(e) => {
                e.stopPropagation();
                handleCallPatient(patient);
                setShowActionMenu(null);
              }}
              className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center"
            >
              <Phone className="w-4 h-4 mr-2" />
              Call Patient
            </button>
            
            <button 
              onClick={(e) => {
                e.stopPropagation();
                handleSendMessage(patient);
                setShowActionMenu(null);
              }}
              className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Send Message
            </button>
            
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setShowMedicalHistory(true);
                setShowActionMenu(null);
              }}
              className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center"
            >
              <FileText className="w-4 h-4 mr-2" />
              Medical History
            </button>
            
            <button 
              onClick={(e) => {
                e.stopPropagation();
                handlePrintTicket(patient);
                setShowActionMenu(null);
              }}
              className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center"
            >
              <Printer className="w-4 h-4 mr-2" />
              Print Ticket
            </button>
            
            <hr className="my-1" />
            
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setShowDeleteConfirm(true);
                setShowActionMenu(null);
              }}
              className="w-full px-4 py-2 text-left text-sm hover:bg-red-50 text-red-600 flex items-center"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Remove from Queue
            </button>
          </div>
        )}
      </td>
    </tr>
  );

  // Patient Details Panel
  const PatientDetailsPanel = () => {
    if (!selectedPatient) {
      return (
        <div className="flex items-center justify-center h-full text-gray-500">
          <div className="text-center">
            <Users className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p>Select a patient to view details</p>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 h-full overflow-y-auto">
        <div className="mb-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{selectedPatient.name}</h2>
              <p className="text-gray-500">Queue: {selectedPatient.queueNumber}</p>
            </div>
            <span className={`px-3 py-1 text-sm rounded-full ${getPriorityColor(selectedPatient.priority)}`}>
              {selectedPatient.priority} Priority
            </span>
          </div>

          <div className={`inline-block px-3 py-1 text-sm rounded-full border ${getStatusColor(selectedPatient.status)}`}>
            {selectedPatient.status.replace('-', ' ')}
          </div>
        </div>

        <div className="space-y-6">
          {/* Basic Information */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Basic Information</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Age</p>
                <p className="font-medium">{selectedPatient.age} years</p>
              </div>
              <div>
                <p className="text-gray-500">Gender</p>
                <p className="font-medium">{selectedPatient.gender}</p>
              </div>
              <div>
                <p className="text-gray-500">Phone</p>
                <p className="font-medium">{selectedPatient.phone}</p>
              </div>
              <div>
                <p className="text-gray-500">Email</p>
                <p className="font-medium">{selectedPatient.email}</p>
              </div>
            </div>
          </div>

          {/* Appointment Details */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Appointment Details</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Doctor</span>
                <span className="font-medium">{selectedPatient.doctor}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Department</span>
                <span className="font-medium">{selectedPatient.department}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Appointment Time</span>
                <span className="font-medium">{selectedPatient.appointmentTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Registration Time</span>
                <span className="font-medium">{selectedPatient.registrationTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Estimated Time</span>
                <span className="font-medium">{selectedPatient.estimatedTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Visit Reason</span>
                <span className="font-medium">{selectedPatient.visitReason}</span>
              </div>
            </div>
          </div>

          {/* Vitals */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Vitals</h3>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-gray-500 text-xs">Blood Pressure</p>
                <p className="font-medium">{selectedPatient.vitals.bp}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-gray-500 text-xs">Pulse</p>
                <p className="font-medium">{selectedPatient.vitals.pulse} bpm</p>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-gray-500 text-xs">Temperature</p>
                <p className="font-medium">{selectedPatient.vitals.temp}</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-gray-200 space-y-2">
            <button 
              onClick={() => handleStartConsultation(selectedPatient)}
              disabled={selectedPatient.status === 'in-consultation' || selectedPatient.status === 'completed'}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {selectedPatient.status === 'in-consultation' ? 'In Progress' : 
               selectedPatient.status === 'completed' ? 'Completed' : 'Start Consultation'}
            </button>
            <button 
              onClick={() => setShowStatusUpdateModal(true)}
              className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Update Status
            </button>
            <button 
              onClick={() => setShowMedicalHistory(true)}
              className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              View Medical History
            </button>
            <div className="grid grid-cols-2 gap-2">
              <button 
                onClick={() => handleCallPatient(selectedPatient)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center"
              >
                <Phone className="w-4 h-4 mr-2" />
                Call
              </button>
              <button 
                onClick={() => handleSendMessage(selectedPatient)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Message
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading patient queue...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50" onClick={() => setShowActionMenu(null)}>
      {/* Modals */}
      {showAddPatientModal && <AddPatientModal />}
      {showStatusUpdateModal && <StatusUpdateModal />}
      {showDeleteConfirm && <DeleteConfirmModal />}
      {showMedicalHistory && <MedicalHistoryModal />}
      <NotificationToast />
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Patient Queue Management</h1>
              <p className="mt-1 text-sm text-gray-500">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
            <div className="mt-4 sm:mt-0 flex space-x-2">
              <button 
                onClick={handleRefreshQueue}
                className="inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                title="Refresh Queue"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Refresh</span>
              </button>
              <button 
                onClick={handleExportData}
                className="inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                title="Export Queue Data"
              >
                <Download className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Export</span>
              </button>
              <button 
                onClick={() => setShowAddPatientModal(true)}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Add Patient
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Patients</p>
                <p className="text-2xl font-bold text-gray-900">{queueStats.total}</p>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Waiting</p>
                <p className="text-2xl font-bold text-yellow-600">{queueStats.waiting}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">In Consultation</p>
                <p className="text-2xl font-bold text-blue-600">{queueStats.inConsultation}</p>
              </div>
              <Activity className="w-8 h-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Completed</p>
                <p className="text-2xl font-bold text-green-600">{queueStats.completed}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Avg Wait Time</p>
                <p className="text-2xl font-bold text-gray-900">{queueStats.avgWaitTime} min</p>
              </div>
              <AlertCircle className="w-8 h-8 text-orange-500" />
            </div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, queue number, or phone..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="waiting">Waiting</option>
                <option value="in-consultation">In Consultation</option>
                <option value="completed">Completed</option>
              </select>

              <button 
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                onClick={() => handleSort('queueNumber')}
              >
                <Filter className="w-4 h-4 mr-2" />
                Sort
                {sortBy === 'queueNumber' && (
                  sortOrder === 'asc' ? <ArrowUp className="w-4 h-4 ml-1" /> : <ArrowDown className="w-4 h-4 ml-1" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className={`${isDesktop ? 'flex gap-6' : ''}`}>
          {/* Patient List */}
          <div className={`${isDesktop ? 'flex-1' : 'w-full'} ${selectedPatient && !isDesktop ? 'hidden' : ''}`}>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              {isMobile ? (
                // Mobile View - Cards
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Patient Queue</h2>
                  <div className="space-y-3">
                    {filteredAndSortedPatients.map(patient => (
                      <MobilePatientCard key={patient.id} patient={patient} />
                    ))}
                  </div>
                </div>
              ) : (
                // Tablet & Desktop View - Table
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Queue
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Patient
                        </th>
                        {isDesktop && (
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Contact
                          </th>
                        )}
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Time
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Doctor
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredAndSortedPatients.map(patient => (
                        <TableRow key={patient.id} patient={patient} />
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Patient Details Panel - Desktop Only */}
          {isDesktop && (
            <div className="w-96">
              <PatientDetailsPanel />
            </div>
          )}
        </div>

        {/* Mobile Patient Details Modal */}
        {!isDesktop && selectedPatient && (
          <div className="fixed inset-0 z-50 bg-gray-50">
            <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Patient Details</h2>
              <button
                onClick={() => setSelectedPatient(null)}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                <ChevronRight className="w-5 h-5 transform rotate-180" />
              </button>
            </div>
            <div className="p-4 overflow-y-auto" style={{ height: 'calc(100vh - 60px)' }}>
              <PatientDetailsPanel />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientQueue;