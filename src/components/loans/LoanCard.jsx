import { Edit, Trash2 } from 'lucide-react';
import Card from '../ui/Card';
import ProgressBar from '../ui/ProgressBar';
import Badge from '../ui/Badge';
import { formatCurrency } from '../../utils/formatCurrency';

export default function LoanCard({ loan, onEdit, onDelete }) {
  const percentPaid = loan.principal > 0 
    ? Math.max(0, 100 - (loan.outstanding / loan.principal) * 100) 
    : 0;

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold text-lg text-text-primary">{loan.name}</h3>
          <Badge variant="secondary" className="mt-1 capitalize">{loan.type} Loan</Badge>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => onEdit(loan)} 
            className="p-1.5 text-text-muted hover:text-primary transition-colors rounded-lg hover:bg-slate-100"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button 
            onClick={() => onDelete(loan._id || loan.id)} 
            className="p-1.5 text-text-muted hover:text-danger transition-colors rounded-lg hover:bg-red-50"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-text-muted mb-1">Outstanding</p>
            <p className="font-semibold text-danger">{formatCurrency(loan.outstanding)}</p>
          </div>
          <div>
            <p className="text-xs text-text-muted mb-1">Monthly EMI</p>
            <p className="font-semibold text-text-primary">{formatCurrency(loan.emiAmount)}</p>
          </div>
          <div>
            <p className="text-xs text-text-muted mb-1">Interest Rate</p>
            <p className="font-semibold text-text-primary">{loan.interestRate}%</p>
          </div>
          <div>
            <p className="text-xs text-text-muted mb-1">EMI Date</p>
            <p className="font-semibold text-text-primary">{loan.emiDate}th</p>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-xs text-text-muted mb-1.5">
            <span>Payoff Progress</span>
            <span>{percentPaid.toFixed(1)}%</span>
          </div>
          <ProgressBar progress={percentPaid} />
        </div>
      </div>
    </Card>
  );
}
