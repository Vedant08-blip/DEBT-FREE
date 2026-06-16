import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageWrapper from '../components/layout/PageWrapper';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { loanAPI } from '../utils/api';
import { formatCurrency } from '../utils/formatCurrency';
import { toast } from 'react-hot-toast';
import { ChevronLeft, ChevronRight, CheckCircle2, AlertCircle, Calendar as CalendarIcon, Info } from 'lucide-react';

export default function Calendar() {
  const [loans, setLoans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);
  
  // Track paid status of EMIs in local storage for this month/year combination
  // Format key: emi_paid_year_month_loanId
  const [paidStatus, setPaidStatus] = useState({});

  const fetchLoans = async () => {
    try {
      const data = await loanAPI.getLoans();
      setLoans(data);
      setIsLoading(false);
    } catch (err) {
      toast.error(err.message || 'Failed to fetch loans');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLoans();
  }, []);

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  // Load paid state from localStorage for the current month
  useEffect(() => {
    const status = {};
    loans.forEach(loan => {
      const key = `emi_paid_${currentYear}_${currentMonth}_${loan._id || loan.id}`;
      status[loan._id || loan.id] = localStorage.getItem(key) === 'true';
    });
    setPaidStatus(status);
  }, [loans, currentYear, currentMonth]);

  const daysInMonth = useMemo(() => {
    return new Date(currentYear, currentMonth + 1, 0).getDate();
  }, [currentYear, currentMonth]);

  const firstDayIndex = useMemo(() => {
    // 0 = Sunday, 1 = Monday, etc.
    return new Date(currentYear, currentMonth, 1).getDay();
  }, [currentYear, currentMonth]);

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Helper to get loans due on a specific day
  const getLoansDueOnDay = (day) => {
    return loans.filter(loan => Number(loan.emiDate) === day && loan.outstanding > 0);
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
    setSelectedDay(null);
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
    setSelectedDay(null);
  };

  const handleMarkAsPaid = async (loan) => {
    const loanId = loan._id || loan.id;
    const key = `emi_paid_${currentYear}_${currentMonth}_${loanId}`;
    
    // Check if already paid this month
    if (paidStatus[loanId]) {
      toast.error('EMI already marked as paid for this month.');
      return;
    }

    try {
      // Calculate new outstanding balance
      const newOutstanding = Math.max(0, loan.outstanding - loan.emiAmount);
      
      // Update on database/API
      await loanAPI.updateLoan(loanId, {
        ...loan,
        outstanding: newOutstanding
      });

      // Persist paid status in localStorage
      localStorage.setItem(key, 'true');
      setPaidStatus(prev => ({ ...prev, [loanId]: true }));
      
      toast.success(`Success! Paid ${formatCurrency(loan.emiAmount)} towards ${loan.name}.`);
      
      // Refresh data
      await fetchLoans();
    } catch (err) {
      toast.error(err.message || 'Failed to update payment.');
    }
  };

  // Calendar calendar days array
  const calendarDays = useMemo(() => {
    const days = [];
    
    // Padding for previous month's empty spaces
    for (let i = 0; i < firstDayIndex; i++) {
      days.push({ day: null, isCurrentMonth: false });
    }
    
    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      const dayLoans = getLoansDueOnDay(i);
      days.push({ 
        day: i, 
        isCurrentMonth: true,
        loansDue: dayLoans,
        hasDue: dayLoans.length > 0,
        allPaid: dayLoans.length > 0 && dayLoans.every(l => paidStatus[l._id || l.id])
      });
    }

    return days;
  }, [daysInMonth, firstDayIndex, loans, paidStatus]);

  const upcomingChecklist = useMemo(() => {
    return loans
      .filter(loan => loan.outstanding > 0)
      .sort((a, b) => Number(a.emiDate) - Number(b.emiDate));
  }, [loans]);

  if (isLoading) {
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
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-2">
          <CalendarIcon className="w-8 h-8 text-blue-500" /> Payoff Calendar & Checklist
        </h1>
        <p className="text-slate-400 mt-1">Track monthly payments and check off EMIs to crush your outstanding balance.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Calendar Grid Container */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-slate-900/40 border-white/5 backdrop-blur-xl">
            {/* Header Control */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">
                {monthNames[currentMonth]} {currentYear}
              </h2>
              <div className="flex items-center gap-2">
                <button 
                  onClick={handlePrevMonth}
                  className="p-2 text-slate-400 hover:text-white rounded-lg bg-white/5 border border-white/10 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button 
                  onClick={handleNextMonth}
                  className="p-2 text-slate-400 hover:text-white rounded-lg bg-white/5 border border-white/10 transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Days of Week Header */}
            <div className="grid grid-cols-7 gap-2 text-center text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
              <div>Sun</div>
              <div>Mon</div>
              <div>Tue</div>
              <div>Wed</div>
              <div>Thu</div>
              <div>Fri</div>
              <div>Sat</div>
            </div>

            {/* Calendar Cells */}
            <div className="grid grid-cols-7 gap-2">
              {calendarDays.map((cell, idx) => {
                if (!cell.day) {
                  return <div key={`empty-${idx}`} className="h-16 sm:h-20 bg-slate-950/20 border border-transparent rounded-xl"></div>;
                }

                const isSelected = selectedDay === cell.day;
                const isToday = new Date().getDate() === cell.day && new Date().getMonth() === currentMonth && new Date().getFullYear() === currentYear;
                
                let cellBg = "bg-slate-950/40 hover:bg-slate-900/60 border-white/5";
                let textStyle = "text-slate-300";

                if (cell.hasDue) {
                  if (cell.allPaid) {
                    cellBg = "bg-emerald-500/10 hover:bg-emerald-500/15 border-emerald-500/20";
                    textStyle = "text-emerald-400 font-bold";
                  } else {
                    cellBg = "bg-rose-500/10 hover:bg-rose-500/15 border-rose-500/25 animate-pulse-subtle";
                    textStyle = "text-rose-400 font-bold";
                  }
                }

                if (isSelected) {
                  cellBg = "bg-blue-500/20 border-blue-500/50";
                } else if (isToday) {
                  cellBg += " ring-2 ring-primary/50";
                }

                return (
                  <motion.div
                    whileHover={{ scale: cell.day ? 1.02 : 1 }}
                    whileTap={{ scale: cell.day ? 0.98 : 1 }}
                    key={`day-${cell.day}`}
                    onClick={() => cell.day && setSelectedDay(cell.day)}
                    className={`h-16 sm:h-20 p-2 border rounded-xl flex flex-col justify-between cursor-pointer transition-all ${cellBg}`}
                  >
                    <span className={`text-sm ${textStyle}`}>{cell.day}</span>
                    {cell.hasDue && (
                      <div className="flex gap-1 justify-end">
                        {cell.loansDue.map(l => (
                          <div 
                            key={l._id || l.id} 
                            className={`w-2 h-2 rounded-full ${paidStatus[l._id || l.id] ? 'bg-emerald-500' : 'bg-rose-500'}`} 
                            title={l.name}
                          />
                        ))}
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </Card>

          {/* Selected Day Info Drawer */}
          <AnimatePresence mode="wait">
            {selectedDay && (
              <motion.div
                key={selectedDay}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
              >
                <Card className="bg-slate-900/60 border-blue-500/10">
                  <h3 className="text-lg font-bold text-white mb-4">
                    Due on {selectedDay} {monthNames[currentMonth]}
                  </h3>
                  
                  {getLoansDueOnDay(selectedDay).length > 0 ? (
                    <div className="space-y-4">
                      {getLoansDueOnDay(selectedDay).map(loan => {
                        const loanId = loan._id || loan.id;
                        const isPaid = paidStatus[loanId];
                        return (
                          <div key={loanId} className="flex justify-between items-center p-4 bg-slate-950/50 rounded-xl border border-white/5">
                            <div>
                              <p className="font-semibold text-white">{loan.name}</p>
                              <p className="text-xs text-slate-400 mt-0.5">
                                EMI: {formatCurrency(loan.emiAmount)} | Balance: {formatCurrency(loan.outstanding)}
                              </p>
                            </div>
                            <div className="flex items-center gap-3">
                              {isPaid ? (
                                <Badge variant="success" className="flex items-center gap-1 bg-emerald-500/20 text-emerald-300">
                                  <CheckCircle2 className="w-3.5 h-3.5" /> Paid
                                </Badge>
                              ) : (
                                <>
                                  <Badge variant="danger" className="flex items-center gap-1 bg-rose-500/20 text-rose-300">
                                    <AlertCircle className="w-3.5 h-3.5" /> Due
                                  </Badge>
                                  <Button 
                                    size="sm"
                                    onClick={() => handleMarkAsPaid(loan)}
                                    className="bg-emerald-600 hover:bg-emerald-500 py-1.5 h-auto text-xs"
                                  >
                                    Mark Paid
                                  </Button>
                                </>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-sm text-slate-400 flex items-center gap-2">
                      <Info className="w-4 h-4 text-blue-400" /> No payments scheduled for this date.
                    </p>
                  )}
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Monthly Checklist Panel */}
        <div className="space-y-6">
          <Card className="bg-slate-900/40 border-white/5 backdrop-blur-xl h-full flex flex-col">
            <div className="mb-4">
              <h2 className="text-xl font-bold text-white">Monthly Checklist</h2>
              <p className="text-xs text-slate-400 mt-0.5">Crush your scheduled payments for this billing cycle.</p>
            </div>
            
            <div className="flex-1 space-y-3 overflow-y-auto max-h-[500px] pr-1">
              {upcomingChecklist.length > 0 ? (
                upcomingChecklist.map(loan => {
                  const loanId = loan._id || loan.id;
                  const isPaid = paidStatus[loanId];
                  return (
                    <div 
                      key={loanId} 
                      className={`p-4 rounded-xl border transition-all ${
                        isPaid 
                          ? 'bg-emerald-500/5 border-emerald-500/10 opacity-70' 
                          : 'bg-slate-950/60 border-white/5 hover:border-white/10'
                      }`}
                    >
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-white text-sm">{loan.name}</span>
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-white/5">
                              Due: {loan.emiDate}th
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400 mt-1">
                            EMI: <span className="text-white font-medium">{formatCurrency(loan.emiAmount)}</span>
                          </p>
                          <p className="text-[11px] text-slate-400 mt-0.5">
                            Remaining: <span className="text-rose-400 font-semibold">{formatCurrency(loan.outstanding)}</span>
                          </p>
                        </div>
                        
                        <div className="flex flex-col items-end gap-2">
                          {isPaid ? (
                            <div className="text-emerald-400 p-1 bg-emerald-500/10 rounded-lg">
                              <CheckCircle2 className="w-5 h-5" />
                            </div>
                          ) : (
                            <button
                              onClick={() => handleMarkAsPaid(loan)}
                              className="w-5 h-5 rounded-md border border-slate-600 hover:border-emerald-500 flex items-center justify-center transition-all bg-transparent group"
                            >
                              <div className="w-3 h-3 rounded-sm bg-transparent group-hover:bg-emerald-500/40 transition-all" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-12 text-slate-500">
                  <CalendarIcon className="w-12 h-12 mx-auto mb-2 opacity-30" />
                  <p className="text-sm">No active loans found. Add some loans to begin tracking payments!</p>
                </div>
              )}
            </div>
          </Card>
        </div>

      </div>
    </PageWrapper>
  );
}
