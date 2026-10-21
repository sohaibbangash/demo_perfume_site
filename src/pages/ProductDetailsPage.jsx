import { useState } from "react";
import { ArrowLeft, ArrowRight, Heart, Minus, Plus } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import ProductGrid from "../components/ProductGrid.jsx";
import { products, formatPrice } from "../data.js";
import { getProductImages } from "../productImages.js";
import { useStore } from "../context/StoreContext.jsx";
import NotFoundPage from "./NotFoundPage.jsx";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const product = products.find((item) => item.id === id);
  const [quantity, setQuantity] = useState(1);
  const { addToCart, toggleWishlist, wishlist } = useStore();
  if (!product) return <NotFoundPage />;

  const images = getProductImages(product.id);
  const saved = wishlist.includes(product.id);
  const relatedProducts = products.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 4);

  return (
    <div className="page-wrap detail-page">
      <div className="page-kicker"><Link to="/">Home</Link><span>/</span><Link to="/shop">Shop All</Link><span>/</span>{product.name}</div>
      <div className="detail-grid">
        <div className="detail-image">
          <img className="detail-photo detail-photo-primary" src={images.image} alt={`${product.name} perfume`} />
          <img className="detail-photo detail-photo-hover" src={images.hoverImage} alt={`${product.name} perfume, alternate view`} />
          <span className="detail-image-note">PERFUME STORE · {product.size.toUpperCase()}</span>
        </div>
        <div className="detail-copy">
          <span className="eyebrow">{product.category === "Women" ? "FOR HER" : "FOR HIM"} · {product.family.split(" · ")[0].toUpperCase()}</span>
          <h1>{product.name}</h1><p className="detail-subtitle">{product.subtitle}</p>
          <div className="detail-price">{formatPrice(product.price)} <span>· {product.size}</span></div>
          <p className="detail-description">{product.description}</p>
          <div className="note-box"><span className="eyebrow">THE SCENT</span><p>{product.notes}</p></div>
          <div className="detail-actions">
            <div className="quantity-control"><button aria-label="Decrease quantity" onClick={() => setQuantity((value) => Math.max(1, value - 1))}><Minus size={14} /></button><span>{quantity}</span><button aria-label="Increase quantity" onClick={() => setQuantity((value) => Math.min(10, value + 1))}><Plus size={14} /></button></div>
            <button className="button button-dark add-detail" onClick={() => addToCart(product.id, quantity)}>Add to bag · {formatPrice(product.price * quantity)} <ArrowRight size={16} /></button>
            <button className={`icon-button detail-heart${saved ? " is-saved" : ""}`} onClick={() => toggleWishlist(product.id)} aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}><Heart fill={saved ? "currentColor" : "none"} /></button>
          </div>
          <p className="shipping-note">Complimentary delivery on orders over Rs. 5,000.</p>
          <div className="detail-accordions"><details><summary>How it wears <Plus size={15} /></summary><p>Apply to pulse points and allow the fragrance to warm naturally on your skin.</p></details><details><summary>Delivery & returns <Plus size={15} /></summary><p>Complimentary delivery on orders over Rs. 5,000. Unopened fragrances may be returned within 30 days.</p></details></div>
        </div>
      </div>
      <section className="section related-section"><div className="section-heading"><div><span className="eyebrow">MORE TO DISCOVER</span><h2>Find another <em>favourite.</em></h2></div><Link className="text-link" to={product.category === "Women" ? "/for-her" : "/for-him"}>More {product.category === "Women" ? "for her" : "for him"} <ArrowRight size={15} /></Link></div><ProductGrid products={relatedProducts} /></section>
    </div>
  );
}
