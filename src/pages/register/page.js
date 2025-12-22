import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Eye, EyeOff } from 'lucide-react';
import axios from 'axios';
export default function RegisterPage() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
    });
    const [showPass, setShowPass] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [loading, setLoading] = useState(false);
    const handleRegister = async (e) => {
        e.preventDefault();
        setErrorMsg('');
        if (form.password !== form.confirmPassword) {
            setErrorMsg('Password dan Confirm Password tidak sama');
            return;
        }
        setLoading(true);
        try {
            const res = await axios.post('https://restaurant-be-400174736012.asia-southeast2.run.app/api/auth/register', {
                name: form.name,
                email: form.email,
                phone: form.phone,
                password: form.password,
            });
            if (res.data.success) {
                alert('Register sukses! Silahkan login.');
                navigate('/login');
            }
            else {
                setErrorMsg(res.data.message || 'Register gagal');
            }
        }
        catch {
            setErrorMsg('Terjadi kesalahan saat register');
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsxs("div", { className: 'min-h-screen flex flex-col md:flex-row bg-white', children: [_jsx("div", { className: 'hidden md:block md:w-1/2', children: _jsx("img", { src: '/image/food-bg.png', alt: 'Food Background', className: 'w-full h-full object-cover' }) }), _jsx("div", { className: 'flex items-center justify-center md:w-1/2 p-6', children: _jsxs("div", { className: 'w-full max-w-md', children: [_jsx("div", { className: 'flex items-center gap-2 mb-6', children: _jsx("img", { src: '/image/logo2.png', alt: 'logo', className: 'w-[149px] h-[42px]' }) }), _jsx("h2", { className: 'text-3xl font-bold mb-2', children: "Welcome Back" }), _jsx("p", { className: 'text-gray-500 mb-6', children: "Good to see you again! Let\u2019s eat" }), _jsxs("div", { className: 'flex border rounded-full overflow-hidden mb-6', children: [_jsx("button", { className: 'w-1/2 py-2 font-semibold bg-gray-200', onClick: () => navigate('/login'), children: "Sign In" }), _jsx("button", { type: 'button', className: 'w-1/2 py-2 font-semibold bg-primary text-white', children: "Sign Up" })] }), _jsxs("form", { onSubmit: handleRegister, className: 'space-y-4', children: [_jsx("input", { className: 'border rounded-xl px-4 py-2 w-full', placeholder: 'Name', value: form.name, onChange: (e) => setForm({ ...form, name: e.target.value }), required: true }), _jsx("input", { className: 'border rounded-xl px-4 py-2 w-full', placeholder: 'Email', value: form.email, onChange: (e) => setForm({ ...form, email: e.target.value }), required: true }), _jsx("input", { className: 'border rounded-xl px-4 py-2 w-full', placeholder: 'Phone', value: form.phone, onChange: (e) => setForm({ ...form, phone: e.target.value }), required: true }), _jsxs("div", { className: 'relative', children: [_jsx("input", { type: showPass ? 'text' : 'password', className: 'border rounded-xl px-4 py-2 w-full', placeholder: 'Password', value: form.password, onChange: (e) => setForm({ ...form, password: e.target.value }), required: true }), _jsx("button", { type: 'button', onClick: () => setShowPass(!showPass), className: 'absolute right-3 top-2.5 text-gray-500', children: showPass ? _jsx(Eye, { size: 20 }) : _jsx(EyeOff, { size: 20 }) })] }), _jsxs("div", { className: 'relative', children: [_jsx("input", { type: showConfirm ? 'text' : 'password', className: 'border rounded-xl px-4 py-2 w-full', placeholder: 'Confirm Password', value: form.confirmPassword, onChange: (e) => setForm({ ...form, confirmPassword: e.target.value }), required: true }), _jsx("button", { type: 'button', onClick: () => setShowConfirm(!showConfirm), className: 'absolute right-3 top-2.5 text-gray-500', children: showConfirm ? _jsx(Eye, { size: 20 }) : _jsx(EyeOff, { size: 20 }) })] }), errorMsg && _jsx("p", { className: 'text-red-500 text-sm', children: errorMsg }), _jsx(Button, { type: 'submit', className: 'w-full mt-4 bg-primary text-white', children: loading ? 'Loading...' : 'Register' })] })] }) })] }));
}
