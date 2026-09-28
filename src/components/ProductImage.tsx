import React from 'react';
import {
  Headphones,
  Smartphone,
  Tablet,
  Laptop,
  Keyboard,
  Shirt,
  Footprints,
  Sparkles,
  CookingPot,
  Coffee,
  ShoppingBasket,
  Armchair,
  BookOpen,
  Dumbbell,
  Gamepad2,
  Baby,
  Gem,
  Watch,
  Briefcase,
  Camera,
  Gauge,
  Heart,
  Flame,
  Package,
  Activity,
  Droplets
} from 'lucide-react';

interface ProductImageProps {
  iconType: string;
  name: string;
  category: string;
  aspect?: 'square' | 'wide' | 'tall';
  className?: string;
}

export const ProductImage: React.FC<ProductImageProps> = ({
  iconType,
  name,
  category,
  aspect = 'square',
  className = ''
}) => {
  // Determine gradient and theme based on category
  const getCategoryTheme = (cat: string) => {
    switch (cat.toLowerCase()) {
      case 'electronics':
        return {
          bg: 'from-slate-900 to-indigo-950',
          accent: 'text-indigo-400',
          glow: 'bg-indigo-500/20',
          ring: 'border-indigo-500/30'
        };
      case 'mobiles & tablets':
        return {
          bg: 'from-slate-900 to-blue-950',
          accent: 'text-sky-400',
          glow: 'bg-sky-500/20',
          ring: 'border-sky-500/30'
        };
      case 'computers & laptops':
        return {
          bg: 'from-slate-900 to-cyan-950',
          accent: 'text-cyan-400',
          glow: 'bg-cyan-500/20',
          ring: 'border-cyan-500/30'
        };
      case 'fashion':
        return {
          bg: 'from-stone-900 to-amber-950',
          accent: 'text-amber-300',
          glow: 'bg-amber-500/20',
          ring: 'border-amber-500/30'
        };
      case 'footwear':
        return {
          bg: 'from-zinc-900 to-orange-950',
          accent: 'text-orange-400',
          glow: 'bg-orange-500/20',
          ring: 'border-orange-500/30'
        };
      case 'beauty & personal care':
        return {
          bg: 'from-zinc-900 to-rose-950',
          accent: 'text-rose-300',
          glow: 'bg-rose-500/20',
          ring: 'border-rose-500/30'
        };
      case 'home & kitchen':
        return {
          bg: 'from-stone-900 to-emerald-950',
          accent: 'text-emerald-300',
          glow: 'bg-emerald-500/20',
          ring: 'border-emerald-500/30'
        };
      case 'grocery':
        return {
          bg: 'from-stone-900 to-green-950',
          accent: 'text-emerald-400',
          glow: 'bg-emerald-500/20',
          ring: 'border-emerald-500/30'
        };
      case 'furniture':
        return {
          bg: 'from-stone-900 to-yellow-950',
          accent: 'text-amber-200',
          glow: 'bg-amber-600/20',
          ring: 'border-amber-600/30'
        };
      case 'books & stationery':
        return {
          bg: 'from-slate-900 to-violet-950',
          accent: 'text-violet-300',
          glow: 'bg-violet-500/20',
          ring: 'border-violet-500/30'
        };
      case 'sports & fitness':
        return {
          bg: 'from-zinc-900 to-teal-950',
          accent: 'text-teal-400',
          glow: 'bg-teal-500/20',
          ring: 'border-teal-500/30'
        };
      case 'toys & games':
        return {
          bg: 'from-slate-900 to-fuchsia-950',
          accent: 'text-pink-400',
          glow: 'bg-pink-500/20',
          ring: 'border-pink-500/30'
        };
      case 'baby products':
        return {
          bg: 'from-zinc-900 to-pink-950',
          accent: 'text-pink-300',
          glow: 'bg-pink-400/20',
          ring: 'border-pink-400/30'
        };
      case 'jewellery & accessories':
        return {
          bg: 'from-zinc-900 to-purple-950',
          accent: 'text-purple-300',
          glow: 'bg-purple-500/20',
          ring: 'border-purple-500/30'
        };
      case 'watches':
        return {
          bg: 'from-neutral-900 to-stone-950',
          accent: 'text-amber-400',
          glow: 'bg-amber-500/20',
          ring: 'border-amber-500/30'
        };
      case 'bags & luggage':
        return {
          bg: 'from-slate-900 to-blue-950',
          accent: 'text-sky-300',
          glow: 'bg-sky-500/20',
          ring: 'border-sky-500/30'
        };
      case 'automotive':
        return {
          bg: 'from-zinc-900 to-red-950',
          accent: 'text-red-400',
          glow: 'bg-red-500/20',
          ring: 'border-red-500/30'
        };
      case 'pet supplies':
        return {
          bg: 'from-stone-900 to-lime-950',
          accent: 'text-lime-300',
          glow: 'bg-lime-500/20',
          ring: 'border-lime-500/30'
        };
      case 'health & wellness':
        return {
          bg: 'from-slate-900 to-teal-950',
          accent: 'text-teal-300',
          glow: 'bg-teal-500/20',
          ring: 'border-teal-500/30'
        };
      case 'gift items':
        return {
          bg: 'from-zinc-900 to-amber-950',
          accent: 'text-amber-300',
          glow: 'bg-amber-400/20',
          ring: 'border-amber-400/30'
        };
      default:
        return {
          bg: 'from-slate-900 to-slate-950',
          accent: 'text-slate-300',
          glow: 'bg-slate-500/20',
          ring: 'border-slate-500/30'
        };
    }
  };

  const theme = getCategoryTheme(category);

  const renderIconGraphic = () => {
    const iconProps = { className: `w-14 h-14 ${theme.accent} transition-transform duration-300 group-hover:scale-110` };
    switch (iconType) {
      case 'headphones':
        return <Headphones {...iconProps} />;
      case 'speaker':
      case 'projector':
        return <Activity {...iconProps} />;
      case 'smartphone':
        return <Smartphone {...iconProps} />;
      case 'tablet':
        return <Tablet {...iconProps} />;
      case 'laptop':
        return <Laptop {...iconProps} />;
      case 'keyboard':
        return <Keyboard {...iconProps} />;
      case 'shirt':
      case 'hoodie':
        return <Shirt {...iconProps} />;
      case 'sneakers':
      case 'boots':
        return <Footprints {...iconProps} />;
      case 'dropper':
      case 'skincare':
        return <Sparkles {...iconProps} />;
      case 'pot':
        return <CookingPot {...iconProps} />;
      case 'kettle':
        return <Coffee {...iconProps} />;
      case 'bottle':
        return <Droplets {...iconProps} />;
      case 'jar':
        return <ShoppingBasket {...iconProps} />;
      case 'chair':
      case 'table':
        return <Armchair {...iconProps} />;
      case 'book':
      case 'pen':
        return <BookOpen {...iconProps} />;
      case 'dumbbell':
      case 'mat':
        return <Dumbbell {...iconProps} />;
      case 'game':
      case 'blocks':
        return <Gamepad2 {...iconProps} />;
      case 'swaddle':
      case 'carrier':
        return <Baby {...iconProps} />;
      case 'bracelet':
      case 'necklace':
        return <Gem {...iconProps} />;
      case 'watch':
      case 'smartwatch':
        return <Watch {...iconProps} />;
      case 'backpack':
      case 'briefcase':
        return <Briefcase {...iconProps} />;
      case 'dashcam':
        return <Camera {...iconProps} />;
      case 'inflator':
        return <Gauge {...iconProps} />;
      case 'petbed':
      case 'petfountain':
        return <Heart {...iconProps} />;
      case 'scale':
      case 'massagegun':
        return <Activity {...iconProps} />;
      case 'candle':
      case 'valet':
        return <Flame {...iconProps} />;
      default:
        return <Package {...iconProps} />;
    }
  };

  const aspectClass =
    aspect === 'wide' ? 'aspect-[16/10]' : aspect === 'tall' ? 'aspect-[3/4]' : 'aspect-square';

  return (
    <div
      className={`relative w-full ${aspectClass} overflow-hidden rounded-xl bg-gradient-to-br ${theme.bg} flex flex-col items-center justify-center p-6 text-center select-none ${className}`}
    >
      {/* Background radial glow */}
      <div className={`absolute w-32 h-32 rounded-full ${theme.glow} blur-2xl pointer-events-none`} />

      {/* Decorative concentric circles for subtle studio depth */}
      <div className={`absolute inset-4 rounded-lg border ${theme.ring} opacity-40 pointer-events-none`} />

      {/* Icon presentation container */}
      <div className="relative z-10 p-5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-inner flex items-center justify-center mb-3">
        {renderIconGraphic()}
      </div>

      {/* Label & category text */}
      <div className="relative z-10 max-w-[85%]">
        <p className="text-[11px] font-medium tracking-wide uppercase text-white/50 truncate">
          {category}
        </p>
        <p className="text-xs font-semibold text-white/90 truncate mt-0.5" title={name}>
          {name}
        </p>
      </div>
    </div>
  );
};
