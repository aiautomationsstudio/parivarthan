import React from 'react';
import { useNavigate } from 'react-router-dom';

const TreatmentSummaryReport = () => {
  const navigate = useNavigate();

  const treatmentData = {
    patient: {
      name: 'Sneha Iyer',
      age: 28,
      gender: 'Female',
      mrn: 'MRN-2024-002',
      diagnosis: ['Generalized Anxiety Disorder', 'Panic Disorder'],
      treatmentPeriod: '2024-01-10 to 2024-03-20',
      totalSessions: 12,
      provider: 'Dr. Amit Patel'
    },
    interventions: [
      {
        type: 'Psychotherapy',
        modality: 'Cognitive Behavioral Therapy (CBT)',
        frequency: 'Weekly',
        sessions: 12,
        outcomes: 'Significant improvement in anxiety symptoms'
      },
      {
        type: 'Medication',
        medications: [
          { name: 'Escitalopram', dosage: '10mg daily', duration: '10 weeks', response: 'Good' },
          { name: 'Propranolol', dosage: '20mg as needed', duration: '8 weeks', response: 'Effective' }
        ]
      },
      {
        type: 'Lifestyle Modifications',
        recommendations: ['Regular exercise', 'Sleep hygiene', 'Mindfulness meditation', 'Caffeine reduction']
      }
    ],
    assessmentScores: {
      initial: { gad7: 18, phq9: 12, pss: 28 },
      final: { gad7: 6, phq9: 4, pss: 15 },
      improvement: { gad7: 67, phq9: 67, pss: 46 }
    },
    sessionHighlights: [
      { session: 1, date: '2024-01-10', focus: 'Initial assessment and goal setting' },
      { session: 3, date: '2024-01-24', focus: 'Introduced thought challenging techniques' },
      { session: 6, date: '2024-02-14', focus: 'Exposure therapy for panic triggers' },
      { session: 9, date: '2024-03-06', focus: 'Relapse prevention strategies' },
      { session: 12, date: '2024-03-20', focus: 'Discharge planning and maintenance' }
    ],
    outcomes: {
      primaryGoals: [
        { goal: 'Reduce panic attack frequency', baseline: '3-4 per week', outcome: '0-1 per month', achieved: true },
        { goal: 'Improve sleep quality', baseline: '3/10', outcome: '7/10', achieved: true },
        { goal: 'Return to work full-time', baseline: 'Medical leave', outcome: 'Full-time work resumed', achieved: true },
        { goal: 'Reduce avoidance behaviors', baseline: 'Severe', outcome: 'Minimal', achieved: true }
      ],
      functionalImprovement: 'Patient reports significant improvement in daily functioning, work performance, and social relationships.'
    }
  };

  const getImprovementColor = (percentage) => {
    if (percentage >= 60) return 'text-green-600';
    if (percentage >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6 flex justify-between items-start">
        <div>
          <div className="flex items-center mb-2">
            <button
              onClick={() => navigate('/clinical/reports')}
              className="mr-4 text-gray-600 hover:text-gray-900"
            >
              <i className="fas fa-arrow-left"></i>
            </button>
            <h1 className="text-3xl font-bold text-gray-900">Treatment Summary Report</h1>
          </div>
          <p className="text-gray-600 ml-8">Comprehensive treatment overview and outcomes</p>
        </div>
        <div className="flex space-x-2">
          <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50">
            <i className="fas fa-print mr-2"></i>Print
          </button>
          <button className="bg-serene-blue-500 text-white px-4 py-2 rounded-lg hover:bg-serene-blue-600">
            <i className="fas fa-download mr-2"></i>Export
          </button>
        </div>
      </div>

      {/* Patient Information */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Patient Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-gray-500">Patient Name</p>
            <p className="font-medium text-gray-900">{treatmentData.patient.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Age / Gender</p>
            <p className="font-medium text-gray-900">{treatmentData.patient.age} / {treatmentData.patient.gender}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">MRN</p>
            <p className="font-medium text-gray-900">{treatmentData.patient.mrn}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Primary Diagnosis</p>
            <p className="font-medium text-gray-900">{treatmentData.patient.diagnosis.join(', ')}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Treatment Period</p>
            <p className="font-medium text-gray-900">{treatmentData.patient.treatmentPeriod}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Sessions</p>
            <p className="font-medium text-gray-900">{treatmentData.patient.totalSessions}</p>
          </div>
        </div>
      </div>

      {/* Assessment Score Improvements */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Clinical Assessment Outcomes</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <h3 className="font-medium text-gray-700 mb-2">GAD-7 (Anxiety)</h3>
            <div className="relative">
              <div className={`text-4xl font-bold ${getImprovementColor(treatmentData.assessmentScores.improvement.gad7)}`}>
                {treatmentData.assessmentScores.improvement.gad7}%
              </div>
              <p className="text-sm text-gray-600 mt-1">Improvement</p>
              <div className="mt-3 flex justify-between text-sm">
                <span>Initial: {treatmentData.assessmentScores.initial.gad7}</span>
                <span>Final: {treatmentData.assessmentScores.final.gad7}</span>
              </div>
              <div className="mt-2 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: `${treatmentData.assessmentScores.improvement.gad7}%` }}
                ></div>
              </div>
            </div>
          </div>
          <div className="text-center">
            <h3 className="font-medium text-gray-700 mb-2">PHQ-9 (Depression)</h3>
            <div className="relative">
              <div className={`text-4xl font-bold ${getImprovementColor(treatmentData.assessmentScores.improvement.phq9)}`}>
                {treatmentData.assessmentScores.improvement.phq9}%
              </div>
              <p className="text-sm text-gray-600 mt-1">Improvement</p>
              <div className="mt-3 flex justify-between text-sm">
                <span>Initial: {treatmentData.assessmentScores.initial.phq9}</span>
                <span>Final: {treatmentData.assessmentScores.final.phq9}</span>
              </div>
              <div className="mt-2 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: `${treatmentData.assessmentScores.improvement.phq9}%` }}
                ></div>
              </div>
            </div>
          </div>
          <div className="text-center">
            <h3 className="font-medium text-gray-700 mb-2">PSS (Stress)</h3>
            <div className="relative">
              <div className={`text-4xl font-bold ${getImprovementColor(treatmentData.assessmentScores.improvement.pss)}`}>
                {treatmentData.assessmentScores.improvement.pss}%
              </div>
              <p className="text-sm text-gray-600 mt-1">Improvement</p>
              <div className="mt-3 flex justify-between text-sm">
                <span>Initial: {treatmentData.assessmentScores.initial.pss}</span>
                <span>Final: {treatmentData.assessmentScores.final.pss}</span>
              </div>
              <div className="mt-2 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: `${treatmentData.assessmentScores.improvement.pss}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Treatment Interventions */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Treatment Interventions</h2>
        
        {/* Psychotherapy */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-800 mb-3">
            <i className="fas fa-brain text-purple-600 mr-2"></i>
            Psychotherapy
          </h3>
          <div className="bg-purple-50 rounded-lg p-4">
            <p><span className="font-medium">Modality:</span> {treatmentData.interventions[0].modality}</p>
            <p><span className="font-medium">Frequency:</span> {treatmentData.interventions[0].frequency}</p>
            <p><span className="font-medium">Total Sessions:</span> {treatmentData.interventions[0].sessions}</p>
            <p><span className="font-medium">Outcomes:</span> {treatmentData.interventions[0].outcomes}</p>
          </div>
        </div>

        {/* Medications */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-800 mb-3">
            <i className="fas fa-pills text-green-600 mr-2"></i>
            Medication Management
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Medication</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Dosage</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Duration</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Response</th>
                </tr>
              </thead>
              <tbody>
                {treatmentData.interventions[1].medications.map((med, index) => (
                  <tr key={index} className="border-b">
                    <td className="px-4 py-2">{med.name}</td>
                    <td className="px-4 py-2">{med.dosage}</td>
                    <td className="px-4 py-2">{med.duration}</td>
                    <td className="px-4 py-2">
                      <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                        {med.response}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Lifestyle Modifications */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-3">
            <i className="fas fa-heartbeat text-red-600 mr-2"></i>
            Lifestyle Modifications
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {treatmentData.interventions[2].recommendations.map((rec, index) => (
              <div key={index} className="flex items-center bg-gray-50 rounded-lg p-3">
                <i className="fas fa-check-circle text-green-500 mr-2"></i>
                <span>{rec}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Treatment Goals & Outcomes */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Treatment Goals & Outcomes</h2>
        <div className="space-y-4">
          {treatmentData.outcomes.primaryGoals.map((goal, index) => (
            <div key={index} className="border-l-4 border-green-500 pl-4 py-2">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{goal.goal}</p>
                  <div className="mt-1 text-sm text-gray-600">
                    <span className="mr-4">Baseline: {goal.baseline}</span>
                    <span>Outcome: {goal.outcome}</span>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  goal.achieved ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {goal.achieved ? 'Achieved' : 'In Progress'}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 p-4 bg-green-50 rounded-lg">
          <p className="text-green-800">
            <i className="fas fa-check-circle mr-2"></i>
            <span className="font-semibold">Overall Outcome:</span> {treatmentData.outcomes.functionalImprovement}
          </p>
        </div>
      </div>

      {/* Session Highlights Timeline */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Key Session Milestones</h2>
        <div className="relative">
          {treatmentData.sessionHighlights.map((session, index) => (
            <div key={index} className="flex items-start mb-4">
              <div className="flex-shrink-0 w-12 h-12 bg-serene-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                {session.session}
              </div>
              <div className="ml-4 flex-1">
                <p className="text-sm text-gray-500">{session.date}</p>
                <p className="font-medium text-gray-900">{session.focus}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Discharge Recommendations</h2>
        <ul className="space-y-2">
          <li className="flex items-start">
            <i className="fas fa-arrow-right text-serene-blue-600 mt-1 mr-3"></i>
            <span>Continue maintenance medication (Escitalopram 10mg) for at least 6 months</span>
          </li>
          <li className="flex items-start">
            <i className="fas fa-arrow-right text-serene-blue-600 mt-1 mr-3"></i>
            <span>Monthly follow-up sessions for 3 months, then quarterly</span>
          </li>
          <li className="flex items-start">
            <i className="fas fa-arrow-right text-serene-blue-600 mt-1 mr-3"></i>
            <span>Continue mindfulness practice and exercise routine</span>
          </li>
          <li className="flex items-start">
            <i className="fas fa-arrow-right text-serene-blue-600 mt-1 mr-3"></i>
            <span>Join anxiety support group for peer support</span>
          </li>
          <li className="flex items-start">
            <i className="fas fa-arrow-right text-serene-blue-600 mt-1 mr-3"></i>
            <span>Return immediately if symptoms worsen or new symptoms emerge</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TreatmentSummaryReport;