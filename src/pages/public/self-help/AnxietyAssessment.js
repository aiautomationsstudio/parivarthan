import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AnxietyAssessment = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      id: 1,
      text: "Feeling nervous, anxious, or on edge",
      category: "Nervousness"
    },
    {
      id: 2,
      text: "Not being able to stop or control worrying",
      category: "Worry Control"
    },
    {
      id: 3,
      text: "Worrying too much about different things",
      category: "Excessive Worry"
    },
    {
      id: 4,
      text: "Trouble relaxing",
      category: "Relaxation"
    },
    {
      id: 5,
      text: "Being so restless that it is hard to sit still",
      category: "Restlessness"
    },
    {
      id: 6,
      text: "Becoming easily annoyed or irritable",
      category: "Irritability"
    },
    {
      id: 7,
      text: "Feeling afraid, as if something awful might happen",
      category: "Fear"
    }
  ];

  const answerOptions = [
    { value: 0, label: "Not at all", color: "bg-green-100 hover:bg-green-200" },
    { value: 1, label: "Several days", color: "bg-yellow-100 hover:bg-yellow-200" },
    { value: 2, label: "More than half the days", color: "bg-orange-100 hover:bg-orange-200" },
    { value: 3, label: "Nearly every day", color: "bg-red-100 hover:bg-red-200" }
  ];

  const handleAnswer = (value) => {
    const newAnswers = { ...answers, [currentQuestion]: value };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResults(newAnswers);
    }
  };

  const calculateResults = (allAnswers) => {
    const total = Object.values(allAnswers).reduce((sum, val) => sum + val, 0);
    setShowResults(true);
  };

  const getScore = () => {
    return Object.values(answers).reduce((sum, val) => sum + val, 0);
  };

  const getSeverity = (score) => {
    if (score >= 15) return { 
      level: "Severe", 
      color: "text-red-600", 
      bg: "bg-red-50", 
      description: "Severe anxiety",
      icon: "fa-exclamation-triangle"
    };
    if (score >= 10) return { 
      level: "Moderate", 
      color: "text-orange-600", 
      bg: "bg-orange-50", 
      description: "Moderate anxiety",
      icon: "fa-exclamation-circle"
    };
    if (score >= 5) return { 
      level: "Mild", 
      color: "text-yellow-600", 
      bg: "bg-yellow-50", 
      description: "Mild anxiety",
      icon: "fa-info-circle"
    };
    return { 
      level: "Minimal", 
      color: "text-green-600", 
      bg: "bg-green-50", 
      description: "Minimal anxiety",
      icon: "fa-check-circle"
    };
  };

  const getRecommendations = (score) => {
    if (score >= 15) {
      return {
        primary: [
          "Professional treatment is strongly recommended",
          "Consider both therapy and medication evaluation",
          "Practice daily relaxation techniques",
          "Avoid caffeine and stimulants"
        ],
        techniques: [
          "Deep breathing exercises (4-7-8 technique)",
          "Progressive muscle relaxation",
          "Grounding techniques (5-4-3-2-1 method)",
          "Regular physical exercise"
        ]
      };
    }
    if (score >= 10) {
      return {
        primary: [
          "Professional counseling is recommended",
          "Consider cognitive behavioral therapy (CBT)",
          "Maintain regular sleep schedule",
          "Practice stress management techniques"
        ],
        techniques: [
          "Mindfulness meditation",
          "Journaling your worries",
          "Regular exercise routine",
          "Limit news and social media"
        ]
      };
    }
    if (score >= 5) {
      return {
        primary: [
          "Monitor your symptoms regularly",
          "Practice self-care activities",
          "Consider counseling if symptoms persist",
          "Maintain healthy lifestyle habits"
        ],
        techniques: [
          "Daily relaxation practice",
          "Regular physical activity",
          "Healthy sleep hygiene",
          "Social connection maintenance"
        ]
      };
    }
    return {
      primary: [
        "Continue healthy lifestyle practices",
        "Maintain stress management routines",
        "Stay socially connected",
        "Re-assess if symptoms develop"
      ],
      techniques: [
        "Regular exercise",
        "Balanced nutrition",
        "Adequate sleep",
        "Mindfulness practices"
      ]
    };
  };

  const getAnxietyTips = () => {
    return [
      { icon: "fa-lungs", title: "Breathing", desc: "Practice deep breathing for 5 minutes daily" },
      { icon: "fa-walking", title: "Exercise", desc: "30 minutes of physical activity" },
      { icon: "fa-bed", title: "Sleep", desc: "Maintain 7-9 hours of quality sleep" },
      { icon: "fa-mug-hot", title: "Caffeine", desc: "Limit coffee and energy drinks" }
    ];
  };

  const resetAssessment = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
  };

  if (showResults) {
    const score = getScore();
    const severity = getSeverity(score);
    const recommendations = getRecommendations(score);
    const tips = getAnxietyTips();

    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">GAD-7 Anxiety Assessment Results</h1>
            
            {/* Score Display */}
            <div className={`${severity.bg} rounded-lg p-6 mb-6`}>
              <div className="text-center">
                <i className={`fas ${severity.icon} text-4xl ${severity.color} mb-4`}></i>
                <div className={`text-5xl font-bold mb-2 ${severity.color}`}>{score}/21</div>
                <div className={`text-2xl font-semibold ${severity.color}`}>{severity.level} Anxiety</div>
                <p className="text-gray-600 mt-2">{severity.description}</p>
              </div>
            </div>

            {/* Quick Tips */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {tips.map((tip, index) => (
                <div key={index} className="bg-purple-50 rounded-lg p-4 text-center">
                  <i className={`fas ${tip.icon} text-2xl text-purple-600 mb-2`}></i>
                  <h4 className="font-semibold text-gray-900">{tip.title}</h4>
                  <p className="text-xs text-gray-600 mt-1">{tip.desc}</p>
                </div>
              ))}
            </div>

            {/* Question-by-Question Breakdown */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Responses</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {questions.map((question, index) => {
                  const answer = answers[index];
                  return (
                    <div key={question.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                      <span className="text-sm text-gray-700 flex-1">{question.text}</span>
                      <span className={`ml-2 px-2 py-1 rounded text-xs font-medium whitespace-nowrap ${
                        answer === 0 ? 'bg-green-100 text-green-800' :
                        answer === 1 ? 'bg-yellow-100 text-yellow-800' :
                        answer === 2 ? 'bg-orange-100 text-orange-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {answer} pts
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recommendations */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Recommendations</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Primary Actions</h3>
                  <ul className="space-y-2">
                    {recommendations.primary.map((rec, index) => (
                      <li key={index} className="flex items-start">
                        <i className="fas fa-check-circle text-purple-600 mt-1 mr-2 text-sm"></i>
                        <span className="text-gray-700 text-sm">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Coping Techniques</h3>
                  <ul className="space-y-2">
                    {recommendations.techniques.map((tech, index) => (
                      <li key={index} className="flex items-start">
                        <i className="fas fa-arrow-right text-purple-600 mt-1 mr-2 text-sm"></i>
                        <span className="text-gray-700 text-sm">{tech}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Breathing Exercise Box */}
            <div className="bg-purple-50 rounded-lg p-6 mb-8">
              <h3 className="font-semibold text-gray-900 mb-3">
                <i className="fas fa-lungs mr-2 text-purple-600"></i>
                Quick Breathing Exercise
              </h3>
              <p className="text-gray-700 mb-3">Try this 4-7-8 breathing technique to calm anxiety:</p>
              <ol className="space-y-2 text-gray-700">
                <li className="flex items-center">
                  <span className="bg-purple-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs mr-2">1</span>
                  Exhale completely through your mouth
                </li>
                <li className="flex items-center">
                  <span className="bg-purple-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs mr-2">2</span>
                  Inhale through nose for 4 counts
                </li>
                <li className="flex items-center">
                  <span className="bg-purple-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs mr-2">3</span>
                  Hold breath for 7 counts
                </li>
                <li className="flex items-center">
                  <span className="bg-purple-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs mr-2">4</span>
                  Exhale through mouth for 8 counts
                </li>
              </ol>
              <p className="text-sm text-gray-600 mt-3">Repeat 3-4 times for best results</p>
            </div>

            {/* Warning for high scores */}
            {score >= 15 && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
                <div className="flex items-start">
                  <i className="fas fa-exclamation-triangle text-red-600 mt-1 mr-3"></i>
                  <div>
                    <h3 className="font-semibold text-red-900 mb-2">Important Notice</h3>
                    <p className="text-red-800 mb-3">
                      Your anxiety levels indicate you would benefit from professional support. 
                      Anxiety is treatable, and help is available.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Link to="/booking/find-provider" className="bg-red-600 text-white px-4 py-2 rounded font-semibold hover:bg-red-700 transition text-center">
                        Find a Therapist
                      </Link>
                      <a href="tel:1800-599-0019" className="bg-white text-red-600 border border-red-600 px-4 py-2 rounded font-semibold hover:bg-red-50 transition text-center">
                        <i className="fas fa-phone mr-2"></i>
                        Crisis Support
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={resetAssessment}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition"
              >
                Retake Assessment
              </button>
              <Link
                to="/self-help/mindfulness"
                className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold transition text-center"
              >
                Try Relaxation Exercises
              </Link>
              <Link
                to="/self-help"
                className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 px-6 py-3 rounded-lg font-semibold transition text-center"
              >
                Back to Self-Help Hub
              </Link>
            </div>

            {/* Disclaimer */}
            <div className="mt-8 p-4 bg-gray-50 rounded text-sm text-gray-600">
              <p>
                <strong>Disclaimer:</strong> The GAD-7 is a screening tool for generalized anxiety disorder. 
                It is not a diagnostic instrument. A diagnosis should only be made by a qualified healthcare professional. 
                If you're experiencing significant anxiety, please consult with a mental health provider.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">GAD-7 Anxiety Assessment</h1>
            <p className="text-gray-600">
              Generalized Anxiety Disorder 7-Item Scale
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Question {currentQuestion + 1} of {questions.length}</span>
              <span className="text-sm text-gray-600">{Math.round(((currentQuestion + 1) / questions.length) * 100)}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Question */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Over the last 2 weeks, how often have you been bothered by:
            </h2>
            <p className="text-lg text-gray-700 p-4 bg-purple-50 rounded-lg">
              {questions[currentQuestion].text}
            </p>
          </div>

          {/* Answer Options */}
          <div className="space-y-3">
            {answerOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleAnswer(option.value)}
                className={`w-full p-4 rounded-lg border-2 border-gray-200 text-left hover:border-purple-400 transition-all ${option.color}`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-gray-900 font-medium">{option.label}</span>
                  <span className="text-gray-500 text-sm">{option.value} points</span>
                </div>
              </button>
            ))}
          </div>

          {/* Navigation */}
          <div className="mt-8 flex justify-between items-center">
            {currentQuestion > 0 && (
              <button
                onClick={() => setCurrentQuestion(currentQuestion - 1)}
                className="text-gray-600 hover:text-gray-900 font-medium"
              >
                ← Previous Question
              </button>
            )}
            <Link
              to="/self-help"
              className="text-gray-600 hover:text-gray-900"
            >
              Exit Assessment
            </Link>
          </div>
        </div>

        {/* Information Box */}
        <div className="mt-6 bg-purple-50 rounded-lg p-6">
          <h3 className="font-semibold text-gray-900 mb-2">About GAD-7</h3>
          <p className="text-gray-700 text-sm">
            The GAD-7 is a validated screening tool for generalized anxiety disorder. 
            It's widely used in clinical practice to assess anxiety severity. 
            This tool helps identify anxiety symptoms but does not replace professional evaluation.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AnxietyAssessment;
