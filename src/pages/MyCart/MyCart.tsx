import { useNavigate } from 'react-router-dom';
import NavbarAfterWhite from '@/components/NavbarAfterWhite';
import FooterSection from '@/components/FooterSection';
import CartCard from '@/components/CartCard';
import { useCart } from '@/hooks/useCart';

export default function MyCart() {
  const { cart, increase, decrease } = useCart();
  const navigate = useNavigate();

  if (cart.restaurants.length === 0) {
    return (
      <>
        <NavbarAfterWhite />
        <p className='text-center mt-20'>Keranjang masih kosong</p>
        <FooterSection />
      </>
    );
  }

  return (
    <>
      <NavbarAfterWhite />

      <div className='max-w-4xl mx-auto px-4 py-6 space-y-8 pb-32'>
        <h2 className='font-bold text-3xl'>My Cart</h2>

        {cart.restaurants.map((restaurant) => {
          const totalPrice = restaurant.items.reduce(
            (acc, item) => acc + item.price * item.qty,
            0
          );

          return (
            <div
              key={restaurant.restaurantId}
              className='border rounded-xl p-4 bg-white'
            >
              {/* HEADER RESTAURANT */}
              <div className='flex items-center gap-3 mb-4'>
                <img
                  src={
                    restaurant.restaurantLogo ||
                    '/image/restaurant-placeholder.png'
                  }
                  alt={restaurant.restaurantName}
                  className='w-10 h-10 rounded-full object-cover border'
                />
                <p className='font-bold'>{restaurant.restaurantName}</p>
              </div>

              {/* ITEM LIST */}
              <div className='space-y-3'>
                {restaurant.items.map((item) => (
                  <CartCard
                    key={item.id}
                    item={item}
                    onIncrease={() =>
                      increase(restaurant.restaurantId, item.id)
                    }
                    onDecrease={() =>
                      decrease(restaurant.restaurantId, item.id)
                    }
                  />
                ))}
              </div>

              {/* FOOTER RESTAURANT */}
              <div className='flex justify-between items-center mt-4 border-t pt-4'>
                <span className='font-bold'>
                  Rp {totalPrice.toLocaleString('id-ID')}
                </span>

                <button
                  disabled={restaurant.items.length === 0}
                  onClick={() => navigate('/checkout')}
                  className='bg-[#C12116] text-white px-6 py-2 rounded-full font-semibold'
                >
                  Checkout
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <FooterSection />
    </>
  );
}
