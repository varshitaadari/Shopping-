import React, { useState } from 'react';
import {
  Search,
  ShoppingBag,
  User,
  Package,
  Menu,
  X,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { User as UserType } from '../types';

interface NavbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSearchSubmit: () => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenAuth: () => void;
  currentUser: UserType | null;
  activeView: 'home' | 'catalog' | 'checkout' | 'orders';
  onNavigate: (view: 'home' | 'catalog' | 'orders') => void;
  onSelectCategory: (cat: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  cartCount,
  onOpenCart,
  onOpenAuth,
  currentUser,
  activeView,
  onNavigate,
  onSelectCategory
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearchSubmit();
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      {/* Top Notice Banner */}
      <div className="bg-slate-900 text-white text-[11px] py-1.5 px-4 text-center font-medium tracking-wide">
        <span>✨ Welcome to SmartShop — Free Shipping on Orders Over $50 · 30-Day Hassle-Free Returns</span>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 gap-3 sm:gap-6">
          {/* Zone 1: Brand Wordmark */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => {
                onNavigate('home');
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 group text-left"
            >
              <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black text-lg shadow-sm group-hover:bg-indigo-700 transition-colors">
                S
              </div>
              <div>
                <span className="text-xl font-extrabold tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
                  SmartShop
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: Search Bar */}
          <div className="flex-1 max-w-xl hidden md:block">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                onKeyDown={handleSearchKeyDown}
                placeholder="Search products by name, category, or brand..."
                className="w-full pl-10 pr-24 py-2 text-xs rounded-xl bg-slate-100 hover:bg-slate-100/80 focus:bg-white border border-transparent focus:border-indigo-500 focus:outline-hidden transition-all text-slate-900 placeholder:text-slate-400"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
              {searchQuery ? (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  className="absolute right-14 top-2 text-[11px] text-slate-400 hover:text-slate-700 px-1 py-0.5"
                >
                  Clear
                </button>
              ) : null}
              <button
                type="button"
                onClick={onSearchSubmit}
                className="absolute right-1.5 top-1 px-3 py-1 bg-indigo-600 text-white rounded-lg text-[11px] font-semibold hover:bg-indigo-700 transition-colors"
              >
                Search
              </button>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-5 text-xs font-semibold text-slate-600">
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className={`hover:text-slate-900 transition-colors ${
                activeView === 'home' ? 'text-indigo-600 font-bold' : ''
              }`}
            >
              Home
            </button>
            <button
              type="button"
              onClick={() => {
                onSelectCategory('All');
                onNavigate('catalog');
              }}
              className={`hover:text-slate-900 transition-colors ${
                activeView === 'catalog' ? 'text-indigo-600 font-bold' : ''
              }`}
            >
              All Products
            </button>
            <button
              type="button"
              onClick={() => onNavigate('orders')}
              className={`flex items-center gap-1 hover:text-slate-900 transition-colors ${
                activeView === 'orders' ? 'text-indigo-600 font-bold' : ''
              }`}
            >
              <Package className="w-3.5 h-3.5" />
              <span>Orders</span>
            </button>
          </nav>

          {/* Zone 3: Actions (Auth & Cart) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Account button */}
            <button
              type="button"
              onClick={onOpenAuth}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <User className="w-4 h-4 text-slate-500" />
              <span className="hidden sm:inline">
                {currentUser ? currentUser.name.split(' ')[0] : 'Sign In'}
              </span>
            </button>

            {/* Cart Button */}
            <button
              type="button"
              onClick={onOpenCart}
              className="relative flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 active:scale-95 transition-all shadow-sm"
              aria-label="View shopping cart"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Cart</span>
              <span className="px-1.5 py-0.2 bg-indigo-500 text-white rounded-full text-[10px] font-extrabold tabular-nums">
                {cartCount}
              </span>
            </button>

            {/* Mobile menu toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 lg:hidden text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar Row */}
        <div className="pb-3 md:hidden">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onKeyDown={handleSearchKeyDown}
              placeholder="Search products or categories..."
              className="w-full pl-9 pr-18 py-2 text-xs rounded-xl bg-slate-100 border border-transparent focus:border-indigo-500 focus:outline-hidden text-slate-900 placeholder:text-slate-400"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <button
              type="button"
              onClick={onSearchSubmit}
              className="absolute right-1 top-1 px-2.5 py-1 bg-indigo-600 text-white rounded-lg text-[11px] font-semibold"
            >
              Go
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-3">
          <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
            <button
              type="button"
              onClick={() => {
                onNavigate('home');
                setMobileMenuOpen(false);
              }}
              className="p-2.5 text-left rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-800"
            >
              Home
            </button>
            <button
              type="button"
              onClick={() => {
                onSelectCategory('All');
                onNavigate('catalog');
                setMobileMenuOpen(false);
              }}
              className="p-2.5 text-left rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-800"
            >
              All Products
            </button>
            <button
              type="button"
              onClick={() => {
                onNavigate('orders');
                setMobileMenuOpen(false);
              }}
              className="p-2.5 text-left rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-800 flex items-center justify-between"
            >
              <span>My Orders</span>
              <Package className="w-3.5 h-3.5 text-slate-500" />
            </button>
            <button
              type="button"
              onClick={() => {
                onOpenAuth();
                setMobileMenuOpen(false);
              }}
              className="p-2.5 text-left rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-800 flex items-center justify-between"
            >
              <span>{currentUser ? currentUser.name : 'Sign In'}</span>
              <User className="w-3.5 h-3.5 text-slate-500" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
