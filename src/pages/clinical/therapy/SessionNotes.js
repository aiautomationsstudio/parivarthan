import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';

const SessionNotes = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  
  // Get sessionId and patientId from URL params
  const sessionId = searchParams.get('sessionId');
  const patientId = searchParams.get('patientId');
  
  // State management
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showNewNoteModal, setShowNewNoteModal] = useState(false);
  const [activeTab, setActiveTab] = useState('soap'); // soap, progress, homework
  const [notification, setNotification] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [autoSaveTimer, setAutoSaveTimer] = useState(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);

  // Mock data for session notes
  const mockNotes = [
    {
      id: 1,
      sessionId: '1',
      patientId: 'PT001',
      patientName: 'John Doe',
      date: '2025-01-27',
      time: '10:00 AM',
      therapyType: 'CBT',
      therapist: 'Dr. Smith',
      soapNote: {
        subjective: 'Patient reports feeling anxious about upcoming work presentation. Sleep has been disrupted for the past week.',
        objective: 'Patient appears tired but engaged. Maintained eye contact throughout session. Completed anxiety assessment scoring 14/21.',
        assessment: 'Generalized anxiety with work-related triggers. Sleep disturbance secondary to anxiety.',
        plan: 'Continue CBT techniques. Introduced progressive muscle relaxation. Homework: practice breathing exercises 3x daily.'
      },
      progressNote: 'Patient showing improvement in identifying negative thought patterns. Successfully challenged 3 automatic thoughts this week.',
      interventions: ['Cognitive restructuring', 'Breathing exercises', 'Progressive muscle relaxation'],
      homework: ['Practice breathing exercises 3x daily', 'Complete thought diary', 'Read Chapter 3 of workbook'],
      riskAssessment: 'Low risk. No SI/HI. Good support system.',
      nextSession: '2025-02-03',
      status: 'completed'
    },
    {
      id: 2,
      sessionId: '2',
      patientId: 'PT002',
      patientName: 'Jane Smith',
      date: '2025-01-26',
      time: '11:00 AM',
      therapyType: 'DBT',
      therapist: 'Dr. Johnson',
      soapNote: {
        subjective: 'Patient reports improved mood this week. Successfully used distress tolerance skills during argument with partner.',
        objective: 'Patient engaged and animated. Completed DBT diary card. No self-harm behaviors reported.',
        assessment: 'Borderline personality disorder, improving. Effective use of DBT skills.',
        plan: 'Continue DBT modules. Focus on interpersonal effectiveness next session.'
      },
      progressNote: 'Significant progress in emotion regulation. Patient successfully implementing TIPP technique.',
      interventions: ['DBT skills training', 'Mindfulness exercises', 'Distress tolerance'],
      homework: ['Complete DBT diary card daily', 'Practice PLEASE skills', 'Mindfulness meditation 10 mins daily'],
      riskAssessment: 'Moderate risk. No current SI but history present. Safety plan in place.',
      nextSession: '2025-02-02',
      status: 'completed'
    }
  ];

  // Load notes on component mount
  useEffect(() => {
    setTimeout(() => {
      if (sessionId) {
        // Filter notes for specific session if sessionId provided
        const filteredNotes = mockNotes.filter(note => note.sessionId === sessionId);
        setNotes(filteredNotes);
        if (filteredNotes.length > 0) {
          setSelectedNote(filteredNotes[0]);
        }
      } else {
        // Show all notes if no specific session
        setNotes(mockNotes);
      }
      setIsLoading(false);
    }, 1000);
  }, [sessionId]);

  // Show notification
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Auto-save functionality
  const autoSave = (noteData) => {
    if (autoSaveTimer) clearTimeout(autoSaveTimer);
    
    const timer = setTimeout(() => {
      handleSaveNote(noteData);
      showNotification('Auto-saved', 'info');
    }, 2000);
    
    setAutoSaveTimer(timer);
  };

  // Export note as PDF
  const handleExportPDF = (note) => {
    showNotification('Generating PDF...', 'info');
    // In real app, would use a library like jsPDF
    setTimeout(() => {
      const noteContent = `
        THERAPY SESSION NOTE
        ====================
        Patient: ${note.patientName} (${note.patientId})
        Date: ${note.date} at ${note.time}
        Therapy Type: ${note.therapyType}
        Therapist: ${note.therapist}
        
        SOAP NOTE:
        S: ${note.soapNote?.subjective || 'N/A'}
        O: ${note.soapNote?.objective || 'N/A'}
        A: ${note.soapNote?.assessment || 'N/A'}
        P: ${note.soapNote?.plan || 'N/A'}
        
        Progress: ${note.progressNote || 'N/A'}
        Risk Assessment: ${note.riskAssessment || 'N/A'}
      `;
      
      const blob = new Blob([noteContent], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `session_note_${note.patientId}_${note.date}.txt`;
      a.click();
      
      showNotification('Note exported successfully!', 'success');
    }, 1000);
  };

  // Email note
  const handleEmailNote = (note) => {
    const subject = `Session Note - ${note.patientName} - ${note.date}`;
    const body = `Please find attached the session note for ${note.patientName} from ${note.date}.`;
    
    // In real app, would integrate with email service
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    showNotification('Opening email client...', 'info');
  };

  // Share note with team
  const handleShareNote = (note) => {
    setShowShareModal(true);
  };

  // Apply template
  const handleApplyTemplate = (templateType) => {
    const templates = {
      'initial': {
        subjective: 'First session. Patient presents with...',
        objective: 'Patient appears cooperative and engaged...',
        assessment: 'Initial assessment indicates...',
        plan: 'Establish therapeutic rapport. Begin with...'
      },
      'progress': {
        subjective: 'Patient reports improvement in...',
        objective: 'Observable changes include...',
        assessment: 'Treatment is progressing as expected...',
        plan: 'Continue current interventions. Next session will focus on...'
      },
      'crisis': {
        subjective: 'Patient presents in crisis state...',
        objective: 'Risk factors observed...',
        assessment: 'Immediate safety concerns addressed...',
        plan: 'Safety plan activated. Follow-up scheduled for...'
      }
    };

    if (templates[templateType]) {
      const updatedNote = {
        ...selectedNote,
        soapNote: templates[templateType]
      };
      setSelectedNote(updatedNote);
      showNotification(`${templateType} template applied`, 'success');
    }
    setShowTemplateModal(false);
  };

  // Add signature
  const handleAddSignature = () => {
    if (selectedNote) {
      const signedNote = {
        ...selectedNote,
        signature: {
          therapist: selectedNote.therapist,
          timestamp: new Date().toISOString(),
          license: 'LCSW #12345' // In real app, would come from user profile
        },
        status: 'finalized'
      };
      
      setNotes(notes.map(note => 
        note.id === selectedNote.id ? signedNote : note
      ));
      setSelectedNote(signedNote);
      showNotification('Note signed and finalized', 'success');
      setShowSignatureModal(false);
    }
  };

  // Clone note for follow-up
  const handleCloneNote = (note) => {
    const clonedNote = {
      ...note,
      id: notes.length + 1,
      date: new Date().toLocaleDateString('en-CA'),
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      status: 'draft',
      soapNote: {
        ...note.soapNote,
        subjective: `Follow-up from ${note.date}. ${note.soapNote?.subjective || ''}`,
      }
    };
    
    setNotes([clonedNote, ...notes]);
    setSelectedNote(clonedNote);
    showNotification('Note cloned for follow-up session', 'success');
  };

  // Delete note
  const handleDeleteNote = (noteId) => {
    if (window.confirm('Are you sure you want to delete this note? This action cannot be undone.')) {
      setNotes(notes.filter(note => note.id !== noteId));
      setSelectedNote(null);
      showNotification('Note deleted', 'success');
    }
  };

  // Archive note
  const handleArchiveNote = (noteId) => {
    const archivedNote = notes.find(note => note.id === noteId);
    if (archivedNote) {
      const updatedNote = { ...archivedNote, archived: true, archivedDate: new Date().toISOString() };
      setNotes(notes.map(note => 
        note.id === noteId ? updatedNote : note
      ));
      showNotification('Note archived', 'success');
    }
  };

  // Send to supervisor for review
  const handleSendForReview = (note) => {
    const reviewNote = {
      ...note,
      reviewStatus: 'pending',
      reviewRequestDate: new Date().toISOString(),
      reviewRequestBy: note.therapist
    };
    
    setNotes(notes.map(n => 
      n.id === note.id ? reviewNote : n
    ));
    setSelectedNote(reviewNote);
    showNotification('Note sent for supervisor review', 'success');
  };

  // Mark homework as complete
  const handleHomeworkComplete = (noteId, homeworkIndex) => {
    const note = notes.find(n => n.id === noteId);
    if (note && note.homework) {
      const updatedHomework = note.homework.map((item, index) => {
        if (index === homeworkIndex) {
          return { text: item, completed: true, completedDate: new Date().toISOString() };
        }
        return item;
      });
      
      const updatedNote = { ...note, homework: updatedHomework };
      setNotes(notes.map(n => n.id === noteId ? updatedNote : n));
      setSelectedNote(updatedNote);
      showNotification('Homework marked as complete', 'success');
    }
  };

  // Add voice note transcription
  const handleVoiceNote = () => {
    showNotification('Voice recording feature coming soon...', 'info');
    // In real app, would integrate with speech-to-text API
  };

  // Link to treatment plan
  const handleLinkTreatmentPlan = (noteId) => {
    navigate(`/clinical/treatment/planning?patientId=${patientId}&noteId=${noteId}`);
  };

  // Generate progress report
  const handleGenerateReport = () => {
    const patientNotes = notes.filter(note => note.patientId === patientId);
    showNotification(`Generating progress report from ${patientNotes.length} sessions...`, 'info');
    
    setTimeout(() => {
      navigate(`/clinical/reports/progress?patientId=${patientId}`);
    }, 1500);
  };

  // Print note
  const handlePrintNote = (note) => {
    showNotification('Preparing note for printing...', 'info');
    
    // Create print-friendly version
    const printWindow = window.open('', '_blank');
    const printContent = `
      <html>
        <head>
          <title>Session Note - ${note.patientName}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { color: #333; }
            .section { margin-bottom: 20px; }
            .label { font-weight: bold; color: #666; }
          </style>
        </head>
        <body>
          <h1>Therapy Session Note</h1>
          <div class="section">
            <p><span class="label">Patient:</span> ${note.patientName} (${note.patientId})</p>
            <p><span class="label">Date:</span> ${note.date} at ${note.time}</p>
            <p><span class="label">Therapist:</span> ${note.therapist}</p>
            <p><span class="label">Therapy Type:</span> ${note.therapyType}</p>
          </div>
          <div class="section">
            <h2>SOAP Note</h2>
            <p><span class="label">Subjective:</span><br>${note.soapNote?.subjective || 'N/A'}</p>
            <p><span class="label">Objective:</span><br>${note.soapNote?.objective || 'N/A'}</p>
            <p><span class="label">Assessment:</span><br>${note.soapNote?.assessment || 'N/A'}</p>
            <p><span class="label">Plan:</span><br>${note.soapNote?.plan || 'N/A'}</p>
          </div>
        </body>
      </html>
    `;
    
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
  };

  // Filter notes based on search and filter
  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.therapyType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.therapist.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filter === 'all' || 
                         (filter === 'recent' && new Date(note.date) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)) ||
                         (filter === 'cbt' && note.therapyType === 'CBT') ||
                         (filter === 'dbt' && note.therapyType === 'DBT');
    
    return matchesSearch && matchesFilter;
  });

  // Handle saving notes
  const handleSaveNote = (noteData) => {
    if (selectedNote) {
      // Update existing note
      const updatedNote = { ...selectedNote, ...noteData, lastModified: new Date().toISOString() };
      setNotes(notes.map(note => 
        note.id === selectedNote.id ? updatedNote : note
      ));
      setSelectedNote(updatedNote);
      showNotification('Session note updated successfully!', 'success');
    } else {
      // Create new note
      const newNote = {
        id: notes.length + 1,
        sessionId: sessionId || String(notes.length + 1),
        patientId: patientId || `PT${String(notes.length + 1).padStart(3, '0')}`,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        ...noteData,
        status: 'draft'
      };
      setNotes([...notes, newNote]);
      setSelectedNote(newNote);
      showNotification('New session note created!', 'success');
    }
    setIsEditing(false);
  };

  // Handle finalizing notes
  const handleFinalizeNote = (noteId) => {
    if (window.confirm('Are you sure you want to finalize this note? This action cannot be undone.')) {
      setNotes(notes.map(note => 
        note.id === noteId ? { ...note, status: 'finalized', finalizedAt: new Date().toISOString() } : note
      ));
      setSelectedNote(prev => ({ ...prev, status: 'finalized' }));
      showNotification('Session note finalized and locked.', 'success');
      setIsEditing(false);
    }
  };

  // Handle duplicating notes
  const handleDuplicateNote = (note) => {
    const duplicatedNote = {
      ...note,
      id: notes.length + 1,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      status: 'draft',
      patientName: note.patientName + ' (Copy)'
    };
    setNotes([...notes, duplicatedNote]);
    setSelectedNote(duplicatedNote);
    showNotification('Session note duplicated successfully!', 'success');
  };

  // Handle printing with formatting
  const handlePrint = () => {
    showNotification('Preparing note for printing...', 'info');
    // Create a print-friendly version
    const printWindow = window.open('', '_blank');
    const printContent = `
      <html>
        <head>
          <title>Session Note - ${selectedNote?.patientName}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { color: #333; }
            .section { margin: 20px 0; }
            .label { font-weight: bold; color: #555; }
          </style>
        </head>
        <body>
          <h1>Session Note</h1>
          <div class="section">
            <p><span class="label">Patient:</span> ${selectedNote?.patientName}</p>
            <p><span class="label">Date:</span> ${selectedNote?.date} ${selectedNote?.time}</p>
            <p><span class="label">Therapy Type:</span> ${selectedNote?.therapyType}</p>
          </div>
          <div class="section">
            <h2>SOAP Note</h2>
            <p><span class="label">Subjective:</span> ${selectedNote?.soapNote?.subjective}</p>
            <p><span class="label">Objective:</span> ${selectedNote?.soapNote?.objective}</p>
            <p><span class="label">Assessment:</span> ${selectedNote?.soapNote?.assessment}</p>
            <p><span class="label">Plan:</span> ${selectedNote?.soapNote?.plan}</p>
          </div>
        </body>
      </html>
    `;
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
  };

  // Handle exporting notes
  const handleExportNote = (format) => {
    showNotification(`Exporting note as ${format}...`, 'info');
    
    if (format === 'pdf') {
      // In real app, would use jsPDF or similar
      showNotification('PDF export ready for download', 'success');
    } else if (format === 'docx') {
      // In real app, would use docx library
      showNotification('Word document ready for download', 'success');
    } else if (format === 'json') {
      const dataStr = JSON.stringify(selectedNote, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
      const exportFileDefaultName = `session-note-${selectedNote.id}.json`;
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
      showNotification('JSON file downloaded', 'success');
    }
    setShowExportModal(false);
  };

  // Handle template selection
  const handleSelectTemplate = (templateType) => {
    const templates = {
      'cbt': {
        soapNote: {
          subjective: 'Patient reports cognitive distortions related to...',
          objective: 'Patient engaged in identifying negative thought patterns...',
          assessment: 'Progress noted in cognitive restructuring...',
          plan: 'Continue CBT techniques, homework: thought diary...'
        }
      },
      'dbt': {
        soapNote: {
          subjective: 'Patient practiced distress tolerance skills...',
          objective: 'Demonstrated understanding of TIPP technique...',
          assessment: 'Improving emotion regulation capabilities...',
          plan: 'Continue DBT modules, focus on interpersonal effectiveness...'
        }
      },
      'emdr': {
        soapNote: {
          subjective: 'Patient processed traumatic memory from...',
          objective: 'Completed bilateral stimulation for 3 sets...',
          assessment: 'SUD level decreased from 8 to 5...',
          plan: 'Continue desensitization phase next session...'
        }
      }
    };
    
    const template = templates[templateType];
    if (template && selectedNote) {
      const updatedNote = { ...selectedNote, ...template };
      setSelectedNote(updatedNote);
      showNotification(`${templateType.toUpperCase()} template applied`, 'success');
    }
    setShowTemplateModal(false);
  };

  // Handle auto-save
  const handleToggleAutoSave = () => {
    setAutoSaveEnabled(!autoSaveEnabled);
    showNotification(
      autoSaveEnabled ? 'Auto-save disabled' : 'Auto-save enabled', 
      'info'
    );
  };

  // Handle adding voice note
  const handleAddVoiceNote = () => {
    showNotification('Voice recording feature coming soon!', 'info');
    // In real app, would implement Web Audio API for recording
  };

  // Handle adding attachment
  const handleAddAttachment = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        showNotification(`File "${file.name}" attached successfully`, 'success');
        // In real app, would handle file upload
      }
    };
    input.click();
  };

  // Handle session timer
  const handleStartTimer = () => {
    showNotification('Session timer started', 'success');
    // In real app, would implement actual timer functionality
  };

  // Handle quick actions
  const handleQuickAction = (action) => {
    const actions = {
      'sign': () => {
        showNotification('Digital signature added', 'success');
        handleFinalizeNote(selectedNote.id);
      },
      'schedule-followup': () => {
        navigate('/clinical/calendar/appointments');
      },
      'send-homework': () => {
        showNotification('Homework sent to patient portal', 'success');
      },
      'request-review': () => {
        showNotification('Review request sent to supervisor', 'success');
      }
    };
    
    if (actions[action]) {
      actions[action]();
    }
  };

  // SOAP Note Editor Component
  const SOAPEditor = ({ note, onSave }) => {
    const [soapData, setSoapData] = useState(note?.soapNote || {
      subjective: '',
      objective: '',
      assessment: '',
      plan: ''
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      onSave({ soapNote: soapData });
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">S</span>
            <span className="ml-2">Subjective</span>
          </label>
          <textarea
            rows="4"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Patient's reported symptoms, feelings, and concerns..."
            value={soapData.subjective}
            onChange={(e) => setSoapData({...soapData, subjective: e.target.value})}
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded">O</span>
            <span className="ml-2">Objective</span>
          </label>
          <textarea
            rows="4"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Observable behaviors, test results, clinical observations..."
            value={soapData.objective}
            onChange={(e) => setSoapData({...soapData, objective: e.target.value})}
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded">A</span>
            <span className="ml-2">Assessment</span>
          </label>
          <textarea
            rows="4"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Clinical assessment, diagnosis, analysis of progress..."
            value={soapData.assessment}
            onChange={(e) => setSoapData({...soapData, assessment: e.target.value})}
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded">P</span>
            <span className="ml-2">Plan</span>
          </label>
          <textarea
            rows="4"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Treatment plan, next steps, homework assignments..."
            value={soapData.plan}
            onChange={(e) => setSoapData({...soapData, plan: e.target.value})}
            required
          />
        </div>
        
        <div className="flex justify-between">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleVoiceNote}
              className="px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              title="Record voice note"
            >
              <i className="fas fa-microphone"></i>
            </button>
            <button
              type="button"
              onClick={() => setShowTemplateModal(true)}
              className="px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              title="Use template"
            >
              <i className="fas fa-file-alt"></i>
            </button>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => {
                onSave({ soapNote: soapData });
                showNotification('Draft saved', 'info');
              }}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <i className="fas fa-save mr-2"></i>
              Save Draft
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <i className="fas fa-check mr-2"></i>
              Save & Continue
            </button>
          </div>
        </div>
      </form>
    );
  };

  // Progress Note Editor Component
  const ProgressEditor = ({ note, onSave }) => {
    const [progressData, setProgressData] = useState({
      progressNote: note?.progressNote || '',
      interventions: note?.interventions || [],
      riskAssessment: note?.riskAssessment || ''
    });
    const [newIntervention, setNewIntervention] = useState('');

    const addIntervention = () => {
      if (newIntervention.trim()) {
        setProgressData({
          ...progressData,
          interventions: [...progressData.interventions, newIntervention]
        });
        setNewIntervention('');
      }
    };

    const removeIntervention = (index) => {
      setProgressData({
        ...progressData,
        interventions: progressData.interventions.filter((_, i) => i !== index)
      });
    };

    return (
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Progress Note
          </label>
          <textarea
            rows="6"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Document patient's progress, changes observed, treatment response..."
            value={progressData.progressNote}
            onChange={(e) => setProgressData({...progressData, progressNote: e.target.value})}
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Interventions Used
          </label>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Add intervention..."
              value={newIntervention}
              onChange={(e) => setNewIntervention(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addIntervention())}
            />
            <button
              type="button"
              onClick={addIntervention}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <i className="fas fa-plus"></i>
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {progressData.interventions.map((intervention, index) => (
              <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center">
                {intervention}
                <button
                  onClick={() => removeIntervention(index)}
                  className="ml-2 text-blue-600 hover:text-blue-800"
                >
                  <i className="fas fa-times"></i>
                </button>
              </span>
            ))}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Risk Assessment
          </label>
          <textarea
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Assess risk level, safety concerns, protective factors..."
            value={progressData.riskAssessment}
            onChange={(e) => setProgressData({...progressData, riskAssessment: e.target.value})}
          />
        </div>
        
        <div className="flex justify-end gap-3">
          <button
            onClick={() => onSave(progressData)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <i className="fas fa-save mr-2"></i>
            Save Progress Note
          </button>
        </div>
      </div>
    );
  };

  // Homework Editor Component
  const HomeworkEditor = ({ note, onSave }) => {
    const [homework, setHomework] = useState(note?.homework || []);
    const [newHomework, setNewHomework] = useState('');

    const addHomework = () => {
      if (newHomework.trim()) {
        setHomework([...homework, newHomework]);
        setNewHomework('');
      }
    };

    const removeHomework = (index) => {
      setHomework(homework.filter((_, i) => i !== index));
    };

    const toggleHomeworkComplete = (index) => {
      const updatedHomework = [...homework];
      
      // Toggle completion status
      if (typeof updatedHomework[index] === 'string') {
        updatedHomework[index] = {
          text: updatedHomework[index],
          completed: true,
          completedDate: new Date().toISOString()
        };
      } else if (updatedHomework[index].completed) {
        updatedHomework[index].completed = false;
        updatedHomework[index].completedDate = null;
      } else {
        updatedHomework[index].completed = true;
        updatedHomework[index].completedDate = new Date().toISOString();
      }
      
      setHomework(updatedHomework);
      onSave({ homework: updatedHomework });
      showNotification(
        updatedHomework[index].completed ? 'Homework marked as complete' : 'Homework marked as incomplete',
        'info'
      );
    };

    return (
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Homework Assignments
          </label>
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Add homework assignment..."
              value={newHomework}
              onChange={(e) => setNewHomework(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addHomework())}
            />
            <button
              type="button"
              onClick={addHomework}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <i className="fas fa-plus mr-2"></i>
              Add
            </button>
          </div>
          
          <div className="space-y-2">
            {homework.map((item, index) => {
              const isCompleted = typeof item === 'object' ? item.completed : false;
              const itemText = typeof item === 'string' ? item : item.text || item;
              
              return (
                <div key={index} className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                  isCompleted ? 'bg-green-50 border border-green-200' : 'bg-gray-50'
                }`}>
                  <button
                    onClick={() => toggleHomeworkComplete(index)}
                    className={`transition-colors ${
                      isCompleted ? 'text-green-600 hover:text-green-700' : 'text-gray-400 hover:text-green-600'
                    }`}
                    title={isCompleted ? 'Mark as incomplete' : 'Mark as complete'}
                  >
                    <i className={`${isCompleted ? 'fas fa-check-circle' : 'far fa-circle'} text-xl`}></i>
                  </button>
                  <span className={`flex-1 ${isCompleted ? 'line-through text-gray-500' : 'text-gray-700'}`}>
                    {itemText}
                  </span>
                  {isCompleted && typeof item === 'object' && item.completedDate && (
                    <span className="text-xs text-green-600">
                      <i className="fas fa-clock mr-1"></i>
                      {new Date(item.completedDate).toLocaleDateString()}
                    </span>
                  )}
                  <button
                    onClick={() => removeHomework(index)}
                    className="text-red-500 hover:text-red-700"
                    title="Remove homework"
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="flex justify-end gap-3">
          <button
            onClick={() => onSave({ homework })}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <i className="fas fa-save mr-2"></i>
            Save Homework
          </button>
        </div>
      </div>
    );
  };

  // Note Card Component
  const NoteCard = ({ note }) => {
    const statusColors = {
      'completed': 'bg-green-100 text-green-800',
      'draft': 'bg-yellow-100 text-yellow-800',
      'finalized': 'bg-blue-100 text-blue-800'
    };

    return (
      <div 
        className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer"
        onClick={() => setSelectedNote(note)}
      >
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-semibold text-gray-900">{note.patientName}</h3>
            <p className="text-sm text-gray-500">ID: {note.patientId}</p>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[note.status]}`}>
            {note.status}
          </span>
        </div>
        
        <div className="space-y-1 text-sm">
          <div className="flex items-center text-gray-600">
            <i className="fas fa-calendar w-5"></i>
            <span>{note.date} at {note.time}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <i className="fas fa-user-md w-5"></i>
            <span>{note.therapist}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <i className="fas fa-brain w-5"></i>
            <span>{note.therapyType}</span>
          </div>
        </div>
        
        <div className="mt-3 pt-3 border-t border-gray-200">
          <p className="text-sm text-gray-700 line-clamp-2">
            {note.soapNote?.subjective || note.progressNote || 'No notes available'}
          </p>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <i className="fas fa-spinner fa-spin text-4xl text-blue-600 mb-4"></i>
          <p className="text-gray-600">Loading session notes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Session Notes</h1>
            <p className="text-gray-600 mt-2">
              {sessionId ? `Notes for Session #${sessionId}` : 'Document and review therapy sessions'}
            </p>
          </div>
          <button
            onClick={() => navigate('/clinical/therapy/sessions')}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            <i className="fas fa-arrow-left mr-2"></i>
            Back to Sessions
          </button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Sidebar - Note List */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-gray-900">Recent Notes</h2>
              <button
                onClick={() => setShowNewNoteModal(true)}
                className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
              >
                <i className="fas fa-plus mr-1"></i>
                New
              </button>
            </div>
            
            {/* Search and Filter */}
            <div className="mb-4 space-y-2">
              <input
                type="text"
                placeholder="Search notes..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all">All Notes</option>
                <option value="recent">Recent (7 days)</option>
                <option value="cbt">CBT Sessions</option>
                <option value="dbt">DBT Sessions</option>
              </select>
            </div>
            
            {/* Notes List */}
            <div className="space-y-3 max-h-[600px] overflow-y-auto">
              {filteredNotes.map(note => (
                <NoteCard key={note.id} note={note} />
              ))}
            </div>
          </div>
        </div>

        {/* Right Content - Note Editor */}
        <div className="lg:col-span-2">
          {selectedNote ? (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              {/* Note Header */}
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">{selectedNote.patientName}</h2>
                    <p className="text-sm text-gray-600">
                      {selectedNote.date} at {selectedNote.time} • {selectedNote.therapyType}
                    </p>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <button
                      onClick={() => handleFinalizeNote(selectedNote.id)}
                      className="px-3 py-1 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
                      disabled={selectedNote.status === 'finalized'}
                      title="Finalize and lock note"
                    >
                      <i className="fas fa-lock mr-1"></i>
                      Finalize
                    </button>
                    <button
                      onClick={() => setShowSignatureModal(true)}
                      className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                      title="Add digital signature"
                    >
                      <i className="fas fa-signature mr-1"></i>
                      Sign
                    </button>
                    <button
                      onClick={() => handlePrintNote(selectedNote)}
                      className="px-3 py-1 bg-gray-600 text-white text-sm rounded-lg hover:bg-gray-700 transition-colors"
                      title="Print note"
                    >
                      <i className="fas fa-print mr-1"></i>
                      Print
                    </button>
                    <button
                      onClick={() => handleExportPDF(selectedNote)}
                      className="px-3 py-1 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 transition-colors"
                      title="Export as PDF"
                    >
                      <i className="fas fa-file-pdf mr-1"></i>
                      Export
                    </button>
                    <button
                      onClick={() => handleEmailNote(selectedNote)}
                      className="px-3 py-1 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition-colors"
                      title="Email note"
                    >
                      <i className="fas fa-envelope mr-1"></i>
                      Email
                    </button>
                    <button
                      onClick={() => handleShareNote(selectedNote)}
                      className="px-3 py-1 bg-cyan-600 text-white text-sm rounded-lg hover:bg-cyan-700 transition-colors"
                      title="Share with team"
                    >
                      <i className="fas fa-share-alt mr-1"></i>
                      Share
                    </button>
                    <button
                      onClick={() => handleSendForReview(selectedNote)}
                      className="px-3 py-1 bg-orange-600 text-white text-sm rounded-lg hover:bg-orange-700 transition-colors"
                      title="Send for review"
                    >
                      <i className="fas fa-user-check mr-1"></i>
                      Review
                    </button>
                    <button
                      onClick={() => handleCloneNote(selectedNote)}
                      className="px-3 py-1 bg-teal-600 text-white text-sm rounded-lg hover:bg-teal-700 transition-colors"
                      title="Clone for follow-up"
                    >
                      <i className="fas fa-clone mr-1"></i>
                      Clone
                    </button>
                    <button
                      onClick={() => handleArchiveNote(selectedNote.id)}
                      className="px-3 py-1 bg-yellow-600 text-white text-sm rounded-lg hover:bg-yellow-700 transition-colors"
                      title="Archive note"
                    >
                      <i className="fas fa-archive mr-1"></i>
                      Archive
                    </button>
                    <button
                      onClick={() => handleDeleteNote(selectedNote.id)}
                      className="px-3 py-1 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors"
                      title="Delete note"
                    >
                      <i className="fas fa-trash mr-1"></i>
                      Delete
                    </button>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-gray-200">
                <button
                  onClick={() => setActiveTab('soap')}
                  className={`px-6 py-3 font-medium text-sm transition-colors ${
                    activeTab === 'soap' 
                      ? 'text-blue-600 border-b-2 border-blue-600' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  SOAP Note
                </button>
                <button
                  onClick={() => setActiveTab('progress')}
                  className={`px-6 py-3 font-medium text-sm transition-colors ${
                    activeTab === 'progress' 
                      ? 'text-blue-600 border-b-2 border-blue-600' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Progress & Interventions
                </button>
                <button
                  onClick={() => setActiveTab('homework')}
                  className={`px-6 py-3 font-medium text-sm transition-colors ${
                    activeTab === 'homework' 
                      ? 'text-blue-600 border-b-2 border-blue-600' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Homework
                </button>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === 'soap' && (
                  <SOAPEditor 
                    note={selectedNote} 
                    onSave={(data) => handleSaveNote(data)} 
                  />
                )}
                {activeTab === 'progress' && (
                  <ProgressEditor 
                    note={selectedNote} 
                    onSave={(data) => handleSaveNote(data)} 
                  />
                )}
                {activeTab === 'homework' && (
                  <HomeworkEditor 
                    note={selectedNote} 
                    onSave={(data) => handleSaveNote(data)} 
                  />
                )}
              </div>

              {/* Quick Actions Bar */}
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleLinkTreatmentPlan(selectedNote.id)}
                    className="px-3 py-2 bg-white border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <i className="fas fa-link mr-2"></i>
                    Link to Treatment Plan
                  </button>
                  <button
                    onClick={() => navigate(`/clinical/patients/${selectedNote.patientId}`)}
                    className="px-3 py-2 bg-white border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <i className="fas fa-user mr-2"></i>
                    View Patient Profile
                  </button>
                  <button
                    onClick={() => navigate(`/clinical/therapy/sessions?patientId=${selectedNote.patientId}`)}
                    className="px-3 py-2 bg-white border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <i className="fas fa-history mr-2"></i>
                    Session History
                  </button>
                  <button
                    onClick={handleGenerateReport}
                    className="px-3 py-2 bg-white border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <i className="fas fa-chart-line mr-2"></i>
                    Generate Progress Report
                  </button>
                  <button
                    onClick={() => navigate(`/clinical/treatment/prescriptions?patientId=${selectedNote.patientId}`)}
                    className="px-3 py-2 bg-white border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <i className="fas fa-pills mr-2"></i>
                    View Prescriptions
                  </button>
                  <button
                    onClick={() => navigate(`/clinical/calendar?patientId=${selectedNote.patientId}`)}
                    className="px-3 py-2 bg-white border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <i className="fas fa-calendar-plus mr-2"></i>
                    Schedule Follow-up
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
              <i className="fas fa-file-medical text-6xl text-gray-300 mb-4"></i>
              <p className="text-gray-600">Select a note from the list or create a new one</p>
              <button
                onClick={() => setShowNewNoteModal(true)}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <i className="fas fa-plus mr-2"></i>
                Create New Note
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Toast Notification */}
      {notification && (
        <div className={`fixed bottom-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2 animate-pulse
          ${notification.type === 'success' ? 'bg-green-600 text-white' : 
            notification.type === 'error' ? 'bg-red-600 text-white' : 
            notification.type === 'info' ? 'bg-blue-600 text-white' : 
            'bg-gray-600 text-white'}`}>
          <i className={`fas ${notification.type === 'success' ? 'fa-check-circle' : 
            notification.type === 'error' ? 'fa-exclamation-circle' : 
            'fa-info-circle'}`}></i>
          <span>{notification.message}</span>
        </div>
      )}

      {/* Template Selection Modal */}
      {showTemplateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Select Template</h2>
            </div>
            <div className="p-6 space-y-3">
              <button
                onClick={() => handleApplyTemplate('initial')}
                className="w-full p-4 text-left bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
              >
                <h3 className="font-semibold text-blue-900">Initial Assessment</h3>
                <p className="text-sm text-blue-700 mt-1">For first-time patient sessions</p>
              </button>
              <button
                onClick={() => handleApplyTemplate('progress')}
                className="w-full p-4 text-left bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
              >
                <h3 className="font-semibold text-green-900">Progress Review</h3>
                <p className="text-sm text-green-700 mt-1">For ongoing therapy sessions</p>
              </button>
              <button
                onClick={() => handleApplyTemplate('crisis')}
                className="w-full p-4 text-left bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
              >
                <h3 className="font-semibold text-red-900">Crisis Intervention</h3>
                <p className="text-sm text-red-700 mt-1">For emergency or crisis situations</p>
              </button>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end">
              <button
                onClick={() => setShowTemplateModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Digital Signature Modal */}
      {showSignatureModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Add Digital Signature</h2>
            </div>
            <div className="p-6">
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <p className="text-sm text-gray-600 mb-2">Signing as:</p>
                <p className="font-semibold">{selectedNote?.therapist || 'Dr. Smith'}</p>
                <p className="text-sm text-gray-500">License: LCSW #12345</p>
                <p className="text-sm text-gray-500">Date: {new Date().toLocaleDateString()}</p>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <p className="text-sm text-yellow-800">
                  <i className="fas fa-exclamation-triangle mr-2"></i>
                  By signing, you confirm that this note is accurate and complete. Signed notes cannot be edited.
                </p>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => setShowSignatureModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddSignature}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <i className="fas fa-check mr-2"></i>
                Sign & Finalize
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Share Note</h2>
            </div>
            <div className="p-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Share with team members:
              </label>
              <div className="space-y-2 mb-4">
                <label className="flex items-center p-2 hover:bg-gray-50 rounded">
                  <input type="checkbox" className="mr-3" />
                  <span>Dr. Johnson - Psychiatrist</span>
                </label>
                <label className="flex items-center p-2 hover:bg-gray-50 rounded">
                  <input type="checkbox" className="mr-3" />
                  <span>Sarah Williams - Social Worker</span>
                </label>
                <label className="flex items-center p-2 hover:bg-gray-50 rounded">
                  <input type="checkbox" className="mr-3" />
                  <span>Clinical Supervisor</span>
                </label>
              </div>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                rows="3"
                placeholder="Add a message (optional)..."
              />
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => setShowShareModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  showNotification('Note shared with selected team members', 'success');
                  setShowShareModal(false);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <i className="fas fa-share mr-2"></i>
                Share Note
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Note Modal */}
      {showNewNoteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Create New Session Note</h2>
            </div>
            <form className="p-6" onSubmit={(e) => {
              e.preventDefault();
              const newNote = {
                id: notes.length + 1,
                sessionId: String(notes.length + 1),
                patientId: patientId || 'PT' + String(notes.length + 1).padStart(3, '0'),
                patientName: e.target.patientName.value,
                date: e.target.date.value,
                time: e.target.time.value,
                therapyType: e.target.therapyType.value,
                therapist: 'Dr. Smith', // In real app, from logged-in user
                soapNote: {
                  subjective: '',
                  objective: '',
                  assessment: '',
                  plan: ''
                },
                progressNote: '',
                interventions: [],
                homework: [],
                riskAssessment: '',
                nextSession: '',
                status: 'draft'
              };
              
              setNotes([newNote, ...notes]);
              setSelectedNote(newNote);
              setShowNewNoteModal(false);
              showNotification('New note created', 'success');
            }}>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Patient Name *
                  </label>
                  <input
                    type="text"
                    name="patientName"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Therapy Type *
                  </label>
                  <select
                    name="therapyType"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="CBT">CBT</option>
                    <option value="DBT">DBT</option>
                    <option value="EMDR">EMDR</option>
                    <option value="IPT">IPT</option>
                    <option value="Psychodynamic">Psychodynamic</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date *
                  </label>
                  <input
                    type="date"
                    name="date"
                    required
                    defaultValue={new Date().toLocaleDateString('en-CA')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Time *
                  </label>
                  <input
                    type="time"
                    name="time"
                    required
                    defaultValue={new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowNewNoteModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Create Note
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SessionNotes;