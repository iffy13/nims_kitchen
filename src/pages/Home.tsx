import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Clock, Truck, ChefHat, Utensils } from 'lucide-react';
import { testimonials, getPopularProducts } from '@/data/products';
import ProductCard from '@/components/ProductCard';

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
const handleScroll = () => {
  if (window.innerWidth < 1024) return; // disable on mobile

  if (heroRef.current) {
    const scrollY = window.scrollY;
    const heroImage = heroRef.current.querySelector('.hero-image') as HTMLElement;
    if (heroImage) {
      heroImage.style.transform = `translateY(${scrollY * 0.3}px)`;
    }
  }
};
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const popularProducts = getPopularProducts().slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        ref={heroRef}
className="relative lg:min-h-screen flex flex-col lg:flex-row items-start lg:items-center pt-10 lg:pt-15 lg:overflow-hidden ...">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-pattern opacity-50"></div>
        
        {/* Floating Circles */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-[#06a34c]/10 rounded-full blur-2xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-[#f9c02d]/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-[#06a34c]/10 rounded-full blur-xl animate-float"></div>

        <div className="section-padding w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-[#06a34c]/10 text-[#06a34c] px-4 py-2 rounded-full text-sm font-medium">
                <Star className="w-4 h-4 fill-[#f9c02d] text-[#f9c02d]" />
                Best Ofada Rice in Ikere Ekiti
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                Authentic{' '}
                <span className="text-[#06a34c]">Ofada Rice</span>
                <br />
                Made with{' '}
                <span className="text-[#f9c02d]">Love</span>
              </h1>
              
              <p className="text-gray-600 text-lg max-w-xl mx-auto lg:mx-0">
                Experience the perfect blend of tradition and taste. Our Ofada rice is 
                prepared fresh daily with authentic palm oil stew and the finest ingredients.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/menu" className="btn-primary flex items-center justify-center gap-2">
                  Order Now
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link to="/about" className="btn-outline flex items-center justify-center gap-2">
                  Learn More
                </Link>
              </div>

              {/* Stats */}
              <div className="flex justify-center lg:justify-start gap-8 pt-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-[#06a34c]">10+</p>
                  <p className="text-sm text-gray-500">Happy Customers</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-[#06a34c]">3hr</p>
                  <p className="text-sm text-gray-500">Delivery</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-[#06a34c]">4.0</p>
                  <p className="text-sm text-gray-500">Rating</p>
                </div>
              </div>
            </div>

            {/* Right Content - Hero Image */}
            <div className="relative flex justify-center lg:justify-end mt-1 lg:mt-0 mb-10 lg:mb-0">
<div className="hero-image relative w-full max-w-md lg:max-w-lg mx-auto lg:mx-0 mt-10 lg:mt-0">                {/* Main Image */}
                <div className="relative z-10 animate-float">
                  <img
  src="/images/ofada-hero.png"
  alt="Delicious Ofada Rice"
className="w-full h-auto object-contain drop-shadow-2xl"/>
                </div>
                
                {/* Floating Badge */}
                <div className="absolute -bottom-2 -left-2 bg-white rounded-2xl shadow-xl p-4 z-20 animate-bounce-slow">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#f9c02d] rounded-full flex items-center justify-center">
                      <Truck className="w-6 h-6 text-black" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">Delivery</p>
                      <p className="text-sm text-gray-500">Within Ikere Ekiti</p>
                    </div>
                  </div>
                </div>

                {/* Price Tag */}
                <div className="absolute top-6 -right-2 bg-[#06a34c] text-white rounded-2xl shadow-xl p-4 z-20 animate-pulse-slow">
                  <p className="text-sm">Starting from</p>
                  <p className="text-2xl font-bold">₦3,500</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="section-padding">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Why Choose <span className="text-[#06a34c]">NIM&apos;S KITCHEN</span>?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We take pride in delivering the best Ofada rice experience with quality ingredients and exceptional service.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: ChefHat,
                title: 'Fresh Ingredients',
                description: 'We use only the freshest ingredients sourced daily from local markets.',
              },
              {
                icon: Clock,
                title: 'Fast Delivery',
                description: 'Get your food delivered within 30-45 minutes of ordering.',
              },
              {
                icon: Utensils,
                title: 'Authentic Recipe',
                description: 'Traditional Ofada rice recipe passed down through generations.',
              },
              {
                icon: Star,
                title: 'Best Quality',
                description: 'Consistent quality and taste in every plate we serve.',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-[#fff8e1] rounded-2xl p-6 text-center card-hover"
              >
                <div className="w-16 h-16 bg-[#06a34c] rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Menu Section */}
      <section className="py-16 lg:py-24 bg-[#f5f5f5]">
        <div className="section-padding">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Popular <span className="text-[#06a34c]">Dishes</span>
              </h2>
              <p className="text-gray-600 max-w-xl">
                Our customers&apos; favorite dishes, prepared with love and served fresh.
              </p>
            </div>
            <Link
              to="/menu"
              className="btn-outline inline-flex items-center justify-center gap-2 self-start"
            >
              View Full Menu
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="section-padding">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              How It <span className="text-[#06a34c]">Works</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Ordering from NIM&apos;S KITCHEN is easy and convenient. Follow these simple steps.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Choose Your Meal',
                description: 'Browse our menu and select your favorite Ofada rice dish and sides.',
              },
              {
                step: '02',
                title: 'Place Your Order',
                description: 'Add items to cart, choose delivery or pickup, and checkout securely.',
              },
              {
                step: '03',
                title: 'Enjoy Your Food',
                description: 'We prepare your food fresh and deliver it hot to your doorstep.',
              },
            ].map((item, index) => (
              <div key={index} className="relative text-center">
                <div className="w-20 h-20 bg-[#06a34c] rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-white">{item.step}</span>
                </div>
                <h3 className="font-bold text-xl mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
                {index < 2 && (
                  <div className="hidden md:block absolute top-10 left-[60%] w-full">
                    <div className="w-24 h-1 bg-[#f9c02d] rounded-full"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 lg:py-24 bg-[#fff8e1]">
        <div className="section-padding">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              What Our <span className="text-[#06a34c]">Customers</span> Say
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Don&apos;t just take our word for it. Here&apos;s what our satisfied customers have to say.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white rounded-2xl p-6 shadow-md card-hover"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#f9c02d] text-[#f9c02d]" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">&quot;{testimonial.text}&quot;</p>
                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">Verified Customer</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-[#06a34c]">
        <div className="section-padding">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
              Ready to Order?
            </h2>
            <p className="text-white/80 text-lg mb-8">
              Experience the authentic taste of Ofada rice delivered straight to your doorstep. 
              Order now and get 10% off your first order!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/menu"
                className="bg-[#f9c02d] text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-[#e5b020] transition-colors flex items-center justify-center gap-2"
              >
                Order Now
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="tel:07062435315"
                className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-[#06a34c] transition-colors"
              >
                Call to Order
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
