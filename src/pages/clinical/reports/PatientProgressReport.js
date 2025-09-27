import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

const PatientProgressReport = () => {
  const { reportId } = useParams();
  const navigate = useNavigate();

  // Sample patient data
  const patientData = {
    id: 'PT001',
    name: 'Arjun Reddy',
    age: 34,
    gender: 'Male',
    mrn: 'MRN-2024-001',
    diagnosis: 'Major Depressive Disorder',
    admissionDate: '2024-01-15',
    provider: 'Dr. Priya Sharma',
    lastVisit: '2024-03-20',
    nextAppointment: '2024-04-03'
  };

  // Progress tracking data
  const progressData = {
    phq9Scores: [
      { date: '2024-01-15', score: 18, severity: 'Moderately Severe' },
      { date: '2024-02-01', score: 15, severity: 'Moderately Severe' },
      { date: '2024-02-15', score: 12, severity: 'Moderate' },
      { date: '2024-03-01', score: 9, severity: 'Mild' },
      { date: '2024-03-15', score: 7, severity: 'Mild' }
    ],
    medications: [
      { name: 'Sertraline', dosage: '50mg', frequency: 'Once daily', startDate: '2024-01-15', status: 'Active' },
      { name: 'Alprazolam', dosage: '0.5mg', frequency: 'As needed', startDate: '2024-01-20', status: 'Active' }
    ],
    therapySessions: [
      { date: '2024-01-20', type: 'CBT', duration: '50 min', therapist: 'Dr. Amit Patel', notes: 'Initial assessment completed' },
      { date: '2024-02-03', type: 'CBT', duration: '50 min', therapist: 'Dr. Amit Patel', notes: 'Cognitive restructuring introduced' },
      { date: '2024-02-17', type: 'CBT', duration: '50 min', therapist: 'Dr. Amit Patel', notes: 'Good progress with thought records' },
      { date: '2024-03-02', type: 'CBT', duration: '50 min', therapist: 'Dr. Amit Patel', notes: 'Behavioral activation showing results' },
      { date: '2024-03-16', type: 'CBT', duration: '50 min', therapist: 'Dr. Amit Patel', notes: 'Relapse prevention strategies discussed' }
    ],
    symptoms: {
      mood: { baseline: 3, current: 7, trend: 'improving' },
      sleep: { baseline: 4, current: 6, trend: 'improving' },
      appetite: { baseline: 5, current: 7, trend: 'stable' },
      energy: { baseline: 3, current: 6, trend: 'improving' },
      concentration: { baseline: 4, current: 6, trend: 'improving' },
      socialActivity: { baseline: 2, current: 5, trend: 'improving' }
    }
  };

  const getTrendIcon = (trend) => {
    if (trend === 'improving') return <i className="fas fa-arrow-up text-green-500"></i>;
    if (trend === 'declining') return <i className="fas fa-arrow-down text-red-500"></i>;
    return <i className="fas fa-minus text-gray-500"></i>;
  };

  const getProgressColor = (baseline, current) => {
    const improvement = current - baseline;
    if (improvement >= 3) return 'text-green-600';
    if (improvement >= 1) return 'text-yellow-600';
    return 'text-gray-600';
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExport = () => {
    alert('Exporting report as PDF...');
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
            <h1 className="text-3xl font-bold text-gray-900">Patient Progress Report</h1>
          </div>
          <p className="text-gray-600">Comprehensive progress tracking and treatment outcomes</p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={handlePrint}
            className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition"
          >
            <i className="fas fa-print mr-2"></i>
            Print
          </button>
          <button
            onClick={handleExport}
            className="bg-serene-blue-500 text-white px-4 py-2 rounded-lg hover:bg-serene-blue-600 transition"
          >
            <i className="fas fa-download mr-2"></i>
            Export PDF
          </button>
        </div>
      </div>

      {/* Patient Information Card */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Patient Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-gray-500">Name</p>
            <p className="font-medium text-gray-900">{patientData.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Age / Gender</p>
            <p className="font-medium text-gray-900">{patientData.age} years / {patientData.gender}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">MRN</p>
            <p className="font-medium text-gray-900">{patientData.mrn}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Primary Diagnosis</p>
            <p className="font-medium text-gray-900">{patientData.diagnosis}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Treating Provider</p>
            <p className="font-medium text-gray-900">{patientData.provider}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Treatment Duration</p>
            <p className="font-medium text-gray-900">10 weeks</p>
          </div>
        </div>
      </div>

      {/* Depression Score Trend */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">PHQ-9 Score Progression</h2>
        <div className="space-y-4">
          {progressData.phq9Scores.map((score, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-serene-blue-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-serene-blue-600 font-bold">{score.score}</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{new Date(score.date).toLocaleDateString()}</p>
                  <p className="text-sm text-gray-600">{score.severity}</p>
                </div>
              </div>
              {index > 0 && (
                <div className="flex items-center">
                  <span className={`text-sm font-medium ${
                    score.score < progressData.phq9Scores[index - 1].score ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {score.score < progressData.phq9Scores[index - 1].score ? '↓' : '↑'}
                    {Math.abs(score.score - progressData.phq9Scores[index - 1].score)} points
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="mt-4 p-4 bg-green-50 rounded-lg">
          <p className="text-green-800">
            <i className="fas fa-check-circle mr-2"></i>
            Overall improvement: {progressData.phq9Scores[0].score - progressData.phq9Scores[progressData.phq9Scores.length - 1].score} points reduction (61% improvement)
          </p>
        </div>
      </div>

      {/* Symptom Progress */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Symptom Progress</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(progressData.symptoms).map(([key, data]) => (
            <div key={key} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-gray-900 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </h3>
                {getTrendIcon(data.trend)}
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-500">Baseline</span>
                    <span className="text-gray-500">Current</span>
                  </div>
                  <div className="relative pt-1">
                    <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                      <div
                        style={{ width: `${data.current * 10}%` }}
                        className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-serene-blue-500`}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs mt-1">
                      <span className="font-bold">{data.baseline}/10</span>
                      <span className={`font-bold ${getProgressColor(data.baseline, data.current)}`}>
                        {data.current}/10
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Current Medications */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Current Medications</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Medication</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Dosage</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Frequency</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Start Date</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {progressData.medications.map((med, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 text-gray-900">{med.name}</td>
                  <td className="px-4 py-2 text-gray-600">{med.dosage}</td>
                  <td className="px-4 py-2 text-gray-600">{med.frequency}</td>
                  <td className="px-4 py-2 text-gray-600">{med.startDate}</td>
                  <td className="px-4 py-2">
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                      {med.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Therapy Sessions Summary */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Therapy Sessions</h2>
        <div className="space-y-3">
          {progressData.therapySessions.map((session, index) => (
            <div key={index} className="border-l-4 border-serene-blue-500 pl-4 py-2">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium text-gray-900">
                    {session.type} - {session.duration}
                  </p>
                  <p className="text-sm text-gray-600">{session.therapist}</p>
                  <p className="text-sm text-gray-700 mt-1">{session.notes}</p>
                </div>
                <p className="text-sm text-gray-500">{new Date(session.date).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Clinical Notes */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Clinical Summary</h2>
        <div className="prose max-w-none text-gray-700">
          <p className="mb-4">
            Patient has shown significant improvement over the 10-week treatment period. Initial presentation 
            with severe depressive symptoms (PHQ-9: 18) has improved to mild range (PHQ-9: 7). The combination 
            of pharmacotherapy (Sertraline 50mg) and weekly CBT sessions has been effective.
          </p>
          <h3 className="font-semibold text-gray-900 mb-2">Key Improvements:</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>Mood has improved from 3/10 to 7/10</li>
            <li>Sleep patterns normalizing (6/10)</li>
            <li>Increased social engagement (from 2/10 to 5/10)</li>
            <li>Better concentration and work functionality</li>
            <li>No reported suicidal ideation in past 6 weeks</li>
          </ul>
          <h3 className="font-semibold text-gray-900 mb-2 mt-4">Recommendations:</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>Continue current medication regimen</li>
            <li>Transition to bi-weekly therapy sessions</li>
            <li>Introduce mindfulness-based stress reduction</li>
            <li>Monitor for seasonal pattern effects</li>
            <li>Follow-up appointment in 2 weeks</li>
          </ul>
        </div>
      </div>

      {/* Provider Signature */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-end">
          <div>
            <p className="text-sm text-gray-500">Report Generated By</p>
            <p className="font-medium text-gray-900">{patientData.provider}</p>
            <p className="text-sm text-gray-600">Psychiatrist</p>
            <p className="text-sm text-gray-600">License: PSY-2024-1234</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Date</p>
            <p className="font-medium text-gray-900">{new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientProgressReport;