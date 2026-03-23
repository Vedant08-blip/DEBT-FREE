import { forwardRef } from 'react';
import { cn } from '../../utils/cn';

const Input = forwardRef(({ label, error, icon: Icon, className, ...props }, ref) => {
  return (
    <div className={cn("w-full flex flex-col gap-1.5", className)}>
      {label && <label className="text-sm font-medium text-text-primary">{label}</label>}
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-text-muted">
            <Icon className="h-5 w-5" />
          </div>
        )}
        <input
          ref={ref}
          className={cn(
            "flex h-12 w-full rounded-xl border border-border bg-card/60 px-4 py-2 text-sm text-text-primary transition-all duration-200 hover:bg-card focus:bg-card focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary placeholder:text-text-muted disabled:cursor-not-allowed disabled:opacity-50 shadow-sm",
            Icon && "pl-11",
            error && "border-danger focus:ring-danger/20 focus:border-danger"
          )}
          {...props}
        />
      </div>
      {error && <span className="text-xs text-danger mt-0.5 font-medium">{error}</span>}
    </div>
  );
});

Input.displayName = 'Input';
export default Input;
