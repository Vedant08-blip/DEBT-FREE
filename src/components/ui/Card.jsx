import { cn } from "../../utils/cn";

export default function Card({ className, children, ...props }) {
  return (
    <div 
      className={cn("bg-card rounded-xl shadow-card p-6 border border-border", className)} 
      {...props}
    >
      {children}
    </div>
  );
}
