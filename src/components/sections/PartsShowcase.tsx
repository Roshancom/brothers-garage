import { motion } from "framer-motion";
import { parts } from "@/lib/data";

export function PartsShowcase() {
  return (
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
  );
}
