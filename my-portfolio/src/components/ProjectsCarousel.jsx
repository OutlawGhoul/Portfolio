import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
} from "react";

const CLONES = 2;
const AUTOPLAY_MS = 4500;
const DRAG_THRESHOLD = 6;

export default function Carousel({
  items = [],
  renderSlide,
  autoPlay = true,
  ariaLabel = "Carousel",
}) {
  const n = items.length;
  const [active, setActive] = useState(0);
  const [ready, setReady] = useState(false);
  const wrapRef = useRef(null);
  const trackRef = useRef(null);
  const slideWRef = useRef(0);

  // Interaction
  const hoverRef = useRef(false);
  const focusRef = useRef(false);
  const autoplayRef = useRef(0);

  // Drag
  const draggingRef = useRef(false);
  const startXRef = useRef(0);
  const lastXRef = useRef(0);
  const movedRef = useRef(false);
  const animRef = useRef(0);

  // Array + Clones
  const loopData = useMemo(() => {
    if (!n) return [];
    const head = items.slice(0, CLONES);
    const tail = items.slice(-CLONES);
    return [...tail, ...items, ...head];
  }, [items, n]);

  const virtualToReal = useCallback(
    (vi) => {
      return ((vi % n) + n) % n;
    },
    [n]
  );

  const realToVirtual = (ri) => {
    return ri + CLONES;
  };

  const updateSlideWidth = useCallback(() => {
    const track = trackRef.current;
    const firstSlide = track?.querySelector(".pc-slide");
    if (!firstSlide) return;
    slideWRef.current =
      firstSlide.getBoundingClientRect().width +
      parseFloat(getComputedStyle(firstSlide).marginRight || "0");
  }, []);

  const jumpToVirtualIndex = useCallback((vi, smooth = true) => {
    const track = trackRef.current;
    if (!track) return;
    const x = vi * slideWRef.current;
    track.style.scrollBehavior = smooth ? "smooth" : "auto";
    track.scrollLeft = x;
  }, []);

  const getVirtualIndex = useCallback(() => {
    const track = trackRef.current;
    if (!track || !slideWRef.current) return realToVirtual(active);
    const vi = Math.round(track.scrollLeft / slideWRef.current);
    return vi;
  }, [active]);

  const normalizeIfCloned = useCallback(() => {
    const track = trackRef.current;
    if (!track || !n) return;
    const vi = getVirtualIndex();

    if (vi < CLONES) {
      const target = vi + n;
      track.style.scrollBehavior = "auto";
      track.scrollLeft = target * slideWRef.current;
    }
  }, [getVirtualIndex, n]);

  const updateActiveFromScroll = useCallback(() => {
    const vi = getVirtualIndex();
    const real = virtualToReal(vi - CLONES);
    setActive(real);
  }, [getVirtualIndex, virtualToReal]);

  const next = useCallback(() => {
    if (!n) return;
    const vi = getVirtualIndex();
    jumpToVirtualIndex(vi + 1, true);
  }, [getVirtualIndex, jumpToVirtualIndex, n]);

  const prev = useCallback(() => {
    if (!n) return;
    const vi = getVirtualIndex();
    jumpToVirtualIndex(vi - 1, true);
  }, [getVirtualIndex, jumpToVirtualIndex, n]);

  const goToReal = useCallback(
    (ri) => {
      if (!n) return;
      jumpToVirtualIndex(realToVirtual(ri), true);
    },
    [jumpToVirtualIndex, n]
  );

  // Mount / Resize
  useEffect(() => {
    const onResize = () => {
      const currentReal = active;
      updateSlideWidth();
      requestAnimationFrame(() => {
        jumpToVirtualIndex(realToVirtual(currentReal), false);
      });
    };
    onResize();
    setReady(true);
    const ro = new ResizeObserver(onResize);
    if (wrapRef.current) ro.observe(wrapRef.current);
    window.addEventListener("orientationchange", onResize);
    return () => {
      ro.disconnect();
      window.removeEventListener("orientationchange", onResize);
    };
  }, [active, jumpToVirtualIndex, updateSlideWidth]);

  // Scroll Listener
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      animRef.current = requestAnimationFrame(() => {
        normalizeIfCloned();
        updateActiveFromScroll();
        ticking = false;
      });
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(animRef.current);
    };
  }, [normalizeIfCloned, updateActiveFromScroll]);

  // Autoplay
  useEffect(() => {
    if (!autoPlay || !n) return;
    const tick = () => {
      if (hoverRef.current || focusRef.current || document.hidden) return;
      next();
    };
    autoplayRef.current = window.setInterval(tick, AUTOPLAY_MS);
    return () => window.clearInterval(autoplayRef.current);
  }, [autoPlay, n, next]);

  // Hover / Focus
  const onEnter = () => (hoverRef.current = true);
  const onLeave = () => (hoverRef.current = false);
  const onFocus = () => (focusRef.current = true);
  const onBlur = () => (focusRef.current = false);

  // Pointer Drag
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const down = (e) => {
      if (e.button !== undefined && e.button !== 0) return;
      draggingRef.current = true;
      movedRef.current = false;
      startXRef.current = lastXRef.current =
        e.clientX ?? e.touches?.[0]?.clientX ?? 0;
      track.classList.add("pc-dragging");
    };
    const move = (e) => {
      if (!draggingRef.current) return;
      const x = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
      const dx = x - lastXRef.current;
      if (Math.abs(x - startXRef.current) > DRAG_THRESHOLD)
        movedRef.current = true;
      track.scrollLeft -= dx;
      lastXRef.current = x;
    };
    const up = () => {
      if (!draggingRef.current) return;
      draggingRef.current = false;
      track.classList.remove("pc-dragging");
      if (movedRef.current) {
        normalizeIfCloned();
        updateActiveFromScroll();
      }
    };

    track.addEventListener("pointerdown", down);
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerup", up);
    track.addEventListener("touchstart", down, { passive: true });
    window.addEventListener("touchmove", move, { passive: true });
    window.addEventListener("touchend", up);

    return () => {
      track.removeEventListener("pointerdown", down);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      track.removeEventListener("touchstart", down);
      window.removeEventListener("touchemove", move);
      window.removeEventListener("touchend", up);
    };
  }, [normalizeIfCloned, updateActiveFromScroll]);

  // Keyboard
  const onKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
    } else if (e.key === "Home") {
      e.preventDefault();
      goToReal(0);
    } else if (e.key === "End") {
      e.preventDefault();
      goToReal(n - 1);
    }
  };

  // Initial Position
  useEffect(() => {
    if (!n) return;
    updateSlideWidth();
    jumpToVirtualIndex(realToVirtual(active), false);
  }, [active, jumpToVirtualIndex, updateSlideWidth, n]);

  if (!n) return null;

  return (
    <section
      ref={wrapRef}
      className="pc-wrap"
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocusCapture={onFocus}
      onBlurCapture={onBlur}
    >
      {/* Arrows */}
      <button
        className="pc-arrow pc-left"
        onClick={prev}
        aria-label="previous element"
      >
        ‹
      </button>

      {/* Track */}
      <div
        ref={trackRef}
        className="pc-track"
        tabIndex={0}
        aria-live="polite"
        onKeyDown={onKeyDown}
      >
        {loopData.map((it, i) => {
          const real = virtualToReal(i - CLONES);
          const isActive = active === real;
          return (
            <article
              key={`${it?.id ?? real}-${i}`}
              className={`pc-slide ${isActive ? "is-active" : ""}`}
              aria-label={`${it?.title ?? "Slide"} ${real + 1} of ${n}`}
              aria-current={isActive ? "true" : undefined}
            >
              {renderSlide ? renderSlide(it, real) : <DefaultSlide item={it} />}
            </article>
          );
        })}
      </div>

      <button
        className="pc-arrow pc-right"
        onClick={next}
        aria-label="next element"
      >
        ›
      </button>

      {/* Dots */}
      <ul className="pc-dots" role="tablist" aria-label="Carousel Pagination">
        {items.map((_, i) => (
          <li key={i} role="presentation">
            <button
              role="tab"
              aria-selected={active === i}
              aria-label={`Move to ${i + 1}'th Slide`}
              className={`pc-dot ${active === i ? "is-active" : ""}`}
              onClick={() => goToReal(i)}
            />
          </li>
        ))}
      </ul>

      {/* Invisible Helper for Screen Reader */}
      <span className="sr-only" aria-live="polite">
        {ready ? `current element: ${active + 1} / ${n}` : ""}
      </span>
    </section>
  );
}

function DefaultSlide({ item }) {
  return (
    <div className="pc-card">
      <div className="pc-thumb">
        <img
          src={item?.image}
          alt={item?.title || "Image"}
          loading="lazy"
          decoding="async"
          sizes="(max-width: 786px) 80vw, 420px"
        />
        {item?.tag && <span className="pc-tag">{item.tag}</span>}
      </div>
      {(item?.title || item?.subtitle) && (
        <div className="pc-meta">
          {item?.title && <h3 className="pc-title">{item.title}</h3>}
          {item?.subtitle && <p className="pc-sub">{item.subtitle}</p>}
        </div>
      )}
    </div>
  );
}
