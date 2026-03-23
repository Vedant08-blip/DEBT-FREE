import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Debt Arsenal</h1>
          <p className="text-slate-400 mt-1">Manage, track, and destroy your active debts.</p>
        </div>
        <Button onClick={handleOpenAdd} className="w-full sm:w-auto flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-500 shadow-[0_0_15px_rgba(37,99,235,0.3)]">
          <Plus className="w-5 h-5" /> Add New Target
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <LoanList 
          loans={loans} 
          onEdit={handleOpenEdit} 
          onDelete={handleDelete} 
        />
      </motion.div>

      <LoanForm 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveLoan}
        initialData={editingLoan}
      />
    </PageWrapper>
  );
}
