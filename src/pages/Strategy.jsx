import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import PageWrapper from '../components/layout/PageWrapper';
import Card from '../components/ui/Card';
import Slider from '../components/ui/Slider';
import Badge from '../components/ui/Badge';
import LineChart from '../components/charts/LineChart';
import { formatCurrency } from '../utils/formatCurrency';
import { Zap, TrendingDown } from 'lucide-react';

// Mock generate timeline data
const generateMockTimeline = (months, extraPayment = 0) => {
  const data = [];
  let principal = 5000000; // Starting with a big mock number
  let interest = 0;
  
  // Faster payoff if extraPayment is higher
  const adjustedMonths = Math.max(12, months - Math.floor(extraPayment / 1000) * 2);
  const monthlyBurn = principal / adjustedMonths;

  for (let i = 0; i <= adjustedMonths; i += Math.max(1, Math.floor(adjustedMonths/10))) {
    const currentPrincipal = Math.max(0, principal - (monthlyBurn * i));
    const currentInterest = interest + (currentPrincipal * 0.08 / 12 * i);
    data.push({
      month: `M${i}`,
      principal: Math.round(currentPrincipal),
      interest: Math.round(currentInterest)
    });
  }
  return { timeline: data, monthsSaved: months - adjustedMonths };
};

export default function Strategy() {
  const [extraBudget, setExtraBudget] = useState(5000);
  
  // Strategy calculations (mocked based on budget)
  const avalancheInterestSaved = 125000 + (extraBudget * 24);
  const snowballInterestSaved = 98000 + (extraBudget * 18);
  
  const avalancheMonths = 240 - Math.floor(extraBudget / 500);
  const snowballMonths = 240 - Math.floor(extraBudget / 600);

  const { timeline, monthsSaved } = useMemo(() => generateMockTimeline(240, extraBudget), [extraBudget]);

  return (
    <PageWrapper isProtected={true}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-white tracking-tight">Strategy Architect</h1>
        <p className="text-slate-400 mt-1">Simulate Avalanche vs Snowball paths to freedom.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
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
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
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
                <p className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">{formatCurrency(avalancheInterestSaved)}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-950/50 border border-white/5 p-4 rounded-xl">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">New Payoff Time</p>
                  <p className="text-xl font-bold text-white">{Math.floor(avalancheMonths/12)}y {avalancheMonths%12}m</p>
                </div>
                <div className="bg-slate-950/50 border border-white/5 p-4 rounded-xl">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">Time Saved</p>
                  <p className="text-xl font-bold text-emerald-400">{monthsSaved} Months</p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Snowball Card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
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
                <p className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">{formatCurrency(snowballInterestSaved)}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-950/50 border border-white/5 p-4 rounded-xl">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">New Payoff Time</p>
                  <p className="text-xl font-bold text-white">{Math.floor(snowballMonths/12)}y {snowballMonths%12}m</p>
                </div>
                <div className="bg-slate-950/50 border border-white/5 p-4 rounded-xl">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">Time Saved</p>
                  <p className="text-xl font-bold text-emerald-400">{Math.max(0, monthsSaved - 5)} Months</p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="h-96"
      >
        <LineChart data={timeline} title="Estimated Payoff Timeline (Avalanche)" />
      </motion.div>
    </PageWrapper>
  );
}
