import { useEffect } from "react";

export default function useProgressBarAnimation(): void {
  useEffect(() => {
    const fills = Array.from(
      document.querySelectorAll<HTMLDivElement>(".progress-fill")
    );

    if (!fills.length) return;

    const applyWidth = (el: HTMLDivElement) => {
      const width = el.getAttribute("data-width") ?? "0%";
      el.style.width = width;
    };

    if (typeof IntersectionObserver === "undefined") {
      fills.forEach(applyWidth);
      return;
    }

    const iObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLDivElement;
            applyWidth(el);
            iObserver.unobserve(el);
          }
        });
      },
      { threshold: 0.2 }
    );

    fills.forEach((el) => iObserver.observe(el));

    return () => {
      iObserver.disconnect();
    };
  }, []);
}
