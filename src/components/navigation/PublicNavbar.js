import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const PublicNavbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/services', label: 'Services' },
    { path: '/self-help', label: 'Self-Help Tools' },
    { path: '/mental-health-guide', label: 'Resources' },
    { path: '/booking/find-provider', label: 'Find Provider' },
    { path: '/contact', label: 'Contact' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-serene-blue-500 to-growth-green-500 rounded-full flex items-center justify-center">
              <i className="fas fa-heart text-white"></i>
            </div>
            <span className="font-bold text-xl text-serene-blue-700">Parivarthan</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-medium transition-colors ${
                  isActive(link.path)
                    ? 'text-serene-blue-600'
                    : 'text-gray-700 hover:text-serene-blue-600'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Login/Register Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/auth/login"
              className="text-serene-blue-600 hover:text-serene-blue-700 font-medium"
            >
              Login
            </Link>
            <Link
              to="/auth/register"
              className="bg-serene-blue-500 hover:bg-serene-blue-600 text-white px-4 py-2 rounded-lg font-medium transition"
            >
              Register
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-700"
          >
            <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-2 px-4 ${
                  isActive(link.path)
                    ? 'bg-serene-blue-50 text-serene-blue-600 font-medium'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-4 px-4 space-y-2">
              <Link
                to="/auth/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-center py-2 border border-serene-blue-500 text-serene-blue-600 rounded-lg"
              >
                Login
              </Link>
              <Link
                to="/auth/register"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-center py-2 bg-serene-blue-500 text-white rounded-lg"
              >
                Register
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default PublicNavbar;
