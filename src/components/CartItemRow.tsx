import { CartItem } from '@/context/CartContextTypes';

type Props = {
  item: CartItem;
  onIncrease: () => void;
  onDecrease: () => void;
};

export default function CartItemRow({ item, onIncrease, onDecrease }: Props) {
  return (
    <div className='flex items-center justify-between py-4 border-b last:border-b-0'>
      <div className='flex items-center gap-4'>
        <img
          src={item.image || '/image/food-placeholder.png'}
          alt={item.name}
          className='w-16 h-16 rounded-lg object-cover'
        />

        <div>
          <p className='font-medium text-gray-900'>{item.name}</p>
          <p className='text-sm text-gray-500'>
            Rp {item.price.toLocaleString()}
          </p>
        </div>
      </div>

      <div className='flex items-center gap-3'>
        <button
          onClick={onDecrease}
          className='w-8 h-8 rounded-full border flex items-center justify-center text-gray-600 hover:bg-gray-100'
        >
          −
        </button>

        <span className='font-medium'>{item.qty}</span>

        <button
          onClick={onIncrease}
          className='w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center hover:bg-red-700'
        >
          +
        </button>
      </div>
    </div>
  );
}
