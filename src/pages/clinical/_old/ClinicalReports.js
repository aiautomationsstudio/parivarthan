import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ClinicalReports = () => {
  const navigate = useNavigate();
  
  // State management
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState(null);
  const [filters, setFilters] = useState({
    reportType: 'all',
    dateRange: '30days',
    patientSearch: '',
    status: 'all'
  });
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const [showExportModal, setShowExportModal] = useState(false);

  // Mock data for demonstration - IDs match what ReportDetails expects
  const mockReports = [
    {
      id: 1,
      patientName: 'John Doe',
      patientId: 'PT-2024-001',
      reportType: 'Progress Report',
      date: '2025-01-15',
      status: 'completed',
      clinician: 'Dr. Sarah Johnson',
      summary: 'Patient showing significant improvement in anxiety symptoms',
      assessmentScores: { PHQ9: 8, GAD7: 6, improvement: '+25%' }
    },
    {
      id: 2,
      patientName: 'Jane Smith',
      patientId: 'PT-2024-002',
      reportType: 'Treatment Summary',
      date: '2025-01-14',
      status: 'pending-review',
      clinician: 'Dr. Michael Chen',
      summary: '12-week CBT program completed successfully',
      assessmentScores: { PHQ9: 12, GAD7: 10, improvement: '+15%' }
    },
    {
      id: 3,
      patientName: 'Robert Johnson',
      patientId: 'PT-2024-003',
      reportType: 'Assessment Report',
      date: '2025-01-13',
      status: 'draft',
      clinician: 'Dr. Sarah Johnson',
      summary: 'Initial assessment completed, moderate depression identified',
      assessmentScores: { PHQ9: 15, GAD7: 8, improvement: 'N/A' }
    },
    {
      id: 4,
      patientName: 'Emily Brown',
      patientId: 'PT-2024-004',
      reportType: 'Discharge Summary',
      date: '2025-01-12',
      status: 'completed',
      clinician: 'Dr. Lisa Wang',
      summary: 'Patient successfully completed treatment program',
      assessmentScores: { PHQ9: 5, GAD7: 4, improvement: '+40%' }
    },
    {
      id: 5,
      patientName: 'Michael Davis',
      patientId: 'PT-2024-005',
      reportType: 'Progress Report',
      date: '2025-01-11',
      status: 'completed',
      clinician: 'Dr. Michael Chen',
      summary: 'Ongoing therapy showing positive outcomes',
      assessmentScores: { PHQ9: 10, GAD7: 12, improvement: '+20%' }
    }
  ];

  // Report statistics for dashboard
  const [statistics, setStatistics] = useState({
    totalReports: 0,
    completedReports: 0,
    pendingReports: 0,
    averageImprovement: 0
  });

  // Load reports on component mount
  useEffect(() => {
    loadReports();
  }, []);

  // Filter reports when filters change
  useEffect(() => {
    filterReports();
  }, [filters, reports]);

  const loadReports = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setReports(mockReports);
      calculateStatistics(mockReports);
      setLoading(false);
    }, 1000);
  };

  const calculateStatistics = (reportData) => {
    const total = reportData.length;
    const completed = reportData.filter(r => r.status === 'completed').length;
    const pending = reportData.filter(r => r.status === 'pending-review').length;
    
    const improvements = reportData
      .filter(r => r.assessmentScores.improvement !== 'N/A')
      .map(r => parseInt(r.assessmentScores.improvement));
    
    const avgImprovement = improvements.length > 0 
      ? improvements.reduce((a, b) => a + b, 0) / improvements.length 
      : 0;

    setStatistics({
      totalReports: total,
      completedReports: completed,
      pendingReports: pending,
      averageImprovement: avgImprovement.toFixed(1)
    });
  };

  const filterReports = () => {
    let filtered = [...reports];

    // Filter by report type
    if (filters.reportType !== 'all') {
      filtered = filtered.filter(r => r.reportType === filters.reportType);
    }

    // Filter by status
    if (filters.status !== 'all') {
      filtered = filtered.filter(r => r.status === filters.status);
    }

    // Filter by patient search
    if (filters.patientSearch) {
      filtered = filtered.filter(r => 
        r.patientName.toLowerCase().includes(filters.patientSearch.toLowerCase()) ||
        r.patientId.toLowerCase().includes(filters.patientSearch.toLowerCase())
      );
    }

    // Filter by date range
    const today = new Date();
    const filterDate = new Date();
    
    switch (filters.dateRange) {
      case '7days':
        filterDate.setDate(today.getDate() - 7);
        break;
      case '30days':
        filterDate.setDate(today.getDate() - 30);
        break;
      case '90days':
        filterDate.setDate(today.getDate() - 90);
        break;
      case 'all':
      default:
        filterDate.setFullYear(2000);
    }

    filtered = filtered.filter(r => new Date(r.date) >= filterDate);

    setFilteredReports(filtered);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  // FIXED: Navigation functions with proper paths
  const handleViewReport = (reportId) => {
    console.log('Navigating to report:', reportId);
    navigate(`/clinical/reports/${reportId}`);
  };

  const handleEditReport = (reportId) => {
    console.log('Navigating to edit report:', reportId);
    navigate(`/clinical/reports/edit/${reportId}`);
  };

  const handleCreateNewReport = () => {
    console.log('Creating new report');
    navigate('/clinical/reports/new');
  };

  const handleDeleteReport = (reportId) => {
    if (window.confirm('Are you sure you want to delete this report? This action cannot be undone.')) {
      setReports(prev => prev.filter(r => r.id !== reportId));
      // In production, would also call API to delete
      alert('Report deleted successfully');
      
      // Recalculate statistics after deletion
      const updatedReports = reports.filter(r => r.id !== reportId);
      calculateStatistics(updatedReports);
    }
  };

  const handleExportReport = (format) => {
    const dataToExport = selectedReport ? [selectedReport] : filteredReports;
    
    if (format === 'csv') {
      exportToCSV(dataToExport);
    } else if (format === 'excel') {
      exportToExcel(dataToExport);
    } else if (format === 'pdf') {
      exportToPDF(dataToExport);
    }
    
    setShowExportModal(false);
    alert(`Successfully exported ${dataToExport.length} report(s) in ${format.toUpperCase()} format`);
  };

  const exportToCSV = (data) => {
    const headers = ['Patient Name', 'Patient ID', 'Report Type', 'Date', 'Status', 'PHQ-9', 'GAD-7', 'Improvement', 'Clinician'];
    const rows = data.map(r => [
      r.patientName,
      r.patientId,
      r.reportType,
      r.date,
      r.status,
      r.assessmentScores.PHQ9,
      r.assessmentScores.GAD7,
      r.assessmentScores.improvement,
      r.clinician
    ]);
    
    const csvContent = [headers, ...rows].map(e => e.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `clinical_reports_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const exportToExcel = (data) => {
    const table = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office" 
            xmlns:x="urn:schemas-microsoft-com:office:excel" 
            xmlns="http://www.w3.org/TR/REC-html40">
      <head>
        <meta charset="utf-8">
        <!--[if gte mso 9]>
        <xml>
          <x:ExcelWorkbook>
            <x:ExcelWorksheets>
              <x:ExcelWorksheet>
                <x:Name>Clinical Reports</x:Name>
                <x:WorksheetOptions>
                  <x:DisplayGridlines/>
                </x:WorksheetOptions>
              </x:ExcelWorksheet>
            </x:ExcelWorksheets>
          </x:ExcelWorkbook>
        </xml>
        <![endif]-->
      </head>
      <body>
        <table border="1">
          <tr>
            <th>Patient Name</th><th>Patient ID</th><th>Report Type</th>
            <th>Date</th><th>Status</th><th>PHQ-9</th><th>GAD-7</th>
            <th>Improvement</th><th>Clinician</th>
          </tr>
          ${data.map(r => `
            <tr>
              <td>${r.patientName}</td><td>${r.patientId}</td><td>${r.reportType}</td>
              <td>${r.date}</td><td>${r.status}</td><td>${r.assessmentScores.PHQ9}</td>
              <td>${r.assessmentScores.GAD7}</td><td>${r.assessmentScores.improvement}</td>
              <td>${r.clinician}</td>
            </tr>
          `).join('')}
        </table>
      </body>
      </html>
    `;
    
    const blob = new Blob([table], { type: 'application/vnd.ms-excel' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `clinical_reports_${new Date().toISOString().split('T')[0]}.xls`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const exportToPDF = (data) => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      const reportHTML = generateHTMLReport(data[0] || filteredReports[0]);
      printWindow.document.write(reportHTML);
      printWindow.document.close();
      setTimeout(() => {
        printWindow.print();
      }, 500);
    }
  };

  const handlePrintReport = (report) => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      const reportHTML = generateHTMLReport(report);
      printWindow.document.write(reportHTML);
      printWindow.document.close();
      setTimeout(() => {
        printWindow.print();
      }, 500);
    }
  };

  const handleDownloadHTMLReport = (report) => {
    const htmlContent = generateHTMLReport(report);
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `clinical_report_${report.patientId}_${new Date().toISOString().split('T')[0]}.html`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const generateHTMLReport = (report) => {
    if (!report) return '';
    
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Clinical Report - ${report.patientName}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background: #f5f5f5;
            padding: 20px;
        }
        
        .container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            padding: 40px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        
        .header {
            border-bottom: 3px solid #0ea5e9;
            padding-bottom: 20px;
            margin-bottom: 30px;
        }
        
        .clinic-info {
            text-align: center;
            margin-bottom: 20px;
        }
        
        .clinic-name {
            font-size: 28px;
            font-weight: bold;
            color: #0ea5e9;
            margin-bottom: 5px;
        }
        
        .clinic-tagline {
            color: #666;
            font-style: italic;
        }
        
        .report-title {
            text-align: center;
            font-size: 24px;
            color: #333;
            margin: 20px 0;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        
        .section {
            margin-bottom: 30px;
        }
        
        .section-title {
            font-size: 18px;
            font-weight: bold;
            color: #0ea5e9;
            border-bottom: 2px solid #e5e7eb;
            padding-bottom: 10px;
            margin-bottom: 15px;
        }
        
        .info-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 15px;
            margin-bottom: 20px;
        }
        
        .info-item {
            padding: 10px;
            background: #f9fafb;
            border-radius: 5px;
        }
        
        .info-label {
            font-size: 12px;
            color: #666;
            text-transform: uppercase;
            margin-bottom: 5px;
        }
        
        .info-value {
            font-size: 16px;
            font-weight: 600;
            color: #333;
        }
        
        .scores-container {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
            margin: 20px 0;
        }
        
        .score-card {
            text-align: center;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border-radius: 10px;
        }
        
        .score-card.green {
            background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
        }
        
        .score-card.blue {
            background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%);
        }
        
        .score-label {
            font-size: 14px;
            margin-bottom: 10px;
            opacity: 0.9;
        }
        
        .score-value {
            font-size: 36px;
            font-weight: bold;
        }
        
        .summary-box {
            background: #f0f9ff;
            border-left: 4px solid #0ea5e9;
            padding: 20px;
            margin: 20px 0;
            border-radius: 5px;
        }
        
        .summary-text {
            font-size: 16px;
            line-height: 1.8;
            color: #333;
        }
        
        .recommendations {
            background: #f0fdf4;
            border: 1px solid #22c55e;
            padding: 20px;
            border-radius: 5px;
            margin: 20px 0;
        }
        
        .recommendation-item {
            margin: 10px 0;
            padding-left: 25px;
            position: relative;
        }
        
        .recommendation-item:before {
            content: "✓";
            position: absolute;
            left: 0;
            color: #22c55e;
            font-weight: bold;
        }
        
        .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 2px solid #e5e7eb;
            text-align: center;
            color: #666;
            font-size: 14px;
        }
        
        .signature-section {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 40px;
            margin: 40px 0;
        }
        
        .signature-box {
            text-align: center;
        }
        
        .signature-line {
            border-bottom: 2px solid #333;
            margin-bottom: 10px;
            height: 50px;
        }
        
        .badge {
            display: inline-block;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: bold;
            text-transform: uppercase;
        }
        
        .badge.completed {
            background: #dcfce7;
            color: #16a34a;
        }
        
        .badge.pending-review {
            background: #fef3c7;
            color: #d97706;
        }
        
        .badge.draft {
            background: #f3f4f6;
            color: #6b7280;
        }
        
        @media print {
            body {
                background: white;
                padding: 0;
            }
            .container {
                box-shadow: none;
                padding: 20px;
            }
        }
        
        @media (max-width: 768px) {
            .info-grid,
            .scores-container,
            .signature-section {
                grid-template-columns: 1fr;
            }
            
            .container {
                padding: 20px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header Section -->
        <div class="header">
            <div class="clinic-info">
                <div class="clinic-name">PARIVARTHAN MENTAL HEALTH CLINIC</div>
                <div class="clinic-tagline">Transforming Lives Through Compassionate Care</div>
                <div style="margin-top: 10px; color: #666;">
                    <div>📍 123 Healthcare Boulevard, Medical District</div>
                    <div>📞 +91-9876543210 | 📧 reports@parivarthan.com</div>
                </div>
            </div>
        </div>
        
        <!-- Report Title -->
        <h1 class="report-title">${report.reportType}</h1>
        
        <!-- Report Status -->
        <div style="text-align: center; margin-bottom: 30px;">
            <span class="badge ${report.status.replace('-', '')}">
                ${report.status.replace('-', ' ').toUpperCase()}
            </span>
        </div>
        
        <!-- Patient Information Section -->
        <div class="section">
            <h2 class="section-title">PATIENT INFORMATION</h2>
            <div class="info-grid">
                <div class="info-item">
                    <div class="info-label">Patient Name</div>
                    <div class="info-value">${report.patientName}</div>
                </div>
                <div class="info-item">
                    <div class="info-label">Patient ID</div>
                    <div class="info-value">${report.patientId}</div>
                </div>
                <div class="info-item">
                    <div class="info-label">Report Date</div>
                    <div class="info-value">${new Date(report.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                    })}</div>
                </div>
                <div class="info-item">
                    <div class="info-label">Clinician</div>
                    <div class="info-value">${report.clinician}</div>
                </div>
            </div>
        </div>
        
        <!-- Assessment Scores Section -->
        <div class="section">
            <h2 class="section-title">ASSESSMENT SCORES</h2>
            <div class="scores-container">
                <div class="score-card blue">
                    <div class="score-label">PHQ-9 Score</div>
                    <div class="score-value">${report.assessmentScores.PHQ9}</div>
                    <div style="font-size: 12px; margin-top: 5px;">
                        ${report.assessmentScores.PHQ9 < 5 ? 'Minimal' : 
                          report.assessmentScores.PHQ9 < 10 ? 'Mild' :
                          report.assessmentScores.PHQ9 < 15 ? 'Moderate' :
                          report.assessmentScores.PHQ9 < 20 ? 'Moderately Severe' : 'Severe'} Depression
                    </div>
                </div>
                <div class="score-card">
                    <div class="score-label">GAD-7 Score</div>
                    <div class="score-value">${report.assessmentScores.GAD7}</div>
                    <div style="font-size: 12px; margin-top: 5px;">
                        ${report.assessmentScores.GAD7 < 5 ? 'Minimal' : 
                          report.assessmentScores.GAD7 < 10 ? 'Mild' :
                          report.assessmentScores.GAD7 < 15 ? 'Moderate' : 'Severe'} Anxiety
                    </div>
                </div>
                <div class="score-card green">
                    <div class="score-label">Improvement</div>
                    <div class="score-value">${report.assessmentScores.improvement}</div>
                    <div style="font-size: 12px; margin-top: 5px;">From Baseline</div>
                </div>
            </div>
        </div>
        
        <!-- Clinical Summary Section -->
        <div class="section">
            <h2 class="section-title">CLINICAL SUMMARY</h2>
            <div class="summary-box">
                <div class="summary-text">
                    ${report.summary}
                </div>
            </div>
        </div>
        
        <!-- Treatment Recommendations -->
        <div class="section">
            <h2 class="section-title">TREATMENT RECOMMENDATIONS</h2>
            <div class="recommendations">
                <div class="recommendation-item">
                    Continue current medication regimen with regular monitoring
                </div>
                <div class="recommendation-item">
                    Weekly psychotherapy sessions focusing on cognitive behavioral therapy
                </div>
                <div class="recommendation-item">
                    Daily mindfulness exercises and mood tracking
                </div>
                <div class="recommendation-item">
                    Follow-up appointment scheduled in 2 weeks
                </div>
                <div class="recommendation-item">
                    Encourage participation in group therapy sessions
                </div>
            </div>
        </div>
        
        <!-- Next Steps -->
        <div class="section">
            <h2 class="section-title">NEXT STEPS</h2>
            <div class="info-grid">
                <div class="info-item">
                    <div class="info-label">Next Appointment</div>
                    <div class="info-value">${new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString()}</div>
                </div>
                <div class="info-item">
                    <div class="info-label">Medication Review</div>
                    <div class="info-value">${new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}</div>
                </div>
            </div>
        </div>
        
        <!-- Signature Section -->
        <div class="signature-section">
            <div class="signature-box">
                <div class="signature-line"></div>
                <div>${report.clinician}</div>
                <div style="color: #666; font-size: 12px;">Licensed Psychiatrist</div>
                <div style="color: #666; font-size: 12px;">Lic# PSY-2024-0001</div>
            </div>
            <div class="signature-box">
                <div class="signature-line"></div>
                <div>Date: ${new Date().toLocaleDateString()}</div>
                <div style="color: #666; font-size: 12px;">Report Generated</div>
            </div>
        </div>
        
        <!-- Footer -->
        <div class="footer">
            <p><strong>CONFIDENTIAL MEDICAL RECORD</strong></p>
            <p>This report contains sensitive medical information protected under patient privacy laws.</p>
            <p>© 2025 Parivarthan Mental Health Clinic. All rights reserved.</p>
            <p style="margin-top: 10px;">Report ID: RPT-${report.id}-${new Date().getTime()}</p>
        </div>
    </div>
</body>
</html>
    `;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-growth-green-100 text-growth-green-800';
      case 'pending-review':
        return 'bg-yellow-100 text-yellow-800';
      case 'draft':
        return 'bg-mindful-gray-100 text-mindful-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return 'fa-check-circle';
      case 'pending-review':
        return 'fa-clock';
      case 'draft':
        return 'fa-edit';
      default:
        return 'fa-file';
    }
  };

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Clinical Reports</h1>
            <p className="text-gray-600 mt-1">Manage and generate patient reports</p>
          </div>
          <div className="flex gap-2 mt-4 md:mt-0">
            <button
              onClick={handleCreateNewReport}
              className="bg-serene-blue-500 hover:bg-serene-blue-600 text-white px-4 py-2 rounded-lg transition duration-200 flex items-center"
            >
              <i className="fas fa-plus mr-2"></i>
              New Report
            </button>
            <button
              onClick={() => setShowExportModal(true)}
              className="bg-white border border-mindful-gray-300 hover:bg-mindful-gray-50 text-mindful-gray-700 px-4 py-2 rounded-lg transition duration-200 flex items-center"
            >
              <i className="fas fa-download mr-2"></i>
              Export
            </button>
          </div>
        </div>

        {/* Statistics Cards - Tablet Responsive */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm border border-mindful-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-mindful-gray-600">Total Reports</p>
                <p className="text-2xl font-bold text-gray-900">{statistics.totalReports}</p>
              </div>
              <div className="text-serene-blue-500">
                <i className="fas fa-file-medical text-2xl"></i>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-mindful-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-mindful-gray-600">Completed</p>
                <p className="text-2xl font-bold text-growth-green-600">{statistics.completedReports}</p>
              </div>
              <div className="text-growth-green-500">
                <i className="fas fa-check-circle text-2xl"></i>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-mindful-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-mindful-gray-600">Pending Review</p>
                <p className="text-2xl font-bold text-yellow-600">{statistics.pendingReports}</p>
              </div>
              <div className="text-yellow-500">
                <i className="fas fa-clock text-2xl"></i>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-mindful-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-mindful-gray-600">Avg. Improvement</p>
                <p className="text-2xl font-bold text-calm-purple-600">+{statistics.averageImprovement}%</p>
              </div>
              <div className="text-calm-purple-500">
                <i className="fas fa-chart-line text-2xl"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Filters Section - Tablet Responsive */}
        <div className="bg-white rounded-lg shadow-sm border border-mindful-gray-200 p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search Input */}
            <div>
              <label className="block text-sm font-medium text-mindful-gray-700 mb-1">
                Search Patient
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Name or ID..."
                  value={filters.patientSearch}
                  onChange={(e) => handleFilterChange('patientSearch', e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-mindful-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-serene-blue-500"
                />
                <i className="fas fa-search absolute left-3 top-3 text-mindful-gray-400"></i>
              </div>
            </div>

            {/* Report Type Filter */}
            <div>
              <label className="block text-sm font-medium text-mindful-gray-700 mb-1">
                Report Type
              </label>
              <select
                value={filters.reportType}
                onChange={(e) => handleFilterChange('reportType', e.target.value)}
                className="w-full px-3 py-2 border border-mindful-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-serene-blue-500"
              >
                <option value="all">All Types</option>
                <option value="Progress Report">Progress Report</option>
                <option value="Assessment Report">Assessment Report</option>
                <option value="Treatment Summary">Treatment Summary</option>
                <option value="Discharge Summary">Discharge Summary</option>
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-mindful-gray-700 mb-1">
                Status
              </label>
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="w-full px-3 py-2 border border-mindful-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-serene-blue-500"
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="pending-review">Pending Review</option>
                <option value="draft">Draft</option>
              </select>
            </div>

            {/* Date Range Filter */}
            <div>
              <label className="block text-sm font-medium text-mindful-gray-700 mb-1">
                Date Range
              </label>
              <select
                value={filters.dateRange}
                onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                className="w-full px-3 py-2 border border-mindful-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-serene-blue-500"
              >
                <option value="7days">Last 7 Days</option>
                <option value="30days">Last 30 Days</option>
                <option value="90days">Last 90 Days</option>
                <option value="all">All Time</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div>
              <label className="block text-sm font-medium text-mindful-gray-700 mb-1">
                View Mode
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`flex-1 px-3 py-2 rounded-lg transition ${
                    viewMode === 'grid'
                      ? 'bg-serene-blue-500 text-white'
                      : 'bg-white border border-mindful-gray-300 text-mindful-gray-700 hover:bg-mindful-gray-50'
                  }`}
                >
                  <i className="fas fa-th"></i>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`flex-1 px-3 py-2 rounded-lg transition ${
                    viewMode === 'list'
                      ? 'bg-serene-blue-500 text-white'
                      : 'bg-white border border-mindful-gray-300 text-mindful-gray-700 hover:bg-mindful-gray-50'
                  }`}
                >
                  <i className="fas fa-list"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reports Content */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-pulse text-serene-blue-500">
            <i className="fas fa-spinner fa-spin text-4xl"></i>
            <p className="mt-4 text-gray-600">Loading reports...</p>
          </div>
        </div>
      ) : (
        <>
          {/* Grid View */}
          {viewMode === 'grid' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredReports.map((report) => (
                <div
                  key={report.id}
                  className="bg-white rounded-lg shadow-sm border border-mindful-gray-200 p-4 hover:shadow-md transition-shadow duration-200 cursor-pointer"
                  onClick={() => setSelectedReport(report)}
                >
                  {/* Report Card Content */}
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900">{report.patientName}</h3>
                      <p className="text-sm text-mindful-gray-600">{report.patientId}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                      <i className={`fas ${getStatusIcon(report.status)} mr-1`}></i>
                      {report.status.replace('-', ' ')}
                    </span>
                  </div>

                  <div className="mb-3">
                    <p className="text-sm font-medium text-serene-blue-600 mb-1">
                      {report.reportType}
                    </p>
                    <p className="text-xs text-mindful-gray-500">
                      <i className="far fa-calendar mr-1"></i>
                      {new Date(report.date).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-3 mb-3">
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div>
                        <p className="text-xs text-mindful-gray-600">PHQ-9</p>
                        <p className="font-bold text-gray-900">{report.assessmentScores.PHQ9}</p>
                      </div>
                      <div>
                        <p className="text-xs text-mindful-gray-600">GAD-7</p>
                        <p className="font-bold text-gray-900">{report.assessmentScores.GAD7}</p>
                      </div>
                      <div>
                        <p className="text-xs text-mindful-gray-600">Change</p>
                        <p className={`font-bold ${
                          report.assessmentScores.improvement === 'N/A' 
                            ? 'text-gray-400' 
                            : 'text-growth-green-600'
                        }`}>
                          {report.assessmentScores.improvement}
                        </p>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-gray-700 line-clamp-2 mb-2">
                    {report.summary}
                  </p>

                  <div className="flex justify-between items-center">
                    <p className="text-xs text-mindful-gray-600">
                      <i className="fas fa-user-md mr-1"></i>
                      {report.clinician}
                    </p>
                    <div className="flex gap-2">
                      <button
                        className="text-serene-blue-600 hover:text-serene-blue-700"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewReport(report.id);
                        }}
                        title="View"
                      >
                        <i className="fas fa-eye"></i>
                      </button>
                      <button
                        className="text-growth-green-600 hover:text-growth-green-700"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDownloadHTMLReport(report);
                        }}
                        title="Download"
                      >
                        <i className="fas fa-download"></i>
                      </button>
                      <button
                        className="text-gray-600 hover:text-gray-700"
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePrintReport(report);
                        }}
                        title="Print"
                      >
                        <i className="fas fa-print"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* List View */}
          {viewMode === 'list' && (
            <div className="bg-white rounded-lg shadow-sm border border-mindful-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-mindful-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-mindful-gray-700 uppercase tracking-wider">
                        Patient
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-mindful-gray-700 uppercase tracking-wider hidden md:table-cell">
                        Report Type
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-mindful-gray-700 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-mindful-gray-700 uppercase tracking-wider hidden lg:table-cell">
                        Clinician
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-mindful-gray-700 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-mindful-gray-700 uppercase tracking-wider hidden md:table-cell">
                        Scores
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-mindful-gray-700 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-mindful-gray-200">
                    {filteredReports.map((report) => (
                      <tr key={report.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <div>
                            <p className="font-medium text-gray-900">{report.patientName}</p>
                            <p className="text-sm text-mindful-gray-600">{report.patientId}</p>
                          </div>
                        </td>
                        <td className="px-4 py-3 hidden md:table-cell">
                          <p className="text-sm text-gray-900">{report.reportType}</p>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-sm text-gray-900">
                            {new Date(report.date).toLocaleDateString()}
                          </p>
                        </td>
                        <td className="px-4 py-3 hidden lg:table-cell">
                          <p className="text-sm text-gray-900">{report.clinician}</p>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                            {report.status.replace('-', ' ')}
                          </span>
                        </td>
                        <td className="px-4 py-3 hidden md:table-cell">
                          <div className="flex gap-3 text-sm">
                            <span>PHQ: {report.assessmentScores.PHQ9}</span>
                            <span>GAD: {report.assessmentScores.GAD7}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex justify-center gap-2">
                            <button
                              onClick={() => handleViewReport(report.id)}
                              className="text-serene-blue-600 hover:text-serene-blue-700"
                              title="View Report"
                            >
                              <i className="fas fa-eye"></i>
                            </button>
                            <button
                              onClick={() => handleEditReport(report.id)}
                              className="text-yellow-600 hover:text-yellow-700"
                              title="Edit Report"
                            >
                              <i className="fas fa-edit"></i>
                            </button>
                            <button
                              onClick={() => handlePrintReport(report)}
                              className="text-gray-600 hover:text-gray-700"
                              title="Print Report"
                            >
                              <i className="fas fa-print"></i>
                            </button>
                            <button
                              onClick={() => handleDownloadHTMLReport(report)}
                              className="text-growth-green-600 hover:text-growth-green-700"
                              title="Download HTML"
                            >
                              <i className="fas fa-download"></i>
                            </button>
                            <button
                              onClick={() => handleDeleteReport(report.id)}
                              className="text-red-600 hover:text-red-700"
                              title="Delete Report"
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
            </div>
          )}

          {/* No Results */}
          {filteredReports.length === 0 && (
            <div className="text-center py-12">
              <i className="fas fa-search text-6xl text-mindful-gray-300 mb-4"></i>
              <p className="text-xl text-mindful-gray-600">No reports found</p>
              <p className="text-sm text-mindful-gray-500 mt-2">Try adjusting your filters</p>
            </div>
          )}
        </>
      )}

      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Export Reports</h2>
            <p className="text-sm text-mindful-gray-600 mb-4">
              Choose the format to export {filteredReports.length} report(s)
            </p>
            
            <div className="space-y-3">
              <button
                onClick={() => handleExportReport('pdf')}
                className="w-full flex items-center justify-between p-3 border border-mindful-gray-300 rounded-lg hover:bg-gray-50 transition"
              >
                <div className="flex items-center">
                  <i className="fas fa-file-pdf text-red-500 text-xl mr-3"></i>
                  <div className="text-left">
                    <p className="font-medium text-gray-900">PDF Format</p>
                    <p className="text-xs text-mindful-gray-600">Best for printing and sharing</p>
                  </div>
                </div>
                <i className="fas fa-chevron-right text-mindful-gray-400"></i>
              </button>
              
              <button
                onClick={() => handleExportReport('excel')}
                className="w-full flex items-center justify-between p-3 border border-mindful-gray-300 rounded-lg hover:bg-gray-50 transition"
              >
                <div className="flex items-center">
                  <i className="fas fa-file-excel text-green-500 text-xl mr-3"></i>
                  <div className="text-left">
                    <p className="font-medium text-gray-900">Excel Format</p>
                    <p className="text-xs text-mindful-gray-600">Best for data analysis</p>
                  </div>
                </div>
                <i className="fas fa-chevron-right text-mindful-gray-400"></i>
              </button>
              
              <button
                onClick={() => handleExportReport('csv')}
                className="w-full flex items-center justify-between p-3 border border-mindful-gray-300 rounded-lg hover:bg-gray-50 transition"
              >
                <div className="flex items-center">
                  <i className="fas fa-file-csv text-blue-500 text-xl mr-3"></i>
                  <div className="text-left">
                    <p className="font-medium text-gray-900">CSV Format</p>
                    <p className="text-xs text-mindful-gray-600">Best for data import</p>
                  </div>
                </div>
                <i className="fas fa-chevron-right text-mindful-gray-400"></i>
              </button>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowExportModal(false)}
                className="flex-1 px-4 py-2 border border-mindful-gray-300 rounded-lg hover:bg-gray-50 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Report Preview Modal - FIXED NAVIGATION */}
      {selectedReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold text-gray-900">Report Preview</h2>
              <button
                onClick={() => setSelectedReport(null)}
                className="text-mindful-gray-400 hover:text-gray-600"
              >
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>
            
            <div className="space-y-4">
              {/* Patient Information */}
              <div className="border-b border-mindful-gray-200 pb-4">
                <h3 className="font-semibold text-gray-900 mb-2">Patient Information</h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-mindful-gray-600">Name</p>
                    <p className="font-medium text-gray-900">{selectedReport.patientName}</p>
                  </div>
                  <div>
                    <p className="text-mindful-gray-600">Patient ID</p>
                    <p className="font-medium text-gray-900">{selectedReport.patientId}</p>
                  </div>
                </div>
              </div>
              
              {/* Report Details */}
              <div className="border-b border-mindful-gray-200 pb-4">
                <h3 className="font-semibold text-gray-900 mb-2">Report Details</h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-mindful-gray-600">Report Type</p>
                    <p className="font-medium text-gray-900">{selectedReport.reportType}</p>
                  </div>
                  <div>
                    <p className="text-mindful-gray-600">Date</p>
                    <p className="font-medium text-gray-900">
                      {new Date(selectedReport.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-mindful-gray-600">Clinician</p>
                    <p className="font-medium text-gray-900">{selectedReport.clinician}</p>
                  </div>
                  <div>
                    <p className="text-mindful-gray-600">Status</p>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedReport.status)}`}>
                      {selectedReport.status.replace('-', ' ')}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Assessment Scores */}
              <div className="border-b border-mindful-gray-200 pb-4">
                <h3 className="font-semibold text-gray-900 mb-2">Assessment Scores</h3>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-sm text-mindful-gray-600">PHQ-9 Score</p>
                    <p className="text-2xl font-bold text-gray-900">{selectedReport.assessmentScores.PHQ9}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-sm text-mindful-gray-600">GAD-7 Score</p>
                    <p className="text-2xl font-bold text-gray-900">{selectedReport.assessmentScores.GAD7}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-sm text-mindful-gray-600">Improvement</p>
                    <p className={`text-2xl font-bold ${
                      selectedReport.assessmentScores.improvement === 'N/A' 
                        ? 'text-gray-400' 
                        : 'text-growth-green-600'
                    }`}>
                      {selectedReport.assessmentScores.improvement}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Summary */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Summary</h3>
                <p className="text-gray-700">{selectedReport.summary}</p>
              </div>
            </div>
            
            {/* FIXED: Action Buttons with proper navigation */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  handleViewReport(selectedReport.id); // Navigate to full report
                  setSelectedReport(null); // Close modal
                }}
                className="flex-1 bg-serene-blue-500 hover:bg-serene-blue-600 text-white px-4 py-2 rounded-lg transition"
              >
                <i className="fas fa-eye mr-2"></i>
                View Full Report
              </button>
              <button
                onClick={() => handleDownloadHTMLReport(selectedReport)}
                className="flex-1 bg-growth-green-500 hover:bg-growth-green-600 text-white px-4 py-2 rounded-lg transition"
              >
                <i className="fas fa-download mr-2"></i>
                Download HTML
              </button>
              <button
                onClick={() => handlePrintReport(selectedReport)}
                className="flex-1 bg-calm-purple-500 hover:bg-calm-purple-600 text-white px-4 py-2 rounded-lg transition"
              >
                <i className="fas fa-print mr-2"></i>
                Print
              </button>
              <button
                onClick={() => setSelectedReport(null)}
                className="flex-1 px-4 py-2 border border-mindful-gray-300 rounded-lg hover:bg-gray-50 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClinicalReports;