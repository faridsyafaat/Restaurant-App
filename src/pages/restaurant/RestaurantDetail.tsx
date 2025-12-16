import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import NavbarAfterWhite from '@/components/NavbarAfterWhite';
import FooterSection from '@/components/FooterSection';

import ImageGrid from './ImageGrid';
import DetailSection from './DetailSection';
import MenuSection from './MenuSection';
import ReviewSection from './ReviewSection';

import type { RestaurantDetail as RestaurantDetailType } from '@/types/RestaurantDetail';
import type { CartItem } from '@/context/CartContextTypes';
import { useCart } from '@/hooks/useCart';

export default function RestaurantDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [restaurant, setRestaurant] = useState<RestaurantDetailType | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  const { cart } = useCart();

  // ===============================
  // FETCH DETAIL RESTAURANT
  // ===============================
  useEffect(() => {
    if (!id) return;

    const fetchDetail = async () => {
      try {
        const res = await fetch(
          `https://restaurant-be-400174736012.asia-southeast2.run.app/api/resto/${id}?limitMenu=10&limitReview=6`
        );
        const json = await res.json();

        if (json.success) {
          setRestaurant(json.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  if (loading) {
    return <div className='text-center mt-20'>Loading...</div>;
  }

  if (!restaurant) {
    return <div className='text-center mt-20'>Restaurant tidak ditemukan</div>;
  }

  // ===============================
  // CART PER RESTAURANT
  // ===============================
  const restaurantId = Number(restaurant.id);

  const restaurantCart = cart.restaurants.find(
    (r) => r.restaurantId === restaurantId
  );

  const cartItems: CartItem[] = restaurantCart?.items ?? [];

  const totalQty = cartItems.reduce((acc, item) => acc + item.qty, 0);

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.qty * item.price,
    0
  );

  // ===============================
  // CHECKOUT
  // ===============================
  const handleCheckout = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Silakan login terlebih dahulu');
      return;
    }

    if (cartItems.length === 0) return;

    try {
      const res = await fetch(
        'https://restaurant-be-400174736012.asia-southeast2.run.app/api/cart',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            restaurantId,
            items: cartItems.map((item) => ({
              menuId: item.id,
              qty: item.qty,
            })),
          }),
        }
      );

      const json = await res.json();

      if (res.ok && json.success) {
        navigate('/mycart');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <NavbarAfterWhite />

      <div className='pb-28'>
        <ImageGrid images={restaurant.images} />

        <DetailSection restaurant={restaurant} />

        {/* PENTING: kirim restaurantName */}
        <MenuSection
          menus={restaurant.menus}
          restaurantName={restaurant.name}
          restaurantLogo={restaurant.logo}
        />

        <ReviewSection reviews={restaurant.reviews} />
      </div>

      {/* ===============================
          FLOATING CART BAR (PER RESTO)
         =============================== */}
      {cartItems.length > 0 && (
        <div className='fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4 z-50'>
          <div className='max-w-6xl mx-auto flex items-center justify-between'>
            <div>
              <div className='flex items-center gap-2'>
                <img src='/image/bag.png' alt='cart' className='w-6 h-6' />
                <span className='font-semibold'>{totalQty} item</span>
              </div>
              <div className='font-bold mt-1'>
                Rp {totalPrice.toLocaleString('id-ID')}
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className='bg-[#C12116] text-white px-8 h-[44px] rounded-full font-semibold'
            >
              Checkout
            </button>
          </div>
        </div>
      )}

      <FooterSection />
    </>
  );
}
