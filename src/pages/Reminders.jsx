import { useState, useEffect } from 'react';
import PageWrapper from '../components/layout/PageWrapper';
import Card from '../components/ui/Card';
import Toggle from '../components/ui/Toggle';
import Button from '../components/ui/Button';
import { loanAPI } from '../utils/api';
import { toast } from 'react-hot-toast';

export default function Reminders() {
  const [loans, setLoans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [globalEnabled, setGlobalEnabled] = useState(true);
  const [channel, setChannel] = useState('both');
  const [daysBefore, setDaysBefore] = useState('3');
  const [loanToggles, setLoanToggles] = useState({});

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const data = await loanAPI.getLoans();
        setLoans(data);
        const initialToggles = data.reduce((acc, loan) => ({ ...acc, [loan._id]: true }), {});
        setLoanToggles(initialToggles);
        setIsLoading(false);
      } catch (err) {
        toast.error(err.message || 'Failed to fetch loans');
        setIsLoading(false);
      }
    };
    fetchLoans();
  }, []);

  const handleSave = () => {
    toast.success('Reminder settings saved successfully!');
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
        <h1 className="text-2xl font-bold text-text-primary">Reminders</h1>
        <p className="text-text-muted mt-1">Never miss an EMI payment. Configure your notifications.</p>
      </div>

      <div className="max-w-3xl space-y-6">
        <Card>
          <div className="flex justify-between items-center mb-6 pb-6 border-b border-border">
            <div>
              <h3 className="text-lg font-semibold text-text-primary">Master Switch</h3>
              <p className="text-sm text-text-muted">Enable or disable all payment reminders.</p>
            </div>
            <Toggle checked={globalEnabled} onChange={setGlobalEnabled} />
          </div>

          <div className={`space-y-6 transition-opacity ${globalEnabled ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Delivery Channel</label>
                <select 
                  value={channel} 
                  onChange={(e) => setChannel(e.target.value)}
                  className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="email">Email Only</option>
                  <option value="sms">SMS Only</option>
                  <option value="both">Email & SMS</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Remind me</label>
                <select 
                  value={daysBefore} 
                  onChange={(e) => setDaysBefore(e.target.value)}
                  className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="1">1 Day before EMI</option>
                  <option value="2">2 Days before EMI</option>
                  <option value="3">3 Days before EMI</option>
                  <option value="5">5 Days before EMI</option>
                  <option value="7">1 Week before EMI</option>
                </select>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-text-primary mb-4">Per Loan Settings</h4>
              <div className="space-y-3">
                {loans.length === 0 ? (
                  <p className="text-sm text-text-muted italic">No loans found. Add loans to set reminders.</p>
                ) : (
                  loans.map(loan => (
                    <div key={loan._id} className="flex justify-between items-center bg-slate-800/50 p-3 rounded-lg border border-border">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold">
                          {loan.emiDate}
                        </div>
                        <div>
                          <p className="font-medium text-text-primary text-sm">{loan.name}</p>
                          <p className="text-xs text-text-muted">EMI: ₹{loan.emiAmount.toLocaleString('en-IN')}</p>
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

          <div className="mt-8 pt-6 border-t border-border flex justify-end">
            <Button onClick={handleSave}>Save Settings</Button>
          </div>
        </Card>
      </div>
    </PageWrapper>
  );
}
