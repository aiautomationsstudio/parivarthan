import React from 'react';
import { Link } from 'react-router-dom';

const SelfAssessmentHub = () => {
  const assessments = [
    {
      id: 1,
      title: 'Depression Screening',
      subtitle: 'PHQ-9 Assessment',
      description: 'Evaluate symptoms of depression with this clinically validated 9-question screening tool.',
      duration: '5-7 minutes',
      icon: 'fa-cloud-rain',
      color: 'bg-blue-500',
      link: '/self-help/depression-screening',
      questions: 9
    },
    {
      id: 2,
      title: 'Anxiety Assessment',
      subtitle: 'GAD-7 Scale',
      description: 'Assess anxiety symptoms using the Generalized Anxiety Disorder 7-item scale.',
      duration: '5 minutes',
      icon: 'fa-heartbeat',
      color: 'bg-purple-500',
      link: '/self-help/anxiety-assessment',
      questions: 7
    },
    {
      id: 3,
      title: 'Stress Level Check',
      subtitle: 'PSS-10 Scale',
      description: 'Measure your perceived stress levels over the past month.',
      duration: '5-7 minutes',
      icon: 'fa-bolt',
      color: 'bg-orange-500',
      link: '/self-help/stress-check',
      questions: 10
    },
    {
      id: 4,
      title: 'Sleep Quality',
      subtitle: 'PSQI Assessment',
      description: 'Evaluate your sleep patterns and identify potential sleep disorders.',
      duration: '10 minutes',
      icon: 'fa-moon',
      color: 'bg-indigo-500',
      link: '/self-help/sleep-assessment',
      questions: 19
    },
    {
      id: 5,
      title: 'ADHD Screening',
      subtitle: 'ASRS-v1.1',
      description: 'Adult ADHD Self-Report Scale for attention deficit hyperactivity disorder.',
      duration: '5-10 minutes',
      icon: 'fa-brain',
      color: 'bg-pink-500',
      link: '/self-help/adhd-screening',
      questions: 18
    },
    {
      id: 6,
      title: 'Substance Use',
      subtitle: 'CAGE-AID',
      description: 'Confidential screening for substance use concerns.',
      duration: '3-5 minutes',
      icon: 'fa-wine-bottle',
      color: 'bg-red-500',
      link: '/self-help/substance-screening',
      questions: 4
    }
  ];

  const tools = [
    {
      title: 'Mood Tracker',
      description: 'Track your daily mood patterns and identify triggers.',
      icon: 'fa-smile',
      color: 'bg-green-500',
      link: '/self-help/mood-tracker'
    },
    {
      title: 'Crisis Support',
      description: 'Immediate help resources and coping strategies.',
      icon: 'fa-life-ring',
      color: 'bg-red-600',
      link: '/self-help/crisis-support'
    },
    {
      title: 'Mindfulness Hub',
      description: 'Guided meditations and relaxation exercises.',
      icon: 'fa-spa',
      color: 'bg-teal-500',
      link: '/self-help/mindfulness'
    },
    {
      title: 'CBT Worksheets',
      description: 'Cognitive behavioral therapy exercises and tools.',
      icon: 'fa-clipboard-check',
      color: 'bg-yellow-500',
      link: '/self-help/cbt-worksheets'
    },
    {
      title: 'Stress Management',
      description: 'Techniques and strategies to manage stress.',
      icon: 'fa-shield-alt',
      color: 'bg-cyan-500',
      link: '/self-help/stress-management'
    },
    {
      title: 'Resource Library',
      description: 'Educational materials and self-help guides.',
      icon: 'fa-book',
      color: 'bg-gray-600',
      link: '/self-help/resources'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-serene-blue-50 to-white py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Self-Assessment & Support Hub
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Take evidence-based mental health assessments and access self-help resources. 
            These tools provide insights but don't replace professional diagnosis.
          </p>
        </div>

        {/* Important Notice */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-12 max-w-4xl mx-auto">
          <div className="flex items-start">
            <i className="fas fa-exclamation-triangle text-yellow-600 mt-1 mr-3"></i>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Important Notice</h3>
              <p className="text-gray-700">
                These screening tools are for informational purposes only and are not diagnostic instruments. 
                They are not a replacement for professional evaluation. If you're experiencing mental health 
                concerns, please consult with a qualified healthcare provider.
              </p>
            </div>
          </div>
        </div>

        {/* Mental Health Assessments Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Clinical Assessments
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {assessments.map((assessment) => (
              <Link
                key={assessment.id}
                to={assessment.link}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                <div className={`${assessment.color} p-4 text-white`}>
                  <div className="flex items-center justify-between">
                    <i className={`fas ${assessment.icon} text-3xl opacity-80`}></i>
                    <span className="text-sm bg-white/20 px-2 py-1 rounded">
                      {assessment.questions} questions
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    {assessment.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-3">{assessment.subtitle}</p>
                  <p className="text-gray-600 mb-4">{assessment.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      <i className="far fa-clock mr-1"></i>
                      {assessment.duration}
                    </span>
                    <span className="text-serene-blue-600 group-hover:translate-x-2 transition-transform">
                      Start →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Self-Help Tools Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Self-Help Tools & Resources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool, index) => (
              <Link
                key={index}
                to={tool.link}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 group"
              >
                <div className={`w-16 h-16 ${tool.color} rounded-full flex items-center justify-center text-white mb-4`}>
                  <i className={`fas ${tool.icon} text-2xl`}></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {tool.title}
                </h3>
                <p className="text-gray-600 mb-4">{tool.description}</p>
                <div className="text-serene-blue-600 group-hover:translate-x-2 transition-transform inline-block">
                  Access Tool →
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            How Self-Assessment Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-serene-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-serene-blue-600">1</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Choose Assessment</h3>
              <p className="text-sm text-gray-600">Select the screening tool that matches your concerns</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-serene-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-serene-blue-600">2</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Answer Questions</h3>
              <p className="text-sm text-gray-600">Complete the assessment honestly and thoughtfully</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-serene-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-serene-blue-600">3</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Get Results</h3>
              <p className="text-sm text-gray-600">Receive your score with interpretation and resources</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-serene-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-serene-blue-600">4</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Take Action</h3>
              <p className="text-sm text-gray-600">Get recommendations and connect with professionals</p>
            </div>
          </div>
        </section>

        {/* Emergency Support Banner */}
        <div className="bg-red-600 text-white rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Need Immediate Help?</h2>
          <p className="mb-6 text-lg">
            If you're experiencing a mental health crisis or having thoughts of self-harm, 
            please reach out for immediate support.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:1800-599-0019"
              className="bg-white text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-red-50 transition"
            >
              <i className="fas fa-phone mr-2"></i>
              Call Crisis Helpline: 1800-599-0019
            </a>
            <Link
              to="/self-help/crisis-support"
              className="bg-red-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-800 transition"
            >
              <i className="fas fa-life-ring mr-2"></i>
              Crisis Resources
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelfAssessmentHub;
