import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
const categories = [
    { id: 1, label: 'All Restaurant', slug: 'all', image: '/image/all.png' },
    { id: 2, label: 'Nearby', slug: 'nearby', image: '/image/nearby.png' },
    { id: 3, label: 'Discount', slug: 'discount', image: '/image/discount.png' },
    {
        id: 4,
        label: 'Best Seller',
        slug: 'best-seller',
        image: '/image/best.png',
    },
    { id: 5, label: 'Deli', slug: 'deli', image: '/image/deli.png' },
    { id: 6, label: 'Lunch', slug: 'lunch', image: '/image/lunch.png' },
];
export default function CategorySection() {
    return (_jsx("div", { className: 'w-full flex justify-center mt-10', children: _jsx("div", { className: 'grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-8', children: categories.map((cat) => (_jsxs(Link, { to: `/category/${cat.slug}`, className: 'w-[161px] h-[138px] bg-white rounded-xl shadow-md\r\n                       flex flex-col items-center justify-center\r\n                       hover:shadow-lg hover:scale-105 active:scale-95\r\n                       transition cursor-pointer', children: [_jsx("img", { src: cat.image, alt: cat.label, className: 'h-[90px] object-contain' }), _jsx("p", { className: 'mt-2 font-bold text-gray-700 text-sm', children: cat.label })] }, cat.id))) }) }));
}
