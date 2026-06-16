import { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { Loader2 } from 'lucide-react';

const Button = forwardRef(({ 
  className, 
  variant = 'primary', 
  size = 'md', 
  isLoading = false, 
  children, 
  disabled, 
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-300 cubic-bezier(0.16, 1, 0.3, 1) focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.97] active:duration-75";
  
  const variants = {
    primary: "bg-gradient-to-b from-blue-400 to-blue-600 text-white border border-blue-300/20 shadow-[0_4px_12px_rgba(59,130,246,0.2)] hover:shadow-[0_6px_20px_rgba(59,130,246,0.35)] hover:from-blue-300 hover:to-blue-500 focus:ring-blue-500",
    secondary: "bg-gradient-to-b from-blue-600 to-blue-800 text-white border border-blue-500/20 shadow-[0_4px_12px_rgba(29,78,216,0.15)] hover:shadow-[0_6px_20px_rgba(29,78,216,0.3)] hover:from-blue-500 hover:to-blue-700 focus:ring-blue-600",
    accent: "bg-gradient-to-b from-emerald-400 to-emerald-600 text-white border border-emerald-300/20 shadow-[0_4px_12px_rgba(16,185,129,0.2)] hover:shadow-[0_6px_20px_rgba(16,185,129,0.35)] hover:from-emerald-300 hover:to-emerald-500 focus:ring-emerald-500",
    danger: "bg-gradient-to-b from-red-400 to-red-600 text-white border border-red-300/20 shadow-[0_4px_12px_rgba(239,68,68,0.2)] hover:shadow-[0_6px_20px_rgba(239,68,68,0.35)] hover:from-red-300 hover:to-red-500 focus:ring-red-500",
    outline: "border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 text-white hover:border-white/20 focus:ring-slate-500",
    ghost: "bg-transparent hover:bg-white/5 text-white focus:ring-slate-500"
  };

  const sizes = {
    sm: "h-9 px-4 text-sm",
    md: "h-10 px-6 py-2 text-base",
    lg: "h-12 px-8 py-3 text-lg"
  };

  return (
    <button
      ref={ref}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
});

Button.displayName = 'Button';
export default Button;
