import { cn } from '../../utils/cn';
import { motion } from 'framer-motion';

export default function ProgressBar({ progress, className, indicatorClassName, ...props }) {
  const safeProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <div 
      className={cn("h-2.5 w-full bg-slate-100 rounded-full overflow-hidden border border-border/50", className)}
      {...props}
    >
      <motion.div 
        className={cn("h-full bg-primary rounded-full", indicatorClassName)}
        initial={{ width: 0 }}
        animate={{ width: `${safeProgress}%` }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
    </div>
  );
}
