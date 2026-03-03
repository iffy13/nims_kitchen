import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from '@/store/cartStore';
import { OrderProvider } from '@/store/orderStore';
import { SettingsProvider } from '@/store/settingsStore';
import { AdminProvider } from '@/store/adminStore';
import { Toaster } from '@/components/ui/sonner';

// Pages
import Home from '@/pages/Home';
import About from '@/pages/About';
import Menu from '@/pages/Menu';
import Cart from '@/pages/Cart';
import Checkout from '@/pages/Checkout';
import Contact from '@/pages/Contact';
import OrderSuccess from '@/pages/OrderSuccess';
import AdminLogin from '@/pages/AdminLogin';
import AdminDashboard from '@/pages/AdminDashboard';

// Components
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import StickyOrderButton from '@/components/StickyOrderButton';

function App() {
  return (
    <CartProvider>
      <OrderProvider>
        <SettingsProvider>
          <AdminProvider>
            <Router>
              <div className="min-h-screen flex flex-col">
                <Routes>
                  {/* Admin Routes */}
                  <Route path="/admin/login" element={<AdminLogin />} />
                  <Route path="/admin" element={<AdminDashboard />} />
                  
                  {/* Public Routes */}
                  <Route
                    path="/*"
                    element={
                      <>
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
                          </Routes>
                        </main>
                        <Footer />
                        <WhatsAppButton />
                        <StickyOrderButton />
                      </>
                    }
                  />
                </Routes>
              </div>
              <Toaster position="top-center" richColors />
            </Router>
          </AdminProvider>
        </SettingsProvider>
      </OrderProvider>
    </CartProvider>
  );
}

export default App;
