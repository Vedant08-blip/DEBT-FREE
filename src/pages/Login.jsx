import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PageWrapper from '../components/layout/PageWrapper';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { toast } from 'react-hot-toast';
import { authAPI } from '../utils/api';

import { motion } from 'framer-motion';
import ParticleCanvas from '../components/ui/ParticleCanvas';

export default function Login() {
  const navigate = useNavigate();
  const [view, setView] = useState('login'); // 'login' | 'forgot'
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [forgotData, setForgotData] = useState({ email: '', dob: '', password: '', confirmPassword: '' });
  
  const [errors, setErrors] = useState({});
  const [forgotErrors, setForgotErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    try {
      const data = await authAPI.login(formData);
      localStorage.setItem('userInfo', JSON.stringify(data));
      setIsLoading(false);
      toast.success('Successfully logged in!');
      navigate('/dashboard');
    } catch (err) {
      setIsLoading(false);
      toast.error(err.message || 'Failed to login');
      setErrors({ server: err.message });
    }
  };

  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!forgotData.email) newErrors.email = 'Email is required';
    if (!forgotData.dob) newErrors.dob = 'Date of birth is required';
    if (!forgotData.password) newErrors.password = 'New password is required';
    if (forgotData.password !== forgotData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(newErrors).length > 0) {
      setForgotErrors(newErrors);
      return;
    }

    setIsLoading(true);
    try {
      const { email, dob, password } = forgotData;
      await authAPI.resetPassword({ email, dob, newPassword: password });
      setIsLoading(false);
      setView('login');
      setForgotData({ email: '', dob: '', password: '', confirmPassword: '' });
      toast.success('Password reset successfully! Please log in.');
    } catch (err) {
      setIsLoading(false);
      toast.error(err.message || 'Password reset failed');
      setForgotErrors({ server: err.message });
    }
  };

  const handleDemoLogin = async () => {
    setIsLoading(true);
    try {
      const data = await authAPI.login({ email: 'demo@example.com', password: 'demo' });
      localStorage.setItem('userInfo', JSON.stringify(data));
      setIsLoading(false);
      toast.success('Successfully entered Demo Mode!');
      navigate('/dashboard');
    } catch {
      setIsLoading(false);
      toast.error('Failed to access demo environment');
    }
  };

  return (
    <PageWrapper isProtected={false}>
      <style>{`
        .glass-card-auth {
          background: rgba(15, 23, 42, 0.6);
          backdrop-filter: blur(24px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 24px 60px rgba(37, 99, 235, 0.1);
        }
      `}</style>
      <div className="relative min-h-[90vh] flex items-center justify-center p-4 overflow-hidden bg-[#020617]">
        <ParticleCanvas color="96,165,250" />
        
        {/* Abstract Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-[60%] -translate-y-[40%] w-[400px] h-[400px] bg-indigo-600/15 rounded-full blur-[100px] pointer-events-none" />

        <motion.div 
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 w-full max-w-md glass-card-auth p-8 sm:p-10 rounded-[2rem]"
        >
          {view === 'login' ? (
            <>
              <div className="text-center mb-10">
                <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Welcome Back</h1>
                <p className="text-slate-400 text-sm">Log in to track your debt-free journey</p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-1 text-left">
                  <label className="text-xs font-semibold text-slate-300 uppercase tracking-widest">Email Address</label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({...formData, email: e.target.value});
                      setErrors({...errors, email: ''});
                    }}
                    className={`w-full bg-slate-900/60 border ${errors.email ? 'border-red-500/50' : 'border-white/10'} rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all`}
                  />
                  {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
                </div>
                
                <div className="space-y-1 text-left">
                  <label className="text-xs font-semibold text-slate-300 uppercase tracking-widest">Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => {
                      setFormData({...formData, password: e.target.value});
                      setErrors({...errors, password: ''});
                    }}
                    className={`w-full bg-slate-900/60 border ${errors.password ? 'border-red-500/50' : 'border-white/10'} rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all`}
                  />
                  {errors.password && <p className="text-xs text-red-400 mt-1">{errors.password}</p>}
                </div>

                <div className="flex items-center justify-between pt-2">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input type="checkbox" className="rounded border-white/20 bg-slate-900/60 text-blue-500 focus:ring-blue-500/50 w-4 h-4 cursor-pointer" />
                    <span className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">Remember me</span>
                  </label>
                  <button 
                    type="button"
                    onClick={() => setView('forgot')}
                    className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors bg-transparent border-0 cursor-pointer"
                  >
                    Forgot password?
                  </button>
                </div>

                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full py-4 mt-4 rounded-xl font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-[0_0_20px_rgba(37,99,235,0.3)] disabled:opacity-50 disabled:pointer-events-none flex justify-center"
                >
                  {isLoading ? (
                    <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    'Access Mission Control'
                  )}
                </button>

                <div className="relative flex py-2 items-center justify-center">
                  <div className="flex-grow border-t border-white/10"></div>
                  <span className="flex-shrink mx-4 text-xs text-slate-500 uppercase tracking-widest">Or</span>
                  <div className="flex-grow border-t border-white/10"></div>
                </div>

                <button 
                  type="button" 
                  onClick={handleDemoLogin}
                  disabled={isLoading}
                  className="w-full py-4 rounded-xl font-bold text-slate-300 bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white transition-all duration-300 active:scale-[0.98] flex justify-center items-center gap-2 disabled:opacity-50 disabled:pointer-events-none"
                >
                  🚀 Explore Demo Mode
                </button>
              </form>

              <div className="mt-8 text-center text-sm text-slate-400">
                Don't have an account?{' '}
                <Link to="/register" className="font-semibold text-blue-400 hover:text-blue-300 transition-colors">
                  Initialize Setup
                </Link>
              </div>
            </>
          ) : (
            <>
              <div className="text-center mb-10">
                <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Reset Password</h1>
                <p className="text-slate-400 text-sm">Enter details and birthdate to secure your account</p>
              </div>

              <form onSubmit={handleForgotSubmit} className="space-y-5">
                <div className="space-y-1 text-left">
                  <label className="text-xs font-semibold text-slate-300 uppercase tracking-widest">Email Address</label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={forgotData.email}
                    onChange={(e) => {
                      setForgotData({...forgotData, email: e.target.value});
                      setForgotErrors({...forgotErrors, email: ''});
                    }}
                    className={`w-full bg-slate-900/60 border ${forgotErrors.email ? 'border-red-500/50' : 'border-white/10'} rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all`}
                  />
                  {forgotErrors.email && <p className="text-xs text-red-400 mt-1">{forgotErrors.email}</p>}
                </div>

                <div className="space-y-1 text-left">
                  <label className="text-xs font-semibold text-slate-300 uppercase tracking-widest">Date of Birth</label>
                  <input
                    type="date"
                    value={forgotData.dob}
                    onChange={(e) => {
                      setForgotData({...forgotData, dob: e.target.value});
                      setForgotErrors({...forgotErrors, dob: ''});
                    }}
                    className={`w-full bg-slate-900/60 border ${forgotErrors.dob ? 'border-red-500/50' : 'border-white/10'} rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all`}
                  />
                  {forgotErrors.dob && <p className="text-xs text-red-400 mt-1">{forgotErrors.dob}</p>}
                </div>

                <div className="space-y-1 text-left">
                  <label className="text-xs font-semibold text-slate-300 uppercase tracking-widest">New Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={forgotData.password}
                    onChange={(e) => {
                      setForgotData({...forgotData, password: e.target.value});
                      setForgotErrors({...forgotErrors, password: ''});
                    }}
                    className={`w-full bg-slate-900/60 border ${forgotErrors.password ? 'border-red-500/50' : 'border-white/10'} rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all`}
                  />
                  {forgotErrors.password && <p className="text-xs text-red-400 mt-1">{forgotErrors.password}</p>}
                </div>

                <div className="space-y-1 text-left">
                  <label className="text-xs font-semibold text-slate-300 uppercase tracking-widest">Confirm Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={forgotData.confirmPassword}
                    onChange={(e) => {
                      setForgotData({...forgotData, confirmPassword: e.target.value});
                      setForgotErrors({...forgotErrors, confirmPassword: ''});
                    }}
                    className={`w-full bg-slate-900/60 border ${forgotErrors.confirmPassword ? 'border-red-500/50' : 'border-white/10'} rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all`}
                  />
                  {forgotErrors.confirmPassword && <p className="text-xs text-red-400 mt-1">{forgotErrors.confirmPassword}</p>}
                </div>

                {forgotErrors.server && <p className="text-xs text-red-400 mt-1">{forgotErrors.server}</p>}

                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full py-4 mt-6 rounded-xl font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-[0_0_20px_rgba(37,99,235,0.3)] disabled:opacity-50 disabled:pointer-events-none flex justify-center"
                >
                  {isLoading ? (
                    <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    'Reset Password'
                  )}
                </button>
              </form>

              <div className="mt-8 text-center text-sm text-slate-400">
                Remembered your credentials?{' '}
                <button 
                  onClick={() => setView('login')}
                  className="font-semibold text-blue-400 hover:text-blue-300 transition-colors bg-transparent border-0 cursor-pointer"
                >
                  Back to Login
                </button>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </PageWrapper>
  );
}
