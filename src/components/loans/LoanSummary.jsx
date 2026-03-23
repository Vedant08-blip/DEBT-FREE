import Card from '../ui/Card';
import { formatCurrency } from '../../utils/formatCurrency';
import { TrendingUp, Wallet, CalendarDays, Receipt } from 'lucide-react';

export default function LoanSummary({ totalDebt, monthlyEMI, loansCount, debtFreeDate }) {
  const stats = [
    {
      title: "Total Outstanding Debt",
      value: formatCurrency(totalDebt || 0),
      icon: Wallet,
      color: "text-danger",
      bg: "bg-red-50"
    },
    {
      title: "Monthly EMI",
      value: formatCurrency(monthlyEMI || 0),
      icon: Receipt,
      color: "text-warning",
      bg: "bg-amber-50"
    },
    {
      title: "Active Loans",
      value: loansCount || 0,
      icon: TrendingUp,
      color: "text-primary",
      bg: "bg-blue-50"
    },
    {
      title: "Est. Debt Free Date",
      value: debtFreeDate || "N/A",
      icon: CalendarDays,
      color: "text-accent",
      bg: "bg-emerald-50"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className="flex items-center gap-4 p-5">
            <div className={`p-3 rounded-xl ${stat.bg}`}>
              <Icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-sm font-medium text-text-muted">{stat.title}</p>
              <p className="text-xl font-bold text-text-primary">{stat.value}</p>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
