import { useState } from 'react';
import { Plus, Minus, Check } from 'lucide-react';
import type { Product, AddOn } from '@/types';
import { useCart } from '@/store/cartStore';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedAddOns, setSelectedAddOns] = useState<AddOn[]>([]);
  const [showAddOns, setShowAddOns] = useState(false);
  const { addToCart } = useCart();

  const handleAddOnToggle = (addOn: AddOn) => {
    setSelectedAddOns((prev) =>
      prev.find((a) => a.id === addOn.id)
        ? prev.filter((a) => a.id !== addOn.id)
        : [...prev, addOn]
    );
  };

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedAddOns);
    toast.success(`${product.name} added to cart!`, {
      description: `Quantity: ${quantity}${selectedAddOns.length > 0 ? ` + ${selectedAddOns.length} add-on(s)` : ''}`,
    });
    setQuantity(1);
    setSelectedAddOns([]);
    setShowAddOns(false);
  };

  const totalPrice = product.price + selectedAddOns.reduce((sum, a) => sum + a.price, 0);

  if (!product.available) {
    return (
      <div className="bg-gray-100 rounded-2xl overflow-hidden opacity-60">
        <div className="aspect-square bg-gray-200 flex items-center justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover grayscale"
          />
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-gray-500">{product.name}</h3>
          <p className="text-sm text-gray-400 mt-1">Currently unavailable</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md card-hover group">
      {/* Image */}
      <div className="aspect-square bg-[#fff8e1] relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {product.popular && (
          <span className="absolute top-3 left-3 bg-[#f9c02d] text-black text-xs font-bold px-3 py-1 rounded-full">
            Popular
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-gray-900 line-clamp-1">{product.name}</h3>
          <span className="font-bold text-[#06a34c] whitespace-nowrap">
            ₦{product.price.toLocaleString()}
          </span>
        </div>
        <p className="text-sm text-gray-500 mt-1 line-clamp-2">{product.description}</p>

        {/* Add-ons */}
        {product.addOns && product.addOns.length > 0 && (
          <div className="mt-3">
            <button
              onClick={() => setShowAddOns(!showAddOns)}
              className="text-xs text-[#06a34c] font-medium hover:underline"
            >
              {showAddOns ? 'Hide add-ons' : 'Add extras'}
            </button>
            
            {showAddOns && (
              <div className="mt-2 space-y-2">
                {product.addOns.map((addOn) => (
                  <label
                    key={addOn.id}
                    className="flex items-center justify-between p-2 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                          selectedAddOns.find((a) => a.id === addOn.id)
                            ? 'bg-[#06a34c] border-[#06a34c]'
                            : 'border-gray-300'
                        }`}
                      >
                        {selectedAddOns.find((a) => a.id === addOn.id) && (
                          <Check className="w-3 h-3 text-white" />
                        )}
                      </div>
                      <span className="text-sm">{addOn.name}</span>
                    </div>
                    <span className="text-sm font-medium">+₦{addOn.price}</span>
                    <input
                      type="checkbox"
                      className="hidden"
                      checked={!!selectedAddOns.find((a) => a.id === addOn.id)}
                      onChange={() => handleAddOnToggle(addOn)}
                    />
                  </label>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Quantity and Add to Cart */}
        <div className="mt-4 flex items-center gap-3">
          {/* Quantity Selector */}
          <div className="flex items-center bg-gray-100 rounded-full">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-[#06a34c] transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-8 text-center font-semibold">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-[#06a34c] transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="flex-1 btn-primary py-2 text-sm flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add - ₦{(totalPrice * quantity).toLocaleString()}
          </button>
        </div>
      </div>
    </div>
  );
}
