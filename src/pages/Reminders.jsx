import { useState, useEffect } from 'react';
import PageWrapper from '../components/layout/PageWrapper';
import Card from '../components/ui/Card';
import Toggle from '../components/ui/Toggle';
import Button from '../components/ui/Button';
import { loanAPI, authAPI } from '../utils/api';
import { toast } from 'react-hot-toast';

const Reminders = () => {
  const [loans, setLoans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [globalEnabled, setGlobalEnabled] = useState(true);
  const [daysBefore, setDaysBefore] = useState('3');
  const [loanToggles, setLoanToggles] = useState({});
  const [isTesting, setIsTesting] = useState(false);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (userInfo && userInfo.reminderSettings) {
          setGlobalEnabled(userInfo.reminderSettings.globalEnabled);
          setDaysBefore(userInfo.reminderSettings.daysBefore.toString());
        }

        const loanData = await loanAPI.getLoans();
        setLoans(loanData);
        const toggles = loanData.reduce((acc, loan) => ({ 
          ...acc, 
          [loan._id]: loan.isReminderEnabled 
        }), {});
        setLoanToggles(toggles);
        setIsLoading(false);
      } catch (err) {
        toast.error(err.message || 'Failed to load settings');
        setIsLoading(false);
      }
    };
    fetchInitialData();
  }, []);

  const handleSave = async () => {
    try {
      // 1. Save global settings
      const updatedUser = await authAPI.updateReminders({
        globalEnabled,
        daysBefore: Number(daysBefore)
      });
      
      // Update localStorage
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      localStorage.setItem('userInfo', JSON.stringify({
        ...userInfo,
        reminderSettings: updatedUser.reminderSettings
      }));

      // 2. Save individual loan toggles
      const updatePromises = loans.map(loan => {
        if (loan.isReminderEnabled !== loanToggles[loan._id]) {
          return loanAPI.updateLoan(loan._id, { isReminderEnabled: loanToggles[loan._id] });
        }
        return null;
      }).filter(Boolean);

      if (updatePromises.length > 0) {
        await Promise.all(updatePromises);
      }

      toast.success('Reminder settings synced successfully!');
    } catch (err) {
      toast.error(err.message || 'Failed to sync settings');
    }
  };

  const handleTest = async () => {
    setIsTesting(true);
    const toastId = toast.loading('Sending test email...');
    try {
      const res = await authAPI.testReminder();
      toast.success('Live test email sent successfully!', { 
        id: toastId,
        duration: 5000,
        icon: '📩'
      });
    } catch (err) {
      toast.error(err.message || 'Failed to send test notification', { id: toastId });
    } finally {
      setIsTesting(false);
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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Payment Reminders</h1>
          <p className="text-slate-400 mt-1">Configure automated SMS and Email alerts for your EMIs.</p>
        </div>
        <Button 
          onClick={handleTest} 
          disabled={isTesting}
          variant="outline"
          className={`w-full sm:w-auto border-blue-500/30 text-blue-400 hover:bg-blue-500/10 transition-all duration-300 ${isTesting ? 'opacity-70 scale-95' : 'hover:scale-105'}`}
        >
          {isTesting ? (
            <span className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-blue-500/30 border-t-blue-400 rounded-full animate-spin"></div>
              Sending Email...
            </span>
          ) : (
            'Send Test Notification'
          )}
        </Button>
      </div>

      <div className="max-w-3xl space-y-6">
        <Card className="bg-slate-900/40 backdrop-blur-xl border-white/5">
          <div className="flex justify-between items-center mb-6 pb-6 border-b border-white/10">
            <div>
              <h3 className="text-lg font-semibold text-white">Master Switch</h3>
              <p className="text-sm text-slate-400">Enable or disable all payment reminders.</p>
            </div>
            <Toggle checked={globalEnabled} onChange={setGlobalEnabled} />
          </div>

          <div className={`space-y-6 transition-opacity ${globalEnabled ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}>
            <div className="max-w-md">
              <label className="block text-sm font-medium text-slate-300 mb-2">Notification Lead Time</label>
              <select 
                value={daysBefore} 
                onChange={(e) => setDaysBefore(e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-slate-950 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-inner"
              >
                <option value="1">1 Day before EMI</option>
                <option value="2">2 Days before EMI</option>
                <option value="3">3 Days before EMI</option>
                <option value="5">5 Days before EMI</option>
                <option value="7">1 Week before EMI</option>
              </select>
              <p className="text-[10px] text-slate-500 mt-1.5 flex items-center gap-1.5 px-1">
                <span className="w-1 h-1 bg-blue-500 rounded-full animate-pulse"></span>
                Real-time email alerts will be sent to your registered address.
              </p>
            </div>

            <div>
              <h4 className="font-medium text-white mb-4">Targeted Loan Reminders</h4>
              <div className="space-y-3">
                {loans.length === 0 ? (
                  <p className="text-sm text-slate-500 italic">No loans found. Add loans to set specific reminders.</p>
                ) : (
                  loans.map(loan => (
                    <div key={loan._id} className="flex justify-between items-center bg-slate-950/50 p-4 rounded-xl border border-white/5">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-400 font-bold border border-blue-500/20">
                          {loan.emiDate}
                        </div>
                        <div>
                          <p className="font-semibold text-white text-sm">{loan.name}</p>
                          <p className="text-xs text-slate-400">EMI: ₹{loan.emiAmount.toLocaleString('en-IN')}</p>
                        </div>
                      </div>
                      <Toggle 
                        checked={loanToggles[loan._id]} 
                        onChange={(val) => setLoanToggles(prev => ({...prev, [loan._id]: val}))} 
                      />
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 flex justify-end">
            <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-500 shadow-xl shadow-blue-500/20 px-8">
              Save Preferences
            </Button>
          </div>
        </Card>
      </div>
    </PageWrapper>
  );
};

export default Reminders;
