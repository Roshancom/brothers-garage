import { useEffect, useRef } from "react";
import { animate, useInView } from "framer-motion";

export function Counter({ from, to, duration = 2 }: { from: number; to: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px" });
  useEffect(() => {
    if (inView && ref.current) {
      const controls = animate(from, to, {
        duration,
        onUpdate: (v) => { if (ref.current) ref.current.textContent = Math.round(v) + "+"; },
      });
      return () => controls.stop();
    }
    return;
  }, [inView, from, to, duration]);
  return <span ref={ref}>{from}+</span>;
}
