import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import ProductGrid from "../components/ProductGrid.jsx";
import { products } from "../data.js";
import { categoryImages } from "../productImages.js";

export default function CategoryPage({ category }) {
  const [maxPrice, setMaxPrice] = useState(2500);
  const [sort, setSort] = useState("featured");
  const isWomen = category === "Women";
  const categoryProducts = useMemo(() => {
    const result = products.filter((product) => product.category === category && product.price <= maxPrice);
    if (sort === "price-low") result.sort((first, second) => first.price - second.price);
    if (sort === "price-high") result.sort((first, second) => second.price - first.price);
    return result;
  }, [category, maxPrice, sort]);

  return (
    <div className="page-wrap shop-page category-page">
      <div className="page-kicker"><Link to="/">Home</Link><span>/</span>{isWomen ? "For Her" : "For Him"}</div>
      <section className="category-intro">
        <div><span className="eyebrow">{isWomen ? "THE WOMEN'S COLLECTION" : "THE MEN'S COLLECTION"}</span><h1>For {isWomen ? "Her" : "Him"}<span>.</span></h1><p>{isWomen ? "Find the fragrance that feels like you. Explore our complete collection of florals, warm signatures, and everyday favourites." : "Find your signature scent. Explore the complete collection of confident, distinctive fragrances."}</p></div>
        <img src={categoryImages[category]} alt={`${category} fragrances`} />
      </section>
      <div className="shop-toolbar">
        <div className="category-filters" aria-label="Filter by category">
          <Link to="/shop">All fragrances</Link>
          <Link className={isWomen ? "active" : ""} to="/for-her">For Her</Link>
          <Link className={!isWomen ? "active" : ""} to="/for-him">For Him</Link>
        </div>
        <label className="sort-label">Sort by <select value={sort} onChange={(event) => setSort(event.target.value)}><option value="featured">Featured</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option></select><ChevronDown size={14} /></label>
      </div>
      <div className="shop-layout">
        <aside className="filter-panel"><span className="eyebrow">REFINE BY</span><label htmlFor={`${category}-price-range`}>Maximum price</label><input id={`${category}-price-range`} type="range" min="400" max="2500" step="50" value={maxPrice} onChange={(event) => setMaxPrice(Number(event.target.value))} /><div className="range-values"><span>Rs. 400</span><span>Rs. {maxPrice.toLocaleString("en-PK")}</span></div><button className="filter-reset" onClick={() => setMaxPrice(2500)}>Reset price</button></aside>
        <div className="shop-results"><p className="result-count">{categoryProducts.length} fragrances</p><ProductGrid products={categoryProducts} /></div>
      </div>
    </div>
  );
}
