import { motion } from "framer-motion";
import { MapPin, Phone, Clock } from "lucide-react";

export function MapSection() {
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
            lines: ["+977 981-8858242", "Available during open hours"],
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
