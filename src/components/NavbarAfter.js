import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useCart } from '@/hooks/useCart';
const NavbarAfter = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { totalQty } = useCart();
    const handleCartClick = () => {
        if (totalQty > 0) {
            navigate('/mycart');
        }
        else {
            alert('Belum ada pesanan di keranjang!');
        }
    };
    return (_jsx("nav", { className: 'sticky top-0 z-50 bg-black shadow-sm px-4 py-3', children: _jsxs("div", { className: 'container mx-auto flex items-center justify-between', children: [_jsx(Link, { to: '/home', className: 'flex items-center gap-4', children: _jsx("img", { src: '/image/logo.png', alt: 'Logo', className: 'w-[149px] h-[42px] object-contain' }) }), _jsxs("div", { className: 'flex items-center gap-4', children: [_jsxs("div", { className: 'relative cursor-pointer', onClick: handleCartClick, children: [_jsx("img", { src: '/image/bag2.png', alt: 'Cart', className: 'w-6 h-6' }), totalQty > 0 && (_jsx("span", { className: 'absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full', children: totalQty }))] }), _jsxs("div", { className: 'flex items-center gap-2', children: [_jsx("img", { src: user?.photo || '/image/author.png', alt: 'User', className: 'w-9 h-9 rounded-full' }), _jsx("span", { className: 'font-medium hidden sm:inline-block text-white', children: user?.name || user?.email || 'User' })] })] })] }) }));
};
export default NavbarAfter;
