import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from '@/store/cartStore';
import { Toaster } from '@/components/ui/sonner';

// Pages
import Home from '@/pages/Home';
import About from '@/pages/About';
import Menu from '@/pages/Menu';
import Cart from '@/pages/Cart';
import Checkout from '@/pages/Checkout';
import Contact from '@/pages/Contact';
import OrderSuccess from '@/pages/OrderSuccess';
import NotFound from '@/pages/NotFound';

// Components
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import StickyOrderButton from '@/components/StickyOrderButton';

/** Start each page at the top instead of keeping the previous scroll position. */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <CartProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/order-success" element={<OrderSuccess />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
          <WhatsAppButton />
          <StickyOrderButton />
        </div>
        <Toaster position="top-center" richColors />
      </Router>
    </CartProvider>
  );
}

export default App;
