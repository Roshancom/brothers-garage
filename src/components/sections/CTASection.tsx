import { motion } from "framer-motion";
import { Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
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
            href="https://wa.me/9779818858242?text=Hi%2C%20I%27d%20like%20to%20book%20a%20service%20at%20Brothers%20Garage."
            target="_blank" rel="noopener noreferrer"
            className="w-full sm:w-auto"
          >
            <Button size="lg" className="h-14 md:h-16 px-10 text-lg bg-primary text-black hover:bg-primary/90 active:bg-primary/80 font-bold tracking-wider w-full">
              BOOK SERVICE
            </Button>
          </a>
          <a
            href="https://wa.me/9779818858242?text=Hi%2C%20I%27d%20like%20to%20get%20a%20quote%20from%20Brothers%20Garage."
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
  );
}
