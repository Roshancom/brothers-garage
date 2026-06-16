import React, { useEffect, useRef, useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useMotionValue,
  type MotionValue,
} from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { StoryWord } from '@/components/ui/StoryWord';
import { WavyText } from '@/components/ui/WavyText';
import { ScrollIcon } from '@/components/ui/ScrollIcon';
import { Counter } from '@/components/ui/Counter';
import { SvgLabel } from '@/components/ui/SvgLabel';
import { OpeningHoursBar } from '@/components/sections/OpeningHoursBar';
import { HeroBanner } from '@/components/sections/HeroBanner';
import { GallerySection } from '@/components/sections/GallerySection';
import { MapSection } from '@/components/sections/MapSection';
import { WhatsAppButton } from '@/components/sections/WhatsAppButton';
import { PartsShowcase } from '@/components/sections/PartsShowcase';
import { ServicesCards } from '@/components/sections/ServicesCards';
import { CTASection } from '@/components/sections/CTASection';
import { FooterSection } from '@/components/sections/FooterSection';
import Header from './components/sections/Header';
import BikeScroll from './components/sections/BikeScroll';
import StorySection from './components/sections/StorySection';

/* ─────────────────────────────────────────────
   Main App
───────────────────────────────────────────── */
export default function App() {
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-black">
      <Header />
      <OpeningHoursBar />
      <HeroBanner />
      <BikeScroll />
      <PartsShowcase />
      <StorySection />
      <ServicesCards />
      <CTASection />
      <GallerySection />
      <MapSection />
      <FooterSection />
      <WhatsAppButton />
    </div>
  );
}
