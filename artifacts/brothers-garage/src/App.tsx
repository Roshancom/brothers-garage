import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  animate,
  useReducedMotion,
  useMotionValue,
  type MotionValue,
} from "framer-motion";
import {
  Wrench,
  Settings,
  MessageCircle,
  Instagram,
  Facebook,
  Youtube,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const parts = [
  {
    name: "Performance Exhausts",
    desc: "High-flow systems for maximum power",
    img: "https://github.com/Roshancom/brothers-garage/blob/main/public/images/performance-exhausts.png?raw=true",
  },
  {
    name: "Brake Calipers",
    desc: "Precision stopping power",
    img: "https://raw.githubusercontent.com/Roshancom/brothers-garage/refs/heads/main/public/images/brake-calipers.png",
  },
  {
    name: "Suspension Kits",
    desc: "Front and rear upgrade packages",
    img: "https://github.com/Roshancom/brothers-garage/blob/main/public/images/suspension-kits.png?raw=true",
  },
  {
    name: "Fuel Injectors",
    desc: "Optimized fuel delivery components",
    img: "https://github.com/Roshancom/brothers-garage/blob/main/public/images/fuel-injectors.png?raw=true",
  },
  {
    name: "Clutch Plates",
    desc: "Heavy-duty clutch assemblies",
    img: "https://github.com/Roshancom/brothers-garage/blob/main/public/images/clutch-plates.png?raw=true",
  },
  {
    name: "Chain & Sprocket Sets",
    desc: "Precision drive systems",
    img: "https://raw.githubusercontent.com/Roshancom/brothers-garage/refs/heads/main/public/images/chain-sprocket-sets.png",
  },
];

// FIX 1: Extract StoryWord as a proper component so hooks aren't called inside .map()
// Calling useTransform inside storyText.map() violates React Rules of Hooks,
// which can silently break or throw on mobile browsers.
function StoryWord({
  word,
  progress,
  index,
  total,
  isHighlight,
}: {
  word: string;
  progress: MotionValue<number>;
  index: number;
  total: number;
  isHighlight: boolean;
}) {
  const start = index / total;
  const end = start + 1 / total;
  const opacity = useTransform(progress, [start, end], [0.1, 1]);
  return (
    <motion.span
      style={{ opacity }}
      className={`inline-block mr-3 ${isHighlight ? "text-primary italic" : "text-white"}`}
    >
      {word}
    </motion.span>
  );
}

// FIX 9: Respect prefers-reduced-motion — pass shouldAnimate down to WavyText
function WavyText({
  text,
  className,
  shouldAnimate,
}: {
  text: string;
  className?: string;
  shouldAnimate: boolean;
}) {
  const words = text.split(" ");
  return (
    <span className={className} aria-label={text}>
      {words.map((word, wi) => (
        <span key={wi} className="inline-block whitespace-nowrap mr-[0.25em]">
          {word.split("").map((char, ci) => (
            <motion.span
              key={ci}
              className="inline-block"
              animate={shouldAnimate ? { y: [0, -14, 0] } : {}}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: (wi * word.length + ci) * 0.06,
                repeatDelay: 2.5,
              }}
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </span>
  );
}

function ScrollIcon({ style }: { style?: React.CSSProperties }) {
  return (
    <motion.div className="flex flex-col items-center gap-2 mt-6" style={style}>
      <svg
        width="28"
        height="44"
        viewBox="0 0 28 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="1"
          y="1"
          width="26"
          height="42"
          rx="13"
          stroke="rgba(255,255,255,0.35)"
          strokeWidth="2"
        />
        <motion.rect
          x="12"
          y="8"
          width="4"
          height="8"
          rx="2"
          fill="hsl(46,79%,54%)"
          animate={{ y: [0, 14, 0], opacity: [1, 0.2, 1] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
      <motion.span
        className="text-muted-foreground uppercase tracking-[0.2em] text-xs"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
      >
        Scroll
      </motion.span>
    </motion.div>
  );
}

// FIX 8: Remove negative margin — small mobile viewports may never cross
// a -100px IntersectionObserver threshold, so counters never start.
function Counter({
  from,
  to,
  duration = 2,
}: {
  from: number;
  to: number;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px" });

  useEffect(() => {
    if (inView && ref.current) {
      const controls = animate(from, to, {
        duration,
        onUpdate: (value) => {
          if (ref.current)
            ref.current.textContent = Math.round(value).toString() + "+";
        },
      });
      return () => controls.stop();
    }
  }, [inView, from, to, duration]);

  return <span ref={ref}>{from}+</span>;
}

// FIX 4: Reusable SVG label component using native SVG elements.
// <foreignObject> is unreliable on iOS Safari — the HTML inside often renders
// incorrectly or not at all. Pure SVG <text> + <rect> work universally.
function SvgLabel({
  x,
  y,
  text,
  opacity,
}: {
  x: number;
  y: number;
  text: string;
  opacity: MotionValue<number>;
}) {
  const charWidth = 6.5;
  const pad = 8;
  const w = text.length * charWidth + pad * 2;
  return (
    <motion.g style={{ opacity }} aria-label={text}>
      <rect
        x={x}
        y={y}
        width={w}
        height={20}
        rx={4}
        fill="rgba(0,0,0,0.75)"
        stroke="hsl(46,79%,54%)"
        strokeWidth="0.8"
      />
      <text
        x={x + pad}
        y={y + 13}
        fill="hsl(46,79%,54%)"
        fontSize="10"
        fontFamily="Inter, sans-serif"
        fontWeight="500"
      >
        {text}
      </text>
    </motion.g>
  );
}

export default function App() {
  // FIX 9: Detect reduced motion preference (set by iOS/Android accessibility settings)
  const prefersReducedMotion = useReducedMotion();
  const shouldAnimate = !prefersReducedMotion;

  // FIX 7: Mobile nav state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  // FIX 3: Track the rendered SVG container width as a MotionValue.
  // Framer Motion x/y translations are CSS pixels, NOT SVG user-units.
  // On mobile the SVG scales down (viewBox 800px → ~390px rendered),
  // but a translateX(-600) still moves 600 CSS px — far off any mobile screen.
  // Multiplying by svgScale makes all translations proportional to rendered size.
  const svgContainerRef = useRef<HTMLDivElement>(null);
  const svgScaleMotion = useMotionValue(1);

  useEffect(() => {
    const updateScale = () => {
      if (svgContainerRef.current) {
        const w = svgContainerRef.current.getBoundingClientRect().width;
        svgScaleMotion.set(Math.min(1, w / 800));
      }
    };
    updateScale();
    window.addEventListener("resize", updateScale, { passive: true });
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Helper: scale-aware transform factory
  // FIX 3: All x/y values are multiplied by svgScaleMotion so they track
  // the actual rendered size of the SVG on any screen width.
  const mkX = (
    startP: number,
    maxVal: number,
  ): MotionValue<number> =>
    useTransform(
      [scrollYProgress, svgScaleMotion] as MotionValue<number>[],
      ([p, s]: number[]) => {
        const t = Math.max(0, Math.min(1, (p - startP) / (0.7 - startP)));
        return maxVal * s * t;
      },
    );

  const mkY = (
    startP: number,
    maxVal: number,
  ): MotionValue<number> =>
    useTransform(
      [scrollYProgress, svgScaleMotion] as MotionValue<number>[],
      ([p, s]: number[]) => {
        const t = Math.max(0, Math.min(1, (p - startP) / (0.7 - startP)));
        return maxVal * s * t;
      },
    );

  // Wheels — start at 0.1
  const fwX = mkX(0.1, -600);
  const fwY = mkY(0.1, 100);
  const fwR = useTransform(scrollYProgress, [0.1, 0.7], [0, -720]);

  const rwX = mkX(0.1, 600);
  const rwY = mkY(0.1, 100);
  const rwR = useTransform(scrollYProgress, [0.1, 0.7], [0, 720]);

  // Headlight / windscreen — 0.15
  const hlX = mkX(0.15, -500);
  const hlY = mkY(0.15, -150);
  const wsX = mkX(0.15, -450);
  const wsY = mkY(0.15, -300);
  const wsR = useTransform(scrollYProgress, [0.15, 0.7], [0, -30]);

  // Handlebar / fork — 0.2
  const hbX = mkX(0.2, -200);
  const hbY = mkY(0.2, -300);
  const hbR = useTransform(scrollYProgress, [0.2, 0.7], [0, -45]);
  const fkX = mkX(0.2, -300);
  const fkY = mkY(0.2, -100);
  const fkR = useTransform(scrollYProgress, [0.2, 0.7], [0, -60]);

  // Tank / seat — 0.25
  const tkY = mkY(0.25, -350);
  const stX = mkX(0.25, 400);
  const stY = mkY(0.25, -200);
  const stR = useTransform(scrollYProgress, [0.25, 0.7], [0, 30]);

  // Engine / exhaust — 0.3
  const enY = mkY(0.3, 250);
  const exX = mkX(0.3, 500);
  const exY = mkY(0.3, 200);
  const exR = useTransform(scrollYProgress, [0.3, 0.7], [0, 45]);

  // Frame / fairing — 0.35
  const frR = useTransform(scrollYProgress, [0.35, 0.7], [0, 5]);
  const frO = useTransform(scrollYProgress, [0.35, 0.7], [1, 0.3]);
  const faX = mkX(0.35, 300);
  const faY = mkY(0.35, 100);
  const faR = useTransform(scrollYProgress, [0.35, 0.7], [0, 20]);

  // Chain / footpegs / kickstand — 0.4
  const chX = mkX(0.4, 200);
  const chY = mkY(0.4, 350);
  const chR = useTransform(scrollYProgress, [0.4, 0.7], [0, 180]);
  const fpX = mkX(0.4, -100);
  const fpY = mkY(0.4, 300);
  const fpR = useTransform(scrollYProgress, [0.4, 0.7], [0, 90]);
  const ksX = mkX(0.4, -200);
  const ksY = mkY(0.4, 400);
  const ksR = useTransform(scrollYProgress, [0.4, 0.7], [0, -90]);

  const labelsOpacity = useTransform(scrollYProgress, [0.5, 0.6], [0, 1]);
  const initialTextOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const scrollIndicatorOpacity = useTransform(
    scrollYProgress,
    [0, 0.05],
    [1, 0],
  );
  const finalTextOpacity = useTransform(scrollYProgress, [0.7, 0.8], [0, 1]);

  const storyText =
    "More than just a garage. We are a community built on passion for two wheels. Every bike tells a story and we help you write yours.".split(
      " ",
    );
  const storyRef = useRef(null);
  const { scrollYProgress: storyProgress } = useScroll({
    target: storyRef,
    offset: ["start 80%", "center center"],
  });

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-black">
      {/* FIX 7: Mobile navigation with hamburger menu */}
      <nav className="fixed top-0 w-full z-50 px-6 flex items-center justify-between border-b border-border/10 liquid-glass h-16">
        <div className="flex items-center gap-2 text-primary">
          <img
            src="https://github.com/Roshancom/brothers-garage/blob/main/public/images/logo.png?raw=true"
            alt="Brothers Garage logo"
            height={50}
            width={100}
            className="object-cover"
          />
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex gap-8 text-sm font-medium">
          {["Home", "Parts", "About", "Contact"].map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-muted-foreground hover:text-primary transition-colors uppercase tracking-wider"
            >
              {link}
            </a>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-muted-foreground hover:text-primary transition-colors p-2"
          onClick={() => setMobileMenuOpen((v) => !v)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-black/95 border-b border-border/20 py-4 flex flex-col md:hidden">
            {["Home", "Parts", "About", "Contact"].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={() => setMobileMenuOpen(false)}
                className="px-6 py-3 text-muted-foreground hover:text-primary active:text-primary transition-colors uppercase tracking-wider text-sm"
              >
                {link}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* Hero Scroll Section */}
      <section ref={containerRef} className="h-[500vh] relative" id="home">
        {/* FIX 5: Use 100dvh instead of h-screen.
            On iOS Safari, 100vh is the viewport height excluding the dynamic
            toolbar, so the sticky element gets clipped. 100dvh tracks the
            actual visible viewport as the toolbar appears/disappears. */}
        <div
          className="sticky top-0 w-full overflow-hidden flex items-center justify-center"
          style={{ height: "100dvh" }}
        >
          {/* Radial Gradient Glow */}
          <div className="absolute inset-0 flex items-center justify-center opacity-40 pointer-events-none">
            <div className="w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,hsl(46,79%,54%/0.15),transparent_70%)]" />
          </div>

          <motion.div
            className="absolute top-1/4 text-center z-10 px-4"
            style={{ opacity: initialTextOpacity }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-7xl font-serif italic text-white tracking-tight drop-shadow-2xl">
              <WavyText
                text="Built From The Ground Up"
                shouldAnimate={shouldAnimate}
              />
            </h1>
            <ScrollIcon />
          </motion.div>

          {/* FIX 2 & 3: SVG container ref captures rendered width for scale computation */}
          <div
            ref={svgContainerRef}
            className="relative w-[800px] h-[500px] max-w-full px-4"
            style={{
              filter: "drop-shadow(0 0 20px rgba(212, 160, 23, 0.3))",
            }}
          >
            <svg
              viewBox="0 0 800 500"
              className="w-full h-full"
              style={{ overflow: "visible" }}
            >
              <defs>
                <linearGradient
                  id="gold-grad"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="hsl(46,79%,54%)" />
                  <stop offset="100%" stopColor="#8c6a0b" />
                </linearGradient>
              </defs>

              {/* FIX 2: All motion.g elements use className="svg-part" which applies
                  transform-box: fill-box; transform-origin: center via CSS.
                  This fixes pixel-based transformOrigin values that don't scale
                  with the SVG viewBox on mobile — they referred to absolute CSS
                  pixel positions that were wrong on scaled-down viewports. */}

              {/* Frame */}
              <motion.g
                className="svg-part"
                style={{ rotate: frR, opacity: frO }}
              >
                <path
                  d="M 250 200 L 550 200 L 450 350 L 300 350 Z"
                  fill="#222"
                  stroke="#444"
                  strokeWidth="4"
                />
                <path
                  d="M 550 200 L 600 250 L 450 350"
                  fill="none"
                  stroke="#333"
                  strokeWidth="8"
                />
              </motion.g>

              {/* Rear Wheel */}
              <motion.g
                className="svg-part"
                style={{ x: rwX, y: rwY, rotate: rwR }}
              >
                <circle
                  cx="650"
                  cy="350"
                  r="80"
                  fill="none"
                  stroke="#111"
                  strokeWidth="24"
                />
                <circle
                  cx="650"
                  cy="350"
                  r="65"
                  fill="none"
                  stroke="#333"
                  strokeWidth="4"
                />
                <circle cx="650" cy="350" r="15" fill="url(#gold-grad)" />
                {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                  <line
                    key={deg}
                    x1="650"
                    y1="350"
                    x2={650 + Math.cos((deg * Math.PI) / 180) * 65}
                    y2={350 + Math.sin((deg * Math.PI) / 180) * 65}
                    stroke="#555"
                    strokeWidth="4"
                  />
                ))}
                {/* FIX 4: SVG-native label — no foreignObject (broken on iOS Safari) */}
                <SvgLabel x={610} y={220} text="2. Rear Wheel" opacity={labelsOpacity} />
              </motion.g>

              {/* Front Wheel */}
              <motion.g
                className="svg-part"
                style={{ x: fwX, y: fwY, rotate: fwR }}
              >
                <circle
                  cx="150"
                  cy="350"
                  r="80"
                  fill="none"
                  stroke="#111"
                  strokeWidth="24"
                />
                <circle
                  cx="150"
                  cy="350"
                  r="65"
                  fill="none"
                  stroke="#333"
                  strokeWidth="4"
                />
                <circle cx="150" cy="350" r="15" fill="url(#gold-grad)" />
                {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                  <line
                    key={deg}
                    x1="150"
                    y1="350"
                    x2={150 + Math.cos((deg * Math.PI) / 180) * 65}
                    y2={350 + Math.sin((deg * Math.PI) / 180) * 65}
                    stroke="#555"
                    strokeWidth="4"
                  />
                ))}
                <SvgLabel x={50} y={220} text="1. Front Wheel" opacity={labelsOpacity} />
              </motion.g>

              {/* Engine Block */}
              <motion.g className="svg-part" style={{ y: enY }}>
                <rect
                  x="350"
                  y="240"
                  width="120"
                  height="100"
                  rx="10"
                  fill="#1a1a1a"
                  stroke="url(#gold-grad)"
                  strokeWidth="2"
                />
                <rect x="360" y="250" width="100" height="10" fill="#333" />
                <rect x="360" y="270" width="100" height="10" fill="#333" />
                <rect x="360" y="290" width="100" height="10" fill="#333" />
                <rect x="360" y="310" width="100" height="10" fill="#333" />
                <circle
                  cx="410"
                  cy="290"
                  r="25"
                  fill="#111"
                  stroke="#444"
                  strokeWidth="4"
                />
                <SvgLabel x={350} y={350} text="6. Engine Block" opacity={labelsOpacity} />
              </motion.g>

              {/* Exhaust */}
              <motion.g
                className="svg-part"
                style={{ x: exX, y: exY, rotate: exR }}
              >
                <path
                  d="M 410 330 Q 450 380 500 360 L 680 300"
                  fill="none"
                  stroke="#666"
                  strokeWidth="16"
                  strokeLinecap="round"
                />
                <path
                  d="M 600 330 L 700 290 L 700 310 L 600 350 Z"
                  fill="#222"
                  stroke="url(#gold-grad)"
                  strokeWidth="2"
                />
                <SvgLabel x={610} y={350} text="9. Exhaust Pipe" opacity={labelsOpacity} />
              </motion.g>

              {/* Front Fork */}
              <motion.g
                className="svg-part"
                style={{ x: fkX, y: fkY, rotate: fkR }}
              >
                <line
                  x1="150"
                  y1="350"
                  x2="250"
                  y2="150"
                  stroke="url(#gold-grad)"
                  strokeWidth="12"
                  strokeLinecap="round"
                />
                <line
                  x1="155"
                  y1="352"
                  x2="255"
                  y2="152"
                  stroke="#888"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <SvgLabel x={170} y={200} text="8. Suspension" opacity={labelsOpacity} />
              </motion.g>

              {/* Handlebar */}
              <motion.g
                className="svg-part"
                style={{ x: hbX, y: hbY, rotate: hbR }}
              >
                <path
                  d="M 230 160 Q 250 140 280 150"
                  fill="none"
                  stroke="#222"
                  strokeWidth="10"
                  strokeLinecap="round"
                />
                <circle cx="280" cy="150" r="8" fill="#111" />
                <SvgLabel x={220} y={100} text="7. Handlebar" opacity={labelsOpacity} />
              </motion.g>

              {/* Headlight */}
              <motion.g className="svg-part" style={{ x: hlX, y: hlY }}>
                <path
                  d="M 180 160 C 200 160 210 180 200 200 C 180 200 170 180 180 160 Z"
                  fill="#111"
                  stroke="#333"
                  strokeWidth="4"
                />
                <circle
                  cx="190"
                  cy="180"
                  r="10"
                  fill="#fff"
                  filter="drop-shadow(0 0 8px #fff)"
                />
                <SvgLabel x={100} y={150} text="10. Headlight" opacity={labelsOpacity} />
              </motion.g>

              {/* Windscreen */}
              <motion.g
                className="svg-part"
                style={{ x: wsX, y: wsY, rotate: wsR }}
              >
                <path
                  d="M 180 160 Q 190 120 230 130"
                  fill="none"
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
                <SvgLabel x={140} y={90} text="11. Windscreen" opacity={labelsOpacity} />
              </motion.g>

              {/* Fuel Tank */}
              <motion.g className="svg-part" style={{ y: tkY }}>
                <path
                  d="M 280 180 Q 320 120 400 160 Q 420 180 430 200 L 250 200 Z"
                  fill="#111"
                  stroke="#333"
                  strokeWidth="2"
                />
                <path
                  d="M 290 170 Q 320 130 380 160"
                  fill="none"
                  stroke="url(#gold-grad)"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <SvgLabel x={300} y={100} text="5. Fuel Tank" opacity={labelsOpacity} />
              </motion.g>

              {/* Seat */}
              <motion.g
                className="svg-part"
                style={{ x: stX, y: stY, rotate: stR }}
              >
                <path
                  d="M 430 200 Q 480 180 550 180 Q 560 200 550 210 L 440 210 Z"
                  fill="#050505"
                  stroke="#222"
                  strokeWidth="2"
                />
                <SvgLabel x={460} y={140} text="4. Seat" opacity={labelsOpacity} />
              </motion.g>

              {/* Fairing */}
              <motion.g
                className="svg-part"
                style={{ x: faX, y: faY, rotate: faR }}
              >
                <path
                  d="M 220 200 Q 280 200 350 250 L 250 300 Z"
                  fill="#151515"
                  stroke="#333"
                  strokeWidth="2"
                />
                <path
                  d="M 250 220 L 300 250"
                  fill="none"
                  stroke="url(#gold-grad)"
                  strokeWidth="4"
                />
                <SvgLabel x={230} y={310} text="12. Fairing" opacity={labelsOpacity} />
              </motion.g>

              {/* Chain */}
              <motion.g
                className="svg-part"
                style={{ x: chX, y: chY, rotate: chR }}
              >
                <path
                  d="M 410 290 L 650 350"
                  fill="none"
                  stroke="#444"
                  strokeWidth="6"
                  strokeDasharray="4 4"
                />
                <SvgLabel x={480} y={380} text="13. Chain" opacity={labelsOpacity} />
              </motion.g>

              {/* Footpegs */}
              <motion.g
                className="svg-part"
                style={{ x: fpX, y: fpY, rotate: fpR }}
              >
                <rect
                  x="440"
                  y="325"
                  width="30"
                  height="10"
                  rx="4"
                  fill="#222"
                  stroke="#555"
                  strokeWidth="2"
                />
                <SvgLabel x={400} y={360} text="14. Footpegs" opacity={labelsOpacity} />
              </motion.g>

              {/* Kickstand */}
              <motion.g
                className="svg-part"
                style={{ x: ksX, y: ksY, rotate: ksR }}
              >
                <line
                  x1="380"
                  y1="350"
                  x2="350"
                  y2="420"
                  stroke="#333"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
                <SvgLabel x={280} y={420} text="15. Kickstand" opacity={labelsOpacity} />
              </motion.g>
            </svg>
          </div>

          <motion.div
            className="absolute bottom-1/4 text-center z-10 px-4"
            style={{ opacity: finalTextOpacity }}
          >
            <h2 className="text-4xl sm:text-5xl md:text-8xl font-serif italic text-primary drop-shadow-[0_0_15px_rgba(212,160,23,0.5)]">
              Every Part Matters
            </h2>
            <p className="text-white mt-4 tracking-widest uppercase text-sm md:text-base">
              15 Parts / 1 Machine
            </p>
          </motion.div>

          <motion.div
            className="absolute bottom-10"
            style={{ opacity: scrollIndicatorOpacity }}
          >
            <ChevronDown className="w-8 h-8 text-primary animate-bounce" />
          </motion.div>
        </div>
      </section>

      {/* Parts Showcase */}
      <section
        className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto relative z-10 bg-background"
        id="parts"
      >
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-6xl font-serif italic mb-4">
            Premium Upgrades
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {parts.map((part, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              // FIX 10: Add active: states as touch-friendly alternatives to hover.
              // On mobile, :hover fires on first tap then lingers; :active fires
              // reliably on every touch interaction.
              className="group bg-card border border-border/50 rounded-xl overflow-hidden active:border-primary/50 hover:border-primary/50 transition-colors duration-500 flex flex-col"
            >
              <div className="h-48 border-t-2 border-primary overflow-hidden relative">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent group-active:bg-transparent transition-colors z-10" />
                <img
                  src={part.img}
                  alt={part.name}
                  className="w-full h-full object-cover transform group-hover:scale-105 group-active:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-white mb-2">
                  {part.name}
                </h3>
                <p className="text-muted-foreground text-sm flex-1">
                  {part.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 md:py-32 px-6 bg-black relative" id="about">
        <div className="max-w-5xl mx-auto">
          <div
            className="text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-serif leading-tight mb-24 relative"
            ref={storyRef}
          >
            {/* FIX 1: Use StoryWord component — hooks must not be called inside .map() */}
            {storyText.map((word, i) => {
              const isHighlight = ["community", "passion", "story"].includes(
                word.replace(/[—.]/g, "").toLowerCase(),
              );
              return (
                <StoryWord
                  key={i}
                  word={word}
                  progress={storyProgress}
                  index={i}
                  total={storyText.length}
                  isHighlight={isHighlight}
                />
              );
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-border/50 pt-16">
            <div>
              <div className="text-5xl md:text-6xl font-bold text-primary font-mono mb-2">
                <Counter from={0} to={500} />
              </div>
              <div className="text-muted-foreground uppercase tracking-widest text-sm">
                Bikes Serviced
              </div>
            </div>
            <div>
              <div className="text-5xl md:text-6xl font-bold text-primary font-mono mb-2">
                <Counter from={0} to={1000} />
              </div>
              <div className="text-muted-foreground uppercase tracking-widest text-sm">
                Parts Available
              </div>
            </div>
            <div>
              <div className="text-5xl md:text-6xl font-bold text-primary font-mono mb-2">
                <Counter from={0} to={50} />
              </div>
              <div className="text-muted-foreground uppercase tracking-widest text-sm">
                Expert Mechanics
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 md:py-32 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Wrench,
              title: "Expert Servicing",
              desc: "Precision maintenance and repairs by certified master mechanics.",
            },
            {
              icon: Settings,
              title: "Genuine Parts",
              desc: "100% authentic OEM and premium aftermarket components.",
            },
            {
              icon: MessageCircle,
              title: "Custom Consulting",
              desc: "1-on-1 build planning for your dream custom motorcycle project.",
            },
          ].map((srv, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-card p-8 md:p-10 rounded-2xl border border-transparent hover:border-primary/30 active:border-primary/30 transition-all duration-500 hover:shadow-[0_0_30px_rgba(212,160,23,0.05)] group"
            >
              {/* FIX 10: group-active mirrors group-hover for touch devices */}
              <srv.icon className="w-12 h-12 text-primary mb-6 transform group-hover:scale-110 group-active:scale-110 transition-transform" />
              <h3 className="text-2xl font-bold mb-4">{srv.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{srv.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-24 md:py-32 relative overflow-hidden bg-black"
        id="contact"
      >
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_20%,hsl(46,79%,54%/0.1)_50%,transparent_80%)]" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <Wrench className="w-12 h-12 text-primary mx-auto mb-8" />
          <h2 className="text-5xl sm:text-6xl md:text-8xl font-serif italic text-white mb-6">
            Ready to Ride?
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Drop by the garage or schedule your service online. Your beast
            deserves the best.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a
              href="https://wa.me/9779851147295?text=Hi%2C%20I%27d%20like%20to%20book%20a%20service%20at%20Brothers%20Garage."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <Button
                size="lg"
                className="h-14 md:h-16 px-10 text-lg bg-primary text-black hover:bg-primary/90 active:bg-primary/80 font-bold tracking-wider w-full"
              >
                BOOK SERVICE
              </Button>
            </a>
            <a
              href="https://wa.me/9779851147295?text=Hi%2C%20I%27d%20like%20to%20get%20a%20quote%20from%20Brothers%20Garage."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <Button
                size="lg"
                variant="outline"
                className="h-14 md:h-16 px-10 text-lg border-primary/50 text-white hover:bg-primary/10 active:bg-primary/10 w-full liquid-glass"
              >
                GET A QUOTE
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/20 py-12 px-6 bg-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-muted-foreground text-sm">
            © 2026 Brothers Garage. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <a
              href="https://www.instagram.com/brothersgarage_official/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5 text-muted-foreground hover:text-primary active:text-primary cursor-pointer transition-colors" />
            </a>
            <a
              href="https://www.facebook.com/brothersgarages"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5 text-muted-foreground hover:text-primary active:text-primary cursor-pointer transition-colors" />
            </a>
            <a
              href="https://www.youtube.com/@brothersgarage1920/videos"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
            >
              <Youtube className="w-5 h-5 text-muted-foreground hover:text-primary active:text-primary cursor-pointer transition-colors" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
