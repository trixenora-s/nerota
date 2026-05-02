import { create } from 'zustand';
import { persist, StateCreator } from 'zustand/middleware';

interface CartItem {
  productId: string;
  quantity: number;
  price: number;
  title: string;
  image: string;
}

interface StoreState {
  cart: CartItem[];
  wishlist: string[];
  addToCart: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  addToWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  setCart: (cart: CartItem[]) => void;
  setWishlist: (wishlist: string[]) => void;
}

const createStore: StateCreator<StoreState> = (set, get) => ({
  cart: [],
  wishlist: [],
  addToCart: (item) =>
    set((state) => {
      const existing = state.cart.find((c) => c.productId === item.productId);
      if (existing) {
        return {
          cart: state.cart.map((c) =>
            c.productId === item.productId
              ? { ...c, quantity: c.quantity + (item.quantity || 1) }
              : c
          ),
        };
      }
      return {
        cart: [...state.cart, { ...item, quantity: item.quantity || 1 }],
      };
    }),
  removeFromCart: (productId) =>
    set((state) => ({
      cart: state.cart.filter((c) => c.productId !== productId),
    })),
  updateCartQuantity: (productId, quantity) =>
    set((state) => ({
      cart: state.cart.map((c) =>
        c.productId === productId ? { ...c, quantity } : c
      ).filter((c) => c.quantity > 0),
    })),
  clearCart: () => set({ cart: [] }),
  addToWishlist: (productId) =>
    set((state) => ({
      wishlist: state.wishlist.includes(productId)
        ? state.wishlist
        : [...state.wishlist, productId],
    })),
  removeFromWishlist: (productId) =>
    set((state) => ({
      wishlist: state.wishlist.filter((id) => id !== productId),
    })),
  setCart: (cart) => set({ cart }),
  setWishlist: (wishlist) => set({ wishlist }),
});

export const useStore = create<StoreState>()(
  persist(createStore, {
    name: 'event-decoration-store',
  })
);