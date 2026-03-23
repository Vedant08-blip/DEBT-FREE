import { useState, useEffect } from 'react';
import PageWrapper from '../components/layout/PageWrapper';
import LoanList from '../components/loans/LoanList';
import LoanForm from '../components/loans/LoanForm';
import Button from '../components/ui/Button';
import { Plus } from 'lucide-react';
import { dummyLoans } from '../data/dummy';
import { toast } from 'react-hot-toast';

export default function MyLoans() {
  const [loans, setLoans] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLoan, setEditingLoan] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('debtfree_loans');
    if (stored) {
      setLoans(JSON.parse(stored));
    } else {
      setLoans(dummyLoans);
      localStorage.setItem('debtfree_loans', JSON.stringify(dummyLoans));
    }
  }, []);

  const saveLoans = (newLoans) => {
    setLoans(newLoans);
    localStorage.setItem('debtfree_loans', JSON.stringify(newLoans));
  };

  const handleOpenAdd = () => {
    setEditingLoan(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (loan) => {
    setEditingLoan(loan);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this loan?")) {
      const updated = loans.filter(l => l.id !== id);
      saveLoans(updated);
      toast.success('Loan deleted completely');
    }
  };

  const handleSaveLoan = (loanData) => {
    if (editingLoan) {
      const updated = loans.map(l => l.id === editingLoan.id ? { ...loanData, id: editingLoan.id } : l);
      saveLoans(updated);
      toast.success('Loan updated successfully');
    } else {
      const newLoan = { ...loanData, id: Date.now() };
      saveLoans([...loans, newLoan]);
      toast.success('Loan added successfully');
    }
  };

  return (
    <PageWrapper isProtected={true}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">My Loans</h1>
          <p className="text-text-muted mt-1">Manage and track your active debts.</p>
        </div>
        <Button onClick={handleOpenAdd} className="w-full sm:w-auto flex justify-center items-center gap-2">
          <Plus className="w-5 h-5" /> Add New Loan
        </Button>
      </div>

      <LoanList 
        loans={loans} 
        onEdit={handleOpenEdit} 
        onDelete={handleDelete} 
      />

      <LoanForm 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveLoan}
        initialData={editingLoan}
      />
    </PageWrapper>
  );
}
