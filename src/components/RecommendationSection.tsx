import React from 'react';

const dummyRestaurants = [
  {
    id: 1,
    name: 'Burger King',
    rating: 4.8,
    distance: '2.4 Km',
    location: 'Jakarta Selatan',
    image: '/image/burger.png',
  },
  {
    id: 2,
    name: 'KFC',
    rating: 4.6,
    distance: '3.1 Km',
    location: 'Jakarta Selatan',
    image: '/image/burger.png',
  },
  {
    id: 3,
    name: "McDonald's",
    rating: 4.7,
    distance: '1.8 Km',
    location: 'Jakarta Selatan',
    image: '/image/burger.png',
  },
];

export default function RecommendationSection() {
  return (
    <section className='py-10 px-6 max-w-6xl mx-auto'>
      <div className='flex items-center justify-between mb-4'>
        <h2 className='text-4xl font-bold'>Recommended</h2>
        <button className='text-[#C12116] text-sm font-extrabold'>
          See All
        </button>
      </div>

      {/* Grid 3 kolom */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {dummyRestaurants.map((item) => (
          <div
            key={item.id}
            className='bg-white rounded-2xl p-4 shadow-md flex gap-4 items-center hover:shadow-lg transition cursor-pointer'
          >
            {/* Logo di kiri */}
            <img
              src={item.image}
              alt={item.name}
              className='w-16 h-16 object-contain'
            />

            {/* Info di kanan */}
            <div className='flex flex-col'>
              <h3 className='font-semibold text-base mb-1'>{item.name}</h3>

              <div className='flex items-center text-sm text-gray-600 gap-1'>
                <span>⭐</span>
                <span>{item.rating}</span>
              </div>

              <p className='text-xs text-gray-500 mt-1'>
                {item.location} • {item.distance}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
