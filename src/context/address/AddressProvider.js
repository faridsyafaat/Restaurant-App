import { jsx as _jsx } from "react/jsx-runtime";
import { useState } from 'react';
import { AddressContext } from './AddressContext';
export function AddressProvider({ children }) {
    const [address, setAddress] = useState({
        street: 'Jl. Sudirman No. 25, Jakarta Pusat, 10220',
        phone: '0812-3456-7890',
    });
    const updateAddress = (newAddress) => {
        setAddress(newAddress);
    };
    return (_jsx(AddressContext.Provider, { value: { address, updateAddress }, children: children }));
}
