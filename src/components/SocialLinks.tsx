import { Facebook, Instagram, Twitter } from 'lucide-react';
import { business } from '@/config/business';

const NETWORKS = [
  { key: 'facebook', label: 'Facebook', icon: Facebook, className: 'bg-[#1877F2]' },
  { key: 'instagram', label: 'Instagram', icon: Instagram, className: 'bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737]' },
  { key: 'twitter', label: 'X (Twitter)', icon: Twitter, className: 'bg-black' },
] as const;

const activeSocials = NETWORKS.filter((n) => business.social[n.key]);

/** Renders only the networks that have a URL set in src/config/business.ts. */
export default function SocialLinks({ size = 'md' }: { size?: 'sm' | 'md' }) {
  if (activeSocials.length === 0) return null;
  const box = size === 'sm' ? 'w-10 h-10' : 'w-12 h-12';
  const icon = size === 'sm' ? 'w-5 h-5' : 'w-6 h-6';
  return (
    <div className="flex gap-4">
      {activeSocials.map((n) => (
        <a
          key={n.key}
          href={business.social[n.key]}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={n.label}
          className={`${box} ${n.className} rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform`}
        >
          <n.icon className={icon} />
        </a>
      ))}
    </div>
  );
}
