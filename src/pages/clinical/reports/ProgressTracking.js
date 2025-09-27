import React, { useState, useEffect } from 'react';
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area,
  BarChart, 
  Bar,
  PieChart, 
  Pie,
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';

const ProgressTracking = () => {
  // Add print styles to the document
  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @media print {
        .no-print { display: none !important; }
        .print-break { page-break-after: always; }
        body { print-color-adjust: exact; -webkit-print-color-adjust: exact; }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  // State management for different views and data
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [selectedMetric, setSelectedMetric] = useState('overall');
  const [activeTab, setActiveTab] = useState('overview');
  const [progressData, setProgressData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showPatientList, setShowPatientList] = useState(false);
  const [patientFilter, setPatientFilter] = useState('all');
  
  // Additional states for operational features
  const [showAddGoalModal, setShowAddGoalModal] = useState(false);
  const [showAddMilestoneModal, setShowAddMilestoneModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showNotificationSettings, setShowNotificationSettings] = useState(false);
  const [notifications, setNotifications] = useState({});
  const [exportFormat, setExportFormat] = useState('pdf');
  const [shareMethod, setShareMethod] = useState('team');
  const [emailRecipient, setEmailRecipient] = useState('');
  const [newGoal, setNewGoal] = useState({ title: '', target: '', unit: '', deadline: '' });
  const [newMilestone, setNewMilestone] = useState({ title: '', type: 'therapy', date: '' });
  const [successMessage, setSuccessMessage] = useState('');
  const [userGoals, setUserGoals] = useState([]);

  // Sample patient data - In production, this would come from API
  const [patients] = useState([
    { 
      id: 1, 
      name: 'John Smith', 
      age: 32, 
      gender: 'Male',
      therapist: 'Dr. Sarah Johnson',
      diagnosis: 'Depression, Anxiety',
      status: 'active',
      riskLevel: 'low',
      lastSession: '2025-01-25',
      nextSession: '2025-02-01',
      progressScore: 78,
      adherence: 92
    },
    { 
      id: 2, 
      name: 'Emily Davis', 
      age: 28, 
      gender: 'Female',
      therapist: 'Dr. Michael Chen',
      diagnosis: 'GAD, Panic Disorder',
      status: 'active',
      riskLevel: 'medium',
      lastSession: '2025-01-24',
      nextSession: '2025-01-31',
      progressScore: 65,
      adherence: 88
    },
    { 
      id: 3, 
      name: 'Robert Johnson', 
      age: 45, 
      gender: 'Male',
      therapist: 'Dr. Sarah Johnson',
      diagnosis: 'PTSD',
      status: 'active',
      riskLevel: 'high',
      lastSession: '2025-01-23',
      nextSession: '2025-01-30',
      progressScore: 52,
      adherence: 75
    },
    { 
      id: 4, 
      name: 'Maria Garcia', 
      age: 36, 
      gender: 'Female',
      therapist: 'Dr. Lisa Anderson',
      diagnosis: 'Bipolar Disorder',
      status: 'active',
      riskLevel: 'medium',
      lastSession: '2025-01-22',
      nextSession: '2025-01-29',
      progressScore: 71,
      adherence: 95
    },
    { 
      id: 5, 
      name: 'William Brown', 
      age: 52, 
      gender: 'Male',
      therapist: 'Dr. Michael Chen',
      diagnosis: 'Depression',
      status: 'inactive',
      riskLevel: 'low',
      lastSession: '2025-01-15',
      nextSession: 'N/A',
      progressScore: 85,
      adherence: 90
    },
    { 
      id: 6, 
      name: 'Sophie Wilson', 
      age: 24, 
      gender: 'Female',
      therapist: 'Dr. Sarah Johnson',
      diagnosis: 'Social Anxiety',
      status: 'active',
      riskLevel: 'low',
      lastSession: '2025-01-26',
      nextSession: '2025-02-02',
      progressScore: 82,
      adherence: 96
    }
  ]);

  // Filter patients based on search and filter criteria
  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         patient.diagnosis.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         patient.therapist.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = patientFilter === 'all' || 
                         (patientFilter === 'active' && patient.status === 'active') ||
                         (patientFilter === 'high-risk' && patient.riskLevel === 'high') ||
                         (patientFilter === 'low-adherence' && patient.adherence < 80);
    
    return matchesSearch && matchesFilter;
  });

  // Sample data - In production, this would come from API
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      if (selectedPatient) {
        setProgressData(generatePatientProgressData(selectedPatient));
      } else {
        setProgressData(generateProgressData());
      }
      setLoading(false);
    }, 1000);
  }, [selectedPeriod, selectedPatient]);

  // Generate sample progress data
  const generateProgressData = () => {
    const periods = {
      week: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      month: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      year: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    };

    return periods[selectedPeriod].map((label, index) => ({
      name: label,
      mood: Math.floor(Math.random() * 40) + 60,
      anxiety: Math.floor(Math.random() * 30) + 40,
      sleep: Math.floor(Math.random() * 35) + 55,
      medication: Math.floor(Math.random() * 20) + 80,
      therapy: Math.floor(Math.random() * 25) + 70,
      overall: Math.floor(Math.random() * 30) + 65
    }));
  };

  // Generate patient-specific progress data
  const generatePatientProgressData = (patient) => {
    const periods = {
      week: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      month: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      year: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    };

    // Generate data based on patient's progress score and risk level
    const baseScore = patient.progressScore;
    const variation = patient.riskLevel === 'high' ? 20 : patient.riskLevel === 'medium' ? 15 : 10;

    return periods[selectedPeriod].map((label, index) => ({
      name: label,
      mood: Math.max(20, Math.min(100, baseScore + Math.floor(Math.random() * variation) - variation/2)),
      anxiety: Math.max(20, Math.min(100, (100 - baseScore) + Math.floor(Math.random() * variation) - variation/2)),
      sleep: Math.max(20, Math.min(100, baseScore - 5 + Math.floor(Math.random() * variation) - variation/2)),
      medication: patient.adherence + Math.floor(Math.random() * 10) - 5,
      therapy: Math.max(20, Math.min(100, baseScore + 10 + Math.floor(Math.random() * variation) - variation/2)),
      overall: Math.max(20, Math.min(100, baseScore + Math.floor(Math.random() * variation) - variation/2))
    }));
  };

  // Assessment scores data for radar chart
  const assessmentScores = [
    { subject: 'Depression', A: 75, fullMark: 100 },
    { subject: 'Anxiety', A: 68, fullMark: 100 },
    { subject: 'Stress', A: 82, fullMark: 100 },
    { subject: 'Sleep Quality', A: 71, fullMark: 100 },
    { subject: 'Social Function', A: 85, fullMark: 100 },
    { subject: 'Work/Study', A: 78, fullMark: 100 }
  ];

  // Milestone data
  const milestones = [
    { id: 1, date: '2025-01-15', title: 'Started CBT Therapy', type: 'therapy', completed: true },
    { id: 2, date: '2025-01-22', title: 'Medication Adjustment', type: 'medication', completed: true },
    { id: 3, date: '2025-02-01', title: 'First Group Session', type: 'therapy', completed: true },
    { id: 4, date: '2025-02-15', title: 'Follow-up Assessment', type: 'assessment', completed: false },
    { id: 5, date: '2025-03-01', title: 'Treatment Review', type: 'review', completed: false }
  ];

  // Goal tracking data
  const [goals, setGoals] = useState([
    { id: 1, title: 'Daily Meditation', progress: 85, target: 30, current: 26, unit: 'days' },
    { id: 2, title: 'Sleep 7+ Hours', progress: 71, target: 7, current: 5, unit: 'days/week' },
    { id: 3, title: 'Exercise Sessions', progress: 60, target: 5, current: 3, unit: 'sessions/week' },
    { id: 4, title: 'Therapy Homework', progress: 100, target: 4, current: 4, unit: 'assignments' }
  ]);

  // Handler functions for all operations
  const handleAddGoal = () => {
    if (newGoal.title && newGoal.target && newGoal.unit) {
      const goal = {
        id: goals.length + 1 + userGoals.length,
        title: newGoal.title,
        progress: 0,
        target: parseInt(newGoal.target),
        current: 0,
        unit: newGoal.unit,
        deadline: newGoal.deadline
      };
      setUserGoals([...userGoals, goal]);
      setNewGoal({ title: '', target: '', unit: '', deadline: '' });
      setShowAddGoalModal(false);
      showSuccessMessage('Goal added successfully!');
    }
  };

  const handleAddMilestone = () => {
    if (newMilestone.title && newMilestone.date) {
      // In production, this would save to database
      setNewMilestone({ title: '', type: 'therapy', date: '' });
      setShowAddMilestoneModal(false);
      showSuccessMessage('Milestone added successfully!');
    }
  };

  const handleExport = () => {
    // Simulate export process
    setTimeout(() => {
      setShowExportModal(false);
      showSuccessMessage(`Report exported as ${exportFormat.toUpperCase()} successfully!`);
      
      // In production, trigger actual download
      if (exportFormat === 'pdf') {
        console.log('Downloading PDF report...');
      } else if (exportFormat === 'excel') {
        console.log('Downloading Excel report...');
      } else if (exportFormat === 'csv') {
        console.log('Downloading CSV data...');
      }
    }, 1000);
  };

  const handleShare = () => {
    // Simulate share process
    setTimeout(() => {
      setShowShareModal(false);
      if (shareMethod === 'team') {
        showSuccessMessage('Report shared with care team successfully!');
      } else if (shareMethod === 'supervisor') {
        showSuccessMessage('Report sent to supervisor for review!');
      } else if (shareMethod === 'link') {
        navigator.clipboard.writeText('https://parivarthan.com/report/12345');
        showSuccessMessage('Shareable link copied to clipboard!');
      }
    }, 500);
  };

  const handleEmailPatient = () => {
    if (emailRecipient && emailRecipient.includes('@')) {
      setTimeout(() => {
        setShowEmailModal(false);
        setEmailRecipient('');
        showSuccessMessage(`Progress report sent to ${selectedPatient?.name || 'patient'}!`);
      }, 500);
    }
  };

  const handlePrint = () => {
    window.print();
    showSuccessMessage('Document sent to printer!');
  };

  const toggleNotification = (milestoneId) => {
    setNotifications(prev => ({
      ...prev,
      [milestoneId]: !prev[milestoneId]
    }));
    showSuccessMessage(notifications[milestoneId] ? 'Notification disabled' : 'Notification enabled');
  };

  const showSuccessMessage = (message) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  // Colors for charts
  const COLORS = {
    primary: '#0ea5e9',
    secondary: '#22c55e',
    accent: '#a855f7',
    warning: '#f59e0b',
    danger: '#ef4444',
    info: '#3b82f6'
  };

  // Pie chart data for therapy type distribution
  const therapyDistribution = [
    { name: 'Individual', value: 45, color: COLORS.primary },
    { name: 'Group', value: 25, color: COLORS.secondary },
    { name: 'Self-Help', value: 20, color: COLORS.accent },
    { name: 'Online', value: 10, color: COLORS.warning }
  ];

  // Component for patient card
  const PatientCard = ({ patient, isSelected, onSelect }) => (
    <div
      onClick={() => onSelect(patient)}
      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
        isSelected 
          ? 'border-serene-blue-500 bg-serene-blue-50' 
          : 'border-gray-200 hover:border-gray-300 bg-white hover:shadow-md'
      }`}
    >
      <div className="flex justify-between items-start mb-2">
        <div>
          <h4 className="font-semibold text-gray-900">{patient.name}</h4>
          <p className="text-sm text-gray-600">{patient.age} years, {patient.gender}</p>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          patient.status === 'active' 
            ? 'bg-growth-green-100 text-growth-green-800' 
            : 'bg-gray-100 text-gray-800'
        }`}>
          {patient.status}
        </span>
      </div>
      <div className="space-y-1">
        <p className="text-xs text-gray-500">
          <i className="fas fa-stethoscope mr-1"></i>
          {patient.diagnosis}
        </p>
        <p className="text-xs text-gray-500">
          <i className="fas fa-user-md mr-1"></i>
          {patient.therapist}
        </p>
        <div className="flex justify-between items-center mt-2">
          <span className={`text-xs px-2 py-1 rounded ${
            patient.riskLevel === 'high' ? 'bg-red-100 text-red-700' :
            patient.riskLevel === 'medium' ? 'bg-yellow-100 text-yellow-700' :
            'bg-green-100 text-green-700'
          }`}>
            {patient.riskLevel} risk
          </span>
          <span className="text-xs text-gray-600">
            {patient.adherence}% adherence
          </span>
        </div>
      </div>
      {isSelected && (
        <div className="mt-3 pt-3 border-t border-serene-blue-200">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-gray-500">Last Session:</span>
              <p className="font-medium">{patient.lastSession}</p>
            </div>
            <div>
              <span className="text-gray-500">Next Session:</span>
              <p className="font-medium">{patient.nextSession}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // Component for metric cards
  const MetricCard = ({ title, value, change, icon, color }) => (
    <div className="bg-white rounded-lg shadow-md p-4 lg:p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-2">
        <div className={`p-3 rounded-full ${color}`}>
          <i className={`fas ${icon} text-white text-lg lg:text-xl`}></i>
        </div>
        <span className={`text-sm font-medium ${
          change >= 0 ? 'text-growth-green-600' : 'text-red-600'
        }`}>
          {change >= 0 ? '↑' : '↓'} {Math.abs(change)}%
        </span>
      </div>
      <h3 className="text-gray-600 text-sm mb-1">{title}</h3>
      <p className="text-2xl lg:text-3xl font-bold text-gray-900">{value}</p>
    </div>
  );

  // Component for goal progress
  const GoalProgress = ({ goal }) => (
    <div className="bg-white rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-medium text-gray-900">{goal.title}</h4>
        <span className="text-sm text-gray-500">
          {goal.current}/{goal.target} {goal.unit}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-gradient-to-r from-serene-blue-500 to-growth-green-500 h-2 rounded-full transition-all duration-500"
          style={{ width: `${goal.progress}%` }}
        />
      </div>
      <div className="mt-2 flex justify-between items-center">
        <span className={`text-sm font-medium ${
          goal.progress >= 70 ? 'text-growth-green-600' : 
          goal.progress >= 40 ? 'text-yellow-600' : 'text-red-600'
        }`}>
          {goal.progress}%
        </span>
        {goal.deadline && (
          <span className="text-xs text-gray-500">Due: {goal.deadline}</span>
        )}
      </div>
    </div>
  );

  // Component for milestone timeline
  const MilestoneTimeline = ({ milestones }) => (
    <div className="relative">
      {milestones.map((milestone, index) => (
        <div key={milestone.id} className="flex items-start mb-6">
          <div className="relative">
            <div className={`w-4 h-4 rounded-full ${
              milestone.completed ? 'bg-growth-green-500' : 'bg-gray-300'
            }`}>
              {index < milestones.length - 1 && (
                <div className="absolute top-4 left-1.5 w-0.5 h-12 bg-gray-300" />
              )}
            </div>
          </div>
          <div className="ml-4 flex-1">
            <div className="flex items-center justify-between">
              <h4 className={`font-medium ${
                milestone.completed ? 'text-gray-900' : 'text-gray-500'
              }`}>
                {milestone.title}
              </h4>
              <span className="text-sm text-gray-500">{milestone.date}</span>
            </div>
            <div className="mt-1">
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                milestone.type === 'therapy' ? 'bg-serene-blue-100 text-serene-blue-800' :
                milestone.type === 'medication' ? 'bg-purple-100 text-purple-800' :
                milestone.type === 'assessment' ? 'bg-yellow-100 text-yellow-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {milestone.type}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  // Modal Component for Adding Goals
  const AddGoalModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Add New Goal</h2>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Goal Title</label>
            <input
              type="text"
              value={newGoal.title}
              onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-serene-blue-500"
              placeholder="e.g., Daily Exercise"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Target</label>
              <input
                type="number"
                value={newGoal.target}
                onChange={(e) => setNewGoal({ ...newGoal, target: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-serene-blue-500"
                placeholder="e.g., 30"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Unit</label>
              <input
                type="text"
                value={newGoal.unit}
                onChange={(e) => setNewGoal({ ...newGoal, unit: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-serene-blue-500"
                placeholder="e.g., days"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Deadline (Optional)</label>
            <input
              type="date"
              value={newGoal.deadline}
              onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-serene-blue-500"
            />
          </div>
        </div>
        <div className="p-6 border-t flex justify-end gap-3">
          <button
            onClick={() => setShowAddGoalModal(false)}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleAddGoal}
            className="px-4 py-2 bg-serene-blue-600 text-white rounded-lg hover:bg-serene-blue-700 transition-colors"
          >
            Add Goal
          </button>
        </div>
      </div>
    </div>
  );

  // Modal Component for Adding Milestones
  const AddMilestoneModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Add New Milestone</h2>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Milestone Title</label>
            <input
              type="text"
              value={newMilestone.title}
              onChange={(e) => setNewMilestone({ ...newMilestone, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-serene-blue-500"
              placeholder="e.g., Complete CBT Module"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
            <select
              value={newMilestone.type}
              onChange={(e) => setNewMilestone({ ...newMilestone, type: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-serene-blue-500"
            >
              <option value="therapy">Therapy</option>
              <option value="medication">Medication</option>
              <option value="assessment">Assessment</option>
              <option value="review">Review</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
            <input
              type="date"
              value={newMilestone.date}
              onChange={(e) => setNewMilestone({ ...newMilestone, date: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-serene-blue-500"
            />
          </div>
        </div>
        <div className="p-6 border-t flex justify-end gap-3">
          <button
            onClick={() => setShowAddMilestoneModal(false)}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleAddMilestone}
            className="px-4 py-2 bg-serene-blue-600 text-white rounded-lg hover:bg-serene-blue-700 transition-colors"
          >
            Add Milestone
          </button>
        </div>
      </div>
    </div>
  );

  // Modal Component for Export Options
  const ExportModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Export Progress Report</h2>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Format</label>
            <div className="space-y-2">
              <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  value="pdf"
                  checked={exportFormat === 'pdf'}
                  onChange={(e) => setExportFormat(e.target.value)}
                  className="mr-3"
                />
                <span className="flex-1">PDF Document</span>
                <i className="fas fa-file-pdf text-red-500"></i>
              </label>
              <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  value="excel"
                  checked={exportFormat === 'excel'}
                  onChange={(e) => setExportFormat(e.target.value)}
                  className="mr-3"
                />
                <span className="flex-1">Excel Spreadsheet</span>
                <i className="fas fa-file-excel text-green-500"></i>
              </label>
              <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  value="csv"
                  checked={exportFormat === 'csv'}
                  onChange={(e) => setExportFormat(e.target.value)}
                  className="mr-3"
                />
                <span className="flex-1">CSV Data</span>
                <i className="fas fa-file-csv text-blue-500"></i>
              </label>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-serene-blue-500">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 3 months</option>
              <option>Last 6 months</option>
              <option>All time</option>
            </select>
          </div>
        </div>
        <div className="p-6 border-t flex justify-end gap-3">
          <button
            onClick={() => setShowExportModal(false)}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleExport}
            className="px-4 py-2 bg-serene-blue-600 text-white rounded-lg hover:bg-serene-blue-700 transition-colors"
          >
            Export
          </button>
        </div>
      </div>
    </div>
  );

  // Modal Component for Share Options
  const ShareModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Share Progress Report</h2>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Share With</label>
            <div className="space-y-2">
              <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  value="team"
                  checked={shareMethod === 'team'}
                  onChange={(e) => setShareMethod(e.target.value)}
                  className="mr-3"
                />
                <span className="flex-1">Care Team</span>
                <i className="fas fa-users text-serene-blue-500"></i>
              </label>
              <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  value="supervisor"
                  checked={shareMethod === 'supervisor'}
                  onChange={(e) => setShareMethod(e.target.value)}
                  className="mr-3"
                />
                <span className="flex-1">Supervisor</span>
                <i className="fas fa-user-tie text-purple-500"></i>
              </label>
              <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  value="link"
                  checked={shareMethod === 'link'}
                  onChange={(e) => setShareMethod(e.target.value)}
                  className="mr-3"
                />
                <span className="flex-1">Generate Link</span>
                <i className="fas fa-link text-green-500"></i>
              </label>
            </div>
          </div>
          {shareMethod === 'link' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Link expires in</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-serene-blue-500">
                <option>24 hours</option>
                <option>7 days</option>
                <option>30 days</option>
                <option>Never</option>
              </select>
            </div>
          )}
          <div>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span className="text-sm text-gray-700">Include patient personal information</span>
            </label>
          </div>
        </div>
        <div className="p-6 border-t flex justify-end gap-3">
          <button
            onClick={() => setShowShareModal(false)}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleShare}
            className="px-4 py-2 bg-serene-blue-600 text-white rounded-lg hover:bg-serene-blue-700 transition-colors"
          >
            Share
          </button>
        </div>
      </div>
    </div>
  );

  // Modal Component for Email to Patient
  const EmailModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Email Progress Report</h2>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Patient Email</label>
            <input
              type="email"
              value={emailRecipient}
              onChange={(e) => setEmailRecipient(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-serene-blue-500"
              placeholder={selectedPatient ? `${selectedPatient.name.toLowerCase().replace(' ', '.')}@email.com` : 'patient@email.com'}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Message (Optional)</label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-serene-blue-500"
              rows="4"
              placeholder="Add a personal message to accompany the report..."
            />
          </div>
          <div className="space-y-2">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" defaultChecked />
              <span className="text-sm text-gray-700">Include progress charts</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" defaultChecked />
              <span className="text-sm text-gray-700">Include goals and milestones</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span className="text-sm text-gray-700">Include therapist notes</span>
            </label>
          </div>
        </div>
        <div className="p-6 border-t flex justify-end gap-3">
          <button
            onClick={() => setShowEmailModal(false)}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleEmailPatient}
            className="px-4 py-2 bg-serene-blue-600 text-white rounded-lg hover:bg-serene-blue-700 transition-colors"
          >
            Send Email
          </button>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-serene-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-6">
      {/* Success Message Toast */}
      {successMessage && (
        <div className="fixed top-4 right-4 z-50 bg-growth-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center animate-pulse">
          <i className="fas fa-check-circle mr-2"></i>
          {successMessage}
        </div>
      )}

      {/* Render Modals */}
      {showAddGoalModal && <AddGoalModal />}
      {showAddMilestoneModal && <AddMilestoneModal />}
      {showExportModal && <ExportModal />}
      {showShareModal && <ShareModal />}
      {showEmailModal && <EmailModal />}

      {/* Header with Patient Selection */}
      <div className="mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Progress Tracking</h1>
            <p className="text-gray-600 mt-2">
              {selectedPatient 
                ? `Viewing progress for ${selectedPatient.name}`
                : 'Select a patient to view individual progress or view overall statistics'}
            </p>
          </div>
          <button
            onClick={() => setShowPatientList(!showPatientList)}
            className="no-print px-4 py-2 bg-serene-blue-600 text-white rounded-lg hover:bg-serene-blue-700 transition-colors flex items-center gap-2"
          >
            <i className="fas fa-users"></i>
            {selectedPatient ? 'Change Patient' : 'Select Patient'}
          </button>
        </div>

        {/* Selected Patient Info Bar */}
        {selectedPatient && (
          <div className="mt-4 p-4 bg-white rounded-lg shadow-sm border-l-4 border-serene-blue-500">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-serene-blue-100 rounded-full flex items-center justify-center">
                  <i className="fas fa-user text-serene-blue-600 text-lg"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {selectedPatient.name} ({selectedPatient.age}, {selectedPatient.gender})
                  </h3>
                  <p className="text-sm text-gray-600">
                    {selectedPatient.diagnosis} • {selectedPatient.therapist}
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-serene-blue-600">{selectedPatient.progressScore}%</p>
                  <p className="text-xs text-gray-500">Progress Score</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-growth-green-600">{selectedPatient.adherence}%</p>
                  <p className="text-xs text-gray-500">Adherence</p>
                </div>
                <button
                  onClick={() => setSelectedPatient(null)}
                  className="px-3 py-1 text-sm text-gray-600 hover:text-red-600 transition-colors"
                >
                  <i className="fas fa-times"></i> Clear
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Patient Selection Panel */}
      {showPatientList && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[80vh] overflow-hidden">
            <div className="p-4 lg:p-6 border-b">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Select Patient</h2>
                <button
                  onClick={() => setShowPatientList(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <i className="fas fa-times text-xl"></i>
                </button>
              </div>
              
              {/* Search and Filter */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Search by name, diagnosis, or therapist..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-serene-blue-500"
                  />
                  <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
                </div>
                <select
                  value={patientFilter}
                  onChange={(e) => setPatientFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-serene-blue-500"
                >
                  <option value="all">All Patients</option>
                  <option value="active">Active Only</option>
                  <option value="high-risk">High Risk</option>
                  <option value="low-adherence">Low Adherence (&lt;80%)</option>
                </select>
              </div>
            </div>
            
            {/* Patient List */}
            <div className="p-4 lg:p-6 overflow-y-auto max-h-[60vh]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredPatients.map((patient) => (
                  <PatientCard
                    key={patient.id}
                    patient={patient}
                    isSelected={selectedPatient?.id === patient.id}
                    onSelect={(patient) => {
                      setSelectedPatient(patient);
                      setShowPatientList(false);
                    }}
                  />
                ))}
              </div>
              
              {filteredPatients.length === 0 && (
                <div className="text-center py-8">
                  <i className="fas fa-search text-4xl text-gray-300 mb-3"></i>
                  <p className="text-gray-500">No patients found matching your criteria</p>
                </div>
              )}
            </div>

            {/* Footer Stats */}
            <div className="p-4 bg-gray-50 border-t">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Total Patients: {patients.length}</span>
                <span>Active: {patients.filter(p => p.status === 'active').length}</span>
                <span>High Risk: {patients.filter(p => p.riskLevel === 'high').length}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Period Selector and Controls */}
      <div className="no-print bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'overview' 
                  ? 'bg-serene-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('detailed')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'detailed' 
                  ? 'bg-serene-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Detailed
            </button>
            <button
              onClick={() => setActiveTab('goals')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'goals' 
                  ? 'bg-serene-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Goals
            </button>
            <button
              onClick={() => setActiveTab('milestones')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'milestones' 
                  ? 'bg-serene-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Milestones
            </button>
          </div>
          
          <div className="flex gap-2">
            {['week', 'month', 'year'].map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-3 py-1 rounded-md text-sm font-medium capitalize transition-colors ${
                  selectedPeriod === period 
                    ? 'bg-serene-blue-100 text-serene-blue-700' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {period}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Metric Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard 
              title="Overall Progress" 
              value={selectedPatient ? `${selectedPatient.progressScore}%` : "78%"} 
              change={selectedPatient ? (selectedPatient.riskLevel === 'high' ? -3 : 5) : 5} 
              icon="fa-chart-line"
              color="bg-serene-blue-600"
            />
            <MetricCard 
              title="Mood Score" 
              value={selectedPatient ? `${(selectedPatient.progressScore / 10).toFixed(1)}/10` : "7.2/10"} 
              change={selectedPatient ? (selectedPatient.riskLevel === 'high' ? -8 : 12) : 12} 
              icon="fa-smile"
              color="bg-growth-green-600"
            />
            <MetricCard 
              title="Sessions Completed" 
              value={selectedPatient ? Math.floor(selectedPatient.progressScore / 3) : "24"} 
              change={selectedPatient && selectedPatient.status === 'inactive' ? -100 : -2} 
              icon="fa-calendar-check"
              color="bg-purple-600"
            />
            <MetricCard 
              title="Compliance Rate" 
              value={selectedPatient ? `${selectedPatient.adherence}%` : "92%"} 
              change={selectedPatient ? (selectedPatient.adherence > 90 ? 8 : -5) : 8} 
              icon="fa-check-circle"
              color="bg-yellow-600"
            />
          </div>

          {/* Main Progress Chart */}
          <div className="bg-white rounded-lg shadow-md p-4 lg:p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {selectedPatient ? `${selectedPatient.name}'s Progress Trends` : 'Overall Progress Trends'}
            </h3>
            <div className="h-64 lg:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={progressData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="mood" 
                    stroke={COLORS.primary} 
                    strokeWidth={2}
                    dot={{ fill: COLORS.primary }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="anxiety" 
                    stroke={COLORS.secondary} 
                    strokeWidth={2}
                    dot={{ fill: COLORS.secondary }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="overall" 
                    stroke={COLORS.accent} 
                    strokeWidth={2}
                    dot={{ fill: COLORS.accent }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            {selectedPatient && (
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">
                    <i className="fas fa-info-circle mr-1"></i>
                    Patient-specific data based on {selectedPatient.diagnosis}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    selectedPatient.riskLevel === 'high' ? 'bg-red-100 text-red-700' :
                    selectedPatient.riskLevel === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {selectedPatient.riskLevel} risk patient
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Assessment Scores Radar Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md p-4 lg:p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Assessment Scores</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={assessmentScores}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} />
                    <Radar 
                      name="Score" 
                      dataKey="A" 
                      stroke={COLORS.primary} 
                      fill={COLORS.primary} 
                      fillOpacity={0.6} 
                    />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Therapy Distribution */}
            <div className="bg-white rounded-lg shadow-md p-4 lg:p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Therapy Distribution</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={therapyDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={(entry) => `${entry.name}: ${entry.value}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {therapyDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Detailed Tab */}
      {activeTab === 'detailed' && (
        <div className="space-y-6">
          {/* Category Selector */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex flex-wrap gap-2">
              {['overall', 'mood', 'anxiety', 'sleep', 'medication', 'therapy'].map((metric) => (
                <button
                  key={metric}
                  onClick={() => setSelectedMetric(metric)}
                  className={`px-4 py-2 rounded-lg font-medium capitalize transition-colors ${
                    selectedMetric === metric 
                      ? 'bg-serene-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {metric}
                </button>
              ))}
            </div>
          </div>

          {/* Detailed Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Bar Chart */}
            <div className="bg-white rounded-lg shadow-md p-4 lg:p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {selectedMetric.charAt(0).toUpperCase() + selectedMetric.slice(1)} Analysis
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={progressData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey={selectedMetric} fill={COLORS.primary} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Area Chart */}
            <div className="bg-white rounded-lg shadow-md p-4 lg:p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Cumulative Progress</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={progressData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area 
                      type="monotone" 
                      dataKey={selectedMetric} 
                      stroke={COLORS.secondary} 
                      fill={COLORS.secondary} 
                      fillOpacity={0.6}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Statistics Summary */}
          <div className="bg-white rounded-lg shadow-md p-4 lg:p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Statistical Summary</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Average</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">72.5</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Highest</p>
                <p className="text-2xl font-bold text-growth-green-600 mt-1">94</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Lowest</p>
                <p className="text-2xl font-bold text-red-600 mt-1">48</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Trend</p>
                <p className="text-2xl font-bold text-serene-blue-600 mt-1">↑ 15%</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Goals Tab */}
      {activeTab === 'goals' && (
        <div className="space-y-6">
          {/* Active Goals */}
          <div className="bg-white rounded-lg shadow-md p-4 lg:p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Active Goals</h3>
              <button 
                onClick={() => setShowAddGoalModal(true)}
                className="no-print px-4 py-2 bg-serene-blue-600 text-white rounded-lg hover:bg-serene-blue-700 transition-colors"
              >
                <i className="fas fa-plus mr-2"></i>Add Goal
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[...goals, ...userGoals].map((goal) => (
                <GoalProgress key={goal.id} goal={goal} />
              ))}
            </div>
          </div>

          {/* Goal Achievement History */}
          <div className="bg-white rounded-lg shadow-md p-4 lg:p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Achievement History</h3>
            <div className="space-y-3">
              {[
                { date: '2025-01-20', goal: 'Complete 30 days of meditation', status: 'completed' },
                { date: '2025-01-15', goal: 'Reduce anxiety score below 5', status: 'completed' },
                { date: '2025-01-10', goal: 'Attend all therapy sessions', status: 'completed' },
                { date: '2025-01-05', goal: 'Establish sleep routine', status: 'partial' }
              ].map((achievement, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <i className={`fas ${
                      achievement.status === 'completed' ? 'fa-check-circle text-growth-green-600' : 
                      'fa-exclamation-circle text-yellow-600'
                    } mr-3`}></i>
                    <div>
                      <p className="font-medium text-gray-900">{achievement.goal}</p>
                      <p className="text-sm text-gray-500">{achievement.date}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    achievement.status === 'completed' 
                      ? 'bg-growth-green-100 text-growth-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {achievement.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Milestones Tab */}
      {activeTab === 'milestones' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Milestone Timeline */}
          <div className="bg-white rounded-lg shadow-md p-4 lg:p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Treatment Milestones</h3>
            <MilestoneTimeline milestones={milestones} />
          </div>

          {/* Upcoming Milestones */}
          <div className="bg-white rounded-lg shadow-md p-4 lg:p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Upcoming Events</h3>
            <div className="space-y-4">
              {milestones.filter(m => !m.completed).map((milestone) => (
                <div key={milestone.id} className="border-l-4 border-serene-blue-500 pl-4 py-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-900">{milestone.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Scheduled for {new Date(milestone.date).toLocaleDateString('en-US', { 
                          month: 'long', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })}
                      </p>
                    </div>
                    <button 
                      onClick={() => toggleNotification(milestone.id)}
                      className={`transition-colors ${
                        notifications[milestone.id] 
                          ? 'text-serene-blue-600' 
                          : 'text-gray-400 hover:text-serene-blue-600'
                      }`}
                    >
                      <i className={`fas fa-bell${notifications[milestone.id] ? '' : '-slash'}`}></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Milestone Button */}
            <button 
              onClick={() => setShowAddMilestoneModal(true)}
              className="w-full mt-6 px-4 py-2 border-2 border-dashed border-gray-300 text-gray-600 rounded-lg hover:border-serene-blue-500 hover:text-serene-blue-600 transition-colors"
            >
              <i className="fas fa-plus mr-2"></i>Add Milestone
            </button>
          </div>
        </div>
      )}

      {/* Export/Share Options */}
      <div className="no-print mt-6 bg-white rounded-lg shadow-sm p-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            {/* Quick Patient Switcher */}
            {selectedPatient && patients.length > 1 && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const currentIndex = patients.findIndex(p => p.id === selectedPatient.id);
                    const prevIndex = currentIndex > 0 ? currentIndex - 1 : patients.length - 1;
                    setSelectedPatient(patients[prevIndex]);
                  }}
                  className="p-2 text-gray-600 hover:text-serene-blue-600 transition-colors"
                >
                  <i className="fas fa-chevron-left"></i>
                </button>
                <span className="text-sm text-gray-600">
                  Patient {patients.findIndex(p => p.id === selectedPatient.id) + 1} of {patients.length}
                </span>
                <button
                  onClick={() => {
                    const currentIndex = patients.findIndex(p => p.id === selectedPatient.id);
                    const nextIndex = currentIndex < patients.length - 1 ? currentIndex + 1 : 0;
                    setSelectedPatient(patients[nextIndex]);
                  }}
                  className="p-2 text-gray-600 hover:text-serene-blue-600 transition-colors"
                >
                  <i className="fas fa-chevron-right"></i>
                </button>
              </div>
            )}
            <div className="text-sm text-gray-600">
              Last updated: {new Date().toLocaleString('en-US', { 
                month: 'short', 
                day: 'numeric', 
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </div>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => setShowExportModal(true)}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <i className="fas fa-download mr-2"></i>
              {selectedPatient ? 'Export Patient Report' : 'Export PDF'}
            </button>
            <button 
              onClick={() => setShowShareModal(true)}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <i className="fas fa-share-alt mr-2"></i>
              {selectedPatient ? 'Share with Team' : 'Share'}
            </button>
            <button 
              onClick={handlePrint}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <i className="fas fa-print mr-2"></i>Print
            </button>
            {selectedPatient && (
              <button 
                onClick={() => setShowEmailModal(true)}
                className="px-4 py-2 bg-serene-blue-100 text-serene-blue-700 rounded-lg hover:bg-serene-blue-200 transition-colors"
              >
                <i className="fas fa-envelope mr-2"></i>Email to Patient
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressTracking;