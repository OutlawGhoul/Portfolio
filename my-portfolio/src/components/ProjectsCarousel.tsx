import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
  KeyboardEvent,
  MouseEvent,
  PointerEvent,
  TouchEvent,
} from "react";
import { createPortal } from "react-dom";
import TechIcon from "./TechIcon";
import type { ProjectItem } from "@/types/projects";

export type CarouselProps<T extends ProjectItem = ProjectItem> = {
  items: T[];
  renderSlide?: (
    item: T,
    realIndex: number,
    open: () => void
  ) => React.ReactNode;
  autoPlay?: boolean;
  ariaLabel?: string;
};

const CLONES = 2 as const;
const AUTOPLAY_MS = 4500;
const DRAG_THRESHOLD = 6;

export default function Carousel<T extends ProjectItem = ProjectItem>({
  items = [],
  renderSlide,
  autoPlay = true,
  ariaLabel = "Carousel",
}: CarouselProps<T>) {
  const n = items.length;
  const [active, setActive] = useState(0);
  const [ready, setReady] = useState(false);

  const wrapRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const slideWRef = useRef(0);

  // Interaction
  const hoverRef = useRef(false);
  const focusRef = useRef(false);
  const autoplayRef = useRef<number | null>(0);
  const activeCardRef = useRef<HTMLDivElement | null>(null);

  // Drag
  const draggingRef = useRef(false);
  const startXRef = useRef(0);
  const lastXRef = useRef(0);
  const movedRef = useRef(false);
  const animRef = useRef<number | null>(0);
  const avoidClickRef = useRef(false);

  // Lightbox
  const [lbOpen, setLbOpen] = useState(false);
  const [lbIndex, setLbIndex] = useState(0);
  const lightboxRef = useRef<HTMLDivElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const lastFocusedRef = useRef<Element | null>(null);

  // Array + Clones
  const loopData: T[] = useMemo(() => {
    if (!n) return [];
    const head = items.slice(0, CLONES);
    const tail = items.slice(-CLONES);
    return [...tail, ...items, ...head];
  }, [items, n]);

  const virtualToReal = useCallback(
    (vi: number) => {
      return ((vi % n) + n) % n;
    },
    [n]
  );

  const realToVirtual = (ri: number) => {
    return ri + CLONES;
  };

  const updateSlideWidth = useCallback(() => {
    const track = trackRef.current;
    const firstSlide = track?.querySelector<HTMLElement>(".carousel-slide");
    if (!firstSlide || !track) return;
    const style = getComputedStyle(track);
    const gap =
      parseFloat((style as any).columnGap || (style as any).gap || "0") || 0;
    slideWRef.current = firstSlide.getBoundingClientRect().width + gap;
  }, []);

  const jumpToVirtualIndex = useCallback((vi: number, smooth = true) => {
    const track = trackRef.current;
    if (!track) return;
    const x = vi * slideWRef.current;
    track.style.scrollBehavior = smooth ? "smooth" : "auto";
    track.scrollLeft = x;
  }, []);

  const getVirtualIndex = useCallback((): number => {
    const track = trackRef.current;
    if (!track || !slideWRef.current) return realToVirtual(active);
    return Math.round(track.scrollLeft / slideWRef.current);
  }, [active]);

  const normalizeIfCloned = useCallback(() => {
    const track = trackRef.current;
    if (!track || !n) return;
    const vi = getVirtualIndex();

    if (vi < CLONES) {
      const target = vi + n;
      track.style.scrollBehavior = "auto";
      track.scrollLeft = target * slideWRef.current;
    } else if (vi >= CLONES + n) {
      const target = vi - n;
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
    (ri: number) => {
      if (!n) return;
      jumpToVirtualIndex(realToVirtual(ri), true);
    },
    [jumpToVirtualIndex, n]
  );

  const canStartDrag = (target: EventTarget | null): boolean => {
    const el = target as Element | null;
    if (!el) return false;
    if (
      el.closest(
        'a, button, input, textarea, select, [role="button"], [role="tab"], [data-no-drag]'
      )
    ) {
      return false;
    }
    const card = el?.closest?.(".carousel-card");
    const onImage = el?.closest?.(".carousel-thumb");
    return !!card && !onImage;
  };

  // Lightbox
  const openLightbox = useCallback((ri: number) => {
    lastFocusedRef.current = document.activeElement;
    setLbIndex(ri);
    setLbOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setLbOpen(false);
  }, []);

  const lbNext = useCallback(() => {
    setLbIndex((i) => (i + 1) % n);
  }, [n]);

  const lbPrev = useCallback(() => {
    setLbIndex((i) => (i - 1 + n) % n);
  }, [n]);

  const handleOpen = useCallback(
    (ri: number) => {
      if (avoidClickRef.current) return;
      openLightbox(ri);
    },
    [openLightbox]
  );

  useEffect(() => {
    const rootSection = wrapRef.current;
    if (!rootSection) return;
    if (lbOpen) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      rootSection.setAttribute("aria-hidden", "true");
      rootSection.setAttribute("inert", "");
      setTimeout(() => {
        lightboxRef.current?.focus();
        closeBtnRef.current?.focus();
      }, 0);

      return () => {
        document.body.style.overflow = prevOverflow;
        rootSection.removeAttribute("aria-hidden");
        rootSection.removeAttribute("inert");
        (lastFocusedRef.current as HTMLElement | null)?.focus?.();
      };
    }
  }, [lbOpen]);

  const trapFocus = useCallback((e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Tab" || !lightboxRef.current) return;
    const focusables = lightboxRef.current.querySelectorAll<HTMLElement>(
      'a, button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const list = Array.from(focusables).filter(
      (el) => !el.hasAttribute("disabled")
    );
    if (!list.length) return;
    const first = list[0];
    const last = list[list.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }, []);

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
      ticking = true;
      animRef.current = requestAnimationFrame(() => {
        normalizeIfCloned();
        updateActiveFromScroll();
        ticking = false;
      });
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", onScroll);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [normalizeIfCloned, updateActiveFromScroll]);

  // Autoplay
  useEffect(() => {
    if (!autoPlay || !n) return;
    const tick = () => {
      if (hoverRef.current || focusRef.current || document.hidden) return;
      next();
    };
    autoplayRef.current = window.setInterval(
      tick,
      AUTOPLAY_MS
    ) as unknown as number;
    return () => {
      if (autoplayRef.current) window.clearInterval(autoplayRef.current);
    };
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

    const onPointerDown = (e: PointerEvent | TouchEvent | any) => {
      const button = (e as PointerEvent).button ?? 0;
      if (button !== 0) return;
      if (!canStartDrag(e.target)) return;

      const card = (e.target as Element)?.closest?.(
        ".carousel-card"
      ) as HTMLDivElement | null;
      activeCardRef.current = card;
      card?.classList.add("is-dragging");

      draggingRef.current = true;
      movedRef.current = false;

      const x = (
        "clientX" in e ? e.clientX : e.touches?.[0]?.clientX ?? 0
      ) as number;
      startXRef.current = x;
      lastXRef.current = x;

      (track as any).setPointerCapture?.(e.pointerId);
      track.classList.add("carousel-dragging");
    };

    const onPointerMove = (e: PointerEvent | TouchEvent | any) => {
      if (!draggingRef.current) return;
      const x = (
        "clientX" in e ? e.clientX : e.touches?.[0]?.clientX ?? 0
      ) as number;
      const dx = x - lastXRef.current;
      if (Math.abs(x - startXRef.current) > DRAG_THRESHOLD)
        movedRef.current = true;
      track.scrollLeft -= dx;
      lastXRef.current = x;
    };

    const onPointerUpOrCancel = (e: PointerEvent | TouchEvent | any) => {
      if (!draggingRef.current) return;
      draggingRef.current = false;
      (track as any).releasePointerCapture?.(e.pointerId);
      track.classList.remove("carousel-dragging");
      if (movedRef.current) {
        avoidClickRef.current = true;
        setTimeout(() => (avoidClickRef.current = false), 160);
        normalizeIfCloned();
        updateActiveFromScroll();
      }
      activeCardRef.current?.classList.remove("is-dragging");
    };

    track.addEventListener("pointerdown", onPointerDown as any);
    window.addEventListener("pointermove", onPointerMove as any, {
      passive: true,
    });
    window.addEventListener("pointerup", onPointerUpOrCancel as any);
    track.addEventListener("touchstart", onPointerDown as any, {
      passive: true,
    });
    window.addEventListener("touchmove", onPointerMove as any, {
      passive: true,
    });
    window.addEventListener("touchend", onPointerUpOrCancel as any);

    return () => {
      track.removeEventListener("pointerdown", onPointerDown as any);
      window.removeEventListener("pointermove", onPointerMove as any);
      window.removeEventListener("pointerup", onPointerUpOrCancel as any);
      track.removeEventListener("touchstart", onPointerDown as any);
      window.removeEventListener("touchmove", onPointerMove as any);
      window.removeEventListener("touchend", onPointerUpOrCancel as any);
    };
  }, [normalizeIfCloned, updateActiveFromScroll]);

  // Keyboard
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      if (lbOpen) lbPrev();
      else prev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      if (lbOpen) lbNext();
      else next();
    } else if (e.key === "Home") {
      e.preventDefault();
      goToReal(0);
    } else if (e.key === "End") {
      e.preventDefault();
      goToReal(n - 1);
    } else if (e.key === "Escape") {
      e.preventDefault();
      closeLightbox();
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
    <>
      <section
        ref={wrapRef as React.RefObject<HTMLElement>}
        className="carousel-wrap"
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
          className="carousel-arrow left"
          aria-label="previous element"
          onClick={prev}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M15.5 19l-7-7 7-7"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Track */}
        <div
          ref={trackRef}
          className="carousel-track"
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
                className={`carousel-slide ${isActive ? "is-active" : ""}`}
                aria-label={`${it?.title ?? "Slide"} ${real + 1} of ${n}`}
                aria-current={isActive ? "true" : undefined}
              >
                {renderSlide ? (
                  renderSlide(it, real, () => handleOpen(real))
                ) : (
                  <DefaultSlide item={it} onOpen={() => handleOpen(real)} />
                )}
              </article>
            );
          })}
        </div>

        <button
          className="carousel-arrow right"
          aria-label="next element"
          onClick={next}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M8.5 5l7 7-7 7"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Dots */}
        <ul
          className="carousel-dots"
          role="tablist"
          aria-label="Carousel Pagination"
        >
          {items.map((_, i) => (
            <li key={i} role="presentation">
              <button
                role="tab"
                aria-selected={active === i}
                aria-label={`Move to ${i + 1}'th Slide`}
                className={`carousel-dot ${active === i ? "is-active" : ""}`}
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

      {lbOpen &&
        createPortal(
          <div
            ref={lightboxRef}
            className="lightbox"
            role="dialog"
            aria-modal="true"
            aria-label="Image view"
            tabIndex={-1}
            onClick={(e: MouseEvent<HTMLDivElement>) => {
              if (e.target === e.currentTarget) closeLightbox();
            }}
            onKeyDown={trapFocus}
          >
            <button
              ref={closeBtnRef}
              className="lightbox-close"
              aria-label="close"
              onClick={closeLightbox}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M6 6L18 18M6 18L18 6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
            <button
              className="lightbox-nav prev"
              aria-label="previous"
              onClick={(e) => {
                e.stopPropagation();
                lbPrev();
              }}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M15.5 19l-7-7 7-7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <div
              className="lightbox-inner"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={items[lbIndex].image}
                alt={items[lbIndex].title || "Image"}
              />
              {(items[lbIndex]?.title ||
                (Array.isArray(items[lbIndex]?.tech) &&
                  items[lbIndex].tech.length) ||
                items[lbIndex]?.demo ||
                items[lbIndex]?.subdomain ||
                items[lbIndex]?.url) && (
                <div className="lightbox-meta">
                  {items[lbIndex]?.title && (
                    <h4 className="lightbox-title">{items[lbIndex].title}</h4>
                  )}

                  {Array.isArray(items[lbIndex]?.tech) &&
                    items[lbIndex].tech.length > 0 && (
                      <ul className="lightbox-tech" aria-label="Tech stack">
                        {items[lbIndex].tech.map((t) => (
                          <li key={t} className="lightbox-tech-item">
                            <TechIcon name={t} label={t} size={24} />
                          </li>
                        ))}
                      </ul>
                    )}

                  {(items[lbIndex]?.demo ||
                    items[lbIndex]?.subdomain ||
                    items[lbIndex]?.url) && (
                    <div className="lightbox-actions">
                      <a
                        className="lightbox-visit"
                        href={
                          items[lbIndex].demo ||
                          items[lbIndex].subdomain ||
                          items[lbIndex].url
                        }
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Live-Demo in new Tab"
                        title="Live-Demo"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                          <path
                            d="M14 3h7M10 13L21 3M21 14v7h-7M10 3H3v7M3 14v7h7"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span>Try Me!</span>
                      </a>
                    </div>
                  )}
                </div>
              )}
            </div>
            <button
              className="lightbox-nav next"
              aria-label="next"
              onClick={(e) => {
                e.stopPropagation();
                lbNext();
              }}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M8.5 5l7 7-7 7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>{" "}
          </div>,
          document.body
        )}
    </>
  );
}

function DefaultSlide<T extends ProjectItem>({
  item,
  onOpen,
}: {
  item: T;
  onOpen?: () => void;
}) {
  return (
    <div className="carousel-card">
      <div
        className="carousel-thumb"
        onClick={(e) => {
          e.stopPropagation();
          onOpen?.();
        }}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onOpen?.();
          }
        }}
      >
        <img
          src={item?.image}
          alt={item?.title || "image"}
          loading="lazy"
          decoding="async"
          sizes="(max-width: 768px) 80vw, 420px"
          draggable={false}
        />
        {item?.tag && <span className="carousel-tag">{item.tag}</span>}
      </div>

      <div className="carousel-meta">
        <div className="carousel-row">
          <h3 className="carousel-title">{item?.title}</h3>

          {item?.repo && (
            <a
              className="repo-link"
              target="_blank"
              href={item.repo}
              rel="noreferrer"
              aria-label={`${item.title} Repository öffnen`}
              title="Repository"
              data-no-drag
              onClick={(e) => e.stopPropagation()}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                {/* Left */}
                <path
                  d="M10 3H3v7M3 14v7h7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Right */}
                <path
                  d="M14 3h7v7M21 14v7h-7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Arrow */}
                <path
                  d="M10 14L21 3"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          )}
        </div>

        {Array.isArray(item?.tech) && item.tech.length > 0 && (
          <ul className="tech-icons">
            {item.tech.map((t) => (
              <li key={t} className="tech-item">
                <TechIcon name={t} label={t} size={22} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
