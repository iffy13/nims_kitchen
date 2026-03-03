import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, Facebook, Instagram, Twitter } from 'lucide-react';
import { toast } from 'sonner';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast.success('Message sent successfully!', {
      description: 'We will get back to you as soon as possible.',
    });

    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-12 lg:py-16 bg-gradient-to-br from-[#fff8e1] to-white">
        <div className="section-padding">
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Get in <span className="text-[#06a34c]">Touch</span>
            </h1>
            <p className="text-gray-600">
              Have a question or feedback? We&apos;d love to hear from you. 
              Reach out to us and we&apos;ll get back to you as soon as possible.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 bg-white">
        <div className="section-padding">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: MapPin,
                title: 'Visit Us',
                content: 'Bouesti, Ikere Ekiti, Ekiti State, Nigeria',
                link: null,
              },
              {
                icon: Phone,
                title: 'Call Us',
                content: '07062435315',
                link: 'tel:07062435315',
              },
              {
                icon: Mail,
                title: 'Email Us',
                content: 'nifemipeace1@gmail.com',
                link: 'mailto:nifemipeace1@gmail.com',
              },
              {
                icon: Clock,
                title: 'Business Hours',
                content: 'Mon-Sat: 8AM - 9PM\nSun: 12PM - 8PM',
                link: null,
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-[#f5f5f5] rounded-2xl p-6 text-center card-hover"
              >
                <div className="w-14 h-14 bg-[#06a34c] rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                {item.link ? (
                  <a
                    href={item.link}
                    className="text-gray-600 whitespace-pre-line hover:text-[#06a34c] transition-colors"
                  >
                    {item.content}
                  </a>
                ) : (
                  <p className="text-gray-600 whitespace-pre-line">{item.content}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-12 lg:py-24 bg-[#f5f5f5]">
        <div className="section-padding">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-3xl p-8 shadow-md">
              <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your name"
                    required
                    className="w-full px-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#06a34c] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Enter your email"
                    required
                    className="w-full px-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#06a34c] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="What is this about?"
                    required
                    className="w-full px-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#06a34c] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Write your message here..."
                    rows={5}
                    required
                    className="w-full px-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#06a34c] transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span className="animate-pulse">Sending...</span>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Map & Social */}
            <div className="space-y-6">
              {/* Map Placeholder */}
              <div className="bg-white rounded-3xl p-8 shadow-md">
                <h2 className="text-2xl font-bold mb-4">Our Location</h2>
                <div className="aspect-video bg-[#e8f5e9] rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-[#06a34c] mx-auto mb-2" />
                    <p className="font-semibold text-gray-700">NIM&apos;S KITCHEN</p>
                    <p className="text-gray-500 text-sm">Bouesti, Ikere Ekiti</p>
                    <a
                      href="https://maps.google.com/?q=Ikere+Ekiti"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-3 text-[#06a34c] font-medium hover:underline"
                    >
                      Open in Google Maps
                    </a>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-white rounded-3xl p-8 shadow-md">
                <h2 className="text-2xl font-bold mb-4">Follow Us</h2>
                <p className="text-gray-600 mb-6">
                  Stay updated with our latest offers and news by following us on social media.
                </p>
                <div className="flex gap-4">
                  <a
                    href="#"
                    className="w-12 h-12 bg-[#1877F2] rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform"
                  >
                    <Facebook className="w-6 h-6" />
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform"
                  >
                    <Instagram className="w-6 h-6" />
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 bg-[#1DA1F2] rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform"
                  >
                    <Twitter className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 lg:py-24 bg-white">
        <div className="section-padding">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Frequently Asked <span className="text-[#06a34c]">Questions</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about our service.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                q: 'What areas do you deliver to?',
                a: 'We currently deliver within Ikere Ekiti and surrounding areas including Bouesti, Afao Road, and Igbemo.',
              },
              {
                q: 'How long does delivery take?',
                a: 'Our average delivery time is 30-45 minutes from when your order is confirmed.',
              },
              {
                q: 'What are your business hours?',
                a: 'We are open Monday to Saturday from 8:00 AM to 9:00 PM, and Sunday from 12:00 PM to 8:00 PM.',
              },
              {
                q: 'Do you offer catering services?',
                a: 'Yes! We offer catering for events and parties. Contact us for more information and custom quotes.',
              },
              {
                q: 'Can I schedule an order for later?',
                a: 'Absolutely! You can schedule your order for a specific date and time during checkout.',
              },
              {
                q: 'What payment methods do you accept?',
                a: 'We accept Pay on Delivery, Bank Transfer, and Card payments (coming soon).',
              },
            ].map((faq, index) => (
              <div key={index} className="bg-[#f5f5f5] rounded-2xl p-6">
                <h3 className="font-bold text-lg mb-2">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
