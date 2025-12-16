import { useState } from 'react';
import { AddressContext, Address } from './AddressContext';

export function AddressProvider({ children }: { children: React.ReactNode }) {
  const [address, setAddress] = useState<Address>({
    street: 'Jl. Sudirman No. 25, Jakarta Pusat, 10220',
    phone: '0812-3456-7890',
  });

  const updateAddress = (newAddress: Address) => {
    setAddress(newAddress);
  };

  return (
    <AddressContext.Provider value={{ address, updateAddress }}>
      {children}
    </AddressContext.Provider>
  );
}
