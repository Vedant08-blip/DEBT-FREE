import PageWrapper from '../components/layout/PageWrapper';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';

export default function TermsOfService() {
  return (
    <PageWrapper isProtected={false}>
      <div className="max-w-4xl mx-auto px-6 py-32 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-slate-600/5 blur-[120px] rounded-full pointer-events-none" />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 glass-card rounded-[3rem] p-12 md:p-16 border-white/5"
        >
          <div className="flex items-center gap-4 mb-10">
            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
              <FileText className="w-8 h-8 text-slate-300" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Legal</p>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">Terms of Service</h1>
            </div>
          </div>
          
          <div className="prose prose-invert prose-slate max-w-none">
            <p className="text-lg text-slate-400 leading-relaxed mb-8">
              By accessing and using this application, you accept and agree to be bound by the terms and provision of this agreement.
            </p>
            
            <h3 className="text-xl font-bold text-white mb-4 mt-8">1. Not Financial Advice</h3>
            <p className="text-slate-400 leading-relaxed mb-6">
              The tools, calculators, and visualizations provided by DebtFree are for educational and informational purposes only. 
              They do not constitute professional financial advice. Always consult with a certified financial planner.
            </p>

            <h3 className="text-xl font-bold text-white mb-4 mt-8">2. Accuracy of Information</h3>
            <p className="text-slate-400 leading-relaxed mb-6">
              While we strive to ensure the mathematical accuracy of our simulators, we cannot guarantee completely flawless calculations 
              under every specific loan condition (like variable interest rates or complex fee structures).
            </p>

            <div className="mt-12 p-6 rounded-xl bg-slate-900/50 border border-white/5 text-sm text-slate-500">
              Last Updated: March 2026. Continued use of the platform constitutes agreement to these terms.
            </div>
          </div>
        </motion.div>
      </div>
    </PageWrapper>
  );
}
