import { motion } from "framer-motion";
import { galleryImages } from "@/lib/data";

export function GallerySection() {
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
