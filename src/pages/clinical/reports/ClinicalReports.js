import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ClinicalReports = () => {
  const navigate = useNavigate();
  const [selectedReportType, setSelectedReportType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState('30days');

  // Sample patient reports data
  const [reports] = useState([
    {
      id: 'RPT001',
      patientId: 'PT001',
      patientName: 'Arjun Reddy',
      age: 34,
      gender: 'Male',
      reportType: 'Progress Report',
      diagnosis: 'Major Depressive Disorder',
      date: '2024-03-20',
      status: 'Completed',
      severity: 'Moderate',
      provider: 'Dr. Priya Sharma'
    },
    {
      id: 'RPT002',
      patientId: 'PT002',
      patientName: 'Sneha Iyer',
      age: 28,
      gender: 'Female',
      reportType: 'Assessment Report',
      diagnosis: 'Generalized Anxiety Disorder',
      date: '2024-03-19',
      status: 'Completed',
      severity: 'Mild',
      provider: 'Dr. Amit Patel'
    },
    {
      id: 'RPT003',
      patientId: 'PT003',
      patientName: 'Rahul Kumar',
      age: 45,
      gender: 'Male',
      reportType: 'Treatment Summary',
      diagnosis: 'Bipolar Disorder Type II',
      date: '2024-03-18',
      status: 'In Review',
      severity: 'Severe',
      provider: 'Dr. Priya Sharma'
    },
    {
      id: 'RPT004',
      patientId: 'PT004',
      patientName: 'Priya Menon',
      age: 22,
      gender: 'Female',
      reportType: 'Discharge Summary',
      diagnosis: 'Panic Disorder',
      date: '2024-03-17',
      status: 'Completed',
      severity: 'Mild',
      provider: 'Dr. Amit Patel'
    },
    {
      id: 'RPT005',
      patientId: 'PT005',
      patientName: 'Vikram Singh',
      age: 38,
      gender: 'Male',
      reportType: 'Medication Review',
      diagnosis: 'ADHD',
      date: '2024-03-16',
      status: 'Pending',
      severity: 'Moderate',
      provider: 'Dr. Priya Sharma'
    }
  ]);

  const reportTypes = [
    { value: 'all', label: 'All Reports' },
    { value: 'progress', label: 'Progress Reports' },
    { value: 'assessment', label: 'Assessment Reports' },
    { value: 'treatment', label: 'Treatment Summary' },
    { value: 'discharge', label: 'Discharge Summary' },
    { value: 'medication', label: 'Medication Review' }
  ];

  const statistics = {
    total: reports.length,
    completed: reports.filter(r => r.status === 'Completed').length,
    pending: reports.filter(r => r.status === 'Pending').length,
    inReview: reports.filter(r => r.status === 'In Review').length
  };

  const filteredReports = reports.filter(report => {
    const matchesType = selectedReportType === 'all' || 
      report.reportType.toLowerCase().includes(selectedReportType.toLowerCase());
    const matchesSearch = report.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.diagnosis.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  const getSeverityColor = (severity) => {
    switch(severity.toLowerCase()) {
      case 'mild': return 'bg-green-100 text-green-800';
      case 'moderate': return 'bg-yellow-100 text-yellow-800';
      case 'severe': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'In Review': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const viewReport = (reportId) => {
    navigate(`/clinical/reports/${reportId}`);
  };

  const generateNewReport = () => {
    navigate('/clinical/reports/new');
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Clinical Reports</h1>
            <p className="text-gray-600 mt-2">Manage and view patient reports</p>
          </div>
          <button
            onClick={generateNewReport}
            className="bg-serene-blue-500 hover:bg-serene-blue-600 text-white px-4 py-2 rounded-lg font-medium transition"
          >
            <i className="fas fa-plus mr-2"></i>
            Generate New Report
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Reports</p>
              <p className="text-2xl font-bold text-gray-900">{statistics.total}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <i className="fas fa-file-medical text-blue-600 text-xl"></i>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Completed</p>
              <p className="text-2xl font-bold text-green-600">{statistics.completed}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <i className="fas fa-check-circle text-green-600 text-xl"></i>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">{statistics.pending}</p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-lg">
              <i className="fas fa-clock text-yellow-600 text-xl"></i>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">In Review</p>
              <p className="text-2xl font-bold text-blue-600">{statistics.inReview}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <i className="fas fa-eye text-blue-600 text-xl"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by patient name, ID, or diagnosis..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-serene-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={selectedReportType}
            onChange={(e) => setSelectedReportType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-serene-blue-500 focus:border-transparent"
          >
            {reportTypes.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
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
          <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition">
            <i className="fas fa-filter mr-2"></i>
            More Filters
          </button>
        </div>
      </div>

      {/* Reports Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Report ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Patient
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Report Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Diagnosis
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Severity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
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
              {filteredReports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {report.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{report.patientName}</div>
                      <div className="text-sm text-gray-500">{report.age} yrs, {report.gender}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {report.reportType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {report.diagnosis}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full font-medium ${getSeverityColor(report.severity)}`}>
                      {report.severity}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(report.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full font-medium ${getStatusColor(report.status)}`}>
                      {report.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => viewReport(report.id)}
                        className="text-serene-blue-600 hover:text-serene-blue-900"
                        title="View Report"
                      >
                        <i className="fas fa-eye"></i>
                      </button>
                      <button
                        className="text-green-600 hover:text-green-900"
                        title="Download PDF"
                      >
                        <i className="fas fa-download"></i>
                      </button>
                      <button
                        className="text-gray-600 hover:text-gray-900"
                        title="Print"
                      >
                        <i className="fas fa-print"></i>
                      </button>
                      <button
                        className="text-red-600 hover:text-red-900"
                        title="Delete"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="flex-1 flex justify-between sm:hidden">
            <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Previous
            </button>
            <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredReports.length}</span> of{' '}
                <span className="font-medium">{reports.length}</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <i className="fas fa-chevron-left"></i>
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  1
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  2
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  3
                </button>
                <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <i className="fas fa-chevron-right"></i>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <button className="bg-white hover:bg-gray-50 border border-gray-300 rounded-lg p-4 text-left transition">
          <i className="fas fa-file-export text-serene-blue-600 text-xl mb-2"></i>
          <h3 className="font-medium text-gray-900">Export Reports</h3>
          <p className="text-sm text-gray-500">Export all reports to CSV or Excel</p>
        </button>
        <button className="bg-white hover:bg-gray-50 border border-gray-300 rounded-lg p-4 text-left transition">
          <i className="fas fa-chart-bar text-green-600 text-xl mb-2"></i>
          <h3 className="font-medium text-gray-900">Analytics Dashboard</h3>
          <p className="text-sm text-gray-500">View detailed report analytics</p>
        </button>
        <button className="bg-white hover:bg-gray-50 border border-gray-300 rounded-lg p-4 text-left transition">
          <i className="fas fa-cog text-gray-600 text-xl mb-2"></i>
          <h3 className="font-medium text-gray-900">Report Settings</h3>
          <p className="text-sm text-gray-500">Configure report templates and formats</p>
        </button>
      </div>
    </div>
  );
};

export default ClinicalReports;
