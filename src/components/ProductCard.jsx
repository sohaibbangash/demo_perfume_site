import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Plus } from "lucide-react";
import { formatPrice } from "../data.js";
import { getProductImages } from "../productImages.js";
import { useStore } from "../context/StoreContext.jsx";

// Shared catalog tile for shop, category, homepage, and wishlist pages.
export default function ProductCard({ product, compact = false }) {
  const { addToCart, toggleWishlist, wishlist } = useStore();
  const images = getProductImages(product.id);
  const saved = wishlist.includes(product.id);

  return (
    <motion.article className={`product-card${compact ? " product-card-compact" : ""}`}>
      <div className="product-image-wrap">
        <Link to={`/product/${product.id}`} className="product-image-link" aria-label={`View ${product.name}`}>
          <img className="product-photo product-photo-primary" src={images.image} alt={`${product.name} perfume`} loading="lazy" />
          <img className="product-photo product-photo-hover" src={images.hoverImage} alt="" loading="lazy" aria-hidden="true" />
        </Link>
        {product.badge && <span className="product-badge">{product.badge}</span>}
        <button
          className={`product-heart${saved ? " is-saved" : ""}`}
          onClick={() => toggleWishlist(product.id)}
          aria-label={saved ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
        >
          <Heart size={18} fill={saved ? "currentColor" : "none"} />
        </button>
        <button className="quick-add" onClick={() => addToCart(product.id)}>
          Add to bag <Plus size={15} />
        </button>
      </div>
      <div className="product-meta">
        <div>
          <Link to={`/product/${product.id}`} className="product-name">{product.name}</Link>
          <span className="product-notes">{product.size} · {product.family}</span>
        </div>
        <span className="product-price">{formatPrice(product.price)}</span>
      </div>
    </motion.article>
  );
}
