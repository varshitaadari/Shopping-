import { Order } from '../types';

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ORD-98421',
    date: '2026-09-24',
    status: 'Delivered',
    estimatedDelivery: 'Delivered on Sep 26, 2026',
    items: [
      {
        productId: 'elec-1',
        name: 'AuraSound Spatial Wireless Headphones',
        price: 129,
        quantity: 1,
        selectedColor: 'Matte Obsidian',
        iconType: 'headphones'
      },
      {
        productId: 'book-1',
        name: 'The Creative Act: A Way of Being by Rick Rubin',
        price: 22,
        quantity: 1,
        iconType: 'book'
      }
    ],
    subtotal: 151,
    discount: 15,
    shipping: 0,
    total: 136,
    customer: {
      name: 'Varshita Adari',
      mobile: '+1 (555) 392-8172',
      address: '42 Pine Crest Avenue, Apt 4B',
      city: 'Seattle',
      state: 'WA',
      pincode: '98101'
    },
    paymentMethod: 'Credit/Debit Card'
  },
  {
    id: 'ORD-97604',
    date: '2026-09-27',
    status: 'Shipped',
    estimatedDelivery: 'Arriving by Sep 30, 2026',
    items: [
      {
        productId: 'watch-1',
        name: 'Chronos Heritage Automatic Mechanical Watch',
        price: 219,
        quantity: 1,
        selectedColor: 'Midnight Dial / Brown Strap',
        iconType: 'watch'
      },
      {
        productId: 'groc-1',
        name: 'Single-Estate Cold-Pressed Extra Virgin Olive Oil 500ml',
        price: 24,
        quantity: 2,
        iconType: 'bottle'
      }
    ],
    subtotal: 267,
    discount: 20,
    shipping: 0,
    total: 247,
    customer: {
      name: 'Varshita Adari',
      mobile: '+1 (555) 392-8172',
      address: '42 Pine Crest Avenue, Apt 4B',
      city: 'Seattle',
      state: 'WA',
      pincode: '98101'
    },
    paymentMethod: 'UPI / Net Banking'
  }
];
