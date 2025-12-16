import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

import NavbarAfterWhite from '@/components/NavbarAfterWhite';
import FooterSection from '@/components/FooterSection';
import Sidebar from '@/components/sidebar/Sidebar';

/* ================= TYPES ================= */
interface OrderItem {
  menuId: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface OrderRestaurant {
  restaurant: {
    id: number;
    name: string;
    logo: string;
  };
  items: OrderItem[];
  subtotal: number;
}

export interface OrderTransaction {
  transactionId: string;
  status: string;
  restaurants: OrderRestaurant[];
}

/* ================= STATUS FILTER ================= */
const STATUS_FILTERS = [
  { label: 'Status', value: 'all' },
  { label: 'Preparing', value: 'preparing' },
  { label: 'On The Way', value: 'on_the_way' },
  { label: 'Delivered', value: 'delivered' },
  { label: 'Done', value: 'done' },
  { label: 'Canceled', value: 'canceled' },
];

/* ================= FETCH ================= */
const fetchOrders = async (): Promise<OrderTransaction[]> => {
  const token = localStorage.getItem('token');

  const res = await fetch(
    'https://restaurant-be-400174736012.asia-southeast2.run.app/api/order/my-order?page=1&limit=10',
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const json = await res.json();
  if (!res.ok || !json.success) {
    throw new Error(json.message || 'Failed fetch orders');
  }

  return json.data.orders;
};

/* ================= PAGE ================= */
export default function MyOrdersPage() {
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ['myOrders'],
    queryFn: fetchOrders,
  });

  /* ================= FILTER ================= */
  const filteredOrders = useMemo(() => {
    return orders
      .filter((o) => (status === 'all' ? true : o.status === status))
      .map((o) => ({
        ...o,
        restaurants: o.restaurants.filter((r) =>
          r.restaurant.name.toLowerCase().includes(search.toLowerCase())
        ),
      }))
      .filter((o) => o.restaurants.length > 0);
  }, [orders, search, status]);

  return (
    <>
      <NavbarAfterWhite />

      <div className='flex flex-col lg:flex-row bg-white min-h-screen pt-6 container-custom'>
        <Sidebar />

        <main className='flex-1 px-4 lg:px-6'>
          <h2 className='text-2xl font-semibold mb-4'>My Orders</h2>

          {/* Search */}
          <div className='mb-4 relative w-full lg:w-[636px]'>
            <Search
              size={18}
              className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400'
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder='Search restaurant'
              className='w-full bg-white border rounded-full pl-12 pr-4 py-3 text-sm
                focus:outline-none focus:ring-2 focus:ring-red-500'
            />
          </div>

          {/* Status Filter */}
          <div className='flex gap-3 overflow-x-auto mb-6 pb-1'>
            {STATUS_FILTERS.map((item) => (
              <button
                key={item.value}
                onClick={() => setStatus(item.value)}
                className={`px-5 py-2 rounded-full text-sm whitespace-nowrap border transition
                  ${
                    status === item.value
                      ? 'bg-[#FFECEC] text-red-700 border-red-400'
                      : 'bg-white text-gray-700'
                  }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {isLoading && <p className='text-gray-500'>Loading orders...</p>}

          {/* Orders */}
          {filteredOrders.map((order) =>
            order.restaurants.map((r) => {
              const canReview = order.status === 'done';
              const menuIds = Array.from(new Set(r.items.map((i) => i.menuId)));

              return (
                <div
                  key={`${order.transactionId}-${r.restaurant.id}`}
                  className='bg-white p-4 rounded-xl mb-4 shadow-sm'
                >
                  {/* Restaurant */}
                  <div className='flex items-center gap-3 mb-4'>
                    <img
                      src={r.restaurant.logo}
                      onError={(e) =>
                        (e.currentTarget.src = '/image/author.png')
                      }
                      className='w-10 h-10 rounded-full object-cover'
                    />
                    <h3 className='font-semibold'>{r.restaurant.name}</h3>
                  </div>

                  {/* Items */}
                  {r.items.map((item) => (
                    <div
                      key={item.menuId}
                      className='flex items-center gap-4 mb-3'
                    >
                      <img
                        src={item.image || '/placeholder-food.png'}
                        className='w-16 h-16 rounded-lg object-cover'
                      />
                      <div>
                        <p className='font-medium'>{item.name}</p>
                        <p className='text-sm text-gray-500'>
                          {item.quantity} × Rp{' '}
                          {item.price.toLocaleString('id-ID')}
                        </p>
                      </div>
                    </div>
                  ))}

                  {/* Footer */}
                  <div className='flex justify-between items-center mt-4'>
                    <p className='font-semibold'>
                      Total Rp {r.subtotal.toLocaleString('id-ID')}
                    </p>

                    {canReview ? (
                      <button
                        onClick={() =>
                          navigate('/review', {
                            state: {
                              transactionId: order.transactionId,
                              restaurantId: r.restaurant.id,
                              menuIds,
                            },
                          })
                        }
                        className='bg-red-600 text-white px-6 py-2 rounded-full text-sm w-[240px] h-[48px]'
                      >
                        Give Review
                      </button>
                    ) : (
                      <div className='text-right'>
                        <button
                          disabled
                          className='bg-gray-300 text-gray-500 px-6 py-2 rounded-full text-sm w-[240px] h-[48px] cursor-not-allowed'
                        >
                          Give Review
                        </button>
                        <p className='text-xs text-gray-500 mt-1'>
                          Available after order completed
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </main>
      </div>

      <FooterSection />
    </>
  );
}
