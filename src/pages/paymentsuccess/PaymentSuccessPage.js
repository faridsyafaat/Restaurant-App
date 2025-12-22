import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
export default function PaymentSuccessPage() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [data] = useState(() => {
        const stored = sessionStorage.getItem('lastOrder');
        if (!stored)
            return null;
        return JSON.parse(stored);
    });
    useEffect(() => {
        if (data) {
            // Refetch MyOrders secara type-safe
            queryClient.invalidateQueries({ queryKey: ['myOrders'] });
            // Redirect otomatis ke MyOrdersPage
            const timer = setTimeout(() => navigate('/my-orders'), 1000);
            return () => clearTimeout(timer);
        }
    }, [data, queryClient, navigate]);
    if (!data) {
        navigate('/');
        return null;
    }
    return (_jsx("div", { className: 'min-h-[70vh] flex items-center justify-center px-4', children: _jsxs("div", { className: 'w-full max-w-md bg-white rounded-xl shadow-card p-6 text-center', children: [_jsx(CheckCircle, { className: 'mx-auto text-green-600', size: 56 }), _jsx("h2", { className: 'text-xl font-semibold mt-4', children: "Payment Success" }), _jsx("p", { className: 'text-sm text-gray-500 mb-6', children: "Your payment has been successfully processed" }), _jsxs("div", { className: 'text-sm space-y-2 mb-6 text-left', children: [_jsxs("div", { className: 'flex justify-between', children: [_jsx("span", { children: "Date" }), _jsx("span", { children: data.date })] }), _jsxs("div", { className: 'flex justify-between', children: [_jsx("span", { children: "Payment Method" }), _jsx("span", { children: data.paymentMethod })] }), _jsxs("div", { className: 'flex justify-between', children: [_jsx("span", { children: "Price" }), _jsxs("span", { children: ["Rp ", data.subtotal.toLocaleString('id-ID')] })] }), _jsxs("div", { className: 'flex justify-between', children: [_jsx("span", { children: "Delivery Fee" }), _jsxs("span", { children: ["Rp ", data.deliveryFee.toLocaleString('id-ID')] })] }), _jsxs("div", { className: 'flex justify-between', children: [_jsx("span", { children: "Service Fee" }), _jsxs("span", { children: ["Rp ", data.serviceFee.toLocaleString('id-ID')] })] }), _jsx("hr", {}), _jsxs("div", { className: 'flex justify-between font-semibold', children: [_jsx("span", { children: "Total" }), _jsxs("span", { children: ["Rp ", data.total.toLocaleString('id-ID')] })] })] }), _jsx("button", { onClick: () => navigate('/my-orders'), className: 'w-full bg-red-600 text-white py-3 rounded-full', children: "See My Orders" })] }) }));
}
