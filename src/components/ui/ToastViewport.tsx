"use client";

import { useToast } from "@/context/ToastContext";
import { CloseIcon } from "./icons";

const variantStyles = {
  success: "border-black",
  error: "border-red-600",
  info: "border-black/40",
};

export function ToastViewport() {
  const { toasts, dismissToast } = useToast();

  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed right-4 top-6 z-[70] flex w-[calc(100%-2rem)] max-w-sm flex-col gap-3 sm:right-6"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          role="status"
          className={`pointer-events-auto flex items-center gap-3 border bg-white px-4 py-3 shadow-[0_12px_32px_rgba(0,0,0,0.18)] animate-toast-in ${variantStyles[toast.variant]}`}
        >
          <p className="flex-1 text-[14px]">{toast.message}</p>
          <button
            onClick={() => dismissToast(toast.id)}
            aria-label="Dismiss notification"
            className="text-black/50 transition-colors hover:text-black"
          >
            <CloseIcon className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
