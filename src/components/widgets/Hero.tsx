'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import CTA from '../common/CTA';
import hero1 from '~/assets/images/hero1.jpg';
import hero2 from '~/assets/images/hero2.jpg';
import hero3 from '~/assets/images/hero3.jpg';

/* ==================== SLIDES DATA ==================== */
const slides = [hero1, hero2, hero3];

/* ==================== HERO CAROUSEL ==================== */
const HeroCarousel = ({ autoPlay = true, interval = 7000 }: { autoPlay?: boolean; interval?: number }) => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(nextSlide, interval);
    return () => clearInterval(timer);
  }, [autoPlay, interval]);

  return (
    <section id="hero-carousel" className="relative w-full h-[70vh] overflow-hidden">
      {/* Background Images - smooth crossfade */}
      <div className="absolute inset-0 w-full h-full">
        <AnimatePresence>
          <motion.div
            key={current}
            initial={{ opacity: 0.7 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0.7 }}
            transition={{ duration: 2, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <motion.div
              initial={{ scale: 1 }}
              animate={{ scale: 1.05 }}
              transition={{ duration: interval / 1000, ease: 'easeInOut' }}
              className="absolute inset-0"
            >
              <Image
                src={slides[current]}
                alt="Hero background"
                fill
                priority
                className="object-cover brightness-[0.55]"
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Fixed Overlay Text (does not re-render per slide) */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 text-white z-10">
        <p className="text-sm md:text-base font-semibold uppercase text-primary-300 mb-2">
          Empowering Dreams
        </p>
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4 drop-shadow-lg">
          Building a Brighter Future
        </h1>
        <p className="max-w-2xl text-lg md:text-xl mb-6 text-gray-100">
          Supporting education and opportunity for every child in West Nile.
        </p>
        <div className="flex gap-4">
          <CTA callToAction={{ text: 'Learn More', href: '/about' }} linkClass="btn btn-primary" />
          <CTA callToAction={{ text: 'Donate Now', href: '/donate' }} linkClass="btn btn-outline-light" />
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/40 hover:bg-black/60 p-3 rounded-full z-20"
      >
        <IconChevronLeft className="text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/40 hover:bg-black/60 p-3 rounded-full z-20"
      >
        <IconChevronRight className="text-white" />
      </button>

      {/* Dots indicator */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-3 w-3 rounded-full transition-all ${
              index === current ? 'bg-primary-400 scale-125' : 'bg-gray-400/70'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;
