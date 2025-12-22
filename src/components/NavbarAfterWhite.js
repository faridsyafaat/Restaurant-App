'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';
const NavbarAfterWhite = () => {
    const { totalQty } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const handleCartClick = () => {
        if (totalQty > 0) {
            navigate('/mycart'); // ✅ SESUAI AppRouter
        }
        else {
            alert('Belum ada pesanan di keranjang!');
        }
    };
    return (_jsxs("nav", { className: 'sticky top-0 z-50 bg-white shadow-sm px-4 py-3 flex items-center justify-between container-custom mx-auto', children: [_jsx(Link, { to: '/home', className: 'flex items-center gap-4', children: _jsx("img", { src: '/image/logo2.png', alt: 'Logo', className: 'w-[149px] h-[42px] object-contain' }) }), _jsxs("div", { className: 'flex items-center gap-4', children: [_jsxs("div", { className: 'relative cursor-pointer', onClick: handleCartClick, children: [_jsx("img", { src: '/image/bag.png', alt: 'Cart', className: 'w-6 h-6' }), totalQty > 0 && (_jsx("span", { className: 'absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full', children: totalQty }))] }), _jsxs("div", { className: 'flex items-center gap-2 cursor-pointer', children: [_jsx("img", { src: user?.avatar || '/image/author.png', alt: 'User', className: 'w-9 h-9 rounded-full' }), _jsx("span", { className: 'font-medium hidden sm:inline-block text-black', children: user?.name || 'John Doe' })] })] })] }));
};
export default NavbarAfterWhite;
