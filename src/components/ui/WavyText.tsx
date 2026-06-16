import { motion } from "framer-motion";

export function WavyText({
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
