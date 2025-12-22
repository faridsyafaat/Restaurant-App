import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import EditProfileModal from '@/components/profile/EditProfileModal';
import { useNavigate } from 'react-router-dom';
import NavbarAfterWhite from '@/components/NavbarAfterWhite';
import FooterSection from '@/components/FooterSection';
export default function EditProfilePage() {
    const navigate = useNavigate();
    return (_jsxs(_Fragment, { children: [_jsx(NavbarAfterWhite, {}), _jsx("main", { className: 'min-h-[calc(100vh-160px)]', children: _jsx(EditProfileModal, { open: true, onClose: () => navigate(-1) }) }), _jsx(FooterSection, {})] }));
}
