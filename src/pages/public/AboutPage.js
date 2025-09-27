import React from 'react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  const values = [
    {
      title: 'Compassionate Care',
      description: 'We approach every individual with empathy, understanding, and respect for their unique journey.',
      icon: '❤️'
    },
    {
      title: 'Evidence-Based Treatment',
      description: 'Our therapeutic approaches are grounded in scientific research and proven methodologies.',
      icon: '🔬'
    },
    {
      title: 'Accessibility',
      description: 'Making mental healthcare affordable and accessible to everyone who needs it.',
      icon: '🌍'
    },
    {
      title: 'Privacy & Confidentiality',
      description: 'Your trust is sacred to us. We maintain the highest standards of privacy and confidentiality.',
      icon: '🔒'
    }
  ];

  const team = [
    {
      name: 'Dr. Priya Sharma',
      role: 'Chief Psychiatrist',
      qualification: 'MD Psychiatry, 15+ years experience',
      specialization: 'Depression, Anxiety, PTSD'
    },
    {
      name: 'Dr. Rajesh Kumar',
      role: 'Senior Clinical Psychologist',
      qualification: 'PhD Clinical Psychology, 12+ years experience',
      specialization: 'CBT, Family Therapy, Addiction'
    },
    {
      name: 'Dr. Anita Patel',
      role: 'Child & Adolescent Specialist',
      qualification: 'MD Child Psychiatry, 10+ years experience',
      specialization: 'ADHD, Autism Spectrum, Learning Disorders'
    },
    {
      name: 'Dr. Arjun Mehta',
      role: 'Neuropsychiatrist',
      qualification: 'DM Neuropsychiatry, 8+ years experience',
      specialization: 'Neurocognitive Disorders, Sleep Disorders'
    }
  ];

  const milestones = [
    { year: '2018', event: 'Parivarthan founded with a vision to transform mental healthcare' },
    { year: '2019', event: 'Opened first clinic in Bangalore' },
    { year: '2020', event: 'Launched teletherapy services during pandemic' },
    { year: '2021', event: 'Expanded to 5 cities across India' },
    { year: '2022', event: 'Introduced AI-powered assessment tools' },
    { year: '2023', event: 'Reached 50,000+ patients milestone' },
    { year: '2024', event: 'Launched comprehensive digital mental health platform' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="relative py-12 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              About <span className="text-blue-600">Parivarthan</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Transforming lives through compassionate mental healthcare since 2018
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 md:p-8 rounded-2xl">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                To provide accessible, affordable, and evidence-based mental healthcare to every individual, 
                breaking down barriers and stigma while empowering people to lead fulfilling lives with 
                optimal mental wellness.
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 md:p-8 rounded-2xl">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Our Vision</h2>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                To create a world where mental health is treated with the same importance as physical health, 
                where seeking help is normalized, and where everyone has access to the support they need 
                to thrive emotionally and psychologically.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Story</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
          </div>
          <div className="max-w-4xl mx-auto">
            <p className="text-base md:text-lg text-gray-700 mb-6 leading-relaxed">
              Parivarthan, meaning "transformation" in Sanskrit, was born from a simple yet powerful 
              observation: millions of people in India struggle with mental health issues, yet only a 
              fraction receive the help they need. Founded in 2018 by a team of passionate mental health 
              professionals and technologists, we set out to bridge this gap.
            </p>
            <p className="text-base md:text-lg text-gray-700 mb-6 leading-relaxed">
              What started as a single clinic in Bangalore has grown into a comprehensive mental health 
              ecosystem serving thousands across India. Through the integration of technology, clinical 
              expertise, and a deep understanding of cultural nuances, we've created a platform that 
              makes quality mental healthcare accessible to all.
            </p>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              Today, Parivarthan stands as a beacon of hope for those seeking mental wellness, offering 
              everything from preventive care to specialized treatments, all delivered with compassion 
              and respect for each individual's unique journey.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-base md:text-lg text-gray-600">The principles that guide everything we do</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="text-3xl md:text-4xl mb-4">{value.icon}</div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-sm md:text-base text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Expert Team</h2>
            <p className="text-base md:text-lg text-gray-600">Dedicated professionals committed to your mental wellness</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all hover:-translate-y-1">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 text-center mb-1">{member.name}</h3>
                <p className="text-sm text-blue-600 text-center mb-2">{member.role}</p>
                <p className="text-xs text-gray-600 text-center mb-2">{member.qualification}</p>
                <p className="text-xs text-gray-500 text-center italic">{member.specialization}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-base md:text-lg text-gray-600">Milestones in our mission to transform mental healthcare</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line - hidden on mobile */}
              <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-blue-300"></div>
              
              {milestones.map((milestone, index) => (
                <div key={index} className={`relative flex items-center mb-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8'}`}>
                    <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
                      <span className="text-blue-600 font-bold text-lg">{milestone.year}</span>
                      <p className="text-gray-700 mt-2 text-sm md:text-base">{milestone.event}</p>
                    </div>
                  </div>
                  <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full"></div>
                  <div className="hidden md:block w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Impact</h2>
            <p className="text-base md:text-lg text-gray-600">Making a difference, one life at a time</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-blue-600 mb-2">50,000+</div>
              <p className="text-gray-700">Patients Served</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-green-600 mb-2">95%</div>
              <p className="text-gray-700">Patient Satisfaction</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-purple-600 mb-2">15+</div>
              <p className="text-gray-700">Cities Covered</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-orange-600 mb-2">24/7</div>
              <p className="text-gray-700">Crisis Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Why Choose Parivarthan?</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏥</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Comprehensive Care</h3>
              <p className="text-sm md:text-base text-gray-600">From assessment to treatment, we provide end-to-end mental health services under one roof</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💻</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Digital Innovation</h3>
              <p className="text-sm md:text-base text-gray-600">Cutting-edge technology for assessments, therapy sessions, and progress tracking</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Personalized Approach</h3>
              <p className="text-sm md:text-base text-gray-600">Tailored treatment plans that respect your unique needs and cultural background</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
            Ready to Begin Your Journey to Mental Wellness?
          </h2>
          <p className="text-base md:text-lg text-blue-100 mb-8">
            Take the first step towards a healthier, happier you. Our team is here to support you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/booking/find-provider" 
              className="inline-block bg-white text-blue-600 px-6 md:px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Book Consultation
            </Link>
            <Link 
              to="/self-help" 
              className="inline-block bg-transparent text-white border-2 border-white px-6 md:px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Take Self-Assessment
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 md:gap-8 text-center">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">📍 Visit Us</h3>
              <p className="text-sm md:text-base text-gray-600">
                Multiple locations across India<br />
                Find nearest clinic on our website
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">📞 Call Us</h3>
              <p className="text-sm md:text-base text-gray-600">
                General: 1800-123-4567<br />
                Emergency: 1800-599-0019
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">✉️ Email Us</h3>
              <p className="text-sm md:text-base text-gray-600">
                info@parivarthan.com<br />
                support@parivarthan.com
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;