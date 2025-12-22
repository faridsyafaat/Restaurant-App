import { useContext } from 'react';
import { AddressContext } from './AddressContext';
export function useAddress() {
    const context = useContext(AddressContext);
    if (!context) {
        throw new Error('useAddress must be used within AddressProvider');
    }
    return context;
}
