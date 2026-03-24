import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#020617] border-t border-white/5 mt-auto relative overflow-hidden">
      {/* Background glow for the footer */}
      <div className="absolute top-0 right-1/2 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4 group">
              <img src="/logo.png" alt="DebtFree" className="w-8 h-8 object-contain transition-transform group-hover:scale-110" />
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">DebtFree</span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              Empowering you to take control of your debts and build a stronger financial future.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-4">Product</h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><Link to="/simulator" className="hover:text-blue-400 transition-colors">Simulator</Link></li>
              <li><Link to="/strategy" className="hover:text-blue-400 transition-colors">Strategies</Link></li>
              <li><Link to="/dashboard" className="hover:text-amber-400 transition-colors">Dashboard</Link></li>
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
        
        <div className="border-t border-white/5 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} DebtFree. All rights reserved.</p>
          
          <div className="flex flex-col sm:flex-row items-center gap-2 text-slate-400 backdrop-blur-md px-4 py-2 rounded-full border border-white/5 bg-white/5">
            <span>Managed & Developed by</span>
            <a 
              href="https://github.com/vedant08-blip" 
              target="_blank" 
              rel="noopener noreferrer"
              className="relative group font-bold tracking-wide"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-teal-400 group-hover:from-teal-400 group-hover:via-indigo-400 group-hover:to-blue-400 transition-all duration-1000">
                Vedant Trivedi
              </span>
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-blue-400 to-teal-400 group-hover:w-full transition-all duration-500 ease-out shadow-[0_0_12px_rgba(45,212,191,0.8)] rounded-full"></span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
