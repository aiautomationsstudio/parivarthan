import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import Calendar from 'react-calendar';
import { format, parseISO, addDays, isSameDay, startOfWeek, endOfWeek } from 'date-fns';
import 'react-calendar/dist/Calendar.css';
import './ProviderCalendar.css';

const ProviderCalendar = () => {
  const { user } = useAuth();
  
  // State management
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('month'); // month, week, day
  const [availabilitySlots, setAvailabilitySlots] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [showAvailabilityModal, setShowAvailabilityModal] = useState(false);
  const [showUnavailableModal, setShowUnavailableModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [loading, setLoading] = useState(false);
  const [unavailablePeriods, setUnavailablePeriods] = useState([]);
  const [selectedDates, setSelectedDates] = useState([]);
  
  // Availability settings
  const [defaultSettings, setDefaultSettings] = useState({
    workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    workingHours: {
      start: '09:00',
      end: '18:00'
    },
    slotDuration: 30, // minutes
    breakTime: {
      enabled: true,
      start: '13:00',
      end: '14:00'
    },
    consultationModes: {
      online: true,
      offline: true
    },
    bufferTime: 10 // minutes between appointments
  });

  // Time slots generation
  const generateTimeSlots = useCallback(() => {
    const slots = [];
    const { workingHours, slotDuration, breakTime } = defaultSettings;
    
    let currentTime = parseTimeString(workingHours.start);
    const endTime = parseTimeString(workingHours.end);
    const breakStart = parseTimeString(breakTime.start);
    const breakEnd = parseTimeString(breakTime.end);
    
    while (currentTime < endTime) {
      const slotEnd = new Date(currentTime.getTime() + slotDuration * 60000);
      
      // Check if slot overlaps with break time
      if (!breakTime.enabled || !isTimeInBreak(currentTime, slotEnd, breakStart, breakEnd)) {
        slots.push({
          start: format(currentTime, 'HH:mm'),
          end: format(slotEnd, 'HH:mm'),
          available: true
        });
      }
      
      currentTime = slotEnd;
    }
    
    return slots;
  }, [defaultSettings]);

  // Helper functions
  const parseTimeString = (timeStr) => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date;
  };

  const isTimeInBreak = (start, end, breakStart, breakEnd) => {
    return (start >= breakStart && start < breakEnd) || 
           (end > breakStart && end <= breakEnd) ||
           (start <= breakStart && end >= breakEnd);
  };

  // Load appointments and availability
  useEffect(() => {
    loadProviderSchedule();
  }, [selectedDate, viewMode]);

  const loadProviderSchedule = async () => {
    setLoading(true);
    try {
      // Simulated API call - replace with actual API integration
      // const response = await fetch(`/api/provider/schedule?date=${selectedDate}`);
      // const data = await response.json();
      
      // Mock data for demonstration
      const mockAppointments = [
        {
          id: 1,
          patientName: 'John Doe',
          time: '10:00',
          duration: 30,
          mode: 'online',
          status: 'confirmed'
        },
        {
          id: 2,
          patientName: 'Jane Smith',
          time: '11:00',
          duration: 30,
          mode: 'offline',
          status: 'confirmed'
        },
        {
          id: 3,
          patientName: 'Robert Johnson',
          time: '14:30',
          duration: 45,
          mode: 'online',
          status: 'pending'
        }
      ];
      
      setAppointments(mockAppointments);
      setAvailabilitySlots(generateTimeSlots());
    } catch (error) {
      console.error('Error loading schedule:', error);
    } finally {
      setLoading(false);
    }
  };

  // Availability Modal Component
  const AvailabilityModal = () => {
    const [formData, setFormData] = useState({
      date: format(selectedDate, 'yyyy-MM-dd'),
      startTime: '',
      endTime: '',
      mode: 'both', // online, offline, both
      recurring: false,
      recurringType: 'weekly', // daily, weekly, monthly
      recurringEnd: '',
      notes: ''
    });

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        // API call to save availability
        console.log('Saving availability:', formData);
        setShowAvailabilityModal(false);
        loadProviderSchedule();
      } catch (error) {
        console.error('Error saving availability:', error);
      }
    };

    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
        <div className="relative top-20 mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Set Availability
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Date</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Start Time</label>
                <input
                  type="time"
                  value={formData.startTime}
                  onChange={(e) => setFormData({...formData, startTime: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">End Time</label>
                <input
                  type="time"
                  value={formData.endTime}
                  onChange={(e) => setFormData({...formData, endTime: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Consultation Mode
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="online"
                    checked={formData.mode === 'online'}
                    onChange={(e) => setFormData({...formData, mode: e.target.value})}
                    className="mr-2"
                  />
                  <span className="text-sm">Online Only</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="offline"
                    checked={formData.mode === 'offline'}
                    onChange={(e) => setFormData({...formData, mode: e.target.value})}
                    className="mr-2"
                  />
                  <span className="text-sm">Offline Only</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="both"
                    checked={formData.mode === 'both'}
                    onChange={(e) => setFormData({...formData, mode: e.target.value})}
                    className="mr-2"
                  />
                  <span className="text-sm">Both Online & Offline</span>
                </label>
              </div>
            </div>

            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.recurring}
                  onChange={(e) => setFormData({...formData, recurring: e.target.checked})}
                  className="mr-2"
                />
                <span className="text-sm font-medium text-gray-700">Make this recurring</span>
              </label>
            </div>

            {formData.recurring && (
              <div className="space-y-3 p-3 bg-gray-50 rounded-md">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Repeat</label>
                  <select
                    value={formData.recurringType}
                    onChange={(e) => setFormData({...formData, recurringType: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">End Date</label>
                  <input
                    type="date"
                    value={formData.recurringEnd}
                    onChange={(e) => setFormData({...formData, recurringEnd: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700">Notes (Optional)</label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
                rows="2"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Any special notes for this availability..."
              />
            </div>

            <div className="flex justify-end space-x-3 pt-3">
              <button
                type="button"
                onClick={() => setShowAvailabilityModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Save Availability
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // Unavailable Periods Modal Component
  const UnavailableModal = () => {
    const [formData, setFormData] = useState({
      type: 'fullDay', // fullDay, timeRange, recurring
      startDate: format(new Date(), 'yyyy-MM-dd'),
      endDate: format(new Date(), 'yyyy-MM-dd'),
      startTime: '',
      endTime: '',
      reason: '',
      recurring: false,
      recurringPattern: 'weekly', // weekly, monthly
      recurringDays: [], // for weekly: [1, 3, 5] (Mon, Wed, Fri)
      recurringEndDate: '',
      affectOnline: true,
      affectOffline: true
    });

    const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const handleSubmit = async (e) => {
      e.preventDefault();
      
      // Create unavailable period object
      const unavailablePeriod = {
        id: Date.now(),
        ...formData,
        createdAt: new Date().toISOString()
      };
      
      // Add to unavailable periods
      setUnavailablePeriods([...unavailablePeriods, unavailablePeriod]);
      
      // Close modal and refresh
      setShowUnavailableModal(false);
      loadProviderSchedule();
      
      console.log('Saving unavailable period:', unavailablePeriod);
      alert('Unavailable period saved successfully!');
    };

    const handleRemoveUnavailable = (periodId) => {
      setUnavailablePeriods(unavailablePeriods.filter(p => p.id !== periodId));
    };

    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
        <div className="relative top-10 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Manage Unavailable Periods
            </h3>
            <button
              onClick={() => setShowUnavailableModal(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Existing Unavailable Periods List */}
          {unavailablePeriods.length > 0 && (
            <div className="mb-4 p-3 bg-gray-50 rounded-lg max-h-40 overflow-y-auto">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Current Unavailable Periods:</h4>
              <div className="space-y-2">
                {unavailablePeriods.map((period) => (
                  <div key={period.id} className="flex justify-between items-center p-2 bg-white rounded border">
                    <div className="text-sm">
                      <span className="font-medium">
                        {period.type === 'fullDay' ? 'Full Day' : 'Time Range'}:
                      </span>{' '}
                      {period.startDate} to {period.endDate}
                      {period.type === 'timeRange' && ` (${period.startTime} - ${period.endTime})`}
                      {period.reason && <span className="text-gray-500"> - {period.reason}</span>}
                    </div>
                    <button
                      onClick={() => handleRemoveUnavailable(period.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Unavailability Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Unavailability Type
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setFormData({...formData, type: 'fullDay'})}
                  className={`px-3 py-2 text-sm rounded-md border ${
                    formData.type === 'fullDay'
                      ? 'bg-blue-500 text-white border-blue-500'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  Full Day(s)
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({...formData, type: 'timeRange'})}
                  className={`px-3 py-2 text-sm rounded-md border ${
                    formData.type === 'timeRange'
                      ? 'bg-blue-500 text-white border-blue-500'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  Time Range
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({...formData, type: 'recurring'})}
                  className={`px-3 py-2 text-sm rounded-md border ${
                    formData.type === 'recurring'
                      ? 'bg-blue-500 text-white border-blue-500'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  Recurring
                </button>
              </div>
            </div>

            {/* Date Range Selection */}
            {(formData.type === 'fullDay' || formData.type === 'timeRange') && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Start Date</label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">End Date</label>
                  <input
                    type="date"
                    value={formData.endDate}
                    min={formData.startDate}
                    onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
            )}

            {/* Time Range (if selected) */}
            {formData.type === 'timeRange' && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Start Time</label>
                  <input
                    type="time"
                    value={formData.startTime}
                    onChange={(e) => setFormData({...formData, startTime: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">End Time</label>
                  <input
                    type="time"
                    value={formData.endTime}
                    onChange={(e) => setFormData({...formData, endTime: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
            )}

            {/* Recurring Options */}
            {formData.type === 'recurring' && (
              <div className="space-y-4 p-4 bg-blue-50 rounded-lg">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Recurring Pattern
                  </label>
                  <select
                    value={formData.recurringPattern}
                    onChange={(e) => setFormData({...formData, recurringPattern: e.target.value})}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>

                {formData.recurringPattern === 'weekly' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Days
                    </label>
                    <div className="grid grid-cols-7 gap-2">
                      {weekDays.map((day, index) => (
                        <label key={day} className="flex flex-col items-center">
                          <input
                            type="checkbox"
                            checked={formData.recurringDays.includes(index)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setFormData({
                                  ...formData,
                                  recurringDays: [...formData.recurringDays, index]
                                });
                              } else {
                                setFormData({
                                  ...formData,
                                  recurringDays: formData.recurringDays.filter(d => d !== index)
                                });
                              }
                            }}
                            className="mb-1"
                          />
                          <span className="text-xs">{day.slice(0, 3)}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Time Start</label>
                    <input
                      type="time"
                      value={formData.startTime}
                      onChange={(e) => setFormData({...formData, startTime: e.target.value})}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Time End</label>
                    <input
                      type="time"
                      value={formData.endTime}
                      onChange={(e) => setFormData({...formData, endTime: e.target.value})}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">End By Date</label>
                  <input
                    type="date"
                    value={formData.recurringEndDate}
                    onChange={(e) => setFormData({...formData, recurringEndDate: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
            )}

            {/* Consultation Mode Affected */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Affects Consultation Types
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.affectOnline}
                    onChange={(e) => setFormData({...formData, affectOnline: e.target.checked})}
                    className="mr-2"
                  />
                  <span className="text-sm">Online Consultations</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.affectOffline}
                    onChange={(e) => setFormData({...formData, affectOffline: e.target.checked})}
                    className="mr-2"
                  />
                  <span className="text-sm">Offline Consultations</span>
                </label>
              </div>
            </div>

            {/* Reason */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Reason (Optional)</label>
              <select
                value={formData.reason}
                onChange={(e) => setFormData({...formData, reason: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">Select a reason...</option>
                <option value="vacation">Vacation</option>
                <option value="conference">Conference/Training</option>
                <option value="personal">Personal Leave</option>
                <option value="medical">Medical Leave</option>
                <option value="holiday">Public Holiday</option>
                <option value="maintenance">System Maintenance</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 pt-4 border-t">
              <button
                type="button"
                onClick={() => setShowUnavailableModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Mark as Unavailable
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // Settings Panel Component
  const SettingsPanel = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [localSettings, setLocalSettings] = useState({...defaultSettings});

    const handleSaveSettings = () => {
      setDefaultSettings(localSettings);
      // Save settings to backend
      console.log('Saving settings:', localSettings);
      // Show success message (you can add a toast notification here)
      alert('Settings saved successfully!');
    };

    const toggleAccordion = (e) => {
      e.stopPropagation();
      setIsOpen(!isOpen);
    };

    return (
      <div className="bg-white rounded-lg shadow-md p-4 mb-4">
        <div
          onClick={toggleAccordion}
          className="flex items-center justify-between w-full text-left cursor-pointer hover:bg-gray-50 -m-2 p-2 rounded"
        >
          <h3 className="text-lg font-semibold text-gray-900">
            Schedule Settings
          </h3>
          <svg
            className={`w-5 h-5 transition-transform ${isOpen ? 'transform rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        {isOpen && (
          <div className="mt-4 space-y-4" onClick={(e) => e.stopPropagation()}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Working Days Column */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Working Days
                </label>
                <div className="space-y-1 bg-gray-50 p-3 rounded-md">
                  {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                    <label key={day} className="flex items-center hover:bg-white px-2 py-1 rounded cursor-pointer">
                      <input
                        type="checkbox"
                        checked={localSettings.workingDays.includes(day)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setLocalSettings({
                              ...localSettings,
                              workingDays: [...localSettings.workingDays, day]
                            });
                          } else {
                            setLocalSettings({
                              ...localSettings,
                              workingDays: localSettings.workingDays.filter(d => d !== day)
                            });
                          }
                        }}
                        className="mr-2"
                      />
                      <span className="text-sm">{day}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Working Hours and Slots Column */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Working Hours
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Start</label>
                      <input
                        type="time"
                        value={localSettings.workingHours.start}
                        onChange={(e) => setLocalSettings({
                          ...localSettings,
                          workingHours: {...localSettings.workingHours, start: e.target.value}
                        })}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">End</label>
                      <input
                        type="time"
                        value={localSettings.workingHours.end}
                        onChange={(e) => setLocalSettings({
                          ...localSettings,
                          workingHours: {...localSettings.workingHours, end: e.target.value}
                        })}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Slot Duration
                  </label>
                  <select
                    value={localSettings.slotDuration}
                    onChange={(e) => setLocalSettings({
                      ...localSettings,
                      slotDuration: parseInt(e.target.value)
                    })}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="15">15 minutes</option>
                    <option value="30">30 minutes</option>
                    <option value="45">45 minutes</option>
                    <option value="60">60 minutes</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Buffer Between Appointments
                  </label>
                  <select
                    value={localSettings.bufferTime}
                    onChange={(e) => setLocalSettings({
                      ...localSettings,
                      bufferTime: parseInt(e.target.value)
                    })}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="0">No buffer</option>
                    <option value="5">5 minutes</option>
                    <option value="10">10 minutes</option>
                    <option value="15">15 minutes</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Consultation Modes
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={localSettings.consultationModes.online}
                        onChange={(e) => setLocalSettings({
                          ...localSettings,
                          consultationModes: {
                            ...localSettings.consultationModes,
                            online: e.target.checked
                          }
                        })}
                        className="mr-2"
                      />
                      <span className="text-sm">Online Consultations</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={localSettings.consultationModes.offline}
                        onChange={(e) => setLocalSettings({
                          ...localSettings,
                          consultationModes: {
                            ...localSettings.consultationModes,
                            offline: e.target.checked
                          }
                        })}
                        className="mr-2"
                      />
                      <span className="text-sm">In-Person Consultations</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Break Times Column */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Break Times
                </label>
                <div className="bg-gray-50 p-3 rounded-md space-y-3">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={localSettings.breakTime.enabled}
                      onChange={(e) => setLocalSettings({
                        ...localSettings,
                        breakTime: {...localSettings.breakTime, enabled: e.target.checked}
                      })}
                      className="mr-2"
                    />
                    <span className="text-sm font-medium">Enable Break Time</span>
                  </label>

                  {localSettings.breakTime.enabled && (
                    <div className="space-y-3 pl-6">
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Break Start</label>
                        <input
                          type="time"
                          value={localSettings.breakTime.start}
                          onChange={(e) => setLocalSettings({
                            ...localSettings,
                            breakTime: {...localSettings.breakTime, start: e.target.value}
                          })}
                          className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Break End</label>
                        <input
                          type="time"
                          value={localSettings.breakTime.end}
                          onChange={(e) => setLocalSettings({
                            ...localSettings,
                            breakTime: {...localSettings.breakTime, end: e.target.value}
                          })}
                          className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  )}

                  {/* Additional Break (Optional) */}
                  <div className="pt-3 border-t border-gray-200">
                    <label className="block text-xs text-gray-500 mb-2">Additional Breaks</label>
                    <button
                      type="button"
                      className="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                      onClick={() => {
                        // Add functionality for multiple breaks
                        alert('Multiple breaks feature coming soon!');
                      }}
                    >
                      + Add Another Break
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 pt-4 border-t">
              <button
                onClick={() => {
                  setLocalSettings({...defaultSettings});
                }}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              >
                Reset
              </button>
              <button
                onClick={handleSaveSettings}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 flex items-center"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Save Settings
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Day View Component
  const DayView = () => {
    const timeSlots = generateTimeSlots();
    
    return (
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            {format(selectedDate, 'EEEE, MMMM d, yyyy')}
          </h3>
          <button
            onClick={() => setShowAvailabilityModal(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Set Availability
          </button>
        </div>

        <div className="space-y-2 max-h-96 overflow-y-auto">
          {timeSlots.map((slot, index) => {
            const appointment = appointments.find(apt => apt.time === slot.start);
            const isBooked = !!appointment;
            
            return (
              <div
                key={index}
                className={`flex items-center justify-between p-3 rounded-lg border ${
                  isBooked 
                    ? 'bg-red-50 border-red-200' 
                    : 'bg-green-50 border-green-200 hover:bg-green-100 cursor-pointer'
                }`}
                onClick={() => !isBooked && setSelectedSlot(slot)}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-gray-700">
                    {slot.start} - {slot.end}
                  </span>
                  {isBooked && (
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">
                        {appointment.patientName}
                      </span>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        appointment.mode === 'online' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {appointment.mode === 'online' ? '🌐 Online' : '🏥 Offline'}
                      </span>
                    </div>
                  )}
                </div>
                
                {!isBooked && (
                  <span className="text-sm text-green-600 font-medium">Available</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Week View Component
  const WeekView = () => {
    const weekStart = startOfWeek(selectedDate, { weekStartsOn: 1 });
    const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
    
    return (
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="grid grid-cols-1 md:grid-cols-7 gap-2">
          {weekDays.map((day, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg border ${
                isSameDay(day, new Date()) 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200'
              }`}
            >
              <div className="text-center mb-2">
                <div className="text-sm font-medium text-gray-700">
                  {format(day, 'EEE')}
                </div>
                <div className="text-lg font-semibold">
                  {format(day, 'd')}
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="text-xs bg-green-100 text-green-800 rounded px-2 py-1 text-center">
                  8 slots available
                </div>
                <div className="text-xs bg-red-100 text-red-800 rounded px-2 py-1 text-center">
                  4 booked
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Statistics Component
  const Statistics = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Today's Appointments</p>
              <p className="text-2xl font-bold text-gray-900">12</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Online Sessions</p>
              <p className="text-2xl font-bold text-gray-900">8</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Offline Sessions</p>
              <p className="text-2xl font-bold text-gray-900">4</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Available Slots</p>
              <p className="text-2xl font-bold text-gray-900">18</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-full">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Provider Schedule Management</h1>
        <p className="text-gray-600 mt-2">Manage your availability and appointments</p>
      </div>

      {/* Statistics */}
      <Statistics />

      {/* Settings Panel */}
      <SettingsPanel />

      {/* View Mode Selector */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-2 mb-3 md:mb-0">
            <button
              onClick={() => setViewMode('month')}
              className={`px-4 py-2 rounded-md ${
                viewMode === 'month' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Month
            </button>
            <button
              onClick={() => setViewMode('week')}
              className={`px-4 py-2 rounded-md ${
                viewMode === 'week' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setViewMode('day')}
              className={`px-4 py-2 rounded-md ${
                viewMode === 'day' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Day
            </button>
          </div>

          <div className="flex space-x-2">
            <button 
              onClick={() => setShowUnavailableModal(true)}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Block Time Off
            </button>
            <button className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600">
              Export Schedule
            </button>
          </div>
        </div>
      </div>

      {/* Calendar/Schedule View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-4">
            <Calendar
              onChange={setSelectedDate}
              value={selectedDate}
              className="w-full border-none"
              tileClassName={({ date }) => {
                // Check if date is unavailable
                const isUnavailable = unavailablePeriods.some(period => {
                  if (period.type === 'fullDay') {
                    const start = new Date(period.startDate);
                    const end = new Date(period.endDate);
                    return date >= start && date <= end;
                  }
                  if (period.type === 'recurring' && period.recurringPattern === 'weekly') {
                    return period.recurringDays.includes(date.getDay());
                  }
                  return false;
                });
                return isUnavailable ? 'bg-red-100 text-red-800' : '';
              }}
              tileDisabled={({ date }) => {
                // Optionally disable unavailable dates
                return unavailablePeriods.some(period => {
                  if (period.type === 'fullDay') {
                    const start = new Date(period.startDate);
                    const end = new Date(period.endDate);
                    return date >= start && date <= end;
                  }
                  return false;
                });
              }}
            />
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-lg shadow-md p-4 mt-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Quick Stats</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">This Week</span>
                <span className="text-sm font-semibold">42 appointments</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">This Month</span>
                <span className="text-sm font-semibold">168 appointments</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Cancellation Rate</span>
                <span className="text-sm font-semibold text-green-600">3.2%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <>
              {viewMode === 'day' && <DayView />}
              {viewMode === 'week' && <WeekView />}
              {viewMode === 'month' && (
                <div className="bg-white rounded-lg shadow-md p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Month View - {format(selectedDate, 'MMMM yyyy')}
                  </h3>
                  <p className="text-gray-600">
                    Select a day from the calendar to view detailed schedule
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Modals */}
      {showAvailabilityModal && <AvailabilityModal />}
      {showUnavailableModal && <UnavailableModal />}
    </div>
  );
};

export default ProviderCalendar;