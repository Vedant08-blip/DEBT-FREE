import { cn } from '../../utils/cn';
import { motion } from 'framer-motion';

export default function Toggle({ checked, onChange, label, className }) {
  return (
    <label className={cn("flex items-center cursor-pointer select-none", className)}>
      <div className="relative">
        <input 
          type="checkbox" 
          className="peer sr-only" 
          checked={checked} 
          onChange={(e) => onChange(e.target.checked)} 
        />
        <div 
          className={cn(
            "w-11 h-6 rounded-full transition-colors duration-300", 
            checked ? "bg-primary" : "bg-slate-300"
          )}
        >
          <motion.div 
            className="absolute top-1 left-1 bg-white w-4 h-4 rounded-full shadow-sm"
            initial={false}
            animate={{ x: checked ? 20 : 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        </div>
      </div>
      {label && <span className="ml-3 text-sm font-medium text-text-primary">{label}</span>}
    </label>
  );
}
