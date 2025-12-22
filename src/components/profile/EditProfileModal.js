import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import EditProfileForm from './EditProfileForm';
import AvatarUpload from './AvatarUpload';
export default function EditProfileModal({ open, onClose }) {
    if (!open)
        return null;
    return (_jsx("div", { className: 'fixed inset-0 bg-black/40 z-50 flex items-center justify-center', children: _jsxs("div", { className: 'bg-white rounded-xl w-[400px] p-6', children: [_jsxs("div", { className: 'flex justify-between items-center mb-4', children: [_jsx("h3", { className: 'font-semibold text-lg', children: "Edit Profile" }), _jsx("button", { onClick: onClose, children: "\u2715" })] }), _jsx(AvatarUpload, {}), _jsx("div", { className: 'mt-6', children: _jsx(EditProfileForm, { onSuccess: onClose }) })] }) }));
}
