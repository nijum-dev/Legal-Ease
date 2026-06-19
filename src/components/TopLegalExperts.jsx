'use client';

import React from 'react';
import { motion } from 'framer-motion';

const TOP_LAWYERS = [
  {
    name: "John Snow, Esq.",
    specialty: "Corporate & VC Law",
    hires: "342 Case Hires",
    rating: "4.95",
    avatarBg: "from-[#B45309] to-[#D97706]",
    initials: "JS",
    badge: "#1 Top Hired"
  },
  {
    name: "Walter White",
    specialty: "Criminal Defense Expert",
    hires: "298 Case Hires",
    rating: "4.88",
    avatarBg: "from-[#0F172A] to-[#1E293B]",
    initials: "WW",
    badge: null
  },
  {
    name: "Arya Stark",
    specialty: "IP & Patent Counsel",
    hires: "276 Case Hires",
    rating: "4.92",
    avatarBg: "from-slate-700 to-slate-900",
    initials: "AS",
    badge: null
  }
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 14 }
  }
};

const titleVariants = {
  hidden: { opacity: 0, y: -15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

const Experts = () => {
  return (
    <section className="py-16 md:py-24 bg-[#FAF8F5] border-b border-slate-100 overflow-hidden w-full">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Animated Hero/Title */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={titleVariants}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-[#B45309] font-bold text-xs uppercase tracking-wider">Top Performers</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] mt-2 tracking-tight">
            Top Legal Experts
          </h2>
          <p className="text-base sm:text-lg text-[#475569] mt-4 leading-relaxed">
            Meet our most-hired legal professionals, vetted by success metrics, escrow ratings, and client testimonials.
          </p>
        </motion.div>

        {/* Staggered Cards on Scroll */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {TOP_LAWYERS.map((lawyer, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.03, transition: { duration: 0.2 } }}
              className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-xl transition-shadow duration-300 cursor-pointer flex flex-col items-center text-center relative group"
            >
              {/* Badge for #1 */}
              {lawyer.badge && (
                <span className="absolute top-4 right-4 bg-[#B45309]/10 text-[#B45309] text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border border-[#B45309]/20">
                  {lawyer.badge}
                </span>
              )}

              {/* Avatar */}
              <div className={`h-20 w-20 rounded-full bg-gradient-to-br ${lawyer.avatarBg} flex items-center justify-center font-extrabold text-white text-2xl shadow-md border-2 border-white mb-6 group-hover:scale-105 transition-transform duration-300`}>
                {lawyer.initials}
              </div>

              {/* Name & Specialty */}
              <h3 className="text-lg font-extrabold text-[#0F172A] group-hover:text-[#B45309] transition-colors">
                {lawyer.name}
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-1">{lawyer.specialty}</p>

              {/* Stats */}
              <div className="w-full mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold">
                <div className="flex items-center gap-1 text-slate-600">
                  <svg className="h-4 w-4 text-[#B45309]" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span>{lawyer.rating}</span>
                </div>
                <span className="text-[#B45309] bg-[#B45309]/5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                  {lawyer.hires}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default Experts;