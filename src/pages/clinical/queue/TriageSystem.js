import React, { useState, useEffect, useCallback, useMemo } from 'react';
import './TriageSystem.css';
import { 
  AlertTriangle, 
  Clock, 
  User, 
  Activity, 
  Calendar,
  ChevronRight,
  Filter,
  Search,
  Bell,
  AlertCircle,
  CheckCircle,
  XCircle,
  Heart,
  Brain,
  FileText,
  UserCheck,
  Timer
} from 'lucide-react';

/**
 * TriageSystem Component
 * Based on Manchester Triage System (MTS) and Emergency Room Priority Queue implementations
 * References: 
 * - GitHub: emergencyRoomTriageSim (Priority Queue Implementation)
 * - GitHub: EmergencyRiskClassificationWithHeapPriorityQueue (Manchester Triage System)
 * - React Queue Management patterns from react-queue and react-use-queue
 */

const TriageSystem = () => {
  // Priority levels based on emergency triage standards
  const PRIORITY_LEVELS = {
    EMERGENCY: { 
      level: 1, 
      name: 'Emergency', 
      color: 'bg-red-500', 
      borderColor: 'border-red-500',
      textColor: 'text-red-600',
      bgLight: 'bg-red-50',
      maxWait: '0 min',
      description: 'Immediate life-threatening condition'
    },
    URGENT: { 
      level: 2, 
      name: 'Urgent', 
      color: 'bg-orange-500', 
      borderColor: 'border-orange-500',
      textColor: 'text-orange-600',
      bgLight: 'bg-orange-50',
      maxWait: '10 min',
      description: 'Very urgent, cannot wait'
    },
    SEMI_URGENT: { 
      level: 3, 
      name: 'Semi-Urgent', 
      color: 'bg-yellow-500', 
      borderColor: 'border-yellow-500',
      textColor: 'text-yellow-600',
      bgLight: 'bg-yellow-50',
      maxWait: '60 min',
      description: 'Urgent, can wait briefly'
    },
    STANDARD: { 
      level: 4, 
      name: 'Standard', 
      color: 'bg-green-500', 
      borderColor: 'border-green-500',
      textColor: 'text-green-600',
      bgLight: 'bg-green-50',
      maxWait: '120 min',
      description: 'Standard consultation'
    },
    NON_URGENT: { 
      level: 5, 
      name: 'Non-Urgent', 
      color: 'bg-blue-500', 
      borderColor: 'border-blue-500',
      textColor: 'text-blue-600',
      bgLight: 'bg-blue-50',
      maxWait: '240 min',
      description: 'Non-urgent, routine care'
    }
  };

  // Triage criteria for mental health assessment
  const TRIAGE_CRITERIA = {
    EMERGENCY: [
      'Active suicidal ideation with plan',
      'Active homicidal ideation',
      'Acute psychosis with agitation',
      'Severe self-harm',
      'Catatonia',
      'Severe drug/alcohol intoxication'
    ],
    URGENT: [
      'Suicidal ideation without immediate plan',
      'Moderate agitation or distress',
      'Acute anxiety/panic attacks',
      'Recent trauma exposure',
      'Severe depression with functional impairment',
      'Acute manic episode'
    ],
    SEMI_URGENT: [
      'Depression affecting daily life',
      'Anxiety disorders',
      'Substance use concerns',
      'Medication side effects',
      'Behavioral problems',
      'Sleep disorders'
    ],
    STANDARD: [
      'Medication refills',
      'Follow-up appointments',
      'Therapy requests',
      'Stable chronic conditions',
      'Assessment requests',
      'Documentation needs'
    ]
  };

  // State management
  const [patients, setPatients] = useState([]);
  const [selectedPriority, setSelectedPriority] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showAddPatient, setShowAddPatient] = useState(false);
  const [refreshInterval, setRefreshInterval] = useState(30000); // 30 seconds
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const [filterStatus, setFilterStatus] = useState('waiting'); // waiting, in-progress, completed
  
  // New patient form state
  const [newPatient, setNewPatient] = useState({
    name: '',
    age: '',
    gender: '',
    chiefComplaint: '',
    vitalSigns: {
      bp: '',
      pulse: '',
      temp: '',
      resp: ''
    },
    symptoms: [],
    priority: 'STANDARD',
    arrivalTime: new Date()
  });

  // Priority Queue Implementation (Heap-based)
  class PriorityQueue {
    constructor() {
      this.heap = [];
    }

    enqueue(patient) {
      this.heap.push(patient);
      this.bubbleUp(this.heap.length - 1);
    }

    dequeue() {
      if (this.heap.length === 0) return null;
      if (this.heap.length === 1) return this.heap.pop();
      
      const min = this.heap[0];
      this.heap[0] = this.heap.pop();
      this.bubbleDown(0);
      return min;
    }

    bubbleUp(index) {
      while (index > 0) {
        const parentIndex = Math.floor((index - 1) / 2);
        if (this.compare(this.heap[index], this.heap[parentIndex]) < 0) {
          [this.heap[index], this.heap[parentIndex]] = 
          [this.heap[parentIndex], this.heap[index]];
          index = parentIndex;
        } else {
          break;
        }
      }
    }

    bubbleDown(index) {
      while (true) {
        const leftChild = 2 * index + 1;
        const rightChild = 2 * index + 2;
        let smallest = index;

        if (leftChild < this.heap.length && 
            this.compare(this.heap[leftChild], this.heap[smallest]) < 0) {
          smallest = leftChild;
        }

        if (rightChild < this.heap.length && 
            this.compare(this.heap[rightChild], this.heap[smallest]) < 0) {
          smallest = rightChild;
        }

        if (smallest !== index) {
          [this.heap[index], this.heap[smallest]] = 
          [this.heap[smallest], this.heap[index]];
          index = smallest;
        } else {
          break;
        }
      }
    }

    compare(a, b) {
      // Compare by priority level first, then by arrival time
      if (a.priorityLevel !== b.priorityLevel) {
        return a.priorityLevel - b.priorityLevel;
      }
      return new Date(a.arrivalTime) - new Date(b.arrivalTime);
    }

    getAll() {
      return [...this.heap].sort((a, b) => this.compare(a, b));
    }
  }

  const [queue] = useState(new PriorityQueue());

  // Load sample data on mount
  useEffect(() => {
    const samplePatients = [
      {
        id: 1,
        name: 'John Doe',
        age: 35,
        gender: 'Male',
        tokenNumber: 'TRG-001',
        chiefComplaint: 'Severe anxiety with panic attacks',
        symptoms: ['Chest pain', 'Shortness of breath', 'Trembling'],
        priority: 'URGENT',
        priorityLevel: PRIORITY_LEVELS.URGENT.level,
        arrivalTime: new Date(Date.now() - 15 * 60000),
        waitTime: 15,
        status: 'waiting',
        vitalSigns: { bp: '140/90', pulse: '110', temp: '98.6', resp: '22' }
      },
      {
        id: 2,
        name: 'Jane Smith',
        age: 28,
        gender: 'Female',
        tokenNumber: 'TRG-002',
        chiefComplaint: 'Depression follow-up',
        symptoms: ['Low mood', 'Fatigue'],
        priority: 'STANDARD',
        priorityLevel: PRIORITY_LEVELS.STANDARD.level,
        arrivalTime: new Date(Date.now() - 30 * 60000),
        waitTime: 30,
        status: 'waiting',
        vitalSigns: { bp: '120/80', pulse: '72', temp: '98.4', resp: '16' }
      },
      {
        id: 3,
        name: 'Robert Johnson',
        age: 42,
        gender: 'Male',
        tokenNumber: 'TRG-003',
        chiefComplaint: 'Suicidal ideation with plan',
        symptoms: ['Severe depression', 'Hopelessness', 'Insomnia'],
        priority: 'EMERGENCY',
        priorityLevel: PRIORITY_LEVELS.EMERGENCY.level,
        arrivalTime: new Date(Date.now() - 5 * 60000),
        waitTime: 5,
        status: 'in-progress',
        vitalSigns: { bp: '130/85', pulse: '88', temp: '98.5', resp: '18' }
      }
    ];

    samplePatients.forEach(patient => queue.enqueue(patient));
    setPatients(queue.getAll());
  }, []);

  // Auto-refresh queue
  useEffect(() => {
    const interval = setInterval(() => {
      // Update wait times
      setPatients(prevPatients => 
        prevPatients.map(patient => ({
          ...patient,
          waitTime: Math.floor((Date.now() - new Date(patient.arrivalTime)) / 60000)
        }))
      );
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [refreshInterval]);

  // Filter patients based on search and priority
  const filteredPatients = useMemo(() => {
    return patients.filter(patient => {
      const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           patient.tokenNumber.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPriority = selectedPriority === 'ALL' || patient.priority === selectedPriority;
      const matchesStatus = filterStatus === 'all' || patient.status === filterStatus;
      
      return matchesSearch && matchesPriority && matchesStatus;
    });
  }, [patients, searchTerm, selectedPriority, filterStatus]);

  // Statistics calculation
  const statistics = useMemo(() => {
    const stats = {
      total: patients.length,
      emergency: patients.filter(p => p.priority === 'EMERGENCY').length,
      urgent: patients.filter(p => p.priority === 'URGENT').length,
      semiUrgent: patients.filter(p => p.priority === 'SEMI_URGENT').length,
      standard: patients.filter(p => p.priority === 'STANDARD').length,
      nonUrgent: patients.filter(p => p.priority === 'NON_URGENT').length,
      avgWaitTime: patients.reduce((acc, p) => acc + p.waitTime, 0) / patients.length || 0,
      inProgress: patients.filter(p => p.status === 'in-progress').length,
      waiting: patients.filter(p => p.status === 'waiting').length
    };
    return stats;
  }, [patients]);

  // Add new patient to queue
  const handleAddPatient = useCallback(() => {
    const patient = {
      ...newPatient,
      id: Date.now(),
      tokenNumber: `TRG-${String(patients.length + 1).padStart(3, '0')}`,
      priorityLevel: PRIORITY_LEVELS[newPatient.priority].level,
      waitTime: 0,
      status: 'waiting',
      arrivalTime: new Date()
    };

    queue.enqueue(patient);
    setPatients(queue.getAll());
    setShowAddPatient(false);
    setNewPatient({
      name: '',
      age: '',
      gender: '',
      chiefComplaint: '',
      vitalSigns: { bp: '', pulse: '', temp: '', resp: '' },
      symptoms: [],
      priority: 'STANDARD',
      arrivalTime: new Date()
    });
  }, [newPatient, patients, queue]);

  // Update patient status
  const updatePatientStatus = useCallback((patientId, newStatus) => {
    setPatients(prevPatients =>
      prevPatients.map(patient =>
        patient.id === patientId ? { ...patient, status: newStatus } : patient
      )
    );
  }, []);

  // Patient Card Component
  const PatientCard = ({ patient }) => {
    const priority = PRIORITY_LEVELS[patient.priority];
    
    return (
      <div 
        className={`bg-white rounded-lg shadow-md border-l-4 ${priority.borderColor} 
                   hover:shadow-lg transition-all duration-200 cursor-pointer
                   transform hover:scale-102`}
        onClick={() => setSelectedPatient(patient)}
      >
        <div className={`${priority.bgLight} p-3 rounded-t-lg`}>
          <div className="flex justify-between items-center">
            <span className={`font-bold ${priority.textColor} text-sm`}>
              {priority.name}
            </span>
            <span className="text-gray-500 text-xs">
              {patient.tokenNumber}
            </span>
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <User className="w-5 h-5 text-gray-400" />
              <div>
                <p className="font-semibold text-gray-800">{patient.name}</p>
                <p className="text-xs text-gray-500">
                  {patient.age} yrs, {patient.gender}
                </p>
              </div>
            </div>
            {patient.status === 'in-progress' && (
              <span className="px-2 py-1 bg-green-100 text-green-600 text-xs rounded-full">
                In Progress
              </span>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-start space-x-2">
              <AlertCircle className="w-4 h-4 text-gray-400 mt-0.5" />
              <p className="text-sm text-gray-700 line-clamp-2">
                {patient.chiefComplaint}
              </p>
            </div>
            
            <div className="flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center space-x-1">
                <Clock className="w-3 h-3" />
                <span>Wait: {patient.waitTime} min</span>
              </div>
              <div className="flex items-center space-x-1">
                <Activity className="w-3 h-3" />
                <span>BP: {patient.vitalSigns.bp}</span>
              </div>
            </div>
          </div>

          <div className="mt-3 flex space-x-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                updatePatientStatus(patient.id, 'in-progress');
              }}
              className="flex-1 px-3 py-1 bg-blue-500 text-white text-xs rounded 
                       hover:bg-blue-600 transition-colors"
              disabled={patient.status === 'in-progress'}
            >
              Start Consultation
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedPatient(patient);
              }}
              className="px-3 py-1 border border-gray-300 text-gray-600 text-xs 
                       rounded hover:bg-gray-50 transition-colors"
            >
              Details
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Patient Detail Modal
  const PatientDetailModal = ({ patient, onClose }) => {
    if (!patient) return null;
    
    const priority = PRIORITY_LEVELS[patient.priority];
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center 
                    z-50 p-4 animate-fadeIn">
        <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] 
                      overflow-y-auto">
          <div className={`${priority.bgLight} p-4 border-b sticky top-0`}>
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800">
                Patient Details - {patient.tokenNumber}
              </h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Patient Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-gray-700 mb-2 flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  Personal Information
                </h3>
                <div className="space-y-1 text-sm">
                  <p><span className="text-gray-500">Name:</span> {patient.name}</p>
                  <p><span className="text-gray-500">Age:</span> {patient.age} years</p>
                  <p><span className="text-gray-500">Gender:</span> {patient.gender}</p>
                  <p><span className="text-gray-500">Token:</span> {patient.tokenNumber}</p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-700 mb-2 flex items-center">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Triage Information
                </h3>
                <div className="space-y-1 text-sm">
                  <p className="flex items-center">
                    <span className="text-gray-500">Priority:</span>
                    <span className={`ml-2 px-2 py-0.5 rounded text-xs font-semibold 
                                   ${priority.color} text-white`}>
                      {priority.name}
                    </span>
                  </p>
                  <p><span className="text-gray-500">Max Wait:</span> {priority.maxWait}</p>
                  <p><span className="text-gray-500">Current Wait:</span> {patient.waitTime} min</p>
                  <p><span className="text-gray-500">Status:</span> 
                    <span className={`ml-2 capitalize ${
                      patient.status === 'in-progress' ? 'text-green-600' : 
                      patient.status === 'waiting' ? 'text-yellow-600' : 'text-gray-600'
                    }`}>
                      {patient.status.replace('-', ' ')}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Chief Complaint */}
            <div>
              <h3 className="font-semibold text-gray-700 mb-2 flex items-center">
                <Brain className="w-4 h-4 mr-2" />
                Chief Complaint
              </h3>
              <p className="text-sm bg-gray-50 p-3 rounded">
                {patient.chiefComplaint}
              </p>
            </div>

            {/* Symptoms */}
            {patient.symptoms && patient.symptoms.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-700 mb-2 flex items-center">
                  <FileText className="w-4 h-4 mr-2" />
                  Presenting Symptoms
                </h3>
                <div className="flex flex-wrap gap-2">
                  {patient.symptoms.map((symptom, index) => (
                    <span key={index} 
                          className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                      {symptom}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Vital Signs */}
            <div>
              <h3 className="font-semibold text-gray-700 mb-2 flex items-center">
                <Activity className="w-4 h-4 mr-2" />
                Vital Signs
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-gray-50 p-3 rounded text-center">
                  <p className="text-xs text-gray-500">Blood Pressure</p>
                  <p className="font-semibold">{patient.vitalSigns.bp}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded text-center">
                  <p className="text-xs text-gray-500">Pulse</p>
                  <p className="font-semibold">{patient.vitalSigns.pulse} bpm</p>
                </div>
                <div className="bg-gray-50 p-3 rounded text-center">
                  <p className="text-xs text-gray-500">Temperature</p>
                  <p className="font-semibold">{patient.vitalSigns.temp}°F</p>
                </div>
                <div className="bg-gray-50 p-3 rounded text-center">
                  <p className="text-xs text-gray-500">Respiration</p>
                  <p className="font-semibold">{patient.vitalSigns.resp}/min</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3 pt-4 border-t">
              <button
                onClick={() => {
                  updatePatientStatus(patient.id, 'in-progress');
                  onClose();
                }}
                className="flex-1 px-4 py-2 bg-blue-500 text-white rounded 
                         hover:bg-blue-600 transition-colors"
                disabled={patient.status === 'in-progress'}
              >
                Start Consultation
              </button>
              <button
                onClick={() => {
                  updatePatientStatus(patient.id, 'completed');
                  onClose();
                }}
                className="flex-1 px-4 py-2 bg-green-500 text-white rounded 
                         hover:bg-green-600 transition-colors"
              >
                Mark Complete
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 text-gray-600 rounded 
                         hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Main Render
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <Heart className="w-8 h-8 mr-3 text-red-500" />
                Emergency Triage System
              </h1>
              <p className="text-gray-600 mt-2">
                Mental Health OPD - Priority Queue Management
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-3">
              <button
                onClick={() => setShowAddPatient(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg 
                         hover:bg-blue-600 transition-colors flex items-center"
              >
                <UserCheck className="w-4 h-4 mr-2" />
                Add Patient
              </button>
              <button
                onClick={() => setPatients(queue.getAll())}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg 
                         hover:bg-gray-50 transition-colors flex items-center"
              >
                <Timer className="w-4 h-4 mr-2" />
                Refresh Queue
              </button>
            </div>
          </div>
        </div>

        {/* Statistics Dashboard */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">Total Patients</p>
                <p className="text-2xl font-bold text-gray-900">{statistics.total}</p>
              </div>
              <User className="w-8 h-8 text-gray-300" />
            </div>
          </div>

          <div className="bg-red-50 rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-red-600">Emergency</p>
                <p className="text-2xl font-bold text-red-700">{statistics.emergency}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-300" />
            </div>
          </div>

          <div className="bg-orange-50 rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-orange-600">Urgent</p>
                <p className="text-2xl font-bold text-orange-700">{statistics.urgent}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-orange-300" />
            </div>
          </div>

          <div className="bg-yellow-50 rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-yellow-600">Semi-Urgent</p>
                <p className="text-2xl font-bold text-yellow-700">{statistics.semiUrgent}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-300" />
            </div>
          </div>

          <div className="bg-green-50 rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-green-600">In Progress</p>
                <p className="text-2xl font-bold text-green-700">{statistics.inProgress}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-300" />
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-blue-600">Avg Wait</p>
                <p className="text-2xl font-bold text-blue-700">
                  {Math.round(statistics.avgWaitTime)}m
                </p>
              </div>
              <Timer className="w-8 h-8 text-blue-300" />
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 
                               text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by name or token..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg 
                           focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Priority Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none 
                         focus:ring-2 focus:ring-blue-500"
              >
                <option value="ALL">All Priorities</option>
                <option value="EMERGENCY">Emergency</option>
                <option value="URGENT">Urgent</option>
                <option value="SEMI_URGENT">Semi-Urgent</option>
                <option value="STANDARD">Standard</option>
                <option value="NON_URGENT">Non-Urgent</option>
              </select>
            </div>

            {/* Status Filter */}
            <div className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none 
                         focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="waiting">Waiting</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-2 rounded ${
                  viewMode === 'grid' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                } transition-colors`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-2 rounded ${
                  viewMode === 'list' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                } transition-colors`}
              >
                List
              </button>
            </div>
          </div>
        </div>

        {/* Patient Queue */}
        <div className={viewMode === 'grid' 
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" 
          : "space-y-4"}>
          {filteredPatients.map((patient) => (
            <PatientCard key={patient.id} patient={patient} />
          ))}
        </div>

        {filteredPatients.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <p className="text-gray-500">No patients found matching your criteria</p>
          </div>
        )}

        {/* Add Patient Modal */}
        {showAddPatient && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center 
                        justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] 
                          overflow-y-auto">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Add New Patient to Triage
                </h2>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Patient Name
                      </label>
                      <input
                        type="text"
                        value={newPatient.name}
                        onChange={(e) => setNewPatient({...newPatient, name: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg 
                                 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Age
                        </label>
                        <input
                          type="number"
                          value={newPatient.age}
                          onChange={(e) => setNewPatient({...newPatient, age: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg 
                                   focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Gender
                        </label>
                        <select
                          value={newPatient.gender}
                          onChange={(e) => setNewPatient({...newPatient, gender: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg 
                                   focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        >
                          <option value="">Select</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Chief Complaint
                    </label>
                    <textarea
                      value={newPatient.chiefComplaint}
                      onChange={(e) => setNewPatient({...newPatient, chiefComplaint: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg 
                               focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows="3"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Priority Level
                    </label>
                    <select
                      value={newPatient.priority}
                      onChange={(e) => setNewPatient({...newPatient, priority: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg 
                               focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      {Object.entries(PRIORITY_LEVELS).map(([key, value]) => (
                        <option key={key} value={key}>
                          {value.name} - {value.description}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Vital Signs
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      <input
                        type="text"
                        placeholder="BP (e.g., 120/80)"
                        value={newPatient.vitalSigns.bp}
                        onChange={(e) => setNewPatient({
                          ...newPatient, 
                          vitalSigns: {...newPatient.vitalSigns, bp: e.target.value}
                        })}
                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm
                                 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="text"
                        placeholder="Pulse"
                        value={newPatient.vitalSigns.pulse}
                        onChange={(e) => setNewPatient({
                          ...newPatient, 
                          vitalSigns: {...newPatient.vitalSigns, pulse: e.target.value}
                        })}
                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm
                                 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="text"
                        placeholder="Temp (°F)"
                        value={newPatient.vitalSigns.temp}
                        onChange={(e) => setNewPatient({
                          ...newPatient, 
                          vitalSigns: {...newPatient.vitalSigns, temp: e.target.value}
                        })}
                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm
                                 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="text"
                        placeholder="Resp Rate"
                        value={newPatient.vitalSigns.resp}
                        onChange={(e) => setNewPatient({
                          ...newPatient, 
                          vitalSigns: {...newPatient.vitalSigns, resp: e.target.value}
                        })}
                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm
                                 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="flex space-x-3 pt-4">
                    <button
                      onClick={handleAddPatient}
                      disabled={!newPatient.name || !newPatient.age || !newPatient.gender || 
                               !newPatient.chiefComplaint}
                      className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg 
                               hover:bg-blue-600 transition-colors disabled:bg-gray-300 
                               disabled:cursor-not-allowed"
                    >
                      Add to Queue
                    </button>
                    <button
                      onClick={() => setShowAddPatient(false)}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg 
                               hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Patient Detail Modal */}
        {selectedPatient && (
          <PatientDetailModal
            patient={selectedPatient}
            onClose={() => setSelectedPatient(null)}
          />
        )}
      </div>
    </div>
  );
};

export default TriageSystem;