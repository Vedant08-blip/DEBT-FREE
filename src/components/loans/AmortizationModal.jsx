import { useState, useMemo } from 'react';
import Modal from '../ui/Modal';
import Slider from '../ui/Slider';
import Button from '../ui/Button';
import { formatCurrency } from '../../utils/formatCurrency';
import { toast } from 'react-hot-toast';
import { Download, Info, Clock, BadgeAlert, Shield } from 'lucide-react';

export default function AmortizationModal({ isOpen, onClose, loan }) {
  const [extraPayment, setExtraPayment] = useState(0);

  const outstanding = loan?.outstanding || 0;
  const interestRate = loan?.interestRate || 0;
  const emiAmount = loan?.emiAmount || 0;

  // Calculate Amortization schedule dynamically
  const schedule = useMemo(() => {
    if (!loan) return { table: [], totalInterest: 0, monthsLeft: 0 };

    const table = [];
    let balance = outstanding;
    const monthlyRate = (interestRate / 100) / 12;
    const emi = emiAmount;
    const payment = emi + extraPayment;
    let month = 1;
    let totalInterest = 0;

    // Safety limit of 360 months (30 years) to prevent crashes
    while (balance > 0 && month <= 360) {
      const interest = balance * monthlyRate;
      
      // If payment is less than monthly interest, debt increases indefinitely
      if (payment <= interest && monthlyRate > 0) {
        // Return dummy schedule to signal warning
        return { table: [], totalInterest: -1, monthsLeft: -1 };
      }

      const principal = Math.min(payment - interest, balance);
      const actualPayment = principal + interest;
      const endingBalance = balance - principal;
      totalInterest += interest;

      table.push({
        month,
        startingBalance: balance,
        payment: actualPayment,
        interest,
        principal,
        endingBalance
      });

      balance = endingBalance;
      month++;
    }

    return { table, totalInterest, monthsLeft: month - 1 };
  }, [outstanding, interestRate, emiAmount, extraPayment]);

  const baselineSchedule = useMemo(() => {
    if (!loan) return { monthsLeft: 0, totalInterest: 0 };
    
    let balance = outstanding;
    const monthlyRate = (interestRate / 100) / 12;
    const emi = emiAmount;
    let month = 1;
    let totalInterest = 0;

    while (balance > 0 && month <= 360) {
      const interest = balance * monthlyRate;
      if (emi <= interest) return { monthsLeft: -1, totalInterest: -1 };
      const principal = Math.min(emi - interest, balance);
      totalInterest += interest;
      balance -= principal;
      month++;
    }
    return { monthsLeft: month - 1, totalInterest };
  }, [outstanding, interestRate, emiAmount]);

  // Export Amortization Table to CSV
  const handleExportCSV = () => {
    if (!loan || schedule.table.length === 0) {
      toast.error('No schedule data to export');
      return;
    }

    const headers = ['Month', 'Starting Balance (₹)', 'Payment Made (₹)', 'Interest Component (₹)', 'Principal Component (₹)', 'Ending Balance (₹)'];
    const rows = schedule.table.map(row => [
      row.month,
      Math.round(row.startingBalance),
      Math.round(row.payment),
      Math.round(row.interest),
      Math.round(row.principal),
      Math.round(row.endingBalance)
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${loan.name.replace(/\s+/g, '_')}_Amortization_Schedule.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Amortization schedule downloaded!');
  };

  if (!loan) return null;

  const warningMode = schedule.totalInterest === -1;

  // Calculate payoff date projection
  const getPayoffDate = (months) => {
    if (months <= 0) return 'Immediate';
    const date = new Date();
    date.setMonth(date.getMonth() + months);
    return date.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' });
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={`Amortization Schedule: ${loan.name}`}
      className="max-w-4xl"
    >
      <div className="space-y-6">
        
        {/* Dynamic extra payment slider */}
        <div className="p-4 rounded-2xl bg-blue-500/5 border border-blue-500/10 backdrop-blur-md">
          <h4 className="text-sm font-semibold text-white mb-1 flex items-center gap-1.5">
            <Shield className="w-4 h-4 text-blue-400" /> Simulate Extra Payoff Firepower
          </h4>
          <p className="text-xs text-slate-400 mb-4">Increase your monthly payment to see how it cuts down interest and time.</p>
          <Slider
            value={extraPayment}
            onChange={(e) => setExtraPayment(Number(e.target.value))}
            min={0}
            max={Math.min(50000, loan.emiAmount * 2)}
            step={500}
            label="Extra Monthly Payment"
          />
        </div>

        {warningMode ? (
          <div className="p-4 rounded-xl border border-rose-500/20 bg-rose-500/5 text-rose-300 text-xs flex gap-2 items-start">
            <BadgeAlert className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <p>
              <strong>Critical Warning:</strong> Your current simulated payment (EMI + Extra) is too low to cover the monthly interest generated by this loan. Increase your extra payment to decrease the outstanding balance.
            </p>
          </div>
        ) : (
          <>
            {/* Quick Metrics Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-slate-950/40 border border-white/5 p-4 rounded-xl">
                <p className="text-[10px] text-slate-500 uppercase font-semibold tracking-wider flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-blue-400" /> Payoff Timeline
                </p>
                <p className="text-lg font-bold text-white mt-1">
                  {Math.floor(schedule.monthsLeft / 12)}y {schedule.monthsLeft % 12}m
                </p>
                {extraPayment > 0 && baselineSchedule.monthsLeft > 0 && (
                  <p className="text-[10px] text-emerald-400 mt-0.5">
                    Saved {baselineSchedule.monthsLeft - schedule.monthsLeft} Months!
                  </p>
                )}
              </div>

              <div className="bg-slate-950/40 border border-white/5 p-4 rounded-xl">
                <p className="text-[10px] text-slate-500 uppercase font-semibold tracking-wider">Future Interest Cost</p>
                <p className="text-lg font-bold text-rose-400 mt-1">
                  {formatCurrency(schedule.totalInterest)}
                </p>
                {extraPayment > 0 && baselineSchedule.totalInterest > 0 && (
                  <p className="text-[10px] text-emerald-400 mt-0.5">
                    Saved {formatCurrency(Math.max(0, baselineSchedule.totalInterest - schedule.totalInterest))}!
                  </p>
                )}
              </div>

              <div className="bg-slate-950/40 border border-white/5 p-4 rounded-xl">
                <p className="text-[10px] text-slate-500 uppercase font-semibold tracking-wider">Debt Free target</p>
                <p className="text-lg font-bold text-emerald-400 mt-1">
                  {getPayoffDate(schedule.monthsLeft)}
                </p>
                <p className="text-[10px] text-slate-400 mt-0.5">At current payoff pace</p>
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex justify-between items-center">
              <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                <Info className="w-3.5 h-3.5 text-slate-500" /> Showing projected schedule starting from current balance
              </span>
              <Button 
                onClick={handleExportCSV} 
                variant="outline" 
                size="sm"
                className="flex items-center gap-1.5 border-white/5 text-xs py-1.5 h-auto hover:bg-white/5"
              >
                <Download className="w-3.5 h-3.5" /> Download CSV
              </Button>
            </div>

            {/* Scrollable Schedule Table */}
            <div className="border border-white/5 rounded-xl overflow-hidden max-h-[350px] overflow-y-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950/80 sticky top-0 border-b border-white/5 text-slate-400 font-semibold uppercase tracking-wider">
                  <tr>
                    <th className="p-3">Mo</th>
                    <th className="p-3">Starting Balance</th>
                    <th className="p-3">EMI Payment</th>
                    <th className="p-3">Interest Component</th>
                    <th className="p-3">Principal Component</th>
                    <th className="p-3">Ending Balance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.02] text-slate-300">
                  {schedule.table.map(row => (
                    <tr key={row.month} className="hover:bg-white/[0.02] even:bg-white/[0.01] transition-colors">
                      <td className="p-3 font-semibold text-white">{row.month}</td>
                      <td className="p-3">{formatCurrency(row.startingBalance)}</td>
                      <td className="p-3 text-white font-medium">{formatCurrency(row.payment)}</td>
                      <td className="p-3 text-rose-400/90">{formatCurrency(row.interest)}</td>
                      <td className="p-3 text-emerald-400/90">{formatCurrency(row.principal)}</td>
                      <td className="p-3 font-semibold text-slate-400">{formatCurrency(row.endingBalance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        <div className="pt-2 flex justify-end">
          <Button onClick={onClose} variant="outline" size="sm">Close Schedule</Button>
        </div>
      </div>
    </Modal>
  );
}
