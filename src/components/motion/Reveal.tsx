"use client";

import { ElementType, useEffect, useRef, useState } from "react";

type Variant = "up" | "fade" | "left" | "right" | "scale";

const variantClass: Record<Variant, string> = {
  up: "",
  fade: "reveal-fade",
  left: "reveal-left",
  right: "reveal-right",
  scale: "reveal-scale",
};

interface RevealProps {
  children: React.ReactNode;
  /** Tag to render. Defaults to a div so it can carry layout classes. */
  as?: ElementType;
  className?: string;
  /** Stagger the element's own children instead of animating it as one block. */
  group?: boolean;
  variant?: Variant;
  /** Extra delay in ms before this element animates in. */
  delay?: number;
  /** How far into the viewport the element must come before it animates. */
  threshold?: number;
  id?: string;
  "aria-label"?: string;
}

/**
 * Fades content in the first time it scrolls into view. The animation itself
 * lives in globals.css behind a prefers-reduced-motion guard, so when motion is
 * turned down this renders as plain, already-visible markup.
 */
export function Reveal({
  children,
  as: Tag = "div",
  className = "",
  group = false,
  variant = "up",
  delay = 0,
  threshold = 0.15,
  ...rest
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // No observer support: show the content rather than hiding it forever.
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  const base = group ? "reveal-group" : `reveal ${variantClass[variant]}`;

  return (
    <Tag
      ref={ref}
      className={`${base} ${visible ? "is-visible" : ""} ${className}`.trim()}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}
