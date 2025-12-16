import type { Menu } from '@/types/Menu';

export interface CartItem {
  id: number;
  qty: number;
  price: number;
  name: string;
}

export interface CartContextType {
  cart: Record<number, CartItem>;
  increase: (menu: Menu) => void;
  decrease: (id: number) => void;
  totalQty: number;
}
