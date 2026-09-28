import React, { useState } from 'react';
import { X, Star, ShoppingBag, Zap, ShieldCheck, Truck, RotateCcw, Check } from 'lucide-react';
import { Product } from '../types';
import { ProductImage } from './ProductImage';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, color?: string, size?: string) => void;
  onBuyNow: (product: Product, quantity: number, color?: string, size?: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onBuyNow
}) => {
  if (!product) return null;

  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    product.colors?.[0]?.name
  );
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    product.sizes?.[0]
  );

  const handleIncrement = () => setQuantity((prev) => Math.min(prev + 1, product.stockCount || 10));
  const handleDecrement = () => setQuantity((prev) => Math.max(prev - 1, 1));

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
      <div
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: Visual Image Container */}
          <div className="p-6 sm:p-8 bg-slate-50/70 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-slate-100">
            <div className="w-full max-w-sm">
              <ProductImage
                iconType={product.iconType}
                name={product.name}
                category={product.category}
                aspect="square"
                className="shadow-xl"
              />
            </div>

            {/* Quick reassurance trust markers */}
            <div className="grid grid-cols-3 gap-2 w-full max-w-sm mt-6 text-center">
              <div className="p-2.5 rounded-xl bg-white border border-slate-200/60 shadow-2xs">
                <Truck className="w-4 h-4 mx-auto text-indigo-600 mb-1" />
                <span className="block text-[10px] font-medium text-slate-600">Free Express</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-slate-200/60 shadow-2xs">
                <ShieldCheck className="w-4 h-4 mx-auto text-indigo-600 mb-1" />
                <span className="block text-[10px] font-medium text-slate-600">1-Yr Warranty</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-slate-200/60 shadow-2xs">
                <RotateCcw className="w-4 h-4 mx-auto text-indigo-600 mb-1" />
                <span className="block text-[10px] font-medium text-slate-600">30-Day Return</span>
              </div>
            </div>
          </div>

          {/* Right: Product Purchase Module */}
          <div className="p-6 sm:p-8 flex flex-col justify-between">
            <div>
              {/* Brand & Category */}
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                <span className="font-semibold text-indigo-600 uppercase tracking-wider">{product.brand}</span>
                <span aria-hidden="true" className="text-slate-300">/</span>
                <span>{product.category}</span>
                {product.badge && (
                  <>
                    <span aria-hidden="true" className="text-slate-300">/</span>
                    <span className="font-medium text-emerald-700">{product.badge}</span>
                  </>
                )}
              </div>

              {/* Title */}
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                {product.name}
              </h2>

              {/* Rating & Stock */}
              <div className="flex items-center gap-3 mt-3">
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-50 text-amber-900 border border-amber-200/60 text-xs">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="font-bold tabular-nums">{product.rating}</span>
                  <span className="text-amber-700">({product.reviewCount} customer reviews)</span>
                </div>
                <span className={`text-xs font-semibold ${product.inStock ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {product.inStock ? `In Stock (${product.stockCount} left)` : 'Out of Stock'}
                </span>
              </div>

              {/* Price Block */}
              <div className="flex items-baseline gap-3 mt-4 pt-4 border-t border-slate-100">
                <span className="text-3xl font-extrabold text-slate-900 tabular-nums">
                  ${product.price}
                </span>
                {product.originalPrice > product.price && (
                  <>
                    <span className="text-base text-slate-400 line-through tabular-nums">
                      ${product.originalPrice}
                    </span>
                    <span className="px-2 py-0.5 text-xs font-bold bg-amber-100 text-amber-800 rounded-md">
                      Save {product.discountPercentage}%
                    </span>
                  </>
                )}
              </div>

              {/* Description */}
              <p className="mt-4 text-sm text-slate-600 leading-relaxed">
                {product.description}
              </p>

              {/* Color Selection if available */}
              {product.colors && product.colors.length > 0 && (
                <div className="mt-5">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-semibold text-slate-800">Color Variant:</span>
                    <span className="text-slate-500 font-medium">{selectedColor}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {product.colors.map((c) => {
                      const isSelected = selectedColor === c.name;
                      return (
                        <button
                          key={c.name}
                          type="button"
                          onClick={() => setSelectedColor(c.name)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                            isSelected
                              ? 'border-indigo-600 bg-indigo-50/50 text-indigo-950 font-semibold'
                              : 'border-slate-200 text-slate-700 hover:border-slate-300'
                          }`}
                        >
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-black/10 inline-block"
                            style={{ backgroundColor: c.hex }}
                          />
                          <span>{c.name}</span>
                          {isSelected && <Check className="w-3 h-3 text-indigo-600 ml-0.5" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Size Selection if available */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mt-5">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-semibold text-slate-800">Available Sizes:</span>
                    <span className="text-slate-500 font-medium">{selectedSize}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((s) => {
                      const isSelected = selectedSize === s;
                      return (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setSelectedSize(s)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                            isSelected
                              ? 'border-indigo-600 bg-indigo-600 text-white font-semibold shadow-xs'
                              : 'border-slate-200 text-slate-700 hover:border-slate-300'
                          }`}
                        >
                          {s}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Quantity Stepper */}
              <div className="mt-5">
                <span className="block text-xs font-semibold text-slate-800 mb-2">Quantity</span>
                <div className="inline-flex items-center rounded-lg border border-slate-200 bg-slate-50 p-1">
                  <button
                    type="button"
                    onClick={handleDecrement}
                    className="w-8 h-8 flex items-center justify-center rounded-md bg-white text-slate-700 font-bold hover:bg-slate-100 active:scale-95 transition-all text-sm disabled:opacity-50"
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span className="w-10 text-center text-sm font-bold text-slate-900 tabular-nums">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={handleIncrement}
                    className="w-8 h-8 flex items-center justify-center rounded-md bg-white text-slate-700 font-bold hover:bg-slate-100 active:scale-95 transition-all text-sm disabled:opacity-50"
                    disabled={quantity >= (product.stockCount || 10)}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="grid grid-cols-2 gap-3 mt-8 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => {
                  onAddToCart(product, quantity, selectedColor, selectedSize);
                  onClose();
                }}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 active:scale-98 transition-all"
              >
                <ShoppingBag className="w-4 h-4 text-slate-700" />
                <span>Add to Cart</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  onBuyNow(product, quantity, selectedColor, selectedSize);
                  onClose();
                }}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-98 transition-all shadow-md"
              >
                <Zap className="w-4 h-4 fill-current" />
                <span>Buy Now</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
