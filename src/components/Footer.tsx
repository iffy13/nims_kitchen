import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import { business } from '@/config/business';
import { whatsappLink } from '@/lib/whatsapp';
import SocialLinks from '@/components/SocialLinks';

const quickLinks = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/about' },
  { name: 'Our Menu', path: '/menu' },
  { name: 'Contact', path: '/contact' },
];

const services = [
  { name: 'Delivery', path: '/menu' },
  { name: 'Pickup', path: '/menu' },
  { name: 'Catering', path: '/contact' },
  { name: 'Events', path: '/contact' },
];

export default function Footer() {
  return (
    <footer className="bg-[#048a3d] text-white">
      {/* Main Footer */}
      <div className="section-padding py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src="/logo.jpeg" alt="" width={48} height={48} className="w-12 h-12 rounded-full object-cover bg-white" />
              <div>
                <p className="font-bold text-xl">NIM&apos;S KITCHEN</p>
                <p className="text-xs text-white/80">Your craving, my crafts</p>
              </div>
            </div>
            <p className="text-white/80 text-sm leading-relaxed">
              Specializing in freshly prepared Ofada rice and flavorful sauce, 
              delivering quality and taste in every plate.
            </p>
            <SocialLinks size="sm" />
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
              <span className="w-8 h-1 bg-[#f9c02d] rounded-full"></span>
              Quick Links
            </h2>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-white/80 hover:text-[#f9c02d] transition-colors flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 bg-[#f9c02d] rounded-full"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
              <span className="w-8 h-1 bg-[#f9c02d] rounded-full"></span>
              Our Services
            </h2>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    to={service.path}
                    className="text-white/80 hover:text-[#f9c02d] transition-colors flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 bg-[#f9c02d] rounded-full"></span>
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
              <span className="w-8 h-1 bg-[#f9c02d] rounded-full"></span>
              Contact Us
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#f9c02d] flex-shrink-0 mt-0.5" />
                <span className="text-white/80 text-sm">
                  {business.addressFull}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#f9c02d] flex-shrink-0" />
                <a href={business.phoneTel} className="text-white/80 hover:text-[#f9c02d] transition-colors">
                  {business.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MessageCircle className="w-5 h-5 text-[#f9c02d] flex-shrink-0" />
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-[#f9c02d] transition-colors">
                  Chat on WhatsApp
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#f9c02d] flex-shrink-0" />
                <a href={`mailto:${business.email}`} className="text-white/80 hover:text-[#f9c02d] transition-colors text-sm break-all">
                  {business.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#f9c02d] flex-shrink-0 mt-0.5" />
                <span className="text-white/80 text-sm">
                  {business.hoursText.map((line) => (
                    <span key={line} className="block">{line}</span>
                  ))}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="section-padding py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/60">
            <p>&copy; {new Date().getFullYear()} NIM&apos;S KITCHEN. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
