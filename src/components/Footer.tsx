import React from 'react';
import { ShieldCheck, Truck, RotateCcw, Headphones } from 'lucide-react';
import { CATEGORIES } from '../data/categories';

interface FooterProps {
  onSelectCategory: (categoryName: string) => void;
  onNavigate: (view: 'home' | 'catalog' | 'orders') => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onNavigate
}) => {
  return (
    <footer className="border-t border-slate-200 bg-white text-slate-600 text-xs">
      {/* Trust reassurance banner */}
      <div className="border-b border-slate-100 bg-slate-50/60 py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900">Fast & Free Shipping</h4>
              <p className="text-[11px] text-slate-500">Free standard shipping on orders over $50</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900">100% Secure Checkout</h4>
              <p className="text-[11px] text-slate-500">Bank-grade encryption & multiple payment methods</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900">30-Day Easy Returns</h4>
              <p className="text-[11px] text-slate-500">Instant doorstep pickup and rapid refunds</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900">24/7 Priority Support</h4>
              <p className="text-[11px] text-slate-500">Dedicated assistance for all orders</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
        {/* Brand Column */}
        <div className="col-span-2 space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-extrabold text-sm">
              S
            </div>
            <span className="text-base font-bold text-slate-900">SmartShop</span>
          </div>
          <p className="text-xs text-slate-500 max-w-sm leading-relaxed">
            Your destination for authentic everyday products, curated across 20 distinct lifestyle departments. Simple, reliable, and straightforward shopping.
          </p>
          <p className="text-[11px] text-slate-400 pt-2">
            Need support? Email support@smartshop.com
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-3">Quick Links</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button
                type="button"
                onClick={() => onNavigate('home')}
                className="hover:text-slate-900 transition-colors"
              >
                Home
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onNavigate('catalog')}
                className="hover:text-slate-900 transition-colors"
              >
                All Products
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onNavigate('orders')}
                className="hover:text-slate-900 transition-colors"
              >
                Track Orders
              </button>
            </li>
          </ul>
        </div>

        {/* Popular Categories Col 1 */}
        <div>
          <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-3">Top Categories</h4>
          <ul className="space-y-2 text-xs">
            {CATEGORIES.slice(0, 5).map((cat) => (
              <li key={cat.id}>
                <button
                  type="button"
                  onClick={() => onSelectCategory(cat.name)}
                  className="hover:text-slate-900 transition-colors text-left"
                >
                  {cat.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Popular Categories Col 2 */}
        <div>
          <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-3">Lifestyle</h4>
          <ul className="space-y-2 text-xs">
            {CATEGORIES.slice(5, 10).map((cat) => (
              <li key={cat.id}>
                <button
                  type="button"
                  onClick={() => onSelectCategory(cat.name)}
                  className="hover:text-slate-900 transition-colors text-left"
                >
                  {cat.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Customer Care */}
        <div>
          <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-3">Customer Care</h4>
          <ul className="space-y-2 text-xs">
            <li className="hover:text-slate-900 cursor-pointer">Shipping Policy</li>
            <li className="hover:text-slate-900 cursor-pointer">Returns & Exchanges</li>
            <li className="hover:text-slate-900 cursor-pointer">Warranty & Service</li>
            <li className="hover:text-slate-900 cursor-pointer">Privacy & Terms</li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-200 py-6 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <span>© 2026 SmartShop Inc. All rights reserved. Simple, secure e-commerce.</span>
          <div className="flex items-center gap-4">
            <span>Cash on Delivery</span>
            <span aria-hidden="true">·</span>
            <span>Cards</span>
            <span aria-hidden="true">·</span>
            <span>UPI / Net Banking</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
