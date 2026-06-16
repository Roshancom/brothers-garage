import { useEffect, useState } from 'react';
import { Menu, Phone, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

import { motion } from 'framer-motion';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);

  const navLinks = ['Home', 'Services', 'Gallery', 'Contact'];
  const navHrefs: Record<string, string> = {
    Home: '#home',
    Services: '#services',
    Gallery: '#gallery',
    Contact: '#contact',
  };

  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 px-4 md:px-6 flex items-center justify-between h-16 transition-all duration-300 ${
        navScrolled
          ? 'bg-black/95 shadow-[0_4px_24px_rgba(0,0,0,0.6)] border-b border-border/20'
          : 'bg-transparent border-b border-border/5'
      }`}
      style={{
        backdropFilter: navScrolled ? 'blur(12px)' : 'blur(4px)',
        WebkitBackdropFilter: navScrolled ? 'blur(12px)' : 'blur(4px)',
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2 shrink-0">
        <img
          src="https://github.com/Roshancom/brothers-garage/blob/main/public/logo.png?raw=true"
          alt="Brothers Garage"
          height={50}
          width={100}
          className="object-contain rounded-full w-16 sm:w-20 md:w-24 lg:w-28 xl:w-32 h-auto cursor-pointer"
        />
      </div>

      {/* Desktop center links */}
      <div className="hidden md:flex gap-6 text-sm font-medium">
        {navLinks.map((link) => (
          <a
            key={link}
            href={navHrefs[link]}
            className="text-muted-foreground hover:text-primary transition-colors uppercase tracking-wider"
          >
            {link}
          </a>
        ))}
      </div>

      {/* Desktop right: phone + CTA */}
      <div className="hidden md:flex items-center gap-4">
        <a
          href="tel:+9779818858242"
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <Phone className="w-4 h-4" />
          <span>+977 981-8858242</span>
        </a>
        <a
          href="https://wa.me/9779818858242?text=Hi%2C%20I%27d%20like%20to%20book%20a%20service"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button
            size="sm"
            className="bg-primary text-black hover:bg-primary/90 active:bg-primary/80 font-bold uppercase tracking-wider px-5"
          >
            Book Now
          </Button>
        </a>
      </div>

      {/* Mobile hamburger */}
      <button
        className="md:hidden text-muted-foreground hover:text-primary transition-colors p-2"
        onClick={() => setMobileMenuOpen((v) => !v)}
        aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
      >
        {mobileMenuOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-16 left-0 right-0 bg-black/97 border-b border-border/20 py-3 flex flex-col md:hidden"
          style={{
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link}
              href={navHrefs[link]}
              onClick={() => setMobileMenuOpen(false)}
              className="px-6 py-3 text-muted-foreground hover:text-primary active:text-primary transition-colors uppercase tracking-wider text-sm"
            >
              {link}
            </a>
          ))}
          <div className="px-6 pt-2 pb-3 border-t border-border/10 mt-1 flex flex-col gap-2">
            <a
              href="tel:+9779818858242"
              className="flex items-center gap-2 text-muted-foreground text-sm py-1"
            >
              <Phone className="w-4 h-4 text-primary" /> +977 985-1147295
            </a>
            <a
              href="https://wa.me/9779818858242?text=Hi%2C%20I%27d%20like%20to%20book%20a%20service"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Button
                size="sm"
                className="w-full bg-primary text-black font-bold uppercase tracking-wider"
              >
                Book Now
              </Button>
            </a>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Header;
