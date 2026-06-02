import { motion, AnimatePresence } from "motion/react";
import { Check } from "lucide-react";
import { useEffect } from "react";

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

export function Toast({ message, isVisible, onClose }: ToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50"
        >
          <div className="bg-white border-4 border-black shadow-[6px_6px_0px_rgba(0,0,0,1)] px-6 py-3 flex items-center gap-3">
            <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
              <Check size={16} className="text-white" />
            </div>
            <span className="font-mono font-bold">{message}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
