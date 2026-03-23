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
  const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
  
  const variants = {
    primary: "bg-primary text-white hover:bg-secondary focus:ring-primary",
    secondary: "bg-secondary text-white hover:bg-primary focus:ring-secondary",
    accent: "bg-accent text-white hover:bg-emerald-600 focus:ring-accent",
    danger: "bg-danger text-white hover:bg-red-600 focus:ring-danger",
    outline: "border-2 border-border bg-transparent hover:bg-slate-50 text-text-primary focus:ring-slate-400",
    ghost: "bg-transparent hover:bg-slate-100 text-text-primary focus:ring-slate-400"
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
