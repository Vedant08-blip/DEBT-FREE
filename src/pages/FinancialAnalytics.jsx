import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PageWrapper from '../components/layout/PageWrapper';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import BarChart from '../components/charts/BarChart';
import DonutChart from '../components/charts/DonutChart';
import { formatCurrency } from '../utils/formatCurrency';
import { loanAPI } from '../utils/api';
import { TrendingUp, PieChart, Target, Zap, AlertCircle, Award } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function FinancialAnalytics() {
  const [loans, setLoans] = useState([]);
  const [income] = useState(() => {
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      if (userInfo && userInfo.netMonthlyIncome !== undefined) {
        return Number(userInfo.netMonthlyIncome);
      }
    } catch {
      // Ignore errors
    }
    return Number(localStorage.getItem('net_monthly_income')) || 75000;
  });
  const [expenses] = useState(() => {
    try {
      const storedExpenses = JSON.parse(localStorage.getItem('monthly_expenses'));
      if (storedExpenses && Object.keys(storedExpenses).length > 0) {
        return storedExpenses;
      }
    } catch {
      // Ignore errors
    }
    return {
      housing: 25000,
      food: 15000,
      transportation: 8000,
      utilities: 5000,
      entertainment: 3000,
      other: 5000
    };
  });
  const [isLoadingLoans, setIsLoadingLoans] = useState(true);

  useEffect(() => {
    let isMounted = true;
    loanAPI.getLoans()
      .then(data => {
        if (isMounted) {
          setLoans(data);
          setIsLoadingLoans(false);
        }
      })
      .catch(err => {
        if (isMounted) {
          toast.error(err.message || 'Failed to fetch loans');
          setIsLoadingLoans(false);
        }
      });
    return () => { isMounted = false; };
  }, []);

  // Calculate metrics
  const totalDebt = loans.reduce((acc, loan) => acc + loan.outstanding, 0);
  const monthlyEMI = loans.reduce((acc, loan) => acc + loan.emiAmount, 0);
  const totalExpenses = Object.values(expenses).reduce((a, b) => a + Number(b), 0);
  const totalMonthlyObligations = monthlyEMI + totalExpenses;
  const monthlyNetIncome = income;
  const monthlySavings = monthlyNetIncome - totalMonthlyObligations;
  const savingsRate = monthlyNetIncome > 0 ? (monthlySavings / monthlyNetIncome) * 100 : 0;

  // DTI Ratio
  const dtiRatio = monthlyNetIncome > 0 ? (monthlyEMI / monthlyNetIncome) * 100 : 0;

  // Expense ratio
  const expenseRatio = monthlyNetIncome > 0 ? (totalExpenses / monthlyNetIncome) * 100 : 0;

  // Financial Health Score (0-100)
  const calculateHealthScore = () => {
    let score = 100;
    
    // DTI penalty
    if (dtiRatio > 36) score -= Math.min((dtiRatio - 36) * 0.5, 30);
    
    // Savings rate bonus
    if (savingsRate >= 20) score += 10;
    else if (savingsRate < 0) score -= 20;
    
    // Expense ratio penalty
    if (expenseRatio > 50) score -= Math.min((expenseRatio - 50) * 0.3, 20);
    
    return Math.max(0, Math.min(100, score));
  };

  const healthScore = calculateHealthScore();

  const getHealthColor = (score) => {
    if (score >= 80) return 'text-emerald-400';
    if (score >= 60) return 'text-amber-400';
    if (score >= 40) return 'text-orange-400';
    return 'text-red-400';
  };

  const getHealthLabel = (score) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Poor';
  };

  // Debt breakdown by type
  const debtByType = loans.reduce((acc, loan) => {
    const existing = acc.find(item => item.name === loan.name);
    if (existing) {
      existing.value += loan.outstanding;
    } else {
      acc.push({ name: loan.name, value: loan.outstanding });
    }
    return acc;
  }, []);

  // Monthly cash flow
  const cashFlowData = [
    { name: 'Income', value: monthlyNetIncome },
    { name: 'EMI', value: monthlyEMI },
    { name: 'Expenses', value: totalExpenses },
    { name: 'Savings', value: Math.max(0, monthlySavings) }
  ];

  // Loan progress over time (projected)
  const projectedPayoffData = loans.slice(0, 3).map((loan) => {
    return {
      name: loan.name.substring(0, 12),
      current: loan.outstanding,
      projected: Math.max(0, loan.outstanding - (loan.emiAmount * 6))
    };
  });

  if (isLoadingLoans) {
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
      <div className="space-y-8 pb-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-8 h-8 text-blue-400" />
            <h1 className="text-4xl font-bold text-white">Financial Analytics</h1>
          </div>
          <p className="text-slate-400">Deep dive into your financial health and spending patterns</p>
        </motion.div>

        {/* Health Score Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
              <div className="flex flex-col items-center justify-center">
                <div className="relative w-48 h-48">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="rgba(255,255,255,0.1)"
                      strokeWidth="8"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke={
                        healthScore >= 80
                          ? '#10b981'
                          : healthScore >= 60
                          ? '#f59e0b'
                          : healthScore >= 40
                          ? '#f97316'
                          : '#ef4444'
                      }
                      strokeWidth="8"
                      strokeDasharray={`${healthScore * 2.83} 283`}
                      strokeLinecap="round"
                      style={{ transition: 'stroke-dasharray 0.5s ease' }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className={`text-5xl font-bold ${getHealthColor(healthScore)}`}>
                      {Math.round(healthScore)}
                    </span>
                    <span className="text-xs text-slate-400 mt-1">Score</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-center space-y-6">
                <div>
                  <p className="text-slate-400 text-sm mb-2">Financial Health Status</p>
                  <p className={`text-3xl font-bold ${getHealthColor(healthScore)}`}>
                    {getHealthLabel(healthScore)}
                  </p>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg border border-white/10">
                    <span className="text-slate-400">Debt-to-Income Ratio</span>
                    <span className={dtiRatio <= 36 ? 'text-emerald-400' : 'text-red-400'}>
                      {dtiRatio.toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg border border-white/10">
                    <span className="text-slate-400">Savings Rate</span>
                    <span className={savingsRate >= 20 ? 'text-emerald-400' : 'text-amber-400'}>
                      {savingsRate.toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg border border-white/10">
                    <span className="text-slate-400">Monthly Savings</span>
                    <span className={monthlySavings >= 0 ? 'text-emerald-400' : 'text-red-400'}>
                      {formatCurrency(monthlySavings)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Key Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Total Debt</p>
                <p className="text-2xl font-bold text-white mt-2">
                  {formatCurrency(totalDebt)}
                </p>
              </div>
              <Zap className="w-8 h-8 text-blue-400 opacity-50" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Monthly EMI</p>
                <p className="text-2xl font-bold text-white mt-2">
                  {formatCurrency(monthlyEMI)}
                </p>
              </div>
              <Target className="w-8 h-8 text-blue-400 opacity-50" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Total Expenses</p>
                <p className="text-2xl font-bold text-white mt-2">
                  {formatCurrency(totalExpenses)}
                </p>
              </div>
              <AlertCircle className="w-8 h-8 text-orange-400 opacity-50" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Monthly Savings</p>
                <p className={`text-2xl font-bold mt-2 ${monthlySavings >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {formatCurrency(monthlySavings)}
                </p>
              </div>
              <Award className="w-8 h-8 text-emerald-400 opacity-50" />
            </div>
          </Card>
        </motion.div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Cash Flow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <BarChart 
              data={cashFlowData} 
              title="Monthly Cash Flow"
              bars={[
                { dataKey: 'value', name: 'Monthly Flow', fill: '#3B82F6' }
              ]}
            />
          </motion.div>

          {/* Debt Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <DonutChart data={debtByType} title="Debt Distribution" />
          </motion.div>
        </div>

        {/* Projected Payoff */}
        {projectedPayoffData.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <BarChart 
              data={projectedPayoffData} 
              title="Projected 6-Month Payoff Progress"
              bars={[
                { dataKey: 'current', name: 'Current Balance', fill: '#3B82F6' },
                { dataKey: 'projected', name: 'Projected Balance (6 Mo)', fill: '#10B981' }
              ]}
            />
          </motion.div>
        )}

        {/* Expense Tracker */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Expense Breakdown</h3>
            <div className="space-y-4">
              {Object.entries(expenses).length > 0 ? (
                Object.entries(expenses).map(([category, amount], idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <span className="text-slate-300 capitalize">{category.replace(/_/g, ' ')}</span>
                    <div className="flex items-center gap-4">
                      <div className="w-40 bg-white/5 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full"
                          style={{ width: `${(Number(amount) / monthlyNetIncome) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-white font-semibold min-w-32 text-right">
                        {formatCurrency(Number(amount))}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-slate-400">
                  <p>No expenses tracked yet</p>
                  <Button className="mt-4">Add Expense Category</Button>
                </div>
              )}
            </div>
          </Card>
        </motion.div>

        {/* Insights & Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <Card className="p-6 border-l-4 border-l-blue-500">
            <h3 className="text-lg font-semibold text-white mb-4">💡 AI Insights & Recommendations</h3>
            <div className="space-y-3 text-sm text-slate-300">
              {healthScore >= 80 && (
                <div className="flex gap-2">
                  <span className="text-emerald-400">✓</span>
                  <span>Excellent financial health! Consider investing the extra savings for long-term wealth.</span>
                </div>
              )}
              {dtiRatio > 36 && (
                <div className="flex gap-2">
                  <span className="text-orange-400">⚠</span>
                  <span>Your DTI ratio is above 36%. Try to increase income or reduce loan burden.</span>
                </div>
              )}
              {savingsRate < 0 && (
                <div className="flex gap-2">
                  <span className="text-red-400">✕</span>
                  <span>You're spending more than earning. Review your expenses and adjust your budget.</span>
                </div>
              )}
              {expenseRatio > 50 && (
                <div className="flex gap-2">
                  <span className="text-amber-400">⚠</span>
                  <span>Your expenses are above 50% of income. Look for areas to cut unnecessary spending.</span>
                </div>
              )}
              {savingsRate >= 20 && (
                <div className="flex gap-2">
                  <span className="text-emerald-400">✓</span>
                  <span>Great savings rate! You're building wealth while managing debt effectively.</span>
                </div>
              )}
            </div>
          </Card>
        </motion.div>
      </div>
    </PageWrapper>
  );
}
