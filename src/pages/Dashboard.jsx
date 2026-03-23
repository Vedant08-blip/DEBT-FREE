import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageWrapper from '../components/layout/PageWrapper';
import LoanSummary from '../components/loans/LoanSummary';
import DonutChart from '../components/charts/DonutChart';
import BarChart from '../components/charts/BarChart';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { formatCurrency } from '../utils/formatCurrency';
import { dummyLoans } from '../data/dummy';
import { Plus } from 'lucide-react';

export default function Dashboard() {
  const [loans, setLoans] = useState([]);
  
  useEffect(() => {
    // In a real app, fetch from API. We use local dummy data.
    const stored = localStorage.getItem('debtfree_loans');
    if (stored) {
      setLoans(JSON.parse(stored));
    } else {
      setLoans(dummyLoans);
      localStorage.setItem('debtfree_loans', JSON.stringify(dummyLoans));
    }
  }, []);

  const totalDebt = loans.reduce((acc, loan) => acc + loan.outstanding, 0);
  const monthlyEMI = loans.reduce((acc, loan) => acc + loan.emiAmount, 0);
  const maxTenure = Math.max(...loans.map(l => l.tenureMonths), 0);
  
  const debtFreeDate = new Date();
  debtFreeDate.setMonth(debtFreeDate.getMonth() + maxTenure);
  const formattedDate = maxTenure > 0 
    ? debtFreeDate.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })
    : 'No Debt';

  // Format data for charts
  const donutData = loans.map(loan => ({
    name: loan.name,
    value: loan.outstanding
  }));

  const barData = loans.map(loan => ({
    name: loan.name.split(' ')[0], // Short name
    value: loan.emiAmount
  }));

  return (
    <PageWrapper isProtected={true}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center mb-6"
      >
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Mission Control</h1>
          <p className="text-slate-400 mt-1">Welcome back. Here's your financial overview.</p>
        </div>
        <Link to="/loans">
          <Button className="hidden sm:flex gap-2 bg-blue-600 hover:bg-blue-500 shadow-[0_0_15px_rgba(37,99,235,0.3)]">
            <Plus className="w-4 h-4" /> Add Loan
          </Button>
        </Link>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-8"
      >
        <LoanSummary 
          totalDebt={totalDebt}
          monthlyEMI={monthlyEMI}
          loansCount={loans.length}
          debtFreeDate={formattedDate}
        />
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
      >
        <DonutChart data={donutData} title="Debt Breakdown" />
        <BarChart data={barData} title="Monthly EMI Breakdown" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <Card className="w-full glass-card border-white/5 bg-slate-900/40 backdrop-blur-2xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-text-primary">Recent Loans</h3>
          <Link to="/loans" className="text-sm font-medium text-primary hover:text-secondary transition-colors">
            View All
          </Link>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="pb-3 text-text-muted font-medium">Loan Name</th>
                <th className="pb-3 text-text-muted font-medium">Outstanding</th>
                <th className="pb-3 text-text-muted font-medium hidden sm:table-cell">Interest Rate</th>
                <th className="pb-3 text-text-muted font-medium">EMI Amount</th>
              </tr>
            </thead>
            <tbody>
              {loans.slice(0, 4).map(loan => (
                <tr key={loan.id} className="border-b border-border/50 last:border-0">
                  <td className="py-4 font-medium text-text-primary">{loan.name}</td>
                  <td className="py-4 text-danger font-semibold">{formatCurrency(loan.outstanding)}</td>
                  <td className="py-4 text-text-primary hidden sm:table-cell">{loan.interestRate}%</td>
                  <td className="py-4 text-text-primary">{formatCurrency(loan.emiAmount)}</td>
                </tr>
              ))}
              {loans.length === 0 && (
                <tr>
                  <td colSpan="4" className="py-8 text-center text-text-muted">
                    No active loans tracking. Add a loan to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        </Card>
      </motion.div>
    </PageWrapper>
  );
}
