import { jsx as _jsx } from "react/jsx-runtime";
import { useLocation, useNavigate } from 'react-router-dom';
import ReviewModal from '@/components/review/ReviewModal';
/* ================= PAGE ================= */
export default function ReviewPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const state = location.state;
    if (!state) {
        return (_jsx("div", { className: 'min-h-screen flex items-center justify-center', children: _jsx("p", { className: 'text-gray-500', children: "Invalid review data" }) }));
    }
    const { transactionId, restaurantId } = state;
    return (_jsx(ReviewModal, { isOpen: true, transactionId: transactionId, restaurantId: restaurantId, onClose: () => navigate(-1), onSuccess: () => navigate('/my-orders', { replace: true }) }));
}
