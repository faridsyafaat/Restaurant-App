import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { MapPin, Star } from 'lucide-react';
export default function DetailSection({ restaurant, }) {
    return (_jsxs("div", { className: 'px-4 mt-6 container-custom', children: [_jsx("h1", { className: 'text-3xl font-bold', children: restaurant.name }), _jsxs("div", { className: 'flex items-center gap-4 mt-2 text-gray-700', children: [_jsxs("span", { className: 'flex items-center gap-1', children: [_jsx(Star, { className: 'text-yellow-500', size: 20 }), restaurant.star] }), _jsxs("span", { className: 'flex items-center gap-1', children: [_jsx(MapPin, { size: 20 }), restaurant.place] })] }), _jsx("p", { className: 'mt-2 text-gray-500', children: restaurant.category })] }));
}
