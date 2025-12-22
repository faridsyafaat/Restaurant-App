import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { NavLink, useNavigate } from 'react-router-dom';
import { ClipboardList, User, MapPin, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
const SIDEBAR_ITEMS = [
    { label: 'My Orders', icon: ClipboardList, path: '/my-orders' },
    { label: 'Profile', icon: User, path: '/profile' },
    { label: 'Address', icon: MapPin, path: '/address' },
];
export default function Sidebar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const avatar = user?.avatar && user.avatar !== '' ? user.avatar : '/image/author.png';
    const handleLogout = () => {
        logout();
        navigate('/login');
    };
    return (_jsxs(_Fragment, { children: [_jsxs("div", { className: 'lg:hidden sticky top-[64px] z-30 bg-white border-b', children: [_jsxs("div", { className: 'flex items-center gap-3 px-4 py-3', children: [_jsx("img", { src: avatar, alt: user?.name || 'User', className: 'w-10 h-10 rounded-full object-cover', onError: (e) => {
                                    e.currentTarget.src = '/image/author.png';
                                } }), _jsx("p", { className: 'font-semibold text-sm', children: user?.name || 'Guest' })] }), _jsx("div", { className: 'flex gap-3 px-4 pb-3 overflow-x-auto scrollbar-hide', children: SIDEBAR_ITEMS.map((item) => (_jsxs(NavLink, { to: item.path, className: ({ isActive }) => `flex items-center gap-2 px-4 py-2 rounded-full text-sm whitespace-nowrap border
                ${isActive
                                ? 'bg-red-600 text-white border-red-600'
                                : 'bg-white text-gray-700'}`, children: [_jsx(item.icon, { size: 16 }), item.label] }, item.path))) })] }), _jsxs("aside", { className: 'hidden lg:block w-64 bg-white border-r sticky top-[88px] h-[calc(100vh-88px)] p-6', children: [_jsxs("div", { className: 'flex items-center gap-3 mb-8', children: [_jsx("img", { src: avatar, alt: user?.name || 'User', className: 'w-12 h-12 rounded-full object-cover', onError: (e) => {
                                    e.currentTarget.src = '/image/author.png';
                                } }), _jsxs("div", { children: [_jsx("p", { className: 'text-sm text-gray-500', children: "Hello," }), _jsx("p", { className: 'font-semibold', children: user?.name || 'Guest' })] })] }), _jsxs("nav", { className: 'space-y-3', children: [SIDEBAR_ITEMS.map((item) => (_jsxs(NavLink, { to: item.path, className: ({ isActive }) => `flex items-center gap-3 px-4 py-2 rounded-lg transition
                ${isActive
                                    ? 'bg-red-50 text-red-600 font-medium'
                                    : 'text-gray-700 hover:bg-gray-100'}`, children: [_jsx(item.icon, { size: 18 }), item.label] }, item.path))), _jsxs("button", { onClick: handleLogout, className: 'flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg w-full mt-6', children: [_jsx(LogOut, { size: 18 }), "Logout"] })] })] })] }));
}
