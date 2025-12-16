import { MapPin, Star } from 'lucide-react';
import type { RestaurantDetail } from '@/types/RestaurantDetail'; 

export default function DetailSection({
  restaurant,
}: {
  restaurant: RestaurantDetail;
}) {
  return (
    <div className='px-4 mt-6 container-custom'>
      <h1 className='text-3xl font-bold'>{restaurant.name}</h1>

      <div className='flex items-center gap-4 mt-2 text-gray-700'>
        <span className='flex items-center gap-1'>
          <Star className='text-yellow-500' size={20} />
          {restaurant.star}
        </span>

        <span className='flex items-center gap-1'>
          <MapPin size={20} />
          {restaurant.place}
        </span>
      </div>

      <p className='mt-2 text-gray-500'>{restaurant.category}</p>
    </div>
  );
}
