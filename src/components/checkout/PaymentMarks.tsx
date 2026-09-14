/**
 * Quiet little brand marks for the payment rows. Drawn rather than loaded so
 * they stay crisp at 16 to 20 pixels tall and cost nothing to fetch.
 */

export function VisaMark({ className = "" }: { className?: string }) {
  return (
    <span
      aria-label="Visa"
      role="img"
      className={`select-none text-[13px] font-bold italic leading-none tracking-tight text-[#1a1f71] ${className}`}
    >
      VISA
    </span>
  );
}

export function MastercardMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 36 22" role="img" aria-label="Mastercard" className={`h-[15px] w-auto ${className}`}>
      <circle cx="14" cy="11" r="9" fill="#eb001b" />
      <circle cx="22" cy="11" r="9" fill="#f79e1b" fillOpacity="0.85" />
    </svg>
  );
}

export function PaypalMark({ className = "" }: { className?: string }) {
  return (
    <span
      role="img"
      aria-label="PayPal"
      className={`select-none text-[13px] font-bold italic leading-none ${className}`}
    >
      <span className="text-[#003087]">Pay</span>
      <span className="text-[#009cde]">Pal</span>
    </span>
  );
}

export function ApplePayMark({ className = "" }: { className?: string }) {
  return (
    <span
      role="img"
      aria-label="Apple Pay"
      className={`flex select-none items-center gap-[3px] text-[13px] font-bold leading-none ${className}`}
    >
      <svg viewBox="0 0 16 20" className="h-[14px] w-auto" fill="currentColor" aria-hidden="true">
        <path d="M10.6 3.2c.6-.75 1-1.76.9-2.8-.86.04-1.9.58-2.53 1.32-.56.65-1.05 1.7-.92 2.7.96.08 1.94-.49 2.55-1.22zM11.5 4.7c-1.4-.08-2.6.8-3.27.8-.68 0-1.7-.78-2.8-.76-1.44.02-2.77.84-3.5 2.13-1.5 2.6-.39 6.44 1.07 8.55.72 1.03 1.57 2.19 2.7 2.15 1.08-.04 1.49-.7 2.8-.7 1.3 0 1.67.7 2.81.68 1.16-.02 1.9-1.05 2.61-2.09.82-1.19 1.16-2.35 1.18-2.41-.03-.01-2.27-.87-2.29-3.45-.02-2.16 1.76-3.19 1.84-3.24-1-1.48-2.57-1.64-3.13-1.67z" />
      </svg>
      Pay
    </span>
  );
}

export function MtnMark({ className = "" }: { className?: string }) {
  return (
    <span
      role="img"
      aria-label="MTN Mobile Money"
      className={`select-none rounded-[3px] bg-[#ffcb05] px-1.5 py-[3px] text-[10px] font-bold leading-none tracking-wide text-black ${className}`}
    >
      MTN
    </span>
  );
}

export function TelecelMark({ className = "" }: { className?: string }) {
  return (
    <span
      role="img"
      aria-label="Telecel Cash"
      className={`select-none text-[12px] font-bold lowercase leading-none text-[#e60000] ${className}`}
    >
      telecel
    </span>
  );
}

export function AirtelTigoMark({ className = "" }: { className?: string }) {
  return (
    <span
      role="img"
      aria-label="AirtelTigo Money"
      className={`select-none text-[12px] font-bold leading-none ${className}`}
    >
      <span className="text-[#e4002b]">Airtel</span>
      <span className="text-[#0033a0]">Tigo</span>
    </span>
  );
}
