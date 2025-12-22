import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import NavbarAfterWhite from '@/components/NavbarAfterWhite';
import FooterSection from '@/components/FooterSection';
import Sidebar from '@/components/sidebar/Sidebar';
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
const fetchOrders = async () => {
    const token = localStorage.getItem('token');
    const res = await fetch('https://restaurant-be-400174736012.asia-southeast2.run.app/api/order/my-order?page=1&limit=10', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
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
            restaurants: o.restaurants.filter((r) => r.restaurant.name.toLowerCase().includes(search.toLowerCase())),
        }))
            .filter((o) => o.restaurants.length > 0);
    }, [orders, search, status]);
    return (_jsxs(_Fragment, { children: [_jsx(NavbarAfterWhite, {}), _jsxs("div", { className: 'flex flex-col lg:flex-row bg-white min-h-screen pt-6 container-custom', children: [_jsx(Sidebar, {}), _jsxs("main", { className: 'flex-1 px-4 lg:px-6', children: [_jsx("h2", { className: 'text-2xl font-semibold mb-4', children: "My Orders" }), _jsxs("div", { className: 'mb-4 relative w-full lg:w-[636px]', children: [_jsx(Search, { size: 18, className: 'absolute left-4 top-1/2 -translate-y-1/2 text-gray-400' }), _jsx("input", { value: search, onChange: (e) => setSearch(e.target.value), placeholder: 'Search restaurant', className: 'w-full bg-white border rounded-full pl-12 pr-4 py-3 text-sm\r\n                focus:outline-none focus:ring-2 focus:ring-red-500' })] }), _jsx("div", { className: 'flex gap-3 overflow-x-auto mb-6 pb-1', children: STATUS_FILTERS.map((item) => (_jsx("button", { onClick: () => setStatus(item.value), className: `px-5 py-2 rounded-full text-sm whitespace-nowrap border transition
                  ${status === item.value
                                        ? 'bg-[#FFECEC] text-red-700 border-red-400'
                                        : 'bg-white text-gray-700'}`, children: item.label }, item.value))) }), isLoading && _jsx("p", { className: 'text-gray-500', children: "Loading orders..." }), filteredOrders.map((order) => order.restaurants.map((r) => {
                                const canReview = order.status === 'done';
                                const menuIds = Array.from(new Set(r.items.map((i) => i.menuId)));
                                return (_jsxs("div", { className: 'bg-white p-4 rounded-xl mb-4 shadow-sm', children: [_jsxs("div", { className: 'flex items-center gap-3 mb-4', children: [_jsx("img", { src: r.restaurant.logo, onError: (e) => (e.currentTarget.src = '/image/author.png'), className: 'w-10 h-10 rounded-full object-cover' }), _jsx("h3", { className: 'font-semibold', children: r.restaurant.name })] }), r.items.map((item) => (_jsxs("div", { className: 'flex items-center gap-4 mb-3', children: [_jsx("img", { src: item.image || '/placeholder-food.png', className: 'w-16 h-16 rounded-lg object-cover' }), _jsxs("div", { children: [_jsx("p", { className: 'font-medium', children: item.name }), _jsxs("p", { className: 'text-sm text-gray-500', children: [item.quantity, " \u00D7 Rp", ' ', item.price.toLocaleString('id-ID')] })] })] }, item.menuId))), _jsxs("div", { className: 'flex justify-between items-center mt-4', children: [_jsxs("p", { className: 'font-semibold', children: ["Total Rp ", r.subtotal.toLocaleString('id-ID')] }), canReview ? (_jsx("button", { onClick: () => navigate('/review', {
                                                        state: {
                                                            transactionId: order.transactionId,
                                                            restaurantId: r.restaurant.id,
                                                            menuIds,
                                                        },
                                                    }), className: 'bg-red-600 text-white px-6 py-2 rounded-full text-sm w-[240px] h-[48px]', children: "Give Review" })) : (_jsxs("div", { className: 'text-right', children: [_jsx("button", { disabled: true, className: 'bg-gray-300 text-gray-500 px-6 py-2 rounded-full text-sm w-[240px] h-[48px] cursor-not-allowed', children: "Give Review" }), _jsx("p", { className: 'text-xs text-gray-500 mt-1', children: "Available after order completed" })] }))] })] }, `${order.transactionId}-${r.restaurant.id}`));
                            }))] })] }), _jsx(FooterSection, {})] }));
}
