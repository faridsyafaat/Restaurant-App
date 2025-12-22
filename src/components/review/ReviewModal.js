import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import toast from 'react-hot-toast';
import { X } from 'lucide-react';
export default function ReviewModal({ isOpen, onClose, transactionId, restaurantId, menuId, onSuccess, }) {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(false);
    if (!isOpen)
        return null;
    const handleSubmit = async () => {
        if (!rating) {
            toast.error('Please give rating');
            return;
        }
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            if (!token)
                throw new Error('Unauthorized');
            const res = await fetch('https://restaurant-be-400174736012.asia-southeast2.run.app/api/review', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    transactionId,
                    restaurantId,
                    menuId,
                    star: rating,
                    comment,
                }),
            });
            const json = await res.json();
            if (!res.ok) {
                throw new Error(json.message);
            }
            toast.success('Review submitted successfully!');
            onSuccess?.();
            onClose();
        }
        catch (err) {
            const message = err instanceof Error ? err.message : 'Something went wrong';
            toast.error(message);
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsx("div", { className: 'fixed inset-0 z-50 flex items-center justify-center bg-black/50', children: _jsxs("div", { className: 'bg-white rounded-2xl w-[420px] p-6 relative', children: [_jsx("button", { onClick: onClose, className: 'absolute right-4 top-4 text-gray-400 hover:text-gray-600', children: _jsx(X, { size: 20 }) }), _jsx("h2", { className: 'text-lg font-semibold text-center mb-4', children: "Give Review" }), _jsx("div", { className: 'flex justify-center gap-2 mb-4', children: [1, 2, 3, 4, 5].map((star) => (_jsx("button", { onClick: () => setRating(star), className: `text-2xl ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`, children: "\u2605" }, star))) }), _jsx("textarea", { placeholder: 'Please share your thoughts about our service!', value: comment, onChange: (e) => setComment(e.target.value), className: 'w-full h-[120px] border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500' }), _jsx("button", { onClick: handleSubmit, disabled: loading, className: 'mt-4 w-full bg-red-600 text-white py-2 rounded-full font-semibold disabled:opacity-50', children: loading ? 'Sending...' : 'Send' })] }) }));
}
