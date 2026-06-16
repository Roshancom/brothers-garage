import { motion, type MotionValue } from "framer-motion";

export function SvgLabel({ x, y, text, opacity }: { x: number; y: number; text: string; opacity: MotionValue<number> }) {
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
