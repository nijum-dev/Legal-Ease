import { NextResponse } from 'next/server';

const BACKEND_API = process.env.BACKEND_API_URL || 'http://localhost:5000';

const CATEGORY_MAP = {
  'Corporate': 'Corporate Law',
  'Criminal': 'Criminal Defense',
  'Family': 'Family Law',
  'Immigration': 'Immigration Law',
  'Intellectual Property': 'Intellectual Property',
  'Real Estate': 'Real Estate Law',
};

const REVERSE_CATEGORY_MAP = Object.fromEntries(
  Object.entries(CATEGORY_MAP).map(([k, v]) => [v, k])
);

function mapExternalLawyer(lawyer) {
  return {
    id: lawyer._id,
    name: lawyer.name,
    avatar: lawyer.image,
    specialization: REVERSE_CATEGORY_MAP[lawyer.category] || lawyer.category,
    hourlyRate: lawyer.consultation_fee,
    status: lawyer.status?.toLowerCase() || 'available',
    createdAt: lawyer.date_joined ? new Date(lawyer.date_joined).toISOString() : new Date().toISOString(),
  };
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || '';
  const minFee = parseInt(searchParams.get('minFee'), 10) || 0;
  const maxFee = parseInt(searchParams.get('maxFee'), 10) || 9999;
  const status = searchParams.get('status') || '';
  const sort = searchParams.get('sort') || 'newest';
  const page = parseInt(searchParams.get('page'), 10) || 1;
  const limit = parseInt(searchParams.get('limit'), 10) || 8;

  try {
    // Fetch from external API
    const res = await fetch(`${BACKEND_API}/lawyers`, {
      next: { revalidate: 30 }, // cache for 30 seconds
    });

    if (!res.ok) {
      throw new Error(`External API returned ${res.status}`);
    }

    const externalLawyers = await res.json();

    // Map to frontend format
    let filtered = externalLawyers.map(mapExternalLawyer);

    // Apply filters
    if (search) {
      const s = search.toLowerCase();
      filtered = filtered.filter(lawyer =>
        lawyer.name.toLowerCase().includes(s) ||
        lawyer.specialization.toLowerCase().includes(s)
      );
    }

    if (category) {
      const mappedCategory = CATEGORY_MAP[category] || category;
      filtered = filtered.filter(lawyer =>
        lawyer.specialization === category ||
        lawyer.specialization === mappedCategory
      );
    }

    if (minFee > 0) {
      filtered = filtered.filter(lawyer => lawyer.hourlyRate >= minFee);
    }

    if (maxFee < 9999) {
      filtered = filtered.filter(lawyer => lawyer.hourlyRate <= maxFee);
    }

    if (status) {
      filtered = filtered.filter(lawyer => lawyer.status === status.toLowerCase());
    }

    // Sort
    filtered.sort((a, b) => {
      if (sort === 'fee asc') {
        return a.hourlyRate - b.hourlyRate;
      }
      if (sort === 'fee desc') {
        return b.hourlyRate - a.hourlyRate;
      }
      // newest (default)
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    const total = filtered.length;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginated = filtered.slice(startIndex, endIndex);

    return NextResponse.json({
      data: paginated,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    console.error('Failed to fetch lawyers from external API:', err);
    return NextResponse.json(
      { error: 'Failed to fetch lawyers. Please try again later.' },
      { status: 502 }
    );
  }
}