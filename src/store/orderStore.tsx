import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { Order, OrderStatus, CustomerInfo, CartItem, PaymentMethod, DeliveryType } from '@/types';

interface OrderContextType {
  orders: Order[];
  currentOrder: Order | null;
  createOrder: (
    items: CartItem[],
    customerInfo: CustomerInfo,
    deliveryType: DeliveryType,
    deliveryFee: number,
    paymentMethod: PaymentMethod,
    notes?: string,
    scheduledFor?: string
  ) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  getOrderById: (orderId: string) => Order | undefined;
  getTodayOrders: () => Order[];
  getOrdersByStatus: (status: OrderStatus) => Order[];
  clearCurrentOrder: () => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);

  const createOrder = useCallback((
    items: CartItem[],
    customerInfo: CustomerInfo,
    deliveryType: DeliveryType,
    deliveryFee: number,
    paymentMethod: PaymentMethod,
    notes?: string,
    scheduledFor?: string
  ): Order => {
    const subtotal = items.reduce((total, item) => {
      const addOnsTotal = item.selectedAddOns.reduce((sum, addOn) => sum + addOn.price, 0);
      return total + (item.product.price + addOnsTotal) * item.quantity;
    }, 0);

    const newOrder: Order = {
      id: `ORD-${Date.now()}`,
      items,
      customerInfo,
      deliveryType,
      deliveryFee,
      subtotal,
      total: subtotal + deliveryFee,
      paymentMethod,
      status: 'pending',
      createdAt: new Date().toISOString(),
      scheduledFor,
      notes,
    };

    setOrders((prev) => [newOrder, ...prev]);
    setCurrentOrder(newOrder);
    return newOrder;
  }, []);

  const updateOrderStatus = useCallback((orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status } : order
      )
    );
    if (currentOrder?.id === orderId) {
      setCurrentOrder((prev) => prev ? { ...prev, status } : null);
    }
  }, [currentOrder]);

  const getOrderById = useCallback((orderId: string) => {
    return orders.find((order) => order.id === orderId);
  }, [orders]);

  const getTodayOrders = useCallback(() => {
    const today = new Date().toDateString();
    return orders.filter((order) => new Date(order.createdAt).toDateString() === today);
  }, [orders]);

  const getOrdersByStatus = useCallback((status: OrderStatus) => {
    return orders.filter((order) => order.status === status);
  }, [orders]);

  const clearCurrentOrder = useCallback(() => {
    setCurrentOrder(null);
  }, []);

  return (
    <OrderContext.Provider
      value={{
        orders,
        currentOrder,
        createOrder,
        updateOrderStatus,
        getOrderById,
        getTodayOrders,
        getOrdersByStatus,
        clearCurrentOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
}
