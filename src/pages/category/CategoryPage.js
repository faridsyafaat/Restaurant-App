import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import NavbarAfterWhite from '@/components/NavbarAfterWhite';
import FooterSection from '@/components/FooterSection';
import CategoryFilter from '@/components/category/CategoryFilter';
import RestaurantCard from '@/components/restaurant/RestaurantCard';
import { getRestaurants } from '@/services/resto';
export default function CategoryPage() {
    const { slug } = useParams();
    const navigate = useNavigate();
    /* ======================
       FILTER STATE
    ====================== */
    const [filters, setFilters] = useState({
        page: 1,
        limit: 10,
        location: 'Jakarta',
        range: 1,
        priceMin: 15000,
        priceMax: 100000,
        rating: 1,
    });
    /* ======================
       MOBILE FILTER STATE
    ====================== */
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    useEffect(() => {
        document.body.style.overflow = isFilterOpen ? 'hidden' : 'auto';
    }, [isFilterOpen]);
    /* ======================
       DUMMY DATA (4 dummy restaurant)
    ====================== */
    const dummyRestaurants = [
        {
            id: 1,
            name: 'Burger King 1 - Dummy',
            star: 4,
            place: 'Jakarta',
            logo: '/image/burger.png',
            images: ['/image/burger.png'],
            category: 'Pizza',
            reviewCount: 0,
            menuCount: 0,
            priceRange: { min: 10000, max: 50000 },
        },
        {
            id: 2,
            name: 'Burger King 2 - Dummy',
            star: 4,
            place: 'Jakarta',
            logo: '/image/burger.png',
            images: ['/image/burger.png'],
            category: 'Burger',
            reviewCount: 0,
            menuCount: 0,
            priceRange: { min: 10000, max: 50000 },
        },
        {
            id: 3,
            name: 'Burger King 3 - Dummy',
            star: 4,
            place: 'Jakarta',
            logo: '/image/burger.png',
            images: ['/image/burger.png'],
            category: 'Dessert',
            reviewCount: 0,
            menuCount: 0,
            priceRange: { min: 10000, max: 50000 },
        },
        {
            id: 4,
            name: 'Burger King 3 - Dummy',
            star: 4,
            place: 'Jakarta',
            logo: '/image/burger.png',
            images: ['/image/burger.png'],
            category: 'Coffee',
            reviewCount: 0,
            menuCount: 0,
            priceRange: { min: 10000, max: 50000 },
        },
    ];
    /* ======================
       FETCH DATA DARI API
    ====================== */
    const { data, isLoading, isError } = useQuery({
        queryKey: ['category-restaurants', slug, filters],
        queryFn: () => getRestaurants({
            ...filters,
            category: slug === 'all' ? undefined : slug,
        }),
    });
    /* ======================
       DATA YANG AKAN DITAMPILKAN
    ====================== */
    const restaurantsToShow = !isLoading && !isError && (data?.restaurants.length ?? 0) > 0
        ? data.restaurants
        : dummyRestaurants;
    return (_jsxs(_Fragment, { children: [_jsx(NavbarAfterWhite, {}), isFilterOpen && (_jsxs("div", { className: 'fixed inset-0 z-50 bg-white overflow-y-auto lg:hidden', children: [_jsxs("div", { className: 'flex items-center justify-between px-4 py-4 border-b', children: [_jsx("h2", { className: 'font-bold text-lg', children: "Filter" }), _jsx("button", { onClick: () => setIsFilterOpen(false), className: 'text-xl', children: "\u2715" })] }), _jsx("div", { className: 'p-4', children: _jsx(CategoryFilter, { filters: filters, onChange: (newFilters) => {
                                setFilters(newFilters);
                                setIsFilterOpen(false);
                            } }) })] })), _jsxs("main", { className: 'max-w-[1200px] mx-auto px-4 py-8', children: [_jsx("h1", { className: 'text-2xl font-bold mb-4', children: slug ? `Category: ${slug}` : 'All Restaurants' }), _jsxs("div", { className: 'flex items-center justify-between mb-6 lg:hidden', children: [_jsx("span", { className: 'font-semibold text-sm', children: "Filter" }), _jsx("button", { onClick: () => setIsFilterOpen(true), className: 'p-2 border rounded-lg', children: "\u2630" })] }), _jsxs("div", { className: 'flex gap-8', children: [_jsx("aside", { className: 'w-[280px] hidden lg:block', children: _jsx(CategoryFilter, { filters: filters, onChange: setFilters }) }), _jsxs("section", { className: 'flex-1', children: [isLoading && _jsx("p", { children: "Loading..." }), isError && (_jsx("p", { className: 'text-red-500', children: "Failed to fetch data. Showing dummy restaurants." })), _jsx("div", { className: 'grid grid-cols-1 lg:grid-cols-2 gap-6', children: restaurantsToShow.map((resto) => (_jsx("div", { className: 'cursor-pointer', onClick: () => navigate(`/restaurant/${resto.id}`), children: _jsx(RestaurantCard, { restaurant: resto }) }, resto.id))) })] })] })] }), _jsx(FooterSection, {})] }));
}
