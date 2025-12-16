import { createContext } from 'react';

export type Address = {
  street: string;
  phone: string;
};

export type AddressContextType = {
  address: Address;
  updateAddress: (address: Address) => void;
};

export const AddressContext = createContext<AddressContextType | null>(null);
