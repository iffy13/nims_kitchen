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
  /** Unique per product + add-on combination, so "Ofada + egg" and "Ofada + meat" are separate lines. */
  lineId: string;
  product: Product;
  quantity: number;
  selectedAddOns: AddOn[];
}

// Order Types
export type PaymentMethod = 'cod' | 'transfer';
export type DeliveryType = 'delivery' | 'pickup';

export interface CustomerInfo {
  fullName: string;
  phone: string;
  area?: string;
  address?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  customerInfo: CustomerInfo;
  deliveryType: DeliveryType;
  deliveryFee: number;
  subtotal: number;
  total: number;
  paymentMethod: PaymentMethod;
  createdAt: string;
  /** Human-readable, e.g. "Sat, 17 Oct at 1:30 PM" */
  scheduledFor?: string;
  notes?: string;
}

// Testimonial
export interface Testimonial {
  id: string;
  name: string;
  text: string;
  avatar: string;
  rating: number;
}
