import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '../../utils/cn';

export default function Modal({ isOpen, onClose, title, children, className }) {
  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className={cn("bg-slate-900/95 backdrop-blur-2xl w-full max-w-lg rounded-2xl shadow-2xl pointer-events-auto border border-white/10 flex flex-col max-h-[90vh] relative overflow-hidden text-slate-100", className)}
            >
              {title ? (
                <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/5 bg-slate-950/40">
                  <h2 className="text-xl font-bold text-white tracking-tight">{title}</h2>
                  <button
                    onClick={onClose}
                    className="rounded-full p-2 hover:bg-white/5 transition-colors text-slate-400 hover:text-white"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 z-50 rounded-full p-2 bg-white/10 backdrop-blur-md hover:bg-white/20 transition-colors text-white hover:text-white shadow-sm ring-1 ring-white/10"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
              
              <div className={cn("overflow-y-auto w-full", title ? "p-4 sm:p-6" : "")}>
                {children}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
