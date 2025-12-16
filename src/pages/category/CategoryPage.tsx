import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import NavbarAfterWhite from '@/components/NavbarAfterWhite';
import FooterSection from '@/components/FooterSection';
import CategoryFilter from '@/components/category/CategoryFilter';
import RestaurantCard from '@/components/restaurant/RestaurantCard';

import { getRestaurants } from '@/services/resto';
import { Restaurant, RestaurantResponse } from '@/types/Restaurant';

type Filters = {
  page: number;
  limit: number;
  location?: string;
  range?: number;
  priceMin?: number;
  priceMax?: number;
  rating?: number;
};

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  /* ======================
     FILTER STATE
  ====================== */
  const [filters, setFilters] = useState<Filters>({
    page: 1,
    limit: 10,
    location: 'Jakarta',
    range: 1,
    priceMin: 15000,
    priceMax: 100000,
    rating: 1,
  });

  /* ======================
     MOBILE FILTER STATE
  ====================== */
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  useEffect(() => {
    document.body.style.overflow = isFilterOpen ? 'hidden' : 'auto';
  }, [isFilterOpen]);

  /* ======================
     DUMMY DATA (4 dummy restaurant)
  ====================== */
  const dummyRestaurants: Restaurant[] = [
    {
      id: 1,
      name: 'Burger King 1 - Dummy',
      star: 4,
      place: 'Jakarta',
      logo: '/image/burger.png',
      images: ['/image/burger.png'],
      category: 'Pizza',
      reviewCount: 0,
      menuCount: 0,
      priceRange: { min: 10000, max: 50000 },
    },
    {
      id: 2,
      name: 'Burger King 2 - Dummy',
      star: 4,
      place: 'Jakarta',
      logo: '/image/burger.png',
      images: ['/image/burger.png'],
      category: 'Burger',
      reviewCount: 0,
      menuCount: 0,
      priceRange: { min: 10000, max: 50000 },
    },
    {
      id: 3,
      name: 'Burger King 3 - Dummy',
      star: 4,
      place: 'Jakarta',
      logo: '/image/burger.png',
      images: ['/image/burger.png'],
      category: 'Dessert',
      reviewCount: 0,
      menuCount: 0,
      priceRange: { min: 10000, max: 50000 },
    },
    {
      id: 4,
      name: 'Burger King 3 - Dummy',
      star: 4,
      place: 'Jakarta',
      logo: '/image/burger.png',
      images: ['/image/burger.png'],
      category: 'Coffee',
      reviewCount: 0,
      menuCount: 0,
      priceRange: { min: 10000, max: 50000 },
    },
  ];

  /* ======================
     FETCH DATA DARI API
  ====================== */
  const { data, isLoading, isError } = useQuery<RestaurantResponse>({
    queryKey: ['category-restaurants', slug, filters],
    queryFn: () =>
      getRestaurants({
        ...filters,
        category: slug === 'all' ? undefined : slug,
      }),
  });

  /* ======================
     DATA YANG AKAN DITAMPILKAN
  ====================== */
  const restaurantsToShow =
    !isLoading && !isError && (data?.restaurants.length ?? 0) > 0
      ? data!.restaurants
      : dummyRestaurants;

  return (
    <>
      {/* NAVBAR */}
      <NavbarAfterWhite />

      {/* MOBILE FILTER OVERLAY */}
      {isFilterOpen && (
        <div className='fixed inset-0 z-50 bg-white overflow-y-auto lg:hidden'>
          <div className='flex items-center justify-between px-4 py-4 border-b'>
            <h2 className='font-bold text-lg'>Filter</h2>
            <button onClick={() => setIsFilterOpen(false)} className='text-xl'>
              ✕
            </button>
          </div>

          <div className='p-4'>
            <CategoryFilter
              filters={filters}
              onChange={(newFilters) => {
                setFilters(newFilters);
                setIsFilterOpen(false);
              }}
            />
          </div>
        </div>
      )}

      {/* MAIN */}
      <main className='max-w-[1200px] mx-auto px-4 py-8'>
        {/* TITLE */}
        <h1 className='text-2xl font-bold mb-4'>
          {slug ? `Category: ${slug}` : 'All Restaurants'}
        </h1>

        {/* MOBILE FILTER BAR */}
        <div className='flex items-center justify-between mb-6 lg:hidden'>
          <span className='font-semibold text-sm'>Filter</span>
          <button
            onClick={() => setIsFilterOpen(true)}
            className='p-2 border rounded-lg'
          >
            ☰
          </button>
        </div>

        <div className='flex gap-8'>
          {/* DESKTOP SIDEBAR */}
          <aside className='w-[280px] hidden lg:block'>
            <CategoryFilter filters={filters} onChange={setFilters} />
          </aside>

          {/* CONTENT */}
          <section className='flex-1'>
            {isLoading && <p>Loading...</p>}
            {isError && (
              <p className='text-red-500'>
                Failed to fetch data. Showing dummy restaurants.
              </p>
            )}

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
              {restaurantsToShow.map((resto) => (
                <div
                  key={resto.id}
                  className='cursor-pointer'
                  onClick={() => navigate(`/restaurant/${resto.id}`)}
                >
                  <RestaurantCard restaurant={resto} />
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* FOOTER */}
      <FooterSection />
    </>
  );
}
