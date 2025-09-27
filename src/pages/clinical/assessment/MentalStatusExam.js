import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MentalStatusExam = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('appearance');
  const [formData, setFormData] = useState({
    // Patient Information
    patientId: '',
    examDate: new Date().toISOString().split('T')[0],
    examTime: new Date().toTimeString().split(' ')[0].slice(0, 5),
    examiner: '',
    
    // 1. Appearance
    appearance: {
      generalAppearance: '',
      apparentAge: '',
      dress: '',
      grooming: '',
      hygiene: '',
      posture: '',
      eyeContact: '',
      facialExpression: '',
      bodyLanguage: '',
      unusualFeatures: ''
    },
    
    // 2. Behavior/Activity
    behavior: {
      motorActivity: '',
      psychomotorActivity: '',
      gait: '',
      movements: [],
      cooperation: '',
      agitation: '',
      tremors: '',
      tics: '',
      mannerisms: '',
      behaviorNotes: ''
    },
    
    // 3. Speech
    speech: {
      rate: '',
      volume: '',
      tone: '',
      articulation: '',
      fluency: '',
      spontaneity: '',
      latency: '',
      speechContent: '',
      speechNotes: ''
    },
    
    // 4. Mood & Affect
    mood: {
      subjective: '',
      objective: '',
      affect: '',
      affectRange: '',
      affectStability: '',
      affectAppropriate: '',
      affectCongruence: '',
      moodNotes: ''
    },
    
    // 5. Thought Process
    thoughtProcess: {
      organization: '',
      coherence: '',
      goalDirected: '',
      associations: '',
      tangentiality: '',
      circumstantiality: '',
      flightOfIdeas: '',
      thoughtBlocking: '',
      perseveration: '',
      processNotes: ''
    },
    
    // 6. Thought Content
    thoughtContent: {
      delusions: {
        present: false,
        type: [],
        description: ''
      },
      hallucinations: {
        present: false,
        type: [],
        description: ''
      },
      obsessions: '',
      compulsions: '',
      phobias: '',
      suicidalIdeation: {
        present: false,
        plan: false,
        intent: false,
        description: ''
      },
      homicidalIdeation: {
        present: false,
        target: '',
        plan: false,
        description: ''
      },
      contentNotes: ''
    },
    
    // 7. Cognition
    cognition: {
      alertness: '',
      orientation: {
        person: false,
        place: false,
        time: false,
        situation: false
      },
      attention: '',
      concentration: '',
      memory: {
        immediate: '',
        recent: '',
        remote: ''
      },
      intelligence: '',
      abstractThinking: '',
      calculations: '',
      cognitionNotes: ''
    },
    
    // 8. Insight & Judgment
    insightJudgment: {
      insight: '',
      insightLevel: '',
      judgment: '',
      judgmentExamples: '',
      decisionMaking: '',
      insightNotes: ''
    },
    
    // 9. Risk Assessment
    riskAssessment: {
      suicideRisk: '',
      violenceRisk: '',
      selfHarmRisk: '',
      vulnerabilityRisk: '',
      riskFactors: [],
      protectiveFactors: [],
      riskManagementPlan: ''
    },
    
    // Overall Summary
    summary: {
      clinicalImpression: '',
      diagnosticConsideration: '',
      recommendations: '',
      followUpPlan: '',
      additionalNotes: ''
    }
  });

  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  // Navigation sections for tablet-friendly tabs
  const sections = [
    { id: 'appearance', label: 'Appearance', icon: '👤' },
    { id: 'behavior', label: 'Behavior', icon: '🚶' },
    { id: 'speech', label: 'Speech', icon: '💬' },
    { id: 'mood', label: 'Mood & Affect', icon: '😊' },
    { id: 'thoughtProcess', label: 'Thought Process', icon: '🧠' },
    { id: 'thoughtContent', label: 'Thought Content', icon: '💭' },
    { id: 'cognition', label: 'Cognition', icon: '🎯' },
    { id: 'insightJudgment', label: 'Insight', icon: '💡' },
    { id: 'riskAssessment', label: 'Risk', icon: '⚠️' },
    { id: 'summary', label: 'Summary', icon: '📋' }
  ];

  // Handle input changes
  const handleInputChange = (section, field, value, subField = null) => {
    setFormData(prev => {
      if (subField) {
        return {
          ...prev,
          [section]: {
            ...prev[section],
            [field]: {
              ...prev[section][field],
              [subField]: value
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

  // Handle checkbox changes for arrays
  const handleCheckboxChange = (section, field, value, subField = null) => {
    setFormData(prev => {
      const currentValues = subField 
        ? prev[section][field][subField] 
        : prev[section][field];
      
      const newValues = currentValues.includes(value)
        ? currentValues.filter(item => item !== value)
        : [...currentValues, value];
      
      if (subField) {
        return {
          ...prev,
          [section]: {
            ...prev[section],
            [field]: {
              ...prev[section][field],
              [subField]: newValues
            }
          }
        };
      } else {
        return {
          ...prev,
          [section]: {
            ...prev[section],
            [field]: newValues
          }
        };
      }
    });
  };

  // Save form data
  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Here you would typically send the data to your backend
      console.log('Saving MSE data:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert('Mental Status Exam saved successfully!');
    } catch (error) {
      console.error('Error saving MSE:', error);
      alert('Error saving exam. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  // Render Appearance Section
  const renderAppearanceSection = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Appearance & Presentation</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            General Appearance
          </label>
          <select
            value={formData.appearance.generalAppearance}
            onChange={(e) => handleInputChange('appearance', 'generalAppearance', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select...</option>
            <option value="well-groomed">Well-groomed</option>
            <option value="disheveled">Disheveled</option>
            <option value="casual">Casual</option>
            <option value="bizarre">Bizarre</option>
            <option value="appropriate">Appropriate for context</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Apparent Age
          </label>
          <select
            value={formData.appearance.apparentAge}
            onChange={(e) => handleInputChange('appearance', 'apparentAge', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select...</option>
            <option value="younger">Appears younger than stated age</option>
            <option value="consistent">Consistent with stated age</option>
            <option value="older">Appears older than stated age</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Hygiene
          </label>
          <select
            value={formData.appearance.hygiene}
            onChange={(e) => handleInputChange('appearance', 'hygiene', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select...</option>
            <option value="good">Good</option>
            <option value="fair">Fair</option>
            <option value="poor">Poor</option>
            <option value="malodorous">Malodorous</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Eye Contact
          </label>
          <select
            value={formData.appearance.eyeContact}
            onChange={(e) => handleInputChange('appearance', 'eyeContact', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select...</option>
            <option value="appropriate">Appropriate</option>
            <option value="intense">Intense/Staring</option>
            <option value="avoidant">Avoidant</option>
            <option value="minimal">Minimal</option>
            <option value="variable">Variable</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Additional Observations
        </label>
        <textarea
          value={formData.appearance.unusualFeatures}
          onChange={(e) => handleInputChange('appearance', 'unusualFeatures', e.target.value)}
          rows="3"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Note any unusual features, tattoos, scars, or other relevant observations..."
        />
      </div>
    </div>
  );

  // Render Behavior Section
  const renderBehaviorSection = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Behavior & Activity</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Motor Activity
          </label>
          <select
            value={formData.behavior.motorActivity}
            onChange={(e) => handleInputChange('behavior', 'motorActivity', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select...</option>
            <option value="normal">Normal</option>
            <option value="hyperactive">Hyperactive</option>
            <option value="hypoactive">Hypoactive</option>
            <option value="agitated">Agitated</option>
            <option value="retarded">Psychomotor retardation</option>
            <option value="catatonic">Catatonic</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cooperation
          </label>
          <select
            value={formData.behavior.cooperation}
            onChange={(e) => handleInputChange('behavior', 'cooperation', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select...</option>
            <option value="cooperative">Cooperative</option>
            <option value="guarded">Guarded</option>
            <option value="evasive">Evasive</option>
            <option value="hostile">Hostile</option>
            <option value="uncooperative">Uncooperative</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Abnormal Movements (check all that apply)
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {['Tremor', 'Tics', 'Akathisia', 'Dystonia', 'Tardive dyskinesia', 'None observed'].map(movement => (
            <label key={movement} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.behavior.movements.includes(movement)}
                onChange={() => handleCheckboxChange('behavior', 'movements', movement)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm">{movement}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Behavioral Notes
        </label>
        <textarea
          value={formData.behavior.behaviorNotes}
          onChange={(e) => handleInputChange('behavior', 'behaviorNotes', e.target.value)}
          rows="3"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Additional behavioral observations..."
        />
      </div>
    </div>
  );

  // Render Speech Section
  const renderSpeechSection = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Speech Characteristics</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rate
          </label>
          <select
            value={formData.speech.rate}
            onChange={(e) => handleInputChange('speech', 'rate', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select...</option>
            <option value="normal">Normal</option>
            <option value="slow">Slow</option>
            <option value="rapid">Rapid</option>
            <option value="pressured">Pressured</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Volume
          </label>
          <select
            value={formData.speech.volume}
            onChange={(e) => handleInputChange('speech', 'volume', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select...</option>
            <option value="normal">Normal</option>
            <option value="loud">Loud</option>
            <option value="soft">Soft</option>
            <option value="whispered">Whispered</option>
            <option value="variable">Variable</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tone
          </label>
          <select
            value={formData.speech.tone}
            onChange={(e) => handleInputChange('speech', 'tone', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select...</option>
            <option value="normal">Normal</option>
            <option value="monotone">Monotone</option>
            <option value="dramatic">Dramatic</option>
            <option value="childlike">Childlike</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Fluency
          </label>
          <select
            value={formData.speech.fluency}
            onChange={(e) => handleInputChange('speech', 'fluency', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select...</option>
            <option value="fluent">Fluent</option>
            <option value="hesitant">Hesitant</option>
            <option value="stuttering">Stuttering</option>
            <option value="word-finding-difficulty">Word-finding difficulty</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Speech Notes
        </label>
        <textarea
          value={formData.speech.speechNotes}
          onChange={(e) => handleInputChange('speech', 'speechNotes', e.target.value)}
          rows="3"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Additional speech observations..."
        />
      </div>
    </div>
  );

  // Render Mood & Affect Section
  const renderMoodSection = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Mood & Affect</h3>
      
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Subjective Mood (Patient's words)
          </label>
          <input
            type="text"
            value={formData.mood.subjective}
            onChange={(e) => handleInputChange('mood', 'subjective', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="How the patient describes their mood..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Objective Mood (Observed)
            </label>
            <select
              value={formData.mood.objective}
              onChange={(e) => handleInputChange('mood', 'objective', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select...</option>
              <option value="euthymic">Euthymic</option>
              <option value="depressed">Depressed</option>
              <option value="anxious">Anxious</option>
              <option value="irritable">Irritable</option>
              <option value="euphoric">Euphoric</option>
              <option value="dysphoric">Dysphoric</option>
              <option value="labile">Labile</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Affect
            </label>
            <select
              value={formData.mood.affect}
              onChange={(e) => handleInputChange('mood', 'affect', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select...</option>
              <option value="appropriate">Appropriate</option>
              <option value="flat">Flat</option>
              <option value="blunted">Blunted</option>
              <option value="restricted">Restricted</option>
              <option value="labile">Labile</option>
              <option value="expansive">Expansive</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Affect Range
            </label>
            <select
              value={formData.mood.affectRange}
              onChange={(e) => handleInputChange('mood', 'affectRange', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select...</option>
              <option value="full">Full</option>
              <option value="constricted">Constricted</option>
              <option value="restricted">Restricted</option>
              <option value="flat">Flat</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mood-Affect Congruence
            </label>
            <select
              value={formData.mood.affectCongruence}
              onChange={(e) => handleInputChange('mood', 'affectCongruence', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select...</option>
              <option value="congruent">Congruent</option>
              <option value="incongruent">Incongruent</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  // Render Thought Process Section
  const renderThoughtProcessSection = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Thought Process</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Organization
          </label>
          <select
            value={formData.thoughtProcess.organization}
            onChange={(e) => handleInputChange('thoughtProcess', 'organization', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select...</option>
            <option value="organized">Well-organized</option>
            <option value="linear">Linear</option>
            <option value="circumstantial">Circumstantial</option>
            <option value="tangential">Tangential</option>
            <option value="disorganized">Disorganized</option>
            <option value="incoherent">Incoherent</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Goal-Directed
          </label>
          <select
            value={formData.thoughtProcess.goalDirected}
            onChange={(e) => handleInputChange('thoughtProcess', 'goalDirected', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select...</option>
            <option value="yes">Yes</option>
            <option value="mostly">Mostly</option>
            <option value="sometimes">Sometimes</option>
            <option value="no">No</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Associations
          </label>
          <select
            value={formData.thoughtProcess.associations}
            onChange={(e) => handleInputChange('thoughtProcess', 'associations', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select...</option>
            <option value="intact">Intact</option>
            <option value="loose">Loose</option>
            <option value="tight">Tight</option>
            <option value="clang">Clang associations</option>
            <option value="word-salad">Word salad</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Flight of Ideas
          </label>
          <select
            value={formData.thoughtProcess.flightOfIdeas}
            onChange={(e) => handleInputChange('thoughtProcess', 'flightOfIdeas', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select...</option>
            <option value="absent">Absent</option>
            <option value="present">Present</option>
            <option value="mild">Mild</option>
            <option value="severe">Severe</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Process Notes
        </label>
        <textarea
          value={formData.thoughtProcess.processNotes}
          onChange={(e) => handleInputChange('thoughtProcess', 'processNotes', e.target.value)}
          rows="3"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Additional observations about thought process..."
        />
      </div>
    </div>
  );

  // Render Thought Content Section
  const renderThoughtContentSection = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Thought Content</h3>
      
      {/* Delusions */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="mb-3">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={formData.thoughtContent.delusions.present}
              onChange={(e) => handleInputChange('thoughtContent', 'delusions', e.target.checked, 'present')}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">Delusions Present</span>
          </label>
        </div>
        
        {formData.thoughtContent.delusions.present && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-3">
              {['Persecutory', 'Grandiose', 'Reference', 'Control', 'Somatic', 'Jealous'].map(type => (
                <label key={type} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.thoughtContent.delusions.type.includes(type)}
                    onChange={() => handleCheckboxChange('thoughtContent', 'delusions', type, 'type')}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm">{type}</span>
                </label>
              ))}
            </div>
            <textarea
              value={formData.thoughtContent.delusions.description}
              onChange={(e) => handleInputChange('thoughtContent', 'delusions', e.target.value, 'description')}
              rows="2"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Describe delusions..."
            />
          </>
        )}
      </div>

      {/* Hallucinations */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="mb-3">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={formData.thoughtContent.hallucinations.present}
              onChange={(e) => handleInputChange('thoughtContent', 'hallucinations', e.target.checked, 'present')}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">Hallucinations Present</span>
          </label>
        </div>
        
        {formData.thoughtContent.hallucinations.present && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-3">
              {['Auditory', 'Visual', 'Tactile', 'Olfactory', 'Gustatory'].map(type => (
                <label key={type} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.thoughtContent.hallucinations.type.includes(type)}
                    onChange={() => handleCheckboxChange('thoughtContent', 'hallucinations', type, 'type')}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm">{type}</span>
                </label>
              ))}
            </div>
            <textarea
              value={formData.thoughtContent.hallucinations.description}
              onChange={(e) => handleInputChange('thoughtContent', 'hallucinations', e.target.value, 'description')}
              rows="2"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Describe hallucinations..."
            />
          </>
        )}
      </div>

      {/* Suicidal Ideation */}
      <div className="bg-red-50 p-4 rounded-lg border border-red-200">
        <div className="mb-3">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={formData.thoughtContent.suicidalIdeation.present}
              onChange={(e) => handleInputChange('thoughtContent', 'suicidalIdeation', e.target.checked, 'present')}
              className="rounded border-red-300 text-red-600 focus:ring-red-500"
            />
            <span className="text-sm font-medium text-gray-700">Suicidal Ideation Present</span>
          </label>
        </div>
        
        {formData.thoughtContent.suicidalIdeation.present && (
          <div className="space-y-3">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.thoughtContent.suicidalIdeation.plan}
                onChange={(e) => handleInputChange('thoughtContent', 'suicidalIdeation', e.target.checked, 'plan')}
                className="rounded border-red-300 text-red-600 focus:ring-red-500"
              />
              <span className="text-sm">Has plan</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.thoughtContent.suicidalIdeation.intent}
                onChange={(e) => handleInputChange('thoughtContent', 'suicidalIdeation', e.target.checked, 'intent')}
                className="rounded border-red-300 text-red-600 focus:ring-red-500"
              />
              <span className="text-sm">Has intent</span>
            </label>
            <textarea
              value={formData.thoughtContent.suicidalIdeation.description}
              onChange={(e) => handleInputChange('thoughtContent', 'suicidalIdeation', e.target.value, 'description')}
              rows="2"
              className="w-full px-3 py-2 border border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              placeholder="Detail suicidal ideation assessment..."
            />
          </div>
        )}
      </div>
    </div>
  );

  // Render Cognition Section
  const renderCognitionSection = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Cognitive Function</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Level of Consciousness
          </label>
          <select
            value={formData.cognition.alertness}
            onChange={(e) => handleInputChange('cognition', 'alertness', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select...</option>
            <option value="alert">Alert</option>
            <option value="drowsy">Drowsy</option>
            <option value="lethargic">Lethargic</option>
            <option value="stuporous">Stuporous</option>
            <option value="confused">Confused</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Attention/Concentration
          </label>
          <select
            value={formData.cognition.attention}
            onChange={(e) => handleInputChange('cognition', 'attention', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select...</option>
            <option value="intact">Intact</option>
            <option value="good">Good</option>
            <option value="fair">Fair</option>
            <option value="poor">Poor</option>
            <option value="distractible">Easily distractible</option>
          </select>
        </div>
      </div>

      {/* Orientation */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Orientation
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {['person', 'place', 'time', 'situation'].map(orient => (
            <label key={orient} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.cognition.orientation[orient]}
                onChange={(e) => handleInputChange('cognition', 'orientation', e.target.checked, orient)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm capitalize">{orient}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Memory */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Immediate Memory
          </label>
          <select
            value={formData.cognition.memory.immediate}
            onChange={(e) => handleInputChange('cognition', 'memory', e.target.value, 'immediate')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select...</option>
            <option value="intact">Intact</option>
            <option value="impaired">Impaired</option>
            <option value="severely-impaired">Severely impaired</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Recent Memory
          </label>
          <select
            value={formData.cognition.memory.recent}
            onChange={(e) => handleInputChange('cognition', 'memory', e.target.value, 'recent')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select...</option>
            <option value="intact">Intact</option>
            <option value="impaired">Impaired</option>
            <option value="severely-impaired">Severely impaired</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Remote Memory
          </label>
          <select
            value={formData.cognition.memory.remote}
            onChange={(e) => handleInputChange('cognition', 'memory', e.target.value, 'remote')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select...</option>
            <option value="intact">Intact</option>
            <option value="impaired">Impaired</option>
            <option value="severely-impaired">Severely impaired</option>
          </select>
        </div>
      </div>
    </div>
  );

  // Render Insight & Judgment Section
  const renderInsightJudgmentSection = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Insight & Judgment</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Insight Level
          </label>
          <select
            value={formData.insightJudgment.insightLevel}
            onChange={(e) => handleInputChange('insightJudgment', 'insightLevel', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select...</option>
            <option value="good">Good</option>
            <option value="fair">Fair</option>
            <option value="limited">Limited</option>
            <option value="poor">Poor</option>
            <option value="absent">Absent</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Judgment
          </label>
          <select
            value={formData.insightJudgment.judgment}
            onChange={(e) => handleInputChange('insightJudgment', 'judgment', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select...</option>
            <option value="good">Good</option>
            <option value="fair">Fair</option>
            <option value="impaired">Impaired</option>
            <option value="poor">Poor</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Judgment Examples
        </label>
        <textarea
          value={formData.insightJudgment.judgmentExamples}
          onChange={(e) => handleInputChange('insightJudgment', 'judgmentExamples', e.target.value)}
          rows="3"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Provide examples of patient's judgment..."
        />
      </div>
    </div>
  );

  // Render Risk Assessment Section
  const renderRiskAssessmentSection = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Risk Assessment</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Suicide Risk
          </label>
          <select
            value={formData.riskAssessment.suicideRisk}
            onChange={(e) => handleInputChange('riskAssessment', 'suicideRisk', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select...</option>
            <option value="none">None</option>
            <option value="low">Low</option>
            <option value="moderate">Moderate</option>
            <option value="high">High</option>
            <option value="imminent">Imminent</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Violence Risk
          </label>
          <select
            value={formData.riskAssessment.violenceRisk}
            onChange={(e) => handleInputChange('riskAssessment', 'violenceRisk', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select...</option>
            <option value="none">None</option>
            <option value="low">Low</option>
            <option value="moderate">Moderate</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Risk Factors (check all that apply)
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            'Previous attempts',
            'Family history',
            'Substance use',
            'Social isolation',
            'Recent loss',
            'Chronic pain',
            'Access to means',
            'Impulsivity'
          ].map(factor => (
            <label key={factor} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.riskAssessment.riskFactors.includes(factor)}
                onChange={() => handleCheckboxChange('riskAssessment', 'riskFactors', factor)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm">{factor}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Protective Factors (check all that apply)
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            'Family support',
            'Social connections',
            'Religious beliefs',
            'Future orientation',
            'Treatment engagement',
            'Coping skills',
            'Reasons for living',
            'Responsibility to others'
          ].map(factor => (
            <label key={factor} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.riskAssessment.protectiveFactors.includes(factor)}
                onChange={() => handleCheckboxChange('riskAssessment', 'protectiveFactors', factor)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm">{factor}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Risk Management Plan
        </label>
        <textarea
          value={formData.riskAssessment.riskManagementPlan}
          onChange={(e) => handleInputChange('riskAssessment', 'riskManagementPlan', e.target.value)}
          rows="4"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Detail safety plan and risk management strategies..."
        />
      </div>
    </div>
  );

  // Render Summary Section
  const renderSummarySection = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Clinical Summary</h3>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Clinical Impression
        </label>
        <textarea
          value={formData.summary.clinicalImpression}
          onChange={(e) => handleInputChange('summary', 'clinicalImpression', e.target.value)}
          rows="4"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Provide overall clinical impression..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Diagnostic Considerations
        </label>
        <textarea
          value={formData.summary.diagnosticConsideration}
          onChange={(e) => handleInputChange('summary', 'diagnosticConsideration', e.target.value)}
          rows="3"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="List differential diagnoses..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Recommendations
        </label>
        <textarea
          value={formData.summary.recommendations}
          onChange={(e) => handleInputChange('summary', 'recommendations', e.target.value)}
          rows="3"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Treatment recommendations..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Follow-up Plan
        </label>
        <textarea
          value={formData.summary.followUpPlan}
          onChange={(e) => handleInputChange('summary', 'followUpPlan', e.target.value)}
          rows="2"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Next steps and follow-up schedule..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Additional Notes
        </label>
        <textarea
          value={formData.summary.additionalNotes}
          onChange={(e) => handleInputChange('summary', 'additionalNotes', e.target.value)}
          rows="3"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Any other relevant information..."
        />
      </div>
    </div>
  );

  // Main render function
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Mental Status Examination</h1>
              <p className="text-sm text-gray-600 mt-1">Comprehensive psychiatric assessment</p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => navigate(-1)}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                {isSaving ? 'Saving...' : 'Save MSE'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Patient Info Bar */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Patient ID
              </label>
              <input
                type="text"
                value={formData.patientId}
                onChange={(e) => setFormData({...formData, patientId: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter patient ID"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Examination Date
              </label>
              <input
                type="date"
                value={formData.examDate}
                onChange={(e) => setFormData({...formData, examDate: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Time
              </label>
              <input
                type="time"
                value={formData.examTime}
                onChange={(e) => setFormData({...formData, examTime: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Examiner
              </label>
              <input
                type="text"
                value={formData.examiner}
                onChange={(e) => setFormData({...formData, examiner: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Examiner name"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Navigation Sidebar - Tablet Optimized */}
          <div className="lg:w-64">
            <div className="bg-white rounded-lg shadow-sm p-4 sticky top-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">MSE Sections</h3>
              <nav className="space-y-1">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
                      activeSection === section.id
                        ? 'bg-blue-50 text-blue-700 font-medium'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-lg">{section.icon}</span>
                    <span className="text-sm">{section.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              {activeSection === 'appearance' && renderAppearanceSection()}
              {activeSection === 'behavior' && renderBehaviorSection()}
              {activeSection === 'speech' && renderSpeechSection()}
              {activeSection === 'mood' && renderMoodSection()}
              {activeSection === 'thoughtProcess' && renderThoughtProcessSection()}
              {activeSection === 'thoughtContent' && renderThoughtContentSection()}
              {activeSection === 'cognition' && renderCognitionSection()}
              {activeSection === 'insightJudgment' && renderInsightJudgmentSection()}
              {activeSection === 'riskAssessment' && renderRiskAssessmentSection()}
              {activeSection === 'summary' && renderSummarySection()}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-6">
              <button
                onClick={() => {
                  const currentIndex = sections.findIndex(s => s.id === activeSection);
                  if (currentIndex > 0) {
                    setActiveSection(sections[currentIndex - 1].id);
                  }
                }}
                disabled={activeSection === sections[0].id}
                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                ← Previous
              </button>
              
              <button
                onClick={() => {
                  const currentIndex = sections.findIndex(s => s.id === activeSection);
                  if (currentIndex < sections.length - 1) {
                    setActiveSection(sections[currentIndex + 1].id);
                  }
                }}
                disabled={activeSection === sections[sections.length - 1].id}
                className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile/Tablet Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg">
        <div className="flex overflow-x-auto py-2 px-4 space-x-2">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`flex-shrink-0 px-3 py-2 rounded-lg text-sm flex items-center space-x-1 ${
                activeSection === section.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              <span>{section.icon}</span>
              <span>{section.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MentalStatusExam;