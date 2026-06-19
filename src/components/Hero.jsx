'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'backOut' } }
};

const STATS = [
  { value: '15k+', label: 'Verified Lawyers' },
  { value: '98.7%', label: 'Success Rate' },
  { value: '$1.2M+', label: 'Escrows Processed' },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0F172A] via-[#0F172A] to-[#1a2744] text-white">
      {/* Ambient glow blobs */}
      <div className="absolute top-[-80px] right-[-80px] w-[500px] h-[500px] bg-[#B45309]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-60px] left-[-60px] w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '60px 60px' }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 md:py-32 lg:py-40">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="flex flex-col items-center text-center max-w-4xl mx-auto"
        >
          {/* Trust Badge */}
          <motion.div variants={badgeVariants} className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#B45309]/15 border border-[#B45309]/25 text-[#B45309] text-xs font-bold uppercase tracking-widest">
              <span className="h-1.5 w-1.5 rounded-full bg-[#B45309] animate-pulse" />
              Trusted by 50,000+ Clients Worldwide
            </span>
          </motion.div>

          {/* Main Tagline */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] text-white"
          >
            Find & Hire{' '}
            <span className="relative inline-block">
              <span className="text-[#B45309]">Expert Legal</span>
              {/* Underline accent */}
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 8.5C50 3.5 150 1 298 8.5" stroke="#B45309" strokeWidth="3" strokeLinecap="round" opacity="0.6"/>
              </svg>
            </span>{' '}
            Counsel
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={itemVariants}
            className="mt-8 text-lg sm:text-xl text-slate-300 max-w-2xl leading-relaxed"
          >
            LegalEase connects you with thousands of verified, independent attorneys across every legal domain. Skip the law firm markup — hire direct, pay securely, resolve faster.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/browse"
              className="group relative inline-flex items-center gap-2 bg-[#B45309] hover:bg-amber-600 text-white text-sm font-bold px-8 py-4 rounded-full shadow-lg shadow-amber-900/30 transition-all duration-200 hover:scale-[1.04] active:scale-[0.97]"
            >
              Browse Lawyers
              <svg className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 border border-slate-600 hover:border-white text-slate-300 hover:text-white text-sm font-semibold px-8 py-4 rounded-full transition-all duration-200"
            >
              Join as a Lawyer
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            </Link>
          </motion.div>

          {/* Search Bar */}
          <motion.div variants={itemVariants} className="mt-10 w-full max-w-xl">
            <form
              onSubmit={(e) => { e.preventDefault(); const q = e.target.q.value; if (q) window.location.href = `/browse?search=${encodeURIComponent(q)}`; }}
              className="flex items-center bg-white/10 backdrop-blur-sm border border-white/15 rounded-full overflow-hidden px-4 py-1 focus-within:border-[#B45309]/60 transition-colors"
            >
              <svg className="h-4 w-4 text-slate-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                name="q"
                type="text"
                placeholder="Search by specialization or lawyer name..."
                className="flex-1 bg-transparent text-white placeholder-slate-400 text-sm px-3 py-2.5 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-[#B45309] hover:bg-amber-600 text-white text-xs font-bold px-5 py-2 rounded-full transition-colors shrink-0"
              >
                Search
              </button>
            </form>
          </motion.div>

          {/* Trust Stats */}
          <motion.div
            variants={itemVariants}
            className="mt-14 flex flex-wrap justify-center gap-8 sm:gap-12"
          >
            {STATS.map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-2xl sm:text-3xl font-extrabold text-white">{stat.value}</p>
                <p className="text-xs text-slate-400 mt-0.5 uppercase tracking-wider font-medium">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom fade into page background */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#FAF8F5] to-transparent pointer-events-none" />
    </section>
  );
}
