import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TherapySessions = () => {
  const navigate = useNavigate();
  
  // State management for sessions
  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [showNewSessionModal, setShowNewSessionModal] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // grid or list view for tablets
  const [notification, setNotification] = useState(null); // For toast notifications

  // Show notification
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Mock data for therapy sessions
  const mockSessions = [
    {
      id: 1,
      patientName: 'John Doe',
      patientId: 'PT001',
      sessionType: 'Individual Therapy',
      therapyType: 'CBT',
      date: '2025-01-27',
      time: '10:00 AM',
      duration: '50 minutes',
      status: 'scheduled',
      notes: 'Focus on anxiety management techniques',
      progress: 65,
      nextGoals: ['Practice breathing exercises', 'Complete homework worksheet']
    },
    {
      id: 2,
      patientName: 'Jane Smith',
      patientId: 'PT002',
      sessionType: 'Individual Therapy',
      therapyType: 'DBT',
      date: '2025-01-27',
      time: '11:00 AM',
      duration: '50 minutes',
      status: 'in-progress',
      notes: 'Working on emotion regulation skills',
      progress: 45,
      nextGoals: ['Mindfulness practice', 'Distress tolerance exercises']
    },
    {
      id: 3,
      patientName: 'Robert Johnson',
      patientId: 'PT003',
      sessionType: 'Group Therapy',
      therapyType: 'Support Group',
      date: '2025-01-26',
      time: '2:00 PM',
      duration: '90 minutes',
      status: 'completed',
      notes: 'Excellent participation in group discussion',
      progress: 80,
      nextGoals: ['Continue peer support engagement', 'Share coping strategies']
    },
    {
      id: 4,
      patientName: 'Emily Brown',
      patientId: 'PT004',
      sessionType: 'Individual Therapy',
      therapyType: 'EMDR',
      date: '2025-01-28',
      time: '3:00 PM',
      duration: '60 minutes',
      status: 'scheduled',
      notes: 'Session 3 of trauma processing',
      progress: 30,
      nextGoals: ['Resource installation', 'Continue desensitization']
    }
  ];

  // Load sessions on component mount
  useEffect(() => {
    setTimeout(() => {
      setSessions(mockSessions);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Filter sessions based on search and filter criteria
  const filteredSessions = sessions.filter(session => {
    const matchesSearch = session.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         session.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         session.therapyType.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filter === 'all' || session.status === filter;
    
    return matchesSearch && matchesFilter;
  });

  // Handle session status update
  const updateSessionStatus = (sessionId, newStatus) => {
    setSessions(sessions.map(session => 
      session.id === sessionId ? { ...session, status: newStatus } : session
    ));
    
    const statusMessages = {
      'in-progress': 'Session started successfully',
      'completed': 'Session marked as completed',
      'cancelled': 'Session cancelled',
      'scheduled': 'Session rescheduled'
    };
    
    showNotification(statusMessages[newStatus] || 'Status updated', 'success');
  };

  // Handle session actions
  const handleReschedule = (sessionId) => {
    // Add reschedule logic here
    showNotification('Opening reschedule dialog...', 'info');
    // In real app, would open a date/time picker modal
  };

  const handleCancelSession = (sessionId) => {
    if (window.confirm('Are you sure you want to cancel this session?')) {
      updateSessionStatus(sessionId, 'cancelled');
    }
  };

  const handleEditSession = (session) => {
    showNotification('Opening edit form...', 'info');
    // In real app, would open edit modal with pre-filled data
  };

  const handlePrintSummary = (session) => {
    showNotification('Preparing session summary for print...', 'info');
    window.print(); // Simple print, in real app would format properly
  };

  const handleViewPatientRecord = (patientId) => {
    navigate(`/clinical/patients/${patientId}`);
  };

  // New Session Modal Component
  const NewSessionModal = () => {
    const [formData, setFormData] = useState({
      patientName: '',
      sessionType: 'Individual Therapy',
      therapyType: 'CBT',
      date: '',
      time: '',
      duration: '50 minutes',
      notes: ''
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      
      // Create new session object
      const newSession = {
        id: sessions.length + 1,
        patientName: formData.patientName,
        patientId: `PT${String(sessions.length + 1).padStart(3, '0')}`,
        sessionType: formData.sessionType,
        therapyType: formData.therapyType,
        date: formData.date,
        time: formData.time,
        duration: formData.duration,
        status: 'scheduled',
        notes: formData.notes,
        progress: 0,
        nextGoals: []
      };
      
      // Add to sessions list
      setSessions([...sessions, newSession]);
      showNotification('New session scheduled successfully!', 'success');
      setShowNewSessionModal(false);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
            <h2 className="text-xl font-bold text-gray-900">Schedule New Session</h2>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Patient Name *
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.patientName}
                  onChange={(e) => setFormData({...formData, patientName: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Session Type *
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.sessionType}
                  onChange={(e) => setFormData({...formData, sessionType: e.target.value})}
                >
                  <option>Individual Therapy</option>
                  <option>Group Therapy</option>
                  <option>Family Therapy</option>
                  <option>Couple Therapy</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Therapy Type *
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.therapyType}
                  onChange={(e) => setFormData({...formData, therapyType: e.target.value})}
                >
                  <option>CBT</option>
                  <option>DBT</option>
                  <option>EMDR</option>
                  <option>IPT</option>
                  <option>Psychodynamic</option>
                  <option>Support Group</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Duration *
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.duration}
                  onChange={(e) => setFormData({...formData, duration: e.target.value})}
                >
                  <option>30 minutes</option>
                  <option>50 minutes</option>
                  <option>60 minutes</option>
                  <option>90 minutes</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date *
                </label>
                <input
                  type="date"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Time *
                </label>
                <input
                  type="time"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.time}
                  onChange={(e) => setFormData({...formData, time: e.target.value})}
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Session Notes
              </label>
              <textarea
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter preliminary notes for this session..."
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
              />
            </div>
            
            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={() => setShowNewSessionModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Schedule Session
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // Session Card Component (Tablet Optimized)
  const SessionCard = ({ session }) => {
    const statusColors = {
      'scheduled': 'bg-blue-100 text-blue-800',
      'in-progress': 'bg-yellow-100 text-yellow-800',
      'completed': 'bg-green-100 text-green-800',
      'cancelled': 'bg-red-100 text-red-800'
    };

    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
        <div 
          className="p-4 md:p-6"
          onClick={() => setSelectedSession(session)}
        >
          {/* Header */}
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{session.patientName}</h3>
              <p className="text-sm text-gray-500">ID: {session.patientId}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[session.status]}`}>
              {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
            </span>
          </div>

          {/* Session Details */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center text-sm">
              <i className="fas fa-brain w-5 text-purple-500"></i>
              <span className="text-gray-700 ml-2">{session.therapyType}</span>
            </div>
            <div className="flex items-center text-sm">
              <i className="fas fa-users w-5 text-blue-500"></i>
              <span className="text-gray-700 ml-2">{session.sessionType}</span>
            </div>
            <div className="flex items-center text-sm">
              <i className="fas fa-calendar w-5 text-green-500"></i>
              <span className="text-gray-700 ml-2">{session.date} at {session.time}</span>
            </div>
            <div className="flex items-center text-sm">
              <i className="fas fa-clock w-5 text-orange-500"></i>
              <span className="text-gray-700 ml-2">{session.duration}</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">Treatment Progress</span>
              <span className="font-medium text-gray-900">{session.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${session.progress}%` }}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/clinical/therapy/notes?sessionId=${session.id}&patientId=${session.patientId}`);
              }}
              className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
            >
              <i className="fas fa-notes-medical mr-2"></i>
              Session Notes
            </button>
            {session.status === 'scheduled' && (
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  updateSessionStatus(session.id, 'in-progress');
                }}
                className="flex-1 px-3 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
              >
                <i className="fas fa-play mr-2"></i>
                Start Session
              </button>
            )}
            {session.status === 'in-progress' && (
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  updateSessionStatus(session.id, 'completed');
                }}
                className="flex-1 px-3 py-2 bg-orange-600 text-white text-sm rounded-lg hover:bg-orange-700 transition-colors"
              >
                <i className="fas fa-check mr-2"></i>
                Complete
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Session Detail Modal
  const SessionDetailModal = () => {
    if (!selectedSession) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900">Session Details</h2>
            <button 
              onClick={() => setSelectedSession(null)}
              className="text-gray-500 hover:text-gray-700"
            >
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>
          
          <div className="p-6">
            {/* Patient Information */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Patient Information</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Name</p>
                  <p className="font-medium">{selectedSession.patientName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Patient ID</p>
                  <p className="font-medium">{selectedSession.patientId}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Session Type</p>
                  <p className="font-medium">{selectedSession.sessionType}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Therapy Type</p>
                  <p className="font-medium">{selectedSession.therapyType}</p>
                </div>
              </div>
            </div>

            {/* Session Schedule */}
            <div className="bg-blue-50 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Schedule</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Date</p>
                  <p className="font-medium">{selectedSession.date}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Time</p>
                  <p className="font-medium">{selectedSession.time}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Duration</p>
                  <p className="font-medium">{selectedSession.duration}</p>
                </div>
              </div>
            </div>

            {/* Session Notes */}
            <div className="bg-green-50 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Session Notes</h3>
              <p className="text-gray-700">{selectedSession.notes}</p>
            </div>

            {/* Goals for Next Session */}
            <div className="bg-purple-50 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Goals for Next Session</h3>
              <ul className="space-y-2">
                {selectedSession.nextGoals.map((goal, index) => (
                  <li key={index} className="flex items-start">
                    <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                    <span className="text-gray-700">{goal}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <button 
                onClick={() => handleEditSession(selectedSession)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <i className="fas fa-edit mr-2"></i>
                Edit Session
              </button>
              <button 
                onClick={() => handleViewPatientRecord(selectedSession.patientId)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <i className="fas fa-file-medical mr-2"></i>
                View Patient Record
              </button>
              <button 
                onClick={() => navigate(`/clinical/therapy/notes?sessionId=${selectedSession.id}&patientId=${selectedSession.patientId}`)}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <i className="fas fa-notes-medical mr-2"></i>
                Session Notes
              </button>
              <button 
                onClick={() => handlePrintSummary(selectedSession)}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                <i className="fas fa-print mr-2"></i>
                Print Summary
              </button>
              {selectedSession.status === 'scheduled' && (
                <>
                  <button 
                    onClick={() => handleReschedule(selectedSession.id)}
                    className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                  >
                    <i className="fas fa-calendar-alt mr-2"></i>
                    Reschedule
                  </button>
                  <button 
                    onClick={() => handleCancelSession(selectedSession.id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <i className="fas fa-times-circle mr-2"></i>
                    Cancel Session
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <i className="fas fa-spinner fa-spin text-4xl text-blue-600 mb-4"></i>
          <p className="text-gray-600">Loading therapy sessions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Therapy Sessions</h1>
        <p className="text-gray-600 mt-2">Manage and track patient therapy sessions</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Today's Sessions</p>
              <p className="text-2xl font-bold text-gray-900">8</p>
            </div>
            <i className="fas fa-calendar-day text-blue-500 text-2xl"></i>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-gray-900">5</p>
            </div>
            <i className="fas fa-check-circle text-green-500 text-2xl"></i>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">In Progress</p>
              <p className="text-2xl font-bold text-gray-900">1</p>
            </div>
            <i className="fas fa-hourglass-half text-yellow-500 text-2xl"></i>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Scheduled</p>
              <p className="text-2xl font-bold text-gray-900">2</p>
            </div>
            <i className="fas fa-clock text-purple-500 text-2xl"></i>
          </div>
        </div>
      </div>

      {/* Filters and Search Bar */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search Input */}
          <div className="flex-1">
            <div className="relative">
              <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
              <input
                type="text"
                placeholder="Search by patient name, ID, or therapy type..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          {/* Filter Buttons */}
          <div className="flex gap-2">
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Sessions</option>
              <option value="scheduled">Scheduled</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            
            {/* View Mode Toggle (Tablet Friendly) */}
            <button
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors md:hidden lg:block"
            >
              <i className={`fas fa-${viewMode === 'grid' ? 'list' : 'th-large'}`}></i>
            </button>
            
            {/* New Session Button */}
            <button
              onClick={() => setShowNewSessionModal(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <i className="fas fa-plus mr-2"></i>
              <span className="hidden md:inline">New Session</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sessions Grid/List */}
      <div className={`grid ${viewMode === 'grid' ? 'md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'} gap-4`}>
        {filteredSessions.length > 0 ? (
          filteredSessions.map(session => (
            <SessionCard key={session.id} session={session} />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <i className="fas fa-calendar-times text-4xl text-gray-400 mb-4"></i>
            <p className="text-gray-600">No sessions found matching your criteria</p>
          </div>
        )}
      </div>

      {/* Modals */}
      {showNewSessionModal && <NewSessionModal />}
      {selectedSession && <SessionDetailModal />}

      {/* Toast Notification */}
      {notification && (
        <div className={`fixed bottom-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2 animate-pulse
          ${notification.type === 'success' ? 'bg-green-600 text-white' : 
            notification.type === 'error' ? 'bg-red-600 text-white' : 
            notification.type === 'info' ? 'bg-blue-600 text-white' : 
            'bg-gray-600 text-white'}`}>
          <i className={`fas ${notification.type === 'success' ? 'fa-check-circle' : 
            notification.type === 'error' ? 'fa-exclamation-circle' : 
            'fa-info-circle'}`}></i>
          <span>{notification.message}</span>
        </div>
      )}
    </div>
  );
};

export default TherapySessions;