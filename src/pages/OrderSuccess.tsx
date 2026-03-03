import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, Home, ShoppingBag, Phone, Clock, MapPin, User } from 'lucide-react';
import type { Order } from '@/types';

export default function OrderSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order as Order | undefined;

  useEffect(() => {
    if (!order) {
      navigate('/');
    }
  }, [order, navigate]);

  if (!order) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-NG', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-NG', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen pt-20 pb-12 flex items-center justify-center">
      <div className="section-padding w-full max-w-2xl">
        <div className="bg-white rounded-3xl shadow-xl p-8 text-center">
          {/* Success Icon */}
          <div className="w-24 h-24 bg-[#06a34c] rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>

          <h1 className="text-3xl font-bold mb-2">Order Placed Successfully!</h1>
          <p className="text-gray-600 mb-6">
            Thank you for your order. We&apos;ll start preparing it right away!
          </p>

          {/* Order Details */}
          <div className="bg-gray-50 rounded-2xl p-6 text-left mb-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-500">Order ID</span>
              <span className="font-bold">{order.id}</span>
            </div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-500">Date & Time</span>
              <span>{formatDate(order.createdAt)} at {formatTime(order.createdAt)}</span>
            </div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-500">Status</span>
              <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium capitalize">
                {order.status}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Total Amount</span>
              <span className="font-bold text-xl text-[#06a34c]">₦{order.total.toLocaleString()}</span>
            </div>
          </div>

          {/* Customer Info */}
          <div className="bg-gray-50 rounded-2xl p-6 text-left mb-6">
            <h3 className="font-bold mb-4">Delivery Details</h3>
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
                <p className="text-gray-700">{order.customerInfo.address}</p>
              </div>
              {order.deliveryType === 'delivery' && (
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#06a34c] flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700">
                    Estimated delivery: 30-45 minutes
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Order Items */}
          <div className="bg-gray-50 rounded-2xl p-6 text-left mb-6">
            <h3 className="font-bold mb-4">Order Items</h3>
            <div className="space-y-3">
              {order.items.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div>
                      <p className="font-medium">{item.product.name}</p>
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                        {item.selectedAddOns.length > 0 && ` + ${item.selectedAddOns.length} add-on(s)`}
                      </p>
                    </div>
                  </div>
                  <p className="font-semibold">
                    ₦{((item.product.price + item.selectedAddOns.reduce((s, a) => s + a.price, 0)) * item.quantity).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-[#fff8e1] rounded-2xl p-6 mb-6">
            <div className="flex items-center gap-3 mb-2">
              <Phone className="w-5 h-5 text-[#06a34c]" />
              <span className="font-medium">Need help?</span>
            </div>
            <p className="text-gray-600 text-sm mb-3">
              If you have any questions about your order, feel free to contact us.
            </p>
            <a
              href="tel:07062435315"
              className="text-[#06a34c] font-semibold hover:underline"
            >
              07062435315
            </a>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/menu"
              className="flex-1 btn-secondary flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-5 h-5" />
              Order More
            </Link>
            <Link
              to="/"
              className="flex-1 btn-primary flex items-center justify-center gap-2"
            >
              <Home className="w-5 h-5" />
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
