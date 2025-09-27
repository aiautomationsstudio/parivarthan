import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// SIMPLE WORKING VERSION OF ReportDetails.js
// ===========================================
// Use this version first to confirm routing works
// Then replace with full version once confirmed

const ReportDetails = () => {
  const { reportId } = useParams();
  const navigate = useNavigate();
  
  // Debug logging
  console.log('✅ ReportDetails component mounted successfully!');
  console.log('📋 Report ID from URL:', reportId);
  console.log('🔗 Current URL:', window.location.pathname);
  
  // Simple mock data based on reportId
  const mockReportData = {
    1: { name: 'John Doe', type: 'Progress Report', date: '2025-01-15' },
    2: { name: 'Jane Smith', type: 'Treatment Summary', date: '2025-01-14' },
    3: { name: 'Robert Johnson', type: 'Assessment Report', date: '2025-01-13' },
    4: { name: 'Emily Brown', type: 'Discharge Summary', date: '2025-01-12' },
    5: { name: 'Michael Davis', type: 'Progress Report', date: '2025-01-11' }
  };
  
  const reportData = mockReportData[reportId] || { 
    name: 'Unknown Patient', 
    type: 'Report', 
    date: new Date().toLocaleDateString() 
  };

  return (
    <div style={{ 
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      maxWidth: '800px',
      margin: '0 auto'
    }}>
      {/* Success Banner */}
      <div style={{
        backgroundColor: '#d4edda',
        color: '#155724',
        padding: '12px',
        borderRadius: '4px',
        marginBottom: '20px',
        border: '1px solid #c3e6cb'
      }}>
        ✅ <strong>Success!</strong> ReportDetails component is rendering correctly!
      </div>
      
      {/* Header */}
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={() => navigate('/clinical/reports')}
          style={{
            backgroundColor: '#0ea5e9',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer',
            marginBottom: '10px'
          }}
        >
          ← Back to Reports
        </button>
        
        <h1 style={{ 
          fontSize: '28px',
          fontWeight: 'bold',
          color: '#333',
          margin: '10px 0'
        }}>
          Report Details Page
        </h1>
        
        <p style={{ color: '#666' }}>
          Viewing detailed information for report #{reportId}
        </p>
      </div>
      
      {/* Report Info Card */}
      <div style={{
        backgroundColor: 'white',
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '20px',
        marginBottom: '20px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ 
          fontSize: '20px',
          marginBottom: '15px',
          color: '#0ea5e9'
        }}>
          Report Information
        </h2>
        
        <div style={{ marginBottom: '10px' }}>
          <strong>Report ID:</strong> {reportId || 'Not specified'}
        </div>
        
        <div style={{ marginBottom: '10px' }}>
          <strong>Patient Name:</strong> {reportData.name}
        </div>
        
        <div style={{ marginBottom: '10px' }}>
          <strong>Report Type:</strong> {reportData.type}
        </div>
        
        <div style={{ marginBottom: '10px' }}>
          <strong>Date:</strong> {reportData.date}
        </div>
        
        <div style={{ marginBottom: '10px' }}>
          <strong>Status:</strong> 
          <span style={{
            backgroundColor: '#28a745',
            color: 'white',
            padding: '2px 8px',
            borderRadius: '4px',
            marginLeft: '8px',
            fontSize: '12px'
          }}>
            Completed
          </span>
        </div>
      </div>
      
      {/* Debug Info */}
      <div style={{
        backgroundColor: '#f8f9fa',
        border: '1px solid #dee2e6',
        borderRadius: '8px',
        padding: '15px',
        marginBottom: '20px'
      }}>
        <h3 style={{ 
          fontSize: '16px',
          marginBottom: '10px',
          color: '#495057'
        }}>
          Debug Information
        </h3>
        
        <div style={{ fontSize: '14px', color: '#6c757d' }}>
          <div>✓ Component: ReportDetails</div>
          <div>✓ Route Parameter (reportId): {reportId || 'undefined'}</div>
          <div>✓ Navigation Hook: Working</div>
          <div>✓ Current Path: {window.location.pathname}</div>
          <div>✓ Component Status: Mounted Successfully</div>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div style={{ 
        display: 'flex',
        gap: '10px',
        marginTop: '20px'
      }}>
        <button
          onClick={() => navigate(`/clinical/reports/edit/${reportId}`)}
          style={{
            backgroundColor: '#ffc107',
            color: '#000',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Edit Report
        </button>
        
        <button
          onClick={() => alert('Print functionality will be added')}
          style={{
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Print
        </button>
        
        <button
          onClick={() => alert('Download functionality will be added')}
          style={{
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Download PDF
        </button>
      </div>
      
      {/* Instructions */}
      <div style={{
        backgroundColor: '#d1ecf1',
        color: '#0c5460',
        padding: '12px',
        borderRadius: '4px',
        marginTop: '20px',
        border: '1px solid #bee5eb'
      }}>
        <strong>Next Steps:</strong>
        <ol style={{ marginTop: '10px', marginBottom: '0' }}>
          <li>This simple component confirms the routing is working correctly</li>
          <li>Check the browser console for any error messages</li>
          <li>Once this renders, replace with the full ReportDetails component</li>
          <li>If this doesn't render, check App.js imports and routes</li>
        </ol>
      </div>
    </div>
  );
};

export default ReportDetails;