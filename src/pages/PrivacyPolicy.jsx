import PageWrapper from '../components/layout/PageWrapper';
import { motion } from 'framer-motion';
import { ShieldAlert } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <PageWrapper isProtected={false}>
      <div className="max-w-4xl mx-auto px-6 py-32 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none" />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 glass-card rounded-[3rem] p-12 md:p-16 border-indigo-500/10"
        >
          <div className="flex items-center gap-4 mb-10">
            <div className="w-16 h-16 bg-indigo-500/10 rounded-2xl flex items-center justify-center border border-indigo-500/20">
              <ShieldAlert className="w-8 h-8 text-indigo-400" />
            </div>
            <div>
              <p className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-1">Legal</p>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">Privacy Policy</h1>
            </div>
          </div>
          
          <div className="prose prose-invert prose-slate max-w-none">
            <p className="text-lg text-slate-400 leading-relaxed mb-8">
              Your privacy is our highest priority. DebtFree operates on a strict "Local-First" architecture. 
              We do not connect to your bank accounts, we do not monitor your active loans, and we do not sell your data.
            </p>
            
            <h3 className="text-xl font-bold text-white mb-4 mt-8">1. Data Storage</h3>
            <p className="text-slate-400 leading-relaxed mb-6">
              All financial data entered into the DebtFree dashboard is currently stored locally on your device using browser `localStorage`. 
              If you clear your browser data, your configured dashboards will be reset.
            </p>

            <h3 className="text-xl font-bold text-white mb-4 mt-8">2. Analytics</h3>
            <p className="text-slate-400 leading-relaxed mb-6">
              We may utilize anonymous, aggregated telemetry to understand generic site usage (like page visits), 
              but we have absolutely zero visibility into your personal financial details or loan entries.
            </p>

            <div className="mt-12 p-6 rounded-xl bg-slate-900/50 border border-white/5 text-sm text-slate-500">
              Last Updated: March 2026. If you have questions about this policy, please reach out via our Contact page.
            </div>
          </div>
        </motion.div>
      </div>
    </PageWrapper>
  );
}
