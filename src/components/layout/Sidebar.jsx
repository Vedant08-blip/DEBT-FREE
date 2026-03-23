import { Link, useLocation } from 'react-router-dom';
import { Home, PieChart, Calculator, Bell, User, LayoutDashboard, WalletCards } from 'lucide-react';
import { cn } from '../../utils/cn';

const navItems = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'My Loans', path: '/loans', icon: WalletCards },
  { name: 'Strategy', path: '/strategy', icon: PieChart },
  { name: 'Simulator', path: '/simulator', icon: Calculator },
  { name: 'Reminders', path: '/reminders', icon: Bell },
  { name: 'Profile', path: '/profile', icon: User },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 h-screen bg-slate-950/40 backdrop-blur-2xl border-r border-white/5 fixed left-0 top-0 z-40 shadow-2xl">
        <div className="p-6">
          <Link to="/dashboard" className="flex items-center gap-2">
            <img src="/logo.png" alt="DebtFree" className="w-8 h-8 object-contain" />
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">DebtFree</span>
          </Link>
        </div>
        
        <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 text-sm font-medium",
                  isActive 
                    ? "bg-blue-500/15 text-blue-400 border border-blue-500/20 shadow-[0_0_15px_rgba(37,99,235,0.1)]" 
                    : "text-slate-400 hover:bg-white/5 hover:text-white border border-transparent"
                )}
              >
                <Icon className={cn("w-5 h-5", isActive ? "text-blue-400" : "text-slate-400")} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-950/60 backdrop-blur-2xl border-t border-white/10 z-50 px-2 py-2 pb-safe">
        <div className="flex items-center justify-around">
          {navItems.slice(0, 5).map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-300",
                  isActive ? "text-blue-400 bg-blue-500/10" : "text-slate-400 hover:text-white"
                )}
              >
                <div className={cn(
                  "p-1.5 rounded-lg transition-all",
                  isActive ? "bg-blue-500/20 shadow-[0_0_10px_rgba(37,99,235,0.2)]" : "bg-transparent"
                )}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-medium">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
