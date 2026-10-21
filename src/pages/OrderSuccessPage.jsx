import { useEffect, useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { formatPrice } from "../data.js";
import { useStore } from "../context/StoreContext.jsx";

export default function OrderSuccessPage() {
  const [params] = useSearchParams();
  const { setCart } = useStore();
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");
  const sessionId = params.get("session_id");

  useEffect(() => {
    if (!sessionId) return undefined;
    let active = true;
    fetch(`/api/checkout/session/${encodeURIComponent(sessionId)}`)
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "We couldn't verify your order.");
        return data;
      })
      .then((data) => {
        if (!active) return;
        setOrder(data);
        if (data.status === "paid") setCart([]);
      })
      .catch((requestError) => { if (active) setError(requestError.message); });
    return () => { active = false; };
  }, [sessionId, setCart]);

  return (
    <div className="page-wrap success-page"><div className="success-mark"><Check size={28} /></div><span className="eyebrow">PERFUME STORE</span><h1>{order?.status === "paid" ? <>It’s on its <em>way.</em></> : <>Thank <em>you.</em></>}</h1><p>{order?.status === "paid" ? `Your order is confirmed${order.email ? `, ${order.email}` : ""}. We can’t wait for you to discover your fragrance.` : "Thank you for choosing a new signature fragrance."}</p>{order?.total != null && <p className="order-total">Order total · {formatPrice(order.total / 100)}</p>}{error && <p className="form-error" role="alert">{error}</p>}<Link to="/shop" className="button button-dark">Shop the collection <ArrowRight size={16} /></Link></div>
  );
}
