import PageWrapper from '../components/layout/PageWrapper';
import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';

export default function Careers() {
  return (
    <PageWrapper isProtected={false}>
      <div className="max-w-4xl mx-auto px-6 py-32 relative text-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-600/5 blur-[120px] rounded-full pointer-events-none" />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 glass-card rounded-[3rem] p-16 border-emerald-500/10 shadow-[0_0_40px_rgba(16,185,129,0.05)]"
        >
          <div className="w-20 h-20 mx-auto bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-8 border border-emerald-500/20">
            <Briefcase className="w-10 h-10 text-emerald-400" />
          </div>
          <h1 className="text-5xl font-extrabold tracking-tight mb-6">
            Join the <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Mission</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-12">
            We're building the ultimate financial command center to help millions achieve debt-free freedom. 
            Currently, we have no open roles, but we're always looking for extraordinary talent.
          </p>
          
          <button className="px-8 py-4 rounded-xl font-bold text-white transition-all bg-slate-800 hover:bg-slate-700 hover:scale-105 border border-white/10">
            Check Back Later
          </button>
        </motion.div>
      </div>
    </PageWrapper>
  );
}
