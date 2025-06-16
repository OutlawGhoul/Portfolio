import { useEffect } from "react";

const useProgressBarAnimation = () => {
    useEffect(() => {
        const progressBars = document.querySelectorAll(".progress-fill");

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const el = entry.target;

                    if (entry.isIntersecting) {
                        const target = el.getAttribute("data-width");
                        el.style.setProperty("--target-width", target);
                        el.classList.add("animate-bar");
                    } else {
                        el.classList.remove("animate-bar");
                        el.style.setProperty("--target-width", "0%");
                    }
                });
            },
            { threshold: 0.3 }
        );

        progressBars.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);
};

export default useProgressBarAnimation;