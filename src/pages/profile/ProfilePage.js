import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import EditProfileModal from '@/components/profile/EditProfileModal';
import NavbarAfterWhite from '@/components/NavbarAfterWhite';
import FooterSection from '@/components/FooterSection';
export default function ProfilePage() {
    const { user } = useAuth();
    const [open, setOpen] = useState(false);
    return (_jsxs(_Fragment, { children: [_jsx(NavbarAfterWhite, {}), _jsx("div", { className: 'bg-black container-custom justify-between px-8 py-12', children: _jsxs("main", { className: 'max-w-xl mx-auto p-6 min-h-[calc(100vh-160px)]', children: [_jsxs("div", { className: 'flex items-center gap-4', children: [_jsx("img", { src: user?.avatar || '/image/author.png', className: 'w-20 h-20 rounded-full object-cover' }), _jsxs("div", { children: [_jsx("h2", { className: 'font-semibold text-2xl text-white', children: user?.name }), _jsx("p", { className: 'text-sm text-gray-500', children: user?.email })] })] }), _jsx("button", { onClick: () => setOpen(true), className: 'mt-6 bg-red-500 text-white px-6 py-2 rounded-full', children: "Edit Profile" }), _jsx(EditProfileModal, { open: open, onClose: () => setOpen(false) })] }) }), _jsx(FooterSection, {})] }));
}
