"use client";

import { InputHTMLAttributes } from "react";

type Props = {
  id: string;
  label: string;
  /** Shown under the rule when this field is the reason the form was refused. */
  invalid?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

/**
 * A single checkout input: no boxed border, just a hairline under the text, the
 * label carried by the placeholder and repeated for screen readers.
 */
export function CheckoutField({ id, label, invalid = false, className = "", ...rest }: Props) {
  return (
    <div className={className}>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        id={id}
        placeholder={label}
        aria-invalid={invalid || undefined}
        className={`h-11 w-full border-0 border-b bg-transparent text-[13px] placeholder:text-black/40 focus:outline-none focus:ring-0 sm:text-[14px] ${
          invalid ? "border-b-red-600" : "border-b-black/25 focus:border-b-black"
        }`}
        {...rest}
      />
    </div>
  );
}

/** The small square agreement checkbox used under each block of the form. */
export function AgreeCheckbox({
  id,
  checked,
  onChange,
  children,
}: {
  id: string;
  checked: boolean;
  onChange: (next: boolean) => void;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={id} className="flex cursor-pointer items-center gap-2.5 py-2 text-[11px] text-black/70 sm:text-[12px]">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="peer sr-only"
      />
      <span
        aria-hidden="true"
        className="flex h-[15px] w-[15px] shrink-0 items-center justify-center border border-black/40 text-white transition-colors peer-checked:border-black peer-checked:bg-black peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-black"
      >
        <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M2 6.5 4.8 9.2 10 3.4" strokeLinecap="square" />
        </svg>
      </span>
      <span className="underline decoration-black/30 underline-offset-2">{children}</span>
    </label>
  );
}
