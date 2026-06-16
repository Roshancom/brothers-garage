import {
  motion,
  MotionValue,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useRef } from "react";
import { WavyText } from "../ui/WavyText";
import { ScrollIcon } from "../ui/ScrollIcon";
import { SvgLabel } from "../ui/SvgLabel";
import { ChevronDown } from "lucide-react";

const BikeScroll = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // SVG scale tracking
  const svgContainerRef = useRef<HTMLDivElement>(null);
  const svgScaleMotion = useMotionValue(1);

  const prefersReducedMotion = useReducedMotion();
  const shouldAnimate = !prefersReducedMotion;

  // Scale-aware transform helpers
  const mkX = (startP: number, maxVal: number): MotionValue<number> =>
    useTransform(
      [scrollYProgress, svgScaleMotion] as MotionValue<number>[],
      ([p, s]: number[]) =>
        maxVal * s * Math.max(0, Math.min(1, (p - startP) / (0.7 - startP))),
    );
  const mkY = (startP: number, maxVal: number): MotionValue<number> =>
    useTransform(
      [scrollYProgress, svgScaleMotion] as MotionValue<number>[],
      ([p, s]: number[]) =>
        maxVal * s * Math.max(0, Math.min(1, (p - startP) / (0.7 - startP))),
    );

  const fwX = mkX(0.1, -600);
  const fwY = mkY(0.1, 100);
  const fwR = useTransform(scrollYProgress, [0.1, 0.7], [0, -720]);
  const rwX = mkX(0.1, 600);
  const rwY = mkY(0.1, 100);
  const rwR = useTransform(scrollYProgress, [0.1, 0.7], [0, 720]);
  const hlX = mkX(0.15, -500);
  const hlY = mkY(0.15, -150);
  const wsX = mkX(0.15, -450);
  const wsY = mkY(0.15, -300);
  const wsR = useTransform(scrollYProgress, [0.15, 0.7], [0, -30]);
  const hbX = mkX(0.2, -200);
  const hbY = mkY(0.2, -300);
  const hbR = useTransform(scrollYProgress, [0.2, 0.7], [0, -45]);
  const fkX = mkX(0.2, -300);
  const fkY = mkY(0.2, -100);
  const fkR = useTransform(scrollYProgress, [0.2, 0.7], [0, -60]);
  const tkY = mkY(0.25, -350);
  const stX = mkX(0.25, 400);
  const stY = mkY(0.25, -200);
  const stR = useTransform(scrollYProgress, [0.25, 0.7], [0, 30]);
  const enY = mkY(0.3, 250);
  const exX = mkX(0.3, 500);
  const exY = mkY(0.3, 200);
  const exR = useTransform(scrollYProgress, [0.3, 0.7], [0, 45]);
  const frR = useTransform(scrollYProgress, [0.35, 0.7], [0, 5]);
  const frO = useTransform(scrollYProgress, [0.35, 0.7], [1, 0.3]);
  const faX = mkX(0.35, 300);
  const faY = mkY(0.35, 100);
  const faR = useTransform(scrollYProgress, [0.35, 0.7], [0, 20]);
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
  const scrollIndicatorOp = useTransform(scrollYProgress, [0, 0.05], [1, 0]);
  const finalTextOpacity = useTransform(scrollYProgress, [0.7, 0.8], [0, 1]);

  useEffect(() => {
    const update = () => {
      if (svgContainerRef.current) {
        const w = svgContainerRef.current.getBoundingClientRect().width;
        svgScaleMotion.set(Math.min(1, w / 800));
      }
    };
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <section
      ref={containerRef}
      className="h-[200vh] md:h-[300vh] lg:h-[400vh] xl:h-[500vh] relative"
      id="home"
    >
      <div
        className="sticky top-0 w-full overflow-hidden flex items-center justify-center"
        style={{ height: "100dvh" }}
      >
        {/* Radial glow */}
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

        {/* SVG container */}
        <div
          ref={svgContainerRef}
          className="relative w-[800px] h-[500px] max-w-full px-4"
          style={{ filter: "drop-shadow(0 0 20px rgba(212, 160, 23, 0.3))" }}
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
              <filter id="hglow" x="-80%" y="-80%" width="260%" height="260%">
                <feGaussianBlur stdDeviation="4" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* 15. FRAME / CHASSIS */}
            <motion.g
              className="svg-part"
              style={{ rotate: frR, opacity: frO }}
            >
              <path
                d="M 258 188 C 370 172 440 175 508 205 L 556 272"
                fill="none"
                stroke="url(#gold-grad)"
                strokeWidth="9"
                strokeLinecap="round"
              />
              <path
                d="M 260 210 Q 322 268 364 310"
                fill="none"
                stroke="#888"
                strokeWidth="8"
                strokeLinecap="round"
              />
              <path
                d="M 364 310 L 464 393"
                fill="none"
                stroke="#888"
                strokeWidth="8"
                strokeLinecap="round"
              />
              <path
                d="M 245 175 L 262 220"
                stroke="#bbb"
                strokeWidth="17"
                strokeLinecap="round"
              />
              <path
                d="M 245 175 L 262 220"
                stroke="#333"
                strokeWidth="10"
                strokeLinecap="round"
              />
              <path
                d="M 554 272 L 622 387"
                fill="none"
                stroke="#666"
                strokeWidth="6"
                strokeLinecap="round"
              />
              <path
                d="M 502 200 L 556 272"
                fill="none"
                stroke="#555"
                strokeWidth="5"
                strokeLinecap="round"
              />
              <path
                d="M 330 270 L 385 298"
                fill="none"
                stroke="#444"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <path
                d="M 248 212 L 292 262 L 278 266 L 235 218 Z"
                fill="#1a1a1a"
                stroke="#333"
                strokeWidth="1"
              />
              <path
                d="M 460 188 L 578 218 L 578 236 L 460 208 Z"
                fill="#0d0d0d"
                stroke="#2a2a2a"
                strokeWidth="2"
              />
              <line
                x1="464"
                y1="189"
                x2="576"
                y2="219"
                stroke="hsl(46,79%,54%)"
                strokeWidth="1.5"
                opacity="0.55"
              />
              <line
                x1="472"
                y1="196"
                x2="576"
                y2="223"
                stroke="#1e1e1e"
                strokeWidth="1"
              />
              <line
                x1="490"
                y1="200"
                x2="576"
                y2="226"
                stroke="#1e1e1e"
                strokeWidth="1"
              />
              <line
                x1="510"
                y1="203"
                x2="576"
                y2="228"
                stroke="#1e1e1e"
                strokeWidth="1"
              />
              <SvgLabel
                x={372}
                y={148}
                text="15. Frame"
                opacity={labelsOpacity}
              />
            </motion.g>

            {/* 2. REAR KNOBBY TIRE */}
            <motion.g
              className="svg-part"
              style={{ x: rwX, y: rwY, rotate: rwR }}
            >
              <circle
                cx="620"
                cy="392"
                r="70"
                fill="none"
                stroke="#0c0c0c"
                strokeWidth="26"
              />
              <circle
                cx="620"
                cy="392"
                r="59"
                fill="none"
                stroke="#1e1e1e"
                strokeWidth="2"
              />
              {Array.from({ length: 24 }, (_, i) => {
                const a = (i / 24) * Math.PI * 2;
                const big = i % 3 !== 2;
                return (
                  <line
                    key={i}
                    x1={620 + Math.cos(a) * 57}
                    y1={392 + Math.sin(a) * 57}
                    x2={620 + Math.cos(a) * 70}
                    y2={392 + Math.sin(a) * 70}
                    stroke={big ? "#2e2e2e" : "#111"}
                    strokeWidth={big ? 8 : 4}
                    strokeLinecap="round"
                  />
                );
              })}
              <circle
                cx="620"
                cy="392"
                r="50"
                fill="none"
                stroke="#2a2a2a"
                strokeWidth="2"
              />
              {[0, 60, 120, 180, 240, 300].map((d) => (
                <line
                  key={d}
                  x1={620 + Math.cos((d * Math.PI) / 180) * 18}
                  y1={392 + Math.sin((d * Math.PI) / 180) * 18}
                  x2={620 + Math.cos((d * Math.PI) / 180) * 49}
                  y2={392 + Math.sin((d * Math.PI) / 180) * 49}
                  stroke="#555"
                  strokeWidth="4"
                />
              ))}
              <circle cx="620" cy="392" r="18" fill="url(#gold-grad)" />
              <circle cx="620" cy="392" r="10" fill="#111" />
              <circle cx="620" cy="392" r="5" fill="#888" />
              <SvgLabel
                x={575}
                y={262}
                text="2. Rear Knobby Tire"
                opacity={labelsOpacity}
              />
            </motion.g>

            {/* 1. FRONT KNOBBY TIRE */}
            <motion.g
              className="svg-part"
              style={{ x: fwX, y: fwY, rotate: fwR }}
            >
              <circle
                cx="165"
                cy="392"
                r="70"
                fill="none"
                stroke="#0c0c0c"
                strokeWidth="26"
              />
              <circle
                cx="165"
                cy="392"
                r="59"
                fill="none"
                stroke="#1e1e1e"
                strokeWidth="2"
              />
              {Array.from({ length: 24 }, (_, i) => {
                const a = (i / 24) * Math.PI * 2;
                const big = i % 3 !== 2;
                return (
                  <line
                    key={i}
                    x1={165 + Math.cos(a) * 57}
                    y1={392 + Math.sin(a) * 57}
                    x2={165 + Math.cos(a) * 70}
                    y2={392 + Math.sin(a) * 70}
                    stroke={big ? "#2e2e2e" : "#111"}
                    strokeWidth={big ? 8 : 4}
                    strokeLinecap="round"
                  />
                );
              })}
              <circle
                cx="165"
                cy="392"
                r="50"
                fill="none"
                stroke="#2a2a2a"
                strokeWidth="2"
              />
              {[0, 60, 120, 180, 240, 300].map((d) => (
                <line
                  key={d}
                  x1={165 + Math.cos((d * Math.PI) / 180) * 18}
                  y1={392 + Math.sin((d * Math.PI) / 180) * 18}
                  x2={165 + Math.cos((d * Math.PI) / 180) * 49}
                  y2={392 + Math.sin((d * Math.PI) / 180) * 49}
                  stroke="#555"
                  strokeWidth="4"
                />
              ))}
              <circle cx="165" cy="392" r="18" fill="url(#gold-grad)" />
              <circle cx="165" cy="392" r="10" fill="#111" />
              <circle cx="165" cy="392" r="5" fill="#888" />
              <SvgLabel
                x={38}
                y={262}
                text="1. Front Knobby Tire"
                opacity={labelsOpacity}
              />
            </motion.g>

            {/* 9. ENGINE / CARBURETOR */}
            <motion.g className="svg-part" style={{ y: enY }}>
              <rect
                x="360"
                y="305"
                width="108"
                height="88"
                rx="6"
                fill="#141414"
                stroke="url(#gold-grad)"
                strokeWidth="2"
              />
              <path
                d="M 362 305 L 408 305 L 390 255 L 345 263 Z"
                fill="#1c1c1c"
                stroke="#555"
                strokeWidth="1.5"
              />
              {[0, 1, 2, 3, 4].map((i) => (
                <line
                  key={i}
                  x1={348 + i * 3}
                  y1={263 + i * 8}
                  x2={393 + i * 3}
                  y2={257 + i * 8}
                  stroke="#333"
                  strokeWidth="1.5"
                />
              ))}
              <rect
                x="382"
                y="247"
                width="26"
                height="16"
                rx="3"
                fill="#111"
                stroke="#444"
                strokeWidth="1.5"
              />
              {[319, 333, 347, 361, 375].map((y, i) => (
                <line
                  key={i}
                  x1="362"
                  y1={y}
                  x2="460"
                  y2={y}
                  stroke="#222"
                  strokeWidth="1"
                />
              ))}
              <rect
                x="422"
                y="316"
                width="38"
                height="58"
                rx="4"
                fill="#111"
                stroke="#333"
                strokeWidth="1"
              />
              <circle
                cx="441"
                cy="345"
                r="12"
                fill="#0d0d0d"
                stroke="#444"
                strokeWidth="2"
              />
              <circle cx="441" cy="345" r="5" fill="#2a2a2a" />
              <circle
                cx="382"
                cy="386"
                r="4"
                fill="#666"
                stroke="#888"
                strokeWidth="1"
              />
              <SvgLabel
                x={360}
                y={400}
                text="9. Engine / Carburetor"
                opacity={labelsOpacity}
              />
            </motion.g>

            {/* 14. HIGH-MOUNT EXHAUST */}
            <motion.g
              className="svg-part"
              style={{ x: exX, y: exY, rotate: exR }}
            >
              <path
                d="M 456 348 Q 470 332 474 312"
                fill="none"
                stroke="#888"
                strokeWidth="14"
                strokeLinecap="round"
              />
              <path
                d="M 474 312 Q 492 282 500 255 Q 514 225 524 200"
                fill="none"
                stroke="#666"
                strokeWidth="12"
                strokeLinecap="round"
              />
              {[305, 278, 252].map((y, i) => (
                <rect
                  key={i}
                  x={478 + i * 8}
                  y={y - 5}
                  width="18"
                  height="9"
                  rx="3"
                  fill="#333"
                  stroke="#555"
                  strokeWidth="1"
                  transform={`rotate(-20,${487 + i * 8},${y})`}
                />
              ))}
              <path
                d="M 524 200 Q 538 178 552 162"
                fill="none"
                stroke="#555"
                strokeWidth="10"
                strokeLinecap="round"
              />
              <path
                d="M 548 155 L 594 142 L 596 157 L 550 170 Z"
                fill="#1a1a1a"
                stroke="url(#gold-grad)"
                strokeWidth="2"
              />
              <circle
                cx="595"
                cy="150"
                r="7"
                fill="#111"
                stroke="#888"
                strokeWidth="2"
              />
              <line
                x1="590"
                y1="143"
                x2="590"
                y2="157"
                stroke="#555"
                strokeWidth="1.5"
              />
              <SvgLabel
                x={545}
                y={112}
                text="14. High-Mount Exhaust"
                opacity={labelsOpacity}
              />
            </motion.g>

            {/* 3. LONG TRAVEL FRONT FORK */}
            <motion.g
              className="svg-part"
              style={{ x: fkX, y: fkY, rotate: fkR }}
            >
              <line
                x1="182"
                y1="322"
                x2="266"
                y2="170"
                stroke="url(#gold-grad)"
                strokeWidth="11"
                strokeLinecap="round"
              />
              <line
                x1="152"
                y1="322"
                x2="236"
                y2="170"
                stroke="#999"
                strokeWidth="8"
                strokeLinecap="round"
              />
              <path
                d="M 233 170 L 270 170 L 266 153 L 237 153 Z"
                fill="#1a1a1a"
                stroke="#666"
                strokeWidth="2"
              />
              <rect
                x="147"
                y="293"
                width="18"
                height="14"
                rx="3"
                fill="#222"
                stroke="#555"
                strokeWidth="1.5"
              />
              <rect
                x="178"
                y="293"
                width="18"
                height="14"
                rx="3"
                fill="#222"
                stroke="#555"
                strokeWidth="1.5"
              />
              <rect
                x="143"
                y="320"
                width="26"
                height="11"
                rx="3"
                fill="#111"
                stroke="#888"
                strokeWidth="2"
              />
              <rect
                x="173"
                y="320"
                width="26"
                height="11"
                rx="3"
                fill="#111"
                stroke="#888"
                strokeWidth="2"
              />
              <line
                x1="158"
                y1="312"
                x2="188"
                y2="310"
                stroke="#666"
                strokeWidth="5"
                strokeLinecap="round"
              />
              <SvgLabel
                x={150}
                y={215}
                text="3. Long Travel Front Fork"
                opacity={labelsOpacity}
              />
            </motion.g>

            {/* 5. MX HANDLEBAR */}
            <motion.g
              className="svg-part"
              style={{ x: hbX, y: hbY, rotate: hbR }}
            >
              <path
                d="M 185 148 L 254 138 L 322 143"
                fill="none"
                stroke="#aaa"
                strokeWidth="9"
                strokeLinecap="round"
              />
              <path
                d="M 212 145 L 294 140"
                fill="none"
                stroke="#666"
                strokeWidth="5"
                strokeLinecap="round"
              />
              <rect
                x="248"
                y="138"
                width="14"
                height="20"
                rx="3"
                fill="#333"
                stroke="#777"
                strokeWidth="2"
              />
              <rect
                x="183"
                y="143"
                width="24"
                height="10"
                rx="4"
                fill="#111"
                stroke="#555"
                strokeWidth="1.5"
              />
              <rect
                x="318"
                y="138"
                width="24"
                height="10"
                rx="4"
                fill="#111"
                stroke="#555"
                strokeWidth="1.5"
              />
              <path
                d="M 198 149 L 186 162"
                fill="none"
                stroke="#666"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <circle cx="334" cy="143" r="5" fill="#444" />
              <SvgLabel
                x={218}
                y={106}
                text="5. MX Handlebar"
                opacity={labelsOpacity}
              />
            </motion.g>

            {/* 6. HEADLIGHT */}
            <motion.g className="svg-part" style={{ x: hlX, y: hlY }}>
              <path
                d="M 228 192 L 270 186 L 267 213 L 225 219 Z"
                fill="#111"
                stroke="#333"
                strokeWidth="2.5"
              />
              <path
                d="M 231 195 L 266 189 L 264 211 L 229 217 Z"
                fill="#1a1a1a"
                stroke="#444"
                strokeWidth="1"
              />
              <ellipse
                cx="248"
                cy="203"
                rx="15"
                ry="9"
                fill="rgba(255,255,180,0.08)"
              />
              <circle
                cx="248"
                cy="203"
                r="6"
                fill="#fff"
                filter="drop-shadow(0 0 8px rgba(255,255,200,0.9))"
              />
              <SvgLabel
                x={164}
                y={162}
                text="6. Headlight"
                opacity={labelsOpacity}
              />
            </motion.g>

            {/* 4. FRONT FENDER */}
            <motion.g
              className="svg-part"
              style={{ x: wsX, y: wsY, rotate: wsR }}
            >
              <path
                d="M 105 334 Q 130 268 192 298 L 196 311 Q 138 283 112 344 Z"
                fill="#111"
                stroke="url(#gold-grad)"
                strokeWidth="2"
              />
              <path
                d="M 109 342 Q 135 276 193 305"
                fill="none"
                stroke="#333"
                strokeWidth="1.5"
              />
              <rect
                x="148"
                y="268"
                width="18"
                height="10"
                rx="3"
                fill="#1a1a1a"
                stroke="#555"
                strokeWidth="1.5"
              />
              <SvgLabel
                x={62}
                y={237}
                text="4. Front Fender"
                opacity={labelsOpacity}
              />
            </motion.g>

            {/* 7. FUEL TANK */}
            <motion.g className="svg-part" style={{ y: tkY }}>
              <path
                d="M 265 170 Q 362 152 464 177 L 462 234 Q 372 247 265 224 Z"
                fill="#111"
                stroke="#333"
                strokeWidth="2"
              />
              <ellipse
                cx="352"
                cy="157"
                rx="18"
                ry="8"
                fill="#1a1a1a"
                stroke="#666"
                strokeWidth="2"
              />
              <ellipse cx="352" cy="155" rx="10" ry="4" fill="#333" />
              <path
                d="M 273 188 Q 363 170 457 194"
                fill="none"
                stroke="url(#gold-grad)"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <path
                d="M 276 200 Q 364 183 456 205"
                fill="none"
                stroke="hsl(46,79%,54%)"
                strokeWidth="1.5"
                strokeLinecap="round"
                opacity="0.45"
              />
              <path
                d="M 265 170 L 292 154 Q 362 140 440 165 L 464 177"
                fill="none"
                stroke="#3a3a3a"
                strokeWidth="1.5"
              />
              <SvgLabel
                x={296}
                y={120}
                text="7. Fuel Tank"
                opacity={labelsOpacity}
              />
            </motion.g>

            {/* 8. AIR FILTER BOX */}
            <motion.g
              className="svg-part"
              style={{ x: stX, y: stY, rotate: stR }}
            >
              <rect
                x="466"
                y="296"
                width="68"
                height="72"
                rx="6"
                fill="#141414"
                stroke="#444"
                strokeWidth="2"
              />
              <rect
                x="472"
                y="304"
                width="56"
                height="56"
                rx="4"
                fill="#0a0a0a"
                stroke="#333"
                strokeWidth="1"
              />
              <rect
                x="475"
                y="308"
                width="50"
                height="48"
                rx="3"
                fill="#1e1002"
                stroke="hsl(46,79%,54%)"
                strokeWidth="1.5"
              />
              {[314, 323, 332, 341, 350].map((y, i) => (
                <line
                  key={i}
                  x1="476"
                  y1={y}
                  x2="524"
                  y2={y}
                  stroke="hsl(46,60%,35%)"
                  strokeWidth="1"
                  opacity="0.6"
                />
              ))}
              {[301, 310, 319].map((y, i) => (
                <rect
                  key={i}
                  x="468"
                  y={y}
                  width="8"
                  height="4"
                  rx="1"
                  fill="#222"
                />
              ))}
              <SvgLabel
                x={464}
                y={266}
                text="8. Air Filter Box"
                opacity={labelsOpacity}
              />
            </motion.g>

            {/* 12. REAR SWINGARM */}
            <motion.g
              className="svg-part"
              style={{ x: faX, y: faY, rotate: faR }}
            >
              <path
                d="M 490 350 L 623 387"
                fill="none"
                stroke="url(#gold-grad)"
                strokeWidth="10"
                strokeLinecap="round"
              />
              <path
                d="M 490 363 L 623 398"
                fill="none"
                stroke="#666"
                strokeWidth="6"
                strokeLinecap="round"
              />
              <rect
                x="482"
                y="344"
                width="16"
                height="24"
                rx="3"
                fill="#1a1a1a"
                stroke="#888"
                strokeWidth="2"
              />
              <rect
                x="618"
                y="382"
                width="16"
                height="22"
                rx="3"
                fill="#1a1a1a"
                stroke="#888"
                strokeWidth="2"
              />
              <path
                d="M 510 361 L 582 380"
                fill="none"
                stroke="#333"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <SvgLabel
                x={505}
                y={408}
                text="12. Rear Swingarm"
                opacity={labelsOpacity}
              />
            </motion.g>

            {/* 13. CHAIN & SPROCKET */}
            <motion.g
              className="svg-part"
              style={{ x: chX, y: chY, rotate: chR }}
            >
              <path
                d="M 460 388 L 620 393"
                fill="none"
                stroke="#444"
                strokeWidth="7"
                strokeDasharray="6 5"
              />
              <circle
                cx="462"
                cy="388"
                r="14"
                fill="#111"
                stroke="#555"
                strokeWidth="2"
              />
              {[0, 45, 90, 135, 180, 225, 270, 315].map((d) => (
                <line
                  key={d}
                  x1={462 + Math.cos((d * Math.PI) / 180) * 8}
                  y1={388 + Math.sin((d * Math.PI) / 180) * 8}
                  x2={462 + Math.cos((d * Math.PI) / 180) * 14}
                  y2={388 + Math.sin((d * Math.PI) / 180) * 14}
                  stroke="#666"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              ))}
              <circle cx="462" cy="388" r="5" fill="url(#gold-grad)" />
              <circle
                cx="620"
                cy="393"
                r="20"
                fill="none"
                stroke="#444"
                strokeWidth="4"
              />
              {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(
                (d) => (
                  <line
                    key={d}
                    x1={620 + Math.cos((d * Math.PI) / 180) * 13}
                    y1={393 + Math.sin((d * Math.PI) / 180) * 13}
                    x2={620 + Math.cos((d * Math.PI) / 180) * 20}
                    y2={393 + Math.sin((d * Math.PI) / 180) * 20}
                    stroke="#555"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                ),
              )}
              <SvgLabel
                x={488}
                y={422}
                text="13. Chain & Sprocket"
                opacity={labelsOpacity}
              />
            </motion.g>

            {/* 10. SKID PLATE */}
            <motion.g
              className="svg-part"
              style={{ x: fpX, y: fpY, rotate: fpR }}
            >
              <path
                d="M 353 392 L 468 392 L 470 408 L 351 409 Z"
                fill="#1a1a1a"
                stroke="#888"
                strokeWidth="2.5"
              />
              <circle
                cx="370"
                cy="400"
                r="4"
                fill="#666"
                stroke="#888"
                strokeWidth="1"
              />
              <circle
                cx="452"
                cy="400"
                r="4"
                fill="#666"
                stroke="#888"
                strokeWidth="1"
              />
              {[382, 400, 418, 436].map((x, i) => (
                <line
                  key={i}
                  x1={x}
                  y1="392"
                  x2={x}
                  y2="409"
                  stroke="#333"
                  strokeWidth="1.5"
                />
              ))}
              <SvgLabel
                x={355}
                y={418}
                text="10. Skid Plate"
                opacity={labelsOpacity}
              />
            </motion.g>

            {/* 11. REAR SHOCK ABSORBER */}
            <motion.g
              className="svg-part"
              style={{ x: ksX, y: ksY, rotate: ksR }}
            >
              <line
                x1="500"
                y1="220"
                x2="542"
                y2="352"
                stroke="#777"
                strokeWidth="13"
                strokeLinecap="round"
              />
              <line
                x1="501"
                y1="230"
                x2="537"
                y2="336"
                stroke="url(#gold-grad)"
                strokeWidth="5"
                strokeLinecap="round"
              />
              <path
                d="M 506 248 Q 522 253 512 263 Q 522 268 512 278 Q 522 283 512 293 Q 522 298 512 308"
                fill="none"
                stroke="#555"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <circle
                cx="500"
                cy="220"
                r="9"
                fill="#1a1a1a"
                stroke="url(#gold-grad)"
                strokeWidth="2"
              />
              <circle
                cx="542"
                cy="352"
                r="9"
                fill="#1a1a1a"
                stroke="url(#gold-grad)"
                strokeWidth="2"
              />
              <SvgLabel
                x={542}
                y={282}
                text="11. Rear Shock Absorber"
                opacity={labelsOpacity}
              />
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
          style={{ opacity: scrollIndicatorOp }}
        >
          <ChevronDown className="w-8 h-8 text-primary animate-bounce" />
        </motion.div>
      </div>
    </section>
  );
};

export default BikeScroll;
