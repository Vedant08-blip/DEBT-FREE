import { cn } from "../../utils/cn";

export default function Card({ className, children, ...props }) {
  return (
    <div 
      className={cn("bg-slate-900/40 backdrop-blur-xl rounded-2xl shadow-2xl p-6 border border-white/5 relative overflow-hidden", className)} 
      {...props}
    >
      {children}
    </div>
  );
}
