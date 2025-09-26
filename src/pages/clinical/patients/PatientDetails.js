import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const PatientDetails = () => {
  const { patientId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Mock patient data - replace with actual API call
  const [patient, setPatient] = useState({
    id: patientId || '12345',
    firstName: 'John',
    lastName: 'Doe',
    dateOfBirth: '1985-03-15',
    age: 39,
    gender: 'Male',
    phone: '+91 98765 43210',
    email: 'john.doe@email.com',
    address: 'Flat 302, Skyline Apartments, MG Road, Ernakulam, Kerala',
    emergencyContact: {
      name: 'Jane Doe',
      relationship: 'Spouse',
      phone: '+91 98765 43211'
    },
    medicalRecord: {
      mrn: 'MRN-2024-12345',
      bloodGroup: 'O+',
      allergies: ['Penicillin', 'Dust'],
      chronicConditions: ['Anxiety Disorder', 'Mild Depression'],
      currentMedications: [
        { name: 'Sertraline', dosage: '50mg', frequency: 'Once daily' },
        { name: 'Alprazolam', dosage: '0.25mg', frequency: 'As needed' }
      ]
    },
    insurance: {
      provider: 'Health Shield Insurance',
      policyNumber: 'HS-2024-987654',
      validity: '2025-12-31'
    },
    mentalHealthStatus: {
      primaryDiagnosis: 'Generalized Anxiety Disorder',
      secondaryDiagnosis: 'Mild Depressive Episode',
      riskAssessment: 'Low',
      treatmentPlan: 'CBT + Medication',
      lastPHQ9Score: 8,
      lastGAD7Score: 11
    },
    appointments: [
      { id: 1, date: '2025-01-15', time: '10:00 AM', type: 'Follow-up', status: 'Completed', provider: 'Dr. Sarah Johnson' },
      { id: 2, date: '2025-01-28', time: '2:00 PM', type: 'Therapy', status: 'Scheduled', provider: 'Dr. Michael Chen' }
    ],
    vitals: {
      bp: '120/80',
      pulse: '72',
      weight: '70 kg',
      height: '175 cm',
      bmi: '22.9',
      lastUpdated: '2025-01-15'
    }
  });

  const handleEditPatient = () => {
    setShowEditModal(true);
  };

  const handleScheduleAppointment = () => {
    setShowAppointmentModal(true);
  };

  const handleAddClinicalNote = () => {
    setShowNoteModal(true);
  };

  const handlePrintRecord = () => {
    window.print();
  };

  const handleSendMessage = () => {
    navigate(`/communication/messages?patientId=${patient.id}`);
  };

  const handleStartVideoCall = () => {
    navigate(`/communication/video-call/${patient.id}`);
  };

  const handleViewHistory = () => {
    navigate(`/clinical/patients/${patient.id}/history`);
  };

  const handlePrescribe = () => {
    navigate(`/clinical/treatment/prescriptions/new?patientId=${patient.id}`);
  };

  const handleOrderLab = () => {
    navigate(`/clinical/treatment/lab-orders/new?patientId=${patient.id}`);
  };

  const handleEmergencyProtocol = () => {
    if (window.confirm('Are you sure you want to initiate emergency protocol for this patient?')) {
      alert('Emergency protocol initiated. Crisis team has been notified.');
    }
  };

  const handleDischarge = () => {
    if (window.confirm('Are you sure you want to discharge this patient?')) {
      alert('Patient discharge process initiated.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      {/* Header Section */}
      <div className="bg-white rounded-lg shadow-sm mb-6 p-4 md:p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Go back"
            >
              <i className="fas fa-arrow-left text-gray-600"></i>
            </button>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                {patient.firstName} {patient.lastName}
              </h1>
              <p className="text-gray-600 mt-1">MRN: {patient.medicalRecord.mrn}</p>
            </div>
          </div>

          {/* Action Buttons - Responsive Grid */}
          <div className="grid grid-cols-2 md:flex gap-2 w-full md:w-auto">
            <button
              onClick={handleEditPatient}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <i className="fas fa-edit"></i>
              <span className="hidden sm:inline">Edit</span>
            </button>
            <button
              onClick={handleScheduleAppointment}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
            >
              <i className="fas fa-calendar-plus"></i>
              <span className="hidden sm:inline">Schedule</span>
            </button>
            <button
              onClick={handlePrintRecord}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
            >
              <i className="fas fa-print"></i>
              <span className="hidden sm:inline">Print</span>
            </button>
            <button
              onClick={handleEmergencyProtocol}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
            >
              <i className="fas fa-exclamation-triangle"></i>
              <span className="hidden sm:inline">Emergency</span>
            </button>
          </div>
        </div>

        {/* Risk Assessment Badge */}
        <div className="mt-4 flex flex-wrap gap-2">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            patient.mentalHealthStatus.riskAssessment === 'Low' ? 'bg-green-100 text-green-800' :
            patient.mentalHealthStatus.riskAssessment === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            Risk Level: {patient.mentalHealthStatus.riskAssessment}
          </span>
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
            {patient.mentalHealthStatus.treatmentPlan}
          </span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-lg shadow-sm mb-6 overflow-x-auto">
        <div className="flex border-b">
          {['overview', 'medical', 'appointments', 'prescriptions', 'notes', 'documents'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 md:px-6 py-3 text-sm md:text-base font-medium capitalize whitespace-nowrap transition-colors ${
                activeTab === tab 
                  ? 'border-b-2 border-blue-600 text-blue-600 bg-blue-50' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {activeTab === 'overview' && (
          <>
            {/* Quick Actions Bar */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                <button
                  onClick={handleAddClinicalNote}
                  className="p-3 bg-purple-100 hover:bg-purple-200 rounded-lg transition-colors text-center"
                >
                  <i className="fas fa-notes-medical text-purple-600 text-xl mb-2"></i>
                  <p className="text-sm">Add Note</p>
                </button>
                <button
                  onClick={handlePrescribe}
                  className="p-3 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors text-center"
                >
                  <i className="fas fa-prescription text-blue-600 text-xl mb-2"></i>
                  <p className="text-sm">Prescribe</p>
                </button>
                <button
                  onClick={handleOrderLab}
                  className="p-3 bg-green-100 hover:bg-green-200 rounded-lg transition-colors text-center"
                >
                  <i className="fas fa-flask text-green-600 text-xl mb-2"></i>
                  <p className="text-sm">Lab Order</p>
                </button>
                <button
                  onClick={handleSendMessage}
                  className="p-3 bg-yellow-100 hover:bg-yellow-200 rounded-lg transition-colors text-center"
                >
                  <i className="fas fa-envelope text-yellow-600 text-xl mb-2"></i>
                  <p className="text-sm">Message</p>
                </button>
                <button
                  onClick={handleStartVideoCall}
                  className="p-3 bg-indigo-100 hover:bg-indigo-200 rounded-lg transition-colors text-center"
                >
                  <i className="fas fa-video text-indigo-600 text-xl mb-2"></i>
                  <p className="text-sm">Video Call</p>
                </button>
                <button
                  onClick={handleViewHistory}
                  className="p-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-center"
                >
                  <i className="fas fa-history text-gray-600 text-xl mb-2"></i>
                  <p className="text-sm">History</p>
                </button>
              </div>
            </div>

            {/* Patient Information Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Personal Information */}
              <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <i className="fas fa-user text-blue-600"></i>
                  Personal Information
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Age:</span>
                    <span className="font-medium">{patient.age} years</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Gender:</span>
                    <span className="font-medium">{patient.gender}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date of Birth:</span>
                    <span className="font-medium">{new Date(patient.dateOfBirth).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phone:</span>
                    <span className="font-medium">{patient.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email:</span>
                    <span className="font-medium text-sm md:text-base break-all">{patient.email}</span>
                  </div>
                  <div className="pt-2 border-t">
                    <p className="text-gray-600 mb-1">Address:</p>
                    <p className="font-medium text-sm">{patient.address}</p>
                  </div>
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <i className="fas fa-phone-alt text-red-600"></i>
                  Emergency Contact
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Name:</span>
                    <span className="font-medium">{patient.emergencyContact.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Relationship:</span>
                    <span className="font-medium">{patient.emergencyContact.relationship}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phone:</span>
                    <span className="font-medium">{patient.emergencyContact.phone}</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t">
                  <h4 className="font-semibold mb-3">Insurance Information</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Provider:</span>
                      <span className="font-medium text-sm">{patient.insurance.provider}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Policy:</span>
                      <span className="font-medium text-sm">{patient.insurance.policyNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Valid Until:</span>
                      <span className="font-medium">{new Date(patient.insurance.validity).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mental Health Status */}
              <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <i className="fas fa-brain text-purple-600"></i>
                  Mental Health Status
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-gray-600 mb-1">Primary Diagnosis:</p>
                    <p className="font-medium">{patient.mentalHealthStatus.primaryDiagnosis}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Secondary Diagnosis:</p>
                    <p className="font-medium">{patient.mentalHealthStatus.secondaryDiagnosis || 'None'}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-600">PHQ-9 Score</p>
                      <p className="text-2xl font-bold text-blue-600">{patient.mentalHealthStatus.lastPHQ9Score}</p>
                    </div>
                    <div className="bg-purple-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-600">GAD-7 Score</p>
                      <p className="text-2xl font-bold text-purple-600">{patient.mentalHealthStatus.lastGAD7Score}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Vitals */}
              <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <i className="fas fa-heartbeat text-red-600"></i>
                  Current Vitals
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600 text-sm">Blood Pressure</p>
                    <p className="font-semibold">{patient.vitals.bp} mmHg</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Pulse</p>
                    <p className="font-semibold">{patient.vitals.pulse} bpm</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Weight</p>
                    <p className="font-semibold">{patient.vitals.weight}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Height</p>
                    <p className="font-semibold">{patient.vitals.height}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">BMI</p>
                    <p className="font-semibold">{patient.vitals.bmi}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Last Updated</p>
                    <p className="font-semibold">{patient.vitals.lastUpdated}</p>
                  </div>
                </div>
                <button 
                  onClick={() => navigate(`/support/vitals?patientId=${patient.id}`)}
                  className="mt-4 w-full px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                >
                  Update Vitals
                </button>
              </div>
            </div>

            {/* Current Medications */}
            <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <i className="fas fa-pills text-green-600"></i>
                Current Medications
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 text-gray-600">Medication</th>
                      <th className="text-left py-2 text-gray-600">Dosage</th>
                      <th className="text-left py-2 text-gray-600">Frequency</th>
                      <th className="text-left py-2 text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {patient.medicalRecord.currentMedications.map((med, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-3">{med.name}</td>
                        <td className="py-3">{med.dosage}</td>
                        <td className="py-3">{med.frequency}</td>
                        <td className="py-3">
                          <button
                            onClick={() => alert(`Editing ${med.name}`)}
                            className="text-blue-600 hover:text-blue-800 mr-3"
                          >
                            <i className="fas fa-edit"></i>
                          </button>
                          <button
                            onClick={() => alert(`Discontinuing ${med.name}`)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <i className="fas fa-times"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button 
                onClick={handlePrescribe}
                className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <i className="fas fa-plus mr-2"></i>
                Add Medication
              </button>
            </div>

            {/* Recent Appointments */}
            <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <i className="fas fa-calendar-check text-blue-600"></i>
                  Recent Appointments
                </h3>
                <button
                  onClick={() => setActiveTab('appointments')}
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  View All
                </button>
              </div>
              <div className="space-y-3">
                {patient.appointments.map(apt => (
                  <div key={apt.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{apt.type} - {apt.provider}</p>
                      <p className="text-sm text-gray-600">{apt.date} at {apt.time}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      apt.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      apt.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {apt.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === 'medical' && (
          <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
            <h3 className="text-lg font-semibold mb-4">Medical History</h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-medium mb-2">Blood Group: {patient.medicalRecord.bloodGroup}</h4>
              </div>
              <div>
                <h4 className="font-medium mb-2">Allergies</h4>
                <div className="flex flex-wrap gap-2">
                  {patient.medicalRecord.allergies.map((allergy, index) => (
                    <span key={index} className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">
                      {allergy}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">Chronic Conditions</h4>
                <ul className="list-disc list-inside space-y-1">
                  {patient.medicalRecord.chronicConditions.map((condition, index) => (
                    <li key={index} className="text-gray-700">{condition}</li>
                  ))}
                </ul>
              </div>
              <button 
                onClick={() => navigate(`/clinical/patients/${patient.id}/history`)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                View Complete History
              </button>
            </div>
          </div>
        )}

        {activeTab === 'appointments' && (
          <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">All Appointments</h3>
              <button
                onClick={handleScheduleAppointment}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <i className="fas fa-plus mr-2"></i>
                New Appointment
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Date</th>
                    <th className="text-left py-2">Time</th>
                    <th className="text-left py-2">Type</th>
                    <th className="text-left py-2">Provider</th>
                    <th className="text-left py-2">Status</th>
                    <th className="text-left py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {patient.appointments.map(apt => (
                    <tr key={apt.id} className="border-b">
                      <td className="py-3">{apt.date}</td>
                      <td className="py-3">{apt.time}</td>
                      <td className="py-3">{apt.type}</td>
                      <td className="py-3">{apt.provider}</td>
                      <td className="py-3">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          apt.status === 'Completed' ? 'bg-green-100 text-green-800' :
                          apt.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {apt.status}
                        </span>
                      </td>
                      <td className="py-3">
                        <button className="text-blue-600 hover:text-blue-800 mr-3">
                          <i className="fas fa-edit"></i>
                        </button>
                        <button className="text-red-600 hover:text-red-800">
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'prescriptions' && (
          <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Prescriptions</h3>
              <button
                onClick={handlePrescribe}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <i className="fas fa-prescription mr-2"></i>
                New Prescription
              </button>
            </div>
            <p className="text-gray-600">Prescription history will be displayed here.</p>
          </div>
        )}

        {activeTab === 'notes' && (
          <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Clinical Notes</h3>
              <button
                onClick={handleAddClinicalNote}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <i className="fas fa-plus mr-2"></i>
                Add Note
              </button>
            </div>
            <p className="text-gray-600">Clinical notes will be displayed here.</p>
          </div>
        )}

        {activeTab === 'documents' && (
          <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Documents</h3>
              <button
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                <i className="fas fa-upload mr-2"></i>
                Upload
              </button>
            </div>
            <p className="text-gray-600">Patient documents and reports will be displayed here.</p>
          </div>
        )}
      </div>

      {/* Floating Action Buttons for Mobile/Tablet */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 md:hidden">
        <button
          onClick={handleScheduleAppointment}
          className="w-14 h-14 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 transition-colors flex items-center justify-center"
        >
          <i className="fas fa-calendar-plus"></i>
        </button>
        <button
          onClick={handleAddClinicalNote}
          className="w-14 h-14 bg-purple-600 text-white rounded-full shadow-lg hover:bg-purple-700 transition-colors flex items-center justify-center"
        >
          <i className="fas fa-notes-medical"></i>
        </button>
      </div>

      {/* Modals (placeholder) */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Edit Patient Information</h3>
            <p className="text-gray-600 mb-4">Edit form would go here...</p>
            <div className="flex gap-3">
              <button 
                onClick={() => setShowEditModal(false)}
                className="flex-1 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {showAppointmentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Schedule Appointment</h3>
            <p className="text-gray-600 mb-4">Appointment scheduling form would go here...</p>
            <div className="flex gap-3">
              <button 
                onClick={() => setShowAppointmentModal(false)}
                className="flex-1 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                Schedule
              </button>
            </div>
          </div>
        </div>
      )}

      {showNoteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Add Clinical Note</h3>
            <textarea 
              className="w-full p-3 border rounded-lg mb-4" 
              rows="4"
              placeholder="Enter clinical note..."
            ></textarea>
            <div className="flex gap-3">
              <button 
                onClick={() => setShowNoteModal(false)}
                className="flex-1 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                Save Note
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientDetails;