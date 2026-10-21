import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import ProductGrid from "../components/ProductGrid.jsx";
import { products, formatPrice } from "../data.js";

export default function ShopPage() {
  const [params, setParams] = useSearchParams();
  const activeCategory = params.get("category") || "All";
  const [maxPrice, setMaxPrice] = useState(2500);
  const [sort, setSort] = useState("featured");
  const filteredProducts = useMemo(() => {
    const result = products.filter((product) =>
      (activeCategory === "All" || product.category === activeCategory) && product.price <= maxPrice,
    );
    if (sort === "price-low") result.sort((first, second) => first.price - second.price);
    if (sort === "price-high") result.sort((first, second) => second.price - first.price);
    return result;
  }, [activeCategory, maxPrice, sort]);
  const setCategory = (category) => {
    const next = new URLSearchParams(params);
    if (category === "All") next.delete("category");
    else next.set("category", category);
    setParams(next);
  };

  return (
    <div className="page-wrap shop-page">
      <div className="page-kicker"><Link to="/">Home</Link><span>/</span> Shop All</div>
      <div className="shop-title"><div><span className="eyebrow">THE COMPLETE COLLECTION</span><h1>Shop all<span>.</span></h1></div><p>Every bottle, every signature.<br />Find your fragrance here.</p></div>
      <div className="shop-toolbar">
        <div className="category-filters" aria-label="Filter by category">
          {["All", "Women", "Men"].map((category) => <button className={activeCategory === category ? "active" : ""} onClick={() => setCategory(category)} key={category}>{category === "All" ? "All fragrances" : category === "Women" ? "For Her" : "For Him"}</button>)}
        </div>
        <label className="sort-label">Sort by <select value={sort} onChange={(event) => setSort(event.target.value)}><option value="featured">Featured</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option></select><ChevronDown size={14} /></label>
      </div>
      <div className="shop-layout">
        <aside className="filter-panel"><span className="eyebrow">REFINE BY</span><label htmlFor="shop-price-range">Maximum price</label><input id="shop-price-range" type="range" min="400" max="2500" step="50" value={maxPrice} onChange={(event) => setMaxPrice(Number(event.target.value))} /><div className="range-values"><span>Rs. 400</span><span>Up to {formatPrice(maxPrice)}</span></div><button className="filter-reset" onClick={() => { setMaxPrice(2500); setCategory("All"); }}>Clear filters</button></aside>
        <div className="shop-results"><p className="result-count">{filteredProducts.length} fragrances</p><ProductGrid products={filteredProducts} /></div>
      </div>
    </div>
  );
}
