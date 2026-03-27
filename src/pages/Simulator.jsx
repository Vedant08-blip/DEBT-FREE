import { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import PageWrapper from '../components/layout/PageWrapper';
import Card from '../components/ui/Card';
import Slider from '../components/ui/Slider';
import BarChart from '../components/charts/BarChart';
import { loanAPI } from '../utils/api';
import { toast } from 'react-hot-toast';

export default function Simulator() {
  const [loans, setLoans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [extraPayment, setExtraPayment] = useState(5000);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const data = await loanAPI.getLoans();
        setLoans(data);
        setIsLoading(false);
      } catch (err) {
        toast.error(err.message || 'Failed to fetch loans');
        setIsLoading(false);
      }
    };
    fetchLoans();
  }, []);

  const simulation = useMemo(() => {
    if (!loans.length) return { currentInterest: 0, newInterest: 0, currentMonths: 0, newMonths: 0 };

    const calculate = (extra) => {
      let totalInterest = 0;
      let months = 0;
      const activeLoans = loans.map(l => ({ ...l, currentBalance: l.outstanding }));
      let totalPrincipal = activeLoans.reduce((acc, l) => acc + l.outstanding, 0);

      while (totalPrincipal > 0 && months < 600) {
        let monthlyExtra = extra;
        activeLoans.forEach(loan => {
          if (loan.currentBalance > 0) {
            const monthlyInterest = (loan.currentBalance * (loan.interest / 100)) / 12;
            totalInterest += monthlyInterest;
            let payment = Math.min(loan.emiAmount, loan.currentBalance + monthlyInterest);
            loan.currentBalance -= (payment - monthlyInterest);
          }
        });

        const priorityLoan = activeLoans.find(l => l.currentBalance > 0);
        if (priorityLoan && monthlyExtra > 0) {
          const extraToApply = Math.min(monthlyExtra, priorityLoan.currentBalance);
          priorityLoan.currentBalance -= extraToApply;
        }

        totalPrincipal = activeLoans.reduce((acc, l) => acc + l.currentBalance, 0);
        months++;
      }
      return { totalInterest, months };
    };

    const current = calculate(0);
    const accelerated = calculate(extraPayment);

    return {
      currentInterest: current.totalInterest,
      newInterest: accelerated.totalInterest,
      currentMonths: current.months,
      newMonths: accelerated.months,
    };
  }, [loans, extraPayment]);

  const chartData = [
    { name: 'Current Plan', value: Math.round(simulation.currentInterest) },
    { name: 'With Extra Payment', value: Math.round(simulation.newInterest) }
  ];

  if (isLoading) {
    return (
      <PageWrapper isProtected={true}>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      </PageWrapper>
    );
  }

  if (loans.length === 0) {
    return (
      <PageWrapper isProtected={true}>
        <Card className="text-center py-20">
          <h2 className="text-2xl font-bold text-white mb-2">No Loans to Simulate</h2>
          <p className="text-slate-400">Add your loans first to see how extra payments save you money.</p>
        </Card>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper isProtected={true}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-white tracking-tight">Time Machine Simulator</h1>
        <p className="text-slate-400 mt-1">See how small extra payments bend your financial timeline.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <Card className="bg-slate-900/40 backdrop-blur-xl border-white/10 hover:border-white/20 transition-colors">
            <h3 className="text-lg font-semibold text-white mb-4">Extra Firepower</h3>
            <Slider 
              value={extraPayment}
              onChange={(e) => setExtraPayment(Number(e.target.value))}
              min={0}
              max={100000}
              step={1000}
              label="Amount to add (₹)"
            />
          </Card>

          <Card className="bg-gradient-to-br from-blue-600/20 to-indigo-600/10 backdrop-blur-xl border border-blue-500/30 text-white relative overflow-hidden shadow-[0_0_30px_rgba(37,99,235,0.15)]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
            <h3 className="text-lg font-semibold mb-6">Your Accelerated Results</h3>
            <div className="grid grid-cols-1 xs:grid-cols-2 gap-6">
              <div>
                <p className="text-white/80 text-sm mb-1">Time Saved</p>
                <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-emerald-200">
                  {simulation.currentMonths - simulation.newMonths} mo
                </p>
              </div>
              <div>
                <p className="text-white/80 text-sm mb-1">Interest Saved</p>
                <p className="text-3xl font-bold text-emerald-400">
                  ₹{Math.round(simulation.currentInterest - simulation.newInterest).toLocaleString('en-IN')}
                </p>
              </div>
              <div className="col-span-2 pt-4 border-t border-white/20">
                <p className="text-blue-200/80 text-xs font-semibold uppercase tracking-widest mb-1">New Debt Free Date</p>
                <p className="text-2xl font-bold text-white">
                  {new Date(new Date().setMonth(new Date().getMonth() + simulation.newMonths)).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
                </p>
              </div>
            </div>
          </Card>
        </div>

        <div className="h-96">
          <BarChart data={chartData} title="Total Interest Comparison" />
        </div>
      </div>
    </PageWrapper>
  );
}
