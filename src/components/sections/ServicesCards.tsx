import { motion } from "framer-motion";
import { Wrench, Settings, MessageCircle } from "lucide-react";

const services = [
  { icon: Wrench,         title: "Expert Servicing",    desc: "Precision maintenance and repairs by certified master mechanics." },
  { icon: Settings,       title: "Genuine Parts",       desc: "100% authentic OEM and premium aftermarket components." },
  { icon: MessageCircle,  title: "Custom Consulting",   desc: "1-on-1 build planning for your dream custom motorcycle project." },
];

export function ServicesCards() {
  return (
    <section className="py-24 md:py-32 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {services.map((srv, i) => (
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
  );
}
