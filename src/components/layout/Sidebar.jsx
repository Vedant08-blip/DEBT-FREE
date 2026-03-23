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
      <aside className="hidden md:flex flex-col w-64 h-screen bg-card border-r border-border fixed left-0 top-0">
        <div className="p-6">
          <Link to="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">D</span>
            </div>
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
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm font-medium",
                  isActive 
                    ? "bg-primary/10 text-primary" 
                    : "text-text-muted hover:bg-slate-50 hover:text-text-primary"
                )}
              >
                <Icon className={cn("w-5 h-5", isActive ? "text-primary" : "text-text-muted")} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50 px-2 py-2 pb-safe">
        <div className="flex items-center justify-around">
          {navItems.slice(0, 5).map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex flex-col items-center justify-center p-2 rounded-lg gap-1",
                  isActive ? "text-primary" : "text-text-muted"
                )}
              >
                <Icon className={cn("w-5 h-5", isActive && "fill-primary/20")} />
                <span className="text-[10px] font-medium">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
