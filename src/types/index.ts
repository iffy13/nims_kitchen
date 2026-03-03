// Product Types
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'ofada' | 'protein' | 'beverage' | 'water' | 'side';
  image: string;
  available: boolean;
  popular?: boolean;
  addOns?: AddOn[];
}

export interface AddOn {
  id: string;
  name: string;
  price: number;
}

// Cart Types
export interface CartItem {
  product: Product;
  quantity: number;
  selectedAddOns: AddOn[];
}

// Order Types
export type OrderStatus = 'pending' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
export type PaymentMethod = 'cod' | 'transfer' | 'card';
export type DeliveryType = 'delivery' | 'pickup';

export interface Order {
  id: string;
  items: CartItem[];
  customerInfo: CustomerInfo;
  deliveryType: DeliveryType;
  deliveryFee: number;
  subtotal: number;
  total: number;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  createdAt: string;
  scheduledFor?: string;
  notes?: string;
}

export interface CustomerInfo {
  fullName: string;
  phone: string;
  email?: string;
  address: string;
  notes?: string;
}

// Business Settings
export interface BusinessSettings {
  openingTime: string;
  closingTime: string;
  deliveryFee: number;
  minimumOrderAmount: number;
  deliveryLocations: string[];
  preparationTime: number;
}

// Admin Types
export interface AdminUser {
  username: string;
  password: string;
}

// Testimonial
export interface Testimonial {
  id: string;
  name: string;
  text: string;
  avatar: string;
  rating: number;
}
