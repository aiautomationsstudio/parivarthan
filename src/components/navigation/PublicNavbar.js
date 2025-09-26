import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const PublicNavbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const location = useLocation();

  // Navigation links without icons
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

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuOpen && !event.target.closest('.mobile-menu-container')) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [mobileMenuOpen]);

  return (
    <>
      {/* Enhanced Navbar with animations and better height */}
      <nav 
        className={`
          fixed top-0 left-0 right-0 z-50
          bg-white/95 backdrop-blur-md
          transition-all duration-300 ease-in-out
          ${scrolled 
            ? 'shadow-xl py-3' 
            : 'shadow-lg py-5'
          }
        `}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Enhanced Logo with animation - keeping heart icon only in logo */}
            <Link 
              to="/" 
              className="flex items-center space-x-3 group transform transition-transform duration-300 hover:scale-105"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-serene-blue-400 to-growth-green-400 rounded-full blur-md opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative w-12 h-12 bg-gradient-to-r from-serene-blue-500 to-growth-green-500 rounded-full flex items-center justify-center transform transition-all duration-300 group-hover:rotate-12">
                  <i className="fas fa-heart text-white text-lg animate-pulse"></i>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-2xl text-serene-blue-700 tracking-tight">
                  Parivarthan
                </span>
                <span className="text-xs text-gray-500 -mt-1">Transforming Mental Health</span>
              </div>
            </Link>

            {/* Desktop Navigation with enhanced animations - no active background */}
            <div className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link, index) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`
                    relative px-5 py-3 rounded-lg
                    font-semibold text-base tracking-wide
                    transition-all duration-300 ease-out
                    transform hover:-translate-y-0.5
                    ${isActive(link.path)
                      ? 'text-serene-blue-600'
                      : 'text-gray-700 hover:text-serene-blue-500'
                    }
                  `}
                  onMouseEnter={() => setHoveredItem(index)}
                  onMouseLeave={() => setHoveredItem(null)}
                  style={{
                    transitionDelay: `${index * 20}ms`
                  }}
                >
                  {/* Hover Background Only (no active background) */}
                  <div className={`
                    absolute inset-0 rounded-lg
                    transition-all duration-300 ease-out
                    ${hoveredItem === index && !isActive(link.path)
                      ? 'bg-gradient-to-r from-serene-blue-50 to-growth-green-50 opacity-100'
                      : 'opacity-0'
                    }
                  `}></div>
                  
                  {/* Text */}
                  <span className="relative">{link.label}</span>

                  {/* Active Indicator Line (subtle underline for active state) */}
                  <div className={`
                    absolute bottom-1 left-1/2 transform -translate-x-1/2
                    h-0.5 bg-gradient-to-r from-serene-blue-500 to-growth-green-500
                    transition-all duration-300 ease-out
                    ${isActive(link.path) 
                      ? 'w-full opacity-100' 
                      : hoveredItem === index 
                      ? 'w-3/4 opacity-60' 
                      : 'w-0 opacity-0'}
                  `}></div>
                </Link>
              ))}
            </div>

            {/* Enhanced Login/Register Buttons */}
            <div className="hidden lg:flex items-center space-x-3">
              <Link
                to="/auth/login"
                className="
                  relative px-6 py-2.5 
                  text-serene-blue-600 font-semibold
                  border-2 border-serene-blue-200
                  rounded-full
                  overflow-hidden
                  transition-all duration-300
                  hover:border-serene-blue-400
                  hover:shadow-lg
                  group
                "
              >
                <span className="relative z-10">Login</span>
                <div className="absolute inset-0 bg-gradient-to-r from-serene-blue-50 to-white transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
              </Link>
              
              <Link
                to="/auth/register"
                className="
                  relative px-6 py-2.5
                  bg-gradient-to-r from-serene-blue-500 to-growth-green-500
                  text-white font-semibold
                  rounded-full
                  overflow-hidden
                  transform transition-all duration-300
                  hover:scale-105 hover:shadow-xl
                  group
                "
              >
                <span className="relative z-10">Get Started</span>
                <div className="absolute inset-0 bg-gradient-to-r from-serene-blue-600 to-growth-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            </div>

            {/* Mobile Menu Button with animation */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-gray-700 p-2 rounded-lg hover:bg-gray-100 transition-all duration-200"
            >
              <div className="w-6 h-6 relative">
                <span className={`
                  absolute h-0.5 w-full bg-gray-700 rounded-lg transition-all duration-300
                  ${mobileMenuOpen ? 'top-2.5 rotate-45' : 'top-0'}
                `}></span>
                <span className={`
                  absolute top-2.5 h-0.5 w-full bg-gray-700 rounded-lg transition-all duration-300
                  ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}
                `}></span>
                <span className={`
                  absolute h-0.5 w-full bg-gray-700 rounded-lg transition-all duration-300
                  ${mobileMenuOpen ? 'top-2.5 -rotate-45' : 'top-5'}
                `}></span>
              </div>
            </button>
          </div>

          {/* Enhanced Mobile Menu with animations - no active background */}
          <div 
            className={`
              mobile-menu-container
              lg:hidden overflow-hidden
              transition-all duration-500 ease-in-out
              ${mobileMenuOpen 
                ? 'max-h-screen opacity-100 mt-4' 
                : 'max-h-0 opacity-0'
              }
            `}
          >
            <div className="py-4 border-t border-gray-200">
              {navLinks.map((link, index) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`
                    block relative
                    py-3 px-4 mb-1 rounded-lg
                    font-semibold text-base
                    transform transition-all duration-300
                    ${isActive(link.path)
                      ? 'text-serene-blue-600 translate-x-2'
                      : 'text-gray-700 hover:bg-gray-50 hover:translate-x-2'
                    }
                  `}
                  style={{
                    transitionDelay: `${index * 50}ms`,
                    animation: mobileMenuOpen 
                      ? `slideInLeft ${300 + (index * 100)}ms ease-out`
                      : 'none'
                  }}
                >
                  <span>{link.label}</span>
                  {/* Active indicator bar on the left for mobile */}
                  {isActive(link.path) && (
                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-serene-blue-500 to-growth-green-500 rounded-r-full"></div>
                  )}
                </Link>
              ))}
              
              {/* Mobile Auth Buttons */}
              <div className="mt-6 px-4 space-y-3">
                <Link
                  to="/auth/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="
                    block text-center
                    w-full py-3 
                    border-2 border-serene-blue-500
                    text-serene-blue-600 font-semibold
                    rounded-full
                    transition-all duration-300
                    hover:bg-serene-blue-50
                  "
                >
                  Login
                </Link>
                <Link
                  to="/auth/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="
                    block text-center
                    w-full py-3
                    bg-gradient-to-r from-serene-blue-500 to-growth-green-500
                    text-white font-semibold
                    rounded-full
                    transition-all duration-300
                    hover:shadow-lg
                    transform hover:scale-105
                  "
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer to prevent content from going under fixed navbar */}
      <div className={`${scrolled ? 'h-16' : 'h-20'} transition-all duration-300`}></div>

      {/* Add custom keyframe animations */}
      <style jsx>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
};

export default PublicNavbar;