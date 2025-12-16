import { RestaurantFilters } from '@/types/Restaurant';

type Props = {
  filters: RestaurantFilters;
  onChange: (filters: RestaurantFilters) => void;
};

export default function CategoryFilter({ filters, onChange }: Props) {
  return (
    <div className='bg-white rounded-xl shadow p-5 space-y-6'>
      <h3 className='font-bold text-sm'>FILTER</h3>

      {/* Reset page */}
      <button
        type='button'
        className='text-xs text-blue-500 underline'
        onClick={() =>
          onChange({
            ...filters,
            page: 1,
          })
        }
      >
        Reset Page
      </button>

      {/* Distance (UI only dulu) */}
      <div>
        <p className='font-semibold text-sm mb-2'>Distance</p>
        {['Nearby', 'Within 1 km', 'Within 3 km', 'Within 5 km'].map((item) => (
          <label key={item} className='flex items-center gap-2 text-sm'>
            <input type='checkbox' />
            <span>{item}</span>
          </label>
        ))}
      </div>

      {/* Price */}
      <div>
        <p className='font-semibold text-sm mb-2'>Price</p>
        <div className='flex gap-2'>
          <input
            type='number'
            placeholder='Minimum Price'
            className='border rounded px-2 py-1 text-sm w-full'
            onChange={(e) =>
              onChange({
                ...filters,
                priceMin: Number(e.target.value) || undefined,
                page: 1,
              })
            }
          />
          <input
            type='number'
            placeholder='Maximum Price'
            className='border rounded px-2 py-1 text-sm w-full'
            onChange={(e) =>
              onChange({
                ...filters,
                priceMax: Number(e.target.value) || undefined,
                page: 1,
              })
            }
          />
        </div>
      </div>

      {/* Rating */}
      <div>
        <p className='font-semibold text-sm mb-2'>Rating</p>
        {[5, 4, 3, 2, 1].map((star) => (
          <label key={star} className='flex items-center gap-2 text-sm'>
            <input
              type='radio'
              name='rating'
              onChange={() =>
                onChange({
                  ...filters,
                  rating: star,
                  page: 1,
                })
              }
            />
            <span>{'⭐'.repeat(star)}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
