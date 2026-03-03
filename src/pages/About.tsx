import { Check, Heart, Award, Users } from 'lucide-react';

const values = [
  {
    icon: Heart,
    title: 'Passion for Food',
    description: 'We pour our heart into every dish we prepare, ensuring each plate is made with love and care.',
  },
  {
    icon: Award,
    title: 'Quality First',
    description: 'We never compromise on quality. Only the freshest ingredients make it to your plate.',
  },
  {
    icon: Users,
    title: 'Customer Focus',
    description: 'Your satisfaction is our priority. We go above and beyond to exceed your expectations.',
  },
];

const highlights = [
  'Authentic Ofada rice recipe',
  'Fresh ingredients daily',
  'Fast delivery service',
  'Affordable prices',
  'Excellent customer service',
  'Hygienic preparation',
];

export default function About() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-[#fff8e1] to-white">
        <div className="section-padding">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#f9c02d] rounded-full opacity-50"></div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-[#06a34c] rounded-full opacity-20"></div>
              <img
                src="/images/about-kitchen.jpg"
                alt="NIM'S KITCHEN"
                className="relative z-10 rounded-3xl shadow-2xl w-full"
              />
            </div>

            {/* Content */}
            <div className="space-y-6">
              <span className="inline-block bg-[#06a34c]/10 text-[#06a34c] px-4 py-2 rounded-full text-sm font-medium">
                About Us
              </span>
              <h1 className="text-4xl lg:text-5xl font-bold">
                Our Story of{' '}
                <span className="text-[#06a34c]">Passion</span> &{' '}
                <span className="text-[#f9c02d]">Flavor</span>
              </h1>
              <p className="text-gray-600 text-lg leading-relaxed">
                NIM&apos;S KITCHEN was born from a simple dream: to share the authentic taste of 
                traditional Nigerian Ofada rice with everyone. What started as a small home kitchen 
                has grown into a beloved food destination in Ikere Ekiti.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Our founder, Nifemi, learned the art of preparing Ofada rice from her grandmother, 
                preserving the traditional recipes and techniques that have been passed down through 
                generations. Every plate we serve carries this legacy of love and authenticity.
              </p>
              <div className="flex flex-wrap gap-3">
                {highlights.slice(0, 4).map((item, index) => (
                  <span
                    key={index}
                    className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm text-sm"
                  >
                    <Check className="w-4 h-4 text-[#06a34c]" />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="section-padding">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-[#06a34c] rounded-3xl p-8 lg:p-12 text-white">
              <h2 className="text-2xl lg:text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-white/90 leading-relaxed">
                To deliver the most authentic and delicious Ofada rice experience to every customer, 
                using traditional recipes, fresh ingredients, and a whole lot of love. We aim to 
                preserve Nigerian culinary heritage while providing exceptional service.
              </p>
            </div>
            <div className="bg-[#f9c02d] rounded-3xl p-8 lg:p-12 text-black">
              <h2 className="text-2xl lg:text-3xl font-bold mb-4">Our Vision</h2>
              <p className="text-black/80 leading-relaxed">
                To become the most trusted and loved Ofada rice brand in Nigeria, known for our 
                commitment to quality, authenticity, and customer satisfaction. We envision a 
                future where every Nigerian can enjoy authentic Ofada rice wherever they are.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 lg:py-24 bg-[#f5f5f5]">
        <div className="section-padding">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Our <span className="text-[#06a34c]">Values</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These core principles guide everything we do at NIM&apos;S KITCHEN.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 text-center card-hover"
              >
                <div className="w-16 h-16 bg-[#06a34c] rounded-full flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-xl mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="section-padding">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold">
                Why Choose <span className="text-[#06a34c]">NIM&apos;S KITCHEN</span>?
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We believe that great food starts with great ingredients and even greater care. 
                Here&apos;s what sets us apart from the rest.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {highlights.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-4 bg-[#fff8e1] rounded-xl"
                  >
                    <div className="w-8 h-8 bg-[#06a34c] rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-medium text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Image Grid */}
            <div className="grid grid-cols-2 gap-4">
              <img
                src="/images/ofada-classic.png"
                alt="Ofada Rice"
                className="rounded-2xl shadow-lg w-full h-48 object-cover"
              />
              <img
                src="/images/ofada-assorted.png"
                alt="Assorted Ofada"
                className="rounded-2xl shadow-lg w-full h-48 object-cover mt-8"
              />
              <img
                src="/images/protein-suya.png"
                alt="Suya"
                className="rounded-2xl shadow-lg w-full h-48 object-cover"
              />
              <img
                src="/images/ofada-beef.png"
                alt="Beef Ofada"
                className="rounded-2xl shadow-lg w-full h-48 object-cover mt-8"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 lg:py-24 bg-[#06a34c]">
        <div className="section-padding">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: '500+', label: 'Happy Customers' },
              { number: '1000+', label: 'Orders Delivered' },
              { number: '2+', label: 'Years Experience' },
              { number: '4.9', label: 'Average Rating' },
            ].map((stat, index) => (
              <div key={index} className="text-center text-white">
                <p className="text-4xl lg:text-5xl font-bold mb-2">{stat.number}</p>
                <p className="text-white/80">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
