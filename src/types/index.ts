export interface Product {
  id: string;
  name: string;
  category: string; // one of the 20 categories
  brand: string;
  price: number;
  originalPrice: number;
  discountPercentage: number;
  rating: number;
  reviewCount: number;
  description: string;
  inStock: boolean;
  stockCount: number;
  sizes?: string[];
  colors?: { name: string; hex: string }[];
  featured?: boolean;
  popular?: boolean;
  specialOffer?: boolean;
  badge?: string;
  iconType: string;
}

export interface CategoryInfo {
  id: string;
  name: string;
  iconName: string;
  description: string;
  itemCount: number;
  accentColor: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
  iconType: string;
}

export interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  status: 'Order Placed' | 'Processing' | 'Shipped' | 'Out for Delivery' | 'Delivered';
  estimatedDelivery: string;
  customer: {
    name: string;
    mobile: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
  paymentMethod: 'Cash on Delivery' | 'Credit/Debit Card' | 'UPI / Net Banking';
}

export interface FilterState {
  category: string;
  searchQuery: string;
  priceRange: [number, number];
  brands: string[];
  minRating: number;
  minDiscount: number;
  inStockOnly: boolean;
  sortBy: 'featured' | 'price-low' | 'price-high' | 'rating' | 'discount';
}

export interface User {
  name: string;
  email: string;
  mobile?: string;
}
