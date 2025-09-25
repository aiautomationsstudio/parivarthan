import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showDemoCredentials, setShowDemoCredentials] = useState(true);

  const { login, getDemoCredentials } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const demoCredentials = getDemoCredentials();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(email, password);
    
    if (result.success) {
      // Navigate based on user role
      const roleRoutes = {
        'super_admin': '/admin',
        'clinic_admin': '/clinic-admin',
        'psychiatrist': '/clinical',
        'psychologist': '/clinical',
        'social_worker': '/clinical',
        'receptionist': '/support',
        'nursing_staff': '/support',
        'billing_staff': '/support',
        'patient': '/patient'
      };
      
      navigate(roleRoutes[result.user.role] || from, { replace: true });
    } else {
      setError(result.error);
      setLoading(false);
    }
  };

  const quickLogin = (demoUser) => {
    setEmail(demoUser.email);
    setPassword(demoUser.password);
  };

  const roleCategories = {
    'Administration': ['super_admin', 'clinic_admin'],
    'Clinical Staff': ['psychiatrist', 'psychologist', 'social_worker'],
    'Support Staff': ['receptionist', 'nursing_staff', 'billing_staff'],
    'Patients': ['patient']
  };

  const getRoleLabel = (role) => {
    const labels = {
      'super_admin': 'Super Admin',
      'clinic_admin': 'Clinic Admin',
      'psychiatrist': 'Psychiatrist',
      'psychologist': 'Psychologist',
      'social_worker': 'Social Worker',
      'receptionist': 'Receptionist',
      'nursing_staff': 'Nursing Staff',
      'billing_staff': 'Billing Staff',
      'patient': 'Patient'
    };
    return labels[role] || role;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-serene-blue-50 to-growth-green-50 flex">
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center space-x-2">
              <div className="w-12 h-12 bg-gradient-to-r from-serene-blue-500 to-growth-green-500 rounded-full flex items-center justify-center">
                <i className="fas fa-heart text-white text-xl"></i>
              </div>
              <span className="font-bold text-2xl text-serene-blue-700">Parivarthan</span>
            </Link>
            <h2 className="mt-6 text-3xl font-bold text-gray-900">Welcome Back</h2>
            <p className="mt-2 text-gray-600">Sign in to access your account</p>
          </div>

          <div className="bg-white shadow-xl rounded-lg p-8">
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg">
                <i className="fas fa-exclamation-circle mr-2"></i>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-serene-blue-500"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-serene-blue-500 pr-10"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  >
                    <i className={`fas fa-${showPassword ? 'eye-slash' : 'eye'}`}></i>
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2 text-serene-blue-600" />
                  <span className="text-sm text-gray-600">Remember me</span>
                </label>
                <Link to="/auth/forgot-password" className="text-sm text-serene-blue-600 hover:underline">
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-serene-blue-500 hover:bg-serene-blue-600 text-white font-medium py-3 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <i className="fas fa-spinner fa-spin mr-2"></i>
                    Signing in...
                  </span>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                New patient?{' '}
                <Link to="/auth/register" className="text-serene-blue-600 font-medium hover:underline">
                  Create an account
                </Link>
              </p>
            </div>
          </div>

          {/* Demo Credentials Section */}
          {showDemoCredentials && (
            <div className="mt-6 bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-800">Demo Credentials</h3>
                <button
                  onClick={() => setShowDemoCredentials(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
              
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {Object.entries(roleCategories).map(([category, roles]) => (
                  <div key={category}>
                    <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">{category}</h4>
                    {demoCredentials
                      .filter(cred => roles.includes(cred.role))
                      .map((cred) => (
                        <button
                          key={cred.email}
                          onClick={() => quickLogin(cred)}
                          className="w-full text-left p-2 hover:bg-gray-50 rounded transition group"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-gray-700">{getRoleLabel(cred.role)}</p>
                              <p className="text-xs text-gray-500">{cred.email} / {cred.password}</p>
                            </div>
                            <i className="fas fa-arrow-right text-gray-400 group-hover:text-serene-blue-500"></i>
                          </div>
                        </button>
                      ))}
                  </div>
                ))}
              </div>
              
              <p className="text-xs text-gray-500 mt-4 text-center">
                Click any credential to auto-fill the login form
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
