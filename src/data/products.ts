import type { Product, Testimonial } from '@/types';

export const products: Product[] = [
  // Ofada Rice
  {
    id: 'ofada-1',
    name: 'Classic Ofada Rice',
    description: 'Authentic Ofada rice served with our signature palm oil stew, locust beans (iru), and boiled egg',
    price: 3500,
    category: 'ofada',
    image: '/images/ofada-classic.png',
    available: true,
    popular: true,
    addOns: [
      { id: 'addon-1', name: 'Extra Meat', price: 1000 },
      { id: 'addon-2', name: 'Extra Egg', price: 500 },
      { id: 'addon-5', name: 'Extra Rice', price: 700 },
      { id: 'addon-5', name: 'Extra Rice', price: 700 },
      { id: 'addon-5', name: 'Extra Rice', price: 700 },
    ],
  },
    {
    id: '1-spoon-of-ofada',
    name: '1-spoon-of-ofada',
    description: 'Ofada rice',
    price: 700,
    category: 'ofada',
    image: '/images/1-spoon-of-ofada.png',
    available: true,
    popular: true,
    addOns: [
      { id: 'addon-1', name: 'Extra Meat', price: 1000 },
      { id: 'addon-3', name: 'Plantain', price: 500 },
    ],
  },

  // Proteins
  {
    id: 'beef',
    name: 'ponmo',
    description: 'peppered ponmo, well-seasoned and cooked to perfection',
    price: 1000,
    category: 'protein',
    image: '/images/beef.png',
    available: true,
  },

  // Sides
  {
    id: 'side-1',
    name: 'Plantain Chips',
    description: 'Crispy golden plantain chips, lightly salted',
    price: 500,
    category: 'side',
    image: '/images/side-plantain.png',
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
    image: '/images/bev-coke.png',
    available: true,
    popular: true,
  },
  {
    id: 'bev-2',
    name: 'Sosa Drink',
    description: 'Chilled and Refreshing.',
    price: 500,
    category: 'beverage',
    image: '/images/sosa.png',
    available: true,
  },
  {
    id: 'bev-3',
    name: 'zobo drink',
    description: 'chilled and refreshing drink',
    price: 500,
    category: 'beverage',
    image: '/images/zobo.png',
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
    image: '/images/bev-water.png',
    available: true,
    popular: true,
  },
];

export const testimonials: Testimonial[] = [
  {
    id: 'test-1',
    name: 'ITunu',
    text: 'WoWWW, id give you a 10/10, The Sauce was top notch,The rice was original ofada, I really loved it, Every Bite was on Mear  ',
    avatar: '/images/avatar-1.jpg',
    rating: 5,
  },
  {
    id: 'test-2',
    name: 'David Oluwaseun',
    text: 'The assorted Ofada is amazing! Generous portions and the meat is always tender. Highly recommend!',
    avatar: '/images/avatar-2.jpg',
    rating: 5,
  },
  {
    id: 'test-3',
    name: 'Mrs. Adebayo',
    text: 'Nim\'s Kitchen never disappoints. The food is consistently delicious and the service is excellent.',
    avatar: '/images/avatar-3.jpg',
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
