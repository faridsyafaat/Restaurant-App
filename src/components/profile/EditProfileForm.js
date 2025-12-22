import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import toast from 'react-hot-toast';
export default function EditProfileForm({ onSuccess }) {
    const { user, updateProfile } = useAuth();
    const [name, setName] = useState(user?.name || '');
    const [phone, setPhone] = useState(user?.phone || '');
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await updateProfile({ name, phone });
            toast.success('Profile updated');
            onSuccess();
        }
        catch {
            toast.error('Failed update profile');
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsxs("form", { onSubmit: handleSubmit, className: 'space-y-4', children: [_jsxs("div", { children: [_jsx("label", { className: 'text-sm', children: "Name" }), _jsx("input", { value: name, onChange: (e) => setName(e.target.value), className: 'w-full border rounded-lg px-3 py-2' })] }), _jsxs("div", { children: [_jsx("label", { className: 'text-sm', children: "Phone" }), _jsx("input", { value: phone, onChange: (e) => setPhone(e.target.value), className: 'w-full border rounded-lg px-3 py-2' })] }), _jsx("button", { disabled: loading, className: 'w-full bg-red-600 text-white py-2 rounded-full', children: loading ? 'Saving...' : 'Save Changes' })] }));
}
