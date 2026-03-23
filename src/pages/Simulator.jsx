import { useState, useMemo } from 'react';
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
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-text-primary">Payment Simulator</h1>
        <p className="text-text-muted mt-1">See how small extra payments make a massive difference.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <Card className="border-border">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Extra Monthly Payment</h3>
            <Slider 
              value={extraPayment}
              onChange={(e) => setExtraPayment(Number(e.target.value))}
              min={0}
              max={50000}
              step={500}
              label="Amount to add (₹)"
            />
          </Card>

          <Card className="bg-gradient-to-br from-primary to-secondary text-white border-0">
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
                <p className="text-white/80 text-sm mb-1">New Debt Free Date</p>
                <p className="text-xl font-semibold">
                  {new Date(new Date().setMonth(new Date().getMonth() + Math.round(newMonths))).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
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
