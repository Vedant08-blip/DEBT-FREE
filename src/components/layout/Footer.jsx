import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/50 mt-auto relative overflow-hidden">
      {/* Background glow for the footer */}
      <div className="absolute top-0 right-1/2 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4 group">
              <img src="/logo.png" alt="DebtFree" className="w-8 h-8 object-contain transition-transform group-hover:scale-110" />
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-accent">DebtFree</span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              Empowering you to take control of your debts and build a stronger financial future.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-4">Product</h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><Link to="/simulator" className="hover:text-primary transition-colors">Simulator</Link></li>
              <li><Link to="/strategy" className="hover:text-primary transition-colors">Strategies</Link></li>
              <li><Link to="/dashboard" className="hover:text-accent transition-colors">Dashboard</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><span className="cursor-pointer hover:text-white transition-colors">Careers</span></li>
              <li><span className="cursor-pointer hover:text-white transition-colors">Contact</span></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><span className="cursor-pointer hover:text-white transition-colors">Privacy Policy</span></li>
              <li><span className="cursor-pointer hover:text-white transition-colors">Terms of Service</span></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800/50 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} DebtFree. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
