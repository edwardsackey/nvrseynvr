const ITEMS = new Array(30).fill("nvrsëynvr");

/** The thin repeating-wordmark tape that borders black sections. */
export function MarqueeTape({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`overflow-hidden whitespace-nowrap bg-black py-1 ${className}`}
    >
      <div className="inline-flex animate-marquee">
        {[0, 1].map((half) => (
          <span key={half} className="inline-flex shrink-0">
            {ITEMS.map((item, i) => (
              <span
                key={i}
                className="mx-4 font-serif text-[11px] tracking-wide text-white"
              >
                {item}
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}
