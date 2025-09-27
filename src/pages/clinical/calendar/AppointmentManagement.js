import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Calendar, Clock, User, Phone, Mail, Video, MapPin, Filter, Search, ChevronLeft, ChevronRight, Plus, Edit2, Trash2, X, Check, AlertCircle, Info, Users, Activity, FileText, Stethoscope } from 'lucide-react';

/**
 * Enhanced AppointmentManagement Component
 * 
 * Features:
 * - Events displayed inside calendar cells
 * - Clickable appointments with detail modal
 * - Monthly, Weekly, and Daily calendar views with events
 * - Time-slot based scheduling
 * - Responsive design optimized for tablets
 */

const AppointmentManagement = () => {
  // State Management
  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date(2025, 8, 27)); // September 27, 2025 (month is 0-indexed)
  const [viewType, setViewType] = useState('month'); // month, week, day, list
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Enhanced mock data with appointments in September and October 2025
  const mockAppointments = [
    {
      id: 1,
      patientName: 'John Doe',
      patientId: 'P001',
      date: '2025-09-27',
      time: '10:00',
      endTime: '11:00',
      duration: 60,
      type: 'consultation',
      status: 'confirmed',
      consultationType: 'in-person',
      phone: '+91 98765 43210',
      email: 'john.doe@example.com',
      notes: 'First consultation - Depression symptoms',
      doctor: 'Dr. Sarah Smith',
      color: '#3B82F6'
    },
    {
      id: 2,
      patientName: 'Jane Smith',
      patientId: 'P002',
      date: '2025-09-27',
      time: '11:30',
      endTime: '12:15',
      duration: 45,
      type: 'follow-up',
      status: 'pending',
      consultationType: 'video',
      phone: '+91 98765 43211',
      email: 'jane.smith@example.com',
      notes: 'Follow-up session - Anxiety management',
      doctor: 'Dr. Sarah Smith',
      color: '#10B981'
    },
    {
      id: 3,
      patientName: 'Robert Johnson',
      patientId: 'P003',
      date: '2025-09-29',
      time: '14:00',
      endTime: '15:00',
      duration: 60,
      type: 'therapy',
      status: 'confirmed',
      consultationType: 'in-person',
      phone: '+91 98765 43212',
      email: 'robert.j@example.com',
      notes: 'Therapy session - Stress management',
      doctor: 'Dr. Sarah Smith',
      color: '#8B5CF6'
    },
    {
      id: 4,
      patientName: 'Emily Davis',
      patientId: 'P004',
      date: '2025-09-30',
      time: '14:30',
      endTime: '15:30',
      duration: 60,
      type: 'assessment',
      status: 'confirmed',
      consultationType: 'in-person',
      phone: '+91 98765 43213',
      email: 'emily.d@example.com',
      notes: 'Initial psychological assessment',
      doctor: 'Dr. Sarah Smith',
      color: '#EF4444'
    },
    {
      id: 5,
      patientName: 'Michael Chen',
      patientId: 'P005',
      date: '2025-10-01',
      time: '09:00',
      endTime: '09:45',
      duration: 45,
      type: 'follow-up',
      status: 'confirmed',
      consultationType: 'video',
      phone: '+91 98765 43214',
      email: 'michael.c@example.com',
      notes: 'Medication review and adjustment',
      doctor: 'Dr. Sarah Smith',
      color: '#F59E0B'
    },
    {
      id: 6,
      patientName: 'Sarah Wilson',
      patientId: 'P006',
      date: '2025-10-03',
      time: '11:00',
      endTime: '12:00',
      duration: 60,
      type: 'therapy',
      status: 'confirmed',
      consultationType: 'in-person',
      phone: '+91 98765 43215',
      email: 'sarah.w@example.com',
      notes: 'CBT session - Week 3',
      doctor: 'Dr. Sarah Smith',
      color: '#06B6D4'
    },
    {
      id: 7,
      patientName: 'David Brown',
      patientId: 'P007',
      date: '2025-10-06',
      time: '15:00',
      endTime: '16:00',
      duration: 60,
      type: 'consultation',
      status: 'pending',
      consultationType: 'in-person',
      phone: '+91 98765 43216',
      email: 'david.b@example.com',
      notes: 'Family therapy session',
      doctor: 'Dr. Sarah Smith',
      color: '#EC4899'
    },
    {
      id: 8,
      patientName: 'Lisa Anderson',
      patientId: 'P008',
      date: '2025-09-25',
      time: '10:30',
      endTime: '11:30',
      duration: 60,
      type: 'therapy',
      status: 'confirmed',
      consultationType: 'video',
      phone: '+91 98765 43217',
      email: 'lisa.a@example.com',
      notes: 'Group therapy preparation session',
      doctor: 'Dr. Sarah Smith',
      color: '#8B5CF6'
    },
    {
      id: 9,
      patientName: 'James Miller',
      patientId: 'P009',
      date: '2025-09-26',
      time: '13:00',
      endTime: '14:00',
      duration: 60,
      type: 'consultation',
      status: 'confirmed',
      consultationType: 'in-person',
      phone: '+91 98765 43218',
      email: 'james.m@example.com',
      notes: 'Initial consultation - ADHD evaluation',
      doctor: 'Dr. Sarah Smith',
      color: '#06B6D4'
    },
    {
      id: 10,
      patientName: 'Patricia Garcia',
      patientId: 'P010',
      date: '2025-10-02',
      time: '11:00',
      endTime: '11:45',
      duration: 45,
      type: 'follow-up',
      status: 'pending',
      consultationType: 'phone',
      phone: '+91 98765 43219',
      email: 'patricia.g@example.com',
      notes: 'Medication follow-up call',
      doctor: 'Dr. Sarah Smith',
      color: '#F59E0B'
    },
    {
      id: 11,
      patientName: 'William Lee',
      patientId: 'P011',
      date: '2025-10-07',
      time: '09:30',
      endTime: '10:30',
      duration: 60,
      type: 'assessment',
      status: 'confirmed',
      consultationType: 'in-person',
      phone: '+91 98765 43220',
      email: 'william.l@example.com',
      notes: 'Comprehensive psychological assessment',
      doctor: 'Dr. Sarah Smith',
      color: '#EF4444'
    },
    {
      id: 12,
      patientName: 'Jennifer White',
      patientId: 'P012',
      date: '2025-10-08',
      time: '14:00',
      endTime: '15:00',
      duration: 60,
      type: 'therapy',
      status: 'confirmed',
      consultationType: 'video',
      phone: '+91 98765 43221',
      email: 'jennifer.w@example.com',
      notes: 'DBT skills training session',
      doctor: 'Dr. Sarah Smith',
      color: '#10B981'
    },
    {
      id: 13,
      patientName: 'Christopher Martin',
      patientId: 'P013',
      date: '2025-10-10',
      time: '10:00',
      endTime: '11:00',
      duration: 60,
      type: 'consultation',
      status: 'confirmed',
      consultationType: 'in-person',
      phone: '+91 98765 43222',
      email: 'chris.m@example.com',
      notes: 'Sleep disorder consultation',
      doctor: 'Dr. Sarah Smith',
      color: '#3B82F6'
    },
    {
      id: 14,
      patientName: 'Amanda Thompson',
      patientId: 'P014',
      date: '2025-10-13',
      time: '15:30',
      endTime: '16:30',
      duration: 60,
      type: 'therapy',
      status: 'pending',
      consultationType: 'in-person',
      phone: '+91 98765 43223',
      email: 'amanda.t@example.com',
      notes: 'Couples therapy session',
      doctor: 'Dr. Sarah Smith',
      color: '#EC4899'
    },
    {
      id: 15,
      patientName: 'Daniel Rodriguez',
      patientId: 'P015',
      date: '2025-10-15',
      time: '11:30',
      endTime: '12:30',
      duration: 60,
      type: 'follow-up',
      status: 'confirmed',
      consultationType: 'video',
      phone: '+91 98765 43224',
      email: 'daniel.r@example.com',
      notes: 'Progress review - OCD treatment',
      doctor: 'Dr. Sarah Smith',
      color: '#8B5CF6'
    }
  ];

  // Load appointments on component mount
  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setAppointments(mockAppointments);
    } catch (err) {
      setError('Failed to load appointments');
    } finally {
      setLoading(false);
    }
  };

  // Filter appointments based on search and status
  const filteredAppointments = useMemo(() => {
    return appointments.filter(apt => {
      const matchesSearch = apt.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           apt.patientId.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = filterStatus === 'all' || apt.status === filterStatus;
      return matchesSearch && matchesStatus;
    });
  }, [appointments, searchQuery, filterStatus]);

  // Group appointments by date for calendar view
  const appointmentsByDate = useMemo(() => {
    const grouped = {};
    filteredAppointments.forEach(apt => {
      if (!grouped[apt.date]) {
        grouped[apt.date] = [];
      }
      grouped[apt.date].push(apt);
    });
    return grouped;
  }, [filteredAppointments]);

  // Get week dates for weekly view
  const getWeekDates = (date) => {
    const week = [];
    const startOfWeek = new Date(date);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day;
    startOfWeek.setDate(diff);
    
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      week.push(day);
    }
    return week;
  };

  // Time slots for day and week views
  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
  ];

  // Appointment Detail Modal
  const AppointmentDetailModal = ({ appointment }) => {
    if (!appointment) return null;

    const statusColors = {
      confirmed: 'bg-green-100 text-green-800 border-green-300',
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      cancelled: 'bg-red-100 text-red-800 border-red-300',
      completed: 'bg-blue-100 text-blue-800 border-blue-300'
    };

    const typeIcons = {
      consultation: <Stethoscope className="w-5 h-5" />,
      'follow-up': <Activity className="w-5 h-5" />,
      therapy: <Users className="w-5 h-5" />,
      assessment: <FileText className="w-5 h-5" />
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: appointment.color + '20' }}>
                  {typeIcons[appointment.type]}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Appointment Details</h2>
                  <p className="text-sm text-gray-600 mt-1">{appointment.type.charAt(0).toUpperCase() + appointment.type.slice(1)}</p>
                </div>
              </div>
              <button
                onClick={() => setShowDetailModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Status Badge */}
            <div className="mb-6">
              <span className={`px-4 py-2 rounded-full text-sm font-medium border ${statusColors[appointment.status]}`}>
                {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
              </span>
            </div>

            {/* Patient Information */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Patient Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Name</p>
                    <p className="font-medium text-gray-900">{appointment.patientName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 flex items-center justify-center text-gray-400">#</div>
                  <div>
                    <p className="text-sm text-gray-600">Patient ID</p>
                    <p className="font-medium text-gray-900">{appointment.patientId}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="font-medium text-gray-900">{appointment.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium text-gray-900">{appointment.email}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Appointment Details */}
            <div className="bg-blue-50 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Appointment Schedule</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-600">Date</p>
                    <p className="font-medium text-gray-900">
                      {new Date(appointment.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-600">Time</p>
                    <p className="font-medium text-gray-900">
                      {appointment.time} - {appointment.endTime} ({appointment.duration} mins)
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {appointment.consultationType === 'video' ? (
                    <Video className="w-5 h-5 text-blue-600" />
                  ) : (
                    <MapPin className="w-5 h-5 text-blue-600" />
                  )}
                  <div>
                    <p className="text-sm text-gray-600">Mode</p>
                    <p className="font-medium text-gray-900 capitalize">{appointment.consultationType}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-600">Provider</p>
                    <p className="font-medium text-gray-900">{appointment.doctor}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Notes */}
            {appointment.notes && (
              <div className="bg-yellow-50 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-gray-900 mb-2">Notes</h3>
                <p className="text-gray-700">{appointment.notes}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowDetailModal(false);
                  handleEditAppointment(appointment);
                }}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
              >
                <Edit2 className="w-4 h-4" />
                Edit
              </button>
              {appointment.consultationType === 'video' && appointment.status === 'confirmed' && (
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                  <Video className="w-4 h-4" />
                  Join Call
                </button>
              )}
              <button
                onClick={() => setShowDetailModal(false)}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Monthly Calendar View with Events
  const MonthlyCalendarView = () => {
    const daysInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1).getDay();
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    const handlePrevMonth = () => {
      setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1));
    };
    
    const handleNextMonth = () => {
      setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1));
    };

    const handleToday = () => {
      setSelectedDate(new Date(2025, 8, 27)); // September 27, 2025
    };

    return (
      <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <h3 className="text-xl font-bold text-gray-800">
              {selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </h3>
            <button
              onClick={handleToday}
              className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
            >
              Today
            </button>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handlePrevMonth}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNextMonth}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        {/* Days Header */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {days.map(day => (
            <div key={day} className="text-center text-sm font-semibold text-gray-600 py-2">
              {day}
            </div>
          ))}
        </div>
        
        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1">
          {/* Empty cells before first day */}
          {Array.from({ length: firstDayOfMonth }).map((_, i) => (
            <div key={`empty-${i}`} className="min-h-[100px] md:min-h-[120px]"></div>
          ))}
          
          {/* Days of month */}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const dateStr = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const dayAppointments = appointmentsByDate[dateStr] || [];
            const currentDate = new Date(2025, 8, 27); // September 27, 2025
            const isToday = currentDate.toDateString() === new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day).toDateString();
            
            return (
              <div
                key={day}
                className={`min-h-[100px] md:min-h-[120px] border border-gray-200 rounded-lg p-2 hover:bg-gray-50 cursor-pointer transition-colors ${
                  isToday ? 'bg-blue-50 border-blue-300' : ''
                }`}
                onClick={() => {
                  setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day));
                  setViewType('day');
                }}
              >
                <div className={`text-sm font-medium mb-1 ${isToday ? 'text-blue-600' : 'text-gray-700'}`}>
                  {day}
                </div>
                <div className="space-y-1">
                  {dayAppointments.slice(0, 3).map((apt) => (
                    <div
                      key={apt.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedAppointment(apt);
                        setShowDetailModal(true);
                      }}
                      className="px-2 py-1 rounded text-xs text-white cursor-pointer hover:opacity-90 transition-opacity truncate"
                      style={{ backgroundColor: apt.color }}
                      title={`${apt.time} - ${apt.patientName}`}
                    >
                      <span className="font-medium">{apt.time}</span> {apt.patientName}
                    </div>
                  ))}
                  {dayAppointments.length > 3 && (
                    <div className="text-xs text-gray-500 px-2">
                      +{dayAppointments.length - 3} more
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Weekly Calendar View with Events
  const WeeklyCalendarView = () => {
    const weekDates = getWeekDates(selectedDate);
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    const handlePrevWeek = () => {
      const newDate = new Date(selectedDate);
      newDate.setDate(newDate.getDate() - 7);
      setSelectedDate(newDate);
    };
    
    const handleNextWeek = () => {
      const newDate = new Date(selectedDate);
      newDate.setDate(newDate.getDate() + 7);
      setSelectedDate(newDate);
    };

    return (
      <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <h3 className="text-xl font-bold text-gray-800">
              Week of {weekDates[0].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {weekDates[6].toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </h3>
            <button
              onClick={() => setSelectedDate(new Date(2025, 8, 27))} // September 27, 2025
              className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
            >
              This Week
            </button>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handlePrevWeek}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNextWeek}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Week Grid */}
        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            {/* Days Header */}
            <div className="grid grid-cols-8 gap-2 mb-2">
              <div className="text-sm font-semibold text-gray-600 py-2">Time</div>
              {weekDates.map((date, i) => {
                const currentDate = new Date(2025, 8, 27); // September 27, 2025
                const isToday = currentDate.toDateString() === date.toDateString();
                return (
                  <div key={i} className={`text-center text-sm font-semibold py-2 rounded-lg ${isToday ? 'bg-blue-50 text-blue-700' : 'text-gray-600'}`}>
                    <div>{days[i]}</div>
                    <div className="text-lg">{date.getDate()}</div>
                  </div>
                );
              })}
            </div>

            {/* Time Slots */}
            <div className="border-t border-gray-200">
              {timeSlots.map(time => (
                <div key={time} className="grid grid-cols-8 gap-2 border-b border-gray-100">
                  <div className="text-sm text-gray-500 py-3 px-2">{time}</div>
                  {weekDates.map((date, i) => {
                    const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
                    const slotAppointments = (appointmentsByDate[dateStr] || []).filter(apt => apt.time === time);
                    
                    return (
                      <div key={i} className="py-2 px-1 min-h-[60px] hover:bg-gray-50 cursor-pointer border-l border-gray-100">
                        {slotAppointments.map(apt => (
                          <div
                            key={apt.id}
                            onClick={() => {
                              setSelectedAppointment(apt);
                              setShowDetailModal(true);
                            }}
                            className="p-2 rounded text-xs text-white cursor-pointer hover:opacity-90 transition-opacity"
                            style={{ backgroundColor: apt.color }}
                          >
                            <div className="font-medium">{apt.patientName}</div>
                            <div>{apt.type}</div>
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Daily Calendar View with Events
  const DailyCalendarView = () => {
    const dateStr = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;
    const dayAppointments = appointmentsByDate[dateStr] || [];
    
    const handlePrevDay = () => {
      const newDate = new Date(selectedDate);
      newDate.setDate(newDate.getDate() - 1);
      setSelectedDate(newDate);
    };
    
    const handleNextDay = () => {
      const newDate = new Date(selectedDate);
      newDate.setDate(newDate.getDate() + 1);
      setSelectedDate(newDate);
    };

    return (
      <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <h3 className="text-xl font-bold text-gray-800">
              {selectedDate.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </h3>
            <button
              onClick={() => setSelectedDate(new Date(2025, 8, 27))} // September 27, 2025
              className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
            >
              Today
            </button>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handlePrevDay}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNextDay}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Day Schedule */}
        <div className="space-y-2">
          {dayAppointments.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">No appointments scheduled for this day</p>
              <button
                onClick={() => setShowAddModal(true)}
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Schedule Appointment
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-2">
              {timeSlots.map(time => {
                const slotAppointments = dayAppointments.filter(apt => apt.time === time);
                
                if (slotAppointments.length === 0) {
                  return (
                    <div key={time} className="grid grid-cols-12 gap-4 py-2 border-b border-gray-100">
                      <div className="col-span-2 text-sm text-gray-500">{time}</div>
                      <div className="col-span-10 min-h-[60px] border-l border-gray-200 pl-4">
                        {/* Empty slot */}
                      </div>
                    </div>
                  );
                }
                
                return (
                  <div key={time} className="grid grid-cols-12 gap-4 py-2 border-b border-gray-100">
                    <div className="col-span-2 text-sm text-gray-500">{time}</div>
                    <div className="col-span-10 border-l border-gray-200 pl-4 space-y-2">
                      {slotAppointments.map(apt => (
                        <div
                          key={apt.id}
                          onClick={() => {
                            setSelectedAppointment(apt);
                            setShowDetailModal(true);
                          }}
                          className="p-4 rounded-lg border-l-4 cursor-pointer hover:shadow-md transition-all"
                          style={{ 
                            borderLeftColor: apt.color,
                            backgroundColor: apt.color + '10'
                          }}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h4 className="font-semibold text-gray-900">{apt.patientName}</h4>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  apt.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                                  apt.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                  'bg-red-100 text-red-700'
                                }`}>
                                  {apt.status}
                                </span>
                                {apt.consultationType === 'video' && (
                                  <span className="flex items-center gap-1 text-blue-600">
                                    <Video className="w-4 h-4" />
                                    <span className="text-xs">Video</span>
                                  </span>
                                )}
                              </div>
                              <div className="text-sm text-gray-600">
                                <span className="font-medium">{apt.time} - {apt.endTime}</span> • {apt.duration} mins • {apt.type}
                              </div>
                              {apt.notes && (
                                <div className="mt-2 text-sm text-gray-700">{apt.notes}</div>
                              )}
                            </div>
                            <div className="ml-4 flex gap-2">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleEditAppointment(apt);
                                }}
                                className="p-2 text-gray-600 hover:bg-white rounded-lg transition-colors"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  };

  // List View Component (Compact)
  const AppointmentList = () => {
    return (
      <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">All Appointments</h3>
        <div className="space-y-3">
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading appointments...</p>
            </div>
          ) : filteredAppointments.length === 0 ? (
            <div className="text-center py-8">
              <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">No appointments found</p>
            </div>
          ) : (
            filteredAppointments.map(appointment => (
              <div
                key={appointment.id}
                onClick={() => {
                  setSelectedAppointment(appointment);
                  setShowDetailModal(true);
                }}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: appointment.color }}
                    />
                    <div>
                      <h4 className="font-medium text-gray-900">{appointment.patientName}</h4>
                      <p className="text-sm text-gray-600">
                        {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {appointment.consultationType === 'video' && (
                      <Video className="w-4 h-4 text-blue-600" />
                    )}
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      appointment.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                      appointment.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {appointment.status}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
  };

  // Add/Edit Appointment Modal (same as before but with updated fields)
  const AppointmentModal = ({ isEdit = false }) => {
    const [formData, setFormData] = useState(
      isEdit && selectedAppointment ? selectedAppointment : {
        patientName: '',
        patientId: '',
        date: '',
        time: '',
        endTime: '',
        duration: 60,
        type: 'consultation',
        consultationType: 'in-person',
        phone: '',
        email: '',
        notes: '',
        status: 'pending',
        color: '#3B82F6'
      }
    );

    const handleSubmit = (e) => {
      e.preventDefault();
      
      // Calculate end time
      const [hours, minutes] = formData.time.split(':');
      const startTime = new Date();
      startTime.setHours(parseInt(hours), parseInt(minutes));
      const endTime = new Date(startTime.getTime() + formData.duration * 60000);
      const endTimeStr = `${String(endTime.getHours()).padStart(2, '0')}:${String(endTime.getMinutes()).padStart(2, '0')}`;
      
      const appointmentData = {
        ...formData,
        endTime: endTimeStr,
        doctor: 'Dr. Sarah Smith'
      };
      
      if (isEdit) {
        setAppointments(appointments.map(apt => 
          apt.id === selectedAppointment.id ? { ...appointmentData, id: selectedAppointment.id } : apt
        ));
        setShowEditModal(false);
      } else {
        const newAppointment = {
          ...appointmentData,
          id: appointments.length + 1
        };
        setAppointments([...appointments, newAppointment]);
        setShowAddModal(false);
      }
      
      setSelectedAppointment(null);
    };

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };

    const handleClose = () => {
      if (isEdit) {
        setShowEditModal(false);
      } else {
        setShowAddModal(false);
      }
      setSelectedAppointment(null);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {isEdit ? 'Edit Appointment' : 'New Appointment'}
              </h2>
              <button
                onClick={handleClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Patient Name *
                  </label>
                  <input
                    type="text"
                    name="patientName"
                    value={formData.patientName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter patient name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Patient ID *
                  </label>
                  <input
                    type="text"
                    name="patientId"
                    value={formData.patientId}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter patient ID"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date *
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time *
                  </label>
                  <select
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select time</option>
                    {timeSlots.map(slot => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration (minutes)
                  </label>
                  <select
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="30">30 minutes</option>
                    <option value="45">45 minutes</option>
                    <option value="60">60 minutes</option>
                    <option value="90">90 minutes</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Appointment Type
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="consultation">Consultation</option>
                    <option value="follow-up">Follow-up</option>
                    <option value="therapy">Therapy Session</option>
                    <option value="assessment">Assessment</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Consultation Mode
                  </label>
                  <select
                    name="consultationType"
                    value={formData.consultationType}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="in-person">In-Person</option>
                    <option value="video">Video Call</option>
                    <option value="phone">Phone Call</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+91 98765 43210"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="patient@example.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Color Theme
                  </label>
                  <select
                    name="color"
                    value={formData.color}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="#3B82F6">Blue</option>
                    <option value="#10B981">Green</option>
                    <option value="#8B5CF6">Purple</option>
                    <option value="#EF4444">Red</option>
                    <option value="#F59E0B">Orange</option>
                    <option value="#06B6D4">Cyan</option>
                    <option value="#EC4899">Pink</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notes
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Add any additional notes or special requirements..."
                />
              </div>
              
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-6 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  {isEdit ? 'Update Appointment' : 'Create Appointment'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  // Handler functions
  const handleEditAppointment = (appointment) => {
    setSelectedAppointment(appointment);
    setShowEditModal(true);
  };

  const handleCancelAppointment = (id) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      setAppointments(appointments.map(apt => 
        apt.id === id ? { ...apt, status: 'cancelled' } : apt
      ));
    }
  };

  // Main render
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Appointment Management</h1>
          <p className="text-gray-600 mt-2">Manage and track all patient appointments</p>
        </div>
        
        {/* Controls Bar */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* View Type Selector */}
            <div className="flex gap-2 order-2 lg:order-1">
              {['month', 'week', 'day', 'list'].map(view => (
                <button
                  key={view}
                  onClick={() => setViewType(view)}
                  className={`px-4 py-2 rounded-lg font-medium capitalize transition-colors ${
                    viewType === view
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {view}
                </button>
              ))}
            </div>
            
            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-3 w-full lg:w-auto order-1 lg:order-2">
              <div className="relative flex-1 md:flex-initial">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search patients..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full md:w-64 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="confirmed">Confirmed</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
              
              <button
                onClick={() => setShowAddModal(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 justify-center"
              >
                <Plus className="w-5 h-5" />
                <span>New Appointment</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Content Area based on View Type */}
        {viewType === 'month' && <MonthlyCalendarView />}
        {viewType === 'week' && <WeeklyCalendarView />}
        {viewType === 'day' && <DailyCalendarView />}
        {viewType === 'list' && <AppointmentList />}
        
        {/* Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Today's Total</p>
                <p className="text-2xl font-bold text-gray-900">
                  {filteredAppointments.filter(apt => 
                    apt.date === '2025-09-27' // September 27, 2025
                  ).length}
                </p>
              </div>
              <Calendar className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Confirmed</p>
                <p className="text-2xl font-bold text-green-600">
                  {filteredAppointments.filter(apt => apt.status === 'confirmed').length}
                </p>
              </div>
              <Check className="w-8 h-8 text-green-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {filteredAppointments.filter(apt => apt.status === 'pending').length}
                </p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Video Calls</p>
                <p className="text-2xl font-bold text-purple-600">
                  {filteredAppointments.filter(apt => apt.consultationType === 'video').length}
                </p>
              </div>
              <Video className="w-8 h-8 text-purple-600" />
            </div>
          </div>
        </div>
        
        {/* Modals */}
        {showAddModal && <AppointmentModal />}
        {showEditModal && <AppointmentModal isEdit />}
        {showDetailModal && <AppointmentDetailModal appointment={selectedAppointment} />}
        
        {/* Error Alert */}
        {error && (
          <div className="fixed bottom-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
            <button
              onClick={() => setError(null)}
              className="ml-4 font-bold"
            >
              ×
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentManagement;