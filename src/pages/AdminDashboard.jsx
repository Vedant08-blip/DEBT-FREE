import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PageWrapper from '../components/layout/PageWrapper';
import Card from '../components/ui/Card';
import { authAPI, loanAPI } from '../utils/api';
import { formatCurrency } from '../utils/formatCurrency';
import { toast } from 'react-hot-toast';
import { Users, CreditCard, ShieldCheck } from 'lucide-react';

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [loans, setLoans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userData, loanData] = await Promise.all([
          authAPI.getUsers(),
          loanAPI.getAdminLoans()
        ]);
        setUsers(userData);
        setLoans(loanData);
        setIsLoading(false);
      } catch (err) {
        toast.error(err.message || 'Failed to fetch admin data');
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

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
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          <ShieldCheck className="text-blue-500 w-8 h-8" /> System Control Center
        </h1>
        <p className="text-slate-400 mt-2">Comprehensive overview of all users and financial activities.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-blue-600/10 border-blue-500/20">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-500 rounded-xl">
              <Users className="text-white w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-blue-200">Total Users</p>
              <h2 className="text-2xl font-bold text-white">{users.length}</h2>
            </div>
          </div>
        </Card>
        <Card className="bg-indigo-600/10 border-indigo-500/20">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-500 rounded-xl">
              <CreditCard className="text-white w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-indigo-200">Total Active Loans</p>
              <h2 className="text-2xl font-bold text-white">{loans.length}</h2>
            </div>
          </div>
        </Card>
        <Card className="bg-emerald-600/10 border-emerald-500/20">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-500 rounded-xl">
              <span className="text-white font-bold text-xl">₹</span>
            </div>
            <div>
              <p className="text-sm text-emerald-200">Total System Debt</p>
              <h2 className="text-2xl font-bold text-white">
                {formatCurrency(loans.reduce((acc, l) => acc + l.outstanding, 0))}
              </h2>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card title="Global User Directory">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 text-slate-400">
                  <th className="pb-3 px-2">Name</th>
                  <th className="pb-3 px-2">Email</th>
                  <th className="pb-3 px-2 text-right">Registered</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {users.map(u => (
                  <tr key={u._id} className="text-slate-300">
                    <td className="py-4 px-2 font-medium">{u.name}</td>
                    <td className="py-4 px-2">{u.email}</td>
                    <td className="py-4 px-2 text-right text-xs">
                      {new Date(u.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card title="System-Wide Loans">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 text-slate-400">
                  <th className="pb-3 px-2">Owner</th>
                  <th className="pb-3 px-2">Loan Name</th>
                  <th className="pb-3 px-2 text-right">Outstanding</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {loans.map(l => (
                  <tr key={l._id} className="text-slate-300">
                    <td className="py-4 px-2 font-medium">{l.user?.name || 'Unknown'}</td>
                    <td className="py-4 px-2">{l.name}</td>
                    <td className="py-4 px-2 text-right text-emerald-400 font-semibold">
                      {formatCurrency(l.outstanding)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </PageWrapper>
  );
}
