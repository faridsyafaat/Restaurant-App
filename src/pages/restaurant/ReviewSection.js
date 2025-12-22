import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Star } from 'lucide-react';
/* ============================
   REVIEW SECTION
=============================== */
export default function ReviewSection({ reviews }) {
    /* Dummy Review */
    const dummy = [
        {
            id: 1,
            username: 'Michael Brown',
            comment: 'What a fantastic place! The food was delicious, and the ambiance was delightful. A must-visit for anyone looking for a great time!',
            rating: 5,
            date: '12 Desember 2025 13.20',
            avatar: '/image/author.png',
        },
        {
            id: 2,
            username: 'Sarah Davis',
            comment: 'I can’t say enough good things! The service was exceptional and the menu had great options.',
            rating: 5,
            date: '12 Desember 2025 13.20',
            avatar: '/image/author.png',
        },
    ];
    /* Mapping API → Frontend Review */
    const mapReviewFromAPI = (rev) => ({
        id: rev.id,
        username: rev.user?.name ?? 'Anonymous',
        comment: rev.comment ?? '',
        rating: rev.star ?? 0,
        date: rev.createdAt
            ? new Date(rev.createdAt).toLocaleString('id-ID', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
            })
            : '-',
        avatar: '/image/author.png',
    });
    /* Combine API Review + Dummy */
    const list = [
        ...(Array.isArray(reviews) ? reviews.map(mapReviewFromAPI) : []),
        ...dummy,
    ];
    return (_jsxs("div", { className: 'px-4 mt-10 container-custom', children: [_jsxs("div", { className: 'flex flex-col items-start gap-1 mb-4', children: [_jsx("h2", { className: 'text-2xl font-bold', children: "Review" }), _jsxs("div", { className: 'flex items-center gap-1 text-yellow-600', children: [_jsx(Star, { size: 18, fill: 'gold' }), _jsx("span", { className: 'font-semibold text-base', children: "4.9" }), _jsx("span", { className: 'text-gray-500 text-sm', children: "(24 Ulasan)" })] })] }), _jsx("div", { className: 'grid grid-cols-1 md:grid-cols-2 gap-4', children: list.map((rev) => (_jsxs("div", { className: 'bg-white p-4 rounded-xl shadow-sm border flex flex-col gap-3', children: [_jsxs("div", { className: 'flex items-center gap-3', children: [_jsx("img", { src: rev.avatar, alt: rev.username, className: 'w-12 h-12 rounded-full object-cover' }), _jsxs("div", { children: [_jsx("p", { className: 'font-semibold', children: rev.username }), _jsx("p", { className: 'text-xs text-gray-500 mt-1', children: rev.date })] })] }), _jsx("div", { className: 'flex items-center gap-1 text-yellow-600', children: Array.from({ length: Math.max(0, rev.rating) }).map((_, i) => (_jsx(Star, { size: 14, fill: 'gold' }, i))) }), _jsx("p", { className: 'text-gray-700 text-sm leading-relaxed text-left', children: rev.comment })] }, rev.id))) }), _jsx("div", { className: 'flex justify-center mt-6', children: _jsx("button", { className: 'px-5 py-2 bg-gray-200 hover:bg-gray-300 rounded-full text-sm', children: "Show More" }) })] }));
}
