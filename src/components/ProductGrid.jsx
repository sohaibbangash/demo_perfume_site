import { motion } from "framer-motion";
import ProductCard from "./ProductCard.jsx";

// One responsive product grid shared by all catalog pages.
export default function ProductGrid({ products, compact = false }) {
  if (!products.length) return <p className="empty-inline">No fragrances match those filters.</p>;

  return (
    <motion.div
      className="product-grid"
      variants={{ visible: { transition: { staggerChildren: 0.07 } }, hidden: {} }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.08 }}
    >
      {products.map((product) => <ProductCard key={product.id} product={product} compact={compact} />)}
    </motion.div>
  );
}
