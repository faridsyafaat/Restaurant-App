import React from 'react';

const categories = [
  { id: 1, label: 'All', image: '/image/all.png' },
  { id: 2, label: 'Nearby', image: '/image/nearby.png' },
  { id: 3, label: 'Discount', image: '/image/discount.png' },
  { id: 4, label: 'Best Seller', image: '/image/best.png' },
  { id: 5, label: 'Deli', image: '/image/deli.png' },
  { id: 6, label: 'Lunch', image: '/image/lunch.png' },
];

export default function CategorySection() {
  return (
    <div className='w-full flex justify-center mt-10'>
      <div className='grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-8'>
        {categories.map((cat) => (
          <div
            key={cat.id}
            className='w-[161px] h-[138px] bg-white rounded-xl shadow-md 
                       flex flex-col items-center justify-center'
          >
            <img
              src={cat.image}
              alt={cat.label}
              className='h-[100px] object-contain'
            />
            <p className='mt-2 font-bold text-gray-700'>{cat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
