import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-serene-blue-400 to-growth-green-400 rounded-full flex items-center justify-center">
                <i className="fas fa-heart text-white"></i>
              </div>
              <span className="font-bold text-xl">Parivarthan</span>
            </div>
            <p className="text-gray-400 text-sm">
              Comprehensive mental health care platform providing compassionate support and professional treatment.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-facebook text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-instagram text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-linkedin text-xl"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-white">Services</Link></li>
              <li><Link to="/booking/find-provider" className="text-gray-400 hover:text-white">Find Provider</Link></li>
              <li><Link to="/self-help" className="text-gray-400 hover:text-white">Self-Help Tools</Link></li>
              <li><Link to="/faq" className="text-gray-400 hover:text-white">FAQs</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/mental-health-guide" className="text-gray-400 hover:text-white">Mental Health Guide</Link></li>
              <li><Link to="/self-help/cbt-worksheets" className="text-gray-400 hover:text-white">CBT Worksheets</Link></li>
              <li><Link to="/self-help/mindfulness" className="text-gray-400 hover:text-white">Mindfulness Hub</Link></li>
              <li><Link to="/self-help/crisis-support" className="text-gray-400 hover:text-white">Crisis Support</Link></li>
              <li><Link to="/self-help/resources" className="text-gray-400 hover:text-white">Resource Library</Link></li>
            </ul>
          </div>

          {/* Contact & Emergency */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact & Support</h3>
            <div className="space-y-3">
              <div className="flex items-center text-gray-400">
                <i className="fas fa-phone mr-2"></i>
                <span>+91-1234567890</span>
              </div>
              <div className="flex items-center text-gray-400">
                <i className="fas fa-envelope mr-2"></i>
                <span>support@parivarthan.com</span>
              </div>
              <div className="flex items-center text-gray-400">
                <i className="fas fa-map-marker-alt mr-2"></i>
                <span>Kanayannur, Kerala, India</span>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-red-600 rounded-lg">
              <p className="text-sm font-semibold">24/7 Crisis Helpline</p>
              <a href="tel:1800-599-0019" className="text-lg font-bold">
                1800-599-0019
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 Parivarthan. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-gray-400 hover:text-white text-sm">Privacy Policy</Link>
              <Link to="/terms" className="text-gray-400 hover:text-white text-sm">Terms of Service</Link>
              <Link to="/contact" className="text-gray-400 hover:text-white text-sm">Contact Us</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
