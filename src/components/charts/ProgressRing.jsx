import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

export default function ProgressRing({ 
  progress = 0, 
  size = 80, 
  strokeWidth = 8,
  progressColor = "text-primary",
  trackColor = "text-slate-200",
  className
}) {
  const safeProgress = Math.min(Math.max(progress, 0), 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const dashoffset = circumference - (safeProgress / 100) * circumference;

  return (
    <div className={cn("inline-flex items-center justify-center relative", className)} style={{ width: size, height: size }}>
      <svg
        className="transform -rotate-90"
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
      >
        <circle
          className={cn("fill-transparent", trackColor)}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <motion.circle
          className={cn("fill-transparent", progressColor)}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: dashoffset }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{ strokeDasharray: circumference }}
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center text-text-primary font-semibold text-sm">
        {safeProgress}%
      </div>
    </div>
  );
}
