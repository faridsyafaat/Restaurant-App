import { useParams } from 'react-router-dom';
import type { Menu } from '@/types/Menu';
import { useCart } from '@/hooks/useCart';

type Props = {
  menus: Menu[];
  restaurantName: string;
  restaurantLogo: string;
};

export default function MenuSection({
  menus,
  restaurantName,
  restaurantLogo,
}: Props) {
  const { id } = useParams<{ id: string }>();
  const restaurantId = Number(id);

  const { cart, addItem, increase, decrease } = useCart();

  const getQty = (menuId: number) => {
    const restaurantCart = cart.restaurants.find(
      (r) => r.restaurantId === restaurantId
    );
    return restaurantCart?.items.find((i) => i.id === menuId)?.qty ?? 0;
  };

  return (
    <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
      {menus.map((menu) => {
        const qty = getQty(menu.id);

        return (
          <div key={menu.id} className='border rounded-xl overflow-hidden'>
            <img
              src={menu.image}
              alt={menu.foodName}
              className='w-full h-[160px] object-cover'
            />

            <div className='p-3'>
              {/* ROW: INFO + ACTION */}
              <div className='flex items-center justify-between gap-2'>
                {/* LEFT */}
                <div className='flex flex-col'>
                  <h3 className='font-semibold text-sm'>{menu.foodName}</h3>
                  <p className='text-red-600 font-bold text-sm'>
                    Rp {menu.price.toLocaleString('id-ID')}
                  </p>
                </div>

                {/* RIGHT */}
                {qty === 0 ? (
                  <button
                    className='bg-[#C12116] text-white rounded-full w-[72px] h-[36px] text-sm'
                    onClick={() =>
                      addItem(restaurantId, restaurantName, restaurantLogo, {
                        id: menu.id,
                        name: menu.foodName,
                        price: menu.price,
                        image: menu.image!,
                      })
                    }
                  >
                    Add
                  </button>
                ) : (
                  <div className='flex items-center gap-2'>
                    <button
                      onClick={() => decrease(restaurantId, menu.id)}
                      className='w-7 h-7 bg-gray-200 rounded-full flex items-center justify-center'
                    >
                      −
                    </button>

                    <span className='font-semibold'>{qty}</span>

                    <button
                      onClick={() => increase(restaurantId, menu.id)}
                      className='w-7 h-7 bg-[#C12116] text-white rounded-full flex items-center justify-center'
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
