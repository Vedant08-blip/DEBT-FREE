import { useState, useEffect } from 'react';
import PageWrapper from '../components/layout/PageWrapper';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: '', email: '', phone: '', currency: 'INR' });

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo) {
      setUser(prev => ({ ...prev, name: userInfo.name, email: userInfo.email }));
    }
  }, []);

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    toast.success('Profile updated successfully!');
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    toast.success('Password changed safely.');
  };

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/login');
    toast.success('Logged out');
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Delete account permanently? This cannot be undone.')) {
      localStorage.clear();
      navigate('/');
    }
  };

  return (
    <PageWrapper isProtected={true}>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-text-primary">Profile settings</h1>
        <p className="text-text-muted mt-1">Manage your account and preferences.</p>
      </div>

      <div className="max-w-3xl space-y-8">
        <Card>
          <h3 className="text-lg font-semibold text-text-primary mb-6">Personal Information</h3>
          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input 
                label="Full Name" 
                value={user.name} 
                onChange={(e) => setUser({...user, name: e.target.value})} 
              />
              <Input 
                label="Phone Number" 
                value={user.phone} 
                onChange={(e) => setUser({...user, phone: e.target.value})} 
              />
            </div>
            
            <div className="w-1/2">
              <label className="block text-sm font-medium text-text-primary mb-1">Currency Preference</label>
              <select 
                value={user.currency}
                onChange={(e) => setUser({...user, currency: e.target.value})}
                className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="INR">Indian Rupee (₹)</option>
                <option value="USD">US Dollar ($)</option>
                <option value="EUR">Euro (€)</option>
              </select>
            </div>

            <div className="pt-4">
              <Button type="submit">Save Profile</Button>
            </div>
          </form>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold text-text-primary mb-6">Change Password</h3>
          <form onSubmit={handleChangePassword} className="space-y-4">
            <Input label="Current Password" type="password" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="New Password" type="password" />
              <Input label="Confirm New Password" type="password" />
            </div>
            <div className="pt-4">
              <Button type="submit" variant="secondary">Update Password</Button>
            </div>
          </form>
        </Card>

        <Card className="border-danger/30 bg-danger/10">
          <h3 className="text-lg font-semibold text-danger mb-2">Danger Zone</h3>
          <p className="text-sm text-text-muted mb-6">
            Once you delete your account, there is no going back. Please be certain.
          </p>
          <div className="flex gap-4">
            <Button variant="outline" onClick={handleLogout}>Log Out</Button>
            <Button variant="danger" onClick={handleDeleteAccount}>Delete Account</Button>
          </div>
        </Card>
      </div>
    </PageWrapper>
  );
}
