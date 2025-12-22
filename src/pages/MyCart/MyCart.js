import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from 'react-router-dom';
import NavbarAfterWhite from '@/components/NavbarAfterWhite';
import FooterSection from '@/components/FooterSection';
import CartCard from '@/components/CartCard';
import { useCart } from '@/hooks/useCart';
export default function MyCart() {
    const { cart, increase, decrease } = useCart();
    const navigate = useNavigate();
    if (cart.restaurants.length === 0) {
        return (_jsxs(_Fragment, { children: [_jsx(NavbarAfterWhite, {}), _jsx("p", { className: 'text-center mt-20', children: "Keranjang masih kosong" }), _jsx(FooterSection, {})] }));
    }
    return (_jsxs(_Fragment, { children: [_jsx(NavbarAfterWhite, {}), _jsxs("div", { className: 'max-w-4xl mx-auto px-4 py-6 space-y-8 pb-32', children: [_jsx("h2", { className: 'font-bold text-3xl', children: "My Cart" }), cart.restaurants.map((restaurant) => {
                        const totalPrice = restaurant.items.reduce((acc, item) => acc + item.price * item.qty, 0);
                        return (_jsxs("div", { className: 'border rounded-xl p-4 bg-white', children: [_jsxs("div", { className: 'flex items-center gap-3 mb-4', children: [_jsx("img", { src: restaurant.restaurantLogo ||
                                                '/image/restaurant-placeholder.png', alt: restaurant.restaurantName, className: 'w-10 h-10 rounded-full object-cover border' }), _jsx("p", { className: 'font-bold', children: restaurant.restaurantName })] }), _jsx("div", { className: 'space-y-3', children: restaurant.items.map((item) => (_jsx(CartCard, { item: item, onIncrease: () => increase(restaurant.restaurantId, item.id), onDecrease: () => decrease(restaurant.restaurantId, item.id) }, item.id))) }), _jsxs("div", { className: 'flex justify-between items-center mt-4 border-t pt-4', children: [_jsxs("span", { className: 'font-bold', children: ["Rp ", totalPrice.toLocaleString('id-ID')] }), _jsx("button", { disabled: restaurant.items.length === 0, onClick: () => navigate('/checkout'), className: 'bg-[#C12116] text-white px-6 py-2 rounded-full font-semibold', children: "Checkout" })] })] }, restaurant.restaurantId));
                    })] }), _jsx(FooterSection, {})] }));
}
