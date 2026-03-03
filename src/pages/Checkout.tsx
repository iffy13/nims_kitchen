import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Phone, User, CreditCard, Banknote, Truck, Store, Clock, Calendar, ChevronDown, Check, AlertCircle } from 'lucide-react';
import { useCart } from '@/store/cartStore';
import { useOrder } from '@/store/orderStore';
import { useSettings } from '@/store/settingsStore';
import type { PaymentMethod, DeliveryType } from '@/types';
import { toast } from 'sonner';

export default function Checkout() {
  const navigate = useNavigate();
  const { items, getSubtotal, clearCart } = useCart();
  const { createOrder } = useOrder();
  const { deliveryFee, minimumOrderAmount, isDeliveryLocationValid, isWithinBusinessHours, preparationTime } = useSettings();

  const [deliveryType, setDeliveryType] = useState<DeliveryType>('delivery');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    notes: '',
    scheduledDate: '',
    scheduledTime: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const subtotal = getSubtotal();
  const total = subtotal + (deliveryType === 'delivery' ? deliveryFee : 0);

  // Check if within business hours
  const withinBusinessHours = isWithinBusinessHours();

  // Validate location for delivery
  const isValidLocation = deliveryType === 'pickup' || isDeliveryLocationValid(formData.address);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9]{11}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid 11-digit phone number';
    }
    
    if (deliveryType === 'delivery' && !formData.address.trim()) {
      newErrors.address = 'Delivery address is required';
    }
    
    if (deliveryType === 'delivery' && !isValidLocation) {
      newErrors.address = 'We only deliver within Ikere Ekiti area';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (!withinBusinessHours) {
      toast.error('We are currently closed. Please order during business hours (8:00 AM - 9:00 PM)');
      return;
    }

    setIsSubmitting(true);

    try {
      const scheduledFor = showSchedule && formData.scheduledDate && formData.scheduledTime
        ? `${formData.scheduledDate}T${formData.scheduledTime}`
        : undefined;

      const order = createOrder(
        items,
        {
          fullName: formData.fullName,
          phone: formData.phone,
          email: formData.email,
          address: deliveryType === 'delivery' ? formData.address : 'Pickup at Bouesti, Ikere Ekiti',
          notes: formData.notes,
        },
        deliveryType,
        deliveryType === 'delivery' ? deliveryFee : 0,
        paymentMethod,
        formData.notes,
        scheduledFor
      );

      clearCart();
      navigate('/order-success', { state: { order } });
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen pt-20 pb-24 lg:pb-12">
      <div className="section-padding py-8">
        <h1 className="text-3xl font-bold mb-8">
          Checkout
        </h1>

        {/* Business Hours Warning */}
        {!withinBusinessHours && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-red-700">We are currently closed</p>
              <p className="text-sm text-red-600">
                Our business hours are 8:00 AM - 9:00 PM. You can schedule your order for later.
              </p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Type */}
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <h2 className="text-lg font-bold mb-4">Delivery Options</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setDeliveryType('delivery')}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    deliveryType === 'delivery'
                      ? 'border-[#06a34c] bg-[#06a34c]/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      deliveryType === 'delivery' ? 'bg-[#06a34c]' : 'bg-gray-100'
                    }`}>
                      <Truck className={`w-5 h-5 ${deliveryType === 'delivery' ? 'text-white' : 'text-gray-500'}`} />
                    </div>
                    <div>
                      <p className="font-semibold">Delivery</p>
                      <p className="text-sm text-gray-500">₦{deliveryFee.toLocaleString()}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">We deliver within Ikere Ekiti</p>
                </button>

                <button
                  type="button"
                  onClick={() => setDeliveryType('pickup')}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    deliveryType === 'pickup'
                      ? 'border-[#06a34c] bg-[#06a34c]/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      deliveryType === 'pickup' ? 'bg-[#06a34c]' : 'bg-gray-100'
                    }`}>
                      <Store className={`w-5 h-5 ${deliveryType === 'pickup' ? 'text-white' : 'text-gray-500'}`} />
                    </div>
                    <div>
                      <p className="font-semibold">Pickup</p>
                      <p className="text-sm text-gray-500">Free</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">Pick up at Bouesti, Ikere Ekiti</p>
                </button>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <h2 className="text-lg font-bold mb-4">Contact Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="Enter your full name"
                      className={`w-full pl-12 pr-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#06a34c] transition-all ${
                        errors.fullName ? 'ring-2 ring-red-500' : ''
                      }`}
                    />
                  </div>
                  {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g., 07062435315"
                      className={`w-full pl-12 pr-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#06a34c] transition-all ${
                        errors.phone ? 'ring-2 ring-red-500' : ''
                      }`}
                    />
                  </div>
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email (Optional)
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#06a34c] transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Delivery Address */}
            {deliveryType === 'delivery' && (
              <div className="bg-white rounded-2xl p-6 shadow-md">
                <h2 className="text-lg font-bold mb-4">Delivery Address</h2>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                    <textarea
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="Enter your delivery address in Ikere Ekiti"
                      rows={3}
                      className={`w-full pl-12 pr-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#06a34c] transition-all resize-none ${
                        errors.address ? 'ring-2 ring-red-500' : ''
                      }`}
                    />
                  </div>
                  {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                  <p className="text-sm text-gray-500 mt-2">
                    We currently only deliver within Ikere Ekiti area.
                  </p>
                </div>
              </div>
            )}

            {/* Schedule Order */}
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <button
                type="button"
                onClick={() => setShowSchedule(!showSchedule)}
                className="flex items-center justify-between w-full"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#f9c02d] rounded-full flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-black" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold">Schedule Order</p>
                    <p className="text-sm text-gray-500">
                      {showSchedule ? 'Scheduling enabled' : 'Order for later'}
                    </p>
                  </div>
                </div>
                <ChevronDown className={`w-5 h-5 transition-transform ${showSchedule ? 'rotate-180' : ''}`} />
              </button>

              {showSchedule && (
                <div className="mt-4 grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <input
                      type="date"
                      value={formData.scheduledDate}
                      onChange={(e) => setFormData({ ...formData, scheduledDate: e.target.value })}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#06a34c]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                    <input
                      type="time"
                      value={formData.scheduledTime}
                      onChange={(e) => setFormData({ ...formData, scheduledTime: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#06a34c]"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Order Notes */}
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <h2 className="text-lg font-bold mb-4">Order Notes (Optional)</h2>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Any special instructions for your order..."
                rows={3}
                className="w-full px-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#06a34c] transition-all resize-none"
              />
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <h2 className="text-lg font-bold mb-4">Payment Method</h2>
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`w-full p-4 rounded-xl border-2 flex items-center gap-3 transition-all ${
                    paymentMethod === 'cod'
                      ? 'border-[#06a34c] bg-[#06a34c]/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    paymentMethod === 'cod' ? 'bg-[#06a34c]' : 'bg-gray-100'
                  }`}>
                    <Banknote className={`w-5 h-5 ${paymentMethod === 'cod' ? 'text-white' : 'text-gray-500'}`} />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-semibold">Pay on Delivery</p>
                    <p className="text-sm text-gray-500">Pay when you receive your order</p>
                  </div>
                  {paymentMethod === 'cod' && <Check className="w-5 h-5 text-[#06a34c]" />}
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('transfer')}
                  className={`w-full p-4 rounded-xl border-2 flex items-center gap-3 transition-all ${
                    paymentMethod === 'transfer'
                      ? 'border-[#06a34c] bg-[#06a34c]/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    paymentMethod === 'transfer' ? 'bg-[#06a34c]' : 'bg-gray-100'
                  }`}>
                    <CreditCard className={`w-5 h-5 ${paymentMethod === 'transfer' ? 'text-white' : 'text-gray-500'}`} />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-semibold">Bank Transfer</p>
                    <p className="text-sm text-gray-500">Transfer to our bank account</p>
                  </div>
                  {paymentMethod === 'transfer' && <Check className="w-5 h-5 text-[#06a34c]" />}
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`w-full p-4 rounded-xl border-2 flex items-center gap-3 transition-all ${
                    paymentMethod === 'card'
                      ? 'border-[#06a34c] bg-[#06a34c]/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    paymentMethod === 'card' ? 'bg-[#06a34c]' : 'bg-gray-100'
                  }`}>
                    <CreditCard className={`w-5 h-5 ${paymentMethod === 'card' ? 'text-white' : 'text-gray-500'}`} />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-semibold">Card Payment</p>
                    <p className="text-sm text-gray-500">Pay with debit/credit card (Coming soon)</p>
                  </div>
                  {paymentMethod === 'card' && <Check className="w-5 h-5 text-[#06a34c]" />}
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <h2 className="text-lg font-bold mb-4">Order Summary</h2>
              
              {/* Items */}
              <div className="space-y-3 mb-4 max-h-60 overflow-auto">
                {items.map((item) => (
                  <div key={item.product.id} className="flex items-center gap-3">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{item.product.name}</p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-semibold text-sm">
                      ₦{((item.product.price + item.selectedAddOns.reduce((s, a) => s + a.price, 0)) * item.quantity).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₦{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee</span>
                  <span>{deliveryType === 'delivery' ? `₦${deliveryFee.toLocaleString()}` : 'Free'}</span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-[#06a34c]">₦{total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Estimated Time */}
              <div className="flex items-center gap-2 mt-4 p-3 bg-[#fff8e1] rounded-xl">
                <Clock className="w-5 h-5 text-[#f9c02d]" />
                <p className="text-sm">
                  Estimated preparation: <span className="font-semibold">{preparationTime}-{preparationTime + 15} mins</span>
                </p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || subtotal < minimumOrderAmount}
                className="w-full btn-primary mt-6 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="animate-pulse">Processing...</span>
                ) : (
                  <>
                    Place Order
                    <Check className="w-5 h-5" />
                  </>
                )}
              </button>

              {subtotal < minimumOrderAmount && (
                <p className="text-center text-sm text-red-500 mt-2">
                  Minimum order: ₦{minimumOrderAmount.toLocaleString()}
                </p>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
