import { useState, useEffect } from "react";
import type { Product } from "@shared/schema";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  totalItems: number;
  totalAmount: number;
}

export function useCart() {
  const [cart, setCart] = useState<CartStore>(() => {
    const stored = localStorage.getItem("aquafresh-cart");
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return { items: [], totalItems: 0, totalAmount: 0 };
      }
    }
    return { items: [], totalItems: 0, totalAmount: 0 };
  });

  useEffect(() => {
    localStorage.setItem("aquafresh-cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart(prev => {
      const existingItem = prev.items.find(item => item.product.id === product.id);
      
      let newItems: CartItem[];
      if (existingItem) {
        newItems = prev.items.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        newItems = [...prev.items, { product, quantity }];
      }

      const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
      const totalAmount = newItems.reduce((sum, item) => 
        sum + (parseFloat(item.product.price) * item.quantity), 0
      );

      return { items: newItems, totalItems, totalAmount };
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => {
      const newItems = prev.items.filter(item => item.product.id !== productId);
      const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
      const totalAmount = newItems.reduce((sum, item) => 
        sum + (parseFloat(item.product.price) * item.quantity), 0
      );

      return { items: newItems, totalItems, totalAmount };
    });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart(prev => {
      const newItems = prev.items.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      );

      const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
      const totalAmount = newItems.reduce((sum, item) => 
        sum + (parseFloat(item.product.price) * item.quantity), 0
      );

      return { items: newItems, totalItems, totalAmount };
    });
  };

  const clearCart = () => {
    setCart({ items: [], totalItems: 0, totalAmount: 0 });
  };

  const getCartItem = (productId: number) => {
    return cart.items.find(item => item.product.id === productId);
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartItem,
  };
}
