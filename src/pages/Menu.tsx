import { useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import type { Product } from '@/types';

type Category = 'all' | Product['category'];

const categories: { value: Category; label: string }[] = [
  { value: 'all', label: 'All Items' },
  { value: 'ofada', label: 'Ofada Rice' },
  { value: 'protein', label: 'Proteins' },
  { value: 'side', label: 'Sides' },
  { value: 'beverage', label: 'Beverages' },
  { value: 'water', label: 'Water' },
];

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = products.filter((product) => {
    const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen pt-20 pb-24 lg:pb-0">
      {/* Header */}
      <section className="py-12 lg:py-16 bg-gradient-to-br from-[#fff8e1] to-white">
        <div className="section-padding">
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Our <span className="text-[#06a34c]">Menu</span>
            </h1>
            <p className="text-gray-600">
              Explore our delicious selection of Ofada rice dishes, proteins, beverages, and more. 
              All prepared fresh with love.
            </p>
          </div>
        </div>
      </section>

      {/* Menu Content */}
      <section className="py-8 lg:py-12 bg-white">
        <div className="section-padding">
          {/* Search and Filter Bar */}
          <div className="flex flex-col lg:flex-row gap-4 mb-8">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search menu..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-[#06a34c] transition-all"
              />
            </div>

            {/* Filter Button - Mobile */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 rounded-full font-medium"
            >
              <SlidersHorizontal className="w-5 h-5" />
              Filters
            </button>
          </div>

          {/* Category Tabs */}
          <div className={`${showFilters ? 'block' : 'hidden'} lg:block mb-8`}>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.value}
                  onClick={() => {
                    setActiveCategory(category.value);
                    setShowFilters(false);
                  }}
                  className={`px-5 py-2 rounded-full font-medium transition-all ${
                    activeCategory === category.value
                      ? 'bg-[#06a34c] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <p className="text-gray-500 mb-6">
            Showing {filteredProducts.length} item{filteredProducts.length !== 1 ? 's' : ''}
          </p>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No items found</h3>
              <p className="text-gray-500">
                Try adjusting your search or filter to find what you&apos;re looking for.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
