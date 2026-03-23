import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img src="/logo.png" alt="DebtFree" className="w-8 h-8 object-contain" />
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">DebtFree</span>
            </Link>
            <p className="text-text-muted text-sm leading-relaxed">
              Empowering you to take control of your debts and build a stronger financial future.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-text-primary mb-4">Product</h3>
            <ul className="space-y-2 text-sm text-text-muted">
              <li><Link to="/simulator" className="hover:text-primary transition-colors">Simulator</Link></li>
              <li><Link to="/strategy" className="hover:text-primary transition-colors">Strategies</Link></li>
              <li><Link to="/dashboard" className="hover:text-primary transition-colors">Dashboard</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-text-primary mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-text-muted">
              <li><span className="cursor-pointer hover:text-primary transition-colors">About Us</span></li>
              <li><span className="cursor-pointer hover:text-primary transition-colors">Careers</span></li>
              <li><span className="cursor-pointer hover:text-primary transition-colors">Contact</span></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-text-primary mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-text-muted">
              <li><span className="cursor-pointer hover:text-primary transition-colors">Privacy Policy</span></li>
              <li><span className="cursor-pointer hover:text-primary transition-colors">Terms of Service</span></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-text-muted">
          <p>&copy; {new Date().getFullYear()} DebtFree. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
