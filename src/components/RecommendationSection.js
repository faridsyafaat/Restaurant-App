import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const dummyRestaurants = [
    {
        id: 1,
        name: 'Burger King',
        rating: 4.8,
        distance: '2.4 Km',
        location: 'Jakarta Selatan',
        image: '/image/burger.png',
    },
    {
        id: 2,
        name: 'KFC',
        rating: 4.6,
        distance: '3.1 Km',
        location: 'Jakarta Selatan',
        image: '/image/burger.png',
    },
    {
        id: 3,
        name: "McDonald's",
        rating: 4.7,
        distance: '1.8 Km',
        location: 'Jakarta Selatan',
        image: '/image/burger.png',
    },
];
export default function RecommendationSection() {
    return (_jsxs("section", { className: 'py-10 px-6 max-w-6xl mx-auto', children: [_jsxs("div", { className: 'flex items-center justify-between mb-4', children: [_jsx("h2", { className: 'text-4xl font-bold', children: "Recommended" }), _jsx("button", { className: 'text-[#C12116] text-sm font-extrabold', children: "See All" })] }), _jsx("div", { className: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6', children: dummyRestaurants.map((item) => (_jsxs("div", { className: 'bg-white rounded-2xl p-4 shadow-md flex gap-4 items-center hover:shadow-lg transition cursor-pointer', children: [_jsx("img", { src: item.image, alt: item.name, className: 'w-16 h-16 object-contain' }), _jsxs("div", { className: 'flex flex-col', children: [_jsx("h3", { className: 'font-semibold text-base mb-1', children: item.name }), _jsxs("div", { className: 'flex items-center text-sm text-gray-600 gap-1', children: [_jsx("span", { children: "\u2B50" }), _jsx("span", { children: item.rating })] }), _jsxs("p", { className: 'text-xs text-gray-500 mt-1', children: [item.location, " \u2022 ", item.distance] })] })] }, item.id))) })] }));
}
