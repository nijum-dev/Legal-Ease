'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const SLIDES = [
  {
    badge: "Legal Democratization",
    title: "Democratizing Access to Legal Aid",
    description: "Skip the traditional law firm barriers. Connect directly with qualified lawyers, schedule instant consultations, and secure the legal representation you deserve from anywhere in the world.",
    ctaText: "Browse Lawyers",
    ctaLink: "/browse",
    icon: (
      <svg className="w-32 h-32 md:w-48 md:h-48 text-[#B45309] drop-shadow-lg" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17M12 5.25L4.5 9.75M12 5.25l7.5 4.5M4.5 9.75L12 14.25M19.5 9.75L12 14.25M4.5 9.75v6a3 3 0 003 3h9a3 3 0 003-3v-6" />
        <circle cx="4.5" cy="9.75" r="1.5" fill="currentColor" />
        <circle cx="19.5" cy="9.75" r="1.5" fill="currentColor" />
      </svg>
    )
  },
  {
    badge: "Attorney Growth",
    title: "Empowering Emerging Legal Experts",
    description: "Are you a lawyer? Expand your practice globally. Showcase your credentials, manage client pipelines, and receive secure retainer payments via our verified, one-time setup platform.",
    ctaText: "Join as Attorney",
    ctaLink: "/register",
    icon: (
      <svg className="w-32 h-32 md:w-48 md:h-48 text-[#B45309] drop-shadow-lg" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-10.5m-10.5 10.5l4.5 4.5m-4.5-4.5h5.25m4.5-4.5l4.5 4.5m-4.5-4.5H18m0-3.75v3.75m0-3.75L10.5 10.5m4.5-4.5L12 3m6 6v3.75m-4.5-2.25L12 12m-6 6h12a1.5 1.5 0 001.5-1.5V15M6 18a1.5 1.5 0 01-1.5-1.5V15" />
      </svg>
    )
  },
  {
    badge: "Safe Transactions",
    title: "Secure & Streamlined Legal Hiring",
    description: "Experience absolute transparency. LegalEase guarantees client and lawyer protection through role-based access portals, integrated escrow payment processing, comments, and practice analytics.",
    ctaText: "Explore Features",
    ctaLink: "#features",
    icon: (
      <svg className="w-32 h-32 md:w-48 md:h-48 text-[#B45309] drop-shadow-lg" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    )
  }
];

const slideVariants = {
  enter: { opacity: 0, x: 40 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -40 }
};

const contentVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
};

export default function Banner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = SLIDES[currentSlide];

  return (
    <section className="relative overflow-hidden bg-[#0F172A] text-white py-16 lg:py-24 border-b border-[#B45309]/10">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#B45309]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <div className="min-h-[420px] md:min-h-[370px] flex items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              {/* Slide Content */}
              <motion.div
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left space-y-4"
              >
                <motion.span variants={itemVariants} className="lg:self-start px-3.5 py-1 rounded-full text-xs font-semibold bg-[#B45309]/15 text-[#B45309] border border-[#B45309]/20 uppercase tracking-wider">
                  {slide.badge}
                </motion.span>
                <motion.h1 variants={itemVariants} className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
                  {slide.title}
                </motion.h1>
                <motion.p variants={itemVariants} className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                  {slide.description}
                </motion.p>
                <motion.div variants={itemVariants} className="pt-4 flex flex-wrap justify-center lg:justify-start gap-4">
                  <Link href={slide.ctaLink} className="bg-[#B45309] hover:bg-amber-600 text-white text-sm font-bold px-6 py-3 rounded-full shadow-lg transition-all hover:scale-[1.03] active:scale-[0.98]">
                    {slide.ctaText}
                  </Link>
                  <Link href="/learn-more" className="border border-slate-600 hover:border-white text-slate-300 hover:text-white text-sm font-semibold px-6 py-3 rounded-full transition-all">
                    Learn More
                  </Link>
                </motion.div>
              </motion.div>

              {/* Slide Icon */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5, ease: 'easeOut' }}
                className="lg:col-span-5 flex justify-center items-center py-6 lg:py-0"
              >
                <div className="relative p-6 md:p-8 bg-slate-900/40 rounded-3xl border border-slate-800/80 shadow-2xl backdrop-blur-sm">
                  <div className="absolute inset-0 bg-[#B45309]/5 rounded-3xl blur-md pointer-events-none" />
                  <div className="relative z-10">{slide.icon}</div>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between mt-12 pt-6 border-t border-slate-800/60">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length)}
              className="p-2.5 rounded-full bg-slate-900/80 hover:bg-[#B45309] text-slate-400 hover:text-white border border-slate-800 hover:border-[#B45309] transition-all hover:scale-105 active:scale-95 shadow-md"
              aria-label="Previous Slide"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => setCurrentSlide((prev) => (prev + 1) % SLIDES.length)}
              className="p-2.5 rounded-full bg-slate-900/80 hover:bg-[#B45309] text-slate-400 hover:text-white border border-slate-800 hover:border-[#B45309] transition-all hover:scale-105 active:scale-95 shadow-md"
              aria-label="Next Slide"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          <div className="flex gap-2">
            {SLIDES.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2.5 rounded-full transition-all duration-300 ${index === currentSlide ? 'w-8 bg-[#B45309]' : 'w-2.5 bg-slate-700 hover:bg-slate-500'}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
