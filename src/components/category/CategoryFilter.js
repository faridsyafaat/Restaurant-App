import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function CategoryFilter({ filters, onChange }) {
    return (_jsxs("div", { className: 'bg-white rounded-xl shadow p-5 space-y-6', children: [_jsx("h3", { className: 'font-bold text-sm', children: "FILTER" }), _jsx("button", { type: 'button', className: 'text-xs text-blue-500 underline', onClick: () => onChange({
                    ...filters,
                    page: 1,
                }), children: "Reset Page" }), _jsxs("div", { children: [_jsx("p", { className: 'font-semibold text-sm mb-2', children: "Distance" }), ['Nearby', 'Within 1 km', 'Within 3 km', 'Within 5 km'].map((item) => (_jsxs("label", { className: 'flex items-center gap-2 text-sm', children: [_jsx("input", { type: 'checkbox' }), _jsx("span", { children: item })] }, item)))] }), _jsxs("div", { children: [_jsx("p", { className: 'font-semibold text-sm mb-2', children: "Price" }), _jsxs("div", { className: 'flex gap-2', children: [_jsx("input", { type: 'number', placeholder: 'Minimum Price', className: 'border rounded px-2 py-1 text-sm w-full', onChange: (e) => onChange({
                                    ...filters,
                                    priceMin: Number(e.target.value) || undefined,
                                    page: 1,
                                }) }), _jsx("input", { type: 'number', placeholder: 'Maximum Price', className: 'border rounded px-2 py-1 text-sm w-full', onChange: (e) => onChange({
                                    ...filters,
                                    priceMax: Number(e.target.value) || undefined,
                                    page: 1,
                                }) })] })] }), _jsxs("div", { children: [_jsx("p", { className: 'font-semibold text-sm mb-2', children: "Rating" }), [5, 4, 3, 2, 1].map((star) => (_jsxs("label", { className: 'flex items-center gap-2 text-sm', children: [_jsx("input", { type: 'radio', name: 'rating', onChange: () => onChange({
                                    ...filters,
                                    rating: star,
                                    page: 1,
                                }) }), _jsx("span", { children: '⭐'.repeat(star) })] }, star)))] })] }));
}
