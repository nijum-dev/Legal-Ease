'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
 
export default function Navbar({
  isLoggedIn = false,
  userRole = 'client', // 'client' | 'lawyer'
  user = null, // e.g., { name: 'Jane Doe', email: 'jane.doe@example.com' }
  onLogout = null,
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  // Navigation Menu States
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Refs for click outside detection
  const dashboardRef = useRef(null);
  const profileRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dashboardRef.current && !dashboardRef.current.contains(event.target)) {
        setIsDashboardOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle Search Submit
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/browse-lawyers?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsMobileMenuOpen(false);
    }
  };

  // Nav link active helper
  const isActive = (path) => pathname === path;

  // Role-specific dashboard items
  const clientDashboard = [
    { name: 'Overview', href: '/dashboard' },
    { name: 'My Cases', href: '/dashboard/cases' },
    { name: 'Bookings', href: '/dashboard/consultations' },
    { name: 'Billing', href: '/dashboard/billing' },
  ];

  const lawyerDashboard = [
    { name: 'Overview', href: '/dashboard' },
    { name: 'Requests', href: '/dashboard/requests' },
    { name: 'Profile Editor', href: '/dashboard/profile' },
    { name: 'Earnings', href: '/dashboard/earnings' },
  ];

  const dashboardItems = userRole === 'lawyer' ? lawyerDashboard : clientDashboard;

  // Helper for user display name and initials
  const displayName = user?.name || (userRole === 'lawyer' ? 'Attorney' : 'Client');
  const userInitials = user?.name
    ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : (userRole === 'lawyer' ? 'AT' : 'CL');

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0F172A] text-white shadow-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <svg
              className="h-7 w-7 text-[#B45309]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17m9-10c0 3.314-4.03 6-9 6s-9-2.686-9-6m18 0c0-3.314-4.03-6-9-6s-9 2.686-9 6m18 0h-3m-12 0H3m15 0v3m-12-3v3m12-6V7m-12 0v3m12-3h-3m-6 0H6" />
            </svg>
            <span className="text-xl font-bold tracking-tight text-white">
              Legal<span className="text-[#B45309]">Ease</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className={`text-sm font-medium transition-colors hover:text-[#B45309] ${isActive('/') ? 'text-[#B45309] font-bold' : 'text-slate-300'
                }`}
            >
              Home
            </Link>
            <Link
              href="/browse-lawyers"
              className={`text-sm font-medium transition-colors hover:text-[#B45309] ${isActive('/browse-lawyers') ? 'text-[#B45309] font-bold' : 'text-slate-300'
                }`}
            >
              Browse Lawyers
            </Link>

            {/* Dashboard dropdown depending on role */}
            <div className="relative" ref={dashboardRef}>
              <button
                onClick={() => setIsDashboardOpen(!isDashboardOpen)}
                className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-[#B45309] ${pathname.startsWith('/dashboard') ? 'text-[#B45309] font-bold' : 'text-slate-300'
                  }`}
              >
                Dashboard ({userRole === 'lawyer' ? 'Lawyer' : 'Client'})
                <svg className={`h-4 w-4 transition-transform ${isDashboardOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isDashboardOpen && (
                <div className="absolute left-0 mt-2 w-48 rounded-md bg-[#0F172A] border border-slate-700/60 shadow-lg py-1 animate-fade-in origin-top-left">
                  <div className="px-4 py-1.5 text-xs font-bold text-slate-455 uppercase border-b border-slate-800">
                    {userRole} Area
                  </div>
                  {dashboardItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsDashboardOpen(false)}
                      className={`block px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white ${isActive(item.href) ? 'text-[#B45309] font-semibold bg-slate-800/50' : ''
                        }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Search Bar */}
          <div className="hidden lg:block flex-1 max-w-xs">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Search specialty, name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full bg-slate-800 py-1.5 pl-4 pr-10 text-xs text-white placeholder-slate-400 focus:outline-none focus:bg-slate-900 border border-transparent focus:border-[#B45309]"
              />
              <button type="submit" className="absolute right-3 top-2 text-slate-400 hover:text-[#B45309]">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </form>
          </div>

          {/* Right Side: Auth controls */}
          <div className="flex items-center gap-3">
            {isLoggedIn ? (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 focus:outline-none"
                >
                  <div className="h-8 w-8 rounded-full bg-[#B45309] flex items-center justify-center font-bold text-white text-xs border border-amber-600">
                    {userInitials}
                  </div>
                  <span className="hidden xl:inline text-xs font-semibold text-slate-200">
                    {displayName}
                  </span>
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md bg-[#0F172A] border border-slate-700/60 shadow-lg py-1 text-sm animate-fade-in origin-top-right">
                    <div className="px-4 py-1.5 text-xs text-slate-455 border-b border-slate-800">
                      Logged in as: <span className="text-white font-semibold truncate block">{user?.email || displayName}</span>
                    </div>
                    <Link
                      href="/dashboard/profile"
                      onClick={() => setIsProfileOpen(false)}
                      className="block px-4 py-2 text-slate-300 hover:bg-slate-800 hover:text-white"
                    >
                      My Profile
                    </Link>
                    {onLogout && (
                      <button
                        onClick={() => {
                          onLogout();
                          setIsProfileOpen(false);
                        }}
                        className="w-full text-left block px-4 py-2 text-red-400 hover:bg-slate-800 hover:text-red-300"
                      >
                        Sign Out
                      </button>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="text-xs font-semibold text-slate-300 hover:text-white px-2 py-1"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-[#B45309] hover:bg-amber-600 text-white text-xs font-bold px-3.5 py-1.5 rounded-full"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Menu Icon */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden rounded p-1 text-slate-300 hover:bg-slate-800 hover:text-white"
              aria-label="Toggle Menu"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-[#0F172A] px-4 py-4 space-y-4">

          {/* Search bar inside Mobile Menu */}
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Search specialty, name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full bg-slate-800 py-2 pl-4 pr-10 text-xs text-white focus:outline-none focus:bg-slate-900 border border-transparent focus:border-[#B45309]"
            />
            <button type="submit" className="absolute right-3 top-2.5 text-slate-400 hover:text-[#B45309]">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </form>
          {/* Nav Links */}
          <div className="flex flex-col gap-2 font-medium">
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`px-3 py-2 rounded-md text-sm ${isActive('/') ? 'bg-slate-800 text-[#B45309] font-bold' : 'text-slate-300 hover:bg-slate-800/50'
                }`}
            >
              Home
            </Link>
            <Link
              href="/browse-lawyers"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`px-3 py-2 rounded-md text-sm ${isActive('/browse-lawyers') ? 'bg-slate-800 text-[#B45309] font-bold' : 'text-slate-300 hover:bg-slate-800/50'
                }`}
            >
              Browse Lawyers
            </Link>

            <div className="bg-slate-900/50 p-2 rounded-lg border border-slate-800 space-y-1">
              <div className="px-3 py-1 text-xs font-bold text-[#B45309] uppercase">
                Dashboard Links
              </div>
              {dashboardItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-3 py-1.5 rounded-md text-xs ${isActive(item.href) ? 'text-[#B45309] font-bold bg-slate-800' : 'text-slate-300 hover:bg-slate-850'
                    }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Logout section */}
          <div className="pt-2 border-t border-slate-800">
            {isLoggedIn ? (
              <div className="flex items-center justify-between px-3 py-2 bg-slate-800/40 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="h-7 w-7 rounded-full bg-[#B45309] flex items-center justify-center font-bold text-white text-xs">
                    {userInitials}
                  </div>
                  <span className="text-xs text-white">
                    {displayName}
                  </span>
                </div>
                {onLogout && (
                  <button
                    onClick={() => {
                      onLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="px-2.5 py-1 rounded bg-red-950/40 text-red-400 hover:text-red-300 text-xs border border-red-900/40"
                  >
                    Logout
                  </button>
                )}
              </div>
            ) : (
              <div className="flex gap-2">
                <Link
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex-1 py-2 text-center rounded bg-slate-800 text-slate-350 hover:bg-slate-755 text-xs font-semibold"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex-1 py-2 text-center rounded bg-[#B45309] text-white hover:bg-amber-600 text-xs font-semibold"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

        </div>
      )}
    </header>
  );
}