import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CrisisSupport = () => {
  const [selectedFeeling, setSelectedFeeling] = useState(null);

  const feelings = [
    { id: 'overwhelmed', label: "I'm feeling overwhelmed", icon: 'fa-cloud-rain' },
    { id: 'anxious', label: "I'm having a panic attack", icon: 'fa-heartbeat' },
    { id: 'hopeless', label: "I'm feeling hopeless", icon: 'fa-sad-tear' },
    { id: 'harm', label: "I'm thinking of self-harm", icon: 'fa-exclamation-triangle' },
    { id: 'angry', label: "I'm feeling very angry", icon: 'fa-fire' },
    { id: 'alone', label: "I feel completely alone", icon: 'fa-user' }
  ];

  const helplines = [
    {
      name: "KIRAN Mental Health Helpline",
      number: "1800-599-0019",
      description: "24/7 National Mental Health Helpline",
      languages: "13 languages",
      type: "toll-free"
    },
    {
      name: "Vandrevala Foundation",
      number: "1860-266-2345",
      description: "24x7 Helpline for emotional support",
      languages: "Multiple languages",
      type: "toll-free"
    },
    {
      name: "NIMHANS",
      number: "080-46110007",
      description: "Psychosocial support and mental health services",
      languages: "English, Hindi, Kannada",
      type: "helpline"
    },
    {
      name: "iCALL",
      number: "9152987821",
      description: "Mon-Sat, 10 AM to 8 PM",
      languages: "English, Hindi",
      type: "whatsapp"
    }
  ];

  const copingStrategies = {
    overwhelmed: [
      { title: "STOP Technique", steps: ["Stop what you're doing", "Take a deep breath", "Observe your thoughts", "Proceed mindfully"] },
      { title: "5-4-3-2-1 Grounding", steps: ["5 things you can see", "4 things you can touch", "3 things you can hear", "2 things you can smell", "1 thing you can taste"] },
      { title: "Box Breathing", steps: ["Breathe in for 4 counts", "Hold for 4 counts", "Breathe out for 4 counts", "Hold for 4 counts"] }
    ],
    anxious: [
      { title: "TIPP Technique", steps: ["Temperature - cold water on face", "Intense exercise - 20 jumping jacks", "Paced breathing - exhale longer", "Paired muscle relaxation"] },
      { title: "3-3-3 Rule", steps: ["Name 3 things you see", "Name 3 sounds you hear", "Move 3 parts of your body"] },
      { title: "Progressive Relaxation", steps: ["Tense feet for 5 seconds", "Release and notice relaxation", "Move up through body parts", "End with full body release"] }
    ],
    hopeless: [
      { title: "Opposite Action", steps: ["Acknowledge the feeling", "Do opposite of urge", "Engage in pleasant activity", "Connect with someone"] },
      { title: "Hope Box", steps: ["Look at photos of loved ones", "Read past achievements", "Listen to uplifting music", "Remember good times"] },
      { title: "Future Self", steps: ["Imagine yourself in 1 year", "What would future you say?", "Write a letter from future you", "List reasons to continue"] }
    ],
    harm: [
      { title: "IMMEDIATE Safety", steps: ["Remove harmful objects", "Go to a safe space", "Call someone NOW", "Use ice or rubber band instead"] },
      { title: "Distract & Delay", steps: ["Wait 15 minutes", "Do intense exercise", "Take a cold shower", "Scream into a pillow"] },
      { title: "Express Differently", steps: ["Draw on skin with marker", "Write feelings down", "Tear paper", "Hit a pillow"] }
    ],
    angry: [
      { title: "Cool Down", steps: ["Step away from situation", "Count backwards from 100", "Do intense exercise", "Cold water on wrists"] },
      { title: "Release Safely", steps: ["Punch a pillow", "Scream in private", "Vigorous exercise", "Write and tear up letter"] },
      { title: "Channel Energy", steps: ["Clean vigorously", "Do pushups", "Sprint or run", "Dance intensely"] }
    ],
    alone: [
      { title: "Connect Now", steps: ["Text 3 people 'Hi'", "Call someone", "Join online community", "Video call a friend"] },
      { title: "Self-Compassion", steps: ["Place hand on heart", "Say 'This is hard'", "Say 'I'm not alone'", "Give yourself a hug"] },
      { title: "Engage", steps: ["Go to public space", "Comment online", "Help someone else", "Join support group"] }
    ]
  };

  const safetyPlan = [
    { step: 1, title: "Recognize Warning Signs", description: "What thoughts, feelings, or behaviors signal a crisis?" },
    { step: 2, title: "Use Coping Strategies", description: "What can you do on your own to feel better?" },
    { step: 3, title: "Reach Out to Others", description: "Who can you contact for distraction or support?" },
    { step: 4, title: "Contact Professionals", description: "Which mental health professionals can you call?" },
    { step: 5, title: "Ensure Safety", description: "How can you make your environment safe?" },
    { step: 6, title: "Remember Your Reasons", description: "What are your reasons for living?" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
      {/* Emergency Banner */}
      <div className="bg-red-600 text-white py-4 px-4 sticky top-0 z-50">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-2 md:mb-0">
            <i className="fas fa-phone-alt mr-2 animate-pulse"></i>
            <span className="font-bold">If you're in immediate danger, call emergency services: 112</span>
          </div>
          <a href="tel:1800-599-0019" className="bg-white text-red-600 px-4 py-2 rounded-lg font-bold hover:bg-red-50 transition">
            <i className="fas fa-phone mr-2"></i>
            Crisis Helpline: 1800-599-0019
          </a>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Crisis Support Center</h1>
          <p className="text-xl text-gray-600">You're not alone. Help is available 24/7.</p>
        </div>

        {/* How Are You Feeling Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">What are you experiencing right now?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {feelings.map((feeling) => (
              <button
                key={feeling.id}
                onClick={() => setSelectedFeeling(feeling.id)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedFeeling === feeling.id
                    ? 'bg-red-50 border-red-500 text-red-700'
                    : 'bg-gray-50 border-gray-200 text-gray-700 hover:border-gray-400'
                }`}
              >
                <i className={`fas ${feeling.icon} text-2xl mb-2`}></i>
                <div className="font-medium">{feeling.label}</div>
              </button>
            ))}
          </div>

          {/* Coping Strategies for Selected Feeling */}
          {selectedFeeling && (
            <div className="mt-8 p-6 bg-blue-50 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Immediate Coping Strategies</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {copingStrategies[selectedFeeling]?.map((strategy, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">{strategy.title}</h4>
                    <ol className="space-y-1">
                      {strategy.steps.map((step, stepIndex) => (
                        <li key={stepIndex} className="text-sm text-gray-600 flex items-start">
                          <span className="font-bold text-blue-600 mr-2">{stepIndex + 1}.</span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Crisis Helplines */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            <i className="fas fa-phone-alt text-red-600 mr-3"></i>
            24/7 Crisis Helplines
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {helplines.map((helpline, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg text-gray-900">{helpline.name}</h3>
                  <span className={`text-xs px-2 py-1 rounded ${
                    helpline.type === 'toll-free' ? 'bg-green-100 text-green-700' :
                    helpline.type === 'whatsapp' ? 'bg-blue-100 text-blue-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {helpline.type === 'whatsapp' ? 'WhatsApp' : helpline.type}
                  </span>
                </div>
                <a href={`tel:${helpline.number}`} className="text-2xl font-bold text-red-600 hover:text-red-700 mb-2 inline-block">
                  <i className="fas fa-phone mr-2"></i>
                  {helpline.number}
                </a>
                <p className="text-gray-600 text-sm mb-1">{helpline.description}</p>
                <p className="text-gray-500 text-xs">Languages: {helpline.languages}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Safety Planning */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            <i className="fas fa-shield-alt text-green-600 mr-3"></i>
            Create Your Safety Plan
          </h2>
          <p className="text-gray-600 mb-6">
            A safety plan is a prioritized list of coping strategies and support sources you can use during a crisis.
          </p>
          <div className="space-y-4">
            {safetyPlan.map((item) => (
              <div key={item.step} className="flex items-start">
                <div className="bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">
                  {item.step}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                  <textarea
                    placeholder="Write your plan here..."
                    className="mt-2 w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    rows="2"
                  />
                </div>
              </div>
            ))}
          </div>
          <button className="mt-6 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition">
            <i className="fas fa-download mr-2"></i>
            Download Safety Plan Template
          </button>
        </div>

        {/* Self-Care Reminders */}
        <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Remember: You Matter</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg p-4 text-center">
              <i className="fas fa-heart text-3xl text-pink-500 mb-2"></i>
              <h3 className="font-semibold text-gray-800">You Are Valued</h3>
              <p className="text-sm text-gray-600">Your life has meaning and purpose</p>
            </div>
            <div className="bg-white rounded-lg p-4 text-center">
              <i className="fas fa-sun text-3xl text-yellow-500 mb-2"></i>
              <h3 className="font-semibold text-gray-800">This Will Pass</h3>
              <p className="text-sm text-gray-600">Difficult moments are temporary</p>
            </div>
            <div className="bg-white rounded-lg p-4 text-center">
              <i className="fas fa-hands-helping text-3xl text-blue-500 mb-2"></i>
              <h3 className="font-semibold text-gray-800">Help Is Available</h3>
              <p className="text-sm text-gray-600">You don't have to face this alone</p>
            </div>
            <div className="bg-white rounded-lg p-4 text-center">
              <i className="fas fa-seedling text-3xl text-green-500 mb-2"></i>
              <h3 className="font-semibold text-gray-800">Recovery Is Possible</h3>
              <p className="text-sm text-gray-600">Many people overcome these feelings</p>
            </div>
          </div>
        </div>

        {/* Additional Resources */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Additional Support Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link to="/self-help/mindfulness" className="block p-4 bg-teal-50 rounded-lg hover:bg-teal-100 transition">
              <i className="fas fa-spa text-2xl text-teal-600 mb-2"></i>
              <h3 className="font-semibold text-gray-900">Calming Exercises</h3>
              <p className="text-sm text-gray-600">Guided relaxation and breathing</p>
            </Link>
            <Link to="/booking/find-provider" className="block p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition">
              <i className="fas fa-user-md text-2xl text-blue-600 mb-2"></i>
              <h3 className="font-semibold text-gray-900">Find a Therapist</h3>
              <p className="text-sm text-gray-600">Connect with professionals</p>
            </Link>
            <Link to="/self-help" className="block p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition">
              <i className="fas fa-book text-2xl text-purple-600 mb-2"></i>
              <h3 className="font-semibold text-gray-900">Self-Help Tools</h3>
              <p className="text-sm text-gray-600">Resources for mental wellness</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrisisSupport;
