import { createContext, useContext, useEffect, useMemo, useState } from "react";

const StoreContext = createContext(null);

function readSavedValue(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

// Share cart, wishlist, and demo-account state across every page.
export function StoreProvider({ children }) {
  const [cart, setCart] = useState(() => readSavedValue("sillage-cart", []));
  const [wishlist, setWishlist] = useState(() => readSavedValue("sillage-wishlist", []));
  const [user, setUser] = useState(() => readSavedValue("sillage-user", null));
  const [notice, setNotice] = useState("");

  useEffect(() => localStorage.setItem("sillage-cart", JSON.stringify(cart)), [cart]);
  useEffect(() => localStorage.setItem("sillage-wishlist", JSON.stringify(wishlist)), [wishlist]);
  useEffect(() => localStorage.setItem("sillage-user", JSON.stringify(user)), [user]);
  useEffect(() => {
    if (!notice) return undefined;
    const timer = window.setTimeout(() => setNotice(""), 2400);
    return () => window.clearTimeout(timer);
  }, [notice]);

  const store = useMemo(() => ({
    cart,
    wishlist,
    user,
    notice,
    setCart,
    setUser,
    addToCart(id, quantity = 1) {
      setCart((current) => {
        const existing = current.find((item) => item.id === id);
        return existing
          ? current.map((item) => item.id === id ? { ...item, quantity: Math.min(item.quantity + quantity, 10) } : item)
          : [...current, { id, quantity }];
      });
      setNotice("Added to your bag");
    },
    toggleWishlist(id) {
      const saved = wishlist.includes(id);
      setWishlist((current) => saved ? current.filter((item) => item !== id) : [...current, id]);
      setNotice(saved ? "Removed from your wishlist" : "Saved to your wishlist");
    },
    updateQuantity(id, quantity) {
      setCart((current) => quantity < 1
        ? current.filter((item) => item.id !== id)
        : current.map((item) => item.id === id ? { ...item, quantity: Math.min(quantity, 10) } : item));
    },
    signOut() {
      setUser(null);
      setNotice("You've signed out");
    },
  }), [cart, wishlist, user, notice]);

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const store = useContext(StoreContext);
  if (!store) throw new Error("useStore must be used inside StoreProvider.");
  return store;
}
