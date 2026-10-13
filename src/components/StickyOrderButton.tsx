import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '@/store/cartContext';
import { formatNaira } from '@/lib/business';

export default function StickyOrderButton() {
  const location = useLocation();
  const { count: cartCount, subtotal: cartTotal } = useCart();

  // Don't show on cart, checkout or order-success pages
  if (['/cart', '/checkout', '/order-success'].includes(location.pathname)) {
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
        {formatNaira(cartTotal)}
      </span>
    </Link>
  );
}
