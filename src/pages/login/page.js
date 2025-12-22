import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import axios from 'axios';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';
export default function LoginPage() {
    const navigate = useNavigate();
    const { login } = useAuth(); // login(token, user)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPass, setShowPass] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg('');
        try {
            const res = await axios.post('https://restaurant-be-400174736012.asia-southeast2.run.app/api/auth/login', { email, password });
            if (res.data.success) {
                const { token, user } = res.data.data;
                // ✅ FIX UTAMA — SESUAI AuthContext
                login(token, user);
                navigate('/home');
            }
            else {
                setErrorMsg(res.data.message || 'Invalid email or password');
            }
        }
        catch (err) {
            if (axios.isAxiosError(err)) {
                setErrorMsg(err.response?.data?.message || 'Login failed');
            }
            else if (err instanceof Error) {
                setErrorMsg(err.message || 'Login failed');
            }
            else {
                setErrorMsg('Login failed');
            }
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsxs("div", { className: 'min-h-screen w-full flex flex-col md:flex-row bg-white', children: [_jsx("div", { className: 'hidden md:block md:w-1/2', children: _jsx("img", { src: '/image/food-bg.png', alt: 'food background', className: 'w-full h-full object-cover' }) }), _jsx("div", { className: 'flex items-center justify-center md:w-1/2 p-6', children: _jsxs("div", { className: 'w-full max-w-md', children: [_jsx("div", { className: 'flex items-center gap-2 mb-6', children: _jsx("img", { src: '/image/logo2.png', alt: 'logo', className: 'w-[149px] h-[42px]' }) }), _jsx("h2", { className: 'text-3xl font-bold mb-2', children: "Welcome Back" }), _jsx("p", { className: 'text-gray-500 mb-6', children: "Good to see you again! Let\u2019s eat" }), _jsxs("div", { className: 'flex border rounded-full overflow-hidden mb-6', children: [_jsx("button", { type: 'button', className: 'w-1/2 py-2 font-semibold bg-primary text-white', children: "Sign in" }), _jsx("button", { type: 'button', className: 'w-1/2 py-2 font-semibold bg-gray-200', onClick: () => navigate('/register'), children: "Sign up" })] }), _jsxs("form", { onSubmit: handleLogin, className: 'space-y-4', children: [_jsxs("div", { className: 'flex flex-col gap-1', children: [_jsx("label", { className: 'font-medium', children: "Email" }), _jsx("input", { type: 'email', className: 'border rounded-xl px-4 py-2 w-full', placeholder: 'Email', value: email, onChange: (e) => setEmail(e.target.value), required: true })] }), _jsxs("div", { className: 'flex flex-col gap-1', children: [_jsx("label", { className: 'font-medium', children: "Password" }), _jsxs("div", { className: 'relative', children: [_jsx("input", { type: showPass ? 'text' : 'password', className: 'border rounded-xl px-4 py-2 w-full', placeholder: 'Password', value: password, onChange: (e) => setPassword(e.target.value), required: true }), _jsx("button", { type: 'button', onClick: () => setShowPass(!showPass), className: 'absolute right-3 top-2.5 text-gray-500', children: showPass ? _jsx(EyeOff, { size: 20 }) : _jsx(Eye, { size: 20 }) })] })] }), _jsxs("div", { className: 'flex items-center gap-2', children: [_jsx("input", { type: 'checkbox', id: 'remember' }), _jsx("label", { htmlFor: 'remember', className: 'text-sm', children: "Remember Me" })] }), errorMsg && _jsx("p", { className: 'text-red-500 text-sm', children: errorMsg }), _jsx(Button, { type: 'submit', variant: 'default', size: 'lg', className: 'w-full mt-4 bg-primary text-white', disabled: loading, children: loading ? 'Loading...' : 'Login' })] })] }) })] }));
}
