import { useEffect, useRef, useState } from "react";

const reduceMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Renvoie [ref, visible] : visible passe à true quand l'élément entre dans l'écran. */
export function useInView({ threshold = 0.15, once = true } = {}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduceMotion() || !("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) obs.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold, once]);

  return [ref, visible];
}

/** Fait apparaître ses enfants au défilement (fondu + glissement). */
export function Reveal({ as: Tag = "div", delay = 0, from = "up", className = "", style, children, ...rest }) {
  const [ref, visible] = useInView();
  return (
    <Tag
      ref={ref}
      className={`reveal reveal--${from} ${visible ? "is-visible" : ""} ${className}`}
      style={{ "--delay": `${delay}ms`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/** Compteur qui défile de 0 à `to` quand il devient visible. */
export function CountUp({ to, duration = 1800, suffix = "" }) {
  const [ref, visible] = useInView({ threshold: 0.5 });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!visible) return;
    if (reduceMotion()) {
      setVal(to);
      return;
    }
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(eased * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [visible, to, duration]);

  return (
    <span ref={ref}>
      {val.toLocaleString("fr-FR")}
      {suffix}
    </span>
  );
}

/** Inclinaison 3D qui suit la souris. */
export function useTilt(max = 8) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduceMotion() || window.matchMedia("(hover: none)").matches) return;

    const move = (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.setProperty("--rx", `${(-y * max).toFixed(2)}deg`);
      el.style.setProperty("--ry", `${(x * max).toFixed(2)}deg`);
      el.style.setProperty("--mx", `${((x + 0.5) * 100).toFixed(1)}%`);
      el.style.setProperty("--my", `${((y + 0.5) * 100).toFixed(1)}%`);
    };
    const leave = () => {
      el.style.setProperty("--rx", "0deg");
      el.style.setProperty("--ry", "0deg");
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, [max]);

  return ref;
}

/** true quand la page a défilé de plus de `offset` pixels. */
// Repère invisible placé à `offset` px du haut de la page : quand il sort de l'écran,
// la page a défilé. Pas d'écouteur "scroll", donc rien ne tourne à chaque pixel.
export function useScrolled(offset = 40) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const sentinel = document.createElement("div");
    sentinel.setAttribute("aria-hidden", "true");
    Object.assign(sentinel.style, {
      position: "absolute", top: `${offset}px`, left: 0, width: "1px", height: "1px", pointerEvents: "none",
    });
    document.body.appendChild(sentinel);
    const obs = new IntersectionObserver(([entry]) => {
      setScrolled(!entry.isIntersecting && entry.boundingClientRect.top < 0);
    });
    obs.observe(sentinel);
    return () => {
      obs.disconnect();
      sentinel.remove();
    };
  }, [offset]);
  return scrolled;
}
