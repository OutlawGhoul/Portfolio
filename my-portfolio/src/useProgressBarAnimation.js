import { useEffect } from "react";
export default function useProgressBarAnimation() {
    useEffect(() => {
        const fills = Array.from(document.querySelectorAll(".progress-fill"));
        if (!fills.length)
            return;
        const applyWidth = (el) => {
            const width = el.getAttribute("data-width") ?? "0%";
            el.style.width = width;
        };
        if (typeof IntersectionObserver === "undefined") {
            fills.forEach(applyWidth);
            return;
        }
        const iObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    applyWidth(el);
                    iObserver.unobserve(el);
                }
            });
        }, { threshold: 0.2 });
        fills.forEach((el) => iObserver.observe(el));
        return () => {
            iObserver.disconnect();
        };
    }, []);
}
