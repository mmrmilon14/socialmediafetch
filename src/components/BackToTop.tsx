"use client";

import { useEffect, useState } from "react";
import { Icon } from "./Icon";

export function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0 })}
      aria-label="Back to top"
      className={`fixed right-5 bottom-5 w-10 h-10 rounded-full bg-brand text-white flex items-center justify-center shadow-[0_4px_14px_rgba(26,143,227,0.35)] transition-opacity hover:bg-brand-dark ${show ? "opacity-100" : "opacity-0 pointer-events-none"}`}
    >
      <Icon name="arrowUp" className="w-5 h-5" strokeWidth={2.2} />
    </button>
  );
}
