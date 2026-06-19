'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const CATEGORIES = [
  {
    title: "Criminal Defense",
    desc: "Felony charges, DUIs, investigations & regulatory offenses.",
    filter: "criminal-defense",
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    )
  },
  {
    title: "Corporate Law",
    desc: "Business formation, M&A, contracts & compliance advisory.",
    filter: "corporate-law",
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    )
  },
  {
    title: "Family Law",
    desc: "Divorce, custody, adoption, prenuptial agreements & estates.",
    filter: "family-law",
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    )
  },
  {
    title: "Intellectual Property",
    desc: "Patents, trademarks, copyrights & IP litigation strategy.",
    filter: "intellectual-property",
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    )
  },
  {
    title: "Real Estate",
    desc: "Property acquisition, leases, zoning & title dispute resolution.",
    filter: "real-estate",
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
      </svg>
    )
  },
  {
    title: "Employment Law",
    desc: "Wrongful termination, harassment, severance & wage disputes.",
    filter: "employment-law",
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    )
  },
  {
    title: "Civil Litigation",
    desc: "Contract disputes, personal injury, appeals & property claims.",
    filter: "civil-litigation",
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
      </svg>
    )
  },
  {
    title: "Immigration",
    desc: "Visa applications, work permits, asylum & citizenship filings.",
    filter: "immigration",
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    title: "Tax Law",
    desc: "Tax planning, IRS disputes, audits & corporate tax structuring.",
    filter: "tax-law",
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
      </svg>
    )
  },
  {
    title: "Bankruptcy",
    desc: "Chapter 7 & 13 filings, debt restructuring & creditor negotiations.",
    filter: "bankruptcy",
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    title: "Medical Malpractice",
    desc: "Healthcare negligence, misdiagnosis & hospital liability claims.",
    filter: "medical-malpractice",
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    )
  },
  {
    title: "Environmental Law",
    desc: "Regulatory compliance, pollution liability & land-use disputes.",
    filter: "environmental-law",
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    )
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } }
};

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 110, damping: 15 }
  }
};

const headingVariants = {
  hidden: { opacity: 0, y: -12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } }
};

const LegalCategories = () => {
  return (
    <section className="py-16 md:py-24 bg-white border-b border-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={headingVariants}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <span className="text-[#B45309] font-bold text-xs uppercase tracking-wider">
            Browse by Practice Area
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] mt-2 tracking-tight">
            Legal Categories
          </h2>
          <p className="text-base text-[#475569] mt-4 leading-relaxed">
            Find the right legal expert for your specific needs. Select a category to browse verified attorneys filtered by specialization.
          </p>
        </motion.div>

        {/* Category Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={containerVariants}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
        >
          {CATEGORIES.map((cat, index) => (
            <motion.div key={index} variants={cardVariants}>
              <Link
                href={`/browse?category=${cat.filter}`}
                className="group flex flex-col items-center gap-3 p-5 rounded-2xl border border-slate-100 bg-[#FAF8F5] hover:bg-[#0F172A] hover:border-[#0F172A] shadow-sm hover:shadow-xl transition-all duration-300 text-center"
              >
                {/* Icon bubble */}
                <div className="h-14 w-14 rounded-2xl bg-white border border-[#B45309]/15 flex items-center justify-center text-[#B45309] group-hover:bg-[#B45309] group-hover:text-white group-hover:border-[#B45309] transition-all duration-300 shadow-sm">
                  {cat.icon}
                </div>

                {/* Title */}
                <span className="text-xs font-bold text-[#0F172A] group-hover:text-white leading-tight transition-colors duration-300">
                  {cat.title}
                </span>

                {/* Desc — visible on hover on larger screens */}
                <span className="hidden lg:block text-[10px] text-slate-500 group-hover:text-slate-300 leading-snug line-clamp-2 transition-colors duration-300">
                  {cat.desc}
                </span>

                {/* Arrow CTA */}
                <span className="text-[#B45309] group-hover:text-white text-xs font-semibold flex items-center gap-1 transition-colors duration-300">
                  Browse
                  <svg className="h-3 w-3 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-12 text-center"
        >
          <Link
            href="/browse"
            className="inline-flex items-center gap-2 bg-[#0F172A] hover:bg-[#1E293B] text-white text-sm font-bold px-8 py-3 rounded-full shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            View All Practice Areas
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>

      </div>
    </section>
  );
};

export default LegalCategories;
