import { Link, Navigate, useLocation } from 'react-router-dom';
import { Home, ShoppingBag, Phone, MapPin, User, MessageCircle, Calendar } from 'lucide-react';
import type { Order } from '@/types';
import { business } from '@/config/business';
import { formatNaira } from '@/lib/business';
import { lineTotal } from '@/lib/cart';

export default function OrderSuccess() {
  const location = useLocation();
  const state = location.state as { order?: Order; link?: string } | null;
  const order = state?.order;
  const link = state?.link;

  if (!order || !link) return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen pt-20 pb-12 flex items-center justify-center">
      <div className="section-padding w-full max-w-2xl">
        <div className="bg-white rounded-3xl shadow-xl p-8 text-center">
          <div className="w-24 h-24 bg-[#25D366] rounded-full flex items-center justify-center mx-auto mb-6">
            <MessageCircle className="w-12 h-12 text-white" />
          </div>

          <h1 className="text-3xl font-bold mb-2">Almost done — send it on WhatsApp</h1>
          <p className="text-gray-600 mb-6">
            WhatsApp should have opened with your order already typed in. Just tap <strong>Send</strong>.
            Your order is only confirmed once we reply.
          </p>

          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full mb-8 inline-flex items-center justify-center gap-2 rounded-full px-6 py-4 font-semibold text-white bg-[#25D366] hover:bg-[#1ebe5b] transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            WhatsApp didn&apos;t open? Tap here to send your order
          </a>

          {/* Order Details */}
          <div className="bg-gray-50 rounded-2xl p-6 text-left mb-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Order ID</span>
              <span className="font-bold">{order.id}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Total</span>
              <span className="font-bold text-xl text-[#06a34c]">{formatNaira(order.total)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Payment</span>
              <span>{order.paymentMethod === 'cod' ? 'Pay on ' + (order.deliveryType === 'delivery' ? 'delivery' : 'pickup') : 'Bank transfer'}</span>
            </div>
          </div>

          {/* Customer Info */}
          <div className="bg-gray-50 rounded-2xl p-6 text-left mb-6">
            <h2 className="font-bold mb-4">{order.deliveryType === 'delivery' ? 'Delivery' : 'Pickup'} Details</h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <User className="w-5 h-5 text-[#06a34c] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">{order.customerInfo.fullName}</p>
                  <p className="text-sm text-gray-500">{order.customerInfo.phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#06a34c] flex-shrink-0 mt-0.5" />
                <p className="text-gray-700">
                  {order.deliveryType === 'delivery'
                    ? `${order.customerInfo.address}, ${order.customerInfo.area}`
                    : `Pickup at ${business.pickupLocation}`}
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-[#06a34c] flex-shrink-0 mt-0.5" />
                <p className="text-gray-700">
                  {order.scheduledFor ?? `As soon as possible (about ${business.preparationTime}–${business.preparationTime + 15} mins after we confirm)`}
                </p>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="bg-gray-50 rounded-2xl p-6 text-left mb-6">
            <h2 className="font-bold mb-4">Order Items</h2>
            <div className="space-y-3">
              {order.items.map((item) => (
                <div key={item.lineId} className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <img src={item.product.image} alt="" className="w-12 h-12 rounded-lg object-cover" />
                    <div className="min-w-0">
                      <p className="font-medium">{item.product.name}</p>
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                        {item.selectedAddOns.length > 0 && ` · + ${item.selectedAddOns.map((a) => a.name).join(', ')}`}
                      </p>
                    </div>
                  </div>
                  <p className="font-semibold whitespace-nowrap">{formatNaira(lineTotal(item))}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-[#fff8e1] rounded-2xl p-6 mb-6">
            <div className="flex items-center justify-center gap-3 mb-2">
              <Phone className="w-5 h-5 text-[#06a34c]" />
              <span className="font-medium">Need help?</span>
            </div>
            <p className="text-gray-600 text-sm mb-3">Call us if you have any questions about your order.</p>
            <a href={business.phoneTel} className="text-[#06a34c] font-semibold hover:underline">
              {business.phoneDisplay}
            </a>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/menu" className="flex-1 btn-secondary flex items-center justify-center gap-2">
              <ShoppingBag className="w-5 h-5" />
              Order More
            </Link>
            <Link to="/" className="flex-1 btn-primary flex items-center justify-center gap-2">
              <Home className="w-5 h-5" />
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
