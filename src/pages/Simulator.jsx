import { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import PageWrapper from '../components/layout/PageWrapper';
import Card from '../components/ui/Card';
import Slider from '../components/ui/Slider';
import BarChart from '../components/charts/BarChart';
import { loanAPI } from '../utils/api';
import { toast } from 'react-hot-toast';
import { Sparkles, TrendingUp, PiggyBank, Coins, Info } from 'lucide-react';
import { formatCurrency } from '../utils/formatCurrency';

export default function Simulator() {
  const [loans, setLoans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [extraPayment, setExtraPayment] = useState(5000);
  
  // Windfall States
  const [windfallAmount, setWindfallAmount] = useState(50000);
  const [windfallStrategy, setWindfallStrategy] = useState('avalanche'); // 'avalanche' | 'snowball' | 'custom'
  const [selectedCustomLoanId, setSelectedCustomLoanId] = useState('');

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const data = await loanAPI.getLoans();
        setLoans(data);
        if (data.length > 0) {
          setSelectedCustomLoanId(data[0]._id || data[0].id);
        }
        setIsLoading(false);
      } catch (err) {
        toast.error(err.message || 'Failed to fetch loans');
        setIsLoading(false);
      }
    };
    fetchLoans();
  }, []);

  const simulation = useMemo(() => {
    if (!loans.length) return { currentInterest: 0, newInterest: 0, currentMonths: 0, newMonths: 0, targetLoanName: '' };

    // Function to calculate payoff timeline with both monthly extra and a one-time windfall
    const calculate = (monthlyExtra, applyWindfall) => {
      let totalInterest = 0;
      let months = 0;
      const activeLoans = loans.map(l => ({ ...l, currentBalance: l.outstanding }));
      
      // Determine which loan gets the windfall
      let targetLoanId = null;
      let targetName = '';

      if (applyWindfall && windfallAmount > 0) {
        if (windfallStrategy === 'avalanche') {
          const highestInterest = [...activeLoans]
            .filter(l => l.currentBalance > 0)
            .sort((a, b) => b.interestRate - a.interestRate)[0];
          if (highestInterest) {
            targetLoanId = highestInterest._id || highestInterest.id;
            targetName = highestInterest.name;
          }
        } else if (windfallStrategy === 'snowball') {
          const smallestBalance = [...activeLoans]
            .filter(l => l.currentBalance > 0)
            .sort((a, b) => a.currentBalance - b.currentBalance)[0];
          if (smallestBalance) {
            targetLoanId = smallestBalance._id || smallestBalance.id;
            targetName = smallestBalance.name;
          }
        } else if (windfallStrategy === 'custom') {
          targetLoanId = selectedCustomLoanId;
          const customL = activeLoans.find(l => (l._id || l.id) === selectedCustomLoanId);
          targetName = customL ? customL.name : '';
        }

        // Apply windfall at month 0
        if (targetLoanId) {
          const target = activeLoans.find(l => (l._id || l.id) === targetLoanId);
          if (target) {
            target.currentBalance = Math.max(0, target.currentBalance - windfallAmount);
          }
        }
      }

      let totalPrincipal = activeLoans.reduce((acc, l) => acc + l.currentBalance, 0);

      while (totalPrincipal > 0 && months < 600) {
        let cycleExtra = monthlyExtra;
        
        // Pay minimum EMIs
        activeLoans.forEach(loan => {
          if (loan.currentBalance > 0) {
            const monthlyInterest = (loan.currentBalance * (loan.interestRate / 100)) / 12;
            totalInterest += monthlyInterest;
            let payment = Math.min(loan.emiAmount, loan.currentBalance + monthlyInterest);
            loan.currentBalance -= (payment - monthlyInterest);
          }
        });

        // Apply monthly extra budget to highest interest loan (Avalanche payoff prioritize)
        const priorityLoan = activeLoans.find(l => l.currentBalance > 0);
        if (priorityLoan && cycleExtra > 0) {
          const extraToApply = Math.min(cycleExtra, priorityLoan.currentBalance);
          priorityLoan.currentBalance -= extraToApply;
        }

        totalPrincipal = activeLoans.reduce((acc, l) => acc + l.currentBalance, 0);
        months++;
      }
      
      return { totalInterest, months, targetName };
    };

    const current = calculate(0, false); // Baseline: No monthly extra, no windfall
    const accelerated = calculate(extraPayment, true); // Scenario: Monthly extra + windfall

    return {
      currentInterest: current.totalInterest,
      newInterest: accelerated.totalInterest,
      currentMonths: current.months,
      newMonths: accelerated.months,
      targetLoanName: accelerated.targetName
    };
  }, [loans, extraPayment, windfallAmount, windfallStrategy, selectedCustomLoanId]);

  const chartData = [
    { name: 'Current Plan', value: Math.round(simulation.currentInterest) },
    { name: 'With Accelerator', value: Math.round(simulation.newInterest) }
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
        <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-2">
          <Sparkles className="w-8 h-8 text-blue-500" /> Time Machine Simulator
        </h1>
        <p className="text-slate-400 mt-1">See how small extra payments and lump-sum windfalls bend your financial timeline.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Simulator Column */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Monthly Firepower card */}
          <Card className="bg-slate-900/40 backdrop-blur-xl border-white/5 hover:border-white/10 transition-colors">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-400" /> Extra Monthly Firepower
            </h3>
            <Slider 
              value={extraPayment}
              onChange={(e) => setExtraPayment(Number(e.target.value))}
              min={0}
              max={100000}
              step={1000}
              label="Monthly Extra (₹)"
            />
          </Card>

          {/* Windfall Optimizer card */}
          <Card className="bg-slate-900/40 backdrop-blur-xl border-white/5 hover:border-white/10 transition-colors">
            <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
              <PiggyBank className="w-5 h-5 text-emerald-400" /> Windfall / Lump-Sum Optimizer
            </h3>
            <p className="text-xs text-slate-400 mb-6">Received a work bonus or tax refund? Simulate applying it to your debts.</p>
            
            <Slider 
              value={windfallAmount}
              onChange={(e) => setWindfallAmount(Number(e.target.value))}
              min={0}
              max={500000}
              step={5000}
              label="Windfall Amount (₹)"
              className="mb-6"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <button
                onClick={() => setWindfallStrategy('avalanche')}
                className={`p-3 rounded-xl border text-xs font-semibold text-center transition-all ${
                  windfallStrategy === 'avalanche'
                    ? 'bg-blue-500/10 border-blue-500/40 text-blue-400 font-bold'
                    : 'bg-slate-950/40 border-white/5 text-slate-400 hover:text-white'
                }`}
              >
                🗻 Avalanche (Highest Rate)
              </button>
              <button
                onClick={() => setWindfallStrategy('snowball')}
                className={`p-3 rounded-xl border text-xs font-semibold text-center transition-all ${
                  windfallStrategy === 'snowball'
                    ? 'bg-blue-500/10 border-blue-500/40 text-blue-400 font-bold'
                    : 'bg-slate-950/40 border-white/5 text-slate-400 hover:text-white'
                }`}
              >
                ❄️ Snowball (Smallest Balance)
              </button>
              <button
                onClick={() => setWindfallStrategy('custom')}
                className={`p-3 rounded-xl border text-xs font-semibold text-center transition-all ${
                  windfallStrategy === 'custom'
                    ? 'bg-blue-500/10 border-blue-500/40 text-blue-400 font-bold'
                    : 'bg-slate-950/40 border-white/5 text-slate-400 hover:text-white'
                }`}
              >
                ⚙️ Custom Loan Select
              </button>
            </div>

            {/* Custom loan select dropdown */}
            {windfallStrategy === 'custom' && (
              <div className="flex flex-col gap-1.5 p-3 rounded-xl bg-slate-950/30 border border-white/5 animate-in fade-in slide-in-from-top-1 duration-200">
                <label className="text-xs text-slate-400 font-medium">Select target loan for windfall:</label>
                <select
                  value={selectedCustomLoanId}
                  onChange={(e) => setSelectedCustomLoanId(e.target.value)}
                  className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  {loans.map(l => (
                    <option key={l._id || l.id} value={l._id || l.id}>{l.name} ({formatCurrency(l.outstanding)})</option>
                  ))}
                </select>
              </div>
            )}
          </Card>

        </div>

        {/* Right Simulation Results Column */}
        <div className="space-y-6">
          
          {/* Results Badge summary card */}
          <Card className="bg-gradient-to-br from-blue-600/20 to-indigo-600/10 backdrop-blur-xl border border-blue-500/30 text-white relative overflow-hidden shadow-[0_0_30px_rgba(37,99,235,0.15)]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
            <h3 className="text-lg font-semibold mb-6">Accelerated Results</h3>
            
            <div className="grid grid-cols-1 xs:grid-cols-2 gap-6">
              <div>
                <p className="text-white/80 text-xs mb-1 uppercase tracking-wider font-semibold">Time Saved</p>
                <p className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white to-emerald-200">
                  {Math.max(0, simulation.currentMonths - simulation.newMonths)} Mo
                </p>
              </div>
              <div>
                <p className="text-white/80 text-xs mb-1 uppercase tracking-wider font-semibold">Interest Saved</p>
                <p className="text-3xl font-black text-emerald-400">
                  {formatCurrency(Math.max(0, simulation.currentInterest - simulation.newInterest))}
                </p>
              </div>
              
              <div className="col-span-2 pt-4 border-t border-white/20">
                <p className="text-blue-200/80 text-[10px] font-semibold uppercase tracking-widest mb-1">New Debt Free Date</p>
                <p className="text-2xl font-bold text-white">
                  {new Date(new Date().setMonth(new Date().getMonth() + simulation.newMonths)).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
                </p>
              </div>

              {windfallAmount > 0 && simulation.targetLoanName && (
                <div className="col-span-2 pt-3 flex gap-2 items-start border-t border-white/10 text-xs text-slate-300">
                  <Info className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <p>
                    Windfall of <span className="font-semibold text-white">{formatCurrency(windfallAmount)}</span> is applied as a lump-sum payment to <span className="font-semibold text-emerald-300">{simulation.targetLoanName}</span>.
                  </p>
                </div>
              )}
            </div>
          </Card>

          {/* Interest Comparison BarChart */}
          <div className="h-80">
            <BarChart data={chartData} title="Interest Cost Comparison (₹)" />
          </div>

        </div>

      </div>
    </PageWrapper>
  );
}
