import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const features = [
    {
      icon: 'fa-brain',
      title: 'Professional Care',
      description: 'Connect with licensed psychiatrists, psychologists, and counselors',
      link: '/booking/find-provider',
      color: 'bg-serene-blue-500'
    },
    {
      icon: 'fa-clipboard-check',
      title: 'Self-Assessment Tools',
      description: 'Evidence-based screening tools for mental health conditions',
      link: '/self-help',
      color: 'bg-growth-green-500'
    },
    {
      icon: 'fa-video',
      title: 'Telehealth Services',
      description: 'Secure video consultations from the comfort of your home',
      link: '/services',
      color: 'bg-calm-purple-500'
    },
    {
      icon: 'fa-heart',
      title: 'Holistic Approach',
      description: 'Comprehensive care including therapy, medication, and lifestyle support',
      link: '/about',
      color: 'bg-serene-blue-600'
    }
  ];

  const stats = [
    { number: '10,000+', label: 'Patients Helped' },
    { number: '50+', label: 'Expert Providers' },
    { number: '98%', label: 'Satisfaction Rate' },
    { number: '24/7', label: 'Crisis Support' }
  ];

  const testimonials = [
    {
      name: 'Priya S.',
      role: 'Patient',
      content: 'Parivarthan helped me overcome my anxiety. The therapists are compassionate and professional.',
      rating: 5
    },
    {
      name: 'Rahul M.',
      role: 'Patient',
      content: 'The online consultations are convenient and the self-help tools are incredibly useful.',
      rating: 5
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-serene-blue-50 via-white to-growth-green-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Transform Your Mental Health Journey
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Compassionate, professional mental health care tailored to your unique needs.
              Begin your transformation with Parivarthan today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/self-help"
                className="bg-serene-blue-500 hover:bg-serene-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition"
              >
                <i className="fas fa-clipboard-list mr-2"></i>
                Take Free Assessment
              </Link>
              <Link
                to="/booking/find-provider"
                className="bg-white hover:bg-gray-50 text-serene-blue-600 border-2 border-serene-blue-600 px-8 py-4 rounded-lg font-semibold text-lg transition"
              >
                <i className="fas fa-user-md mr-2"></i>
                Find a Provider
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Comprehensive Mental Health Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Link
                key={index}
                to={feature.link}
                className="group hover:transform hover:-translate-y-2 transition-all duration-300"
              >
                <div className="bg-white rounded-xl shadow-lg p-6 h-full border border-gray-100 group-hover:shadow-xl">
                  <div className={`w-16 h-16 ${feature.color} rounded-full flex items-center justify-center text-white mb-4`}>
                    <i className={`fas ${feature.icon} text-2xl`}></i>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Assessment CTA */}
      <section className="py-16 bg-gradient-to-r from-serene-blue-500 to-growth-green-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Not Sure Where to Start?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Take our quick mental health assessment to understand your symptoms and get personalized recommendations.
          </p>
          <Link
            to="/self-help"
            className="inline-flex items-center bg-white text-serene-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Start Free Assessment
            <i className="fas fa-arrow-right ml-2"></i>
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-serene-blue-600 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            What Our Patients Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <i key={i} className="fas fa-star text-yellow-500"></i>
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.content}"</p>
                <div className="font-semibold text-gray-900">{testimonial.name}</div>
                <div className="text-sm text-gray-600">{testimonial.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-serene-blue-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Begin Your Journey?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands who have transformed their mental health with Parivarthan.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/auth/register"
              className="bg-serene-blue-500 hover:bg-serene-blue-600 text-white px-8 py-3 rounded-lg font-semibold transition"
            >
              Get Started Free
            </Link>
            <Link
              to="/contact"
              className="bg-white hover:bg-gray-50 text-serene-blue-600 border border-serene-blue-600 px-8 py-3 rounded-lg font-semibold transition"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
