import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import Input from '../ui/Input';
import { toast } from 'react-hot-toast';

export default function Navbar() {
  const navigate = useNavigate();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  // Form States
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [loginErrors, setLoginErrors] = useState({});
  const [signupErrors, setSignupErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!loginData.email) newErrors.email = 'Email is required';
    if (!loginData.password) newErrors.password = 'Password is required';
    
    if (Object.keys(newErrors).length > 0) {
      setLoginErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsLoginOpen(false);
      toast.success('Successfully logged in!');
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/dashboard');
    }, 1000);
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!signupData.name) newErrors.name = 'Full name is required';
    if (!signupData.email) newErrors.email = 'Email is required';
    if (!signupData.password) newErrors.password = 'Password is required';
    if (signupData.password !== signupData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setSignupErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSignupOpen(false);
      toast.success('Account created successfully!');
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <>
      <nav className="w-full bg-card/80 backdrop-blur-md border-b border-border fixed top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Link to="/" className="flex items-center gap-2">
                <img src="/logo.png" alt="DebtFree" className="w-8 h-8 object-contain" />
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">DebtFree</span>
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsLoginOpen(true)}
                className="text-sm font-medium text-text-muted hover:text-text-primary transition-colors"
              >
                Log in
              </button>
              <button onClick={() => setIsSignupOpen(true)}>
                <Button size="sm">Get Started</Button>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Login Modal */}
      <Modal 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)}
        title="Welcome Back"
      >
        <p className="text-text-muted text-sm mb-6">Log in to track your debt-free journey</p>
        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <Input
            label="Email Address"
            type="email"
            placeholder="you@example.com"
            value={loginData.email}
            onChange={(e) => {
              setLoginData({...loginData, email: e.target.value});
              setLoginErrors({...loginErrors, email: ''});
            }}
            error={loginErrors.email}
          />
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={loginData.password}
            onChange={(e) => {
              setLoginData({...loginData, password: e.target.value});
              setLoginErrors({...loginErrors, password: ''});
            }}
            error={loginErrors.password}
          />
          <div className="flex items-center justify-between pb-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="rounded text-primary focus:ring-primary w-4 h-4" />
              <span className="text-sm text-text-muted">Remember me</span>
            </label>
            <a href="#" className="text-sm font-medium text-primary hover:text-secondary">Forgot password?</a>
          </div>
          <Button type="submit" className="w-full" isLoading={isLoading}>
            Log in
          </Button>
        </form>
        <div className="mt-4 text-center text-sm text-text-muted">
          Don't have an account?{' '}
          <button 
            type="button"
            className="font-medium text-primary hover:text-secondary"
            onClick={() => {
              setIsLoginOpen(false);
              setIsSignupOpen(true);
            }}
          >
            Sign up
          </button>
        </div>
      </Modal>

      {/* Signup Modal */}
      <Modal 
        isOpen={isSignupOpen} 
        onClose={() => setIsSignupOpen(false)}
        title="Create an Account"
      >
        <p className="text-text-muted text-sm mb-6">Start your journey to financial freedom</p>
        <form onSubmit={handleSignupSubmit} className="space-y-4">
          <Input
            label="Full Name"
            type="text"
            placeholder="John Doe"
            value={signupData.name}
            onChange={(e) => {
              setSignupData({...signupData, name: e.target.value});
              setSignupErrors({...signupErrors, name: ''});
            }}
            error={signupErrors.name}
          />
          <Input
            label="Email Address"
            type="email"
            placeholder="you@example.com"
            value={signupData.email}
            onChange={(e) => {
              setSignupData({...signupData, email: e.target.value});
              setSignupErrors({...signupErrors, email: ''});
            }}
            error={signupErrors.email}
          />
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={signupData.password}
            onChange={(e) => {
              setSignupData({...signupData, password: e.target.value});
              setSignupErrors({...signupErrors, password: ''});
            }}
            error={signupErrors.password}
          />
          <Input
            label="Confirm Password"
            type="password"
            placeholder="••••••••"
            value={signupData.confirmPassword}
            onChange={(e) => {
              setSignupData({...signupData, confirmPassword: e.target.value});
              setSignupErrors({...signupErrors, confirmPassword: ''});
            }}
            error={signupErrors.confirmPassword}
          />
          <Button type="submit" className="w-full mt-2" isLoading={isLoading}>
            Create Account
          </Button>
        </form>
        <div className="mt-4 text-center text-sm text-text-muted">
          Already have an account?{' '}
          <button 
            type="button"
            className="font-medium text-primary hover:text-secondary"
            onClick={() => {
              setIsSignupOpen(false);
              setIsLoginOpen(true);
            }}
          >
            Log in
          </button>
        </div>
      </Modal>
    </>
  );
}
