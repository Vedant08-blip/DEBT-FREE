import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageWrapper from '../components/layout/PageWrapper';
import LoanSummary from '../components/loans/LoanSummary';
import DonutChart from '../components/charts/DonutChart';
import BarChart from '../components/charts/BarChart';
import ProgressRing from '../components/charts/ProgressRing';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { formatCurrency } from '../utils/formatCurrency';
import { loanAPI } from '../utils/api';
import { Plus, Award, Coins, Download, Lock, CheckCircle, ShieldCheck, Printer, AlertTriangle } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function Dashboard() {
  const [loans, setLoans] = useState([]);
  const [income, setIncome] = useState(() => {
    return Number(localStorage.getItem('net_monthly_income')) || 75000;
  });
  const [isEditingIncome, setIsEditingIncome] = useState(false);
  const [tempIncome, setTempIncome] = useState(income);
  
  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const data = await loanAPI.getLoans();
        setLoans(data);
      } catch (err) {
        toast.error(err.message || 'Failed to fetch loans');
      }
    };
    fetchLoans();
  }, []);

  const totalDebt = loans.reduce((acc, loan) => acc + loan.outstanding, 0);
  const monthlyEMI = loans.reduce((acc, loan) => acc + loan.emiAmount, 0);
  const totalPrincipal = loans.reduce((acc, loan) => acc + loan.principal, 0);
  const maxTenure = Math.max(...loans.map(l => l.tenureMonths), 0);
  
  const debtFreeDate = new Date();
  debtFreeDate.setMonth(debtFreeDate.getMonth() + maxTenure);
  const formattedDate = maxTenure > 0 
    ? debtFreeDate.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })
    : 'No Debt';

  // DTI calculation
  const dtiRatio = income > 0 ? Math.round((monthlyEMI / income) * 100) : 0;
  
  const getDtiHealth = (dti) => {
    if (dti <= 36) {
      return { 
        label: 'Healthy', 
        color: 'text-emerald-400', 
        progressColor: 'text-emerald-500', 
        bgColor: 'bg-emerald-500/10 border-emerald-500/20', 
        desc: 'Great! Your debt obligations are well under 36% of your monthly income. You are in a strong financial position.' 
      };
    }
    if (dti <= 49) {
      return { 
        label: 'Caution', 
        color: 'text-amber-400', 
        progressColor: 'text-amber-500', 
        bgColor: 'bg-amber-500/10 border-amber-500/20', 
        desc: 'Warning: Your debt-to-income is high (37-49%). Avoid taking new loans and look for ways to cut expenses.' 
      };
    }
    return { 
      label: 'Critical', 
      color: 'text-rose-400', 
      progressColor: 'text-rose-500', 
      bgColor: 'bg-rose-500/10 border-rose-500/20', 
      desc: 'Critical: Over half your income goes to EMIs. Consider refinancing high-rate loans or adopting an aggressive strategy.' 
    };
  };

  const dtiHealth = getDtiHealth(dtiRatio);

  const handleSaveIncome = () => {
    if (tempIncome <= 0) {
      toast.error("Please enter a valid monthly income");
      return;
    }
    setIncome(tempIncome);
    localStorage.setItem('net_monthly_income', tempIncome.toString());
    setIsEditingIncome(false);
    toast.success("Income updated successfully!");
  };

  // Gamified Milestones Calculation
  const totalPaid = Math.max(0, totalPrincipal - totalDebt);
  const percentPaid = totalPrincipal > 0 ? (totalPaid / totalPrincipal) * 100 : 0;

  const milestones = [
    {
      id: 'starter',
      name: 'Debt Starter',
      desc: 'Added at least 1 active loan tracking.',
      active: loans.length > 0,
      icon: Coins,
      color: 'from-blue-500/20 to-indigo-500/15 text-blue-400 border-blue-500/30'
    },
    {
      id: 'crusher',
      name: 'Debt Crusher',
      desc: 'Paid off 10% or more of original principal.',
      active: loans.length > 0 && percentPaid >= 10,
      icon: Award,
      color: 'from-violet-500/20 to-purple-500/15 text-purple-400 border-purple-500/30'
    },
    {
      id: 'halfway',
      name: 'Halfway to Freedom',
      desc: 'Paid off 50% or more of original principal.',
      active: loans.length > 0 && percentPaid >= 50,
      icon: ShieldCheck,
      color: 'from-amber-500/20 to-orange-500/15 text-orange-400 border-amber-500/30'
    },
    {
      id: 'shield',
      name: 'EMI Shield',
      desc: 'Reminders enabled for all active tracking loans.',
      active: loans.length > 0 && loans.every(l => l.isReminderEnabled),
      icon: CheckCircle,
      color: 'from-emerald-500/20 to-teal-500/15 text-emerald-400 border-emerald-500/30'
    }
  ];

  // Export CSV Action
  const handleExportCSV = () => {
    if (!loans.length) {
      toast.error('No loans to export');
      return;
    }
    const headers = ['Loan Name', 'Type', 'Original Principal (INR)', 'Outstanding (INR)', 'Interest Rate (%)', 'Monthly EMI (INR)', 'EMI Due Date', 'Reminders Enabled'];
    const rows = loans.map(l => [
      `"${l.name}"`,
      l.type,
      l.principal,
      l.outstanding,
      l.interestRate,
      l.emiAmount,
      l.emiDate,
      l.isReminderEnabled ? 'Yes' : 'No'
    ]);
    
    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `DebtFree_Report_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('CSV Report downloaded!');
  };

  // Trigger browser print dialog for PDF export
  const handlePrintPDF = () => {
    window.print();
  };

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
      
      {/* Print-only layout container */}
      <div className="hidden print:block text-black bg-white p-8 font-sans">
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-blue-600">DebtFree Statement</h1>
            <p className="text-sm text-gray-500">Your Path to Financial Freedom</p>
          </div>
          <div className="text-right text-sm">
            <p><strong>Report Date:</strong> {new Date().toLocaleDateString('en-IN')}</p>
            <p><strong>Total Liabilities:</strong> {formatCurrency(totalDebt)}</p>
          </div>
        </div>
        
        <h3 className="text-xl font-bold mb-4 text-gray-800">Tracking Summary</h3>
        <table className="w-full text-left border-collapse border mb-8 text-sm">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="p-3 border">Loan Name</th>
              <th className="p-3 border">Interest Rate</th>
              <th className="p-3 border">Original Principal</th>
              <th className="p-3 border">Outstanding Balance</th>
              <th className="p-3 border">Monthly EMI</th>
            </tr>
          </thead>
          <tbody>
            {loans.map(loan => (
              <tr key={loan._id || loan.id} className="border-b">
                <td className="p-3 border font-semibold">{loan.name}</td>
                <td className="p-3 border">{loan.interestRate}%</td>
                <td className="p-3 border">{formatCurrency(loan.principal)}</td>
                <td className="p-3 border text-red-600">{formatCurrency(loan.outstanding)}</td>
                <td className="p-3 border">{formatCurrency(loan.emiAmount)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="grid grid-cols-2 gap-8 text-sm border-t pt-6">
          <div>
            <p className="mb-2"><strong>Total Monthly Commitment:</strong> {formatCurrency(monthlyEMI)}</p>
            <p><strong>Net Monthly Income:</strong> {formatCurrency(income)}</p>
            <p><strong>Debt-to-Income (DTI) Ratio:</strong> {dtiRatio}% ({dtiHealth.label})</p>
          </div>
          <div>
            <p className="mb-2"><strong>Estimated Debt-Free Date:</strong> {formattedDate}</p>
            <p><strong>Total Principal Repaid:</strong> {formatCurrency(totalPaid)} ({percentPaid.toFixed(1)}%)</p>
          </div>
        </div>
      </div>

      {/* Main Screen Layout (hidden during printing) */}
      <div className="print:hidden">
        
        {/* Header Block */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col xl:flex-row justify-between items-start xl:items-center mb-6 gap-4"
        >
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Mission Control</h1>
            <p className="text-slate-400 mt-1 text-sm">Welcome back. Here's your financial overview.</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto">
            <Button 
              onClick={handlePrintPDF}
              variant="outline"
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 border-white/10 hover:bg-white/5 py-2"
            >
              <Printer className="w-4 h-4 text-slate-400" /> Export PDF
            </Button>
            <Button 
              onClick={handleExportCSV}
              variant="outline"
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 border-white/10 hover:bg-white/5 py-2"
            >
              <Download className="w-4 h-4 text-slate-400" /> Export CSV
            </Button>
            <Link to="/loans" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 shadow-[0_0_15px_rgba(37,99,235,0.3)]">
                <Plus className="w-4 h-4" /> Add Loan
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Loan Summary Cards */}
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

        {/* DTI Card and Achievements Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          
          {/* DTI Scorecard Component */}
          <Card className="lg:col-span-1 bg-slate-900/40 border-white/5 backdrop-blur-xl relative overflow-hidden flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-white">DTI Health Ratio</h3>
                <span className={`text-xs px-2 py-0.5 rounded-full font-bold border ${dtiHealth.bgColor} ${dtiHealth.color}`}>
                  {dtiHealth.label}
                </span>
              </div>
              
              <div className="flex flex-col items-center justify-center py-6">
                <ProgressRing 
                  progress={dtiRatio} 
                  size={120} 
                  strokeWidth={10} 
                  progressColor={dtiHealth.progressColor} 
                  trackColor="text-slate-800" 
                />
                
                {/* Income edit area */}
                <div className="mt-4 text-center">
                  {isEditingIncome ? (
                    <div className="flex items-center gap-2 justify-center">
                      <span className="text-slate-500 font-semibold">₹</span>
                      <input 
                        type="number"
                        value={tempIncome}
                        onChange={(e) => setTempIncome(Number(e.target.value))}
                        className="w-24 bg-slate-950 border border-white/10 rounded px-2 py-0.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                      <button 
                        onClick={handleSaveIncome}
                        className="text-xs text-emerald-400 font-bold hover:text-emerald-300"
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400">
                      Based on Net Income of <span className="text-white font-semibold">₹{income.toLocaleString('en-IN')}</span>{' '}
                      <button 
                        onClick={() => {
                          setTempIncome(income);
                          setIsEditingIncome(true);
                        }}
                        className="text-blue-400 hover:text-blue-300 underline font-medium ml-1"
                      >
                        Edit
                      </button>
                    </p>
                  )}
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-400 bg-slate-950/40 p-3 rounded-xl border border-white/5 leading-relaxed">
              {dtiHealth.desc}
            </p>
          </Card>

          {/* Achievements Checklist */}
          <Card className="lg:col-span-2 bg-slate-900/40 border-white/5 backdrop-blur-xl">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-500" /> Milestones & Achievements
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {milestones.map((milestone) => {
                const Icon = milestone.icon;
                return (
                  <div 
                    key={milestone.id}
                    className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 ${
                      milestone.active 
                        ? `bg-gradient-to-br ${milestone.color} shadow-[0_0_15px_rgba(37,99,235,0.02)]` 
                        : 'bg-slate-950/20 border-white/5 opacity-40'
                    }`}
                  >
                    <div className={`p-2.5 rounded-lg border ${
                      milestone.active 
                        ? 'bg-slate-950/30 border-white/10' 
                        : 'bg-slate-950/50 border-white/5 text-slate-600'
                    }`}>
                      {milestone.active ? (
                        <Icon className="w-5 h-5" />
                      ) : (
                        <Lock className="w-5 h-5" />
                      )}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white">{milestone.name}</h4>
                      <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">{milestone.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

        </div>

        {/* Charts block */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
        >
          <DonutChart data={donutData} title="Debt Breakdown" />
          <BarChart data={barData} title="Monthly EMI Breakdown" />
        </motion.div>

        {/* Recent Loans Table */}
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
                    <tr key={loan._id || loan.id} className="border-b border-border/50 last:border-0">
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
      </div>
    </PageWrapper>
  );
}
