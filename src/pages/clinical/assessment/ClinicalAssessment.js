import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

/**
 * ClinicalAssessment Component
 * Comprehensive clinical assessment tool for mental health professionals
 * Tablet-optimized responsive design with touch-friendly interface
 */
const ClinicalAssessment = () => {
  const navigate = useNavigate();
  const { patientId } = useParams();
  
  // State management for multi-step form
  const [currentStep, setCurrentStep] = useState(1);
  const [assessmentData, setAssessmentData] = useState({
    // Basic Information
    patientInfo: {
      id: patientId || '',
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString('en-US', { hour12: false }),
      clinician: '',
      assessmentType: 'initial'
    },
    
    // Chief Complaint & HPI
    chiefComplaint: {
      presentingProblem: '',
      onset: '',
      duration: '',
      severity: '',
      triggers: '',
      alleviatingFactors: '',
      functionalImpact: ''
    },
    
    // Biopsychosocial Assessment
    biopsychosocial: {
      biological: {
        medicalHistory: '',
        currentMedications: '',
        allergies: '',
        substanceUse: '',
        familyHistory: '',
        developmentalHistory: ''
      },
      psychological: {
        cognitivePatterns: '',
        copingMechanisms: '',
        personalityTraits: '',
        traumaHistory: '',
        attachmentStyle: ''
      },
      social: {
        supportSystem: '',
        livingSituation: '',
        employment: '',
        relationships: '',
        culturalFactors: '',
        spirituality: ''
      }
    },
    
    // Mental Status Examination
    mentalStatusExam: {
      appearance: {
        grooming: '',
        dress: '',
        hygiene: '',
        posture: '',
        eyeContact: ''
      },
      behavior: {
        motorActivity: '',
        cooperation: '',
        agitation: '',
        psychomotor: ''
      },
      speech: {
        rate: '',
        volume: '',
        tone: '',
        fluency: '',
        coherence: ''
      },
      mood: {
        stated: '',
        observed: '',
        congruence: ''
      },
      affect: {
        range: '',
        intensity: '',
        appropriateness: '',
        stability: ''
      },
      thoughtProcess: {
        organization: '',
        coherence: '',
        goalDirected: '',
        thoughtBlocking: ''
      },
      thoughtContent: {
        delusions: '',
        obsessions: '',
        compulsions: '',
        phobias: '',
        suicidalIdeation: '',
        homicidalIdeation: ''
      },
      perception: {
        hallucinations: '',
        illusions: '',
        depersonalization: '',
        derealization: ''
      },
      cognition: {
        orientation: '',
        attention: '',
        memory: '',
        concentration: '',
        abstractThinking: ''
      },
      insight: '',
      judgment: ''
    },
    
    // Screening Tools
    screeningTools: {
      phq9: {
        scores: Array(9).fill(0),
        total: 0,
        severity: ''
      },
      gad7: {
        scores: Array(7).fill(0),
        total: 0,
        severity: ''
      },
      pcPtsd5: {
        responses: Array(5).fill(''),
        positive: false
      }
    },
    
    // Risk Assessment
    riskAssessment: {
      suicideRisk: {
        ideation: '',
        plan: '',
        intent: '',
        means: '',
        previousAttempts: '',
        protectiveFactors: '',
        riskLevel: ''
      },
      violenceRisk: {
        history: '',
        currentThoughts: '',
        targets: '',
        access: '',
        riskLevel: ''
      },
      selfHarmRisk: {
        current: '',
        methods: '',
        frequency: '',
        triggers: ''
      }
    },
    
    // Clinical Formulation
    clinicalFormulation: {
      diagnosis: {
        primary: '',
        secondary: '',
        differential: ''
      },
      strengths: '',
      barriers: '',
      prognosis: ''
    },
    
    // Treatment Planning
    treatmentPlan: {
      immediateInterventions: '',
      shortTermGoals: '',
      longTermGoals: '',
      modalities: [],
      referrals: [],
      followUp: ''
    }
  });
  
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);

  // Step definitions
  const steps = [
    { id: 1, title: 'Basic Info', icon: 'fa-user' },
    { id: 2, title: 'Chief Complaint', icon: 'fa-comment-medical' },
    { id: 3, title: 'Biopsychosocial', icon: 'fa-brain' },
    { id: 4, title: 'Mental Status', icon: 'fa-clipboard-check' },
    { id: 5, title: 'Screening Tools', icon: 'fa-tasks' },
    { id: 6, title: 'Risk Assessment', icon: 'fa-exclamation-triangle' },
    { id: 7, title: 'Formulation', icon: 'fa-diagnoses' },
    { id: 8, title: 'Treatment Plan', icon: 'fa-notes-medical' }
  ];

  // Auto-save functionality
  useEffect(() => {
    if (autoSaveEnabled) {
      const saveTimer = setTimeout(() => {
        saveProgress();
      }, 30000); // Auto-save every 30 seconds
      
      return () => clearTimeout(saveTimer);
    }
  }, [assessmentData, autoSaveEnabled]);

  // Update handler for nested state
  const updateAssessmentData = (section, subsection, field, value) => {
    setAssessmentData(prev => {
      if (subsection) {
        return {
          ...prev,
          [section]: {
            ...prev[section],
            [subsection]: {
              ...prev[section][subsection],
              [field]: value
            }
          }
        };
      } else {
        return {
          ...prev,
          [section]: {
            ...prev[section],
            [field]: value
          }
        };
      }
    });
  };

  // PHQ-9 Scoring
  const calculatePHQ9 = (scores) => {
    const total = scores.reduce((sum, score) => sum + parseInt(score || 0), 0);
    let severity = '';
    
    if (total >= 0 && total <= 4) severity = 'Minimal';
    else if (total >= 5 && total <= 9) severity = 'Mild';
    else if (total >= 10 && total <= 14) severity = 'Moderate';
    else if (total >= 15 && total <= 19) severity = 'Moderately Severe';
    else if (total >= 20) severity = 'Severe';
    
    return { total, severity };
  };

  // GAD-7 Scoring
  const calculateGAD7 = (scores) => {
    const total = scores.reduce((sum, score) => sum + parseInt(score || 0), 0);
    let severity = '';
    
    if (total >= 0 && total <= 4) severity = 'Minimal';
    else if (total >= 5 && total <= 9) severity = 'Mild';
    else if (total >= 10 && total <= 14) severity = 'Moderate';
    else if (total >= 15) severity = 'Severe';
    
    return { total, severity };
  };

  // Form validation
  const validateStep = (stepNumber) => {
    const stepErrors = {};
    
    switch(stepNumber) {
      case 1:
        if (!assessmentData.patientInfo.clinician) {
          stepErrors.clinician = 'Clinician name is required';
        }
        break;
      case 2:
        if (!assessmentData.chiefComplaint.presentingProblem) {
          stepErrors.presentingProblem = 'Chief complaint is required';
        }
        break;
      case 6:
        if (!assessmentData.riskAssessment.suicideRisk.riskLevel) {
          stepErrors.suicideRiskLevel = 'Suicide risk level assessment is required';
        }
        break;
      default:
        break;
    }
    
    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  // Navigation handlers
  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length));
      window.scrollTo(0, 0);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    window.scrollTo(0, 0);
  };

  const handleStepClick = (stepId) => {
    if (validateStep(currentStep)) {
      setCurrentStep(stepId);
      window.scrollTo(0, 0);
    }
  };

  // Save progress
  const saveProgress = async () => {
    setIsSaving(true);
    try {
      // Simulated API call
      console.log('Saving assessment data:', assessmentData);
      // await api.saveAssessment(assessmentData);
      
      // Show success message
      setTimeout(() => {
        setIsSaving(false);
      }, 1000);
    } catch (error) {
      console.error('Error saving assessment:', error);
      setIsSaving(false);
    }
  };

  // Submit assessment
  const handleSubmit = async () => {
    if (!validateStep(currentStep)) {
      return;
    }
    
    setIsSaving(true);
    try {
      // Simulated API call
      console.log('Submitting assessment:', assessmentData);
      // await api.submitAssessment(assessmentData);
      
      // Navigate to patient details or dashboard
      setTimeout(() => {
        navigate(`/clinical/patients/${patientId}`);
      }, 1500);
    } catch (error) {
      console.error('Error submitting assessment:', error);
      setIsSaving(false);
    }
  };

  // Render step content
  const renderStepContent = () => {
    switch(currentStep) {
      case 1:
        return <BasicInfoStep data={assessmentData} updateData={updateAssessmentData} errors={errors} />;
      case 2:
        return <ChiefComplaintStep data={assessmentData} updateData={updateAssessmentData} errors={errors} />;
      case 3:
        return <BiopsychosocialStep data={assessmentData} updateData={updateAssessmentData} />;
      case 4:
        return <MentalStatusStep data={assessmentData} updateData={updateAssessmentData} />;
      case 5:
        return <ScreeningToolsStep 
                  data={assessmentData} 
                  updateData={updateAssessmentData}
                  calculatePHQ9={calculatePHQ9}
                  calculateGAD7={calculateGAD7} 
                />;
      case 6:
        return <RiskAssessmentStep data={assessmentData} updateData={updateAssessmentData} errors={errors} />;
      case 7:
        return <ClinicalFormulationStep data={assessmentData} updateData={updateAssessmentData} />;
      case 8:
        return <TreatmentPlanStep data={assessmentData} updateData={updateAssessmentData} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Clinical Assessment</h1>
              <p className="text-sm text-gray-600 mt-1">
                Patient ID: {patientId} | {assessmentData.patientInfo.date}
              </p>
            </div>
            <div className="flex items-center space-x-3">
              {/* Auto-save indicator */}
              {isSaving && (
                <span className="flex items-center text-sm text-gray-600">
                  <i className="fas fa-spinner fa-spin mr-2"></i>
                  Saving...
                </span>
              )}
              
              {/* Auto-save toggle */}
              <label className="flex items-center cursor-pointer">
                <span className="text-sm text-gray-700 mr-2 hidden sm:inline">Auto-save</span>
                <div className="relative">
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={autoSaveEnabled}
                    onChange={(e) => setAutoSaveEnabled(e.target.checked)}
                  />
                  <div className={`block w-10 h-6 rounded-full ${autoSaveEnabled ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                  <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition ${autoSaveEnabled ? 'transform translate-x-4' : ''}`}></div>
                </div>
              </label>
              
              <button
                onClick={saveProgress}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
              >
                <i className="fas fa-save mr-2"></i>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Steps - Tablet optimized */}
      <div className="bg-white border-b px-4 py-3 overflow-x-auto">
        <div className="flex space-x-2 sm:space-x-4 min-w-max">
          {steps.map((step, index) => (
            <button
              key={step.id}
              onClick={() => handleStepClick(step.id)}
              className={`flex items-center px-3 py-2 rounded-lg transition-all ${
                currentStep === step.id 
                  ? 'bg-blue-500 text-white' 
                  : currentStep > step.id
                  ? 'bg-green-100 text-green-700 hover:bg-green-200'
                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
              }`}
            >
              <i className={`fas ${step.icon} mr-2`}></i>
              <span className="font-medium">{step.title}</span>
              {currentStep > step.id && (
                <i className="fas fa-check ml-2 text-green-600"></i>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          {renderStepContent()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className={`px-6 py-3 rounded-lg font-medium transition ${
              currentStep === 1 
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                : 'bg-gray-500 text-white hover:bg-gray-600'
            }`}
          >
            <i className="fas fa-arrow-left mr-2"></i>
            Previous
          </button>

          <div className="text-center">
            <span className="text-gray-600">
              Step {currentStep} of {steps.length}
            </span>
          </div>

          {currentStep === steps.length ? (
            <button
              onClick={handleSubmit}
              disabled={isSaving}
              className="px-6 py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition disabled:bg-gray-300"
            >
              {isSaving ? (
                <>
                  <i className="fas fa-spinner fa-spin mr-2"></i>
                  Submitting...
                </>
              ) : (
                <>
                  <i className="fas fa-check mr-2"></i>
                  Submit Assessment
                </>
              )}
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition"
            >
              Next
              <i className="fas fa-arrow-right ml-2"></i>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// Step Components

const BasicInfoStep = ({ data, updateData, errors }) => (
  <div className="space-y-6">
    <h2 className="text-xl font-semibold text-gray-900 mb-4">Basic Information</h2>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Assessment Type <span className="text-red-500">*</span>
        </label>
        <select
          value={data.patientInfo.assessmentType}
          onChange={(e) => updateData('patientInfo', null, 'assessmentType', e.target.value)}
          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="initial">Initial Assessment</option>
          <option value="followup">Follow-up Assessment</option>
          <option value="crisis">Crisis Assessment</option>
          <option value="discharge">Discharge Assessment</option>
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Clinician Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={data.patientInfo.clinician}
          onChange={(e) => updateData('patientInfo', null, 'clinician', e.target.value)}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            errors.clinician ? 'border-red-500' : ''
          }`}
          placeholder="Enter clinician name"
        />
        {errors.clinician && (
          <p className="text-red-500 text-sm mt-1">{errors.clinician}</p>
        )}
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Assessment Date
        </label>
        <input
          type="date"
          value={data.patientInfo.date}
          onChange={(e) => updateData('patientInfo', null, 'date', e.target.value)}
          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Assessment Time
        </label>
        <input
          type="time"
          value={data.patientInfo.time}
          onChange={(e) => updateData('patientInfo', null, 'time', e.target.value)}
          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    </div>
    
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
      <p className="text-sm text-blue-800">
        <i className="fas fa-info-circle mr-2"></i>
        This assessment will be saved to the patient's electronic health record and can be accessed for future reference.
      </p>
    </div>
  </div>
);

const ChiefComplaintStep = ({ data, updateData, errors }) => (
  <div className="space-y-6">
    <h2 className="text-xl font-semibold text-gray-900 mb-4">Chief Complaint & History of Present Illness</h2>
    
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Presenting Problem <span className="text-red-500">*</span>
      </label>
      <textarea
        value={data.chiefComplaint.presentingProblem}
        onChange={(e) => updateData('chiefComplaint', null, 'presentingProblem', e.target.value)}
        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-32 ${
          errors.presentingProblem ? 'border-red-500' : ''
        }`}
        placeholder="Describe the main reason for seeking help..."
      />
      {errors.presentingProblem && (
        <p className="text-red-500 text-sm mt-1">{errors.presentingProblem}</p>
      )}
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Onset
        </label>
        <input
          type="text"
          value={data.chiefComplaint.onset}
          onChange={(e) => updateData('chiefComplaint', null, 'onset', e.target.value)}
          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="When did symptoms begin?"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Duration
        </label>
        <input
          type="text"
          value={data.chiefComplaint.duration}
          onChange={(e) => updateData('chiefComplaint', null, 'duration', e.target.value)}
          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="How long have symptoms persisted?"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Severity (1-10)
        </label>
        <input
          type="range"
          min="1"
          max="10"
          value={data.chiefComplaint.severity || 5}
          onChange={(e) => updateData('chiefComplaint', null, 'severity', e.target.value)}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-gray-600 mt-1">
          <span>Mild</span>
          <span className="font-semibold text-lg">{data.chiefComplaint.severity || 5}</span>
          <span>Severe</span>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Functional Impact
        </label>
        <select
          value={data.chiefComplaint.functionalImpact}
          onChange={(e) => updateData('chiefComplaint', null, 'functionalImpact', e.target.value)}
          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Select impact level</option>
          <option value="none">No impact</option>
          <option value="mild">Mild impact</option>
          <option value="moderate">Moderate impact</option>
          <option value="severe">Severe impact</option>
          <option value="complete">Complete dysfunction</option>
        </select>
      </div>
    </div>
    
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Triggers
      </label>
      <textarea
        value={data.chiefComplaint.triggers}
        onChange={(e) => updateData('chiefComplaint', null, 'triggers', e.target.value)}
        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24"
        placeholder="What triggers or worsens the symptoms?"
      />
    </div>
    
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Alleviating Factors
      </label>
      <textarea
        value={data.chiefComplaint.alleviatingFactors}
        onChange={(e) => updateData('chiefComplaint', null, 'alleviatingFactors', e.target.value)}
        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24"
        placeholder="What helps reduce the symptoms?"
      />
    </div>
  </div>
);

const BiopsychosocialStep = ({ data, updateData }) => (
  <div className="space-y-8">
    <h2 className="text-xl font-semibold text-gray-900 mb-4">Biopsychosocial Assessment</h2>
    
    {/* Biological Factors */}
    <div className="bg-gray-50 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        <i className="fas fa-dna mr-2 text-blue-500"></i>
        Biological Factors
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Medical History
          </label>
          <textarea
            value={data.biopsychosocial.biological.medicalHistory}
            onChange={(e) => updateData('biopsychosocial', 'biological', 'medicalHistory', e.target.value)}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24"
            placeholder="Relevant medical conditions..."
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Current Medications
          </label>
          <textarea
            value={data.biopsychosocial.biological.currentMedications}
            onChange={(e) => updateData('biopsychosocial', 'biological', 'currentMedications', e.target.value)}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24"
            placeholder="List all current medications..."
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Family History
          </label>
          <textarea
            value={data.biopsychosocial.biological.familyHistory}
            onChange={(e) => updateData('biopsychosocial', 'biological', 'familyHistory', e.target.value)}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24"
            placeholder="Family mental health history..."
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Substance Use
          </label>
          <textarea
            value={data.biopsychosocial.biological.substanceUse}
            onChange={(e) => updateData('biopsychosocial', 'biological', 'substanceUse', e.target.value)}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24"
            placeholder="Alcohol, tobacco, drugs..."
          />
        </div>
      </div>
    </div>
    
    {/* Psychological Factors */}
    <div className="bg-gray-50 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        <i className="fas fa-brain mr-2 text-purple-500"></i>
        Psychological Factors
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cognitive Patterns
          </label>
          <textarea
            value={data.biopsychosocial.psychological.cognitivePatterns}
            onChange={(e) => updateData('biopsychosocial', 'psychological', 'cognitivePatterns', e.target.value)}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24"
            placeholder="Thinking patterns, beliefs..."
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Coping Mechanisms
          </label>
          <textarea
            value={data.biopsychosocial.psychological.copingMechanisms}
            onChange={(e) => updateData('biopsychosocial', 'psychological', 'copingMechanisms', e.target.value)}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24"
            placeholder="How patient copes with stress..."
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Trauma History
          </label>
          <textarea
            value={data.biopsychosocial.psychological.traumaHistory}
            onChange={(e) => updateData('biopsychosocial', 'psychological', 'traumaHistory', e.target.value)}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24"
            placeholder="Past traumatic experiences..."
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Personality Traits
          </label>
          <textarea
            value={data.biopsychosocial.psychological.personalityTraits}
            onChange={(e) => updateData('biopsychosocial', 'psychological', 'personalityTraits', e.target.value)}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24"
            placeholder="Key personality characteristics..."
          />
        </div>
      </div>
    </div>
    
    {/* Social Factors */}
    <div className="bg-gray-50 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        <i className="fas fa-users mr-2 text-green-500"></i>
        Social Factors
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Support System
          </label>
          <textarea
            value={data.biopsychosocial.social.supportSystem}
            onChange={(e) => updateData('biopsychosocial', 'social', 'supportSystem', e.target.value)}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24"
            placeholder="Family, friends, community support..."
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Living Situation
          </label>
          <textarea
            value={data.biopsychosocial.social.livingSituation}
            onChange={(e) => updateData('biopsychosocial', 'social', 'livingSituation', e.target.value)}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24"
            placeholder="Housing, living arrangements..."
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Employment/Education
          </label>
          <textarea
            value={data.biopsychosocial.social.employment}
            onChange={(e) => updateData('biopsychosocial', 'social', 'employment', e.target.value)}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24"
            placeholder="Work or school situation..."
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cultural Factors
          </label>
          <textarea
            value={data.biopsychosocial.social.culturalFactors}
            onChange={(e) => updateData('biopsychosocial', 'social', 'culturalFactors', e.target.value)}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24"
            placeholder="Cultural background, beliefs..."
          />
        </div>
      </div>
    </div>
  </div>
);

const MentalStatusStep = ({ data, updateData }) => (
  <div className="space-y-6">
    <h2 className="text-xl font-semibold text-gray-900 mb-4">Mental Status Examination</h2>
    
    {/* Appearance & Behavior */}
    <div className="border rounded-lg p-4">
      <h3 className="text-lg font-medium text-gray-800 mb-3">Appearance & Behavior</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Grooming</label>
          <select
            value={data.mentalStatusExam.appearance.grooming}
            onChange={(e) => updateData('mentalStatusExam', 'appearance', 'grooming', e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select</option>
            <option value="well-groomed">Well-groomed</option>
            <option value="adequate">Adequate</option>
            <option value="disheveled">Disheveled</option>
            <option value="unkempt">Unkempt</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Eye Contact</label>
          <select
            value={data.mentalStatusExam.appearance.eyeContact}
            onChange={(e) => updateData('mentalStatusExam', 'appearance', 'eyeContact', e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select</option>
            <option value="appropriate">Appropriate</option>
            <option value="intermittent">Intermittent</option>
            <option value="avoidant">Avoidant</option>
            <option value="intense">Intense</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Motor Activity</label>
          <select
            value={data.mentalStatusExam.behavior.motorActivity}
            onChange={(e) => updateData('mentalStatusExam', 'behavior', 'motorActivity', e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select</option>
            <option value="normal">Normal</option>
            <option value="restless">Restless</option>
            <option value="agitated">Agitated</option>
            <option value="retarded">Retarded</option>
            <option value="catatonic">Catatonic</option>
          </select>
        </div>
      </div>
    </div>
    
    {/* Speech */}
    <div className="border rounded-lg p-4">
      <h3 className="text-lg font-medium text-gray-800 mb-3">Speech</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Rate</label>
          <select
            value={data.mentalStatusExam.speech.rate}
            onChange={(e) => updateData('mentalStatusExam', 'speech', 'rate', e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select</option>
            <option value="normal">Normal</option>
            <option value="slow">Slow</option>
            <option value="rapid">Rapid</option>
            <option value="pressured">Pressured</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Volume</label>
          <select
            value={data.mentalStatusExam.speech.volume}
            onChange={(e) => updateData('mentalStatusExam', 'speech', 'volume', e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select</option>
            <option value="normal">Normal</option>
            <option value="loud">Loud</option>
            <option value="soft">Soft</option>
            <option value="whispered">Whispered</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Coherence</label>
          <select
            value={data.mentalStatusExam.speech.coherence}
            onChange={(e) => updateData('mentalStatusExam', 'speech', 'coherence', e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select</option>
            <option value="coherent">Coherent</option>
            <option value="tangential">Tangential</option>
            <option value="circumstantial">Circumstantial</option>
            <option value="incoherent">Incoherent</option>
          </select>
        </div>
      </div>
    </div>
    
    {/* Mood & Affect */}
    <div className="border rounded-lg p-4">
      <h3 className="text-lg font-medium text-gray-800 mb-3">Mood & Affect</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Stated Mood</label>
          <input
            type="text"
            value={data.mentalStatusExam.mood.stated}
            onChange={(e) => updateData('mentalStatusExam', 'mood', 'stated', e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Patient's description"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Observed Affect</label>
          <select
            value={data.mentalStatusExam.affect.range}
            onChange={(e) => updateData('mentalStatusExam', 'affect', 'range', e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select</option>
            <option value="euthymic">Euthymic</option>
            <option value="depressed">Depressed</option>
            <option value="anxious">Anxious</option>
            <option value="irritable">Irritable</option>
            <option value="euphoric">Euphoric</option>
            <option value="flat">Flat</option>
          </select>
        </div>
      </div>
    </div>
    
    {/* Thought Process & Content */}
    <div className="border rounded-lg p-4">
      <h3 className="text-lg font-medium text-gray-800 mb-3">Thought Process & Content</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Organization</label>
          <select
            value={data.mentalStatusExam.thoughtProcess.organization}
            onChange={(e) => updateData('mentalStatusExam', 'thoughtProcess', 'organization', e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select</option>
            <option value="organized">Organized</option>
            <option value="tangential">Tangential</option>
            <option value="circumstantial">Circumstantial</option>
            <option value="loose">Loose associations</option>
            <option value="disorganized">Disorganized</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Delusions</label>
          <select
            value={data.mentalStatusExam.thoughtContent.delusions}
            onChange={(e) => updateData('mentalStatusExam', 'thoughtContent', 'delusions', e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select</option>
            <option value="none">None</option>
            <option value="paranoid">Paranoid</option>
            <option value="grandiose">Grandiose</option>
            <option value="reference">Ideas of reference</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>
    </div>
    
    {/* Cognition */}
    <div className="border rounded-lg p-4">
      <h3 className="text-lg font-medium text-gray-800 mb-3">Cognition</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Orientation</label>
          <select
            value={data.mentalStatusExam.cognition.orientation}
            onChange={(e) => updateData('mentalStatusExam', 'cognition', 'orientation', e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select</option>
            <option value="x4">Oriented x4</option>
            <option value="x3">Oriented x3</option>
            <option value="x2">Oriented x2</option>
            <option value="x1">Oriented x1</option>
            <option value="disoriented">Disoriented</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Memory</label>
          <select
            value={data.mentalStatusExam.cognition.memory}
            onChange={(e) => updateData('mentalStatusExam', 'cognition', 'memory', e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select</option>
            <option value="intact">Intact</option>
            <option value="mild-impairment">Mild impairment</option>
            <option value="moderate-impairment">Moderate impairment</option>
            <option value="severe-impairment">Severe impairment</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Attention</label>
          <select
            value={data.mentalStatusExam.cognition.attention}
            onChange={(e) => updateData('mentalStatusExam', 'cognition', 'attention', e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select</option>
            <option value="focused">Focused</option>
            <option value="distractible">Distractible</option>
            <option value="hypervigilant">Hypervigilant</option>
            <option value="unable-to-focus">Unable to focus</option>
          </select>
        </div>
      </div>
    </div>
    
    {/* Insight & Judgment */}
    <div className="border rounded-lg p-4">
      <h3 className="text-lg font-medium text-gray-800 mb-3">Insight & Judgment</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Insight</label>
          <select
            value={data.mentalStatusExam.insight}
            onChange={(e) => updateData('mentalStatusExam', null, 'insight', e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select</option>
            <option value="good">Good</option>
            <option value="fair">Fair</option>
            <option value="limited">Limited</option>
            <option value="poor">Poor</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Judgment</label>
          <select
            value={data.mentalStatusExam.judgment}
            onChange={(e) => updateData('mentalStatusExam', null, 'judgment', e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select</option>
            <option value="good">Good</option>
            <option value="fair">Fair</option>
            <option value="impaired">Impaired</option>
            <option value="poor">Poor</option>
          </select>
        </div>
      </div>
    </div>
  </div>
);

const ScreeningToolsStep = ({ data, updateData, calculatePHQ9, calculateGAD7 }) => {
  const phq9Questions = [
    "Little interest or pleasure in doing things",
    "Feeling down, depressed, or hopeless",
    "Trouble falling or staying asleep, or sleeping too much",
    "Feeling tired or having little energy",
    "Poor appetite or overeating",
    "Feeling bad about yourself or that you are a failure",
    "Trouble concentrating on things",
    "Moving or speaking slowly or being fidgety/restless",
    "Thoughts of self-harm or suicide"
  ];
  
  const gad7Questions = [
    "Feeling nervous, anxious, or on edge",
    "Not being able to stop or control worrying",
    "Worrying too much about different things",
    "Trouble relaxing",
    "Being so restless that it's hard to sit still",
    "Becoming easily annoyed or irritable",
    "Feeling afraid as if something awful might happen"
  ];
  
  const handlePHQ9Change = (index, value) => {
    const newScores = [...data.screeningTools.phq9.scores];
    newScores[index] = parseInt(value);
    const { total, severity } = calculatePHQ9(newScores);
    
    updateData('screeningTools', 'phq9', 'scores', newScores);
    updateData('screeningTools', 'phq9', 'total', total);
    updateData('screeningTools', 'phq9', 'severity', severity);
  };
  
  const handleGAD7Change = (index, value) => {
    const newScores = [...data.screeningTools.gad7.scores];
    newScores[index] = parseInt(value);
    const { total, severity } = calculateGAD7(newScores);
    
    updateData('screeningTools', 'gad7', 'scores', newScores);
    updateData('screeningTools', 'gad7', 'total', total);
    updateData('screeningTools', 'gad7', 'severity', severity);
  };
  
  return (
    <div className="space-y-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Screening Tools</h2>
      
      {/* PHQ-9 */}
      <div className="bg-blue-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">PHQ-9 Depression Screening</h3>
        <p className="text-sm text-gray-600 mb-4">Over the last 2 weeks, how often have you been bothered by:</p>
        
        <div className="space-y-3">
          {phq9Questions.map((question, index) => (
            <div key={index} className="bg-white rounded-lg p-4">
              <p className="text-sm font-medium text-gray-700 mb-2">
                {index + 1}. {question}
              </p>
              <div className="flex space-x-2">
                {[
                  { value: 0, label: "Not at all" },
                  { value: 1, label: "Several days" },
                  { value: 2, label: "More than half" },
                  { value: 3, label: "Nearly every day" }
                ].map((option) => (
                  <label key={option.value} className="flex items-center">
                    <input
                      type="radio"
                      name={`phq9-${index}`}
                      value={option.value}
                      checked={data.screeningTools.phq9.scores[index] === option.value}
                      onChange={(e) => handlePHQ9Change(index, e.target.value)}
                      className="mr-2"
                    />
                    <span className="text-xs sm:text-sm">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 p-4 bg-white rounded-lg">
          <p className="text-lg font-semibold">
            Total Score: {data.screeningTools.phq9.total}
          </p>
          <p className="text-sm text-gray-600">
            Severity: <span className="font-medium text-blue-600">{data.screeningTools.phq9.severity}</span>
          </p>
        </div>
      </div>
      
      {/* GAD-7 */}
      <div className="bg-purple-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">GAD-7 Anxiety Screening</h3>
        <p className="text-sm text-gray-600 mb-4">Over the last 2 weeks, how often have you been bothered by:</p>
        
        <div className="space-y-3">
          {gad7Questions.map((question, index) => (
            <div key={index} className="bg-white rounded-lg p-4">
              <p className="text-sm font-medium text-gray-700 mb-2">
                {index + 1}. {question}
              </p>
              <div className="flex space-x-2">
                {[
                  { value: 0, label: "Not at all" },
                  { value: 1, label: "Several days" },
                  { value: 2, label: "More than half" },
                  { value: 3, label: "Nearly every day" }
                ].map((option) => (
                  <label key={option.value} className="flex items-center">
                    <input
                      type="radio"
                      name={`gad7-${index}`}
                      value={option.value}
                      checked={data.screeningTools.gad7.scores[index] === option.value}
                      onChange={(e) => handleGAD7Change(index, e.target.value)}
                      className="mr-2"
                    />
                    <span className="text-xs sm:text-sm">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 p-4 bg-white rounded-lg">
          <p className="text-lg font-semibold">
            Total Score: {data.screeningTools.gad7.total}
          </p>
          <p className="text-sm text-gray-600">
            Severity: <span className="font-medium text-purple-600">{data.screeningTools.gad7.severity}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

const RiskAssessmentStep = ({ data, updateData, errors }) => (
  <div className="space-y-6">
    <h2 className="text-xl font-semibold text-gray-900 mb-4">Risk Assessment</h2>
    
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
      <p className="text-sm text-red-800">
        <i className="fas fa-exclamation-triangle mr-2"></i>
        This section contains critical safety assessments. Please complete thoroughly.
      </p>
    </div>
    
    {/* Suicide Risk */}
    <div className="border border-red-300 rounded-lg p-6 bg-red-50">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        <i className="fas fa-exclamation-circle mr-2 text-red-500"></i>
        Suicide Risk Assessment
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Suicidal Ideation
          </label>
          <select
            value={data.riskAssessment.suicideRisk.ideation}
            onChange={(e) => updateData('riskAssessment', 'suicideRisk', 'ideation', e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
          >
            <option value="">Select</option>
            <option value="none">No ideation</option>
            <option value="passive">Passive ideation</option>
            <option value="active">Active ideation</option>
            <option value="active-with-plan">Active with plan</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Previous Attempts
          </label>
          <select
            value={data.riskAssessment.suicideRisk.previousAttempts}
            onChange={(e) => updateData('riskAssessment', 'suicideRisk', 'previousAttempts', e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
          >
            <option value="">Select</option>
            <option value="none">No previous attempts</option>
            <option value="one">One previous attempt</option>
            <option value="multiple">Multiple attempts</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Access to Means
          </label>
          <select
            value={data.riskAssessment.suicideRisk.means}
            onChange={(e) => updateData('riskAssessment', 'suicideRisk', 'means', e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
          >
            <option value="">Select</option>
            <option value="no-access">No access to means</option>
            <option value="limited-access">Limited access</option>
            <option value="ready-access">Ready access</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Risk Level <span className="text-red-500">*</span>
          </label>
          <select
            value={data.riskAssessment.suicideRisk.riskLevel}
            onChange={(e) => updateData('riskAssessment', 'suicideRisk', 'riskLevel', e.target.value)}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 ${
              errors.suicideRiskLevel ? 'border-red-500' : ''
            }`}
          >
            <option value="">Select risk level</option>
            <option value="none">No risk</option>
            <option value="low">Low risk</option>
            <option value="moderate">Moderate risk</option>
            <option value="high">High risk</option>
            <option value="imminent">Imminent risk</option>
          </select>
          {errors.suicideRiskLevel && (
            <p className="text-red-500 text-sm mt-1">{errors.suicideRiskLevel}</p>
          )}
        </div>
      </div>
      
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Protective Factors
        </label>
        <textarea
          value={data.riskAssessment.suicideRisk.protectiveFactors}
          onChange={(e) => updateData('riskAssessment', 'suicideRisk', 'protectiveFactors', e.target.value)}
          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 h-24"
          placeholder="Family support, religious beliefs, future plans..."
        />
      </div>
    </div>
    
    {/* Violence Risk */}
    <div className="border rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        <i className="fas fa-fist-raised mr-2 text-orange-500"></i>
        Violence Risk Assessment
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            History of Violence
          </label>
          <select
            value={data.riskAssessment.violenceRisk.history}
            onChange={(e) => updateData('riskAssessment', 'violenceRisk', 'history', e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select</option>
            <option value="none">No history</option>
            <option value="remote">Remote history</option>
            <option value="recent">Recent history</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Current Thoughts
          </label>
          <select
            value={data.riskAssessment.violenceRisk.currentThoughts}
            onChange={(e) => updateData('riskAssessment', 'violenceRisk', 'currentThoughts', e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select</option>
            <option value="none">No violent thoughts</option>
            <option value="vague">Vague thoughts</option>
            <option value="specific">Specific thoughts</option>
            <option value="plan">Specific plan</option>
          </select>
        </div>
      </div>
    </div>
    
    {/* Self-Harm Risk */}
    <div className="border rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        <i className="fas fa-hand-paper mr-2 text-yellow-500"></i>
        Self-Harm Risk Assessment
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Current Self-Harm
          </label>
          <select
            value={data.riskAssessment.selfHarmRisk.current}
            onChange={(e) => updateData('riskAssessment', 'selfHarmRisk', 'current', e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select</option>
            <option value="none">No self-harm</option>
            <option value="thoughts">Thoughts only</option>
            <option value="recent">Recent behavior</option>
            <option value="active">Active behavior</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Frequency
          </label>
          <select
            value={data.riskAssessment.selfHarmRisk.frequency}
            onChange={(e) => updateData('riskAssessment', 'selfHarmRisk', 'frequency', e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select</option>
            <option value="never">Never</option>
            <option value="rare">Rare</option>
            <option value="occasional">Occasional</option>
            <option value="frequent">Frequent</option>
            <option value="daily">Daily</option>
          </select>
        </div>
      </div>
    </div>
  </div>
);

const ClinicalFormulationStep = ({ data, updateData }) => (
  <div className="space-y-6">
    <h2 className="text-xl font-semibold text-gray-900 mb-4">Clinical Formulation</h2>
    
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Primary Diagnosis
      </label>
      <input
        type="text"
        value={data.clinicalFormulation.diagnosis.primary}
        onChange={(e) => updateData('clinicalFormulation', 'diagnosis', 'primary', e.target.value)}
        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder="Enter primary diagnosis with ICD-10/DSM-5 code"
      />
    </div>
    
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Secondary Diagnoses
      </label>
      <textarea
        value={data.clinicalFormulation.diagnosis.secondary}
        onChange={(e) => updateData('clinicalFormulation', 'diagnosis', 'secondary', e.target.value)}
        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24"
        placeholder="List any secondary diagnoses..."
      />
    </div>
    
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Differential Diagnoses
      </label>
      <textarea
        value={data.clinicalFormulation.diagnosis.differential}
        onChange={(e) => updateData('clinicalFormulation', 'diagnosis', 'differential', e.target.value)}
        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24"
        placeholder="List differential diagnoses to consider..."
      />
    </div>
    
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Patient Strengths
      </label>
      <textarea
        value={data.clinicalFormulation.strengths}
        onChange={(e) => updateData('clinicalFormulation', null, 'strengths', e.target.value)}
        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24"
        placeholder="Identify patient strengths and resources..."
      />
    </div>
    
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Barriers to Treatment
      </label>
      <textarea
        value={data.clinicalFormulation.barriers}
        onChange={(e) => updateData('clinicalFormulation', null, 'barriers', e.target.value)}
        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24"
        placeholder="Identify potential barriers..."
      />
    </div>
    
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Prognosis
      </label>
      <select
        value={data.clinicalFormulation.prognosis}
        onChange={(e) => updateData('clinicalFormulation', null, 'prognosis', e.target.value)}
        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        <option value="">Select prognosis</option>
        <option value="excellent">Excellent</option>
        <option value="good">Good</option>
        <option value="fair">Fair</option>
        <option value="guarded">Guarded</option>
        <option value="poor">Poor</option>
      </select>
    </div>
  </div>
);

const TreatmentPlanStep = ({ data, updateData }) => {
  const treatmentModalities = [
    'Individual Therapy',
    'Group Therapy',
    'Family Therapy',
    'Medication Management',
    'CBT',
    'DBT',
    'EMDR',
    'Mindfulness-Based Therapy',
    'Psychoeducation',
    'Case Management'
  ];
  
  const handleModalityToggle = (modality) => {
    const current = data.treatmentPlan.modalities || [];
    const updated = current.includes(modality)
      ? current.filter(m => m !== modality)
      : [...current, modality];
    updateData('treatmentPlan', null, 'modalities', updated);
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Treatment Plan</h2>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Immediate Interventions
        </label>
        <textarea
          value={data.treatmentPlan.immediateInterventions}
          onChange={(e) => updateData('treatmentPlan', null, 'immediateInterventions', e.target.value)}
          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24"
          placeholder="Actions to be taken immediately..."
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Short-Term Goals (1-3 months)
        </label>
        <textarea
          value={data.treatmentPlan.shortTermGoals}
          onChange={(e) => updateData('treatmentPlan', null, 'shortTermGoals', e.target.value)}
          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24"
          placeholder="List short-term treatment goals..."
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Long-Term Goals (3+ months)
        </label>
        <textarea
          value={data.treatmentPlan.longTermGoals}
          onChange={(e) => updateData('treatmentPlan', null, 'longTermGoals', e.target.value)}
          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24"
          placeholder="List long-term treatment goals..."
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Treatment Modalities
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {treatmentModalities.map((modality) => (
            <label key={modality} className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="checkbox"
                checked={(data.treatmentPlan.modalities || []).includes(modality)}
                onChange={() => handleModalityToggle(modality)}
                className="mr-2"
              />
              <span className="text-sm">{modality}</span>
            </label>
          ))}
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Referrals
        </label>
        <textarea
          value={data.treatmentPlan.referrals ? data.treatmentPlan.referrals.join('\n') : ''}
          onChange={(e) => updateData('treatmentPlan', null, 'referrals', e.target.value.split('\n').filter(r => r))}
          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24"
          placeholder="List any referrals (one per line)..."
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Follow-up Plan
        </label>
        <input
          type="text"
          value={data.treatmentPlan.followUp}
          onChange={(e) => updateData('treatmentPlan', null, 'followUp', e.target.value)}
          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="e.g., Follow-up in 2 weeks"
        />
      </div>
      
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <p className="text-sm text-green-800">
          <i className="fas fa-check-circle mr-2"></i>
          Assessment complete! Please review all sections before submitting.
        </p>
      </div>
    </div>
  );
};

export default ClinicalAssessment;