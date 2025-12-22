import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function RestaurantCard({ restaurant }) {
    return (_jsxs("div", { className: 'bg-white rounded-xl shadow p-4 flex gap-4', children: [_jsx("img", { src: restaurant.logo, alt: restaurant.name, className: 'w-16 h-16 object-contain' }), _jsxs("div", { children: [_jsx("h3", { className: 'font-bold', children: restaurant.name }), _jsxs("p", { className: 'text-sm text-gray-500', children: ["\u2B50 ", restaurant.star, " \u2022 ", restaurant.place] }), _jsxs("p", { className: 'text-xs text-gray-400', children: ["Rp ", restaurant.priceRange.min.toLocaleString(), " \u2013", ' ', restaurant.priceRange.max.toLocaleString()] })] })] }));
}
