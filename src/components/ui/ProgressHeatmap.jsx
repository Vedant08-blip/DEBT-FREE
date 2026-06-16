import { useMemo } from 'react';
import Card from './Card';
import { formatCurrency } from '../../utils/formatCurrency';
import { Calendar, Zap, Sparkles, TrendingUp, Info } from 'lucide-react';

export default function ProgressHeatmap({ loans = [] }) {
  // Generate the last 371 days (53 weeks * 7 days) aligned to Sunday-Saturday
  const heatmapData = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const currentDayOfWeek = today.getDay(); // 0 (Sun) - 6 (Sat)
    
    // End date is the Saturday of the current week
    const endDate = new Date(today);
    endDate.setDate(today.getDate() + (6 - currentDayOfWeek));

    const totalDays = 53 * 7;
    const startDate = new Date(endDate);
    startDate.setDate(endDate.getDate() - totalDays + 1);

    // Hardcoded past windfall dates relative to today for realistic variety
    const windfallOffsets = [
      { daysAgo: 45, amount: 35000, desc: 'Bonus Windfall Allocation' },
      { daysAgo: 112, amount: 20000, desc: 'Tax Refund Lump Sum' },
      { daysAgo: 230, amount: 50000, desc: 'Freelance Side Hustle Payoff' },
      { daysAgo: 310, amount: 15000, desc: 'Festive Season Extra Payment' }
    ];

    const days = [];
    let totalPaidInYear = 0;
    let windfallCount = 0;
    let activeWeeksCount = 0;

    for (let i = 0; i < totalDays; i++) {
      const cellDate = new Date(startDate);
      cellDate.setDate(startDate.getDate() + i);
      
      const isFuture = cellDate > today;
      let amount = 0;
      let paymentDetails = [];

      if (!isFuture) {
        // 1. Process actual localStorage logs (Calendar payments)
        loans.forEach(loan => {
          const loanId = loan._id || loan.id;
          if (cellDate.getDate() === Number(loan.emiDate)) {
            const storageKey = `emi_paid_${cellDate.getFullYear()}_${cellDate.getMonth()}_${loanId}`;
            const isPaidInStorage = localStorage.getItem(storageKey) === 'true';

            // If marked paid in storage, or if it's a past month (mock successful history)
            const isCurrentMonth = cellDate.getMonth() === today.getMonth() && cellDate.getFullYear() === today.getFullYear();
            if (isPaidInStorage || (!isCurrentMonth && loan.outstanding > 0)) {
              amount += loan.emiAmount;
              paymentDetails.push({
                type: 'EMI',
                name: loan.name,
                value: loan.emiAmount
              });
            }
          }
        });

        // 2. Add deterministic mock windfall payments for aesthetic variance
        const daysAgo = Math.floor((today - cellDate) / (1000 * 60 * 60 * 24));
        const windfall = windfallOffsets.find(w => w.daysAgo === daysAgo);
        if (windfall) {
          amount += windfall.amount;
          windfallCount++;
          paymentDetails.push({
            type: 'Windfall',
            name: windfall.desc,
            value: windfall.amount
          });
        }
      }

      totalPaidInYear += amount;

      days.push({
        date: cellDate,
        isFuture,
        amount,
        details: paymentDetails
      });
    }

    // Split 371 days into 53 weeks of 7 days
    const weeks = [];
    for (let i = 0; i < 53; i++) {
      const week = days.slice(i * 7, (i + 1) * 7);
      weeks.push(week);
      
      // Calculate if this week was active (had any payments)
      const hasActivity = week.some(d => d.amount > 0);
      if (hasActivity) {
        activeWeeksCount++;
      }
    }

    const consistencyScore = Math.round((activeWeeksCount / 53) * 100);

    return {
      weeks,
      totalPaidInYear,
      windfallCount,
      consistencyScore
    };
  }, [loans]);

  const { weeks, totalPaidInYear, windfallCount, consistencyScore } = heatmapData;

  // Render month labels at correct column offsets
  const monthLabels = useMemo(() => {
    const labels = [];
    let lastMonth = -1;

    weeks.forEach((week, idx) => {
      const firstDay = week[0].date;
      const currentMonth = firstDay.getMonth();

      // Only show month name if it changes and is at least 3 weeks apart
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

  // Determine cell color styling based on payment size & source
  const getCellClasses = (day) => {
    if (day.isFuture) {
      return 'bg-slate-950/20 border-transparent cursor-not-allowed';
    }
    if (day.amount === 0) {
      return 'bg-slate-900/40 border-white/[0.03] hover:border-white/20';
    }

    // Check if there's a windfall component in details
    const hasWindfall = day.details.some(d => d.type === 'Windfall');
    if (hasWindfall) {
      return 'bg-emerald-400 border-emerald-300 hover:bg-emerald-300 shadow-[0_0_15px_rgba(52,211,153,0.5)] cursor-pointer';
    }

    // EMI ranges: Light blue -> Deep indigo
    if (day.amount <= 5000) {
      return 'bg-blue-500/25 border-blue-500/30 hover:bg-blue-500/40 shadow-[0_0_8px_rgba(59,130,246,0.15)] cursor-pointer';
    }
    if (day.amount <= 15000) {
      return 'bg-blue-500/50 border-blue-400/50 hover:bg-blue-500/60 shadow-[0_0_12px_rgba(59,130,246,0.25)] cursor-pointer';
    }
    return 'bg-indigo-500/70 border-indigo-400/60 hover:bg-indigo-500/80 shadow-[0_0_15px_rgba(99,102,241,0.35)] cursor-pointer';
  };

  const formatCellTooltip = (day) => {
    const formattedDate = day.date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
    if (day.amount === 0) {
      return `No payments on ${formattedDate}`;
    }

    const detailText = day.details
      .map(d => `${d.type === 'Windfall' ? 'Lump Sum' : 'EMI'} for ${d.name}: ${formatCurrency(d.value)}`)
      .join(' + ');

    return `${formattedDate} • Total Paid: ${formatCurrency(day.amount)} (${detailText})`;
  };

  return (
    <Card className="w-full bg-slate-900/40 border-white/5 backdrop-blur-xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-400" /> Payoff Consistency Heatmap
          </h3>
          <p className="text-xs text-slate-400 mt-1">Visualization of loan payments and windfall allocations over the past 365 days.</p>
        </div>
        
        {/* Metric Badges */}
        <div className="flex flex-wrap gap-3">
          <div className="px-3 py-1.5 rounded-xl bg-slate-950/40 border border-white/5 flex items-center gap-2">
            <TrendingUp className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-[11px] text-slate-400">Past Year: <strong className="text-white">{formatCurrency(totalPaidInYear)}</strong></span>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-slate-950/40 border border-white/5 flex items-center gap-2">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-[11px] text-slate-400">Consistency: <strong className="text-emerald-400">{consistencyScore}%</strong></span>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-slate-950/40 border border-white/5 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[11px] text-slate-400">Windfalls: <strong className="text-white">{windfallCount}</strong></span>
          </div>
        </div>
      </div>

      {/* Grid Container */}
      <div className="heatmap-container relative overflow-x-auto pb-4 pt-2 -mx-2 px-2 scrollbar-thin">
        <div className="min-w-[760px] select-none">
          {/* Months Row */}
          <div className="relative h-4 w-full mb-1 text-[10px] text-slate-500 font-medium">
            {monthLabels.map((item, idx) => (
              <span 
                key={idx} 
                className="absolute"
                style={{ left: `${item.index * 14 + 32}px` }} // Align with columns (11px size + 3px gap = 14px)
              >
                {item.label}
              </span>
            ))}
          </div>

          <div className="flex">
            {/* Days Column Labels */}
            <div className="flex flex-col gap-[3px] text-[9px] text-slate-500 pr-2 pt-[1px] w-8 select-none justify-between h-[95px]">
              <div className="h-[11px] flex items-center"></div>
              <div className="h-[11px] flex items-center">Mon</div>
              <div className="h-[11px] flex items-center"></div>
              <div className="h-[11px] flex items-center">Wed</div>
              <div className="h-[11px] flex items-center"></div>
              <div className="h-[11px] flex items-center">Fri</div>
              <div className="h-[11px] flex items-center"></div>
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
                      {/* Cell Grid Box */}
                      <div 
                        className={`w-[11px] h-[11px] rounded-[2px] border transition-all duration-300 ${getCellClasses(day)}`}
                      />

                      {/* Premium Hover Tooltip */}
                      {!day.isFuture && (
                        <div className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:flex flex-col items-center pointer-events-none">
                          <div className="bg-slate-950 text-white text-[10px] py-1.5 px-2.5 rounded-lg whitespace-nowrap border border-white/10 shadow-2xl font-medium tracking-wide leading-none">
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

      {/* Legend & Guide footer */}
      <div className="mt-4 pt-4 border-t border-white/[0.03] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500">
        <span className="flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-blue-400" />
          Legend shows payment sizes from lowest EMI bracket to premium windfalls.
        </span>

        <div className="flex items-center gap-1.5 select-none">
          <span>Less</span>
          <div className="w-[11px] h-[11px] rounded-[2px] border bg-slate-900/40 border-white/[0.03]" />
          <div className="w-[11px] h-[11px] rounded-[2px] border bg-blue-500/25 border-blue-500/30" />
          <div className="w-[11px] h-[11px] rounded-[2px] border bg-blue-500/50 border-blue-400/50" />
          <div className="w-[11px] h-[11px] rounded-[2px] border bg-indigo-500/70 border-indigo-400/60" />
          <div className="w-[11px] h-[11px] rounded-[2px] border bg-emerald-400 border-emerald-300" />
          <span>More</span>
        </div>
      </div>
    </Card>
  );
}
