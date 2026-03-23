import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PageWrapper from '../components/layout/PageWrapper';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { toast } from 'react-hot-toast';

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Successfully logged in!');
      // Assuming a fake auth for now, we just redirect
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <PageWrapper isProtected={false}>
      <div className="min-h-[80vh] flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8 shadow-xl">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-text-primary mb-2">Welcome Back</h1>
            <p className="text-text-muted text-sm">Log in to track your debt-free journey</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Email Address"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) => {
                setFormData({...formData, email: e.target.value});
                setErrors({...errors, email: ''});
              }}
              error={errors.email}
            />
            
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => {
                setFormData({...formData, password: e.target.value});
                setErrors({...errors, password: ''});
              }}
              error={errors.password}
            />

            <div className="flex items-center justify-between">
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

          <div className="mt-6 text-center text-sm text-text-muted">
            Don't have an account?{' '}
            <Link to="/register" className="font-medium text-primary hover:text-secondary">
              Sign up
            </Link>
          </div>
        </Card>
      </div>
    </PageWrapper>
  );
}
