import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavbarAfterWhite from '@/components/NavbarAfterWhite';
import FooterSection from '@/components/FooterSection';
import ImageGrid from './ImageGrid';
import DetailSection from './DetailSection';
import MenuSection from './MenuSection';
import ReviewSection from './ReviewSection';
import { useCart } from '@/hooks/useCart';
export default function RestaurantDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [restaurant, setRestaurant] = useState(null);
    const [loading, setLoading] = useState(true);
    const { cart } = useCart();
    // ===============================
    // FETCH DETAIL RESTAURANT
    // ===============================
    useEffect(() => {
        if (!id)
            return;
        const fetchDetail = async () => {
            try {
                const res = await fetch(`https://restaurant-be-400174736012.asia-southeast2.run.app/api/resto/${id}?limitMenu=10&limitReview=6`);
                const json = await res.json();
                if (json.success) {
                    setRestaurant(json.data);
                }
            }
            catch (error) {
                console.error(error);
            }
            finally {
                setLoading(false);
            }
        };
        fetchDetail();
    }, [id]);
    if (loading) {
        return _jsx("div", { className: 'text-center mt-20', children: "Loading..." });
    }
    if (!restaurant) {
        return _jsx("div", { className: 'text-center mt-20', children: "Restaurant tidak ditemukan" });
    }
    // ===============================
    // CART PER RESTAURANT
    // ===============================
    const restaurantId = Number(restaurant.id);
    const restaurantCart = cart.restaurants.find((r) => r.restaurantId === restaurantId);
    const cartItems = restaurantCart?.items ?? [];
    const totalQty = cartItems.reduce((acc, item) => acc + item.qty, 0);
    const totalPrice = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);
    // ===============================
    // CHECKOUT
    // ===============================
    const handleCheckout = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Silakan login terlebih dahulu');
            return;
        }
        if (cartItems.length === 0)
            return;
        try {
            const res = await fetch('https://restaurant-be-400174736012.asia-southeast2.run.app/api/cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    restaurantId,
                    items: cartItems.map((item) => ({
                        menuId: item.id,
                        qty: item.qty,
                    })),
                }),
            });
            const json = await res.json();
            if (res.ok && json.success) {
                navigate('/mycart');
            }
        }
        catch (error) {
            console.error(error);
        }
    };
    return (_jsxs(_Fragment, { children: [_jsx(NavbarAfterWhite, {}), _jsxs("div", { className: 'pb-28', children: [_jsx(ImageGrid, { images: restaurant.images }), _jsx(DetailSection, { restaurant: restaurant }), _jsx(MenuSection, { menus: restaurant.menus, restaurantName: restaurant.name, restaurantLogo: restaurant.logo }), _jsx(ReviewSection, { reviews: restaurant.reviews })] }), cartItems.length > 0 && (_jsx("div", { className: 'fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4 z-50', children: _jsxs("div", { className: 'max-w-6xl mx-auto flex items-center justify-between', children: [_jsxs("div", { children: [_jsxs("div", { className: 'flex items-center gap-2', children: [_jsx("img", { src: '/image/bag.png', alt: 'cart', className: 'w-6 h-6' }), _jsxs("span", { className: 'font-semibold', children: [totalQty, " item"] })] }), _jsxs("div", { className: 'font-bold mt-1', children: ["Rp ", totalPrice.toLocaleString('id-ID')] })] }), _jsx("button", { onClick: handleCheckout, className: 'bg-[#C12116] text-white px-8 h-[44px] rounded-full font-semibold', children: "Checkout" })] }) })), _jsx(FooterSection, {})] }));
}
