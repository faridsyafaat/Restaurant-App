import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import toast from 'react-hot-toast';
export default function AvatarUpload() {
    const { user, updateProfile } = useAuth();
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const handleChange = async (e) => {
        const file = e.target.files?.[0];
        if (!file)
            return;
        setPreview(URL.createObjectURL(file));
        const formData = new FormData();
        formData.append('avatar', file);
        try {
            setLoading(true);
            await updateProfile(formData);
            toast.success('Avatar updated');
        }
        catch {
            toast.error('Failed update avatar');
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsxs("div", { className: 'flex flex-col items-center gap-3', children: [_jsx("img", { src: preview || user?.avatar || '/image/author.png', className: 'w-24 h-24 rounded-full object-cover' }), _jsxs("label", { className: 'cursor-pointer text-sm text-red-600 font-medium', children: [loading ? 'Uploading...' : 'Change Photo', _jsx("input", { type: 'file', accept: 'image/*', hidden: true, onChange: handleChange })] })] }));
}
