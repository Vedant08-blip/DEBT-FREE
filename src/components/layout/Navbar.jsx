import { Link } from 'react-router-dom';
import Button from '../ui/Button';

export default function Navbar() {
  return (
    <nav className="w-full bg-card/80 backdrop-blur-md border-b border-border fixed top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">D</span>
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">DebtFree</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-sm font-medium text-text-muted hover:text-text-primary transition-colors">
              Log in
            </Link>
            <Link to="/register">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
