import { useState, useEffect } from 'react';
import Modal from '../ui/Modal';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { calcEMI } from '../../utils/calcEMI';

const defaultFormState = {
  name: '',
  type: 'personal',
  principal: '',
  outstanding: '',
  interestRate: '',
  emiAmount: '',
  tenureMonths: '',
  emiDate: ''
};

export default function LoanForm({ isOpen, onClose, onSave, initialData }) {
  const [formData, setFormData] = useState(defaultFormState);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData(initialData);
      } else {
        setFormData(defaultFormState);
      }
      setErrors({});
    }
  }, [isOpen, initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Auto-calculate EMI if missing but other parts are present
    if (name === 'principal' || name === 'interestRate' || name === 'tenureMonths') {
      const p = name === 'principal' ? Number(value) : Number(formData.principal);
      const r = name === 'interestRate' ? Number(value) : Number(formData.interestRate);
      const n = name === 'tenureMonths' ? Number(value) : Number(formData.tenureMonths);
      
      if (p > 0 && r > 0 && n > 0 && (!formData.emiAmount || formData.emiAmount === '0')) {
        const calculatedEMI = calcEMI(p, r, n);
        setFormData(prev => ({ ...prev, emiAmount: calculatedEMI }));
      }
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.principal || formData.principal <= 0) newErrors.principal = 'Valid principal required';
    if (!formData.outstanding || formData.outstanding <= 0) newErrors.outstanding = 'Valid outstanding required';
    if (!formData.interestRate || formData.interestRate <= 0) newErrors.interestRate = 'Valid rate required';
    if (!formData.emiAmount || formData.emiAmount <= 0) newErrors.emiAmount = 'Valid EMI required';
    if (!formData.emiDate || formData.emiDate < 1 || formData.emiDate > 31) newErrors.emiDate = 'Date must be 1-31';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSave({
        ...formData,
        principal: Number(formData.principal),
        outstanding: Number(formData.outstanding),
        interestRate: Number(formData.interestRate),
        emiAmount: Number(formData.emiAmount),
        tenureMonths: Number(formData.tenureMonths),
        emiDate: Number(formData.emiDate),
      });
      onClose();
    }
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={initialData ? "Edit Loan" : "Add New Loan"}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Loan Name"
          name="name"
          placeholder="e.g. HDFC Home Loan"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
        />
        
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-text-primary">Loan Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="flex h-10 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="personal">Personal Loan</option>
            <option value="home">Home Loan</option>
            <option value="car">Car/Auto Loan</option>
            <option value="education">Education Loan</option>
            <option value="credit">Credit Card Debt</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Principal Amount (₹)"
            name="principal"
            type="number"
            value={formData.principal}
            onChange={handleChange}
            error={errors.principal}
          />
          <Input
            label="Outstanding Amount (₹)"
            name="outstanding"
            type="number"
            value={formData.outstanding}
            onChange={handleChange}
            error={errors.outstanding}
          />
          <Input
            label="Interest Rate (%)"
            name="interestRate"
            type="number"
            step="0.01"
            value={formData.interestRate}
            onChange={handleChange}
            error={errors.interestRate}
          />
          <Input
            label="Tenure (Months)"
            name="tenureMonths"
            type="number"
            value={formData.tenureMonths}
            onChange={handleChange}
            error={errors.tenureMonths}
          />
          <Input
            label="Monthly EMI (₹)"
            name="emiAmount"
            type="number"
            value={formData.emiAmount}
            onChange={handleChange}
            error={errors.emiAmount}
          />
          <Input
            label="EMI Date (1-31)"
            name="emiDate"
            type="number"
            value={formData.emiDate}
            onChange={handleChange}
            error={errors.emiDate}
          />
        </div>

        <div className="pt-4 flex justify-end gap-3">
          <Button variant="outline" type="button" onClick={onClose}>Cancel</Button>
          <Button variant="primary" type="submit">
            {initialData ? "Save Changes" : "Add Loan"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
