import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, Menu, X, ShieldCheck } from 'lucide-react';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import Input from '../ui/Input';
import { toast } from 'react-hot-toast';
import { authAPI } from '../../utils/api';

export default function Navbar() {
  const navigate = useNavigate();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Form States
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [loginErrors, setLoginErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo) {
      setIsAuth(true);
      setIsAdmin(userInfo.isAdmin);
    }
  }, []);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!loginData.email) newErrors.email = 'Email is required';
    if (!loginData.password) newErrors.password = 'Password is required';

    if (Object.keys(newErrors).length > 0) {
      setLoginErrors(newErrors);
      return;
    }

    setIsLoading(true);
    try {
      const data = await authAPI.login(loginData);
      localStorage.setItem('userInfo', JSON.stringify(data));
      setIsLoading(false);
      setIsLoginOpen(false);
      setIsAuth(true);
      toast.success('Successfully logged in!');
      navigate('/dashboard');
    } catch (err) {
      setIsLoading(false);
      toast.error(err.message || 'Failed to login');
      setLoginErrors({ server: err.message });
    }
  };

  const handleSignupSubmit = async (e) => {
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
    try {
      const { name, email, password } = signupData;
      const data = await authAPI.register({ name, email, password });
      localStorage.setItem('userInfo', JSON.stringify(data));
      setIsLoading(false);
      setIsSignupOpen(false);
      setIsAuth(true);
      toast.success('Account created successfully!');
      navigate('/dashboard');
    } catch (err) {
      setIsLoading(false);
      toast.error(err.message || 'Failed to register');
      setSignupErrors({ server: err.message });
    }
  };

  return (
    <>
      <nav className="w-full bg-slate-950/60 backdrop-blur-2xl border-b border-white/5 fixed top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Link to="/" className="flex items-center gap-2">
                <img src="/logo.png" alt="DebtFree" className="w-8 h-8 object-contain" />
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">DebtFree</span>
              </Link>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-6 mr-2">
                <Link to="/about" className="text-sm font-semibold text-text-muted hover:text-text-primary transition-colors">
                  About Us
                </Link>
                <Link to="/contact" className="text-sm font-semibold text-text-muted hover:text-text-primary transition-colors">
                  Contact
                </Link>
                {isAdmin && (
                  <Link to="/admin" className="text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4" /> Admin Panel
                  </Link>
                )}
              </div>
              
              <div className="hidden sm:flex items-center gap-3">
                {isAuth ? (
                  <Link to="/dashboard">
                    <Button size="sm" className="shadow-md shadow-primary/20">Dashboard</Button>
                  </Link>
                ) : (
                  <button onClick={() => setIsLoginOpen(true)}>
                    <Button size="sm" className="shadow-md shadow-primary/20">Log In</Button>
                  </button>
                )}
              </div>

              {/* Mobile Menu Toggle */}
              <button 
                className="md:hidden p-2 text-slate-400 hover:text-white transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-slate-900/95 backdrop-blur-3xl border-b border-white/10 py-6 px-4 space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="flex flex-col gap-4">
              <Link 
                to="/about" 
                className="text-lg font-medium text-slate-300 hover:text-white px-2 py-1"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About Us
              </Link>
              <Link 
                to="/contact" 
                className="text-lg font-medium text-slate-300 hover:text-white px-2 py-1"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="pt-4 flex flex-col gap-3">
                {isAuth ? (
                  <>
                    <Link 
                      to="/dashboard" 
                      className="w-full py-3 rounded-xl border border-white/10 font-bold text-slate-300 bg-white/5 text-center"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    {isAdmin && (
                      <Link 
                        to="/admin" 
                        className="w-full py-3 rounded-xl border border-blue-500/20 font-bold text-blue-400 bg-blue-500/5 text-center"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Admin Panel
                      </Link>
                    )}
                    <Link 
                      to="/profile" 
                      className="w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/20 text-center"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      My Profile
                    </Link>
                  </>
                ) : (
                  <>
                    <button 
                      onClick={() => {
                        setIsLoginOpen(true);
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full py-3 rounded-xl border border-white/10 font-bold text-slate-300 bg-white/5"
                    >
                      Log In
                    </button>
                    <button 
                      onClick={() => {
                        setIsSignupOpen(true);
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/20"
                    >
                      Join DebtFree
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Login Modal */}
      <Modal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)}>
        <div className="bg-gradient-to-br from-primary via-blue-600 to-accent px-8 py-10 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10 mix-blend-overlay"></div>
          <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-accent/20 rounded-full blur-3xl"></div>

          <div className="relative z-10 flex flex-col items-center">
            <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-4 ring-1 ring-white/20 shadow-xl">
              <img src="/logo.png" alt="DebtFree" className="w-10 h-10 object-contain drop-shadow-md" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-white mb-2">Welcome Back</h2>
            <p className="text-blue-100 text-sm font-medium max-w-xs mx-auto">Log in to continue your journey to financial freedom.</p>
          </div>
        </div>

        <div className="px-8 py-8 bg-card border-t border-border">
          <form onSubmit={handleLoginSubmit} className="space-y-5">
            <Input
              label="Email Address"
              type="email"
              icon={Mail}
              placeholder="you@example.com"
              value={loginData.email}
              onChange={(e) => {
                setLoginData({ ...loginData, email: e.target.value });
                setLoginErrors({ ...loginErrors, email: '' });
              }}
              error={loginErrors.email}
            />
            <Input
              label="Password"
              type="password"
              icon={Lock}
              placeholder="••••••••"
              value={loginData.password}
              onChange={(e) => {
                setLoginData({ ...loginData, password: e.target.value });
                setLoginErrors({ ...loginErrors, password: '' });
              }}
              error={loginErrors.password}
            />
            <div className="flex items-center justify-between pb-2">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="rounded text-primary focus:ring-primary w-4 h-4 cursor-pointer" />
                <span className="text-sm text-text-muted group-hover:text-text-primary transition-colors">Remember me</span>
              </label>
              <a href="#" className="text-sm font-medium text-primary hover:text-accent transition-colors">Forgot password?</a>
            </div>
            <Button type="submit" className="w-full h-12 text-base shadow-lg shadow-primary/20 flex items-center justify-center gap-2 group" isLoading={isLoading}>
              Log in to Dashboard
              {!isLoading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
            </Button>
          </form>

          <div className="mt-8 text-center text-sm text-text-muted relative">
            <div className="absolute inset-x-0 top-1/2 h-px bg-border -z-10"></div>
            <span className="bg-card px-4 text-text-muted">Don't have an account?</span>
          </div>
          <div className="mt-6 text-center">
            <button
              type="button"
              className="text-sm font-semibold text-primary hover:text-accent transition-colors"
              onClick={() => {
                setIsLoginOpen(false);
                setIsSignupOpen(true);
              }}
            >
              Create an account
            </button>
          </div>
        </div>
      </Modal>

      {/* Signup Modal */}
      <Modal isOpen={isSignupOpen} onClose={() => setIsSignupOpen(false)}>
        <div className="bg-gradient-to-br from-accent via-emerald-600 to-primary px-8 py-10 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10 mix-blend-overlay"></div>
          <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-primary/20 rounded-full blur-3xl"></div>

          <div className="relative z-10 flex flex-col items-center">
            <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-4 ring-1 ring-white/20 shadow-xl">
              <img src="/logo.png" alt="DebtFree" className="w-10 h-10 object-contain drop-shadow-md" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-white mb-2">Join DebtFree</h2>
            <p className="text-emerald-100 text-sm font-medium max-w-xs mx-auto">Start taking control of your financial future today.</p>
          </div>
        </div>

        <div className="px-8 py-8 bg-card border-t border-border">
          <form onSubmit={handleSignupSubmit} className="space-y-4">
            <Input
              label="Full Name"
              type="text"
              icon={User}
              placeholder="John Doe"
              value={signupData.name}
              onChange={(e) => {
                setSignupData({ ...signupData, name: e.target.value });
                setSignupErrors({ ...signupErrors, name: '' });
              }}
              error={signupErrors.name}
            />
            <Input
              label="Email Address"
              type="email"
              icon={Mail}
              placeholder="you@example.com"
              value={signupData.email}
              onChange={(e) => {
                setSignupData({ ...signupData, email: e.target.value });
                setSignupErrors({ ...signupErrors, email: '' });
              }}
              error={signupErrors.email}
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Password"
                type="password"
                icon={Lock}
                placeholder="••••••••"
                value={signupData.password}
                onChange={(e) => {
                  setSignupData({ ...signupData, password: e.target.value });
                  setSignupErrors({ ...signupErrors, password: '' });
                }}
                error={signupErrors.password}
              />
              <Input
                label="Confirm"
                type="password"
                icon={Lock}
                placeholder="••••••••"
                value={signupData.confirmPassword}
                onChange={(e) => {
                  setSignupData({ ...signupData, confirmPassword: e.target.value });
                  setSignupErrors({ ...signupErrors, confirmPassword: '' });
                }}
                error={signupErrors.confirmPassword}
              />
            </div>

            <Button type="submit" className="w-full h-12 text-base mt-2 shadow-lg shadow-accent/20 flex items-center justify-center gap-2 group" isLoading={isLoading}>
              Create Account
              {!isLoading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
            </Button>
          </form>

          <div className="mt-8 text-center text-sm text-text-muted relative">
            <div className="absolute inset-x-0 top-1/2 h-px bg-border -z-10"></div>
            <span className="bg-card px-4 text-text-muted">Already have an account?</span>
          </div>
          <div className="mt-6 text-center">
            <button
              type="button"
              className="text-sm font-semibold text-accent hover:text-primary transition-colors"
              onClick={() => {
                setIsSignupOpen(false);
                setIsLoginOpen(true);
              }}
            >
              Log in instead
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
