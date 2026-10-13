import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { useAdmin } from '@/store/adminStore';
import { toast } from 'sonner';

export default function AdminLogin() {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAdmin();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  // Redirect if already authenticated
  if (isAuthenticated) {
    navigate('/admin');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    const success = login(formData.username, formData.password);

    if (success) {
      toast.success('Login successful!');
      navigate('/admin');
    } else {
      toast.error('Invalid username or password');
    }

    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#06a34c] to-[#048a3d] flex items-center justify-center p-4">
      {/* Back Button */}
      <button
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 text-white flex items-center gap-2 hover:underline"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Website
      </button>

      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span className="text-[#06a34c] font-bold text-3xl">N</span>
          </div>
          <h1 className="text-white text-2xl font-bold">NIM&apos;S KITCHEN</h1>
          <p className="text-white/80">Admin Dashboard</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-center mb-2">Welcome Back</h2>
          <p className="text-gray-500 text-center mb-6">
            Please sign in to access the admin dashboard
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  placeholder="Enter username"
                  required
                  className="w-full pl-12 pr-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#06a34c] transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Enter password"
                  required
                  className="w-full pl-12 pr-12 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#06a34c] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#06a34c] text-white py-3 rounded-xl font-semibold hover:bg-[#048a3d] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="animate-pulse">Signing in...</span>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Default credentials:<br />
              Username: <span className="font-mono">admin</span><br />
              Password: <span className="font-mono">nimskitchen2024</span>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-white/60 text-sm mt-8">
          &copy; {new Date().getFullYear()} NIM&apos;S KITCHEN. All rights reserved.
        </p>
      </div>
    </div>
  );
}
