import React, { useState, useMemo } from 'react';
import { SlidersHorizontal, ArrowUpDown, X, Sparkles, Search } from 'lucide-react';
import { Product, FilterState } from '../types';
import { ProductCard } from './ProductCard';
import { FilterSidebar } from './FilterSidebar';

interface CatalogViewProps {
  products: Product[];
  selectedCategory: string;
  searchQuery: string;
  filters: FilterState;
  onChangeFilters: (newFilters: FilterState) => void;
  onClearSearch: () => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, e?: React.MouseEvent) => void;
  onBuyNow: (product: Product, e?: React.MouseEvent) => void;
}

export const CatalogView: React.FC<CatalogViewProps> = ({
  products,
  selectedCategory,
  searchQuery,
  filters,
  onChangeFilters,
  onClearSearch,
  onSelectProduct,
  onAddToCart,
  onBuyNow
}) => {
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Extract available brands for the current category / pool
  const availableBrands = useMemo(() => {
    const brandSet = new Set<string>();
    products
      .filter((p) => {
        if (selectedCategory !== 'All' && p.category.toLowerCase() !== selectedCategory.toLowerCase()) {
          return false;
        }
        return true;
      })
      .forEach((p) => brandSet.add(p.brand));
    return Array.from(brandSet).sort();
  }, [products, selectedCategory]);

  // Apply search and filter criteria
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // 1. Category filter
      if (
        selectedCategory !== 'All' &&
        product.category.toLowerCase() !== selectedCategory.toLowerCase()
      ) {
        return false;
      }

      // 2. Search query (matches name or category)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesCat = product.category.toLowerCase().includes(q);
        const matchesBrand = product.brand.toLowerCase().includes(q);
        if (!matchesName && !matchesCat && !matchesBrand) return false;
      }

      // 3. Price filter
      if (product.price > filters.priceRange[1]) {
        return false;
      }

      // 4. In stock filter
      if (filters.inStockOnly && !product.inStock) {
        return false;
      }

      // 5. Rating filter
      if (filters.minRating > 0 && product.rating < filters.minRating) {
        return false;
      }

      // 6. Discount filter
      if (filters.minDiscount > 0 && product.discountPercentage < filters.minDiscount) {
        return false;
      }

      // 7. Brand filter
      if (filters.brands.length > 0 && !filters.brands.includes(product.brand)) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      switch (filters.sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'discount':
          return b.discountPercentage - a.discountPercentage;
        default:
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      }
    });
  }, [products, selectedCategory, searchQuery, filters]);

  const handleSortChange = (sortBy: FilterState['sortBy']) => {
    onChangeFilters({ ...filters, sortBy });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      {/* Top Header Title & Search notification */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900">
              {selectedCategory === 'All' ? 'All Products' : selectedCategory}
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold tabular-nums">
              {filteredProducts.length} items
            </span>
          </div>
          {searchQuery && (
            <div className="flex items-center gap-2 mt-1.5 text-xs text-slate-600">
              <Search className="w-3.5 h-3.5 text-indigo-600" />
              <span>
                Search results for <strong className="text-slate-900">"{searchQuery}"</strong>
              </span>
              <button
                type="button"
                onClick={onClearSearch}
                className="text-indigo-600 hover:text-indigo-800 font-semibold underline ml-1"
              >
                Clear search
              </button>
            </div>
          )}
        </div>

        {/* Sort & Mobile Filter Toggle */}
        <div className="flex items-center gap-3">
          {/* Mobile Filter Button */}
          <button
            type="button"
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white border border-slate-200 text-slate-700 shadow-2xs hover:bg-slate-50"
          >
            <SlidersHorizontal className="w-4 h-4 text-indigo-600" />
            <span>Filters</span>
          </button>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs shadow-2xs">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <label htmlFor="sort-by-select" className="text-slate-500 font-medium hidden sm:inline">Sort by:</label>
            <select
              id="sort-by-select"
              value={filters.sortBy}
              onChange={(e) => handleSortChange(e.target.value as any)}
              className="bg-transparent font-semibold text-slate-800 focus:outline-hidden cursor-pointer"
              aria-label="Sort products by criteria"
            >
              <option value="featured">Featured First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="discount">Biggest Discount</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Grid & Sidebar Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-6 items-start">
        {/* Desktop Filter Sidebar */}
        <aside className="hidden lg:block lg:col-span-1 sticky top-24">
          <FilterSidebar
            filters={filters}
            onChangeFilters={onChangeFilters}
            availableBrands={availableBrands}
            totalResults={filteredProducts.length}
          />
        </aside>

        {/* Product Grid Area */}
        <div className="lg:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-white border border-slate-200 rounded-2xl p-8 space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-base font-bold text-slate-800">No products match your criteria</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Try widening your price range, clearing some filters, or checking your spelling.
              </p>
              <button
                type="button"
                onClick={() => {
                  onChangeFilters({
                    ...filters,
                    priceRange: [0, 1000],
                    brands: [],
                    minRating: 0,
                    minDiscount: 0,
                    inStockOnly: false
                  });
                  onClearSearch();
                }}
                className="px-5 py-2 text-xs font-semibold bg-indigo-600 text-white rounded-xl hover:bg-indigo-700"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelectProduct={onSelectProduct}
                  onAddToCart={onAddToCart}
                  onBuyNow={onBuyNow}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Modal / Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-xs flex justify-end">
          <div className="w-full max-w-xs bg-white h-full p-5 overflow-y-auto space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h2 className="text-sm font-bold text-slate-900">Filters</h2>
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="p-1 rounded-lg text-slate-500 hover:text-slate-800"
                aria-label="Close filters"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <FilterSidebar
              filters={filters}
              onChangeFilters={onChangeFilters}
              availableBrands={availableBrands}
              totalResults={filteredProducts.length}
            />

            <button
              type="button"
              onClick={() => setMobileFilterOpen(false)}
              className="w-full py-2.5 px-4 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700"
            >
              Apply Filters ({filteredProducts.length} Results)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
