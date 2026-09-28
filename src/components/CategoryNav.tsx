import React, { useRef } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Tv,
  Smartphone,
  Laptop,
  Shirt,
  Footprints,
  Sparkles,
  Utensils,
  ShoppingBasket,
  Armchair,
  BookOpen,
  Dumbbell,
  Gamepad2,
  Baby,
  Gem,
  Watch,
  Briefcase,
  Car,
  Bone,
  HeartPulse,
  Gift,
  Grid
} from 'lucide-react';
import { CATEGORIES } from '../data/categories';

interface CategoryNavProps {
  selectedCategory: string;
  onSelectCategory: (categoryName: string) => void;
}

export const CategoryNav: React.FC<CategoryNavProps> = ({
  selectedCategory,
  onSelectCategory
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const offset = direction === 'left' ? -280 : 280;
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  const getCategoryIcon = (iconName: string, isSelected: boolean) => {
    const className = `w-4 h-4 ${isSelected ? 'text-indigo-600' : 'text-slate-500'}`;
    switch (iconName) {
      case 'Tv': return <Tv className={className} />;
      case 'Smartphone': return <Smartphone className={className} />;
      case 'Laptop': return <Laptop className={className} />;
      case 'Shirt': return <Shirt className={className} />;
      case 'Footprints': return <Footprints className={className} />;
      case 'Sparkles': return <Sparkles className={className} />;
      case 'Utensils': return <Utensils className={className} />;
      case 'ShoppingBasket': return <ShoppingBasket className={className} />;
      case 'Armchair': return <Armchair className={className} />;
      case 'BookOpen': return <BookOpen className={className} />;
      case 'Dumbbell': return <Dumbbell className={className} />;
      case 'Gamepad2': return <Gamepad2 className={className} />;
      case 'Baby': return <Baby className={className} />;
      case 'Gem': return <Gem className={className} />;
      case 'Watch': return <Watch className={className} />;
      case 'Briefcase': return <Briefcase className={className} />;
      case 'Car': return <Car className={className} />;
      case 'Bone': return <Bone className={className} />;
      case 'HeartPulse': return <HeartPulse className={className} />;
      case 'Gift': return <Gift className={className} />;
      default: return <Grid className={className} />;
    }
  };

  return (
    <div className="relative border-b border-slate-200/80 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative flex items-center">
        {/* Scroll Left Button */}
        <button
          type="button"
          onClick={() => scroll('left')}
          className="hidden md:flex absolute left-1 z-10 p-1.5 rounded-full bg-white shadow-md border border-slate-200 text-slate-600 hover:text-slate-900 transition-colors"
          aria-label="Scroll categories left"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Scrollable container */}
        <div
          ref={scrollRef}
          className="flex items-center gap-1.5 overflow-x-auto py-3 no-scrollbar scroll-smooth w-full px-2"
        >
          {/* All Categories Option */}
          <button
            type="button"
            onClick={() => onSelectCategory('All')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === 'All'
                ? 'bg-indigo-50 text-indigo-700 border border-indigo-200 shadow-sm'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Grid className={`w-4 h-4 ${selectedCategory === 'All' ? 'text-indigo-600' : 'text-slate-500'}`} />
            <span>All Categories</span>
          </button>

          {/* 20 Categories list */}
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory.toLowerCase() === cat.name.toLowerCase();
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onSelectCategory(cat.name)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-indigo-50 text-indigo-700 border border-indigo-200 shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {getCategoryIcon(cat.iconName, isSelected)}
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Scroll Right Button */}
        <button
          type="button"
          onClick={() => scroll('right')}
          className="hidden md:flex absolute right-1 z-10 p-1.5 rounded-full bg-white shadow-md border border-slate-200 text-slate-600 hover:text-slate-900 transition-colors"
          aria-label="Scroll categories right"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
