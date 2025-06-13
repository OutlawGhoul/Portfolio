export default function animateProgressBars() {
    const bars = document.querySelectorAll(".progress-fill");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = el.getAttribute("data-target");

                el.style.setProperty("--target-width", target);
                el.classList.add("animate-bar");

                observer.unobserve(el);
            }
        });
    }, { threshold: 0.4 });

    bars.forEach(bar => observer.observe(bar));
}