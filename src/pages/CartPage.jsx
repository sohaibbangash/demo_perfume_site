import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Minus, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { formatPrice, products } from "../data.js";
import { getProductImages } from "../productImages.js";
import { useStore } from "../context/StoreContext.jsx";

export default function CartPage() {
  const { cart, updateQuantity } = useStore();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const items = useMemo(() => cart.map((item) => ({
    ...item,
    product: products.find((product) => product.id === item.id),
  })).filter((item) => item.product), [cart]);
  const subtotal = items.reduce((total, item) => total + item.product.price * item.quantity, 0);

  const checkout = async () => {
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: items.map(({ id, quantity }) => ({ id, quantity })) }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Checkout could not be started.");
      window.location.assign(data.url);
    } catch (checkoutError) {
      setError(checkoutError.message || "Checkout could not be started. Please try again.");
      setBusy(false);
    }
  };

  if (!items.length) {
    return <div className="page-wrap empty-page"><span className="eyebrow">YOUR BAG</span><h1>A little room<br /><em>for something special.</em></h1><p>Your bag is ready for a new signature scent.</p><Link to="/shop" className="button button-dark">Explore fragrances <ArrowRight size={16} /></Link></div>;
  }

  return (
    <div className="page-wrap cart-page">
      <div className="page-kicker"><Link to="/">Home</Link><span>/</span>Your bag</div>
      <span className="eyebrow">YOUR SELECTION</span><h1>Your bag<span>.</span> <small>{items.reduce((total, item) => total + item.quantity, 0)} items</small></h1>
      <div className="cart-layout">
        <div className="cart-items">{items.map(({ id, quantity, product }) => (
          <div className="cart-item" key={id}>
            <Link to={`/product/${id}`} className="cart-thumb"><img src={getProductImages(id).image} alt={product.name} /></Link>
            <div className="cart-item-main"><Link to={`/product/${id}`} className="product-name">{product.name}</Link><span>{product.size} · {product.family}</span><div className="cart-quantity"><button aria-label={`Remove one ${product.name}`} onClick={() => updateQuantity(id, quantity - 1)}><Minus size={13} /></button><span>{quantity}</span><button aria-label={`Add one ${product.name}`} onClick={() => updateQuantity(id, quantity + 1)}><Plus size={13} /></button></div></div>
            <strong>{formatPrice(product.price * quantity)}</strong><button className="remove-item" onClick={() => updateQuantity(id, 0)}>Remove</button>
          </div>
        ))}</div>
        <aside className="order-summary"><span className="eyebrow">ORDER SUMMARY</span><div><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div><div><span>Delivery</span><span>{subtotal >= 5000 ? "Complimentary" : "Calculated at checkout"}</span></div><p>{subtotal >= 5000 ? "Your delivery is on us." : `You're ${formatPrice(5000 - subtotal)} away from complimentary delivery.`}</p><button className="button button-dark checkout-button" disabled={busy} onClick={checkout}>{busy ? "Preparing secure checkout…" : "Checkout securely"} <ArrowRight size={16} /></button><span className="stripe-note">Secure checkout powered by Stripe · Test mode</span>{error && <p className="form-error" role="alert">{error}</p>}<Link to="/shop" className="continue-link"><ArrowLeft size={14} /> Continue shopping</Link></aside>
      </div>
    </div>
  );
}
