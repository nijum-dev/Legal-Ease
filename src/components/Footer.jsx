"use client";

import Link from "next/link";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();

    if (!email.trim()) return;

    setSubscribed(true);
    setEmail("");

    setTimeout(() => {
      setSubscribed(false);
    }, 3000);
  };

  return (
    <footer className="w-full border-t border-slate-800/80 bg-[#0F172A] text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 lg:gap-12 items-start">
          {/* Company Info */}
          <div className="col-span-1 space-y-4 md:col-span-4">
            <Link href="/" className="flex items-center gap-2 group">
              <svg
                className="h-7 w-7 text-[#B45309] transition-transform duration-300 group-hover:scale-110"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v17m9-10c0 3.314-4.03 6-9 6s-9-2.686-9-6m18 0c0-3.314-4.03-6-9-6s-9 2.686-9 6m18 0h-3m-12 0H3m15 0v3m-12-3v3m12-6V7m-12 0v3m12-3h-3m-6 0H6"
                />
              </svg>

              <span className="text-xl font-bold tracking-tight text-white">
                Legal<span className="text-[#B45309]">Ease</span>
              </span>
            </Link>

            <p className="max-w-sm text-sm leading-relaxed text-slate-400">
              Democratizing access to high-quality legal aid. Connect directly
              with independent, verified legal professionals from anywhere in
              the world.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4 pt-2">
              {/* Twitter/X */}
              <a
                href="#"
                aria-label="Twitter"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-slate-400 transition-all hover:scale-105 hover:bg-[#B45309] hover:text-white active:scale-95"
              >
                <svg
                  className="h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="#"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-slate-400 transition-all hover:scale-105 hover:bg-[#B45309] hover:text-white active:scale-95"
              >
                <svg
                  className="h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.85z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="#"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-slate-400 transition-all hover:scale-105 hover:bg-[#B45309] hover:text-white active:scale-95"
              >
                <svg
                  className="h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 0H5C2.239 0 0 2.239 0 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5V5c0-2.761-2.239-5-5-5ZM8 19H5V8h3Zm-1.5-12.268a1.75 1.75 0 1 1 0-3.5 1.75 1.75 0 0 1 0 3.5ZM20 19h-3v-5.604c0-3.368-4-3.113-4 0V19h-3V8h3v1.765C14.396 7.179 20 6.988 20 12.241V19Z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Platform */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-400">
              Platform
            </h3>

            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="transition-colors hover:text-[#B45309]">
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/browse"
                  className="transition-colors hover:text-[#B45309]"
                >
                  Browse Lawyers
                </Link>
              </li>

              <li>
                <Link
                  href="/dashboard"
                  className="transition-colors hover:text-[#B45309]"
                >
                  Client Portal
                </Link>
              </li>

              <li>
                <Link
                  href="/dashboard"
                  className="transition-colors hover:text-[#B45309]"
                >
                  Attorney Hub
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-400">
              Company
            </h3>

            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/about"
                  className="transition-colors hover:text-[#B45309]"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="transition-colors hover:text-[#B45309]"
                >
                  Contact
                </Link>
              </li>

              <li>
                <Link
                  href="/privacy"
                  className="transition-colors hover:text-[#B45309]"
                >
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link
                  href="/terms"
                  className="transition-colors hover:text-[#B45309]"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-1 space-y-4 md:col-span-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Stay Informed
            </h3>

            <p className="text-sm leading-relaxed text-slate-400">
              Subscribe to get the latest legal developments, case studies, and
              feature updates.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2.5">
              <div className="flex flex-col gap-2 sm:flex-row">
                <input
                  type="email"
                  required
                  value={email}
                  placeholder="Enter your email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 rounded-full border border-slate-700 bg-slate-800 px-4 py-2 text-xs text-white placeholder:text-slate-400 focus:border-[#B45309] focus:bg-slate-800 focus:outline-none"
                />

                <button
                  type="submit"
                  className="rounded-full bg-[#B45309] px-6 py-2.5 text-xs font-bold text-white shadow-lg transition-all hover:bg-amber-600 active:scale-95"
                >
                  Subscribe
                </button>
              </div>

              {subscribed && (
                <p className="animate-pulse text-xs font-medium text-emerald-400">
                  ✓ Thank you! You have been successfully subscribed.
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-800/80 pt-8 text-xs text-slate-500 md:flex-row">
          <p>
            © {new Date().getFullYear()} LegalEase Inc. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-[#B45309] hover:underline">
              Cookies Settings
            </a>

            <span>•</span>

            <a href="#" className="hover:text-[#B45309] hover:underline">
              System Status
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}