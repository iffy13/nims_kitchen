import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { MapPin, Phone, User, Banknote, Landmark, Truck, Store, Clock, Calendar, ChevronDown, Check, AlertCircle, MessageCircle } from 'lucide-react';
import { useCart } from '@/store/cartContext';
import { business } from '@/config/business';
import { formatNaira, isOpenNow, validateSchedule } from '@/lib/business';
import { lineTotal } from '@/lib/cart';
import { buildOrderMessage, newOrderId, whatsappLink } from '@/lib/whatsapp';
import type { Order, PaymentMethod, DeliveryType } from '@/types';
import { toast } from 'sonner';

const inputBase =
  'w-full py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#06a34c] transition-all';

const todayInLagos = () => new Intl.DateTimeFormat('en-CA', { timeZone: business.timeZone }).format(new Date());

const formatSchedule = (date: string, time: string) =>
  new Date(`${date}T${time}:00+01:00`).toLocaleString('en-NG', {
    timeZone: business.timeZone,
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    hour: 'numeric',
    minute: '2-digit',
  });

export default function Checkout() {
  const navigate = useNavigate();
  const { items, subtotal, clearCart } = useCart();
  const { deliveryFee, minimumOrderAmount, preparationTime, deliveryAreas } = business;

  const [deliveryType, setDeliveryType] = useState<DeliveryType>('delivery');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const openNow = isOpenNow();
  const [showSchedule, setShowSchedule] = useState(!openNow);

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    area: '',
    address: '',
    notes: '',
    scheduledDate: '',
    scheduledTime: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (field: keyof typeof formData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setFormData((f) => ({ ...f, [field]: e.target.value }));

  const fee = deliveryType === 'delivery' ? deliveryFee : 0;
  const total = subtotal + fee;

  if (items.length === 0 && !isSubmitting) {
    return <Navigate to="/cart" replace />;
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';

    const phone = formData.phone.replace(/[\s-]/g, '');
    if (!phone) newErrors.phone = 'Phone number is required';
    else if (!/^(0\d{10}|\+?234\d{10})$/.test(phone)) newErrors.phone = 'Enter a valid Nigerian number, e.g. 08012345678';

    if (deliveryType === 'delivery') {
      if (!formData.area) newErrors.area = 'Please choose your area';
      if (!formData.address.trim()) newErrors.address = 'Delivery address is required';
    }

    if (showSchedule) {
      const err = validateSchedule(formData.scheduledDate, formData.scheduledTime);
      if (err) newErrors.schedule = err;
    } else if (!openNow) {
      newErrors.schedule = "We're closed right now — please schedule your order for later";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (subtotal < minimumOrderAmount) return;

    if (!validateForm()) {
      if (!openNow && !showSchedule) setShowSchedule(true);
      toast.error('Please check the highlighted fields');
      return;
    }

    setIsSubmitting(true);

    const order: Order = {
      id: newOrderId(),
      items,
      customerInfo: {
        fullName: formData.fullName.trim(),
        phone: formData.phone.trim(),
        ...(deliveryType === 'delivery' && { area: formData.area, address: formData.address.trim() }),
      },
      deliveryType,
      deliveryFee: fee,
      subtotal,
      total,
      paymentMethod,
      createdAt: new Date().toISOString(),
      scheduledFor: showSchedule ? formatSchedule(formData.scheduledDate, formData.scheduledTime) : undefined,
      notes: formData.notes.trim() || undefined,
    };

    const link = whatsappLink(buildOrderMessage(order));

    // Open WhatsApp straight away (must happen inside the click for browsers to allow it).
    // If it's blocked, the success page has a big "Send on WhatsApp" button as a fallback.
    window.open(link, '_blank', 'noopener');

    navigate('/order-success', { state: { order, link }, replace: true });
    clearCart();
  };

  return (
    <div className="min-h-screen pt-20 pb-24 lg:pb-12">
      <div className="section-padding py-8">
        <h1 className="text-3xl font-bold mb-2">Checkout</h1>
        <p className="text-gray-600 mb-8 flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-[#25D366]" />
          Your order will open in WhatsApp, ready to send to us.
        </p>

        {!openNow && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-red-700">We are currently closed</p>
              <p className="text-sm text-red-600">
                {business.hoursText.join(' · ')}. You can still schedule your order for later below.
              </p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Type */}
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <h2 className="text-lg font-bold mb-4">Delivery Options</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {([
                  { value: 'delivery', icon: Truck, title: 'Delivery', price: formatNaira(deliveryFee), note: 'We deliver within Ikere Ekiti' },
                  { value: 'pickup', icon: Store, title: 'Pickup', price: 'Free', note: `Pick up at ${business.pickupLocation}` },
                ] as const).map((opt) => {
                  const active = deliveryType === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      aria-pressed={active}
                      onClick={() => setDeliveryType(opt.value)}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${
                        active ? 'border-[#06a34c] bg-[#06a34c]/5' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${active ? 'bg-[#06a34c]' : 'bg-gray-100'}`}>
                          <opt.icon className={`w-5 h-5 ${active ? 'text-white' : 'text-gray-500'}`} />
                        </div>
                        <div>
                          <p className="font-semibold">{opt.title}</p>
                          <p className="text-sm text-gray-500">{opt.price}</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">{opt.note}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <h2 className="text-lg font-bold mb-4">Contact Information</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      id="fullName"
                      type="text"
                      autoComplete="name"
                      value={formData.fullName}
                      onChange={set('fullName')}
                      placeholder="Enter your full name"
                      className={`${inputBase} pl-12 pr-4 ${errors.fullName ? 'ring-2 ring-red-500' : ''}`}
                    />
                  </div>
                  {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      id="phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      value={formData.phone}
                      onChange={set('phone')}
                      placeholder="e.g. 08012345678"
                      className={`${inputBase} pl-12 pr-4 ${errors.phone ? 'ring-2 ring-red-500' : ''}`}
                    />
                  </div>
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>
              </div>
            </div>

            {/* Delivery Address */}
            {deliveryType === 'delivery' && (
              <div className="bg-white rounded-2xl p-6 shadow-md">
                <h2 className="text-lg font-bold mb-4">Delivery Address</h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="area" className="block text-sm font-medium text-gray-700 mb-1">
                      Area <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="area"
                      value={formData.area}
                      onChange={set('area')}
                      className={`${inputBase} px-4 ${errors.area ? 'ring-2 ring-red-500' : ''}`}
                    >
                      <option value="">Choose your area…</option>
                      {deliveryAreas.map((a) => (
                        <option key={a} value={a}>{a}</option>
                      ))}
                    </select>
                    {errors.area && <p className="text-red-500 text-sm mt-1">{errors.area}</p>}
                  </div>
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                      Address / landmark <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                      <textarea
                        id="address"
                        autoComplete="street-address"
                        value={formData.address}
                        onChange={set('address')}
                        placeholder="House number, street, hostel or nearest landmark"
                        rows={3}
                        className={`${inputBase} pl-12 pr-4 resize-none ${errors.address ? 'ring-2 ring-red-500' : ''}`}
                      />
                    </div>
                    {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                    <p className="text-sm text-gray-500 mt-2">
                      Not on the list? Message us on WhatsApp and we&apos;ll let you know if we can reach you.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Schedule Order */}
            <div className={`bg-white rounded-2xl p-6 shadow-md ${errors.schedule ? 'ring-2 ring-red-500' : ''}`}>
              <button
                type="button"
                aria-expanded={showSchedule}
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
                      {showSchedule ? 'Choose when you want it' : 'Order for later (optional)'}
                    </p>
                  </div>
                </div>
                <ChevronDown className={`w-5 h-5 transition-transform ${showSchedule ? 'rotate-180' : ''}`} />
              </button>

              {showSchedule && (
                <div className="mt-4 grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="scheduledDate" className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <input
                      id="scheduledDate"
                      type="date"
                      value={formData.scheduledDate}
                      onChange={set('scheduledDate')}
                      min={todayInLagos()}
                      className={`${inputBase} px-4`}
                    />
                  </div>
                  <div>
                    <label htmlFor="scheduledTime" className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                    <input
                      id="scheduledTime"
                      type="time"
                      value={formData.scheduledTime}
                      onChange={set('scheduledTime')}
                      className={`${inputBase} px-4`}
                    />
                  </div>
                  <p className="sm:col-span-2 text-sm text-gray-500">{business.hoursText.join(' · ')}</p>
                </div>
              )}
              {errors.schedule && <p className="text-red-500 text-sm mt-3">{errors.schedule}</p>}
            </div>

            {/* Order Notes */}
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <label htmlFor="notes" className="block text-lg font-bold mb-4">Order Notes (Optional)</label>
              <textarea
                id="notes"
                value={formData.notes}
                onChange={set('notes')}
                placeholder="Any special instructions for your order..."
                rows={3}
                className={`${inputBase} px-4 resize-none`}
              />
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <h2 className="text-lg font-bold mb-4">Payment Method</h2>
              <div className="space-y-3">
                {([
                  { value: 'cod', icon: Banknote, title: deliveryType === 'delivery' ? 'Pay on Delivery' : 'Pay on Pickup', note: 'Cash or transfer when you receive your order' },
                  { value: 'transfer', icon: Landmark, title: 'Bank Transfer', note: "We'll send our account details on WhatsApp" },
                ] as const).map((opt) => {
                  const active = paymentMethod === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      aria-pressed={active}
                      onClick={() => setPaymentMethod(opt.value)}
                      className={`w-full p-4 rounded-xl border-2 flex items-center gap-3 transition-all ${
                        active ? 'border-[#06a34c] bg-[#06a34c]/5' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${active ? 'bg-[#06a34c]' : 'bg-gray-100'}`}>
                        <opt.icon className={`w-5 h-5 ${active ? 'text-white' : 'text-gray-500'}`} />
                      </div>
                      <div className="flex-1 text-left">
                        <p className="font-semibold">{opt.title}</p>
                        <p className="text-sm text-gray-500">{opt.note}</p>
                      </div>
                      {active && <Check className="w-5 h-5 text-[#06a34c]" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <h2 className="text-lg font-bold mb-4">Order Summary</h2>

              <div className="space-y-3 mb-4 max-h-60 overflow-auto">
                {items.map((item) => (
                  <div key={item.lineId} className="flex items-center gap-3">
                    <img src={item.product.image} alt="" className="w-12 h-12 rounded-lg object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{item.product.name}</p>
                      <p className="text-xs text-gray-500">
                        Qty: {item.quantity}
                        {item.selectedAddOns.length > 0 && ` · + ${item.selectedAddOns.map((a) => a.name).join(', ')}`}
                      </p>
                    </div>
                    <p className="font-semibold text-sm">{formatNaira(lineTotal(item))}</p>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>{formatNaira(subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee</span>
                  <span>{fee ? formatNaira(fee) : 'Free'}</span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-[#06a34c]">{formatNaira(total)}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-4 p-3 bg-[#fff8e1] rounded-xl">
                <Clock className="w-5 h-5 text-[#f9c02d]" />
                <p className="text-sm">
                  Estimated preparation: <span className="font-semibold">{preparationTime}–{preparationTime + 15} mins</span>
                </p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || subtotal < minimumOrderAmount}
                className="w-full mt-6 flex items-center justify-center gap-2 rounded-full px-6 py-3 font-semibold text-white bg-[#25D366] hover:bg-[#1ebe5b] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <MessageCircle className="w-5 h-5" />
                Place Order on WhatsApp
              </button>

              {subtotal < minimumOrderAmount && (
                <p className="text-center text-sm text-red-500 mt-2">
                  Minimum order: {formatNaira(minimumOrderAmount)}
                </p>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
