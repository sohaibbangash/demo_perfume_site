import { BrowserRouter, Route, Routes } from "react-router-dom";
import SiteLayout from "./components/SiteLayout.jsx";
import { StoreProvider } from "./context/StoreContext.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import AccountPage from "./pages/AccountPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import OrderSuccessPage from "./pages/OrderSuccessPage.jsx";
import ProductDetailsPage from "./pages/ProductDetailsPage.jsx";
import ShopPage from "./pages/ShopPage.jsx";
import WishlistPage from "./pages/WishlistPage.jsx";

// Keep route wiring here; reusable page, product, and store components live in their own files.
export default function App() {
  return (
    <BrowserRouter>
      <StoreProvider>
        <SiteLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/for-her" element={<CategoryPage category="Women" />} />
            <Route path="/for-him" element={<CategoryPage category="Men" />} />
            <Route path="/product/:id" element={<ProductDetailsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/order/success" element={<OrderSuccessPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </SiteLayout>
      </StoreProvider>
    </BrowserRouter>
  );
}
