import React, { useCallback, useEffect, useRef, useState } from "react";

const CLONES = 1;

export default function ProjectsCarousel({ items = [] }) {
    const trackRef = useRef(null);
    const [active, setActive] = useState(0);
    const [lbOpen, setLbOpen] = useState(false);
    const [lbIndex, setLbIndex] = useState(0);

    // Helpers
    const syncCardWithVar = useCallback(() => {
        const track = trackRef.current;
        if (!track || !track.firstElementChild) return;
        const w = track.firstElementChild.getBoundingClientRect().width || 360;
        track.style.setProperty("--card-w", `${w}px`);
    }, []);

    // Loop-data
    const loopItems = (() => {
        if (!items.length) return [];
        const head = items.slice(0, CLONES);
        const tail = items.slice(-CLONES);
        return [...tail, ...items, ...head];
    })();
    const n = items.length;
    const baseLoopIndex = CLONES;

    const getLoopChildForRealIndex = useCallback((realIndex) => {
        const track = trackRef.current;
        if (!track) return null;
        const loopIndex = baseLoopIndex + realIndex;
        return track.children[loopIndex] || null;
    }, [baseLoopIndex]);

    const getNearestLoopIndex = useCallback((track) => {
        if (!track) return baseLoopIndex;
        const children = Array.from(track.children);
        if (!children.length) return baseLoopIndex;
        const rect = track.getBoundingClientRect();
        const mid = rect.left + rect.width / 2;
        let best = Infinity;
        let nearest = baseLoopIndex;
        for (let i = 0; i < children.length; i++) {
            const r = children[i].getBoundingClientRect();
            const c = r.left + r.width / 2;
            const d = Math.abs(c - mid);
            if (d < best) { best = d; nearest = i; }
        }
        return nearest;
    }, [baseLoopIndex]);

    const normalizeIfCloned = useCallback(() => {
        const track = trackRef.current;
        if (!track || !n) return;
        const loopIndex = getNearestLoopIndex(track);

        if (loopIndex < baseLoopIndex) {
            const offset = loopIndex + n;
            track.children[offset]?.scrollIntoView({ behavior: "auto", block: "nearest", inline: "center" });
            setActive(offset - baseLoopIndex);
            return true;
        }

        if (loopIndex >= baseLoopIndex + n) {
            const offset = loopIndex - n;
            track.children[offset]?.scrollIntoView({ behavior: "auto", block: "nearest", inline: "center" });
            setActive(offset - baseLoopIndex);
            return true;
        }
        return false;
    }, [baseLoopIndex, getNearestLoopIndex, n]);

    const scrollToRealIndex = useCallback((realIndex, smooth = true) => {
        const el = getLoopChildForRealIndex(Math.max(0, Math.min(realIndex, n - 1)));
        if (el?.scrollIntoView) {
            el.scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "nearest", inline: "center" });
        }
    }, [getLoopChildForRealIndex, n]);

    const updateActive = useCallback(() => {
        const track = trackRef.current;
        if (!track || !n) return;
        if (normalizeIfCloned()) return;

        const loopIndex = getNearestLoopIndex(track);
        const realIndex = loopIndex - baseLoopIndex;
        setActive(Math.max(0, Math.min(realIndex, n - 1)));
    }, [baseLoopIndex, getNearestLoopIndex, normalizeIfCloned, n]);

    useEffect(() => {
        const track = trackRef.current;
        if (!track ||!n) return;

        const updateAll = () => { syncCardWithVar(); updateActive(); };

        const t = setTimeout(() => {
            syncCardWithVar();
            track.children[baseLoopIndex]?.scrollIntoView({ behavior: "auto", block: "nearest", inline: "center" });
            setActive(0);
            updateActive();
        }, 0);

        const onScroll = () => updateActive();
        track.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", updateAll);

        const imgs = track.querySelectorAll("img");
        const onImg = () => updateAll();
        imgs.forEach(img => { if (!img.complete) img.addEventListener("load", onImg); });

        const ro = new ResizeObserver(updateAll);
        ro.observe(track);

        return () => {
            clearTimeout(t);
            track.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", updateAll);
            imgs.forEach(img => img.removeEventListener("load", onImg));
            ro.disconnect();
        };
    }, [baseLoopIndex, syncCardWithVar, updateActive, n]);

    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;
        let startX = 0;
        let scrollStart = 0;
        let dragging = false;

        const down = (e) => {
            dragging = true;
            track.classList.add("is-dragging");
            startX = (e.touches ? e.touches[0].pageX : e.pageX);
            scrollStart = track.scrollLeft;
        };
        const move = (e) => {
            if (!dragging) return;
            const x = (e.touches ? e.touches[0].pageX : e.pageX);
            track.scrollLeft = scrollStart - (x - startX);
        };
        const up = () => {
            if (!dragging) return;
            dragging = false;
            track.classList.remove("is-dragging");
            if (!normalizeIfCloned()) {
                const trackEl = trackRef.current;
                const loopIndex = getNearestLoopIndex(trackEl);
                trackEl.children[loopIndex]?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
            }
            updateActive();
        };

        track.addEventListener("mousedown", down);
        track.addEventListener("mousemove", move);
        window.addEventListener("mouseup", up);
        track.addEventListener("touchstart", down, { passive: true });
        track.addEventListener("touchmove", move, { passive: true });
        window.addEventListener("touchend", up);

        return () => {
            track.removeEventListener("mousedown", down);
            track.removeEventListener("mousemove", move);
            window.removeEventListener("mouseup", up);
            track.removeEventListener("touchstart", down);
            track.removeEventListener("touchmove", move);
            window.removeEventListener("touchend", up);
        };
    }, [getNearestLoopIndex, normalizeIfCloned, updateActive]);

    const prev = useCallback(() => {
        if (lbOpen) {
            setLbIndex(i => {
                const ni = (i - 1 + n) % n;
                scrollToRealIndex(i);
                return ni;
            });
        } else {
            const ni = (active - 1 + n) % n;
            scrollToRealIndex(ni);
        }
    }, [lbOpen, active, scrollToRealIndex, n]);

    const next = useCallback(() => {
        if (lbOpen) {
          setLbIndex((i) => {
            const ni = (i + 1) % n;
            scrollToRealIndex(ni, false);
            return ni;
          });
        } else {
          const ni = (active + 1) % n;
          scrollToRealIndex(ni);
        }
            }, [lbOpen, active, scrollToRealIndex, n]);

    const openLightbox = useCallback((realIndex) => {
        setLbIndex(realIndex);
        setLbOpen(true);
        document.documentElement.style.overflowX = "hidden";
    }, []);
    const closeLightbox = useCallback(() => {
        setLbOpen(false);
        document.documentElement.style.overflow = "";
    }, []);
    const nextLightbox = useCallback(() => {
        setLbIndex((i) => (i + 1) % n);
    }, [n]);
    const prevLightbox = useCallback(() => {
        setLbIndex((i) => (i - 1 + n) % n);
    }, [n]);

    useEffect(() => {
      const onKey = (e) => {
        if (lbOpen) {
          if (e.key === "Escape") closeLightbox();
          if (e.key === "ArrowRight") nextLightbox();
          if (e.key === "ArrowLeft") prevLightbox();
          return;
        }
        if (e.key === "ArrowRight") next();
        if (e.key === "ArrowLeft") prev();
      };
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }, [lbOpen, next, prev, closeLightbox, nextLightbox, prevLightbox]);

    return (
      <div className="carousel" aria-roledescription="carousel">
        <button
          className="carousel-arrow left"
          onClick={prev}
          aria-label="previous project"
        >
          ‹
        </button>

        <div className="carousel-track" ref={trackRef}>
          {loopItems.map((it, i) => {
            const realIndex = (i - baseLoopIndex + n) % n;
            return (
                <article
                    key={`loop-${i}-${it?.id ?? "x"}`}
                    data-id={it?.id ?? realIndex}
                    className={`project-card ${active === realIndex ? "is-active" : ""}`}
                    aria-label={`${it.title || "Project"} ${realIndex + 1} of ${n}`}
                >
                    <div className="project-thumb" onClick={() => openLightbox(realIndex)} style={{ cursor: "zoom-in" }}>
                        <img src={it?.image} alt={it?.title || "Project-image"} />
                        {it?.tag && <span className="project-tag">{it?.tag}</span>}
                    </div>
                    <div className="project-meta">
                        <h3 className="project-title">{it?.title}</h3>
                    </div>
                </article>
                );
            })}
        </div>

        <button
          className="carousel-arrow right"
          onClick={next}
          aria-label="next project"
        >
          ›
        </button>

        {/* Lightbox */}
        {lbOpen && n > 0 && (
            <div 
                className="lightbox"
                role="dialog"
                aria-modal="true"
                onClick={(e) => {
                    if (e.target === e.currentTarget) closeLightbox();
                }}
            >
                <button className="lightbox-close" onClick={closeLightbox} aria-label="close">×</button>
                <button className="lighbox-nav prev" onClick={prevLightbox} aria-label="previous Image">‹</button>
                <figure className="lighbox-figure">
                    <img
                        className="lighbox-img"
                        src={items[lbIndex]?.image}
                        alt={items[lbIndex]?.title || "Zoom-in Project-Image"}
                    />
                    {items[lbIndex]?.title && <figcaption className="lighbox-caption">{items[lbIndex].title}</figcaption>}
                </figure>
                <button className="lighbox-nav next" onClick={nextLightbox} aria-label="next Image">›</button>
            </div>
        )}
      </div>
    );
}