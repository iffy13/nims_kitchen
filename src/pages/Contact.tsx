import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from 'lucide-react';
import { toast } from 'sonner';
import { business } from '@/config/business';
import { whatsappLink } from '@/lib/whatsapp';
import SocialLinks from '@/components/SocialLinks';

const hasSocials = Object.values(business.social).some(Boolean);

const encode = (data: Record<string, string>) =>
  Object.entries(data)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join('&');

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

    try {
      // Netlify Forms: the matching hidden form lives in index.html so Netlify detects it at deploy time.
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({ 'form-name': 'contact', ...formData }),
      });
      if (!res.ok) throw new Error(`Status ${res.status}`);
      toast.success('Message sent successfully!', {
        description: 'We will get back to you as soon as possible.',
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch {
      toast.error("Couldn't send your message", {
        description: 'Please try again, or reach us on WhatsApp instead.',
      });
    } finally {
      setIsSubmitting(false);
    }
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
                content: business.addressFull,
                link: null,
              },
              {
                icon: Phone,
                title: 'Call Us',
                content: business.phoneDisplay,
                link: business.phoneTel,
              },
              {
                icon: Mail,
                title: 'Email Us',
                content: business.email,
                link: `mailto:${business.email}`,
              },
              {
                icon: Clock,
                title: 'Business Hours',
                content: business.hoursText.join('\n'),
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
              <form name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field" onSubmit={handleSubmit} className="space-y-4">
                <input type="hidden" name="form-name" value="contact" />
                <div>
                  <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your name"
                    required
                    className="w-full px-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#06a34c] transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Enter your email"
                    required
                    className="w-full px-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#06a34c] transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="contact-subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="contact-subject"
                    name="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="What is this about?"
                    required
                    className="w-full px-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#06a34c] transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
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
                    <p className="text-gray-500 text-sm">{business.addressShort}</p>
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=BOUESTI+Ikere+Ekiti"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-3 text-[#06a34c] font-medium hover:underline"
                    >
                      Open in Google Maps
                    </a>
                  </div>
                </div>
              </div>

              {/* WhatsApp + Social */}
              <div className="bg-white rounded-3xl p-8 shadow-md">
                <h2 className="text-2xl font-bold mb-4">Chat With Us</h2>
                <p className="text-gray-600 mb-6">
                  The fastest way to reach us is WhatsApp.
                </p>
                <a
                  href={whatsappLink(`Hello ${business.name}!`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold text-white bg-[#25D366] hover:bg-[#1ebe5b] transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  Chat on WhatsApp
                </a>
                {hasSocials && (
                  <div className="mt-6">
                    <p className="text-gray-600 mb-3">Follow us for offers and news:</p>
                    <SocialLinks />
                  </div>
                )}
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
                q: 'How do I place an order?',
                a: 'Add your meals to the cart and check out. Your order opens in WhatsApp already filled in — just tap Send and we will confirm it.',
              },
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
                a: `We are open ${business.hoursText.join(', and ')}.`,
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
