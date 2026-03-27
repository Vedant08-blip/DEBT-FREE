import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PageWrapper from '../components/layout/PageWrapper';
import LoanList from '../components/loans/LoanList';
import LoanForm from '../components/loans/LoanForm';
import Button from '../components/ui/Button';
import { Plus } from 'lucide-react';
import { loanAPI } from '../utils/api';
import { toast } from 'react-hot-toast';

export default function MyLoans() {
  const [loans, setLoans] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLoan, setEditingLoan] = useState(null);

  useEffect(() => {
    fetchLoans();
  }, []);

  const fetchLoans = async () => {
    try {
      const data = await loanAPI.getLoans();
      setLoans(data);
    } catch (err) {
      toast.error(err.message || 'Failed to fetch loans');
    }
  };


  const handleOpenAdd = () => {
    setEditingLoan(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (loan) => {
    setEditingLoan(loan);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this loan?")) {
      try {
        await loanAPI.deleteLoan(id);
        setLoans(loans.filter(l => (l._id || l.id) !== id));
        toast.success('Loan deleted completely');
      } catch (err) {
        toast.error(err.message || 'Failed to delete loan');
      }
    }
  };

  const handleSaveLoan = async (loanData) => {
    try {
      if (editingLoan) {
        const id = editingLoan._id || editingLoan.id;
        const updated = await loanAPI.updateLoan(id, loanData);
        setLoans(loans.map(l => (l._id || l.id) === id ? updated : l));
        toast.success('Loan updated successfully');
      } else {
        const newLoan = await loanAPI.createLoan(loanData);
        setLoans([...loans, newLoan]);
        toast.success('Loan added successfully');
      }
      setIsModalOpen(false);
    } catch (err) {
      toast.error(err.message || 'Failed to save loan');
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
