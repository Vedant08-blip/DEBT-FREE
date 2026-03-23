import { forwardRef } from 'react';
import { cn } from '../../utils/cn';

const Slider = forwardRef(({ className, label, value, min = 0, max = 100, step = 1, onChange, ...props }, ref) => {
  return (
    <div className={cn("w-full flex flex-col gap-2", className)}>
      {label && (
        <div className="flex justify-between items-center text-sm font-medium text-text-primary">
          <label>{label}</label>
          <span className="text-primary">{value}</span>
        </div>
      )}
      <input
        type="range"
        ref={ref}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        {...props}
      />
      <div className="flex justify-between text-xs text-text-muted mt-1">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
});

Slider.displayName = 'Slider';
export default Slider;
