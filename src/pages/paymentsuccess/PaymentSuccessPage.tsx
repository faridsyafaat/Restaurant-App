import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';

interface PaymentSuccessData {
  date: string;
  paymentMethod: string;
  subtotal: number;
  deliveryFee: number;
  serviceFee: number;
  total: number;
}

export default function PaymentSuccessPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [data] = useState<PaymentSuccessData | null>(() => {
    const stored = sessionStorage.getItem('lastOrder');
    if (!stored) return null;
    return JSON.parse(stored);
  });

  useEffect(() => {
    if (data) {
      // Refetch MyOrders secara type-safe
      queryClient.invalidateQueries({ queryKey: ['myOrders'] });

      // Redirect otomatis ke MyOrdersPage
      const timer = setTimeout(() => navigate('/my-orders'), 1000);
      return () => clearTimeout(timer);
    }
  }, [data, queryClient, navigate]);

  if (!data) {
    navigate('/');
    return null;
  }

  return (
    <div className='min-h-[70vh] flex items-center justify-center px-4'>
      <div className='w-full max-w-md bg-white rounded-xl shadow-card p-6 text-center'>
        <CheckCircle className='mx-auto text-green-600' size={56} />
        <h2 className='text-xl font-semibold mt-4'>Payment Success</h2>
        <p className='text-sm text-gray-500 mb-6'>
          Your payment has been successfully processed
        </p>

        <div className='text-sm space-y-2 mb-6 text-left'>
          <div className='flex justify-between'>
            <span>Date</span>
            <span>{data.date}</span>
          </div>
          <div className='flex justify-between'>
            <span>Payment Method</span>
            <span>{data.paymentMethod}</span>
          </div>
          <div className='flex justify-between'>
            <span>Price</span>
            <span>Rp {data.subtotal.toLocaleString('id-ID')}</span>
          </div>
          <div className='flex justify-between'>
            <span>Delivery Fee</span>
            <span>Rp {data.deliveryFee.toLocaleString('id-ID')}</span>
          </div>
          <div className='flex justify-between'>
            <span>Service Fee</span>
            <span>Rp {data.serviceFee.toLocaleString('id-ID')}</span>
          </div>
          <hr />
          <div className='flex justify-between font-semibold'>
            <span>Total</span>
            <span>Rp {data.total.toLocaleString('id-ID')}</span>
          </div>
        </div>

        <button
          onClick={() => navigate('/my-orders')}
          className='w-full bg-red-600 text-white py-3 rounded-full'
        >
          See My Orders
        </button>
      </div>
    </div>
  );
}
