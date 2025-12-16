import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarAfterWhite from '@/components/NavbarAfterWhite';
import FooterSection from '@/components/FooterSection';
import { useCart } from '@/hooks/useCart';
import { useAddress } from '@/context/address/useAddress';
import ChangeAddressModal from '@/pages/checkout/ChangeAddressModal';
import { MapPin } from 'lucide-react';

/* ================= TYPES ================= */

interface CheckoutItemPayload {
  menuId: number;
  quantity: number;
}

interface CheckoutRestaurantPayload {
  restaurantId: number;
  items: CheckoutItemPayload[];
}

interface CheckoutPayload {
  restaurants: CheckoutRestaurantPayload[];
  deliveryAddress: string;
  phone: string;
  paymentMethod: string;
  notes: string;
}

/* ================= COMPONENT ================= */

export default function CheckoutPage() {
  const navigate = useNavigate();

  // Cart Context
  const { cart, increase, decrease, clearCart } = useCart();
  const { address, updateAddress } = useAddress();

  const [paymentMethod, setPaymentMethod] = useState('BNI');
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [loading, setLoading] = useState(false);

  /* ================= BANK LIST ================= */

  const banks = [
    { key: 'BNI', name: 'Bank BNI', logo: '/image/bni.png' },
    { key: 'BRI', name: 'Bank BRI', logo: '/image/bri.png' },
    { key: 'BCA', name: 'Bank BCA', logo: '/image/bca.png' },
    { key: 'Mandiri', name: 'Bank Mandiri', logo: '/image/mandiri.png' },
  ];

  /* ================= TOTAL ================= */

  const subtotal = cart.restaurants.reduce(
    (sum, restaurant) =>
      sum +
      restaurant.items.reduce(
        (itemSum, item) => itemSum + item.price * item.qty,
        0
      ),
    0
  );

  const deliveryFee = 10000;
  const serviceFee = 1000;
  const total = subtotal + deliveryFee + serviceFee;

  /* ================= CHECKOUT ================= */

  const handleCheckout = async () => {
    if (cart.restaurants.length === 0) {
      alert('Cart is empty');
      return;
    }

    try {
      setLoading(true);

      const payload: CheckoutPayload = {
        restaurants: cart.restaurants.map((restaurant) => ({
          restaurantId: restaurant.restaurantId,
          items: restaurant.items.map((item) => ({
            menuId: item.id,
            quantity: item.qty,
          })),
        })),
        deliveryAddress: address.street,
        phone: address.phone,
        paymentMethod,
        notes: '',
      };

      const res = await fetch(
        'https://restaurant-be-400174736012.asia-southeast2.run.app/api/order/checkout',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Checkout failed');
      }

      // ===============================
      // SAVE PAYMENT SUMMARY
      // ===============================
      sessionStorage.setItem(
        'lastOrder',
        JSON.stringify({
          date: new Date().toLocaleString('id-ID'),
          paymentMethod,
          subtotal,
          deliveryFee,
          serviceFee,
          total,
        })
      );

      clearCart();
      navigate('/payment-success');
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Checkout error');
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */

  return (
    <>
      <NavbarAfterWhite />

      <div className='max-w-6xl mx-auto px-4 py-8 pb-32'>
        <h2 className='text-3xl font-bold mb-6'>Checkout</h2>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {/* ================= LEFT ================= */}
          <div className='md:col-span-2 space-y-6'>
            {/* Address */}
            <div className='border rounded-xl p-4 bg-white'>
              <div className='flex items-center gap-2 mb-2'>
                <MapPin className='text-red-600' size={22} />
                <h4 className='font-semibold text-xl'>Delivery Address</h4>
              </div>

              <p className='text-sm text-gray-600'>{address.street}</p>
              <p className='text-sm text-gray-600'>{address.phone}</p>

              <button
                className='mt-2 text-sm text-red-600 font-medium'
                onClick={() => setShowAddressModal(true)}
              >
                Change
              </button>
            </div>

            {/* Cart */}
            {cart.restaurants.map((restaurant) => (
              <div
                key={restaurant.restaurantId}
                className='border rounded-xl p-4 bg-white'
              >
                <div className='flex items-center gap-3 mb-4'>
                  {restaurant.restaurantLogo && (
                    <img
                      src={restaurant.restaurantLogo}
                      alt={restaurant.restaurantName}
                      className='w-10 h-10 rounded-full object-cover'
                    />
                  )}
                  <h3 className='font-semibold text-lg'>
                    {restaurant.restaurantName}
                  </h3>
                </div>

                {restaurant.items.map((item) => (
                  <div
                    key={item.id}
                    className='flex items-center gap-4 py-3 border-t'
                  >
                    <img
                      src={item.image || '/placeholder-food.png'}
                      alt={item.name}
                      className='w-16 h-16 rounded-lg object-cover'
                    />

                    <div className='flex-1'>
                      <p className='text-sm font-medium'>{item.name}</p>
                      <p className='text-sm text-gray-500'>
                        Rp {item.price.toLocaleString('id-ID')}
                      </p>
                    </div>

                    {/* (-) qty (+) */}
                    <div className='flex items-center gap-2'>
                      <button
                        type='button'
                        onClick={() =>
                          decrease(restaurant.restaurantId, item.id)
                        }
                        className='w-7 h-7 flex items-center justify-center border border-gray-300 rounded-full text-gray-600 hover:bg-gray-100'
                      >
                        −
                      </button>

                      <span className='text-sm font-medium w-4 text-center'>
                        {item.qty}
                      </span>

                      <button
                        type='button'
                        onClick={() =>
                          increase(restaurant.restaurantId, item.id)
                        }
                        className='w-7 h-7 flex items-center justify-center bg-red-600 text-white rounded-full hover:bg-red-700'
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* ================= RIGHT ================= */}
          <div className='space-y-6'>
            {/* Payment Method */}
            <div className='border rounded-xl p-4 bg-white'>
              <h4 className='font-semibold mb-4'>Payment Method</h4>

              <div className='space-y-3'>
                {banks.map((bank) => {
                  const selected = paymentMethod === bank.key;

                  return (
                    <label
                      key={bank.key}
                      className={`flex items-center justify-between p-3 border rounded-xl cursor-pointer transition ${
                        selected
                          ? 'border-red-600 bg-red-50'
                          : 'border-gray-200'
                      }`}
                    >
                      <div className='flex items-center gap-3'>
                        <img
                          src={bank.logo}
                          alt={bank.name}
                          className='w-10 h-10 object-contain'
                        />
                        <span className='text-sm font-medium'>{bank.name}</span>
                      </div>

                      <input
                        type='radio'
                        checked={selected}
                        onChange={() => setPaymentMethod(bank.key)}
                        className='accent-red-600 w-4 h-4'
                      />
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Payment Summary */}
            <div className='border rounded-xl p-4 bg-white'>
              <h4 className='font-semibold mb-4'>Payment Summary</h4>

              <div className='flex justify-between text-sm'>
                <span>Price (Items)</span>
                <span>Rp {subtotal.toLocaleString('id-ID')}</span>
              </div>

              <div className='flex justify-between text-sm'>
                <span>Delivery Fee</span>
                <span>Rp {deliveryFee.toLocaleString('id-ID')}</span>
              </div>

              <div className='flex justify-between text-sm mb-3'>
                <span>Service Fee</span>
                <span>Rp {serviceFee.toLocaleString('id-ID')}</span>
              </div>

              <div className='flex justify-between font-semibold mb-4'>
                <span>Total</span>
                <span>Rp {total.toLocaleString('id-ID')}</span>
              </div>

              <button
                onClick={handleCheckout}
                disabled={loading}
                className='w-full bg-red-600 text-white py-3 rounded-full disabled:opacity-50'
              >
                {loading ? 'Processing...' : 'Buy'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {showAddressModal && (
        <ChangeAddressModal
          initialAddress={address}
          onSave={updateAddress}
          onClose={() => setShowAddressModal(false)}
        />
      )}

      <FooterSection />
    </>
  );
}
