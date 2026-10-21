import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, Instagram, Menu, Search, ShoppingBag, X } from "lucide-react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useStore } from "../context/StoreContext.jsx";

function Header() {
  const { cart, wishlist, user } = useStore();
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => setMenuOpen(false), [location.pathname]);

  return (
    <>
      <div className="announcement">Complimentary delivery on orders over Rs. 5,000</div>
      <header className="site-header">
        <button className="mobile-menu" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>{menuOpen ? <X /> : <Menu />}</button>
        <nav className={`main-nav${menuOpen ? " is-open" : ""}`} aria-label="Main navigation">
          <NavLink to="/shop">Shop All</NavLink>
          <NavLink to="/for-her">For Her</NavLink>
          <NavLink to="/for-him">For Him</NavLink>
          <NavLink to="/about">Our Story</NavLink>
        </nav>
        <Link to="/" className="wordmark">PERFUME<span>STORE</span></Link>
        <div className="header-actions">
          <Link to="/shop" className="icon-button" aria-label="Search fragrances"><Search /></Link>
          <Link to="/account" className="header-account">{user ? user.name.split(" ")[0] : "Account"}</Link>
          <Link to="/wishlist" className="icon-button" aria-label={`Wishlist, ${wishlist.length} items`}>
            <Heart /><span className="count">{wishlist.length}</span>
          </Link>
          <Link to="/cart" className="icon-button" aria-label={`Bag, ${cartCount} items`}>
            <ShoppingBag /><span className="count">{cartCount}</span>
          </Link>
        </div>
      </header>
    </>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-brand"><Link to="/" className="wordmark">PERFUME<span>STORE</span></Link><p>Make a lasting impression.<br />Find your signature fragrance.</p></div>
        <div className="footer-col"><span>COLLECTIONS</span><Link to="/shop">Shop all</Link><Link to="/for-her">For her</Link><Link to="/for-him">For him</Link></div>
        <div className="footer-col"><span>YOUR ACCOUNT</span><Link to="/account">Sign in / Sign up</Link><Link to="/wishlist">Wishlist</Link><Link to="/cart">Shopping bag</Link></div>
        <div className="footer-newsletter"><span>STAY IN THE KNOW</span><p>Discover new fragrances, first.</p><form onSubmit={(event) => { event.preventDefault(); event.currentTarget.reset(); }}><input type="email" placeholder="Email address" aria-label="Email address" required /><button aria-label="Subscribe"><span aria-hidden="true">→</span></button></form></div>
      </div>
      <div className="footer-bottom"><span>© 2026 PERFUME STORE</span><span>FIND YOUR SIGNATURE.</span><div><Instagram size={15} /><span>INSTAGRAM</span></div></div>
    </footer>
  );
}

// Persistent navigation, route transitions, and the shared add-to-cart message.
export default function SiteLayout({ children }) {
  const { notice } = useStore();
  const location = useLocation();

  return (
    <div className="app-shell">
      <Header />
      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={`${location.pathname}${location.search}`}
            className="page-transition"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <AnimatePresence>
        {notice && <motion.div className="toast" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}>{notice}</motion.div>}
      </AnimatePresence>
    </div>
  );
}
