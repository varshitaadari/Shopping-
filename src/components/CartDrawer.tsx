import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';
import { CartItem } from '../types';
import { ProductImage } from './ProductImage';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onProceedToCheckout: () => void;
  onBrowseProducts: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  onBrowseProducts
}) => {
  if (!isOpen) return null;

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

  const freeShippingThreshold = 50;
  const isFreeShipping = subtotal >= freeShippingThreshold || subtotal === 0;
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const shipping = isFreeShipping ? 0 : 5;
  const grandTotal = subtotal + shipping;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-xs flex justify-end">
      <div
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-indigo-600" />
            <h2 className="text-base font-bold text-slate-900">Your Shopping Cart</h2>
            <span className="px-2 py-0.5 text-xs font-semibold bg-slate-100 text-slate-700 rounded-full tabular-nums">
              {cartItems.reduce((acc, curr) => acc + curr.quantity, 0)}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors"
            aria-label="Close cart drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Meter */}
        <div className="px-5 py-2.5 bg-slate-50 border-b border-slate-200/60 text-xs">
          {subtotal === 0 ? (
            <span className="text-slate-600">Free delivery on all orders over $50</span>
          ) : isFreeShipping ? (
            <span className="font-semibold text-emerald-700 flex items-center gap-1.5">
              <span>🎉</span> You unlocked FREE Standard Delivery!
            </span>
          ) : (
            <div className="space-y-1">
              <div className="flex justify-between text-slate-600">
                <span>Add <strong className="text-indigo-600 tabular-nums">${amountToFreeShipping}</strong> more for Free Shipping</span>
                <span className="font-semibold text-slate-800 tabular-nums">
                  {Math.round((subtotal / freeShippingThreshold) * 100)}%
                </span>
              </div>
              <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-600 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-800">Your cart is empty</h3>
                <p className="text-xs text-slate-500 max-w-xs mx-auto mt-1">
                  Discover thousands of products across 20 curated categories.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onBrowseProducts();
                }}
                className="px-5 py-2.5 text-xs font-semibold bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors shadow-sm"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={`${item.product.id}-${item.selectedColor || ''}-${item.selectedSize || ''}`}
                className="flex gap-3 p-3 rounded-xl border border-slate-200/80 bg-white hover:border-slate-300 transition-colors"
              >
                {/* Visual Thumbnail */}
                <div className="w-20 h-20 shrink-0">
                  <ProductImage
                    iconType={item.product.iconType}
                    name={item.product.name}
                    category={item.product.category}
                    aspect="square"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-xs font-semibold text-slate-900 line-clamp-1">
                        {item.product.name}
                      </h4>
                      <button
                        type="button"
                        onClick={() => onRemoveItem(item.product.id)}
                        className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                      <span className="font-medium text-slate-600">{item.product.brand}</span>
                      {(item.selectedColor || item.selectedSize) && (
                        <>
                          <span aria-hidden="true" className="text-slate-300">·</span>
                          <span>
                            {[item.selectedColor, item.selectedSize].filter(Boolean).join(' / ')}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Quantity & Unit Price */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center rounded-lg border border-slate-200 bg-slate-50 p-0.5">
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                        className="w-6 h-6 flex items-center justify-center rounded bg-white text-slate-600 hover:bg-slate-100 transition-colors text-xs"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center text-xs font-bold text-slate-900 tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                        className="w-6 h-6 flex items-center justify-center rounded bg-white text-slate-600 hover:bg-slate-100 transition-colors text-xs"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="text-sm font-bold text-slate-900 tabular-nums">
                        ${item.product.price * item.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary & Checkout */}
        {cartItems.length > 0 && (
          <div className="p-5 border-t border-slate-200 bg-slate-50/70 space-y-3">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-900 tabular-nums">${subtotal}</span>
              </div>
              {totalSavings > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Discount Savings</span>
                  <span className="font-semibold tabular-nums">-${totalSavings}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-600">
                <span>Shipping</span>
                <span className="font-semibold text-slate-900 tabular-nums">
                  {shipping === 0 ? 'FREE' : `$${shipping}`}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-slate-900 pt-2 border-t border-slate-200">
                <span>Total Amount</span>
                <span className="text-base text-indigo-600 tabular-nums">${grandTotal}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                onClose();
                onProceedToCheckout();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-98 transition-all shadow-md"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>256-bit encrypted secure checkout</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
