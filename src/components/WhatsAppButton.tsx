import { MessageCircle } from 'lucide-react';
import { business } from '@/config/business';
import { whatsappLink } from '@/lib/whatsapp';

export default function WhatsAppButton() {
  return (
    <a
      href={whatsappLink(`Hello! I would like to place an order from ${business.name}.`)}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-24 right-4 md:bottom-6 z-40 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300 animate-bounce-slow"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-7 h-7 text-white fill-white" />
    </a>
  );
}
