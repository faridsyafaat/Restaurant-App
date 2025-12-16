import { Restaurant } from '@/types/Restaurant';

type Props = {
  restaurant: Restaurant;
};

export default function RestaurantCard({ restaurant }: Props) {
  return (
    <div className='bg-white rounded-xl shadow p-4 flex gap-4'>
      <img
        src={restaurant.logo}
        alt={restaurant.name}
        className='w-16 h-16 object-contain'
      />

      <div>
        <h3 className='font-bold'>{restaurant.name}</h3>
        <p className='text-sm text-gray-500'>
          ⭐ {restaurant.star} • {restaurant.place}
        </p>
        <p className='text-xs text-gray-400'>
          Rp {restaurant.priceRange.min.toLocaleString()} –{' '}
          {restaurant.priceRange.max.toLocaleString()}
        </p>
      </div>
    </div>
  );
}
