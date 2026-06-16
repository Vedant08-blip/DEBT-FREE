import { cn } from "../../utils/cn";

export default function Card({ className, children, ...props }) {
  return (
    <div 
      className={cn("glass-card rounded-2xl p-6 relative overflow-hidden", className)} 
      {...props}
    >
      {children}
    </div>
  );
}
