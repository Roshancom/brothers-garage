import { motion } from "framer-motion";

export function ScrollIcon() {
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
