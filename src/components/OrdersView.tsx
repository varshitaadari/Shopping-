import React from 'react';
import { Package, Truck, CheckCircle2, Clock, MapPin, ArrowRight, ShoppingBag } from 'lucide-react';
import { Order, Product } from '../types';
import { ProductImage } from './ProductImage';

interface OrdersViewProps {
  orders: Order[];
  onBrowseProducts: () => void;
  onSelectProductById: (productId: string) => void;
}

export const OrdersView: React.FC<OrdersViewProps> = ({
  orders,
  onBrowseProducts,
  onSelectProductById
}) => {
  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'Delivered':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'Shipped':
      case 'Out for Delivery':
        return 'bg-blue-50 text-blue-800 border-blue-200';
      case 'Processing':
      case 'Order Placed':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      default:
        return 'bg-slate-50 text-slate-800 border-slate-200';
    }
  };

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'Delivered':
        return <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />;
      case 'Shipped':
      case 'Out for Delivery':
        return <Truck className="w-3.5 h-3.5 text-blue-600" />;
      default:
        return <Clock className="w-3.5 h-3.5 text-amber-600" />;
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-slate-200 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Your Orders</h1>
          <p className="text-xs text-slate-500 mt-1">
            Track packages, review item history, and manage delivery details.
          </p>
        </div>
        <button
          type="button"
          onClick={onBrowseProducts}
          className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-xl text-xs font-semibold transition-colors self-start sm:self-auto"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Continue Shopping</span>
        </button>
      </div>

      {/* Orders List */}
      <div className="mt-8 space-y-6">
        {orders.length === 0 ? (
          <div className="text-center py-16 bg-white border border-slate-200 rounded-2xl p-8 space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
              <Package className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800">No orders placed yet</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
                Explore our catalog of top products and place your first order with ease!
              </p>
            </div>
            <button
              type="button"
              onClick={onBrowseProducts}
              className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-semibold hover:bg-indigo-700 shadow-sm"
            >
              Start Shopping Now
            </button>
          </div>
        ) : (
          orders.map((order) => (
            <div
              key={order.id}
              className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-2xs transition-all hover:border-slate-300"
            >
              {/* Order Meta Bar */}
              <div className="bg-slate-50/80 px-6 py-4 border-b border-slate-200/80 flex flex-wrap items-center justify-between gap-4 text-xs">
                <div className="flex flex-wrap items-center gap-6">
                  <div>
                    <span className="text-[11px] text-slate-500 uppercase tracking-wider block font-medium">Order Placed</span>
                    <span className="font-semibold text-slate-800">{order.date}</span>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 uppercase tracking-wider block font-medium">Total Amount</span>
                    <span className="font-bold text-slate-900 tabular-nums">${order.total}</span>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 uppercase tracking-wider block font-medium">Ship To</span>
                    <span className="font-semibold text-slate-800">{order.customer.name}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-slate-500">#{order.id}</span>
                  <div
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {getStatusIcon(order.status)}
                    <span>{order.status}</span>
                  </div>
                </div>
              </div>

              {/* Order Body */}
              <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Items column */}
                <div className="lg:col-span-8 space-y-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                    <Truck className="w-4 h-4 text-indigo-600" />
                    <span>{order.estimatedDelivery}</span>
                  </div>

                  <div className="divide-y divide-slate-100">
                    {order.items.map((item) => (
                      <div
                        key={`${order.id}-${item.productId}`}
                        className="py-3 flex items-center gap-4 first:pt-0 last:pb-0"
                      >
                        <div className="w-16 h-16 shrink-0">
                          <ProductImage
                            iconType={item.iconType}
                            name={item.name}
                            category="Electronics"
                            aspect="square"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <h4
                            onClick={() => onSelectProductById(item.productId)}
                            className="text-xs font-bold text-slate-900 hover:text-indigo-600 cursor-pointer truncate"
                          >
                            {item.name}
                          </h4>
                          <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-1">
                            <span>Qty: {item.quantity}</span>
                            {(item.selectedColor || item.selectedSize) && (
                              <>
                                <span aria-hidden="true" className="text-slate-300">·</span>
                                <span>{[item.selectedColor, item.selectedSize].filter(Boolean).join(' / ')}</span>
                              </>
                            )}
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="text-xs font-bold text-slate-900 tabular-nums">
                            ${item.price * item.quantity}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Shipping & Payment Info column */}
                <div className="lg:col-span-4 bg-slate-50/60 rounded-xl p-4 text-xs space-y-3 border border-slate-100">
                  <div>
                    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                      Delivery Address
                    </span>
                    <p className="text-slate-800 font-medium leading-relaxed">
                      {order.customer.address}, {order.customer.city}, {order.customer.state} {order.customer.pincode}
                    </p>
                    <p className="text-slate-500 mt-0.5">{order.customer.mobile}</p>
                  </div>

                  <div className="pt-2 border-t border-slate-200/60">
                    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                      Payment Mode
                    </span>
                    <p className="text-slate-800 font-medium">{order.paymentMethod}</p>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
