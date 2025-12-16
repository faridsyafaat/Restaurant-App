import { useMemo, useState } from 'react';
import { CartContext } from './CartContext';
import type {
  CartContextType,
  CartState,
  RestaurantCart,
} from './CartContextTypes';

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartState>({
    restaurants: [],
  });

  // =========================
  // ADD ITEM
  // =========================
  const addItem: CartContextType['addItem'] = (
    restaurantId,
    restaurantName,
    restaurantLogo,
    item
  ) => {
    setCart((prev) => {
      const restaurants = [...prev.restaurants];

      let restaurant = restaurants.find((r) => r.restaurantId === restaurantId);

      if (!restaurant) {
        const newRestaurant: RestaurantCart = {
          restaurantId,
          restaurantName,
          restaurantLogo,
          items: [],
        };

        restaurants.push(newRestaurant);
        restaurant = newRestaurant;
      }

      const exist = restaurant.items.find((i) => i.id === item.id);

      if (exist) {
        exist.qty += 1;
      } else {
        restaurant.items.push({
          ...item,
          qty: 1,
        });
      }

      return { restaurants };
    });
  };

  // =========================
  // INCREASE
  // =========================
  const increase = (restaurantId: number, itemId: number) => {
    setCart((prev) => ({
      restaurants: prev.restaurants.map((r) =>
        r.restaurantId !== restaurantId
          ? r
          : {
              ...r,
              items: r.items.map((i) =>
                i.id === itemId ? { ...i, qty: i.qty + 1 } : i
              ),
            }
      ),
    }));
  };

  // =========================
  // DECREASE
  // =========================
  const decrease = (restaurantId: number, itemId: number) => {
    setCart((prev) => ({
      restaurants: prev.restaurants
        .map((r) =>
          r.restaurantId !== restaurantId
            ? r
            : {
                ...r,
                items: r.items
                  .map((i) => (i.id === itemId ? { ...i, qty: i.qty - 1 } : i))
                  .filter((i) => i.qty > 0),
              }
        )
        .filter((r) => r.items.length > 0),
    }));
  };

  // =========================
  // CLEAR CART
  // =========================
  const clearCart = () => {
    setCart({ restaurants: [] });
  };

  // =========================
  // TOTAL QTY
  // =========================
  const totalQty = useMemo(() => {
    return cart.restaurants.reduce(
      (acc, r) => acc + r.items.reduce((sum, i) => sum + i.qty, 0),
      0
    );
  }, [cart]);

  const value: CartContextType = {
    cart,
    addItem,
    increase,
    decrease,
    clearCart,
    totalQty,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
