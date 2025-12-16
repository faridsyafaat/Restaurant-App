'use client';

import { Search } from 'lucide-react';
import { useSearch } from '@/context/useSearch';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

export default function HeroSectionAfter() {
  const { search, setSearch } = useSearch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!search.trim()) return;

    setLoading(true);
    try {
      const res = await axios.get(
        `https://restaurant-be-400174736012.asia-southeast2.run.app/api/resto/search?q=${encodeURIComponent(
          search
        )}&page=1&limit=20`
      );

      const restaurants = res.data?.data?.restaurants;

      if (Array.isArray(restaurants) && restaurants.length > 0) {
        const resto = restaurants[0];
        navigate(`/restaurant/${resto.id}`);
      } else {
        alert('Restaurant tidak ditemukan');
      }
    } catch (err: unknown) {
      console.error('Search error:', err);

      if (axios.isAxiosError(err)) {
        alert(err.response?.data?.message || 'Search gagal (network)');
      } else if (err instanceof Error) {
        alert(err.message);
      } else {
        alert('Terjadi kesalahan saat mencari. Coba lagi.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className='relative w-full min-h-[520px] bg-cover bg-center md:bg-top flex items-center justify-center'
      style={{ backgroundImage: "url('/image/hero-bg.png')" }}
    >
      <div className='absolute inset-0 bg-black/60' />

      <div className='relative z-10 text-center text-white max-w-4xl px-4'>
        <h1 className='text-4xl md:text-5xl font-bold mb-4'>
          Explore Culinary Experiences
        </h1>

        <p className='text-xl opacity-90 mb-8'>
          Search and refine your choice to discover the perfect restaurant.
        </p>

        <div className='w-full flex justify-center'>
          <div className='relative w-full md:w-[480px]'>
            <Search
              className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400'
              size={20}
            />
            <input
              type='text'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleSearch();
                }
              }}
              placeholder='Search restaurants, food and drink'
              className='w-full pl-12 pr-5 py-3 rounded-full text-gray-800 shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-400'
            />
          </div>
        </div>

        {loading && <p className='mt-3 text-sm opacity-80'>Searching...</p>}
      </div>
    </section>
  );
}
