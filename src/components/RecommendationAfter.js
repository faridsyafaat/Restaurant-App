import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ApiContext } from '@/context/ApiContext';
import { AuthContext } from '@/context/AuthContext';
/* ================= FETCHERS ================= */
const fetchRecommendations = async (baseUrl, token) => {
    const res = await fetch(`${baseUrl}/api/resto/recommended`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (!res.ok) {
        throw new Error('Failed to fetch recommendations');
    }
    const json = await res.json();
    return json.data.recommendations;
};
const fetchRestaurantDetail = async (baseUrl, token, id) => {
    const res = await fetch(`${baseUrl}/api/resto/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (!res.ok) {
        throw new Error('Failed to fetch restaurant detail');
    }
    return res.json();
};
/* ================= COMPONENT ================= */
export default function RecommendationAfter() {
    const { apiBaseUrl } = useContext(ApiContext);
    const auth = useContext(AuthContext);
    const queryClient = useQueryClient();
    const token = auth?.token;
    const { data, isLoading, isError } = useQuery({
        queryKey: ['recommendations'],
        queryFn: () => fetchRecommendations(apiBaseUrl, token),
        enabled: !!token,
    });
    if (!token)
        return null;
    return (_jsxs("section", { className: 'py-6 px-4 max-w-6xl mx-auto', children: [_jsxs("div", { className: 'flex items-center justify-between mb-4', children: [_jsx("h2", { className: 'text-xl font-bold', children: "Recommended" }), _jsx("button", { className: 'text-primary text-sm font-semibold', children: "See All" })] }), isLoading && _jsx("p", { className: 'text-center text-gray-400', children: "Loading..." }), isError && (_jsx("p", { className: 'text-center text-red-500', children: "Failed to load recommendations" })), data && (_jsx("div", { className: '\r\n            grid\r\n            grid-cols-1\r\n            md:grid-cols-3\r\n            gap-4\r\n          ', children: data.map((item) => (_jsxs(Link, { to: `/restaurant/${item.id}`, onMouseEnter: () => queryClient.prefetchQuery({
                        queryKey: ['restaurant-detail', item.id],
                        queryFn: () => fetchRestaurantDetail(apiBaseUrl, token, item.id),
                    }), className: '\r\n                flex items-center gap-4\r\n                bg-white rounded-xl p-4\r\n                shadow-sm hover:shadow-md\r\n                transition\r\n                cursor-pointer\r\n              ', children: [_jsx("img", { src: item.logo, alt: item.name, className: 'w-14 h-14 rounded-xl object-contain bg-gray-100' }), _jsxs("div", { children: [_jsx("h3", { className: 'font-semibold text-sm', children: item.name }), _jsxs("div", { className: 'flex items-center text-xs text-gray-600 gap-1', children: ["\u2B50 ", item.star] }), _jsx("p", { className: 'text-xs text-gray-500', children: item.place })] })] }, item.id))) }))] }));
}
