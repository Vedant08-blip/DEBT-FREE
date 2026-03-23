import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import PageWrapper from '../components/layout/PageWrapper';
import Card from '../components/ui/Card';
import Slider from '../components/ui/Slider';
import BarChart from '../components/charts/BarChart';

export default function Simulator() {
  const [extraPayment, setExtraPayment] = useState(5000);
  
  // Dummy calculations for simulator showing before and after impact
  const currentMonths = 120;
  const currentInterest = 1500000;
  
  const savedMonths = Math.floor(extraPayment / 1000) * 2.5; 
  const newMonths = Math.max(12, currentMonths - savedMonths);
  const newInterest = Math.max(100000, currentInterest - (extraPayment * 30));
  
  const chartData = [
    { name: 'Current Plan', value: currentInterest },
    { name: 'With Extra Payment', value: newInterest }
  ];

  return (
    <PageWrapper isProtected={true}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-white tracking-tight">Time Machine Simulator</h1>
        <p className="text-slate-400 mt-1">See how small extra payments bend your financial timeline.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="bg-slate-900/40 backdrop-blur-xl border-white/10 hover:border-white/20 transition-colors">
              <h3 className="text-lg font-semibold text-white mb-4">Extra Firepower</h3>
            <Slider 
              value={extraPayment}
              onChange={(e) => setExtraPayment(Number(e.target.value))}
              min={0}
              max={50000}
              step={500}
              label="Amount to add (₹)"
            />
          </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
          <Card className="bg-gradient-to-br from-blue-600/20 to-indigo-600/10 backdrop-blur-xl border border-blue-500/30 text-white relative overflow-hidden shadow-[0_0_30px_rgba(37,99,235,0.15)]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
            <h3 className="text-lg font-semibold mb-6">Your Accelerated Results</h3>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-white/80 text-sm mb-1">Time Saved</p>
                <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-emerald-200">
                  {Math.floor(savedMonths)} mo
                </p>
              </div>
              <div>
                <p className="text-white/80 text-sm mb-1">Interest Saved</p>
                <p className="text-3xl font-bold text-accent">
                  ₹{(currentInterest - newInterest).toLocaleString('en-IN')}
                </p>
              </div>
              <div className="col-span-2 pt-4 border-t border-white/20">
                <p className="text-blue-200/80 text-xs font-semibold uppercase tracking-widest mb-1">New Debt Free Date</p>
                <p className="text-2xl font-bold text-white">
                  {new Date(new Date().setMonth(new Date().getMonth() + Math.round(newMonths))).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
                </p>
              </div>
            </div>
          </Card>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="h-96"
        >
          <BarChart data={chartData} title="Total Interest Comparison" />
        </motion.div>
      </div>
    </PageWrapper>
  );
}
