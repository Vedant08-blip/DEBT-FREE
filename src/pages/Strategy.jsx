import { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import PageWrapper from '../components/layout/PageWrapper';
import Card from '../components/ui/Card';
import Slider from '../components/ui/Slider';
import Badge from '../components/ui/Badge';
import LineChart from '../components/charts/LineChart';
import { formatCurrency } from '../utils/formatCurrency';
import { Zap, TrendingDown } from 'lucide-react';
import { loanAPI } from '../utils/api';
import { toast } from 'react-hot-toast';

// Core calculation logic for a single payoff strategy
const calculatePayoff = (loans, extraMonthlyBudget, sortBy) => {
  if (!loans.length) return { timeline: [], totalInterest: 0, months: 0 };

  // 1. Sort loans based on strategy
  const activeLoans = [...loans].sort((a, b) => {
    if (sortBy === 'interest') return b.interest - a.interest; // Avalanche
    return a.outstanding - b.outstanding; // Snowball
  }).map(l => ({ ...l, currentBalance: l.outstanding }));

  const data = [];
  let totalInterest = 0;
  let months = 0;
  let totalPrincipal = activeLoans.reduce((acc, l) => acc + l.outstanding, 0);

  // 2. Simulate month by month
  while (totalPrincipal > 0 && months < 600) { // Limit to 50 years
    let monthlyExtra = extraMonthlyBudget;
    let monthlyPrincipalPaid = 0;
    let monthlyInterestPaid = 0;

    activeLoans.forEach(loan => {
      if (loan.currentBalance > 0) {
        // Calculate monthly interest
        const monthlyInterest = (loan.currentBalance * (loan.interest / 100)) / 12;
        monthlyInterestPaid += monthlyInterest;
        
        // Pay EMI (minimum payment)
        let payment = Math.min(loan.emiAmount, loan.currentBalance + monthlyInterest);
        let principalPaid = payment - monthlyInterest;
        
        loan.currentBalance -= principalPaid;
        monthlyPrincipalPaid += principalPaid;
      }
    });

    // 3. Apply extra budget to the first active loan (the prioritized one)
    const priorityLoan = activeLoans.find(l => l.currentBalance > 0);
    if (priorityLoan && monthlyExtra > 0) {
      const extraToApply = Math.min(monthlyExtra, priorityLoan.currentBalance);
      priorityLoan.currentBalance -= extraToApply;
      monthlyPrincipalPaid += extraToApply;
    }

    totalInterest += monthlyInterestPaid;
    totalPrincipal = activeLoans.reduce((acc, l) => acc + l.currentBalance, 0);
    months++;

    // Add to chart data every 6 months for performance/readability
    if (months % 6 === 0 || totalPrincipal <= 0) {
      data.push({
        month: `Month ${months}`,
        principal: Math.round(totalPrincipal),
        interest: Math.round(totalInterest)
      });
    }
  }

  return { timeline: data, totalInterest, months };
};

export default function Strategy() {
  const [loans, setLoans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [extraBudget, setExtraBudget] = useState(5000);

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

  const avalanche = useMemo(() => calculatePayoff(loans, extraBudget, 'interest'), [loans, extraBudget]);
  const snowball = useMemo(() => calculatePayoff(loans, extraBudget, 'balance'), [loans, extraBudget]);
  const baseline = useMemo(() => calculatePayoff(loans, 0, 'interest'), [loans]); // No extra budget baseline

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
          <TrendingDown className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">No Loans Found</h2>
          <p className="text-slate-400">Add some loans in the "My Loans" section to architect your strategy.</p>
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
        <h1 className="text-3xl font-bold text-white tracking-tight">Strategy Architect</h1>
        <p className="text-slate-400 mt-1">Simulate Avalanche vs Snowball paths to freedom based on your real data.</p>
      </motion.div>

      <Card className="mb-8 bg-gradient-to-br from-blue-600/10 to-indigo-600/5 border-blue-500/20 backdrop-blur-xl">
        <div className="max-w-xl">
          <h3 className="text-lg font-semibold text-white mb-4">Extra Monthly Firepower</h3>
          <p className="text-sm text-slate-400 mb-6">
            Allocating extra funds each month drastically reduces your total interest and timeline.
          </p>
          <Slider 
            value={extraBudget}
            onChange={(e) => setExtraBudget(Number(e.target.value))}
            min={0}
            max={50000}
            step={1000}
            label="Extra Payment (₹)"
            className="mb-2"
          />
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Avalanche Card */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <Card className="relative overflow-hidden border-2 border-blue-500/30 bg-slate-900/40 backdrop-blur-xl hover:border-blue-400/50 shadow-[0_0_30px_rgba(37,99,235,0.1)] transition-all h-full">
            <div className="absolute top-0 right-0 p-4">
              <Badge variant="primary" className="flex items-center gap-1 bg-blue-500/20 text-blue-300 border border-blue-500/30">
                <TrendingDown className="w-3 h-3" /> Math Winner
              </Badge>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Avalanche Method</h3>
            <p className="text-sm text-slate-400 mb-6">Attacks the highest interest rate loans first.</p>
            
            <div className="space-y-4">
              <div className="bg-slate-950/50 border border-white/5 p-4 rounded-xl">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">Total Interest Saved</p>
                <p className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                  {formatCurrency(Math.max(0, baseline.totalInterest - avalanche.totalInterest))}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-950/50 border border-white/5 p-4 rounded-xl">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">New Payoff Time</p>
                  <p className="text-xl font-bold text-white">{Math.floor(avalanche.months/12)}y {avalanche.months%12}m</p>
                </div>
                <div className="bg-slate-950/50 border border-white/5 p-4 rounded-xl">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">Time Saved</p>
                  <p className="text-xl font-bold text-emerald-400">{Math.max(0, baseline.months - avalanche.months)} Months</p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Snowball Card */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
          <Card className="relative overflow-hidden border border-white/10 bg-slate-900/40 backdrop-blur-xl hover:border-white/20 transition-all h-full">
          <div className="absolute top-0 right-0 p-4">
            <Badge variant="warning" className="flex items-center gap-1 bg-amber-500/20 text-amber-300 border border-amber-500/30">
              <Zap className="w-3 h-3" /> Quick Wins
            </Badge>
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Snowball Method</h3>
            <p className="text-sm text-slate-400 mb-6">Attacks the smallest balances first for momentum.</p>
            
            <div className="space-y-4">
              <div className="bg-slate-950/50 border border-white/5 p-4 rounded-xl">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">Total Interest Saved</p>
                <p className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
                   {formatCurrency(Math.max(0, baseline.totalInterest - snowball.totalInterest))}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-950/50 border border-white/5 p-4 rounded-xl">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">New Payoff Time</p>
                  <p className="text-xl font-bold text-white">{Math.floor(snowball.months/12)}y {snowball.months%12}m</p>
                </div>
                <div className="bg-slate-950/50 border border-white/5 p-4 rounded-xl">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">Time Saved</p>
                  <p className="text-xl font-bold text-emerald-400">{Math.max(0, baseline.months - snowball.months)} Months</p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      <div className="h-96">
        <LineChart data={avalanche.timeline} title="Estimated Payoff Timeline (Avalanche)" />
      </div>
    </PageWrapper>
  );
}
