import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const DepressionScreening = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      id: 1,
      text: "Little interest or pleasure in doing things",
      category: "Interest"
    },
    {
      id: 2,
      text: "Feeling down, depressed, or hopeless",
      category: "Mood"
    },
    {
      id: 3,
      text: "Trouble falling or staying asleep, or sleeping too much",
      category: "Sleep"
    },
    {
      id: 4,
      text: "Feeling tired or having little energy",
      category: "Energy"
    },
    {
      id: 5,
      text: "Poor appetite or overeating",
      category: "Appetite"
    },
    {
      id: 6,
      text: "Feeling bad about yourself — or that you are a failure or have let yourself or your family down",
      category: "Self-worth"
    },
    {
      id: 7,
      text: "Trouble concentrating on things, such as reading the newspaper or watching television",
      category: "Concentration"
    },
    {
      id: 8,
      text: "Moving or speaking so slowly that other people could have noticed? Or the opposite — being so fidgety or restless that you have been moving around a lot more than usual",
      category: "Psychomotor"
    },
    {
      id: 9,
      text: "Thoughts that you would be better off dead or of hurting yourself in some way",
      category: "Suicidal ideation"
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
    if (score >= 20) return { level: "Severe", color: "text-red-600", bg: "bg-red-50", description: "Severe depression" };
    if (score >= 15) return { level: "Moderately Severe", color: "text-orange-600", bg: "bg-orange-50", description: "Moderately severe depression" };
    if (score >= 10) return { level: "Moderate", color: "text-yellow-600", bg: "bg-yellow-50", description: "Moderate depression" };
    if (score >= 5) return { level: "Mild", color: "text-blue-600", bg: "bg-blue-50", description: "Mild depression" };
    return { level: "Minimal", color: "text-green-600", bg: "bg-green-50", description: "Minimal or no depression" };
  };

  const getRecommendations = (score) => {
    if (score >= 20) {
      return [
        "Immediate professional help is strongly recommended",
        "Consider scheduling an appointment with a psychiatrist",
        "Reach out to crisis support if having thoughts of self-harm",
        "Talk to someone you trust about how you're feeling"
      ];
    }
    if (score >= 15) {
      return [
        "Professional treatment is recommended",
        "Consider therapy and/or medication evaluation",
        "Maintain regular sleep schedule",
        "Engage in physical activity daily"
      ];
    }
    if (score >= 10) {
      return [
        "Consider professional counseling or therapy",
        "Practice self-care activities",
        "Maintain social connections",
        "Monitor symptoms and seek help if they worsen"
      ];
    }
    if (score >= 5) {
      return [
        "Consider watchful waiting and re-assessment",
        "Practice stress management techniques",
        "Maintain healthy lifestyle habits",
        "Consider counseling if symptoms persist"
      ];
    }
    return [
      "Continue healthy lifestyle practices",
      "Maintain social connections",
      "Practice preventive self-care",
      "Re-assess if symptoms develop"
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

    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">PHQ-9 Depression Screening Results</h1>
            
            {/* Score Display */}
            <div className={`${severity.bg} rounded-lg p-6 mb-6`}>
              <div className="text-center">
                <div className="text-5xl font-bold mb-2 ${severity.color}">{score}/27</div>
                <div className={`text-2xl font-semibold ${severity.color}`}>{severity.level} Depression</div>
                <p className="text-gray-600 mt-2">{severity.description}</p>
              </div>
            </div>

            {/* Question-by-Question Breakdown */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Responses</h2>
              <div className="space-y-2">
                {questions.map((question, index) => {
                  const answer = answers[index];
                  return (
                    <div key={question.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <span className="text-gray-700 flex-1">{question.text}</span>
                      <span className={`ml-4 px-3 py-1 rounded text-sm font-medium ${
                        answer === 0 ? 'bg-green-100 text-green-800' :
                        answer === 1 ? 'bg-yellow-100 text-yellow-800' :
                        answer === 2 ? 'bg-orange-100 text-orange-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {answerOptions[answer].label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recommendations */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Recommendations</h2>
              <ul className="space-y-2">
                {recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start">
                    <i className="fas fa-check-circle text-serene-blue-600 mt-1 mr-3"></i>
                    <span className="text-gray-700">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Warning for high scores */}
            {(score >= 20 || answers[8] >= 1) && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
                <div className="flex items-start">
                  <i className="fas fa-exclamation-triangle text-red-600 mt-1 mr-3"></i>
                  <div>
                    <h3 className="font-semibold text-red-900 mb-2">Important Notice</h3>
                    <p className="text-red-800 mb-3">
                      Your responses indicate significant distress. Please reach out for professional help immediately.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <a href="tel:1800-599-0019" className="bg-red-600 text-white px-4 py-2 rounded font-semibold hover:bg-red-700 transition">
                        <i className="fas fa-phone mr-2"></i>
                        Crisis Helpline: 1800-599-0019
                      </a>
                      <Link to="/booking/find-provider" className="bg-white text-red-600 border border-red-600 px-4 py-2 rounded font-semibold hover:bg-red-50 transition">
                        Find Professional Help
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={resetAssessment}
                className="bg-serene-blue-500 hover:bg-serene-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition"
              >
                Take Assessment Again
              </button>
              <Link
                to="/booking/find-provider"
                className="bg-growth-green-500 hover:bg-growth-green-600 text-white px-6 py-3 rounded-lg font-semibold transition text-center"
              >
                Connect with a Professional
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
                <strong>Disclaimer:</strong> This screening tool is not a diagnostic instrument. It is designed to be used as a screening tool 
                and to monitor symptom severity. A diagnosis can only be made by a qualified healthcare professional. 
                If you are concerned about your mental health, please consult with a healthcare provider.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">PHQ-9 Depression Screening</h1>
            <p className="text-gray-600">
              Patient Health Questionnaire - 9 Items
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Question {currentQuestion + 1} of {questions.length}</span>
              <span className="text-sm text-gray-600">{Math.round((currentQuestion / questions.length) * 100)}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-serene-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Question */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Over the last 2 weeks, how often have you been bothered by:
            </h2>
            <p className="text-lg text-gray-700 p-4 bg-gray-50 rounded-lg">
              {questions[currentQuestion].text}
            </p>
          </div>

          {/* Answer Options */}
          <div className="space-y-3">
            {answerOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleAnswer(option.value)}
                className={`w-full p-4 rounded-lg border-2 border-gray-200 text-left hover:border-serene-blue-400 transition-all ${option.color}`}
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
        <div className="mt-6 bg-blue-50 rounded-lg p-6">
          <h3 className="font-semibold text-gray-900 mb-2">About PHQ-9</h3>
          <p className="text-gray-700 text-sm">
            The PHQ-9 is a validated screening tool for depression used worldwide by healthcare professionals. 
            It helps identify depression symptoms and their severity, but it is not a diagnostic tool. 
            Professional evaluation is needed for diagnosis and treatment planning.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DepressionScreening;
