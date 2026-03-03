import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter, Clock } from 'lucide-react';

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
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <span className="text-[#06a34c] font-bold text-xl">N</span>
              </div>
              <div>
                <h3 className="font-bold text-xl">NIM&apos;S KITCHEN</h3>
                <p className="text-xs text-white/80">Your craving, my crafts</p>
              </div>
            </div>
            <p className="text-white/80 text-sm leading-relaxed">
              Specializing in freshly prepared Ofada rice and flavorful sauce, 
              delivering quality and taste in every plate.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#f9c02d] hover:text-black transition-all"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#f9c02d] hover:text-black transition-all"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#f9c02d] hover:text-black transition-all"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
              <span className="w-8 h-1 bg-[#f9c02d] rounded-full"></span>
              Quick Links
            </h4>
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
            <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
              <span className="w-8 h-1 bg-[#f9c02d] rounded-full"></span>
              Our Services
            </h4>
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
            <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
              <span className="w-8 h-1 bg-[#f9c02d] rounded-full"></span>
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#f9c02d] flex-shrink-0 mt-0.5" />
                <span className="text-white/80 text-sm">
                  Bouesti, Ikere Ekiti,<br />Ekiti State, Nigeria
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#f9c02d] flex-shrink-0" />
                <a href="tel:07062435315" className="text-white/80 hover:text-[#f9c02d] transition-colors">
                  07062435315
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#f9c02d] flex-shrink-0" />
                <a href="mailto:nifemipeace1@gmail.com" className="text-white/80 hover:text-[#f9c02d] transition-colors text-sm">
                  nifemipeace1@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#f9c02d] flex-shrink-0 mt-0.5" />
                <span className="text-white/80 text-sm">
                  Mon - Sat: 8:00 AM - 9:00 PM<br />
                  Sunday: 12:00 PM - 8:00 PM
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
            <div className="flex gap-6">
              <Link to="#" className="hover:text-[#f9c02d] transition-colors">Privacy Policy</Link>
              <Link to="#" className="hover:text-[#f9c02d] transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
