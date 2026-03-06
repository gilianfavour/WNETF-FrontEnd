'use client';

import Image, { StaticImageData } from 'next/image';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';

// Define the colors for use in component styles
const PRIMARY_BLUE = '#032B53';

interface HeroCarouselProps {
    slides: StaticImageData[]; // Accepts the array of image data
    autoPlay?: boolean;
    interval?: number;
    title: string;
    subtitle: string;
    ctaText: string;
    ctaHref: string;
}

const HeroCarousel: React.FC<HeroCarouselProps> = ({
    slides,
    autoPlay = true,
    interval = 7000,
    title,
    subtitle,
    ctaText,
    ctaHref,
}) => {
    const [current, setCurrent] = useState(0);

    const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
    const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

    useEffect(() => {
        if (!autoPlay || slides.length === 0) return;
        const timer = setInterval(nextSlide, interval);
        return () => clearInterval(timer);
    }, [autoPlay, interval, slides.length]);

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

            {/* Fixed Overlay Text */}
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 text-white z-10">
                <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4 drop-shadow-lg">
                    {title}
                </h1>
                <p className="max-w-2xl text-lg md:text-xl mb-6 text-gray-100">
                    {subtitle}
                </p>
                <a
                    href={ctaHref}
                    style={{ backgroundColor: PRIMARY_BLUE }}
                    className="px-8 py-3 text-lg font-semibold text-white rounded-full transition duration-300 hover:opacity-90 shadow-lg"
                >
                    {ctaText}
                </a>
            </div>

            {/* Navigation arrows (omitted for brevity, assume they are present) */}
            {/* Dots indicator (omitted for brevity, assume they are present) */}
        </section>
    );
};

export default HeroCarousel;