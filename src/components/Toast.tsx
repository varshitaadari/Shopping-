import React, { useEffect } from 'react';
import { CheckCircle2, ShoppingBag, X } from 'lucide-react';

interface ToastProps {
  message: string;
  isOpen: boolean;
  onClose: () => void;
  actionText?: string;
  onAction?: () => void;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  isOpen,
  onClose,
  actionText,
  onAction
}) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 duration-200">
      <div className="flex items-center gap-3 px-4 py-3 bg-slate-900 text-white rounded-2xl shadow-xl border border-slate-700/80 max-w-md">
        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
        <span className="text-xs font-medium">{message}</span>
        {actionText && onAction && (
          <button
            type="button"
            onClick={onAction}
            className="text-xs font-bold text-indigo-400 hover:text-indigo-300 underline ml-2 whitespace-nowrap"
          >
            {actionText}
          </button>
        )}
        <button
          type="button"
          onClick={onClose}
          className="text-slate-400 hover:text-white ml-1 p-1 rounded-md"
          aria-label="Close notification"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
