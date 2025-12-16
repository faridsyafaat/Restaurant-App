import type { CartItem } from '@/context/CartContextTypes';

export default function CartCard({
  item,
  onIncrease,
  onDecrease,
}: {
  item: CartItem;
  onIncrease: () => void;
  onDecrease: () => void;
}) {
  return (
    <div className='flex items-center justify-between border rounded-lg p-3'>
      {/* Info menu */}
      <div className='flex items-center gap-3'>
        <img
          src={item.image || '/image/food-placeholder.png'}
          alt={item.name}
          className='w-16 h-16 rounded-lg object-cover'
        />
        <div>
          <p className='font-semibold'>{item.name}</p>
          <p className='text-gray-800 font-bold'>
            Rp {item.price.toLocaleString('id-ID')}
          </p>
        </div>
      </div>

      {/* Kontrol qty di ujung kanan */}
      <div className='flex items-center gap-2'>
        <button
          onClick={onDecrease}
          className='w-8 h-8 rounded-full bg-gray-300 hover:bg-white flex items-center justify-center transition'
        >
          -
        </button>
        <span className='font-bold'>{item.qty}</span>
        <button
          onClick={onIncrease}
          className='w-8 h-8 rounded-full bg-[#C12116] hover:bg-red-700 text-white flex items-center justify-center transition'
        >
          +
        </button>
      </div>
    </div>
  );
}
