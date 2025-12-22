import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const categories = [
    { id: 1, label: 'All', image: '/image/all.png' },
    { id: 2, label: 'Nearby', image: '/image/nearby.png' },
    { id: 3, label: 'Discount', image: '/image/discount.png' },
    { id: 4, label: 'Best Seller', image: '/image/best.png' },
    { id: 5, label: 'Deli', image: '/image/deli.png' },
    { id: 6, label: 'Lunch', image: '/image/lunch.png' },
];
export default function CategorySection() {
    return (_jsx("div", { className: 'w-full flex justify-center mt-10', children: _jsx("div", { className: 'grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-8', children: categories.map((cat) => (_jsxs("div", { className: 'w-[161px] h-[138px] bg-white rounded-xl shadow-md \r\n                       flex flex-col items-center justify-center', children: [_jsx("img", { src: cat.image, alt: cat.label, className: 'h-[100px] object-contain' }), _jsx("p", { className: 'mt-2 font-bold text-gray-700', children: cat.label })] }, cat.id))) }) }));
}
