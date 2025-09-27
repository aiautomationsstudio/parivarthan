import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const PHQ9Reports = () => {
  const navigate = useNavigate();
  const [selectedPatient, setSelectedPatient] = useState('all');
  const [dateRange, setDateRange] = useState('30days');

  const assessmentData = [
    {
      id: 'ASS001',
      patientName: 'Arjun Reddy',
      patientId: 'PT001',
      assessmentDate: '2024-03-20',
      score: 7,
      severity: 'Mild',
      previousScore: 12,
      change: -5,
      provider: 'Dr. Priya Sharma',
      status: 'Reviewed'
    },
    {
      id: 'ASS002',
      patientName: 'Sneha Iyer',
      patientId: 'PT002',
      assessmentDate: '2024-03-19',
      score: 15,
      severity: 'Moderately Severe',
      previousScore: 18,
      change: -3,
      provider: 'Dr. Amit Patel',
      status: 'Pending Review'
    },
    {
      id: 'ASS003',
      patientName: 'Rahul Kumar',
      patientId: 'PT003',
      assessmentDate: '2024-03-18',
      score: 22,
      severity: 'Severe',
      previousScore: 20,
      change: 2,
      provider: 'Dr. Priya Sharma',
      status: 'Flagged'
    },
    {
      id: 'ASS004',
      patientName: 'Priya Menon',
      patientId: 'PT004',
      assessmentDate: '2024-03-17',
      score: 4,
      severity: 'Minimal',
      previousScore: 9,
      change: -5,
      provider: 'Dr. Amit Patel',
      status: 'Reviewed'
    },
    {
      id: 'ASS005',
      patientName: 'Vikram Singh',
      patientId: 'PT005',
      assessmentDate: '2024-03-16',
      score: 11,
      severity: 'Moderate',
      previousScore: 14,
      change: -3,
      provider: 'Dr. Priya Sharma',
      status: 'Reviewed'
    }
  ];

  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'Minimal': return 'bg-green-100 text-green-800';
      case 'Mild': return 'bg-yellow-100 text-yellow-800';
      case 'Moderate': return 'bg-orange-100 text-orange-800';
      case 'Moderately Severe': return 'bg-red-100 text-red-800';
      case 'Severe': return 'bg-red-200 text-red-900';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getChangeIndicator = (change) => {
    if (change < 0) {
      return (
        <span className="text-green-600 font-medium">
          <i className="fas fa-arrow-down mr-1"></i>
          {Math.abs(change)} points
        </span>
      );
    } else if (change > 0) {
      return (
        <span className="text-red-600 font-medium">
          <i className="fas fa-arrow-up mr-1"></i>
          {change} points
        </span>
      );
    }
    return <span className="text-gray-600">No change</span>;
  };

  const statistics = {
    total: assessmentData.length,
    improved: assessmentData.filter(a => a.change < 0).length,
    worsened: assessmentData.filter(a => a.change > 0).length,
    avgScore: Math.round(assessmentData.reduce((sum, a) => sum + a.score, 0) / assessmentData.length)
  };

  const severityBreakdown = {
    minimal: assessmentData.filter(a => a.severity === 'Minimal').length,
    mild: assessmentData.filter(a => a.severity === 'Mild').length,
    moderate: assessmentData.filter(a => a.severity === 'Moderate').length,
    moderatelySevere: assessmentData.filter(a => a.severity === 'Moderately Severe').length,
    severe: assessmentData.filter(a => a.severity === 'Severe').length
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center mb-2">
          <button
            onClick={() => navigate('/clinical/reports')}
            className="mr-4 text-gray-600 hover:text-gray-900"
          >
            <i className="fas fa-arrow-left"></i>
          </button>
          <h1 className="text-3xl font-bold text-gray-900">PHQ-9 Assessment Reports</h1>
        </div>
        <p className="text-gray-600 ml-8">Depression screening assessment results and trends</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Assessments</p>
              <p className="text-2xl font-bold text-gray-900">{statistics.total}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <i className="fas fa-clipboard-check text-blue-600 text-xl"></i>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Improved</p>
              <p className="text-2xl font-bold text-green-600">{statistics.improved}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <i className="fas fa-arrow-down text-green-600 text-xl"></i>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Worsened</p>
              <p className="text-2xl font-bold text-red-600">{statistics.worsened}</p>
            </div>
            <div className="bg-red-100 p-3 rounded-lg">
              <i className="fas fa-arrow-up text-red-600 text-xl"></i>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Avg Score</p>
              <p className="text-2xl font-bold text-gray-900">{statistics.avgScore}/27</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <i className="fas fa-chart-line text-purple-600 text-xl"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Severity Distribution */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Severity Distribution</h2>
        <div className="space-y-3">
          <div className="flex items-center">
            <span className="w-32 text-sm text-gray-600">Minimal (0-4)</span>
            <div className="flex-1 bg-gray-200 rounded-full h-8 mr-4">
              <div
                className="bg-green-500 h-8 rounded-full flex items-center justify-center text-white text-sm"
                style={{ width: `${(severityBreakdown.minimal / statistics.total) * 100}%` }}
              >
                {severityBreakdown.minimal}
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <span className="w-32 text-sm text-gray-600">Mild (5-9)</span>
            <div className="flex-1 bg-gray-200 rounded-full h-8 mr-4">
              <div
                className="bg-yellow-500 h-8 rounded-full flex items-center justify-center text-white text-sm"
                style={{ width: `${(severityBreakdown.mild / statistics.total) * 100}%` }}
              >
                {severityBreakdown.mild}
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <span className="w-32 text-sm text-gray-600">Moderate (10-14)</span>
            <div className="flex-1 bg-gray-200 rounded-full h-8 mr-4">
              <div
                className="bg-orange-500 h-8 rounded-full flex items-center justify-center text-white text-sm"
                style={{ width: `${(severityBreakdown.moderate / statistics.total) * 100}%` }}
              >
                {severityBreakdown.moderate}
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <span className="w-32 text-sm text-gray-600">Mod. Severe (15-19)</span>
            <div className="flex-1 bg-gray-200 rounded-full h-8 mr-4">
              <div
                className="bg-red-500 h-8 rounded-full flex items-center justify-center text-white text-sm"
                style={{ width: `${(severityBreakdown.moderatelySevere / statistics.total) * 100}%` }}
              >
                {severityBreakdown.moderatelySevere}
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <span className="w-32 text-sm text-gray-600">Severe (20-27)</span>
            <div className="flex-1 bg-gray-200 rounded-full h-8 mr-4">
              <div
                className="bg-red-700 h-8 rounded-full flex items-center justify-center text-white text-sm"
                style={{ width: `${(severityBreakdown.severe / statistics.total) * 100}%` }}
              >
                {severityBreakdown.severe}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex flex-wrap gap-4">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-serene-blue-500 focus:border-transparent"
          >
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="90days">Last 90 Days</option>
            <option value="all">All Time</option>
          </select>
          <select
            value={selectedPatient}
            onChange={(e) => setSelectedPatient(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-serene-blue-500 focus:border-transparent"
          >
            <option value="all">All Patients</option>
            <option value="PT001">Arjun Reddy</option>
            <option value="PT002">Sneha Iyer</option>
            <option value="PT003">Rahul Kumar</option>
          </select>
          <button className="bg-serene-blue-500 text-white px-4 py-2 rounded-lg hover:bg-serene-blue-600 transition">
            <i className="fas fa-download mr-2"></i>
            Export Data
          </button>
        </div>
      </div>

      {/* Assessment Results Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assessment ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Patient
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Severity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Change
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Provider
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {assessmentData.map((assessment) => (
                <tr key={assessment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {assessment.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{assessment.patientName}</div>
                    <div className="text-sm text-gray-500">{assessment.patientId}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(assessment.assessmentDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-2xl font-bold text-gray-900">{assessment.score}</div>
                    <div className="text-xs text-gray-500">Previous: {assessment.previousScore}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full font-medium ${getSeverityColor(assessment.severity)}`}>
                      {assessment.severity}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getChangeIndicator(assessment.change)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {assessment.provider}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                      assessment.status === 'Reviewed' ? 'bg-green-100 text-green-800' :
                      assessment.status === 'Pending Review' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {assessment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex space-x-2">
                      <button className="text-serene-blue-600 hover:text-serene-blue-900" title="View Details">
                        <i className="fas fa-eye"></i>
                      </button>
                      <button className="text-green-600 hover:text-green-900" title="Download PDF">
                        <i className="fas fa-download"></i>
                      </button>
                      <button className="text-gray-600 hover:text-gray-900" title="Compare">
                        <i className="fas fa-chart-bar"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Clinical Alerts */}
      <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4">
        <h3 className="font-semibold text-red-900 mb-2">
          <i className="fas fa-exclamation-triangle mr-2"></i>
          Clinical Alerts
        </h3>
        <ul className="space-y-2 text-sm text-red-800">
          <li>• Patient "Rahul Kumar" shows worsening symptoms (Score increased from 20 to 22)</li>
          <li>• 1 patient with severe depression requires immediate intervention</li>
          <li>• 1 assessment pending review for more than 24 hours</li>
        </ul>
      </div>
    </div>
  );
};

export default PHQ9Reports;