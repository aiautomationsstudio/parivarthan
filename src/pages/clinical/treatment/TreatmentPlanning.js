import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const TreatmentPlanning = () => {
  const { patientId } = useParams();
  const navigate = useNavigate();
  
  // State management for treatment planning
  const [activeTab, setActiveTab] = useState('overview');
  const [treatmentPlan, setTreatmentPlan] = useState({
    diagnosis: '',
    primaryConcerns: [],
    treatmentGoals: [],
    interventions: [],
    medications: [],
    therapySchedule: {},
    progressNotes: []
  });
  
  const [patientInfo, setPatientInfo] = useState({
    name: '',
    age: '',
    gender: '',
    diagnoses: [],
    lastVisit: '',
    nextAppointment: ''
  });

  const [showAddGoalModal, setShowAddGoalModal] = useState(false);
  const [showAddInterventionModal, setShowAddInterventionModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Sample data for demonstration
  useEffect(() => {
    // In production, fetch from API
    setPatientInfo({
      name: 'John Doe',
      age: '32',
      gender: 'Male',
      diagnoses: ['Major Depressive Disorder', 'Generalized Anxiety Disorder'],
      lastVisit: '2025-01-10',
      nextAppointment: '2025-01-24'
    });
    
    setTreatmentPlan({
      diagnosis: 'Major Depressive Disorder, Moderate',
      primaryConcerns: [
        'Persistent low mood',
        'Sleep disturbance',
        'Social withdrawal',
        'Work performance issues'
      ],
      treatmentGoals: [
        { id: 1, goal: 'Improve mood stability', target: '3 months', status: 'active' },
        { id: 2, goal: 'Restore sleep pattern', target: '1 month', status: 'active' },
        { id: 3, goal: 'Increase social engagement', target: '2 months', status: 'pending' }
      ],
      interventions: [
        { id: 1, type: 'CBT', frequency: 'Weekly', duration: '50 min', provider: 'Dr. Smith' },
        { id: 2, type: 'Medication Management', frequency: 'Monthly', duration: '30 min', provider: 'Dr. Johnson' }
      ],
      medications: [
        { name: 'Sertraline', dosage: '50mg', frequency: 'Once daily', startDate: '2025-01-01' },
        { name: 'Trazodone', dosage: '50mg', frequency: 'As needed for sleep', startDate: '2025-01-05' }
      ],
      progressNotes: [
        { date: '2025-01-10', note: 'Patient showing mild improvement in mood', author: 'Dr. Smith' },
        { date: '2025-01-03', note: 'Started new medication regimen', author: 'Dr. Johnson' }
      ]
    });
  }, [patientId]);

  const handleSavePlan = async () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      alert('Treatment plan saved successfully!');
    }, 1500);
  };

  const handleAddGoal = (newGoal) => {
    setTreatmentPlan(prev => ({
      ...prev,
      treatmentGoals: [...prev.treatmentGoals, { 
        id: Date.now(), 
        ...newGoal, 
        status: 'active' 
      }]
    }));
    setShowAddGoalModal(false);
  };

  const handleAddIntervention = (newIntervention) => {
    setTreatmentPlan(prev => ({
      ...prev,
      interventions: [...prev.interventions, { 
        id: Date.now(), 
        ...newIntervention 
      }]
    }));
    setShowAddInterventionModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header Section - Tablet Optimized */}
      <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Treatment Planning</h1>
            <p className="text-gray-600 mt-1">Comprehensive care planning and management</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button 
              onClick={handleSavePlan}
              disabled={isSaving}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? 'Saving...' : 'Save Plan'}
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
              Export PDF
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
              Share
            </button>
          </div>
        </div>
      </div>

      {/* Patient Info Card - Tablet Optimized */}
      <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <p className="text-sm text-gray-500">Patient</p>
            <p className="font-semibold text-gray-900">{patientInfo.name}</p>
            <p className="text-sm text-gray-600">{patientInfo.age} years, {patientInfo.gender}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Primary Diagnosis</p>
            <p className="font-semibold text-gray-900">{patientInfo.diagnoses[0]}</p>
            {patientInfo.diagnoses[1] && (
              <p className="text-sm text-gray-600">+ {patientInfo.diagnoses.length - 1} more</p>
            )}
          </div>
          <div>
            <p className="text-sm text-gray-500">Last Visit</p>
            <p className="font-semibold text-gray-900">{new Date(patientInfo.lastVisit).toLocaleDateString()}</p>
            <p className="text-sm text-gray-600">10 days ago</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Next Appointment</p>
            <p className="font-semibold text-gray-900">{new Date(patientInfo.nextAppointment).toLocaleDateString()}</p>
            <p className="text-sm text-green-600">In 4 days</p>
          </div>
        </div>
      </div>

      {/* Tab Navigation - Tablet Optimized */}
      <div className="bg-white rounded-lg shadow-sm mb-6 overflow-x-auto">
        <div className="flex border-b">
          {['overview', 'goals', 'interventions', 'medications', 'progress', 'documents'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 md:px-6 py-3 text-sm md:text-base font-medium capitalize whitespace-nowrap transition-colors ${
                activeTab === tab
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content - Tablet Optimized */}
      <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Primary Diagnosis</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700">{treatmentPlan.diagnosis}</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Primary Concerns</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {treatmentPlan.primaryConcerns.map((concern, index) => (
                  <div key={index} className="flex items-start space-x-2 bg-gray-50 rounded-lg p-3">
                    <svg className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">{concern}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Treatment Summary</h3>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <p className="text-blue-900 font-medium">Active Treatment Plan</p>
                    <p className="text-blue-700 text-sm mt-1">
                      {treatmentPlan.treatmentGoals.filter(g => g.status === 'active').length} active goals,
                      {' '}{treatmentPlan.interventions.length} interventions
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">On Track</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Regular Reviews</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'goals' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Treatment Goals</h3>
              <button 
                onClick={() => setShowAddGoalModal(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                + Add Goal
              </button>
            </div>
            
            <div className="space-y-3">
              {treatmentPlan.treatmentGoals.map((goal) => (
                <div key={goal.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{goal.goal}</p>
                      <p className="text-sm text-gray-600 mt-1">Target: {goal.target}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        goal.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {goal.status}
                      </span>
                      <button className="p-2 text-gray-400 hover:text-gray-600">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'interventions' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Therapeutic Interventions</h3>
              <button 
                onClick={() => setShowAddInterventionModal(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                + Add Intervention
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {treatmentPlan.interventions.map((intervention) => (
                <div key={intervention.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-medium text-gray-900">{intervention.type}</h4>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">Active</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Frequency:</span>
                      <span className="text-gray-900">{intervention.frequency}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Duration:</span>
                      <span className="text-gray-900">{intervention.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Provider:</span>
                      <span className="text-gray-900">{intervention.provider}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'medications' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Current Medications</h3>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                + Add Medication
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Medication</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dosage</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Frequency</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {treatmentPlan.medications.map((med, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{med.name}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{med.dosage}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{med.frequency}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{new Date(med.startDate).toLocaleDateString()}</td>
                      <td className="px-4 py-3 text-sm">
                        <button className="text-blue-600 hover:text-blue-800 mr-3">Edit</button>
                        <button className="text-red-600 hover:text-red-800">Discontinue</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'progress' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Progress Notes</h3>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                + Add Note
              </button>
            </div>
            
            <div className="space-y-4">
              {treatmentPlan.progressNotes.map((note, index) => (
                <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 mb-2">
                    <p className="text-sm text-gray-500">{new Date(note.date).toLocaleDateString()}</p>
                    <p className="text-sm text-gray-600">by {note.author}</p>
                  </div>
                  <p className="text-gray-700">{note.note}</p>
                </div>
              ))}
            </div>

            {/* Progress Chart Placeholder */}
            <div className="mt-8">
              <h4 className="font-medium text-gray-900 mb-4">Symptom Tracking</h4>
              <div className="bg-gray-50 rounded-lg p-8 text-center">
                <svg className="w-16 h-16 mx-auto text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <p className="text-gray-600">Progress charts will appear here</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'documents' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Treatment Documents</h3>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                + Upload Document
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { name: 'Initial Assessment Report', date: '2025-01-01', type: 'PDF' },
                { name: 'Treatment Consent Form', date: '2025-01-01', type: 'PDF' },
                { name: 'Insurance Authorization', date: '2025-01-03', type: 'PDF' },
              ].map((doc, index) => (
                <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex items-start justify-between mb-2">
                    <svg className="w-10 h-10 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-5L9 2H4z" clipRule="evenodd" />
                    </svg>
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">{doc.type}</span>
                  </div>
                  <p className="font-medium text-gray-900 text-sm mb-1">{doc.name}</p>
                  <p className="text-xs text-gray-500">{new Date(doc.date).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Add Goal Modal */}
      {showAddGoalModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Add Treatment Goal</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              handleAddGoal({
                goal: formData.get('goal'),
                target: formData.get('target')
              });
            }}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Goal Description</label>
                  <textarea 
                    name="goal"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="3"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Target Timeline</label>
                  <input 
                    type="text"
                    name="target"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., 3 months"
                    required
                  />
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Add Goal
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddGoalModal(false)}
                    className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Intervention Modal */}
      {showAddInterventionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Add Intervention</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              handleAddIntervention({
                type: formData.get('type'),
                frequency: formData.get('frequency'),
                duration: formData.get('duration'),
                provider: formData.get('provider')
              });
            }}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Intervention Type</label>
                  <select 
                    name="type"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select type</option>
                    <option value="CBT">Cognitive Behavioral Therapy</option>
                    <option value="DBT">Dialectical Behavior Therapy</option>
                    <option value="IPT">Interpersonal Therapy</option>
                    <option value="Group Therapy">Group Therapy</option>
                    <option value="Family Therapy">Family Therapy</option>
                    <option value="Medication Management">Medication Management</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Frequency</label>
                  <input 
                    type="text"
                    name="frequency"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Weekly"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Session Duration</label>
                  <input 
                    type="text"
                    name="duration"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., 50 min"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Provider</label>
                  <input 
                    type="text"
                    name="provider"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Provider name"
                    required
                  />
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Add Intervention
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddInterventionModal(false)}
                    className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TreatmentPlanning;