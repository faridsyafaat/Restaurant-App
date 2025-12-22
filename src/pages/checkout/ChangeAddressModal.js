import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
export default function ChangeAddressModal({ initialAddress, onSave, onClose, }) {
    const [street, setStreet] = useState(initialAddress.street);
    const [phone, setPhone] = useState(initialAddress.phone);
    const handleSave = () => {
        onSave({ street, phone });
        onClose();
    };
    return (_jsx("div", { className: 'fixed inset-0 z-50 flex items-center justify-center bg-black/40', children: _jsxs("div", { className: 'bg-white rounded-xl w-full max-w-md p-6', children: [_jsx("h3", { className: 'text-lg font-semibold mb-4', children: "Change Delivery Address" }), _jsxs("div", { className: 'space-y-4', children: [_jsxs("div", { children: [_jsx("label", { className: 'text-sm font-medium', children: "Address" }), _jsx("textarea", { className: 'w-full border rounded-lg p-2 text-sm mt-1', rows: 3, value: street, onChange: (e) => setStreet(e.target.value) })] }), _jsxs("div", { children: [_jsx("label", { className: 'text-sm font-medium', children: "Phone Number" }), _jsx("input", { type: 'text', className: 'w-full border rounded-lg p-2 text-sm mt-1', value: phone, onChange: (e) => setPhone(e.target.value) })] })] }), _jsxs("div", { className: 'flex justify-end gap-3 mt-6', children: [_jsx("button", { className: 'px-4 py-2 text-sm border rounded-lg', onClick: onClose, children: "Cancel" }), _jsx("button", { className: 'px-4 py-2 text-sm bg-red-600 text-white rounded-lg', onClick: handleSave, children: "Save" })] })] }) }));
}
