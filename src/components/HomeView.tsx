import React from 'react';
import {
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  Percent,
  TrendingUp,
  Headphones,
  Laptop,
  Shirt,
  Sparkle,
  Watch,
  Grid
} from 'lucide-react';
import { Product, CategoryInfo } from '../types';
import { CATEGORIES } from '../data/categories';
import { ProductCard } from './ProductCard';

interface HomeViewProps {
  featuredProducts: Product[];
  popularProducts: Product[];
  specialOfferProducts: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, e?: React.MouseEvent) => void;
  onBuyNow: (product: Product, e?: React.MouseEvent) => void;
  onSelectCategory: (categoryName: string) => void;
  onNavigateToCatalog: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  featuredProducts,
  popularProducts,
  specialOfferProducts,
  onSelectProduct,
  onAddToCart,
  onBuyNow,
  onSelectCategory,
  onNavigateToCatalog
}) => {
  return (
    <div className="space-y-12 pb-16">
      {/* 1. Hero Campaign Banner */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl mx-4 sm:mx-6 mt-4 p-8 sm:p-12 border border-slate-800 shadow-xl">
        {/* Ambient radial glow */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-sky-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white/90 text-xs font-semibold backdrop-blur-md border border-white/15">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Autumn 2026 Collection · Up to 35% Off</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight text-white">
            Smart Products for Smarter Living.
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed">
            Discover curated electronics, daily fashion, home essentials, and lifestyle accessories across 20 distinct categories with fast delivery.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="button"
              onClick={onNavigateToCatalog}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-950 font-bold rounded-xl text-xs hover:bg-slate-100 active:scale-95 transition-all shadow-md"
            >
              <span>Explore All Products</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => onSelectCategory('Electronics')}
              className="inline-flex items-center gap-2 px-5 py-3 bg-white/10 text-white font-semibold rounded-xl text-xs hover:bg-white/20 active:scale-95 transition-all backdrop-blur-sm border border-white/10"
            >
              <span>Shop Electronics</span>
            </button>
          </div>
        </div>

        {/* Floating Quick Trust Highlights */}
        <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10 pt-8 border-t border-white/10 text-xs">
          <div className="flex items-center gap-2.5 text-slate-300">
            <Truck className="w-4 h-4 text-indigo-400 shrink-0" />
            <span>Free Delivery Over $50</span>
          </div>
          <div className="flex items-center gap-2.5 text-slate-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>100% Genuine Products</span>
          </div>
          <div className="flex items-center gap-2.5 text-slate-300">
            <RotateCcw className="w-4 h-4 text-amber-400 shrink-0" />
            <span>30-Day Hassle Returns</span>
          </div>
          <div className="flex items-center gap-2.5 text-slate-300">
            <Percent className="w-4 h-4 text-rose-400 shrink-0" />
            <span>Best Market Discounts</span>
          </div>
        </div>
      </section>

      {/* 2. Explore All 20 Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600 mb-1">
              <Grid className="w-3.5 h-3.5" />
              <span>Browse Catalog</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Explore 20 Product Categories
            </h2>
          </div>
          <button
            type="button"
            onClick={onNavigateToCatalog}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 transition-colors"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelectCategory(cat.name)}
              className="group text-left p-3.5 rounded-2xl bg-white border border-slate-200/80 hover:border-indigo-300 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-700 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors mb-2.5">
                  <span className="font-bold text-xs uppercase">{cat.name.slice(0, 2)}</span>
                </div>
                <h3 className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
                  {cat.name}
                </h3>
              </div>
              <span className="text-[11px] text-slate-400 mt-2 block font-medium">
                {cat.itemCount}+ Items
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* 3. Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Handpicked by Experts</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Featured Products
            </h2>
          </div>
          <button
            type="button"
            onClick={onNavigateToCatalog}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 transition-colors"
          >
            <span>Browse More</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {featuredProducts.slice(0, 8).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelectProduct={onSelectProduct}
              onAddToCart={onAddToCart}
              onBuyNow={onBuyNow}
            />
          ))}
        </div>
      </section>

      {/* 4. Special Offers Promotional Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 rounded-3xl p-6 sm:p-10 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider">
              Limited Time Deals
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold">
              Save Up to 35% on Premium Gear
            </h3>
            <p className="text-xs sm:text-sm text-white/90 max-w-lg">
              Enjoy verified instant discounts on headphones, smartwatches, coffee equipment, and everyday essentials.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onSelectCategory('Watches')}
            className="px-6 py-3 bg-white text-slate-950 font-bold text-xs rounded-xl hover:bg-slate-100 active:scale-95 transition-all shadow-md shrink-0"
          >
            View Special Deals
          </button>
        </div>
      </section>

      {/* 5. Special Offers Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-600 mb-1">
              <Percent className="w-3.5 h-3.5" />
              <span>Unbeatable Values</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Special Offers & Daily Deals
            </h2>
          </div>
          <button
            type="button"
            onClick={onNavigateToCatalog}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 transition-colors"
          >
            <span>See All Deals</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {specialOfferProducts.slice(0, 4).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelectProduct={onSelectProduct}
              onAddToCart={onAddToCart}
              onBuyNow={onBuyNow}
            />
          ))}
        </div>
      </section>

      {/* 6. Popular Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600 mb-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Trending Now</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Popular Products
            </h2>
          </div>
          <button
            type="button"
            onClick={onNavigateToCatalog}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 transition-colors"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {popularProducts.slice(0, 4).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelectProduct={onSelectProduct}
              onAddToCart={onAddToCart}
              onBuyNow={onBuyNow}
            />
          ))}
        </div>
      </section>
    </div>
  );
};
