import LoanCard from './LoanCard';

export default function LoanList({ loans, onEdit, onDelete }) {
  if (!loans || loans.length === 0) {
    return (
      <div className="text-center py-12 bg-card rounded-xl border border-dashed border-border shadow-xl">
        <h3 className="text-lg font-medium text-text-primary mb-2">No loans tracked yet</h3>
        <p className="text-text-muted">Add your first loan to start tracking your debt-free journey.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {loans.map(loan => (
        <LoanCard 
          key={loan._id || loan.id} 
          loan={loan} 
          onEdit={onEdit} 
          onDelete={onDelete} 
        />
      ))}
    </div>
  );
}
