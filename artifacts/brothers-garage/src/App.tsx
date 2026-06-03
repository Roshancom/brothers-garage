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
  Phone,
  Clock,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";

/* ─────────────────────────────────────────────
   Data
───────────────────────────────────────────── */
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

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=80",
    alt: "Motorcycle engine overhaul in progress",
    span: "full",
  },
  {
    src: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=800&q=80",
    alt: "Technician working on brake system",
    span: "half",
  },
  {
    src: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&q=80",
    alt: "Custom exhaust fabrication",
    span: "half",
  },
  {
    src: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=1400&q=80",
    alt: "Finished build — ready to ride",
    span: "full",
  },
];

/* ─────────────────────────────────────────────
   Existing utility components (unchanged)
───────────────────────────────────────────── */

// FIX 1: Extracted StoryWord component so hooks aren't called inside .map()
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

// FIX 9: Reduced-motion aware wavy text
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

function ScrollIcon() {
  return (
    <motion.div className="flex flex-col items-center gap-2 mt-6">
      <svg width="28" height="44" viewBox="0 0 28 44" fill="none">
        <rect x="1" y="1" width="26" height="42" rx="13" stroke="rgba(255,255,255,0.35)" strokeWidth="2" />
        <motion.rect
          x="12" y="8" width="4" height="8" rx="2" fill="hsl(46,79%,54%)"
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

// FIX 8: margin "0px" so counters trigger reliably on small screens
function Counter({ from, to, duration = 2 }: { from: number; to: number; duration?: number }) {
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
  }, [inView, from, to, duration]);
  return <span ref={ref}>{from}+</span>;
}

// FIX 4: Pure SVG labels — no foreignObject (broken on iOS Safari)
function SvgLabel({ x, y, text, opacity }: { x: number; y: number; text: string; opacity: MotionValue<number> }) {
  const charWidth = 6.5;
  const pad = 8;
  const w = text.length * charWidth + pad * 2;
  return (
    <motion.g style={{ opacity }} aria-label={text}>
      <rect x={x} y={y} width={w} height={20} rx={4} fill="rgba(0,0,0,0.75)" stroke="hsl(46,79%,54%)" strokeWidth="0.8" />
      <text x={x + pad} y={y + 13} fill="hsl(46,79%,54%)" fontSize="10" fontFamily="Inter, sans-serif" fontWeight="500">{text}</text>
    </motion.g>
  );
}

/* ─────────────────────────────────────────────
   NEW 2 — Opening Hours Bar
───────────────────────────────────────────── */
function OpeningHoursBar() {
  const [status, setStatus] = useState<{ open: boolean; label: string }>({ open: false, label: "…" });

  useEffect(() => {
    const check = () => {
      // Nepal Time = UTC + 5h 45m
      const now = new Date();
      const utcMs = now.getTime() + now.getTimezoneOffset() * 60_000;
      const nepalMs = utcMs + (5 * 60 + 45) * 60_000;
      const nepal = new Date(nepalMs);
      const day = nepal.getDay(); // 0=Sun … 6=Sat
      const hour = nepal.getHours() + nepal.getMinutes() / 60;
      // Open: Mon–Fri (1–5) & Sun (0), 08:00–19:00; Saturday always closed
      const isOpen = day !== 6 && hour >= 8 && hour < 19;
      setStatus({ open: isOpen, label: isOpen ? "Open Now" : "Closed" });
    };
    check();
    const id = setInterval(check, 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="fixed top-16 left-0 right-0 z-40 bg-black/90 border-b border-border/10 py-1.5 px-4 flex items-center justify-center gap-3 text-xs">
      <Clock className="w-3.5 h-3.5 text-primary shrink-0" />
      <span className="text-muted-foreground">
        <span className="hidden sm:inline">Mon–Fri &amp; Sun: 8:00 AM – 7:00 PM &nbsp;|&nbsp; Saturday: Closed</span>
        <span className="sm:hidden">Mon–Fri &amp; Sun: 8 AM–7 PM &nbsp;|&nbsp; Sat: Closed</span>
      </span>
      <span
        className={`px-2 py-0.5 rounded-full font-semibold shrink-0 ${
          status.open
            ? "bg-green-500/20 text-green-400"
            : "bg-red-500/20 text-red-400"
        }`}
      >
        {status.label}
      </span>
    </div>
  );
}

/* ─────────────────────────────────────────────
   NEW 3 — Strong Hero Banner
───────────────────────────────────────────── */
function HeroBanner() {
  return (
    <section
      id="services"
      className="relative flex items-center justify-center overflow-hidden"
      style={{ minHeight: "90vh", paddingTop: "100px" }}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black" />
      {/* Subtle gold vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(46,79%,54%,0.06)_0%,transparent_70%)]" />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="uppercase tracking-[0.3em] text-primary text-sm font-medium mb-6"
        >
          Brothers Garage · Imadol, Lalitpur
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-7xl font-serif italic text-white leading-tight tracking-tight mb-6"
        >
          Your Trusted Auto &amp; Bike<br className="hidden sm:block" /> Service Partner
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto"
        >
          Quality repairs, honest pricing — right here in Imadol, Lalitpur
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="https://wa.me/9779851147295?text=Hi%2C%20I%27d%20like%20to%20book%20a%20service"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto"
          >
            <Button
              size="lg"
              className="h-14 px-10 text-base bg-primary text-black hover:bg-primary/90 active:bg-primary/80 font-bold tracking-wider w-full uppercase"
            >
              Book a Service
            </Button>
          </a>
          <a
            href="https://wa.me/9779851147295?text=Hi%2C%20I%27d%20like%20to%20know%20more"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto"
          >
            <Button
              size="lg"
              variant="outline"
              className="h-14 px-10 text-base border-[#25D366]/60 text-[#25D366] hover:bg-[#25D366]/10 active:bg-[#25D366]/10 font-semibold w-full"
            >
              <svg className="w-5 h-5 mr-2 fill-current" viewBox="0 0 24 24" aria-hidden>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.533 5.862L.054 23.943a.5.5 0 0 0 .611.61l6.208-1.524A11.954 11.954 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.801 9.801 0 0 1-5.032-1.388l-.36-.214-3.733.916.95-3.617-.234-.373A9.818 9.818 0 0 1 2.182 12C2.182 6.56 6.56 2.182 12 2.182S21.818 6.56 21.818 12 17.44 21.818 12 21.818z"/>
              </svg>
              WhatsApp Us
            </Button>
          </a>
        </motion.div>

        {/* Floating scroll arrow */}
        <motion.div
          className="mt-16 flex justify-center"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-8 h-8 text-primary/60" />
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   NEW 5 — Gallery Section
───────────────────────────────────────────── */
function GallerySection() {
  return (
    <section id="gallery" className="py-24 md:py-32 px-6 max-w-7xl mx-auto">
      <motion.div
        className="mb-14 text-center"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="uppercase tracking-[0.3em] text-primary text-sm font-medium mb-3">Behind The Wrench</p>
        <h2 className="text-4xl md:text-6xl font-serif italic">Our Work</h2>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {galleryImages.map((img, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
            className={`overflow-hidden rounded-xl ${img.span === "full" ? "sm:col-span-2" : ""}`}
          >
            <div className="relative overflow-hidden group aspect-[16/9]">
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-active:scale-105"
                loading="lazy"
              />
              {/* Gold overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 group-active:translate-y-0 group-active:opacity-100 transition-all duration-500">
                <p className="text-white text-sm font-medium">{img.alt}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   NEW 6 — Google Map Section
───────────────────────────────────────────── */
function MapSection() {
  return (
    <section id="map" className="bg-black">
      <div className="py-16 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="uppercase tracking-[0.3em] text-primary text-sm font-medium mb-3">We're Easy to Find</p>
          <h2 className="text-4xl md:text-5xl font-serif italic mb-2">Find Us</h2>
          <p className="text-muted-foreground">Imadol, Lalitpur, Nepal</p>
        </motion.div>
      </div>

      {/* Full-width map */}
      <div className="w-full" style={{ height: 450 }}>
        <iframe
          title="Brothers Garage Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3534.2!2d85.360223!3d27.6496216!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb11b537a05f41%3A0xdb95a0ea23ecf68!2sBrother's%20Garage!5e0!3m2!1sen!2snp!4v1"
          width="100%"
          height="450"
          style={{ border: 0, display: "block", filter: "invert(90%) hue-rotate(180deg)" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      {/* Info row below map */}
      <div className="max-w-5xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-border/20">
        {[
          {
            icon: MapPin,
            label: "Address",
            lines: ["Imadol, Lalitpur", "Bagmati Province, Nepal"],
          },
          {
            icon: Phone,
            label: "Phone",
            lines: ["+977 985-1147295", "Available during open hours"],
          },
          {
            icon: Clock,
            label: "Hours",
            lines: ["Mon–Fri & Sun: 8 AM – 7 PM", "Saturday: Closed"],
          },
        ].map(({ icon: Icon, label, lines }, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="flex items-start gap-4"
          >
            <div className="mt-1 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <Icon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">{label}</p>
              {lines.map((l, j) => (
                <p key={j} className="text-white text-sm leading-relaxed">{l}</p>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   NEW 4 — WhatsApp Floating Button
───────────────────────────────────────────── */
function WhatsAppButton() {
  const [showTip, setShowTip] = useState(false);
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {/* Tooltip */}
      {showTip && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="bg-black/90 text-white text-xs px-3 py-1.5 rounded-lg border border-border/20 whitespace-nowrap"
        >
          Chat with us on WhatsApp
        </motion.div>
      )}

      {/* Pulse rings */}
      <div className="relative">
        <motion.div
          className="absolute inset-0 rounded-full bg-[#25D366]/30"
          animate={{ scale: [1, 1.8], opacity: [0.6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
        />
        <motion.div
          className="absolute inset-0 rounded-full bg-[#25D366]/20"
          animate={{ scale: [1, 2.4], opacity: [0.4, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
        />

        <a
          href="https://wa.me/9779851147295?text=Hi%2C%20I%27d%20like%20to%20book%20a%20service"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with us on WhatsApp"
          onMouseEnter={() => setShowTip(true)}
          onMouseLeave={() => setShowTip(false)}
          onFocus={() => setShowTip(true)}
          onBlur={() => setShowTip(false)}
          className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] shadow-lg shadow-[#25D366]/30 hover:bg-[#20b858] active:bg-[#1da851] transition-colors"
        >
          <svg className="w-7 h-7 fill-white" viewBox="0 0 24 24" aria-hidden>
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.533 5.862L.054 23.943a.5.5 0 0 0 .611.61l6.208-1.524A11.954 11.954 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.801 9.801 0 0 1-5.032-1.388l-.36-.214-3.733.916.95-3.617-.234-.373A9.818 9.818 0 0 1 2.182 12C2.182 6.56 6.56 2.182 12 2.182S21.818 6.56 21.818 12 17.44 21.818 12 21.818z"/>
          </svg>
        </a>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main App
───────────────────────────────────────────── */
export default function App() {
  const prefersReducedMotion = useReducedMotion();
  const shouldAnimate = !prefersReducedMotion;

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // NEW 1: track scroll for nav shadow
  const [navScrolled, setNavScrolled] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // FIX 3: SVG scale tracking
  const svgContainerRef = useRef<HTMLDivElement>(null);
  const svgScaleMotion = useMotionValue(1);
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

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Scale-aware transform helpers (FIX 3)
  const mkX = (startP: number, maxVal: number): MotionValue<number> =>
    useTransform(
      [scrollYProgress, svgScaleMotion] as MotionValue<number>[],
      ([p, s]: number[]) => maxVal * s * Math.max(0, Math.min(1, (p - startP) / (0.7 - startP))),
    );
  const mkY = (startP: number, maxVal: number): MotionValue<number> =>
    useTransform(
      [scrollYProgress, svgScaleMotion] as MotionValue<number>[],
      ([p, s]: number[]) => maxVal * s * Math.max(0, Math.min(1, (p - startP) / (0.7 - startP))),
    );

  const fwX = mkX(0.1, -600); const fwY = mkY(0.1, 100);
  const fwR = useTransform(scrollYProgress, [0.1, 0.7], [0, -720]);
  const rwX = mkX(0.1, 600);  const rwY = mkY(0.1, 100);
  const rwR = useTransform(scrollYProgress, [0.1, 0.7], [0, 720]);
  const hlX = mkX(0.15, -500); const hlY = mkY(0.15, -150);
  const wsX = mkX(0.15, -450); const wsY = mkY(0.15, -300);
  const wsR = useTransform(scrollYProgress, [0.15, 0.7], [0, -30]);
  const hbX = mkX(0.2, -200);  const hbY = mkY(0.2, -300);
  const hbR = useTransform(scrollYProgress, [0.2, 0.7], [0, -45]);
  const fkX = mkX(0.2, -300);  const fkY = mkY(0.2, -100);
  const fkR = useTransform(scrollYProgress, [0.2, 0.7], [0, -60]);
  const tkY = mkY(0.25, -350);
  const stX = mkX(0.25, 400);  const stY = mkY(0.25, -200);
  const stR = useTransform(scrollYProgress, [0.25, 0.7], [0, 30]);
  const enY = mkY(0.3, 250);
  const exX = mkX(0.3, 500);   const exY = mkY(0.3, 200);
  const exR = useTransform(scrollYProgress, [0.3, 0.7], [0, 45]);
  const frR = useTransform(scrollYProgress, [0.35, 0.7], [0, 5]);
  const frO = useTransform(scrollYProgress, [0.35, 0.7], [1, 0.3]);
  const faX = mkX(0.35, 300);  const faY = mkY(0.35, 100);
  const faR = useTransform(scrollYProgress, [0.35, 0.7], [0, 20]);
  const chX = mkX(0.4, 200);   const chY = mkY(0.4, 350);
  const chR = useTransform(scrollYProgress, [0.4, 0.7], [0, 180]);
  const fpX = mkX(0.4, -100);  const fpY = mkY(0.4, 300);
  const fpR = useTransform(scrollYProgress, [0.4, 0.7], [0, 90]);
  const ksX = mkX(0.4, -200);  const ksY = mkY(0.4, 400);
  const ksR = useTransform(scrollYProgress, [0.4, 0.7], [0, -90]);

  const labelsOpacity       = useTransform(scrollYProgress, [0.5, 0.6], [0, 1]);
  const initialTextOpacity  = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const scrollIndicatorOp   = useTransform(scrollYProgress, [0, 0.05], [1, 0]);
  const finalTextOpacity    = useTransform(scrollYProgress, [0.7, 0.8], [0, 1]);

  const storyText = "More than just a garage. We are a community built on passion for two wheels. Every bike tells a story and we help you write yours.".split(" ");
  const storyRef = useRef(null);
  const { scrollYProgress: storyProgress } = useScroll({
    target: storyRef,
    offset: ["start 80%", "center center"],
  });

  const navLinks = ["Home", "Services", "Gallery", "Contact"];
  const navHrefs: Record<string, string> = {
    Home: "#home",
    Services: "#services",
    Gallery: "#gallery",
    Contact: "#contact",
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-black">

      {/* ── NEW 1: Enhanced Sticky Navigation ── */}
      <nav
        className={`fixed top-0 w-full z-50 px-4 md:px-6 flex items-center justify-between h-16 transition-all duration-300 ${
          navScrolled
            ? "bg-black/95 shadow-[0_4px_24px_rgba(0,0,0,0.6)] border-b border-border/20"
            : "bg-transparent border-b border-border/5"
        }`}
        style={{ backdropFilter: navScrolled ? "blur(12px)" : "blur(4px)", WebkitBackdropFilter: navScrolled ? "blur(12px)" : "blur(4px)" }}
      >
        {/* Logo */}
        <div className="flex items-center gap-2 shrink-0">
          <img
            src="https://github.com/Roshancom/brothers-garage/blob/main/public/images/logo.png?raw=true"
            alt="Brothers Garage"
            height={50}
            width={100}
            className="object-contain"
          />
        </div>

        {/* Desktop center links */}
        <div className="hidden md:flex gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <a
              key={link}
              href={navHrefs[link]}
              className="text-muted-foreground hover:text-primary transition-colors uppercase tracking-wider"
            >
              {link}
            </a>
          ))}
        </div>

        {/* Desktop right: phone + CTA */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="tel:+9779851147295"
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <Phone className="w-4 h-4" />
            <span>+977 985-1147295</span>
          </a>
          <a
            href="https://wa.me/9779851147295?text=Hi%2C%20I%27d%20like%20to%20book%20a%20service"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              size="sm"
              className="bg-primary text-black hover:bg-primary/90 active:bg-primary/80 font-bold uppercase tracking-wider px-5"
            >
              Book Now
            </Button>
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-muted-foreground hover:text-primary transition-colors p-2"
          onClick={() => setMobileMenuOpen((v) => !v)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-16 left-0 right-0 bg-black/97 border-b border-border/20 py-3 flex flex-col md:hidden"
            style={{ backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)" }}
          >
            {navLinks.map((link) => (
              <a
                key={link}
                href={navHrefs[link]}
                onClick={() => setMobileMenuOpen(false)}
                className="px-6 py-3 text-muted-foreground hover:text-primary active:text-primary transition-colors uppercase tracking-wider text-sm"
              >
                {link}
              </a>
            ))}
            <div className="px-6 pt-2 pb-3 border-t border-border/10 mt-1 flex flex-col gap-2">
              <a href="tel:+9779851147295" className="flex items-center gap-2 text-muted-foreground text-sm py-1">
                <Phone className="w-4 h-4 text-primary" /> +977 985-1147295
              </a>
              <a
                href="https://wa.me/9779851147295?text=Hi%2C%20I%27d%20like%20to%20book%20a%20service"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Button size="sm" className="w-full bg-primary text-black font-bold uppercase tracking-wider">
                  Book Now
                </Button>
              </a>
            </div>
          </motion.div>
        )}
      </nav>

      {/* ── NEW 2: Opening Hours Bar ── */}
      <OpeningHoursBar />

      {/* ── NEW 3: Hero Banner (before bike scroll section) ── */}
      <HeroBanner />

      {/* ════════════════════════════════════════════
          EXISTING: Bike Scroll / Exploded View Section
          (unchanged — no modifications)
      ════════════════════════════════════════════ */}
      <section ref={containerRef} className="h-[500vh] relative" id="home">
        {/* FIX 5: 100dvh for iOS Safari dynamic toolbar */}
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
              <WavyText text="Built From The Ground Up" shouldAnimate={shouldAnimate} />
            </h1>
            <ScrollIcon />
          </motion.div>

          {/* SVG container (FIX 2 & 3) */}
          <div
            ref={svgContainerRef}
            className="relative w-[800px] h-[500px] max-w-full px-4"
            style={{ filter: "drop-shadow(0 0 20px rgba(212, 160, 23, 0.3))" }}
          >
            <svg viewBox="0 0 800 500" className="w-full h-full" style={{ overflow: "visible" }}>
              <defs>
                <linearGradient id="gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="hsl(46,79%,54%)" />
                  <stop offset="100%" stopColor="#8c6a0b" />
                </linearGradient>
                <filter id="hglow" x="-80%" y="-80%" width="260%" height="260%">
                  <feGaussianBlur stdDeviation="4" result="b" />
                  <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>

              {/* ── 15. FRAME / CHASSIS ── */}
              <motion.g className="svg-part" style={{ rotate: frR, opacity: frO }}>
                {/* Main backbone tube */}
                <path d="M 258 188 C 370 172 440 175 508 205 L 556 272" fill="none" stroke="url(#gold-grad)" strokeWidth="9" strokeLinecap="round" />
                {/* Down tube */}
                <path d="M 260 210 Q 322 268 364 310" fill="none" stroke="#888" strokeWidth="8" strokeLinecap="round" />
                {/* Engine cradle rail */}
                <path d="M 364 310 L 464 393" fill="none" stroke="#888" strokeWidth="8" strokeLinecap="round" />
                {/* Head tube */}
                <path d="M 245 175 L 262 220" stroke="#bbb" strokeWidth="17" strokeLinecap="round" />
                <path d="M 245 175 L 262 220" stroke="#333" strokeWidth="10" strokeLinecap="round" />
                {/* Rear seat stays */}
                <path d="M 554 272 L 622 387" fill="none" stroke="#666" strokeWidth="6" strokeLinecap="round" />
                {/* Upper sub-frame */}
                <path d="M 502 200 L 556 272" fill="none" stroke="#555" strokeWidth="5" strokeLinecap="round" />
                {/* Cross brace */}
                <path d="M 330 270 L 385 298" fill="none" stroke="#444" strokeWidth="4" strokeLinecap="round" />
                {/* Gusset at head tube */}
                <path d="M 248 212 L 292 262 L 278 266 L 235 218 Z" fill="#1a1a1a" stroke="#333" strokeWidth="1" />
                {/* Flat narrow MX seat */}
                <path d="M 460 188 L 578 218 L 578 236 L 460 208 Z" fill="#0d0d0d" stroke="#2a2a2a" strokeWidth="2" />
                <line x1="464" y1="189" x2="576" y2="219" stroke="hsl(46,79%,54%)" strokeWidth="1.5" opacity="0.55" />
                <line x1="472" y1="196" x2="576" y2="223" stroke="#1e1e1e" strokeWidth="1" />
                <line x1="490" y1="200" x2="576" y2="226" stroke="#1e1e1e" strokeWidth="1" />
                <line x1="510" y1="203" x2="576" y2="228" stroke="#1e1e1e" strokeWidth="1" />
                <SvgLabel x={372} y={148} text="15. Frame" opacity={labelsOpacity} />
              </motion.g>

              {/* ── 2. REAR KNOBBY TIRE ── */}
              <motion.g className="svg-part" style={{ x: rwX, y: rwY, rotate: rwR }}>
                {/* Tire carcass */}
                <circle cx="620" cy="392" r="70" fill="none" stroke="#0c0c0c" strokeWidth="26" />
                {/* Sidewall inner edge */}
                <circle cx="620" cy="392" r="59" fill="none" stroke="#1e1e1e" strokeWidth="2" />
                {/* Knobby tread — alternating thick/narrow radial blocks */}
                {Array.from({ length: 24 }, (_, i) => {
                  const a = (i / 24) * Math.PI * 2;
                  const big = i % 3 !== 2;
                  return (
                    <line key={i}
                      x1={620 + Math.cos(a) * 57} y1={392 + Math.sin(a) * 57}
                      x2={620 + Math.cos(a) * 70} y2={392 + Math.sin(a) * 70}
                      stroke={big ? "#2e2e2e" : "#111"}
                      strokeWidth={big ? 8 : 4} strokeLinecap="round"
                    />
                  );
                })}
                {/* Rim ring */}
                <circle cx="620" cy="392" r="50" fill="none" stroke="#2a2a2a" strokeWidth="2" />
                {/* Spokes */}
                {[0, 60, 120, 180, 240, 300].map((d) => (
                  <line key={d}
                    x1={620 + Math.cos(d*Math.PI/180)*18} y1={392 + Math.sin(d*Math.PI/180)*18}
                    x2={620 + Math.cos(d*Math.PI/180)*49} y2={392 + Math.sin(d*Math.PI/180)*49}
                    stroke="#555" strokeWidth="4"
                  />
                ))}
                {/* Hub */}
                <circle cx="620" cy="392" r="18" fill="url(#gold-grad)" />
                <circle cx="620" cy="392" r="10" fill="#111" />
                <circle cx="620" cy="392" r="5"  fill="#888" />
                <SvgLabel x={575} y={262} text="2. Rear Knobby Tire" opacity={labelsOpacity} />
              </motion.g>

              {/* ── 1. FRONT KNOBBY TIRE ── */}
              <motion.g className="svg-part" style={{ x: fwX, y: fwY, rotate: fwR }}>
                <circle cx="165" cy="392" r="70" fill="none" stroke="#0c0c0c" strokeWidth="26" />
                <circle cx="165" cy="392" r="59" fill="none" stroke="#1e1e1e" strokeWidth="2" />
                {Array.from({ length: 24 }, (_, i) => {
                  const a = (i / 24) * Math.PI * 2;
                  const big = i % 3 !== 2;
                  return (
                    <line key={i}
                      x1={165 + Math.cos(a) * 57} y1={392 + Math.sin(a) * 57}
                      x2={165 + Math.cos(a) * 70} y2={392 + Math.sin(a) * 70}
                      stroke={big ? "#2e2e2e" : "#111"}
                      strokeWidth={big ? 8 : 4} strokeLinecap="round"
                    />
                  );
                })}
                <circle cx="165" cy="392" r="50" fill="none" stroke="#2a2a2a" strokeWidth="2" />
                {[0, 60, 120, 180, 240, 300].map((d) => (
                  <line key={d}
                    x1={165 + Math.cos(d*Math.PI/180)*18} y1={392 + Math.sin(d*Math.PI/180)*18}
                    x2={165 + Math.cos(d*Math.PI/180)*49} y2={392 + Math.sin(d*Math.PI/180)*49}
                    stroke="#555" strokeWidth="4"
                  />
                ))}
                <circle cx="165" cy="392" r="18" fill="url(#gold-grad)" />
                <circle cx="165" cy="392" r="10" fill="#111" />
                <circle cx="165" cy="392" r="5"  fill="#888" />
                <SvgLabel x={38} y={262} text="1. Front Knobby Tire" opacity={labelsOpacity} />
              </motion.g>

              {/* ── 9. ENGINE / CARBURETOR ── */}
              <motion.g className="svg-part" style={{ y: enY }}>
                {/* Engine block */}
                <rect x="360" y="305" width="108" height="88" rx="6" fill="#141414" stroke="url(#gold-grad)" strokeWidth="2" />
                {/* Cylinder head (angled forward) */}
                <path d="M 362 305 L 408 305 L 390 255 L 345 263 Z" fill="#1c1c1c" stroke="#555" strokeWidth="1.5" />
                {/* Cylinder cooling fins */}
                {[0,1,2,3,4].map((i) => (
                  <line key={i} x1={348+i*3} y1={263+i*8} x2={393+i*3} y2={257+i*8} stroke="#333" strokeWidth="1.5" />
                ))}
                {/* Carb intake stub */}
                <rect x="382" y="247" width="26" height="16" rx="3" fill="#111" stroke="#444" strokeWidth="1.5" />
                {/* Engine case cooling fins */}
                {[319, 333, 347, 361, 375].map((y, i) => (
                  <line key={i} x1="362" y1={y} x2="460" y2={y} stroke="#222" strokeWidth="1" />
                ))}
                {/* Side cover */}
                <rect x="422" y="316" width="38" height="58" rx="4" fill="#111" stroke="#333" strokeWidth="1" />
                <circle cx="441" cy="345" r="12" fill="#0d0d0d" stroke="#444" strokeWidth="2" />
                <circle cx="441" cy="345" r="5"  fill="#2a2a2a" />
                {/* Drain bolt */}
                <circle cx="382" cy="386" r="4" fill="#666" stroke="#888" strokeWidth="1" />
                <SvgLabel x={360} y={400} text="9. Engine / Carburetor" opacity={labelsOpacity} />
              </motion.g>

              {/* ── 14. HIGH-MOUNT EXHAUST ── */}
              <motion.g className="svg-part" style={{ x: exX, y: exY, rotate: exR }}>
                {/* Header from engine */}
                <path d="M 456 348 Q 470 332 474 312" fill="none" stroke="#888" strokeWidth="14" strokeLinecap="round" />
                {/* Mid pipe routing upward */}
                <path d="M 474 312 Q 492 282 500 255 Q 514 225 524 200" fill="none" stroke="#666" strokeWidth="12" strokeLinecap="round" />
                {/* Heat shield strips */}
                {[305, 278, 252].map((y, i) => (
                  <rect key={i} x={478+i*8} y={y-5} width="18" height="9" rx="3"
                    fill="#333" stroke="#555" strokeWidth="1"
                    transform={`rotate(-20,${487+i*8},${y})`} />
                ))}
                {/* Up pipe to silencer */}
                <path d="M 524 200 Q 538 178 552 162" fill="none" stroke="#555" strokeWidth="10" strokeLinecap="round" />
                {/* Silencer / end can */}
                <path d="M 548 155 L 594 142 L 596 157 L 550 170 Z" fill="#1a1a1a" stroke="url(#gold-grad)" strokeWidth="2" />
                {/* Tip */}
                <circle cx="595" cy="150" r="7" fill="#111" stroke="#888" strokeWidth="2" />
                <line x1="590" y1="143" x2="590" y2="157" stroke="#555" strokeWidth="1.5" />
                <SvgLabel x={545} y={112} text="14. High-Mount Exhaust" opacity={labelsOpacity} />
              </motion.g>

              {/* ── 3. LONG TRAVEL FRONT FORK ── */}
              <motion.g className="svg-part" style={{ x: fkX, y: fkY, rotate: fkR }}>
                {/* Right stanchion (gold accent) */}
                <line x1="182" y1="322" x2="266" y2="170" stroke="url(#gold-grad)" strokeWidth="11" strokeLinecap="round" />
                {/* Left stanchion */}
                <line x1="152" y1="322" x2="236" y2="170" stroke="#999" strokeWidth="8" strokeLinecap="round" />
                {/* Fork crown / triple clamp */}
                <path d="M 233 170 L 270 170 L 266 153 L 237 153 Z" fill="#1a1a1a" stroke="#666" strokeWidth="2" />
                {/* Dust seals */}
                <rect x="147" y="293" width="18" height="14" rx="3" fill="#222" stroke="#555" strokeWidth="1.5" />
                <rect x="178" y="293" width="18" height="14" rx="3" fill="#222" stroke="#555" strokeWidth="1.5" />
                {/* Axle clamps */}
                <rect x="143" y="320" width="26" height="11" rx="3" fill="#111" stroke="#888" strokeWidth="2" />
                <rect x="173" y="320" width="26" height="11" rx="3" fill="#111" stroke="#888" strokeWidth="2" />
                {/* Fork brace */}
                <line x1="158" y1="312" x2="188" y2="310" stroke="#666" strokeWidth="5" strokeLinecap="round" />
                <SvgLabel x={150} y={215} text="3. Long Travel Front Fork" opacity={labelsOpacity} />
              </motion.g>

              {/* ── 5. MX HANDLEBAR ── */}
              <motion.g className="svg-part" style={{ x: hbX, y: hbY, rotate: hbR }}>
                {/* Wide flat MX bar */}
                <path d="M 185 148 L 254 138 L 322 143" fill="none" stroke="#aaa" strokeWidth="9" strokeLinecap="round" />
                {/* Cross brace */}
                <path d="M 212 145 L 294 140" fill="none" stroke="#666" strokeWidth="5" strokeLinecap="round" />
                {/* Bar risers */}
                <rect x="248" y="138" width="14" height="20" rx="3" fill="#333" stroke="#777" strokeWidth="2" />
                {/* Grips */}
                <rect x="183" y="143" width="24" height="10" rx="4" fill="#111" stroke="#555" strokeWidth="1.5" />
                <rect x="318" y="138" width="24" height="10" rx="4" fill="#111" stroke="#555" strokeWidth="1.5" />
                {/* Brake lever */}
                <path d="M 198 149 L 186 162" fill="none" stroke="#666" strokeWidth="4" strokeLinecap="round" />
                {/* Throttle */}
                <circle cx="334" cy="143" r="5" fill="#444" />
                <SvgLabel x={218} y={106} text="5. MX Handlebar" opacity={labelsOpacity} />
              </motion.g>

              {/* ── 6. HEADLIGHT ── */}
              <motion.g className="svg-part" style={{ x: hlX, y: hlY }}>
                {/* Angular dirt-bike headlight housing */}
                <path d="M 228 192 L 270 186 L 267 213 L 225 219 Z" fill="#111" stroke="#333" strokeWidth="2.5" />
                <path d="M 231 195 L 266 189 L 264 211 L 229 217 Z" fill="#1a1a1a" stroke="#444" strokeWidth="1" />
                {/* Lens glow */}
                <ellipse cx="248" cy="203" rx="15" ry="9" fill="rgba(255,255,180,0.08)" />
                <circle cx="248" cy="203" r="6" fill="#fff" filter="drop-shadow(0 0 8px rgba(255,255,200,0.9))" />
                <SvgLabel x={164} y={162} text="6. Headlight" opacity={labelsOpacity} />
              </motion.g>

              {/* ── 4. FRONT FENDER (was Windscreen) ── */}
              <motion.g className="svg-part" style={{ x: wsX, y: wsY, rotate: wsR }}>
                {/* Short high dirt-bike mudguard */}
                <path d="M 105 334 Q 130 268 192 298 L 196 311 Q 138 283 112 344 Z" fill="#111" stroke="url(#gold-grad)" strokeWidth="2" />
                {/* Underside detail line */}
                <path d="M 109 342 Q 135 276 193 305" fill="none" stroke="#333" strokeWidth="1.5" />
                {/* Mounting tab */}
                <rect x="148" y="268" width="18" height="10" rx="3" fill="#1a1a1a" stroke="#555" strokeWidth="1.5" />
                <SvgLabel x={62} y={237} text="4. Front Fender" opacity={labelsOpacity} />
              </motion.g>

              {/* ── 7. FUEL TANK (compact, angular) ── */}
              <motion.g className="svg-part" style={{ y: tkY }}>
                {/* Tank body */}
                <path d="M 265 170 Q 362 152 464 177 L 462 234 Q 372 247 265 224 Z" fill="#111" stroke="#333" strokeWidth="2" />
                {/* Tank cap */}
                <ellipse cx="352" cy="157" rx="18" ry="8" fill="#1a1a1a" stroke="#666" strokeWidth="2" />
                <ellipse cx="352" cy="155" rx="10" ry="4" fill="#333" />
                {/* Gold accent stripe */}
                <path d="M 273 188 Q 363 170 457 194" fill="none" stroke="url(#gold-grad)" strokeWidth="3" strokeLinecap="round" />
                <path d="M 276 200 Q 364 183 456 205" fill="none" stroke="hsl(46,79%,54%)" strokeWidth="1.5" strokeLinecap="round" opacity="0.45" />
                {/* Angular top edge */}
                <path d="M 265 170 L 292 154 Q 362 140 440 165 L 464 177" fill="none" stroke="#3a3a3a" strokeWidth="1.5" />
                <SvgLabel x={296} y={120} text="7. Fuel Tank" opacity={labelsOpacity} />
              </motion.g>

              {/* ── 8. AIR FILTER BOX (was Seat) ── */}
              <motion.g className="svg-part" style={{ x: stX, y: stY, rotate: stR }}>
                {/* Box housing */}
                <rect x="466" y="296" width="68" height="72" rx="6" fill="#141414" stroke="#444" strokeWidth="2" />
                {/* Filter backing */}
                <rect x="472" y="304" width="56" height="56" rx="4" fill="#0a0a0a" stroke="#333" strokeWidth="1" />
                {/* Foam filter element (gold/amber colour) */}
                <rect x="475" y="308" width="50" height="48" rx="3" fill="#1e1002" stroke="hsl(46,79%,54%)" strokeWidth="1.5" />
                {/* Filter grid lines */}
                {[314, 323, 332, 341, 350].map((y, i) => (
                  <line key={i} x1="476" y1={y} x2="524" y2={y} stroke="hsl(46,60%,35%)" strokeWidth="1" opacity="0.6" />
                ))}
                {/* Side vent slots */}
                {[301, 310, 319].map((y, i) => (
                  <rect key={i} x="468" y={y} width="8" height="4" rx="1" fill="#222" />
                ))}
                <SvgLabel x={464} y={266} text="8. Air Filter Box" opacity={labelsOpacity} />
              </motion.g>

              {/* ── 12. REAR SWINGARM (was Fairing) ── */}
              <motion.g className="svg-part" style={{ x: faX, y: faY, rotate: faR }}>
                {/* Upper arm tube */}
                <path d="M 490 350 L 623 387" fill="none" stroke="url(#gold-grad)" strokeWidth="10" strokeLinecap="round" />
                {/* Lower arm tube */}
                <path d="M 490 363 L 623 398" fill="none" stroke="#666" strokeWidth="6" strokeLinecap="round" />
                {/* Pivot end */}
                <rect x="482" y="344" width="16" height="24" rx="3" fill="#1a1a1a" stroke="#888" strokeWidth="2" />
                {/* Axle end */}
                <rect x="618" y="382" width="16" height="22" rx="3" fill="#1a1a1a" stroke="#888" strokeWidth="2" />
                {/* Chain slider */}
                <path d="M 510 361 L 582 380" fill="none" stroke="#333" strokeWidth="4" strokeLinecap="round" />
                <SvgLabel x={505} y={408} text="12. Rear Swingarm" opacity={labelsOpacity} />
              </motion.g>

              {/* ── 13. CHAIN & SPROCKET (was Chain) ── */}
              <motion.g className="svg-part" style={{ x: chX, y: chY, rotate: chR }}>
                {/* Drive chain */}
                <path d="M 460 388 L 620 393" fill="none" stroke="#444" strokeWidth="7" strokeDasharray="6 5" />
                {/* Engine sprocket */}
                <circle cx="462" cy="388" r="14" fill="#111" stroke="#555" strokeWidth="2" />
                {[0,45,90,135,180,225,270,315].map((d) => (
                  <line key={d}
                    x1={462+Math.cos(d*Math.PI/180)*8}  y1={388+Math.sin(d*Math.PI/180)*8}
                    x2={462+Math.cos(d*Math.PI/180)*14} y2={388+Math.sin(d*Math.PI/180)*14}
                    stroke="#666" strokeWidth="4" strokeLinecap="round"
                  />
                ))}
                <circle cx="462" cy="388" r="5" fill="url(#gold-grad)" />
                {/* Rear sprocket ring */}
                <circle cx="620" cy="393" r="20" fill="none" stroke="#444" strokeWidth="4" />
                {[0,30,60,90,120,150,180,210,240,270,300,330].map((d) => (
                  <line key={d}
                    x1={620+Math.cos(d*Math.PI/180)*13} y1={393+Math.sin(d*Math.PI/180)*13}
                    x2={620+Math.cos(d*Math.PI/180)*20} y2={393+Math.sin(d*Math.PI/180)*20}
                    stroke="#555" strokeWidth="4" strokeLinecap="round"
                  />
                ))}
                <SvgLabel x={488} y={422} text="13. Chain & Sprocket" opacity={labelsOpacity} />
              </motion.g>

              {/* ── 10. SKID PLATE (was Footpegs) ── */}
              <motion.g className="svg-part" style={{ x: fpX, y: fpY, rotate: fpR }}>
                {/* Aluminium bash guard */}
                <path d="M 353 392 L 468 392 L 470 408 L 351 409 Z" fill="#1a1a1a" stroke="#888" strokeWidth="2.5" />
                {/* Mounting bolts */}
                <circle cx="370" cy="400" r="4" fill="#666" stroke="#888" strokeWidth="1" />
                <circle cx="452" cy="400" r="4" fill="#666" stroke="#888" strokeWidth="1" />
                {/* Ribbing */}
                {[382, 400, 418, 436].map((x, i) => (
                  <line key={i} x1={x} y1="392" x2={x} y2="409" stroke="#333" strokeWidth="1.5" />
                ))}
                <SvgLabel x={355} y={418} text="10. Skid Plate" opacity={labelsOpacity} />
              </motion.g>

              {/* ── 11. REAR SHOCK ABSORBER (was Kickstand) ── */}
              <motion.g className="svg-part" style={{ x: ksX, y: ksY, rotate: ksR }}>
                {/* Shock body / outer tube */}
                <line x1="500" y1="220" x2="542" y2="352" stroke="#777" strokeWidth="13" strokeLinecap="round" />
                {/* Shaft (gold) */}
                <line x1="501" y1="230" x2="537" y2="336" stroke="url(#gold-grad)" strokeWidth="5" strokeLinecap="round" />
                {/* Spring coils */}
                <path d="M 506 248 Q 522 253 512 263 Q 522 268 512 278 Q 522 283 512 293 Q 522 298 512 308" fill="none" stroke="#555" strokeWidth="3" strokeLinecap="round" />
                {/* Top mount */}
                <circle cx="500" cy="220" r="9" fill="#1a1a1a" stroke="url(#gold-grad)" strokeWidth="2" />
                {/* Bottom mount */}
                <circle cx="542" cy="352" r="9" fill="#1a1a1a" stroke="url(#gold-grad)" strokeWidth="2" />
                <SvgLabel x={542} y={282} text="11. Rear Shock Absorber" opacity={labelsOpacity} />
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

          <motion.div className="absolute bottom-10" style={{ opacity: scrollIndicatorOp }}>
            <ChevronDown className="w-8 h-8 text-primary animate-bounce" />
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          EXISTING: Parts Showcase (unchanged)
      ════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto relative z-10 bg-background" id="parts">
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-6xl font-serif italic mb-4">Premium Upgrades</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {parts.map((part, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
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
                <h3 className="text-xl font-bold text-white mb-2">{part.name}</h3>
                <p className="text-muted-foreground text-sm flex-1">{part.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════
          EXISTING: About / Story Section (unchanged)
      ════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 px-6 bg-black relative" id="about">
        <div className="max-w-5xl mx-auto">
          <div
            className="text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-serif leading-tight mb-24 relative"
            ref={storyRef}
          >
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
              <div className="text-muted-foreground uppercase tracking-widest text-sm">Bikes Serviced</div>
            </div>
            <div>
              <div className="text-5xl md:text-6xl font-bold text-primary font-mono mb-2">
                <Counter from={0} to={1000} />
              </div>
              <div className="text-muted-foreground uppercase tracking-widest text-sm">Parts Available</div>
            </div>
            <div>
              <div className="text-5xl md:text-6xl font-bold text-primary font-mono mb-2">
                <Counter from={0} to={50} />
              </div>
              <div className="text-muted-foreground uppercase tracking-widest text-sm">Expert Mechanics</div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          EXISTING: Services Cards (unchanged)
      ════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Wrench,         title: "Expert Servicing",    desc: "Precision maintenance and repairs by certified master mechanics." },
            { icon: Settings,       title: "Genuine Parts",       desc: "100% authentic OEM and premium aftermarket components." },
            { icon: MessageCircle,  title: "Custom Consulting",   desc: "1-on-1 build planning for your dream custom motorcycle project." },
          ].map((srv, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-card p-8 md:p-10 rounded-2xl border border-transparent hover:border-primary/30 active:border-primary/30 transition-all duration-500 hover:shadow-[0_0_30px_rgba(212,160,23,0.05)] group"
            >
              <srv.icon className="w-12 h-12 text-primary mb-6 transform group-hover:scale-110 group-active:scale-110 transition-transform" />
              <h3 className="text-2xl font-bold mb-4">{srv.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{srv.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════
          EXISTING: CTA Section (unchanged)
      ════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 relative overflow-hidden bg-black" id="contact">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_20%,hsl(46,79%,54%/0.1)_50%,transparent_80%)]" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <Wrench className="w-12 h-12 text-primary mx-auto mb-8" />
          <h2 className="text-5xl sm:text-6xl md:text-8xl font-serif italic text-white mb-6">Ready to Ride?</h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Drop by the garage or schedule your service online. Your beast deserves the best.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a
              href="https://wa.me/9779851147295?text=Hi%2C%20I%27d%20like%20to%20book%20a%20service%20at%20Brothers%20Garage."
              target="_blank" rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <Button size="lg" className="h-14 md:h-16 px-10 text-lg bg-primary text-black hover:bg-primary/90 active:bg-primary/80 font-bold tracking-wider w-full">
                BOOK SERVICE
              </Button>
            </a>
            <a
              href="https://wa.me/9779851147295?text=Hi%2C%20I%27d%20like%20to%20get%20a%20quote%20from%20Brothers%20Garage."
              target="_blank" rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <Button size="lg" variant="outline" className="h-14 md:h-16 px-10 text-lg border-primary/50 text-white hover:bg-primary/10 active:bg-primary/10 w-full liquid-glass">
                GET A QUOTE
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* ── NEW 5: Gallery Section ── */}
      <GallerySection />

      {/* ── NEW 6: Google Map Section ── */}
      <MapSection />

      {/* ════════════════════════════════════════════
          EXISTING: Footer (unchanged)
      ════════════════════════════════════════════ */}
      <footer className="border-t border-border/20 py-12 px-6 bg-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-muted-foreground text-sm">© 2026 Brothers Garage. All rights reserved.</div>
          <div className="flex items-center gap-6">
            <a href="https://www.instagram.com/brothersgarage_official/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <Instagram className="w-5 h-5 text-muted-foreground hover:text-primary active:text-primary cursor-pointer transition-colors" />
            </a>
            <a href="https://www.facebook.com/brothersgarages" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <Facebook className="w-5 h-5 text-muted-foreground hover:text-primary active:text-primary cursor-pointer transition-colors" />
            </a>
            <a href="https://www.youtube.com/@brothersgarage1920/videos" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <Youtube className="w-5 h-5 text-muted-foreground hover:text-primary active:text-primary cursor-pointer transition-colors" />
            </a>
          </div>
        </div>
      </footer>

      {/* ── NEW 4: WhatsApp Floating Button (global) ── */}
      <WhatsAppButton />
    </div>
  );
}
