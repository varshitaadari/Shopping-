import React, { useState } from 'react';
import { ShieldCheck, ArrowLeft, CheckCircle2, CreditCard, Banknote, Smartphone } from 'lucide-react';
import { CartItem, Order } from '../types';
import { ProductImage } from './ProductImage';

interface CheckoutViewProps {
  cartItems: CartItem[];
  onBackToCart: () => void;
  onPlaceOrder: (order: Order) => void;
}

export const CheckoutView: React.FC<CheckoutViewProps> = ({
  cartItems,
  onBackToCart,
  onPlaceOrder
}) => {
  const [formData, setFormData] = useState({
    name: 'Varshita Adari',
    mobile: '+1 (555) 392-8172',
    address: '42 Pine Crest Avenue, Apt 4B',
    city: 'Seattle',
    state: 'WA',
    pincode: '98101'
  });

  const [paymentMethod, setPaymentMethod] = useState<'Cash on Delivery' | 'Credit/Debit Card' | 'UPI / Net Banking'>('Credit/Debit Card');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const totalSavings = cartItems.reduce((sum, item) => {
    const savingsPerUnit =
      item.product.originalPrice > item.product.price
        ? item.product.originalPrice - item.product.price
        : 0;
    return sum + savingsPerUnit * item.quantity;
  }, 0);

  const shipping = subtotal >= 50 || subtotal === 0 ? 0 : 5;
  const grandTotal = subtotal + shipping;

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.mobile.trim()) newErrors.mobile = 'Mobile number is required';
    if (!formData.address.trim()) newErrors.address = 'Street address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State / Province is required';
    if (!formData.pincode.trim()) newErrors.pincode = 'Pincode / Postal code is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const newOrder: Order = {
        id: `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
        date: new Date().toISOString().split('T')[0],
        status: 'Order Placed',
        estimatedDelivery: 'Arriving in 3-4 business days',
        items: cartItems.map((item) => ({
          productId: item.product.id,
          name: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
          selectedColor: item.selectedColor,
          selectedSize: item.selectedSize,
          iconType: item.product.iconType
        })),
        subtotal,
        discount: totalSavings,
        shipping,
        total: grandTotal,
        customer: { ...formData },
        paymentMethod
      };

      onPlaceOrder(newOrder);
      setIsSubmitting(false);
    }, 400);
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-800">Your cart is empty</h2>
        <p className="text-sm text-slate-500">Add some products before proceeding to checkout.</p>
        <button
          type="button"
          onClick={onBackToCart}
          className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-semibold hover:bg-indigo-700"
        >
          Return to Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      {/* Back button */}
      <button
        type="button"
        onClick={onBackToCart}
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Shopping</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form: Delivery Address & Payment */}
        <div className="lg:col-span-7 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Step 1: Customer & Delivery Details */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-2xs">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
                <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold flex items-center justify-center">
                  1
                </span>
                <h2 className="text-base font-bold text-slate-900">Delivery Address</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. John Doe"
                    className={`w-full px-3.5 py-2 text-xs rounded-xl border ${
                      errors.name ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300'
                    } focus:outline-hidden focus:ring-2 focus:ring-indigo-500`}
                  />
                  {errors.name && <p className="text-[11px] text-rose-500 mt-1">{errors.name}</p>}
                </div>

                {/* Mobile */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    placeholder="e.g. +1 (555) 000-0000"
                    className={`w-full px-3.5 py-2 text-xs rounded-xl border ${
                      errors.mobile ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300'
                    } focus:outline-hidden focus:ring-2 focus:ring-indigo-500`}
                  />
                  {errors.mobile && <p className="text-[11px] text-rose-500 mt-1">{errors.mobile}</p>}
                </div>

                {/* Delivery Address */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Delivery Address *
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="House / Flat No., Street, Landmark"
                    className={`w-full px-3.5 py-2 text-xs rounded-xl border ${
                      errors.address ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300'
                    } focus:outline-hidden focus:ring-2 focus:ring-indigo-500`}
                  />
                  {errors.address && <p className="text-[11px] text-rose-500 mt-1">{errors.address}</p>}
                </div>

                {/* City */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="City name"
                    className={`w-full px-3.5 py-2 text-xs rounded-xl border ${
                      errors.city ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300'
                    } focus:outline-hidden focus:ring-2 focus:ring-indigo-500`}
                  />
                  {errors.city && <p className="text-[11px] text-rose-500 mt-1">{errors.city}</p>}
                </div>

                {/* State */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    State / Province *
                  </label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    placeholder="State or Region"
                    className={`w-full px-3.5 py-2 text-xs rounded-xl border ${
                      errors.state ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300'
                    } focus:outline-hidden focus:ring-2 focus:ring-indigo-500`}
                  />
                  {errors.state && <p className="text-[11px] text-rose-500 mt-1">{errors.state}</p>}
                </div>

                {/* Pincode */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Pincode / Postal Code *
                  </label>
                  <input
                    type="text"
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    placeholder="e.g. 98101 or 500081"
                    className={`w-full sm:w-1/2 px-3.5 py-2 text-xs rounded-xl border ${
                      errors.pincode ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300'
                    } focus:outline-hidden focus:ring-2 focus:ring-indigo-500`}
                  />
                  {errors.pincode && <p className="text-[11px] text-rose-500 mt-1">{errors.pincode}</p>}
                </div>
              </div>
            </div>

            {/* Step 2: Payment Method */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-2xs">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
                <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold flex items-center justify-center">
                  2
                </span>
                <h2 className="text-base font-bold text-slate-900">Select Payment Method</h2>
              </div>

              <div className="space-y-3">
                {[
                  {
                    id: 'Credit/Debit Card',
                    title: 'Credit / Debit Card',
                    description: 'Visa, Mastercard, Amex, RuPay supported',
                    icon: <CreditCard className="w-4 h-4 text-indigo-600" />
                  },
                  {
                    id: 'UPI / Net Banking',
                    title: 'UPI / Net Banking',
                    description: 'Google Pay, PhonePe, Paytm, or Net Banking',
                    icon: <Smartphone className="w-4 h-4 text-indigo-600" />
                  },
                  {
                    id: 'Cash on Delivery',
                    title: 'Cash on Delivery (COD)',
                    description: 'Pay safely with cash or card upon delivery',
                    icon: <Banknote className="w-4 h-4 text-indigo-600" />
                  }
                ].map((pm) => {
                  const isSelected = paymentMethod === pm.id;
                  return (
                    <label
                      key={pm.id}
                      className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'border-indigo-600 bg-indigo-50/40 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={isSelected}
                        onChange={() => setPaymentMethod(pm.id as any)}
                        className="mt-1 text-indigo-600 focus:ring-indigo-500"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          {pm.icon}
                          <span className="text-xs font-bold text-slate-900">{pm.title}</span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">{pm.description}</p>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Place Order CTA Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-98 transition-all shadow-md disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Confirming Order...</span>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Place Order (${grandTotal})</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Sidebar: Order Summary */}
        <div className="lg:col-span-5 bg-white border border-slate-200/80 rounded-2xl p-6 shadow-2xs space-y-5 sticky top-24">
          <h3 className="text-sm font-bold text-slate-900 pb-3 border-b border-slate-100">
            Order Summary ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)
          </h3>

          {/* Item Thumbnails List */}
          <div className="max-h-60 overflow-y-auto space-y-3 pr-1 no-scrollbar">
            {cartItems.map((item) => (
              <div
                key={`${item.product.id}-${item.selectedColor || ''}`}
                className="flex items-center gap-3 text-xs"
              >
                <div className="w-12 h-12 shrink-0">
                  <ProductImage
                    iconType={item.product.iconType}
                    name={item.product.name}
                    category={item.product.category}
                    aspect="square"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-slate-800 truncate">{item.product.name}</h4>
                  <p className="text-[11px] text-slate-400">Qty: {item.quantity}</p>
                </div>
                <span className="font-bold text-slate-900 tabular-nums">
                  ${item.product.price * item.quantity}
                </span>
              </div>
            ))}
          </div>

          {/* Price Breakdown */}
          <div className="pt-3 border-t border-slate-100 space-y-2 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Items Total</span>
              <span className="font-semibold text-slate-900 tabular-nums">${subtotal}</span>
            </div>
            {totalSavings > 0 && (
              <div className="flex justify-between text-emerald-700">
                <span>Promotional Discount</span>
                <span className="font-semibold tabular-nums">-${totalSavings}</span>
              </div>
            )}
            <div className="flex justify-between text-slate-600">
              <span>Delivery Charges</span>
              <span className="font-semibold text-slate-900 tabular-nums">
                {shipping === 0 ? 'FREE' : `$${shipping}`}
              </span>
            </div>
            <div className="flex justify-between text-sm font-bold text-slate-900 pt-3 border-t border-slate-200">
              <span>Grand Total</span>
              <span className="text-base text-indigo-600 tabular-nums">${grandTotal}</span>
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl flex items-center gap-2 text-[11px] text-slate-600">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Guaranteed safe checkout & 30-day effortless returns.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
