export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  qty: number;
}

export interface RestaurantCart {
  restaurantId: number;
  restaurantName: string;
  restaurantLogo: string;
  items: CartItem[];
}

export interface CartState {
  restaurants: RestaurantCart[];
}

export interface CartContextType {
  cart: CartState;

  addItem: (
    restaurantId: number,
    restaurantName: string,
    restaurantLogo: string,
    item: Omit<CartItem, 'qty'>
  ) => void;

  increase: (restaurantId: number, itemId: number) => void;
  decrease: (restaurantId: number, itemId: number) => void;
  clearCart: () => void;
  totalQty: number;
}
