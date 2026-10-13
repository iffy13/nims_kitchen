import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '@/store/cartStore';

export default function StickyOrderButton() {
  const location = useLocation();
  const { getCartCount, getCartTotal } = useCart();
  
  const cartCount = getCartCount();
  const cartTotal = getCartTotal();
  
  // Don't show on cart, checkout, or admin pages
  if (location.pathname === '/cart' || location.pathname === '/checkout' || location.pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <Link
      to="/cart"
      className="fixed bottom-4 left-4 right-4 z-40 bg-[#06a34c] text-white rounded-full px-4 py-3 shadow-lg flex items-center justify-between hover:bg-[#048a3d] transition-colors md:hidden"
    >
      <div className="flex items-center gap-3">
        <div className="relative">
          <ShoppingBag className="w-6 h-6" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 w-5 h-5 bg-[#f9c02d] text-black text-xs font-bold rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </div>
        <span className="font-semibold">
          {cartCount > 0 ? `${cartCount} item${cartCount > 1 ? 's' : ''}` : 'Your cart is empty'}
        </span>
      </div>
      <span className="font-bold">
        ₦{cartTotal.toLocaleString()}
      </span>
    </Link>
  );
}
