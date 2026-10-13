import type { Product, Testimonial } from '@/types';

export const products: Product[] = [
  // Ofada Rice
  {
    id: 'ofada-1',
    name: 'Classic Ofada Rice',
    description: 'Authentic Ofada rice served with our signature palm oil stew, locust beans (iru), and boiled egg',
    price: 3500,
    category: 'ofada',
    image: '/images/ofada-classic.webp',
    available: true,
    popular: true,
    addOns: [
      { id: 'addon-1', name: 'Extra Meat', price: 1000 },
      { id: 'addon-2', name: 'Extra Egg', price: 500 },
      { id: 'addon-5', name: 'Extra Rice', price: 700 },
    ],
  },
  {
    id: 'ofada-spoon',
    name: 'Ofada Rice (1 Spoon)',
    description: 'A single spoon of our authentic Ofada rice — add sauce, meat or plantain as you like',
    price: 700,
    category: 'ofada',
    image: '/images/ofada-spoon.webp',
    available: true,
    popular: true,
    addOns: [
      { id: 'addon-1', name: 'Extra Meat', price: 1000 },
      { id: 'addon-3', name: 'Plantain', price: 500 },
    ],
  },

  // Proteins
  {
    id: 'ponmo',
    name: 'Peppered Ponmo',
    description: 'Peppered ponmo, well-seasoned and cooked to perfection',
    price: 1000,
    category: 'protein',
    image: '/images/ponmo.webp',
    available: true,
  },

  // Sides
  {
    id: 'side-1',
    name: 'Plantain Chips',
    description: 'Crispy golden plantain chips, lightly salted',
    price: 500,
    category: 'side',
    image: '/images/side-plantain.webp',
    available: true,
    popular: true,
  },
  // Beverages
  {
    id: 'bev-1',
    name: 'Coca-Cola',
    description: 'Chilled 35cl Coca-Cola',
    price: 500,
    category: 'beverage',
    image: '/images/bev-coke.webp',
    available: true,
    popular: true,
  },
  {
    id: 'bev-2',
    name: 'Sosa Drink',
    description: 'Chilled and refreshing.',
    price: 500,
    category: 'beverage',
    image: '/images/sosa.webp',
    available: true,
  },
  {
    id: 'bev-3',
    name: 'Zobo Drink',
    description: 'Chilled, refreshing homemade zobo',
    price: 500,
    category: 'beverage',
    image: '/images/zobo.webp',
    available: true,
    popular: false,
  },
  // Water
  {
    id: 'water-1',
    name: 'Bottled Water',
    description: '50cl purified bottled water',
    price: 300,
    category: 'water',
    image: '/images/bev-water.webp',
    available: true,
    popular: true,
  },
];

export const testimonials: Testimonial[] = [
  {
    id: 'test-1',
    name: 'ITunu',
    text: 'I give you a 10/10, The Sauce was top notch, The rice was original ofada, I really loved it, Every Bite was on Meat or ponmo😂😁.I really loved it, God bless your handwork ',
    avatar: '/images/avatar-1.webp',
    rating: 5,
  },
  {
    id: 'test-2',
    name: 'Moses',
    text: 'This is the kind of food you eat slowly cause you dont want it to finish. I enjoyed every bit of it. Highly recommend!',
    avatar: '/images/avatar-2.webp',
    rating: 5,
  },
  {
    id: 'test-3',
    name: 'Gloria',
    text: 'Nim\'s Kitchen never disappoints. The food is consistently delicious and the service is excellent.',
    avatar: '/images/avatar-3.webp',
    rating: 5,
  },
];

export const getProductsByCategory = (category: Product['category']) => {
  return products.filter((product) => product.category === category);
};

export const getPopularProducts = () => {
  return products.filter((product) => product.popular);
};

export const getProductById = (id: string) => {
  return products.find((product) => product.id === id);
};
