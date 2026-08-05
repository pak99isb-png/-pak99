import React, { useState, useEffect } from 'react';
import { AdminLogin } from './pages/AdminLogin';
import { AdminDashboard } from './pages/AdminDashboard';
import { authAPI } from '../services/api';

export const AdminApp: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminName, setAdminName] = useState('Admin');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if already logged in
    const token = localStorage.getItem('pak99_admin_token');
    if (token) {
      authAPI.getMe()
        .then((admin) => {
          setIsAuthenticated(true);
          setAdminName(admin.name || admin.email);
        })
        .catch(() => {
          localStorage.removeItem('pak99_admin_token');
          setIsAuthenticated(false);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const handleLogin = (_token: string, admin: { id: string; email: string; name: string }) => {
    setIsAuthenticated(true);
    setAdminName(admin.name || admin.email);
  };

  const handleLogout = () => {
    localStorage.removeItem('pak99_admin_token');
    setIsAuthenticated(false);
    setAdminName('Admin');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return <AdminDashboard onLogout={handleLogout} adminName={adminName} />;
};
