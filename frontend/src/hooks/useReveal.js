import { useEffect, useLayoutEffect } from "react";

// Fades elements in as they scroll into view.
// Mark any element with  data-reveal  (or data-reveal="left" / "right")
// and pass a ref to the page wrapper that contains them.
// Nothing is hidden when the user prefers reduced motion or the browser
// has no IntersectionObserver, so content is never stuck invisible.
export default function useReveal(rootRef) {
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce || !("IntersectionObserver" in window)) return;
    root.classList.add("reveal-ready"); // hide before first paint, no flash
    return () => root.classList.remove("reveal-ready");
  }, [rootRef]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !root.classList.contains("reveal-ready")) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    root
      .querySelectorAll("[data-reveal]")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [rootRef]);
}
