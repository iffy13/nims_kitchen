import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen pt-20 flex items-center justify-center">
      <div className="text-center px-4">
        <p className="text-6xl font-bold text-[#06a34c] mb-4">404</p>
        <h1 className="text-2xl font-bold mb-2">Page not found</h1>
        <p className="text-gray-500 mb-6">The page you&apos;re looking for doesn&apos;t exist.</p>
        <Link to="/menu" className="btn-primary inline-block">See the Menu</Link>
      </div>
    </div>
  );
}
