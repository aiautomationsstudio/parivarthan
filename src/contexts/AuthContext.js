import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext({});

// Demo user accounts for different roles
const DEMO_USERS = [
  {
    email: 'admin@parivarthan.com',
    password: 'admin123',
    role: 'super_admin',
    name: 'Super Admin',
    id: 'SA001'
  },
  {
    email: 'clinic@parivarthan.com',
    password: 'clinic123',
    role: 'clinic_admin',
    name: 'Dr. Rajesh Kumar',
    clinicId: 'CL001',
    id: 'CA001'
  },
  {
    email: 'psychiatrist@parivarthan.com',
    password: 'psych123',
    role: 'psychiatrist',
    name: 'Dr. Priya Sharma',
    specialization: 'Adult Psychiatry',
    clinicId: 'CL001',
    id: 'PS001'
  },
  {
    email: 'psychologist@parivarthan.com',
    password: 'psycho123',
    role: 'psychologist',
    name: 'Dr. Amit Patel',
    specialization: 'Clinical Psychology',
    clinicId: 'CL001',
    id: 'PY001'
  },
  {
    email: 'socialworker@parivarthan.com',
    password: 'social123',
    role: 'social_worker',
    name: 'Ms. Neha Gupta',
    clinicId: 'CL001',
    id: 'SW001'
  },
  {
    email: 'receptionist@parivarthan.com',
    password: 'recep123',
    role: 'receptionist',
    name: 'Rahul Singh',
    clinicId: 'CL001',
    id: 'RC001'
  },
  {
    email: 'nurse@parivarthan.com',
    password: 'nurse123',
    role: 'nursing_staff',
    name: 'Sister Mary Joseph',
    clinicId: 'CL001',
    id: 'NS001'
  },
  {
    email: 'billing@parivarthan.com',
    password: 'billing123',
    role: 'billing_staff',
    name: 'Vivek Mehta',
    clinicId: 'CL001',
    id: 'BS001'
  },
  {
    email: 'patient1@gmail.com',
    password: 'patient123',
    role: 'patient',
    name: 'Arjun Reddy',
    phone: '+91-9876543210',
    id: 'PT001',
    dateOfBirth: '1990-05-15'
  },
  {
    email: 'patient2@gmail.com',
    password: 'patient123',
    role: 'patient',
    name: 'Sneha Iyer',
    phone: '+91-9876543211',
    id: 'PT002',
    dateOfBirth: '1985-08-22'
  }
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if user is already logged in (from localStorage)
    const storedUser = localStorage.getItem('parivarthan_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Error parsing stored user:', e);
        localStorage.removeItem('parivarthan_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    setError(null);
    setLoading(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const foundUser = DEMO_USERS.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (foundUser) {
      const userWithoutPassword = { ...foundUser };
      delete userWithoutPassword.password;
      
      setUser(userWithoutPassword);
      localStorage.setItem('parivarthan_user', JSON.stringify(userWithoutPassword));
      localStorage.setItem('parivarthan_token', 'demo_token_' + foundUser.id);
      setLoading(false);
      return { success: true, user: userWithoutPassword };
    } else {
      setError('Invalid email or password');
      setLoading(false);
      return { success: false, error: 'Invalid email or password' };
    }
  };

  const register = async (userData) => {
    setError(null);
    setLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check if email already exists
    const existingUser = DEMO_USERS.find(u => u.email === userData.email);
    if (existingUser) {
      setError('Email already exists');
      setLoading(false);
      return { success: false, error: 'Email already exists' };
    }

    // Create new user (in real app, this would be an API call)
    const newUser = {
      ...userData,
      role: 'patient',
      id: 'PT' + Date.now(),
    };

    // Add to demo users (in real app, this would be in database)
    DEMO_USERS.push(newUser);

    const userWithoutPassword = { ...newUser };
    delete userWithoutPassword.password;
    
    setUser(userWithoutPassword);
    localStorage.setItem('parivarthan_user', JSON.stringify(userWithoutPassword));
    localStorage.setItem('parivarthan_token', 'demo_token_' + newUser.id);
    setLoading(false);
    
    return { success: true, user: userWithoutPassword };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('parivarthan_user');
    localStorage.removeItem('parivarthan_token');
  };

  const updateUser = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    localStorage.setItem('parivarthan_user', JSON.stringify(updatedUser));
  };

  const hasRole = (requiredRole) => {
    if (!user) return false;
    if (Array.isArray(requiredRole)) {
      return requiredRole.includes(user.role);
    }
    return user.role === requiredRole;
  };

  const getDemoCredentials = () => {
    return DEMO_USERS.map(u => ({
      role: u.role,
      email: u.email,
      password: u.password,
      name: u.name
    }));
  };

  const value = {
    user,
    login,
    register,
    logout,
    updateUser,
    hasRole,
    loading,
    error,
    getDemoCredentials,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
