import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import HeroCarousel from "../components/HeroCarousel.jsx";
import ProductGrid from "../components/ProductGrid.jsx";
import { products } from "../data.js";
import { categoryImages } from "../productImages.js";

export default function HomePage() {
  const featuredIds = ["touch-of-gold", "maverick", "blush", "oud-wood"];
  const featured = products.filter((product) => featuredIds.includes(product.id));

  return (
    <>
      <HeroCarousel />
      <section className="section gender-section">
        <div className="section-heading"><div><span className="eyebrow">FIND YOUR FRAGRANCE</span><h2>Made for <em>you.</em></h2></div></div>
        <div className="gender-grid">
          {["Women", "Men"].map((category) => (
            <Link className={`gender-card gender-card-${category.toLowerCase()}`} to={category === "Women" ? "/for-her" : "/for-him"} key={category}>
              <img src={categoryImages[category]} alt={`${category} fragrance collection`} />
              <span className="gender-card-overlay" />
              <span className="gender-card-copy"><span>THE COLLECTION</span><strong>{category === "Women" ? "For Her" : "For Him"}</strong><i>EXPLORE THE COLLECTION <ArrowRight size={15} /></i></span>
            </Link>
          ))}
        </div>
      </section>
      <section className="section collection-section">
        <div className="section-heading"><div><span className="eyebrow">THE MOST LOVED</span><h2>Meet your <em>new signature.</em></h2></div><Link className="text-link" to="/shop">Shop all fragrances <ArrowRight size={15} /></Link></div>
        <ProductGrid products={featured} />
      </section>
      <section className="home-promise">
        <span className="eyebrow">A SCENT THAT STAYS WITH YOU</span>
        <h2>Style that moves <em>with you.</em></h2>
        <p>Find a fragrance that feels like yours. From first light to after hours, discover a scent for every chapter.</p>
        <div className="promise-stats"><div><strong>18</strong><span>distinctive fragrances</span></div><div><strong>100 ml</strong><span>signature bottles</span></div><div><strong>2</strong><span>collections, one for you</span></div></div>
        <Link to="/shop" className="button button-dark">Discover the collection <ArrowRight size={16} /></Link>
      </section>
    </>
  );
}
