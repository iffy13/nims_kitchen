import { Link, useNavigate } from 'react-router-dom';
import { Plus, Minus, Trash2, ShoppingBag, ArrowRight, MapPin } from 'lucide-react';
import { useCart } from '@/store/cartStore';
import { useSettings } from '@/store/settingsStore';

export default function Cart() {
  const { items, updateQuantity, removeFromCart, getSubtotal, getCartCount } = useCart();
  const { deliveryFee, minimumOrderAmount } = useSettings();
  const navigate = useNavigate();

  const subtotal = getSubtotal();
  const total = subtotal + deliveryFee;
  const itemCount = getCartCount();

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-20 pb-24 lg:pb-0 flex items-center justify-center">
        <div className="text-center px-4">
          <div className="w-32 h-32 bg-[#fff8e1] rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-16 h-16 text-[#06a34c]" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">
            Looks like you haven&apos;t added anything to your cart yet.
          </p>
          <Link to="/menu" className="btn-primary inline-flex items-center gap-2">
            Browse Menu
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-24 lg:pb-12">
      <div className="section-padding py-8">
        <h1 className="text-3xl font-bold mb-8">
          Your <span className="text-[#06a34c]">Cart</span>
          <span className="text-gray-400 text-lg font-normal ml-2">
            ({itemCount} item{itemCount !== 1 ? 's' : ''})
          </span>
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.product.id}
                className="bg-white rounded-2xl p-4 shadow-md flex gap-4"
              >
                {/* Image */}
                <div className="w-24 h-24 bg-[#fff8e1] rounded-xl flex-shrink-0 overflow-hidden">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-gray-900 truncate">
                        {item.product.name}
                      </h3>
                      <p className="text-sm text-gray-500 capitalize">
                        {item.product.category}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Add-ons */}
                  {item.selectedAddOns.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {item.selectedAddOns.map((addOn) => (
                        <span
                          key={addOn.id}
                          className="text-xs bg-[#fff8e1] text-[#06a34c] px-2 py-1 rounded-full"
                        >
                          + {addOn.name}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Quantity and Price */}
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center bg-gray-100 rounded-full">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-[#06a34c] transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-[#06a34c] transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="font-bold text-[#06a34c]">
                      ₦{((item.product.price + item.selectedAddOns.reduce((s, a) => s + a.price, 0)) * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Continue Shopping */}
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 text-[#06a34c] font-medium hover:underline"
            >
              <ArrowRight className="w-5 h-5 rotate-180" />
              Continue Shopping
            </Link>
          </div>

          {/* Order Summary */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₦{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    Delivery Fee
                  </span>
                  <span>₦{deliveryFee.toLocaleString()}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-[#06a34c]">₦{total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Minimum Order Warning */}
              {subtotal < minimumOrderAmount && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-4">
                  <p className="text-sm text-yellow-700">
                    Add ₦{(minimumOrderAmount - subtotal).toLocaleString()} more to meet the minimum order amount.
                  </p>
                </div>
              )}

              <button
                onClick={() => navigate('/checkout')}
                disabled={subtotal < minimumOrderAmount}
                className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Proceed to Checkout
                <ArrowRight className="w-5 h-5" />
              </button>

              <p className="text-center text-sm text-gray-500 mt-4">
                Delivery within Ikere Ekiti only
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
