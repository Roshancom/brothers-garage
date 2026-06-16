import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroBanner() {
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
            href="https://wa.me/9779818858242?text=Hi%2C%20I%27d%20like%20to%20book%20a%20service"
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
            href="https://wa.me/9779818858242?text=Hi%2C%20I%27d%20like%20to%20know%20more"
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
