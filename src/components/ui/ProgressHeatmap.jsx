import { useState, useMemo } from 'react';
import Card from './Card';
import Modal from './Modal';
import Button from './Button';
import { formatCurrency } from '../../utils/formatCurrency';
import { loanAPI } from '../../utils/api';
import {
  Calendar,
  Zap,
  Sparkles,
  TrendingUp,
  Info,
  Plus,
  Flame,
  CheckCircle,
  Trash2,
  Target,
  Activity
} from 'lucide-react';
import { toast } from 'react-hot-toast';

// Load windfalls from localStorage or initialize defaults
const getStoredWindfalls = () => {
  const stored = localStorage.getItem('custom_windfalls');
  if (!stored) {
    const defaults = [
      { id: 'w-mock-1', date: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], amount: 35000, desc: 'Bonus Windfall Allocation', loanId: 'demo-loan-1' },
      { id: 'w-mock-2', date: new Date(Date.now() - 112 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], amount: 20000, desc: 'Tax Refund Lump Sum', loanId: 'demo-loan-3' },
      { id: 'w-mock-3', date: new Date(Date.now() - 230 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], amount: 50000, desc: 'Freelance Side Hustle Payoff', loanId: 'demo-loan-2' },
      { id: 'w-mock-4', date: new Date(Date.now() - 310 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], amount: 15000, desc: 'Festive Season Extra Payment', loanId: 'demo-loan-4' }
    ];
    localStorage.setItem('custom_windfalls', JSON.stringify(defaults));
    return defaults;
  }
  return JSON.parse(stored);
};

export default function ProgressHeatmap({ loans = [], onRefresh }) {
  const [selectedLoanFilter, setSelectedLoanFilter] = useState('all');
  const [windfalls, setWindfalls] = useState(() => getStoredWindfalls());
  const [selectedCell, setSelectedCell] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAnalyticsPanel, setShowAnalyticsPanel] = useState(false);
  const [hoveredLegend, setHoveredLegend] = useState(null);

  // Form State
  const [newWindfallLoanId, setNewWindfallLoanId] = useState(loans[0]?._id || loans[0]?.id || '');
  const [newWindfallAmount, setNewWindfallAmount] = useState('');
  const [newWindfallDesc, setNewWindfallDesc] = useState('');
  const [newWindfallDate, setNewWindfallDate] = useState(new Date().toISOString().split('T')[0]);

  // Sync loan selection
  useMemo(() => {
    if (loans.length > 0 && !newWindfallLoanId) {
      setNewWindfallLoanId(loans[0]._id || loans[0].id);
    }
  }, [loans, newWindfallLoanId]);

  // Heatmap calculation
  const heatmapData = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const currentDayOfWeek = today.getDay(); // 0 (Sun) - 6 (Sat)
    
    const endDate = new Date(today);
    endDate.setDate(today.getDate() + (6 - currentDayOfWeek));

    const totalDays = 53 * 7;
    const startDate = new Date(endDate);
    startDate.setDate(endDate.getDate() - totalDays + 1);

    const days = [];
    let totalPaidInYear = 0;
    let windfallCountInFilter = 0;
    let activeWeeksCount = 0;

    for (let i = 0; i < totalDays; i++) {
      const cellDate = new Date(startDate);
      cellDate.setDate(startDate.getDate() + i);
      
      const isFuture = cellDate > today;
      let amount = 0;
      let paymentDetails = [];

      if (!isFuture) {
        // 1. Process EMIs
        loans.forEach(loan => {
          const loanId = loan._id || loan.id;
          
          if (selectedLoanFilter !== 'all' && selectedLoanFilter !== loanId) {
            return;
          }

          if (cellDate.getDate() === Number(loan.emiDate)) {
            const storageKey = `emi_paid_${cellDate.getFullYear()}_${cellDate.getMonth()}_${loanId}`;
            const isPaidInStorage = localStorage.getItem(storageKey) === 'true';

            const isCurrentMonth = cellDate.getMonth() === today.getMonth() && cellDate.getFullYear() === today.getFullYear();
            if (isPaidInStorage || (!isCurrentMonth && loan.outstanding > 0)) {
              amount += loan.emiAmount;
              paymentDetails.push({
                id: `emi-${loanId}-${i}`,
                type: 'EMI',
                name: loan.name,
                value: loan.emiAmount,
                loanId: loanId
              });
            }
          }
        });

        // 2. Process Windfalls
        const cellDateString = cellDate.toISOString().split('T')[0];
        windfalls.forEach(w => {
          if (w.date === cellDateString) {
            if (selectedLoanFilter !== 'all' && selectedLoanFilter !== w.loanId) {
              return;
            }

            const targetLoan = loans.find(l => (l._id || l.id) === w.loanId);
            amount += w.amount;
            windfallCountInFilter++;
            paymentDetails.push({
              id: w.id || `windfall-${i}`,
              type: 'Windfall',
              name: w.desc || 'Lump Sum Payment',
              value: w.amount,
              loanId: w.loanId,
              loanName: targetLoan?.name || 'Loan Payoff',
              isCustom: !w.id?.startsWith('w-mock-')
            });
          }
        });
      }

      totalPaidInYear += amount;

      days.push({
        date: cellDate,
        isFuture,
        amount,
        details: paymentDetails
      });
    }

    // Split 371 days into 53 weeks
    const weeks = [];
    for (let i = 0; i < 53; i++) {
      const week = days.slice(i * 7, (i + 1) * 7);
      weeks.push(week);
      
      const hasActivity = week.some(d => d.amount > 0);
      if (hasActivity) {
        activeWeeksCount++;
      }
    }

    const consistencyScore = Math.round((activeWeeksCount / 53) * 100);

    return {
      weeks,
      totalPaidInYear,
      windfallCountInFilter,
      consistencyScore
    };
  }, [loans, windfalls, selectedLoanFilter]);

  const { weeks, totalPaidInYear, windfallCountInFilter, consistencyScore } = heatmapData;

  // Month Labels Row alignment
  const monthLabels = useMemo(() => {
    const labels = [];
    let lastMonth = -1;

    weeks.forEach((week, idx) => {
      const firstDay = week[0].date;
      const currentMonth = firstDay.getMonth();

      if (currentMonth !== lastMonth && (idx === 0 || idx - (labels[labels.length - 1]?.index || 0) > 3)) {
        labels.push({
          label: firstDay.toLocaleDateString('en-US', { month: 'short' }),
          index: idx
        });
        lastMonth = currentMonth;
      }
    });

    return labels;
  }, [weeks]);

  // Determine levels for legend filter styling
  const getCellLevel = (day) => {
    if (day.isFuture || day.amount === 0) return 'none';
    const hasWindfall = day.details.some(d => d.type === 'Windfall');
    if (hasWindfall) return 'windfall';
    if (day.amount <= 5000) return 'level1';
    if (day.amount <= 15000) return 'level2';
    return 'level3';
  };

  const getCellClasses = (day) => {
    if (day.isFuture) {
      return 'bg-slate-950/20 border-transparent cursor-not-allowed';
    }
    if (day.amount === 0) {
      return 'bg-[#0f172a]/60 border-white/[0.02] hover:bg-slate-900/60 hover:border-white/10';
    }

    const hasWindfall = day.details.some(d => d.type === 'Windfall');
    const level = getCellLevel(day);
    const isMuted = hoveredLegend && hoveredLegend !== level;

    let baseStyle = '';
    if (hasWindfall) {
      baseStyle = 'bg-gradient-to-br from-emerald-500 to-teal-400 border-emerald-400/30 shadow-[0_0_8px_rgba(16,185,129,0.2)]';
    } else if (day.amount <= 5000) {
      baseStyle = 'bg-blue-600/15 border-blue-500/20 text-blue-400';
    } else if (day.amount <= 15000) {
      baseStyle = 'bg-blue-500/35 border-blue-400/30 text-blue-300';
    } else {
      baseStyle = 'bg-indigo-500/60 border-indigo-400/40 text-indigo-200';
    }

    return `${baseStyle} transition-all duration-200 ${
      isMuted 
        ? 'opacity-20 scale-[0.8] blur-[0.3px]' 
        : 'scale-100 opacity-100 hover:scale-[1.25] hover:shadow-[0_0_12px_rgba(59,130,246,0.4)] hover:z-10'
    }`;
  };

  const formatCellTooltip = (day) => {
    const formattedDate = day.date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
    if (day.amount === 0) {
      return `No payments on ${formattedDate}`;
    }

    const detailText = day.details
      .map(d => `${d.type === 'Windfall' ? 'Lump Sum' : 'EMI'} for ${d.name || d.loanName}: ${formatCurrency(d.value)}`)
      .join(' + ');

    return `${formattedDate} • Total Paid: ${formatCurrency(day.amount)} (${detailText})`;
  };

  // Log new windfall
  const handleAddWindfall = async (e) => {
    e.preventDefault();
    const amount = Number(newWindfallAmount);
    if (!newWindfallLoanId) {
      toast.error('Please select a loan');
      return;
    }
    if (isNaN(amount) || amount <= 0) {
      toast.error('Please enter a valid payment amount');
      return;
    }
    if (!newWindfallDesc.trim()) {
      toast.error('Please write a brief description');
      return;
    }

    const selectedLoan = loans.find(l => (l._id || l.id) === newWindfallLoanId);
    if (!selectedLoan) {
      toast.error('Loan not found');
      return;
    }

    if (amount > selectedLoan.outstanding) {
      toast.error(`Payment cannot exceed outstanding balance of ${formatCurrency(selectedLoan.outstanding)}`);
      return;
    }

    try {
      const newOutstanding = selectedLoan.outstanding - amount;
      await loanAPI.updateLoan(selectedLoan._id || selectedLoan.id, { outstanding: newOutstanding });

      const newWindfallObj = {
        id: `w-${Date.now()}`,
        date: newWindfallDate,
        amount: amount,
        desc: newWindfallDesc,
        loanId: newWindfallLoanId
      };

      const updatedWindfalls = [newWindfallObj, ...windfalls];
      setWindfalls(updatedWindfalls);
      localStorage.setItem('custom_windfalls', JSON.stringify(updatedWindfalls));

      // Calculate simple interest saved
      const rate = selectedLoan.interestRate / 100;
      const remTenureYears = Math.max(0.5, (selectedLoan.outstanding / (selectedLoan.emiAmount * 12)));
      const interestSaved = Math.round(amount * rate * remTenureYears);

      toast.success(
        <div className="space-y-1">
          <p className="font-bold">Windfall Applied!</p>
          <p className="text-xs text-slate-300">Paid off {formatCurrency(amount)} of {selectedLoan.name}.</p>
          <p className="text-xs text-emerald-400 font-semibold">Saved ~{formatCurrency(interestSaved)} in future interest!</p>
        </div>,
        { duration: 5000 }
      );

      setNewWindfallAmount('');
      setNewWindfallDesc('');
      setShowAddModal(false);

      if (onRefresh) {
        onRefresh();
      }
    } catch (err) {
      toast.error(err.message || 'Failed to apply windfall');
    }
  };

  // Revert/Delete Windfall
  const handleDeleteWindfall = (id, amount, loanId) => {
    const selectedLoan = loans.find(l => (l._id || l.id) === loanId);
    if (!selectedLoan) {
      toast.error('Unable to find associated loan.');
      return;
    }

    try {
      const restoredOutstanding = selectedLoan.outstanding + amount;
      loanAPI.updateLoan(loanId, { outstanding: restoredOutstanding }).then(() => {
        const filtered = windfalls.filter(w => w.id !== id);
        setWindfalls(filtered);
        localStorage.setItem('custom_windfalls', JSON.stringify(filtered));
        toast.success('Windfall reversed and loan balance updated.');
        setSelectedCell(null);
        if (onRefresh) {
          onRefresh();
        }
      });
    } catch {
      toast.error('Failed to reverse transaction.');
    }
  };

  // Analytics
  const analyticsData = useMemo(() => {
    let currentStreak = 0;
    let maxStreak = 0;

    weeks.forEach(week => {
      const hasPayment = week.some(d => d.amount > 0);
      if (hasPayment) {
        currentStreak++;
        if (currentStreak > maxStreak) {
          maxStreak = currentStreak;
        }
      } else {
        currentStreak = 0;
      }
    });

    let totalInterestSaved = 0;
    windfalls.forEach(w => {
      const loan = loans.find(l => (l._id || l.id) === w.loanId);
      if (loan) {
        const rate = loan.interestRate / 100;
        const tenureYears = Math.max(0.5, (loan.outstanding / (loan.emiAmount * 12)));
        totalInterestSaved += (w.amount * rate * tenureYears);
      }
    });

    const avgMonthlyEMI = loans.reduce((a, b) => a + b.emiAmount, 0);
    const totalWindfallsSum = windfalls.reduce((a, b) => a + b.amount, 0);
    const monthsAccelerated = avgMonthlyEMI > 0 ? Math.round(totalWindfallsSum / avgMonthlyEMI) : 0;

    return {
      maxStreak,
      totalInterestSaved: Math.round(totalInterestSaved),
      monthsAccelerated
    };
  }, [weeks, windfalls, loans]);

  const { maxStreak, totalInterestSaved, monthsAccelerated } = analyticsData;

  // Yearly Payoff progress goal
  const totalMonthlyEMI = loans.reduce((a, b) => a + b.emiAmount, 0);
  const yearlyEMITarget = totalMonthlyEMI * 12 || 360000;
  const yearlyPayoffPercentage = Math.min(100, Math.round((totalPaidInYear / yearlyEMITarget) * 100));

  return (
    <Card className="w-full bg-[#0a0f1d]/60 border border-white/[0.06] shadow-xl relative overflow-hidden p-6 sm:p-7">
      
      {/* Decorative gradient blur backdrop */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/5 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-600/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      {/* Header Panel */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/[0.06] pb-5 mb-5">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Activity className="w-5 h-5 text-blue-400 animate-pulse" /> Payoff Consistency Heatmap
          </h3>
          <p className="text-xs text-slate-400 mt-1">Visualize payments and windfalls over the past 365 days. Hover over colors to isolate levels.</p>
        </div>
        
        {/* Controls */}
        <div className="flex flex-wrap items-center gap-3">
          
          {/* Filter dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Track:</span>
            <select
              value={selectedLoanFilter}
              onChange={(e) => setSelectedLoanFilter(e.target.value)}
              className="text-xs bg-slate-900 border border-white/10 rounded-xl text-slate-300 px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all"
            >
              <option value="all">All Loans</option>
              {loans.map(loan => (
                <option key={loan._id || loan.id} value={loan._id || loan.id}>
                  {loan.name}
                </option>
              ))}
            </select>
          </div>

          <Button 
            onClick={() => setShowAnalyticsPanel(!showAnalyticsPanel)}
            variant="outline"
            size="sm"
            className="text-xs font-semibold py-1.5 px-3.5 border-white/10 hover:bg-white/5 transition-all text-slate-300"
          >
            {showAnalyticsPanel ? 'Hide Analytics' : 'Show Analytics'}
          </Button>

          <Button
            onClick={() => setShowAddModal(true)}
            size="sm"
            className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-xs shadow-lg shadow-blue-500/15"
          >
            <Plus className="w-3.5 h-3.5" /> Log Windfall
          </Button>
        </div>
      </div>

      {/* Grid Summary Stats Panel */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        
        {/* Card 1 */}
        <div className="px-4 py-4 rounded-2xl bg-slate-950/45 border border-white/[0.04] flex items-center justify-between hover:border-white/10 transition-all duration-300">
          <div className="space-y-1">
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Past Year Payments</span>
            <p className="text-xl font-extrabold text-white tracking-tight">{formatCurrency(totalPaidInYear)}</p>
          </div>
          <div className="p-2 bg-blue-500/10 rounded-xl border border-blue-500/20 text-blue-400">
            <TrendingUp className="w-4 h-4" />
          </div>
        </div>

        {/* Card 2 */}
        <div className="px-4 py-4 rounded-2xl bg-slate-950/45 border border-white/[0.04] flex items-center justify-between hover:border-white/10 transition-all duration-300">
          <div className="space-y-1">
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Consistency Rating</span>
            <div className="flex items-center gap-2">
              <p className="text-xl font-extrabold text-emerald-400 tracking-tight">{consistencyScore}%</p>
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
          </div>
          <div className="p-2 bg-amber-500/10 rounded-xl border border-amber-500/20 text-amber-400">
            <Zap className="w-4 h-4" />
          </div>
        </div>

        {/* Card 3 */}
        <div className="px-4 py-4 rounded-2xl bg-slate-950/45 border border-white/[0.04] flex items-center justify-between hover:border-white/10 transition-all duration-300">
          <div className="space-y-1">
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Windfalls Logged</span>
            <p className="text-xl font-extrabold text-white tracking-tight">{windfallCountInFilter}</p>
          </div>
          <div className="p-2 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-emerald-400">
            <Sparkles className="w-4 h-4" />
          </div>
        </div>

      </div>

      {/* ==================== ANALYTICS EXPANDABLE PANEL ==================== */}
      {showAnalyticsPanel && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mb-6 bg-slate-950/50 rounded-2xl border border-white/[0.05] p-5 overflow-hidden"
        >
          <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-orange-500" /> Payoff Insights & Acceleration
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            <div className="space-y-2 p-3.5 rounded-xl bg-slate-900/40 border border-white/[0.04]">
              <span className="text-slate-400 font-semibold">Active Weekly Streak:</span>
              <p className="text-lg font-extrabold text-orange-400 flex items-center gap-1.5">
                {maxStreak} Weeks <span className="text-[10px] text-slate-500 font-normal tracking-normal">(consecutive payments)</span>
              </p>
              <p className="text-[10px] text-slate-500 leading-normal">Building continuous payment habit prevents budget fatigue and reduces daily compounding interests.</p>
            </div>

            <div className="space-y-2 p-3.5 rounded-xl bg-slate-900/40 border border-white/[0.04]">
              <span className="text-slate-400 font-semibold">Estimated Interest Saved:</span>
              <p className="text-lg font-extrabold text-emerald-400">
                ~{formatCurrency(totalInterestSaved)}
              </p>
              <p className="text-[10px] text-slate-500 leading-normal">Compounding savings generated by early principal reductions which shave off long-term bank interest margins.</p>
            </div>

            <div className="space-y-2 p-3.5 rounded-xl bg-slate-900/40 border border-white/[0.04]">
              <span className="text-slate-400 font-semibold">Timeline Speed Acceleration:</span>
              <p className="text-lg font-extrabold text-blue-400">
                {monthsAccelerated} Months Shaved Off
              </p>
              <p className="text-[10px] text-slate-500 leading-normal">Your pre-payments directly accelerate your estimated debt-free target date by clearing monthly requirements early.</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Grid container with glassmorphic outline */}
      <div className="bg-[#0b0e1b]/40 border border-white/[0.03] rounded-2xl p-4 sm:p-5 mb-5 relative">
        
        <div className="heatmap-container overflow-x-auto pb-2 scrollbar-thin">
          <div className="min-w-[775px] select-none">
            
            {/* Months labels */}
            <div className="relative h-4 w-full mb-2 text-[9px] text-slate-500 uppercase tracking-widest font-bold">
              {monthLabels.map((item, idx) => (
                <span 
                  key={idx} 
                  className="absolute transition-all duration-300"
                  style={{ left: `${item.index * 14 + 32}px` }}
                >
                  {item.label}
                </span>
              ))}
            </div>

            <div className="flex">
              {/* Days labels - PIXEL PERFECT ALIGNMENT WITH THE GRID ROWS */}
              <div className="flex flex-col gap-[3px] text-[9px] text-slate-500 pr-3 select-none font-bold">
                <div className="w-6 h-[11px] flex items-center justify-end"></div> {/* Sun */}
                <div className="w-6 h-[11px] flex items-center justify-end">Mon</div>
                <div className="w-6 h-[11px] flex items-center justify-end"></div> {/* Tue */}
                <div className="w-6 h-[11px] flex items-center justify-end">Wed</div>
                <div className="w-6 h-[11px] flex items-center justify-end"></div> {/* Thu */}
                <div className="w-6 h-[11px] flex items-center justify-end">Fri</div>
                <div className="w-6 h-[11px] flex items-center justify-end"></div> {/* Sat */}
              </div>

              {/* Heatmap Grid */}
              <div className="flex gap-[3px]">
                {weeks.map((week, wIdx) => (
                  <div key={wIdx} className="flex flex-col gap-[3px]">
                    {week.map((day, dIdx) => (
                      <div 
                        key={dIdx}
                        className="relative group"
                      >
                        {/* Cell grid box */}
                        <div 
                          onClick={() => !day.isFuture && setSelectedCell(day)}
                          className={`w-[11px] h-[11px] rounded-[2px] border cursor-pointer border-black/20 ${getCellClasses(day)}`}
                        />

                        {/* Custom Tooltip */}
                        {!day.isFuture && (
                          <div className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2.5 hidden group-hover:flex flex-col items-center pointer-events-none">
                            <div className="bg-slate-950 text-white text-[10px] py-1.5 px-3 rounded-xl whitespace-nowrap border border-white/10 shadow-2xl font-bold tracking-wide">
                              {formatCellTooltip(day)}
                            </div>
                            <div className="w-1.5 h-1.5 bg-slate-950 border-r border-b border-white/10 rotate-45 -mt-[4px]"></div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>

      </div>

      {/* Legend & Interactive guides */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-slate-500 border-b border-white/[0.04] pb-5 mb-5">
        <span className="flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-blue-400" />
          Click on filled cells to view payments or delete custom windfalls.
        </span>

        {/* Legend */}
        <div className="flex items-center gap-2 select-none">
          <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Filters:</span>
          <span className="text-[10px]">Less</span>
          
          <div 
            onMouseEnter={() => setHoveredLegend('none')}
            onMouseLeave={() => setHoveredLegend(null)}
            className="w-[11px] h-[11px] rounded-[2px] border border-white/[0.02] bg-[#0f172a]/60 transition-all hover:scale-125 cursor-pointer" 
            title="No payments"
          />
          <div 
            onMouseEnter={() => setHoveredLegend('level1')}
            onMouseLeave={() => setHoveredLegend(null)}
            className="w-[11px] h-[11px] rounded-[2px] border border-blue-500/20 bg-blue-600/15 transition-all hover:scale-125 cursor-pointer" 
            title="Payments <= ₹5,000"
          />
          <div 
            onMouseEnter={() => setHoveredLegend('level2')}
            onMouseLeave={() => setHoveredLegend(null)}
            className="w-[11px] h-[11px] rounded-[2px] border border-blue-400/30 bg-blue-500/35 transition-all hover:scale-125 cursor-pointer" 
            title="Payments ₹5,000 - ₹15,000"
          />
          <div 
            onMouseEnter={() => setHoveredLegend('level3')}
            onMouseLeave={() => setHoveredLegend(null)}
            className="w-[11px] h-[11px] rounded-[2px] border border-indigo-400/40 bg-indigo-500/60 transition-all hover:scale-125 cursor-pointer" 
            title="Payments > ₹15,000"
          />
          <div 
            onMouseEnter={() => setHoveredLegend('windfall')}
            onMouseLeave={() => setHoveredLegend(null)}
            className="w-[11px] h-[11px] rounded-[2px] border border-emerald-400/30 bg-gradient-to-br from-emerald-500 to-teal-400 transition-all hover:scale-125 cursor-pointer shadow-[0_0_8px_rgba(16,185,129,0.3)]" 
            title="Windfalls / Lump Sums"
          />
          
          <span className="text-[10px]">More</span>
        </div>
      </div>

      {/* Yearly Payoff Progress Bar */}
      <div className="space-y-2.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-1">
          <span className="text-slate-400 font-semibold flex items-center gap-1.5">
            <Target className="w-4 h-4 text-emerald-400" /> Yearly Payoff Progress Goal
          </span>
          <span className="font-extrabold text-white">
            {formatCurrency(totalPaidInYear)} paid of {formatCurrency(yearlyEMITarget)} scheduled ({yearlyPayoffPercentage}%)
          </span>
        </div>
        <div className="w-full bg-slate-950/65 rounded-full h-3 border border-white/[0.04] p-0.5 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-blue-600 via-indigo-500 to-emerald-400 h-2 rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(37,99,235,0.2)]"
            style={{ width: `${yearlyPayoffPercentage}%` }}
          />
        </div>
        <p className="text-[10px] text-slate-500 leading-normal">
          This progress bar tracks actual payouts made vs. scheduled monthly liabilities (12x total EMIs) for the current financial year. Windfall payments speed this percentage up.
        </p>
      </div>

      {/* ==================== DAY DETAIL PANEL ==================== */}
      {selectedCell && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 bg-slate-950/50 border border-white/[0.05] rounded-2xl p-5"
        >
          <div className="flex justify-between items-center mb-4 border-b border-white/[0.06] pb-3">
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Calendar Date Detail</span>
              <h4 className="text-sm font-bold text-white">
                {selectedCell.date.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
              </h4>
            </div>
            <button 
              onClick={() => setSelectedCell(null)}
              className="text-xs text-slate-500 hover:text-white transition-colors"
            >
              Clear selection
            </button>
          </div>

          {selectedCell.amount === 0 ? (
            <div className="text-center py-6 text-slate-400 text-xs space-y-3">
              <p>No transactions registered on this calendar date.</p>
              <Button 
                onClick={() => {
                  setNewWindfallDate(selectedCell.date.toISOString().split('T')[0]);
                  setShowAddModal(true);
                }}
                size="sm"
                variant="outline"
                className="text-[11px] py-1 px-3 border-white/10"
              >
                Log extra payment for this day
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {selectedCell.details.map((detail, idx) => (
                <div 
                  key={idx} 
                  className="flex items-center justify-between p-3.5 bg-[#0f1423]/40 border border-white/[0.04] rounded-xl text-xs hover:border-white/10 transition-all duration-300"
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-lg ${detail.type === 'Windfall' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'}`}>
                      {detail.type === 'Windfall' ? <Sparkles className="w-4 h-4 animate-spin-slow" /> : <Calendar className="w-4 h-4" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white">{detail.name}</span>
                        <span className="text-[9px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-400">
                          {detail.type}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-500 mt-0.5 font-medium">
                        {detail.type === 'Windfall' ? `Applied towards: ${detail.loanName}` : `Default EMI schedule`}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="font-extrabold text-white text-sm">{formatCurrency(detail.value)}</span>
                    {detail.isCustom && (
                      <button
                        onClick={() => handleDeleteWindfall(detail.id, detail.value, detail.loanId)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-all"
                        title="Delete Extra Payment"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
              
              <div className="bg-emerald-950/10 border border-emerald-500/10 rounded-xl p-3.5 flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  <strong>Consistency Streak Active:</strong> Continuous extra debt repayments result in compounding interest savings. Over time, these payments significantly scale down your debt-free date!
                </p>
              </div>
            </div>
          )}
        </motion.div>
      )}

      {/* ==================== MODAL: LOG WINDFALL / EXTRA PAYMENT ==================== */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Log Windfall or Extra Payoff"
        className="max-w-md bg-slate-950 border border-white/10 text-white"
      >
        {loans.length === 0 ? (
          <div className="text-center py-8 text-slate-400 text-xs">
            <p>No active loans tracking. Please add a loan in the Loans section first.</p>
          </div>
        ) : (
          <form onSubmit={handleAddWindfall} className="space-y-4 p-4 text-xs">
            
            <div className="space-y-1">
              <label className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">Select Target Loan</label>
              <select
                value={newWindfallLoanId}
                onChange={(e) => setNewWindfallLoanId(e.target.value)}
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:ring-1 focus:ring-blue-500/50"
              >
                {loans.map(loan => (
                  <option key={loan._id || loan.id} value={loan._id || loan.id}>
                    {loan.name} (Outstanding: {formatCurrency(loan.outstanding)})
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">Windfall Source / Description</label>
              <input
                type="text"
                placeholder="e.g. Annual Office Bonus, Sold Old Electronics, Tax Refund"
                value={newWindfallDesc}
                onChange={(e) => setNewWindfallDesc(e.target.value)}
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-1 focus:ring-blue-500/50"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">Payment Date</label>
                <input
                  type="date"
                  value={newWindfallDate}
                  onChange={(e) => setNewWindfallDate(e.target.value)}
                  className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-1 focus:ring-blue-500/50"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">Amount Paid</label>
                <input
                  type="number"
                  placeholder="e.g. 25000"
                  value={newWindfallAmount}
                  onChange={(e) => setNewWindfallAmount(e.target.value)}
                  className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-1 focus:ring-blue-500/50"
                  required
                />
              </div>
            </div>

            <div className="bg-blue-950/20 border border-blue-500/10 rounded-xl p-3.5 space-y-1">
              <span className="font-bold text-white flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-amber-400" /> Direct Principal Deduction
              </span>
              <p className="text-[10px] text-slate-400 leading-normal">
                This transaction immediately subtracts from your outstanding balance. Reducing your principal balance directly speeds up your overall interest reduction rate.
              </p>
            </div>

            <div className="flex gap-3 justify-end pt-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowAddModal(false)}
                size="sm"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                size="sm"
                className="bg-blue-600 hover:bg-blue-500"
              >
                Apply Extra Payment
              </Button>
            </div>

          </form>
        )}
      </Modal>

    </Card>
  );
}
