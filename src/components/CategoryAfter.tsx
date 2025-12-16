import React from 'react';
import { Link } from 'react-router-dom';

type Category = {
  id: number;
  label: string;
  slug: string;
  image: string;
};

const categories: Category[] = [
  { id: 1, label: 'All Restaurant', slug: 'all', image: '/image/all.png' },
  { id: 2, label: 'Nearby', slug: 'nearby', image: '/image/nearby.png' },
  { id: 3, label: 'Discount', slug: 'discount', image: '/image/discount.png' },
  {
    id: 4,
    label: 'Best Seller',
    slug: 'best-seller',
    image: '/image/best.png',
  },
  { id: 5, label: 'Deli', slug: 'deli', image: '/image/deli.png' },
  { id: 6, label: 'Lunch', slug: 'lunch', image: '/image/lunch.png' },
];

export default function CategorySection() {
  return (
    <div className='w-full flex justify-center mt-10'>
      <div className='grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-8'>
        {categories.map((cat) => (
          <Link
            key={cat.id}
            to={`/category/${cat.slug}`}
            className='w-[161px] h-[138px] bg-white rounded-xl shadow-md
                       flex flex-col items-center justify-center
                       hover:shadow-lg hover:scale-105 active:scale-95
                       transition cursor-pointer'
          >
            <img
              src={cat.image}
              alt={cat.label}
              className='h-[90px] object-contain'
            />
            <p className='mt-2 font-bold text-gray-700 text-sm'>{cat.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
