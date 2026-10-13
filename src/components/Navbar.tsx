import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart, Phone } from 'lucide-react';
import { useCart } from '@/store/cartStore';
const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Menu', path: '/menu' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { getCartCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const cartCount = getCartCount();

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="section-padding">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
{/* Logo */}
<Link to="/" className="flex items-center gap-2">
<img
  src="/logo.jpeg"
  alt="NIM'S KITCHEN Logo"
  className="h-14 w-20000 border border-white-500"
/>
  <div className="hidden sm:block">
    <h1 className="font-bold text-lg lg:text-xl text-[#06a34c]">
      NIM&apos;S KITCHEN
    </h1>
    <p className="text-xs text-gray-500 -mt-1">
      Your craving, my crafts
    </p>
  </div>
</Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`font-medium transition-colors duration-300 ${
                  location.pathname === link.path
                    ? 'text-[#06a34c]'
                    : 'text-gray-700 hover:text-[#06a34c]'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3 lg:gap-4">
            {/* Phone */}
            <a
              href="tel:07062435315"
              className="hidden md:flex items-center gap-2 text-[#06a34c] hover:text-[#048a3d] transition-colors"
            >
              <Phone className="w-5 h-5" />
              <span className="font-medium">07062435315</span>
            </a>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative p-2 bg-[#f9c02d] rounded-full hover:bg-[#e5b020] transition-colors"
            >
              <ShoppingCart className="w-5 h-5 text-black" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#06a34c] text-white text-xs font-bold rounded-full flex items-center justify-center animate-bounce">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Order Now Button - Desktop */}
            <Link
              to="/menu"
              className="hidden lg:block btn-primary"
            >
              Order Now
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-gray-700 hover:text-[#06a34c] transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg transition-all duration-300 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="section-padding py-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`block py-3 px-4 rounded-lg font-medium transition-colors ${
                location.pathname === link.path
                  ? 'bg-[#06a34c] text-white'
                  : 'text-gray-700 hover:bg-[#fff8e1] hover:text-[#06a34c]'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/menu"
            className="block w-full text-center btn-primary mt-4"
          >
            Order Now
          </Link>
          <a
            href="tel:07062435315"
            className="flex items-center justify-center gap-2 py-3 text-[#06a34c] font-medium"
          >
            <Phone className="w-5 h-5" />
            07062435315
          </a>
        </div>
      </div>
    </nav>
  );
}
