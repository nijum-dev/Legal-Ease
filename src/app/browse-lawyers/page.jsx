"use client";
import React, { Suspense, useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import Link from 'next/link';
import { FiSearch, FiFilter, FiDollarSign, FiClock, FiCheckCircle, FiChevronLeft, FiChevronRight, FiRefreshCw } from 'react-icons/fi';
import toast from 'react-hot-toast';

function BrowseLawyersContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Initial state based on URL
  const initialSearch = searchParams.get('search') || '';
  const initialCategory = searchParams.get('category') || '';
  const initialMinFee = searchParams.get('minFee') || '';
  const initialMaxFee = searchParams.get('maxFee') || '';
  const initialStatus = searchParams.get('status') || '';
  const initialSort = searchParams.get('sort') || 'newest';

  const [lawyers, setLawyers] = useState([]);
  const [meta, setMeta] = useState({ page: 1, totalPages: 1, total: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Form state
  const [searchInput, setSearchInput] = useState(initialSearch);
  const [minFeeInput, setMinFeeInput] = useState(initialMinFee);
  const [maxFeeInput, setMaxFeeInput] = useState(initialMaxFee);

  // Sync state if URL changes directly
  useEffect(() => {
    setSearchInput(searchParams.get('search') || '');
    setMinFeeInput(searchParams.get('minFee') || '');
    setMaxFeeInput(searchParams.get('maxFee') || '');
  }, [searchParams]);

  const fetchLawyers = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const qs = searchParams.toString();
      const res = await fetch(`/api/lawyers?${qs}`);
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setLawyers(data.data);
      setMeta(data.meta);
    } catch (err) {
      setError(true);
      toast.error('Failed to load lawyers. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [searchParams]);

  useEffect(() => {
    fetchLawyers();
  }, [fetchLawyers]);

  const updateURL = (updates) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.keys(updates).forEach(key => {
      if (updates[key]) {
        params.set(key, updates[key]);
      } else {
        params.delete(key);
      }
    });
    // If we are changing filters, reset to page 1
    if (!('page' in updates)) {
      params.set('page', '1');
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    updateURL({ search: searchInput, minFee: minFeeInput, maxFee: maxFeeInput });
  };

  const handleClearFilters = () => {
    setSearchInput('');
    setMinFeeInput('');
    setMaxFeeInput('');
    router.push(pathname); 
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-grow flex flex-col">
      
      <div className="mb-8 text-center md:text-left">
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">Find Your <span className="text-[#B45309]">Legal Expert</span></h1>
        <p className="text-gray-600 max-w-2xl text-lg">Browse through our network of experienced lawyers and find the right match for your case.</p>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 mb-8">
        <form onSubmit={handleSearchSubmit} className="flex flex-col lg:flex-row gap-4 items-center">
          <div className="flex-1 w-full relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400 w-5 h-5" />
            </div>
            <input 
              type="text" 
              placeholder="Search by name or keyword..." 
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="pl-11 w-full rounded-xl border border-gray-200 bg-gray-50 py-3 text-sm focus:ring-2 focus:ring-[#B45309] focus:border-[#B45309] transition-all"
            />
          </div>
          
          <div className="w-full lg:w-48">
            <select 
              value={initialCategory} 
              onChange={(e) => updateURL({ category: e.target.value })}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 px-4 text-sm focus:ring-2 focus:ring-[#B45309] transition-all"
            >
              <option value="">All Categories</option>
              <option value="Corporate">Corporate</option>
              <option value="Criminal">Criminal</option>
              <option value="Family">Family</option>
              <option value="Immigration">Immigration</option>
              <option value="Intellectual Property">Intellectual Property</option>
              <option value="Real Estate">Real Estate</option>
            </select>
          </div>

          <div className="flex gap-2 w-full lg:w-auto items-center">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiDollarSign className="text-gray-400" />
              </div>
              <input 
                type="number" 
                placeholder="Min" 
                value={minFeeInput}
                onChange={(e) => setMinFeeInput(e.target.value)}
                className="pl-8 w-24 rounded-xl border border-gray-200 bg-gray-50 py-3 text-sm focus:ring-2 focus:ring-[#B45309]"
              />
            </div>
            <span className="text-gray-400 font-medium">-</span>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiDollarSign className="text-gray-400" />
              </div>
              <input 
                type="number" 
                placeholder="Max" 
                value={maxFeeInput}
                onChange={(e) => setMaxFeeInput(e.target.value)}
                className="pl-8 w-24 rounded-xl border border-gray-200 bg-gray-50 py-3 text-sm focus:ring-2 focus:ring-[#B45309]"
              />
            </div>
            <button type="submit" className="hidden lg:flex items-center justify-center bg-[#B45309]/10 text-[#B45309] p-3 rounded-xl hover:bg-[#B45309]/20 transition w-12 h-12">
              <FiFilter className="w-5 h-5" />
            </button>
          </div>

          <div className="w-full lg:w-44">
            <select 
              value={initialStatus} 
              onChange={(e) => updateURL({ status: e.target.value })}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 px-4 text-sm focus:ring-2 focus:ring-[#B45309]"
            >
              <option value="">Any Availability</option>
              <option value="available">Available</option>
              <option value="busy">Busy</option>
            </select>
          </div>

          <div className="w-full lg:w-44">
            <select 
              value={initialSort} 
              onChange={(e) => updateURL({ sort: e.target.value })}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 px-4 text-sm focus:ring-2 focus:ring-[#B45309]"
            >
              <option value="newest">Newest First</option>
              <option value="fee asc">Fee: Low to High</option>
              <option value="fee desc">Fee: High to Low</option>
            </select>
          </div>
          
          <button type="submit" className="lg:hidden w-full bg-[#B45309] text-white font-bold py-3 rounded-xl hover:bg-amber-700 transition shadow-md shadow-[#B45309]/20">
            Apply Filters
          </button>
        </form>
      </div>

      {/* Main Content Area */}
      {error ? (
        <div className="flex-grow flex flex-col items-center justify-center py-20 text-center">
          <div className="bg-red-50 text-red-500 p-5 rounded-full mb-5 shadow-sm">
            <FiRefreshCw className="w-10 h-10" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong</h3>
          <p className="text-gray-500 mb-8 max-w-sm text-lg">We couldn't load the lawyers. Please check your connection and try again.</p>
          <button onClick={fetchLawyers} className="bg-[#B45309] text-white px-8 py-3 rounded-xl font-bold hover:bg-amber-700 transition shadow-lg shadow-[#B45309]/30">
            Try Again
          </button>
        </div>
      ) : loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 animate-pulse">
              <div className="h-56 bg-gray-200 w-full"></div>
              <div className="p-5">
                <div className="h-5 bg-gray-200 rounded-md w-3/4 mb-3"></div>
                <div className="h-4 bg-gray-200 rounded-md w-1/2 mb-6"></div>
                <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                  <div className="h-5 bg-gray-200 rounded-md w-1/3"></div>
                  <div className="h-6 bg-gray-200 rounded-full w-20"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : lawyers.length === 0 ? (
        <div className="flex-grow flex flex-col items-center justify-center py-24 text-center">
          <div className="bg-gray-50 p-6 rounded-full mb-6 border border-gray-100">
            <FiSearch className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">No lawyers found</h3>
          <p className="text-gray-500 mb-8 max-w-md text-lg">We couldn't find any lawyers matching your current filters. Try adjusting your criteria or clearing filters.</p>
          <button onClick={handleClearFilters} className="bg-white text-gray-700 border-2 border-gray-200 px-8 py-3 rounded-xl font-bold hover:bg-gray-50 transition shadow-sm">
            Clear All Filters
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6 mb-12 flex-grow content-start">
            {lawyers.map((lawyer) => (
              <Link href={`/lawyers/${lawyer.id}`} key={lawyer.id} className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-[#B45309]/10 transition-all duration-300 border border-gray-100 hover:-translate-y-1.5">
                <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-gray-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={lawyer.avatar} alt={lawyer.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {lawyer.status === 'busy' && (
                    <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5 backdrop-blur-md">
                      <FiClock className="w-3.5 h-3.5" />
                      Busy
                    </div>
                  )}
                  {lawyer.status === 'available' && (
                    <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5 backdrop-blur-md">
                      <FiCheckCircle className="w-3.5 h-3.5" />
                      Available
                    </div>
                  )}
                </div>
                
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-[#B45309] transition-colors line-clamp-1">{lawyer.name}</h3>
                  <p className="text-sm font-semibold text-[#B45309]/80 mb-5">{lawyer.specialization}</p>
                  
                  <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
                    <div className="flex items-center text-gray-800">
                      <span className="font-extrabold text-lg">${lawyer.hourlyRate}</span>
                      <span className="text-xs text-gray-500 ml-1 font-medium">/hr</span>
                    </div>
                    <span className="text-xs font-bold text-white bg-[#B45309] px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 shadow-sm">
                      View Profile
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          {meta.totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-auto pt-8">
              <button 
                onClick={() => updateURL({ page: (meta.page - 1).toString() })}
                disabled={meta.page <= 1}
                className="p-2.5 rounded-xl border-2 border-gray-200 text-gray-500 disabled:opacity-50 disabled:cursor-not-allowed hover:border-[#B45309] hover:text-[#B45309] transition-all bg-white"
                aria-label="Previous page"
              >
                <FiChevronLeft className="w-5 h-5" />
              </button>
              
              <div className="flex items-center gap-1.5 px-2">
                {Array.from({ length: meta.totalPages }).map((_, i) => {
                  const p = i + 1;
                  if (
                    p === 1 || 
                    p === meta.totalPages || 
                    (p >= meta.page - 1 && p <= meta.page + 1)
                  ) {
                    return (
                      <button
                        key={p}
                        onClick={() => updateURL({ page: p.toString() })}
                        className={`w-11 h-11 rounded-xl text-sm font-bold transition-all ${meta.page === p ? 'bg-[#B45309] text-white shadow-lg shadow-[#B45309]/30 scale-105' : 'text-gray-600 hover:bg-gray-100 bg-white border border-gray-100'}`}
                      >
                        {p}
                      </button>
                    );
                  } else if (
                    (p === 2 && meta.page > 3) || 
                    (p === meta.totalPages - 1 && meta.page < meta.totalPages - 2)
                  ) {
                    return <span key={p} className="px-2 text-gray-400 font-medium">...</span>;
                  }
                  return null;
                })}
              </div>

              <button 
                onClick={() => updateURL({ page: (meta.page + 1).toString() })}
                disabled={meta.page >= meta.totalPages}
                className="p-2.5 rounded-xl border-2 border-gray-200 text-gray-500 disabled:opacity-50 disabled:cursor-not-allowed hover:border-[#B45309] hover:text-[#B45309] transition-all bg-white"
                aria-label="Next page"
              >
                <FiChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default function BrowseLawyersPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#F8FAFC] flex flex-col">
      <Suspense fallback={
        <div className="flex-grow flex items-center justify-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#B45309]"></div>
        </div>
      }>
        <BrowseLawyersContent />
      </Suspense>
    </div>
  );
}
