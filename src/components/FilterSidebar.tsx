import React from 'react';
import { Star, RotateCcw, Check } from 'lucide-react';
import { FilterState } from '../types';

interface FilterSidebarProps {
  filters: FilterState;
  onChangeFilters: (newFilters: FilterState) => void;
  availableBrands: string[];
  totalResults: number;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onChangeFilters,
  availableBrands,
  totalResults
}) => {
  const handlePriceChange = (maxVal: number) => {
    onChangeFilters({
      ...filters,
      priceRange: [filters.priceRange[0], maxVal]
    });
  };

  const toggleBrand = (brand: string) => {
    const nextBrands = filters.brands.includes(brand)
      ? filters.brands.filter((b) => b !== brand)
      : [...filters.brands, brand];
    onChangeFilters({
      ...filters,
      brands: nextBrands
    });
  };

  const handleRatingChange = (rating: number) => {
    onChangeFilters({
      ...filters,
      minRating: filters.minRating === rating ? 0 : rating
    });
  };

  const handleDiscountChange = (discount: number) => {
    onChangeFilters({
      ...filters,
      minDiscount: filters.minDiscount === discount ? 0 : discount
    });
  };

  const handleStockToggle = () => {
    onChangeFilters({
      ...filters,
      inStockOnly: !filters.inStockOnly
    });
  };

  const handleReset = () => {
    onChangeFilters({
      ...filters,
      priceRange: [0, 1000],
      brands: [],
      minRating: 0,
      minDiscount: 0,
      inStockOnly: false
    });
  };

  const hasActiveFilters =
    filters.priceRange[1] < 1000 ||
    filters.brands.length > 0 ||
    filters.minRating > 0 ||
    filters.minDiscount > 0 ||
    filters.inStockOnly;

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-5 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div>
          <h2 className="text-sm font-bold text-slate-900">Filters</h2>
          <p className="text-xs text-slate-500 mt-0.5">{totalResults} products found</p>
        </div>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* 1. Price Filter */}
      <div>
        <div className="flex items-center justify-between text-xs mb-2">
          <label htmlFor="price-range-slider" className="font-semibold text-slate-800">Max Price</label>
          <span className="font-bold text-indigo-600 tabular-nums">${filters.priceRange[1]}</span>
        </div>
        <input
          id="price-range-slider"
          type="range"
          min="20"
          max="1000"
          step="10"
          value={filters.priceRange[1]}
          onChange={(e) => handlePriceChange(Number(e.target.value))}
          className="w-full accent-indigo-600 cursor-pointer h-1.5 bg-slate-200 rounded-lg"
          aria-label="Filter products by maximum price"
        />
        <div className="flex justify-between text-[11px] text-slate-400 mt-1 tabular-nums">
          <span>$20</span>
          <span>$500</span>
          <span>$1000+</span>
        </div>
      </div>

      {/* 2. Availability Filter */}
      <div className="pt-2 border-t border-slate-100">
        <label className="flex items-center gap-2.5 text-xs font-medium text-slate-700 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={handleStockToggle}
            className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
          />
          <span>In Stock Only</span>
        </label>
      </div>

      {/* 3. Customer Rating Filter */}
      <div className="pt-2 border-t border-slate-100">
        <h3 className="text-xs font-semibold text-slate-800 mb-2.5">Customer Rating</h3>
        <div className="space-y-1.5">
          {[4, 3].map((rating) => {
            const isSelected = filters.minRating === rating;
            return (
              <button
                key={rating}
                type="button"
                onClick={() => handleRatingChange(rating)}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-all ${
                  isSelected
                    ? 'bg-amber-50 text-amber-900 border border-amber-200'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <div className="flex items-center text-amber-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-medium text-slate-700">& Up</span>
                </div>
                {isSelected && <Check className="w-3.5 h-3.5 text-amber-600" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Minimum Discount Filter */}
      <div className="pt-2 border-t border-slate-100">
        <h3 className="text-xs font-semibold text-slate-800 mb-2.5">Special Discount</h3>
        <div className="grid grid-cols-3 gap-1.5">
          {[10, 25, 30].map((discount) => {
            const isSelected = filters.minDiscount === discount;
            return (
              <button
                key={discount}
                type="button"
                onClick={() => handleDiscountChange(discount)}
                className={`px-2 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {discount}%+
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. Brand Filter */}
      {availableBrands.length > 0 && (
        <div className="pt-2 border-t border-slate-100">
          <h3 className="text-xs font-semibold text-slate-800 mb-2.5">Brands</h3>
          <div className="max-h-48 overflow-y-auto space-y-1.5 pr-1 no-scrollbar">
            {availableBrands.map((brand) => {
              const checked = filters.brands.includes(brand);
              return (
                <label
                  key={brand}
                  className="flex items-center gap-2.5 text-xs text-slate-600 hover:text-slate-900 cursor-pointer select-none py-0.5"
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleBrand(brand)}
                    className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="truncate">{brand}</span>
                </label>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
