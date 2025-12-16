import React from 'react';
import { Search } from 'lucide-react';

export default function HeroSection() {
  return (
    <section
      className='relative w-full min-h-[520px] bg-cover bg-center md:bg-top flex items-center justify-center'
      style={{ backgroundImage: "url('/image/hero-bg.png')" }}
    >
      {/* Overlay gelap */}
      <div className='absolute inset-0 bg-black/60' />

      {/* Content */}
      <div className='relative z-10 text-center text-white max-w-2xl px-4'>
        <h1 className='text-4xl md:text-5xl font-bold mb-4 whitespace-normal md:whitespace-nowrap'>
          Explore Culinary Experiences
        </h1>

        <p className='text-lg opacity-90 mb-8 whitespace-normal md:whitespace-nowrap'>
          Search and refine your choice to discover the perfect restaurant.
        </p>

        {/* Search Bar */}
        <div className='w-full flex justify-center'>
          <div className='relative w-full md:w-[480px]'>
            {/* ICON SEARCH */}
            <Search
              className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400'
              size={20}
            />

            {/* INPUT */}
            <input
              type='text'
              placeholder='Search restaurants, food and drink'
              className='w-full pl-12 pr-5 py-3 rounded-full text-gray-800 shadow-lg
                 focus:outline-none focus:ring-2 focus:ring-orange-400'
            />
          </div>
        </div>
      </div>
    </section>
  );
}
