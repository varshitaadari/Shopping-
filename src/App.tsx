import React, { useState, useEffect } from 'react';
import { Product, CartItem, Order, User, FilterState } from './types';
import { SAMPLE_PRODUCTS } from './data/products';
import { INITIAL_ORDERS } from './data/sampleOrders';
import { Navbar } from './components/Navbar';
import { CategoryNav } from './components/CategoryNav';
import { HomeView } from './components/HomeView';
import { CatalogView } from './components/CatalogView';
import { CheckoutView } from './components/CheckoutView';
import { OrdersView } from './components/OrdersView';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { AuthModal } from './components/AuthModal';
import { Toast } from './components/Toast';
import { Footer } from './components/Footer';

export default function App() {
  // Navigation View State
  const [activeView, setActiveView] = useState<'home' | 'catalog' | 'checkout' | 'orders'>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Cart State (with localStorage persistence)
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('smartshop_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Orders State (with localStorage persistence)
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('smartshop_orders');
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  // User State
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('smartshop_user');
      return saved
        ? JSON.parse(saved)
        : { name: 'Varshita Adari', email: 'varshitaadari@gmail.com', mobile: '+1 (555) 392-8172' };
    } catch {
      return { name: 'Varshita Adari', email: 'varshitaadari@gmail.com', mobile: '+1 (555) 392-8172' };
    }
  });

  // Filter State for Catalog / Search
  const [filters, setFilters] = useState<FilterState>({
    category: 'All',
    searchQuery: '',
    priceRange: [0, 1000],
    brands: [],
    minRating: 0,
    minDiscount: 0,
    inStockOnly: false,
    sortBy: 'featured'
  });

  // Modal Dialog States
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  // Toast Notification State
  const [toast, setToast] = useState<{
    message: string;
    isOpen: boolean;
    actionText?: string;
    onAction?: () => void;
  }>({
    message: '',
    isOpen: false
  });

  // Save Cart to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('smartshop_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cartItems]);

  // Save Orders to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('smartshop_orders', JSON.stringify(orders));
    } catch (e) {
      console.error('Failed to save orders to localStorage', e);
    }
  }, [orders]);

  // Save User to LocalStorage
  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem('smartshop_user', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('smartshop_user');
      }
    } catch (e) {
      console.error('Failed to save user to localStorage', e);
    }
  }, [currentUser]);

  // Total cart quantity
  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Product interaction handlers
  const handleAddToCart = (
    product: Product,
    quantity = 1,
    color?: string,
    size?: string,
    e?: React.MouseEvent
  ) => {
    if (e) e.stopPropagation();

    const selectedColor = color || product.colors?.[0]?.name;
    const selectedSize = size || product.sizes?.[0];

    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedColor === selectedColor &&
          item.selectedSize === selectedSize
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity
        };
        return next;
      } else {
        return [...prev, { product, quantity, selectedColor, selectedSize }];
      }
    });

    setToast({
      message: `Added "${product.name}" to cart`,
      isOpen: true,
      actionText: 'View Cart',
      onAction: () => {
        setToast((t) => ({ ...t, isOpen: false }));
        setIsCartOpen(true);
      }
    });
  };

  const handleBuyNow = (
    product: Product,
    quantity = 1,
    color?: string,
    size?: string,
    e?: React.MouseEvent
  ) => {
    if (e) e.stopPropagation();

    const selectedColor = color || product.colors?.[0]?.name;
    const selectedSize = size || product.sizes?.[0];

    // Ensure item is in cart
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedColor === selectedColor &&
          item.selectedSize === selectedSize
      );

      if (existingIndex > -1) {
        return prev;
      }
      return [...prev, { product, quantity, selectedColor, selectedSize }];
    });

    // Close detail modal if open and transition to checkout
    setSelectedProduct(null);
    setIsCartOpen(false);
    setActiveView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handlePlaceOrder = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
    setCartItems([]);
    setActiveView('orders');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setToast({
      message: `Order #${newOrder.id} placed successfully!`,
      isOpen: true
    });
  };

  const handleSelectCategory = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setActiveView('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      setActiveView('catalog');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectProductById = (productId: string) => {
    const found = SAMPLE_PRODUCTS.find((p) => p.id === productId);
    if (found) {
      setSelectedProduct(found);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-900 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* 1. Global Navigation */}
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearchSubmit={handleSearchSubmit}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        currentUser={currentUser}
        activeView={activeView}
        onNavigate={(view) => {
          setActiveView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onSelectCategory={handleSelectCategory}
      />

      {/* 2. 20-Category Scrollable Navigation Bar */}
      <CategoryNav
        selectedCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
      />

      {/* 3. Main Dynamic Content View */}
      <main className="flex-1">
        {activeView === 'home' && (
          <HomeView
            featuredProducts={SAMPLE_PRODUCTS.filter((p) => p.featured)}
            popularProducts={SAMPLE_PRODUCTS.filter((p) => p.popular)}
            specialOfferProducts={SAMPLE_PRODUCTS.filter((p) => p.specialOffer)}
            onSelectProduct={setSelectedProduct}
            onAddToCart={(prod, e) => handleAddToCart(prod, 1, undefined, undefined, e)}
            onBuyNow={(prod, e) => handleBuyNow(prod, 1, undefined, undefined, e)}
            onSelectCategory={handleSelectCategory}
            onNavigateToCatalog={() => {
              setSelectedCategory('All');
              setActiveView('catalog');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeView === 'catalog' && (
          <CatalogView
            products={SAMPLE_PRODUCTS}
            selectedCategory={selectedCategory}
            searchQuery={searchQuery}
            filters={filters}
            onChangeFilters={setFilters}
            onClearSearch={() => setSearchQuery('')}
            onSelectProduct={setSelectedProduct}
            onAddToCart={(prod, e) => handleAddToCart(prod, 1, undefined, undefined, e)}
            onBuyNow={(prod, e) => handleBuyNow(prod, 1, undefined, undefined, e)}
          />
        )}

        {activeView === 'checkout' && (
          <CheckoutView
            cartItems={cartItems}
            onBackToCart={() => {
              setActiveView('catalog');
              setIsCartOpen(true);
            }}
            onPlaceOrder={handlePlaceOrder}
          />
        )}

        {activeView === 'orders' && (
          <OrdersView
            orders={orders}
            onBrowseProducts={() => {
              setActiveView('catalog');
              setSelectedCategory('All');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSelectProductById={handleSelectProductById}
          />
        )}
      </main>

      {/* 4. Product Details Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={(prod, qty, color, size) => handleAddToCart(prod, qty, color, size)}
        onBuyNow={(prod, qty, color, size) => handleBuyNow(prod, qty, color, size)}
      />

      {/* 5. Slide-Over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setActiveView('checkout');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onBrowseProducts={() => {
          setIsCartOpen(false);
          setActiveView('catalog');
          setSelectedCategory('All');
        }}
      />

      {/* 6. Sign In / Sign Up Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        currentUser={currentUser}
        onLogin={(u) => {
          setCurrentUser(u);
          setToast({
            message: `Welcome back, ${u.name}!`,
            isOpen: true
          });
        }}
        onLogout={() => {
          setCurrentUser(null);
          setToast({
            message: 'Signed out successfully',
            isOpen: true
          });
        }}
      />

      {/* 7. Action Toast Notification */}
      <Toast
        message={toast.message}
        isOpen={toast.isOpen}
        onClose={() => setToast((t) => ({ ...t, isOpen: false }))}
        actionText={toast.actionText}
        onAction={toast.onAction}
      />

      {/* 8. Site Footer */}
      <Footer
        onSelectCategory={handleSelectCategory}
        onNavigate={(view) => {
          setActiveView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}
