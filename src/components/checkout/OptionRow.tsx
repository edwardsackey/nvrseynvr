"use client";

/**
 * One line of a radio list: the dot, a title, a note beneath it, and room on
 * the right for a price or a set of brand marks. Anything passed as children
 * drops open underneath once the row is the chosen one.
 */
export function OptionRow({
  name,
  value,
  checked,
  onSelect,
  title,
  note,
  aside,
  children,
}: {
  name: string;
  value: string;
  checked: boolean;
  onSelect: () => void;
  title: string;
  note?: string;
  aside?: React.ReactNode;
  children?: React.ReactNode;
}) {
  const id = `${name}-${value}`;
  return (
    <div className="border-b border-black/15">
      <label
        htmlFor={id}
        className="flex cursor-pointer items-center gap-3 py-3.5 sm:gap-4"
      >
        <input
          id={id}
          type="radio"
          name={name}
          value={value}
          checked={checked}
          onChange={onSelect}
          className="peer sr-only"
        />
        <span
          aria-hidden="true"
          className="relative flex h-[15px] w-[15px] shrink-0 items-center justify-center rounded-full border border-black/45 peer-checked:border-black peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-black"
        >
          <span
            className={`h-[7px] w-[7px] rounded-full bg-black transition-transform duration-200 ${
              checked ? "scale-100" : "scale-0"
            }`}
          />
        </span>

        <span className="min-w-0 flex-1">
          <span className="block text-[13px] sm:text-[14px]">{title}</span>
          {note && (
            <span className="mt-0.5 block text-[10px] text-black/45 sm:text-[11px]">{note}</span>
          )}
        </span>

        {aside && <span className="flex shrink-0 items-center gap-2">{aside}</span>}
      </label>

      {checked && children && <div className="accordion-open pb-5 pl-[27px]">{children}</div>}
    </div>
  );
}
