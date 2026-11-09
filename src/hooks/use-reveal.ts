import { useEffect } from "react";

/** Adds `.visible` to every `.in-view` element once it scrolls into view. */
export function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".in-view");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}
