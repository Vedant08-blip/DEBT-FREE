import { useState, useMemo } from 'react';
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
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-text-primary">Payoff Strategy</h1>
        <p className="text-text-muted mt-1">Compare Avalanche vs Snowball to find the best path.</p>
      </div>

      <Card className="mb-8 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
        <div className="max-w-xl">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Extra Monthly Budget</h3>
          <p className="text-sm text-text-muted mb-6">
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
        <Card className="relative overflow-hidden border-2 border-primary/20 hover:border-primary transition-colors">
          <div className="absolute top-0 right-0 p-4">
            <Badge variant="primary" className="flex items-center gap-1">
              <TrendingDown className="w-3 h-3" /> Best Financial
            </Badge>
          </div>
          <h3 className="text-xl font-bold text-text-primary mb-2">Avalanche Method</h3>
          <p className="text-sm text-text-muted mb-6">Pays off highest interest rate loans first.</p>
          
          <div className="space-y-4">
            <div className="bg-slate-800/50 p-4 rounded-lg">
              <p className="text-sm text-text-muted mb-1">Total Interest Saved</p>
              <p className="text-2xl font-bold text-accent">{formatCurrency(avalancheInterestSaved)}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-800/50 p-4 rounded-lg">
                <p className="text-sm text-text-muted mb-1">New Payoff Time</p>
                <p className="text-lg font-semibold text-text-primary">{Math.floor(avalancheMonths/12)}y {avalancheMonths%12}m</p>
              </div>
              <div className="bg-slate-800/50 p-4 rounded-lg">
                <p className="text-sm text-text-muted mb-1">Time Saved</p>
                <p className="text-lg font-semibold text-primary">{monthsSaved} Months</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Snowball Card */}
        <Card className="relative overflow-hidden border border-border hover:border-text-muted transition-colors">
          <div className="absolute top-0 right-0 p-4">
            <Badge variant="warning" className="flex items-center gap-1">
              <Zap className="w-3 h-3" /> Best Motivation
            </Badge>
          </div>
          <h3 className="text-xl font-bold text-text-primary mb-2">Snowball Method</h3>
          <p className="text-sm text-text-muted mb-6">Pays off smallest balances first for quick wins.</p>
          
          <div className="space-y-4">
            <div className="bg-slate-800/50 p-4 rounded-lg">
              <p className="text-sm text-text-muted mb-1">Total Interest Saved</p>
              <p className="text-2xl font-bold text-accent">{formatCurrency(snowballInterestSaved)}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-800/50 p-4 rounded-lg">
                <p className="text-sm text-text-muted mb-1">New Payoff Time</p>
                <p className="text-lg font-semibold text-text-primary">{Math.floor(snowballMonths/12)}y {snowballMonths%12}m</p>
              </div>
              <div className="bg-slate-800/50 p-4 rounded-lg">
                <p className="text-sm text-text-muted mb-1">Time Saved</p>
                <p className="text-lg font-semibold text-primary">{Math.max(0, monthsSaved - 5)} Months</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="h-96">
        <LineChart data={timeline} title="Estimated Payoff Timeline (Avalanche)" />
      </div>
    </PageWrapper>
  );
}
