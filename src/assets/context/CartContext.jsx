import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

const addToCart = (product) => {
  const existing = cart.find(item => item._id === product._id);

  if (existing) {
    setCart(
      cart.map(item =>
        item._id === product._id
          ? { ...item, qty: item.qty + 1 }
          : item
      )
    );
  } else {
    setCart([...cart, { ...product, qty: 1 }]);
  }
};

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item._id !== id));
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
