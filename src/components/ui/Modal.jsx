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
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className={cn("bg-card w-full max-w-lg rounded-2xl shadow-2xl pointer-events-auto border border-slate-100 flex flex-col max-h-[90vh] relative overflow-hidden", className)}
            >
              {title ? (
                <div className="flex items-center justify-between p-4 sm:p-6 border-b border-border bg-white">
                  <h2 className="text-xl font-semibold text-text-primary">{title}</h2>
                  <button
                    onClick={onClose}
                    className="rounded-full p-2 hover:bg-slate-100 transition-colors text-text-muted hover:text-text-primary"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 z-50 rounded-full p-2 bg-white/20 backdrop-blur-md hover:bg-white/30 transition-colors text-white hover:text-white shadow-sm ring-1 ring-white/40 shadow-black/10"
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
