import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import ProductGrid from "../components/ProductGrid.jsx";
import { products } from "../data.js";
import { useStore } from "../context/StoreContext.jsx";

export default function WishlistPage() {
  const { wishlist } = useStore();
  const savedProducts = products.filter((product) => wishlist.includes(product.id));

  return (
    <div className="page-wrap wishlist-page">
      <div className="page-kicker"><Link to="/">Home</Link><span>/</span>Wishlist</div>
      <span className="eyebrow">SAVED FOR LATER</span><h1>Your wishlist<span>.</span></h1>
      {savedProducts.length
        ? <ProductGrid products={savedProducts} />
        : <div className="empty-inline">No saved fragrances yet. Find something you love and save it for later.<br /><Link className="text-link" to="/shop">Discover your favourites <ArrowRight size={15} /></Link></div>}
    </div>
  );
}
