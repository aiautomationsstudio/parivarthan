import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const HomePage = () => {
  const navigate = useNavigate();
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Key features based on GitHub project structure
  const features = [
    {
      icon: '🧠',
      title: 'AI-Powered Assessments',
      description: 'Evidence-based screening tools including PHQ-9, GAD-7, and specialized assessments for accurate mental health evaluation',
      link: '/self-help',
      color: 'from-serene-blue-400 to-serene-blue-600',
      stats: '15+ Assessment Tools'
    },
    {
      icon: '👨‍⚕️',
      title: 'Expert Mental Health Professionals',
      description: 'Connect with licensed psychiatrists, psychologists, and counselors specialized in various mental health conditions',
      link: '/booking/find-provider',
      color: 'from-growth-green-400 to-growth-green-600',
      stats: '50+ Verified Experts'
    },
    {
      icon: '💬',
      title: 'Telehealth & Online Therapy',
      description: 'Secure video consultations and messaging with end-to-end encryption for convenient care from anywhere',
      link: '/services',
      color: 'from-calm-purple-400 to-calm-purple-600',
      stats: '98% Satisfaction Rate'
    },
    {
      icon: '📊',
      title: 'Progress Tracking & Analytics',
      description: 'Monitor your mental health journey with mood tracking, symptom logs, and personalized progress reports',
      link: '/patient',
      color: 'from-indigo-400 to-indigo-600',
      stats: 'Real-time Insights'
    },
    {
      icon: '🆘',
      title: '24/7 Crisis Support',
      description: 'Immediate access to crisis helpline and emergency resources when you need them most',
      link: '/emergency',
      color: 'from-red-400 to-orange-600',
      stats: 'Always Available'
    },
    {
      icon: '📚',
      title: 'Resource Library',
      description: 'Comprehensive collection of CBT worksheets, mindfulness exercises, and self-help resources',
      link: '/self-help',
      color: 'from-teal-400 to-cyan-600',
      stats: '500+ Resources'
    }
  ];

  // Statistics for social proof
  const stats = [
    { number: '10,000+', label: 'Lives Transformed', icon: '❤️' },
    { number: '50+', label: 'Mental Health Experts', icon: '👥' },
    { number: '98%', label: 'Patient Satisfaction', icon: '⭐' },
    { number: '24/7', label: 'Support Available', icon: '🕐' }
  ];

  // Testimonials for trust building
  const testimonials = [
    {
      name: 'Priya Sharma',
      role: 'Recovered from Depression',
      content: 'Parivarthan gave me hope when I had none. The compassionate care and evidence-based treatment helped me reclaim my life.',
      rating: 5,
      image: '👩'
    },
    {
      name: 'Rahul Verma',
      role: 'Managing Anxiety',
      content: 'The convenience of online consultations and the quality of therapists here is exceptional. I finally feel in control.',
      rating: 5,
      image: '👨'
    },
    {
      name: 'Sneha Iyer',
      role: 'Family Therapy Client',
      content: 'The holistic approach and family therapy sessions helped us heal together. Highly recommend their services.',
      rating: 5,
      image: '👩‍👧'
    }
  ];

  // Mental health conditions we treat
  const conditions = [
    'Depression', 'Anxiety Disorders', 'PTSD', 'OCD', 'Bipolar Disorder',
    'ADHD', 'Eating Disorders', 'Substance Abuse', 'Sleep Disorders', 'Stress Management'
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <div className="min-h-screen bg-white">
    
      {/* Hero Section - Two Columns */}
      <section className="relative bg-gradient-to-br from-serene-blue-50 via-white to-growth-green-50 py-20 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-serene-blue-300 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-growth-green-300 rounded-full filter blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-left"
            >
              <div className="inline-block bg-serene-blue-100 text-serene-blue-700 px-4 py-2 rounded-full mb-6">
                <span className="text-sm font-semibold">🌟 Transform Your Mental Health Journey</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Your Mental Health <span className="text-serene-blue-600">Matters.</span><br />
                Start Your <span className="text-growth-green-600">Transformation</span> Today.
              </h1>
              
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                Experience compassionate, evidence-based mental healthcare tailored to your unique needs. 
                With Parivarthan's comprehensive platform, healing is just a click away.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/self-help')}
                  className="bg-gradient-to-r from-serene-blue-500 to-serene-blue-600 hover:from-serene-blue-600 hover:to-serene-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-xl transition-all duration-300"
                >
                  <span className="mr-2">📋</span>
                  Take Free Assessment
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/booking/find-provider')}
                  className="bg-white hover:bg-gray-50 text-serene-blue-600 border-2 border-serene-blue-600 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300"
                >
                  <span className="mr-2">🔍</span>
                  Find Your Therapist
                </motion.button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <span className="text-green-500 mr-1">✓</span>
                  100% Confidential
                </div>
                <div className="flex items-center">
                  <span className="text-green-500 mr-1">✓</span>
                  Licensed Professionals
                </div>
                <div className="flex items-center">
                  <span className="text-green-500 mr-1">✓</span>
                  Evidence-Based Care
                </div>
              </div>
            </motion.div>

            {/* Right Column - Visual Element */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-white rounded-2xl shadow-2xl p-8">
                {/* Quick Assessment Widget */}
                <div className="bg-gradient-to-r from-serene-blue-50 to-growth-green-50 rounded-xl p-6 mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Mental Health Check</h3>
                  <p className="text-gray-700 mb-4">Answer 3 questions to get personalized recommendations</p>
                  
                  <div className="space-y-3">
                    <button className="w-full bg-white hover:bg-gray-50 p-3 rounded-lg text-left transition-colors duration-200 border border-gray-200">
                      <span className="text-gray-700">How is your mood today?</span>
                    </button>
                    <button className="w-full bg-white hover:bg-gray-50 p-3 rounded-lg text-left transition-colors duration-200 border border-gray-200">
                      <span className="text-gray-700">How well did you sleep?</span>
                    </button>
                    <button className="w-full bg-white hover:bg-gray-50 p-3 rounded-lg text-left transition-colors duration-200 border border-gray-200">
                      <span className="text-gray-700">What's your stress level?</span>
                    </button>
                  </div>
                  
                  <button 
                    onClick={() => navigate('/self-help')}
                    className="w-full bg-serene-blue-600 hover:bg-serene-blue-700 text-white py-3 rounded-lg mt-4 font-semibold transition-colors duration-200"
                  >
                    Start Assessment →
                  </button>
                </div>

                {/* Stats Preview */}
                <div className="grid grid-cols-2 gap-4">
                  {stats.slice(0, 4).map((stat, index) => (
                    <div key={index} className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-2xl mb-1">{stat.icon}</div>
                      <div className="text-xl font-bold text-gray-900">{stat.number}</div>
                      <div className="text-xs text-gray-600">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Parivarthan */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose <span className="text-serene-blue-600">Parivarthan</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We combine cutting-edge technology with compassionate care to provide you with the most comprehensive mental health support system
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="group"
              >
                <Link to={feature.link}>
                  <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden h-full">
                    <div className={`h-2 bg-gradient-to-r ${feature.color}`}></div>
                    <div className="p-6">
                      <div className="text-4xl mb-4">{feature.icon}</div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-serene-blue-600 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 mb-4">{feature.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-semibold text-serene-blue-600">{feature.stats}</span>
                        <span className="text-serene-blue-600 group-hover:translate-x-2 transition-transform duration-200">→</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Conditions We Treat */}
      <section className="py-20 bg-gradient-to-br from-serene-blue-50 to-growth-green-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Mental Health Care
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Our expert team specializes in treating a wide range of mental health conditions with evidence-based approaches
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {conditions.map((condition, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-white px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer hover:bg-serene-blue-50"
              >
                <span className="text-gray-700 font-medium">{condition}</span>
              </motion.span>
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/mental-health-guide"
              className="inline-flex items-center text-serene-blue-600 hover:text-serene-blue-700 font-semibold text-lg"
            >
              Learn more about conditions we treat
              <span className="ml-2">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Your Journey to <span className="text-growth-green-600">Wellness</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Getting started with Parivarthan is simple and straightforward
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '1', title: 'Take Assessment', desc: 'Complete our evidence-based mental health screening', icon: '📋' },
              { step: '2', title: 'Match with Expert', desc: 'Get paired with the right mental health professional', icon: '🔍' },
              { step: '3', title: 'Book Session', desc: 'Schedule online or in-person consultation at your convenience', icon: '📅' },
              { step: '4', title: 'Begin Healing', desc: 'Start your personalized treatment journey', icon: '🌱' }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto bg-gradient-to-br from-serene-blue-100 to-growth-green-100 rounded-full flex items-center justify-center mb-4">
                    <span className="text-3xl">{item.icon}</span>
                  </div>
                  <div className="absolute top-10 left-1/2 transform -translate-x-1/2 -z-10 hidden md:block">
                    {index < 3 && (
                      <div className="w-full h-0.5 bg-gray-300 absolute top-0 left-20"></div>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Step {item.step}: {item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-br from-calm-purple-50 to-serene-blue-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Stories of <span className="text-calm-purple-600">Transformation</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real experiences from people who found hope and healing with Parivarthan
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="relative h-48">
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: activeTestimonial === index ? 1 : 0 }}
                    transition={{ duration: 0.5 }}
                    className={`absolute inset-0 ${activeTestimonial === index ? 'block' : 'hidden'}`}
                  >
                    <div className="text-center">
                      <div className="text-5xl mb-4">{testimonial.image}</div>
                      <p className="text-lg text-gray-700 italic mb-6">"{testimonial.content}"</p>
                      <div className="flex justify-center mb-2">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <span key={i} className="text-yellow-400 text-xl">★</span>
                        ))}
                      </div>
                      <p className="font-semibold text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Testimonial navigation dots */}
              <div className="flex justify-center gap-2 mt-6">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTestimonial(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      activeTestimonial === index 
                        ? 'w-8 bg-serene-blue-600' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-serene-blue-600 to-growth-green-600">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Take the First Step Towards Mental Wellness
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands who have transformed their lives with Parivarthan. 
              Your mental health journey starts with a single click.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/register')}
                className="bg-white hover:bg-gray-100 text-serene-blue-600 px-8 py-4 rounded-xl font-semibold text-lg shadow-xl transition-all duration-300"
              >
                <span className="mr-2">🚀</span>
                Get Started Free
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/services')}
                className="bg-transparent hover:bg-white/10 text-white border-2 border-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300"
              >
                <span className="mr-2">📖</span>
                Learn More
              </motion.button>
            </div>

            <p className="text-white/80 text-sm">
              No credit card required • 100% Confidential • Cancel anytime
            </p>
          </motion.div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 bg-white border-t">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-8">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🔒</span>
              <span className="text-gray-700 font-medium">HIPAA Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">✅</span>
              <span className="text-gray-700 font-medium">ISO Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🏆</span>
              <span className="text-gray-700 font-medium">Award Winning Platform</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🌍</span>
              <span className="text-gray-700 font-medium">Available in 10+ Languages</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;