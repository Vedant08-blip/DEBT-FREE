import { cn } from "../../utils/cn";

export default function Badge({ children, variant = 'primary', className, ...props }) {
  const variants = {
    primary: "bg-blue-100 text-primary",
    success: "bg-emerald-100 text-accent",
    warning: "bg-amber-100 text-warning",
    danger: "bg-red-100 text-danger",
    secondary: "bg-indigo-100 text-secondary",
    neutral: "bg-slate-100 text-text-muted",
  };

  return (
    <span 
      className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold", variants[variant], className)}
      {...props}
    >
      {children}
    </span>
  );
}
