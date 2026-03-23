import { forwardRef } from 'react';
import { cn } from '../../utils/cn';

const Input = forwardRef(({ label, error, className, ...props }, ref) => {
  return (
    <div className={cn("w-full flex flex-col gap-1.5", className)}>
      {label && <label className="text-sm font-medium text-text-primary">{label}</label>}
      <input
        ref={ref}
        className={cn(
          "flex h-10 w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder:text-text-muted disabled:cursor-not-allowed disabled:opacity-50",
          error && "border-danger focus:ring-danger"
        )}
        {...props}
      />
      {error && <span className="text-xs text-danger mt-0.5">{error}</span>}
    </div>
  );
});

Input.displayName = 'Input';
export default Input;
