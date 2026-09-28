import React from 'react';
import { Star, ShoppingBag, Zap } from 'lucide-react';
import { Product } from '../types';
import { ProductImage } from './ProductImage';

interface ProductCardProps {
  product: Product;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, e?: React.MouseEvent) => void;
  onBuyNow: (product: Product, e?: React.MouseEvent) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelectProduct,
  onAddToCart,
  onBuyNow
}) => {
  return (
    <div
      onClick={() => onSelectProduct(product)}
      className="group relative flex flex-col justify-between bg-white border border-slate-200/80 rounded-2xl p-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-slate-300 cursor-pointer"
    >
      <div>
        {/* Visual / Image Container */}
        <div className="relative mb-3">
          <ProductImage
            iconType={product.iconType}
            name={product.name}
            category={product.category}
            aspect="square"
          />

          {/* Subtle badge if applicable */}
          {product.badge && (
            <div className="absolute top-2.5 left-2.5 z-20 px-2.5 py-1 text-[11px] font-semibold tracking-wide bg-slate-900/90 text-white rounded-md backdrop-blur-sm shadow-sm">
              {product.badge}
            </div>
          )}

          {/* Discount tag */}
          {product.discountPercentage > 0 && (
            <div className="absolute top-2.5 right-2.5 z-20 px-2 py-0.5 text-[11px] font-bold bg-amber-500 text-slate-950 rounded-md shadow-sm">
              {product.discountPercentage}% OFF
            </div>
          )}
        </div>

        {/* Brand & Category clean metadata */}
        <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
          <span className="font-medium text-slate-600 truncate">{product.brand}</span>
          <span aria-hidden="true" className="text-slate-300">·</span>
          <span className="truncate">{product.category}</span>
        </div>

        {/* Product Title */}
        <h3 className="text-sm font-semibold text-slate-900 line-clamp-2 leading-snug group-hover:text-indigo-600 transition-colors">
          {product.name}
        </h3>

        {/* Rating & Reviews */}
        <div className="flex items-center gap-1.5 mt-2 text-xs">
          <div className="flex items-center text-amber-500">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="ml-1 font-semibold text-slate-800 tabular-nums">{product.rating}</span>
          </div>
          <span className="text-slate-400">({product.reviewCount})</span>
          <span aria-hidden="true" className="text-slate-300">·</span>
          <span className={`text-[11px] font-medium ${product.inStock ? 'text-emerald-600' : 'text-rose-600'}`}>
            {product.inStock ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100">
        {/* Price Row */}
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-lg font-bold text-slate-900 tabular-nums">
            ${product.price}
          </span>
          {product.originalPrice > product.price && (
            <span className="text-xs text-slate-400 line-through tabular-nums">
              ${product.originalPrice}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2" onClick={(e) => e.stopPropagation()}>
          <button
            type="button"
            onClick={(e) => onAddToCart(product, e)}
            className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 active:scale-95 rounded-lg transition-all whitespace-nowrap"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-slate-600" />
            <span>Add to Cart</span>
          </button>

          <button
            type="button"
            onClick={(e) => onBuyNow(product, e)}
            className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-95 rounded-lg transition-all shadow-sm whitespace-nowrap"
          >
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>Buy Now</span>
          </button>
        </div>
      </div>
    </div>
  );
};
