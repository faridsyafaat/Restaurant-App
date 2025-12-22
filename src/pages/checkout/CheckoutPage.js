import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarAfterWhite from '@/components/NavbarAfterWhite';
import FooterSection from '@/components/FooterSection';
import { useCart } from '@/hooks/useCart';
import { useAddress } from '@/context/address/useAddress';
import ChangeAddressModal from '@/pages/checkout/ChangeAddressModal';
import { MapPin } from 'lucide-react';
/* ================= COMPONENT ================= */
export default function CheckoutPage() {
    const navigate = useNavigate();
    // Cart Context
    const { cart, increase, decrease, clearCart } = useCart();
    const { address, updateAddress } = useAddress();
    const [paymentMethod, setPaymentMethod] = useState('BNI');
    const [showAddressModal, setShowAddressModal] = useState(false);
    const [loading, setLoading] = useState(false);
    /* ================= BANK LIST ================= */
    const banks = [
        { key: 'BNI', name: 'Bank BNI', logo: '/image/bni.png' },
        { key: 'BRI', name: 'Bank BRI', logo: '/image/bri.png' },
        { key: 'BCA', name: 'Bank BCA', logo: '/image/bca.png' },
        { key: 'Mandiri', name: 'Bank Mandiri', logo: '/image/mandiri.png' },
    ];
    /* ================= TOTAL ================= */
    const subtotal = cart.restaurants.reduce((sum, restaurant) => sum +
        restaurant.items.reduce((itemSum, item) => itemSum + item.price * item.qty, 0), 0);
    const deliveryFee = 10000;
    const serviceFee = 1000;
    const total = subtotal + deliveryFee + serviceFee;
    /* ================= CHECKOUT ================= */
    const handleCheckout = async () => {
        if (cart.restaurants.length === 0) {
            alert('Cart is empty');
            return;
        }
        try {
            setLoading(true);
            const payload = {
                restaurants: cart.restaurants.map((restaurant) => ({
                    restaurantId: restaurant.restaurantId,
                    items: restaurant.items.map((item) => ({
                        menuId: item.id,
                        quantity: item.qty,
                    })),
                })),
                deliveryAddress: address.street,
                phone: address.phone,
                paymentMethod,
                notes: '',
            };
            const res = await fetch('https://restaurant-be-400174736012.asia-southeast2.run.app/api/order/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(payload),
            });
            const data = await res.json();
            if (!res.ok || !data.success) {
                throw new Error(data.message || 'Checkout failed');
            }
            // ===============================
            // SAVE PAYMENT SUMMARY
            // ===============================
            sessionStorage.setItem('lastOrder', JSON.stringify({
                date: new Date().toLocaleString('id-ID'),
                paymentMethod,
                subtotal,
                deliveryFee,
                serviceFee,
                total,
            }));
            clearCart();
            navigate('/payment-success');
        }
        catch (error) {
            alert(error instanceof Error ? error.message : 'Checkout error');
        }
        finally {
            setLoading(false);
        }
    };
    /* ================= UI ================= */
    return (_jsxs(_Fragment, { children: [_jsx(NavbarAfterWhite, {}), _jsxs("div", { className: 'max-w-6xl mx-auto px-4 py-8 pb-32', children: [_jsx("h2", { className: 'text-3xl font-bold mb-6', children: "Checkout" }), _jsxs("div", { className: 'grid grid-cols-1 md:grid-cols-3 gap-6', children: [_jsxs("div", { className: 'md:col-span-2 space-y-6', children: [_jsxs("div", { className: 'border rounded-xl p-4 bg-white', children: [_jsxs("div", { className: 'flex items-center gap-2 mb-2', children: [_jsx(MapPin, { className: 'text-red-600', size: 22 }), _jsx("h4", { className: 'font-semibold text-xl', children: "Delivery Address" })] }), _jsx("p", { className: 'text-sm text-gray-600', children: address.street }), _jsx("p", { className: 'text-sm text-gray-600', children: address.phone }), _jsx("button", { className: 'mt-2 text-sm text-red-600 font-medium', onClick: () => setShowAddressModal(true), children: "Change" })] }), cart.restaurants.map((restaurant) => (_jsxs("div", { className: 'border rounded-xl p-4 bg-white', children: [_jsxs("div", { className: 'flex items-center gap-3 mb-4', children: [restaurant.restaurantLogo && (_jsx("img", { src: restaurant.restaurantLogo, alt: restaurant.restaurantName, className: 'w-10 h-10 rounded-full object-cover' })), _jsx("h3", { className: 'font-semibold text-lg', children: restaurant.restaurantName })] }), restaurant.items.map((item) => (_jsxs("div", { className: 'flex items-center gap-4 py-3 border-t', children: [_jsx("img", { src: item.image || '/placeholder-food.png', alt: item.name, className: 'w-16 h-16 rounded-lg object-cover' }), _jsxs("div", { className: 'flex-1', children: [_jsx("p", { className: 'text-sm font-medium', children: item.name }), _jsxs("p", { className: 'text-sm text-gray-500', children: ["Rp ", item.price.toLocaleString('id-ID')] })] }), _jsxs("div", { className: 'flex items-center gap-2', children: [_jsx("button", { type: 'button', onClick: () => decrease(restaurant.restaurantId, item.id), className: 'w-7 h-7 flex items-center justify-center border border-gray-300 rounded-full text-gray-600 hover:bg-gray-100', children: "\u2212" }), _jsx("span", { className: 'text-sm font-medium w-4 text-center', children: item.qty }), _jsx("button", { type: 'button', onClick: () => increase(restaurant.restaurantId, item.id), className: 'w-7 h-7 flex items-center justify-center bg-red-600 text-white rounded-full hover:bg-red-700', children: "+" })] })] }, item.id)))] }, restaurant.restaurantId)))] }), _jsxs("div", { className: 'space-y-6', children: [_jsxs("div", { className: 'border rounded-xl p-4 bg-white', children: [_jsx("h4", { className: 'font-semibold mb-4', children: "Payment Method" }), _jsx("div", { className: 'space-y-3', children: banks.map((bank) => {
                                                    const selected = paymentMethod === bank.key;
                                                    return (_jsxs("label", { className: `flex items-center justify-between p-3 border rounded-xl cursor-pointer transition ${selected
                                                            ? 'border-red-600 bg-red-50'
                                                            : 'border-gray-200'}`, children: [_jsxs("div", { className: 'flex items-center gap-3', children: [_jsx("img", { src: bank.logo, alt: bank.name, className: 'w-10 h-10 object-contain' }), _jsx("span", { className: 'text-sm font-medium', children: bank.name })] }), _jsx("input", { type: 'radio', checked: selected, onChange: () => setPaymentMethod(bank.key), className: 'accent-red-600 w-4 h-4' })] }, bank.key));
                                                }) })] }), _jsxs("div", { className: 'border rounded-xl p-4 bg-white', children: [_jsx("h4", { className: 'font-semibold mb-4', children: "Payment Summary" }), _jsxs("div", { className: 'flex justify-between text-sm', children: [_jsx("span", { children: "Price (Items)" }), _jsxs("span", { children: ["Rp ", subtotal.toLocaleString('id-ID')] })] }), _jsxs("div", { className: 'flex justify-between text-sm', children: [_jsx("span", { children: "Delivery Fee" }), _jsxs("span", { children: ["Rp ", deliveryFee.toLocaleString('id-ID')] })] }), _jsxs("div", { className: 'flex justify-between text-sm mb-3', children: [_jsx("span", { children: "Service Fee" }), _jsxs("span", { children: ["Rp ", serviceFee.toLocaleString('id-ID')] })] }), _jsxs("div", { className: 'flex justify-between font-semibold mb-4', children: [_jsx("span", { children: "Total" }), _jsxs("span", { children: ["Rp ", total.toLocaleString('id-ID')] })] }), _jsx("button", { onClick: handleCheckout, disabled: loading, className: 'w-full bg-red-600 text-white py-3 rounded-full disabled:opacity-50', children: loading ? 'Processing...' : 'Buy' })] })] })] })] }), showAddressModal && (_jsx(ChangeAddressModal, { initialAddress: address, onSave: updateAddress, onClose: () => setShowAddressModal(false) })), _jsx(FooterSection, {})] }));
}
