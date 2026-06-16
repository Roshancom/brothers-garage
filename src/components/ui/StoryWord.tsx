import { motion, useTransform, type MotionValue } from "framer-motion";

export function StoryWord({
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
