import { useState, useEffect, useMemo } from 'react';
import PageWrapper from '../components/layout/PageWrapper';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { authAPI, loanAPI } from '../utils/api';
import { formatCurrency } from '../utils/formatCurrency';
import { 
  User as UserIcon, 
  Lock, 
  Coins, 
  Sparkles, 
  ShieldAlert, 
  Smartphone, 
  Calendar, 
  Mail, 
  Settings, 
  LogOut, 
  Trash2, 
  Award,
  CircleDollarSign,
  TrendingDown
} from 'lucide-react';

const AVATARS = ['🦉', '🦁', '🦊', '🦅', '🚀', '📈', '💰', '🛡️', '💎', '👑'];

export default function Profile() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('personal');
  const [loans, setLoans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Form states
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    dob: '',
    currency: 'INR',
    netMonthlyIncome: 75000,
    savingsGoal: 0,
    selectedAvatar: '🦉'
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });

  // Load user data on mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (userInfo) {
          setProfileData({
            name: userInfo.name || '',
            email: userInfo.email || '',
            phone: userInfo.phone || '',
            dob: userInfo.dob || '',
            currency: userInfo.currency || 'INR',
            netMonthlyIncome: userInfo.netMonthlyIncome !== undefined ? userInfo.netMonthlyIncome : 75000,
            savingsGoal: userInfo.savingsGoal || 0,
            selectedAvatar: userInfo.selectedAvatar || '🦉'
          });
        }
        
        // Fetch active loans to calculate statistics
        const loanData = await loanAPI.getLoans();
        setLoans(loanData);
        setIsLoading(false);
      } catch (err) {
        toast.error(err.message || 'Failed to fetch profile info');
        setIsLoading(false);
      }
    };
    fetchUserData();
  }, []);

  // Compute profile statistics
  const stats = useMemo(() => {
    const totalDebt = loans.reduce((acc, l) => acc + l.outstanding, 0);
    const totalPrincipal = loans.reduce((acc, l) => acc + l.principal, 0);
    const totalPaid = Math.max(0, totalPrincipal - totalDebt);
    const percentPaid = totalPrincipal > 0 ? (totalPaid / totalPrincipal) * 100 : 0;
    
    const achievementsCount = [
      loans.length > 0,
      loans.length > 0 && percentPaid >= 10,
      loans.length > 0 && percentPaid >= 50,
      loans.length > 0 && loans.every(l => l.isReminderEnabled)
    ].filter(Boolean).length;

    return {
      totalDebt,
      achievementsCount,
      percentPaid
    };
  }, [loans]);

  // Update Profile API handler
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const toastId = toast.loading('Syncing profile updates...');
    try {
      const updatedUser = await authAPI.updateProfile({
        name: profileData.name,
        email: profileData.email,
        phone: profileData.phone,
        dob: profileData.dob,
        currency: profileData.currency,
        netMonthlyIncome: Number(profileData.netMonthlyIncome),
        savingsGoal: Number(profileData.savingsGoal),
        selectedAvatar: profileData.selectedAvatar
      });

      // Sync updated user credentials to session storage
      const userInfo = JSON.parse(localStorage.getItem('userInfo')) || {};
      localStorage.setItem('userInfo', JSON.stringify({
        ...userInfo,
        ...updatedUser
      }));

      // Force update currency and income fallbacks
      localStorage.setItem('net_monthly_income', profileData.netMonthlyIncome.toString());

      toast.success('Profile preferences saved!', { id: toastId });
    } catch (err) {
      toast.error(err.message || 'Failed to update profile details', { id: toastId });
    }
  };

  // Change Password API handler
  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      toast.error('New passwords do not match');
      return;
    }

    const toastId = toast.loading('Securing credentials...');
    try {
      await authAPI.changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      });

      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
      });

      toast.success('Password updated successfully!', { id: toastId });
    } catch (err) {
      toast.error(err.message || 'Failed to change password', { id: toastId });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/login');
    toast.success('Logged out successfully');
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Delete account permanently? This action is irreversible and will delete all tracked loans.')) {
      localStorage.clear();
      navigate('/');
      toast.success('Account deleted successfully');
    }
  };

  if (isLoading) {
    return (
      <PageWrapper isProtected={true}>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper isProtected={true}>
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-2">
          <Settings className="w-8 h-8 text-blue-500" /> Account Settings
        </h1>
        <p className="text-slate-400 mt-1 text-sm">Manage preferences, customize financial targets, and secure credentials.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left Column: Glass Profile Summary Card */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="bg-slate-900/40 border-white/5 backdrop-blur-xl flex flex-col items-center text-center p-6">
            
            {/* Avatar Bubble */}
            <div className="relative group">
              <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl group-hover:bg-blue-500/35 transition-all duration-300"></div>
              <div className="w-24 h-24 rounded-full border border-white/15 bg-slate-950 flex items-center justify-center text-5xl relative z-10 select-none shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.15)]">
                {profileData.selectedAvatar}
              </div>
            </div>

            <div className="mt-4">
              <h3 className="text-lg font-bold text-white tracking-tight">{profileData.name}</h3>
              <p className="text-xs text-slate-400 mt-0.5">{profileData.email}</p>
              <div className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-semibold tracking-wide uppercase">
                <Sparkles className="w-3 h-3" /> Debt-Free Pioneer
              </div>
            </div>

            {/* Quick Stats list */}
            <div className="w-full mt-6 pt-6 border-t border-white/10 space-y-4 text-left">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400 flex items-center gap-1.5"><Coins className="w-3.5 h-3.5 text-rose-400" /> Active Debt</span>
                <span className="font-semibold text-white">{formatCurrency(stats.totalDebt, profileData.currency)}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400 flex items-center gap-1.5"><Award className="w-3.5 h-3.5 text-yellow-500" /> Milestones</span>
                <span className="font-semibold text-white">{stats.achievementsCount} Completed</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400 flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-blue-400" /> Tracked Loans</span>
                <span className="font-semibold text-white">{loans.length} Active</span>
              </div>
            </div>
          </Card>

          {/* Quick tab controls */}
          <Card className="p-2 bg-slate-900/40 border-white/5 backdrop-blur-xl flex flex-col gap-1">
            <button
              onClick={() => setActiveTab('personal')}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-all ${
                activeTab === 'personal'
                  ? 'bg-blue-600/20 text-blue-400 border border-blue-500/20'
                  : 'text-slate-400 hover:text-white bg-transparent border border-transparent'
              }`}
            >
              <UserIcon className="w-4 h-4" /> Personal Details
            </button>
            <button
              onClick={() => setActiveTab('financial')}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-all ${
                activeTab === 'financial'
                  ? 'bg-blue-600/20 text-blue-400 border border-blue-500/20'
                  : 'text-slate-400 hover:text-white bg-transparent border border-transparent'
              }`}
            >
              <CircleDollarSign className="w-4 h-4" /> Financial Targets
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-all ${
                activeTab === 'security'
                  ? 'bg-blue-600/20 text-blue-400 border border-blue-500/20'
                  : 'text-slate-400 hover:text-white bg-transparent border border-transparent'
              }`}
            >
              <Lock className="w-4 h-4" /> Security & Password
            </button>
            <button
              onClick={() => setActiveTab('danger')}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-all ${
                activeTab === 'danger'
                  ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                  : 'text-slate-400 hover:text-white bg-transparent border border-transparent'
              }`}
            >
              <ShieldAlert className="w-4 h-4" /> Danger Zone
            </button>
          </Card>
        </div>

        {/* Right Column: Tab Content */}
        <div className="lg:col-span-2">
          
          {/* Tab 1: Personal Details */}
          {activeTab === 'personal' && (
            <Card className="bg-slate-900/40 border-white/5 backdrop-blur-xl">
              <h3 className="text-lg font-semibold text-white mb-2">Personal Details</h3>
              <p className="text-xs text-slate-400 mb-6">Manage name, avatar, and identification settings linked to your account.</p>
              
              <form onSubmit={handleUpdateProfile} className="space-y-6">
                
                {/* Avatar Selection Grid */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">Choose Avatar</label>
                  <div className="grid grid-cols-5 sm:grid-cols-10 gap-2.5">
                    {AVATARS.map((avatar) => (
                      <button
                        key={avatar}
                        type="button"
                        onClick={() => setProfileData({ ...profileData, selectedAvatar: avatar })}
                        className={`w-11 h-11 text-2xl flex items-center justify-center rounded-xl border transition-all duration-300 ${
                          profileData.selectedAvatar === avatar
                            ? 'bg-blue-600/20 border-blue-400/60 shadow-[0_0_12px_rgba(59,130,246,0.3)]'
                            : 'bg-slate-950/40 border-white/5 hover:border-white/20'
                        }`}
                      >
                        {avatar}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input 
                    label="Full Name" 
                    value={profileData.name} 
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })} 
                    icon={UserIcon}
                    required
                  />
                  <Input 
                    label="Phone Number" 
                    value={profileData.phone} 
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })} 
                    icon={Smartphone}
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input 
                    label="Date of Birth" 
                    type="date"
                    value={profileData.dob} 
                    onChange={(e) => setProfileData({ ...profileData, dob: e.target.value })} 
                    icon={Calendar}
                    required
                  />
                  <Input 
                    label="Email Address" 
                    type="email"
                    value={profileData.email} 
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })} 
                    icon={Mail}
                    required
                  />
                </div>

                <div className="pt-4 border-t border-white/5 flex justify-end">
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-500 shadow-xl shadow-blue-500/10">
                    Save Changes
                  </Button>
                </div>
              </form>
            </Card>
          )}

          {/* Tab 2: Financial Settings */}
          {activeTab === 'financial' && (
            <Card className="bg-slate-900/40 border-white/5 backdrop-blur-xl">
              <h3 className="text-lg font-semibold text-white mb-2">Financial Preferences</h3>
              <p className="text-xs text-slate-400 mb-6">Configure base metrics to adjust payoff recommendations and health calculations.</p>
              
              <form onSubmit={handleUpdateProfile} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Currency Unit</label>
                    <select 
                      value={profileData.currency}
                      onChange={(e) => setProfileData({ ...profileData, currency: e.target.value })}
                      className="w-full rounded-xl border border-white/10 bg-slate-950 px-3 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-inner"
                    >
                      <option value="INR">Indian Rupee (₹)</option>
                      <option value="USD">US Dollar ($)</option>
                      <option value="EUR">Euro (€)</option>
                    </select>
                  </div>

                  <Input 
                    label="Net Monthly Income" 
                    type="number"
                    value={profileData.netMonthlyIncome} 
                    onChange={(e) => setProfileData({ ...profileData, netMonthlyIncome: Number(e.target.value) })} 
                    icon={CircleDollarSign}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input 
                    label="Savings Target Goal" 
                    type="number"
                    value={profileData.savingsGoal} 
                    onChange={(e) => setProfileData({ ...profileData, savingsGoal: Number(e.target.value) })} 
                    icon={TrendingDown}
                    placeholder="Enter savings goal (e.g. 50000)"
                  />
                </div>

                <div className="pt-4 border-t border-white/5 flex justify-end">
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-500 shadow-xl shadow-blue-500/10">
                    Save Preferences
                  </Button>
                </div>
              </form>
            </Card>
          )}

          {/* Tab 3: Security & Credentials */}
          {activeTab === 'security' && (
            <Card className="bg-slate-900/40 border-white/5 backdrop-blur-xl">
              <h3 className="text-lg font-semibold text-white mb-2">Change Password</h3>
              <p className="text-xs text-slate-400 mb-6">Secure account access details. Choose a unique password combination.</p>
              
              <form onSubmit={handleChangePassword} className="space-y-6">
                <Input 
                  label="Current Password" 
                  type="password" 
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                  icon={Lock}
                  required
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input 
                    label="New Password" 
                    type="password" 
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                    icon={Lock}
                    required
                  />
                  <Input 
                    label="Confirm New Password" 
                    type="password" 
                    value={passwordData.confirmNewPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, confirmNewPassword: e.target.value })}
                    icon={Lock}
                    required
                  />
                </div>

                <div className="pt-4 border-t border-white/5 flex justify-end">
                  <Button type="submit" className="bg-indigo-600 hover:bg-indigo-500 shadow-xl shadow-indigo-500/10">
                    Update Password
                  </Button>
                </div>
              </form>
            </Card>
          )}

          {/* Tab 4: Danger Zone */}
          {activeTab === 'danger' && (
            <Card className="border-rose-500/20 bg-rose-500/5 backdrop-blur-xl">
              <h3 className="text-lg font-semibold text-rose-400 mb-1 flex items-center gap-2"><ShieldAlert className="w-5 h-5" /> Danger Zone</h3>
              <p className="text-xs text-rose-300/80 mb-6">Actions taken here are immediate. Ensure accuracy before confirming deletion.</p>
              
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-slate-950/40 rounded-2xl border border-rose-500/10 gap-3">
                  <div>
                    <h4 className="text-sm font-semibold text-white flex items-center gap-1.5"><LogOut className="w-4 h-4 text-slate-400" /> Exit Session</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">Safely log out of the dashboard session on this browser.</p>
                  </div>
                  <Button variant="outline" onClick={handleLogout} className="border-white/10 hover:bg-white/5 w-full sm:w-auto">
                    Sign Out
                  </Button>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-rose-500/10 rounded-2xl border border-rose-500/15 gap-3">
                  <div>
                    <h4 className="text-sm font-semibold text-rose-400 flex items-center gap-1.5"><Trash2 className="w-4 h-4" /> Permanent Account Deletion</h4>
                    <p className="text-[11px] text-rose-300/70 mt-0.5">Wipe all user settings, password credentials, and linked loan sheets.</p>
                  </div>
                  <Button variant="danger" onClick={handleDeleteAccount} className="bg-rose-600 hover:bg-rose-500 shadow-lg shadow-rose-500/15 w-full sm:w-auto">
                    Delete Data
                  </Button>
                </div>
              </div>
            </Card>
          )}

        </div>
      </div>
    </PageWrapper>
  );
}
