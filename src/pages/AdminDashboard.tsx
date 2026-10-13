import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  ShoppingBag,
  Settings,
  LogOut,
  Clock,
  CheckCircle,
  XCircle,
  ChefHat,
  Truck,
  Package,
  Plus,
  Edit2,
  Trash2,
  Search,
  Download,
  Star,
  DollarSign,
} from 'lucide-react';
import { useAdmin } from '@/store/adminStore';
import { useOrder } from '@/store/orderStore';
import { useSettings } from '@/store/settingsStore';
import { products } from '@/data/products';
import type { OrderStatus } from '@/types';
import { toast } from 'sonner';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAdmin();
  const { orders, updateOrderStatus, getTodayOrders } = useOrder();
  const settings = useSettings();

  const [activeTab, setActiveTab] = useState<'dashboard' | 'orders' | 'menu' | 'settings'>('dashboard');
  const [orderFilter, setOrderFilter] = useState<OrderStatus | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;

  const todayOrders = getTodayOrders();
  const pendingOrders = orders.filter((o) => o.status === 'pending');
  const preparingOrders = orders.filter((o) => o.status === 'preparing');

  const filteredOrders = orders.filter((order) => {
    const matchesFilter = orderFilter === 'all' || order.status === orderFilter;
    const matchesSearch = 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerInfo.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerInfo.phone.includes(searchQuery);
    return matchesFilter && matchesSearch;
  });

  const todayRevenue = todayOrders.reduce((sum, order) => sum + order.total, 0);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
    toast.success('Logged out successfully');
  };

  const exportOrders = () => {
    const csvContent = [
      ['Order ID', 'Date', 'Customer', 'Phone', 'Total', 'Status'].join(','),
      ...orders.map((o) => [
        o.id,
        new Date(o.createdAt).toLocaleDateString(),
        o.customerInfo.fullName,
        o.customerInfo.phone,
        o.total,
        o.status,
      ].join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `orders-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Orders exported successfully');
  };

  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-5 h-5" />;
      case 'preparing':
        return <ChefHat className="w-5 h-5" />;
      case 'ready':
        return <Package className="w-5 h-5" />;
      case 'delivered':
        return <CheckCircle className="w-5 h-5" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'preparing':
        return 'bg-blue-100 text-blue-700';
      case 'ready':
        return 'bg-purple-100 text-purple-700';
      case 'delivered':
        return 'bg-green-100 text-green-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 bottom-0 w-64 bg-[#06a34c] text-white z-50 hidden lg:block">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <span className="text-[#06a34c] font-bold text-lg">N</span>
            </div>
            <div>
              <h1 className="font-bold">NIM&apos;S KITCHEN</h1>
              <p className="text-xs text-white/70">Admin Dashboard</p>
            </div>
          </div>

          <nav className="space-y-2">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
              { id: 'orders', label: 'Orders', icon: ShoppingBag },
              { id: 'menu', label: 'Menu', icon: ChefHat },
              { id: 'settings', label: 'Settings', icon: Settings },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as typeof activeTab)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  activeTab === item.id
                    ? 'bg-white text-[#06a34c]'
                    : 'hover:bg-white/10'
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-all"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-[#06a34c] text-white z-50 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <span className="text-[#06a34c] font-bold">N</span>
            </div>
            <span className="font-bold">Admin</span>
          </div>
          <button onClick={handleLogout}>
            <LogOut className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg z-50 px-2 py-2">
        <div className="flex justify-around">
          {[
            { id: 'dashboard', icon: LayoutDashboard },
            { id: 'orders', icon: ShoppingBag },
            { id: 'menu', icon: ChefHat },
            { id: 'settings', icon: Settings },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as typeof activeTab)}
              className={`p-3 rounded-xl ${
                activeTab === item.id ? 'bg-[#06a34c] text-white' : 'text-gray-500'
              }`}
            >
              <item.icon className="w-6 h-6" />
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="lg:ml-64 pt-16 lg:pt-0 pb-20 lg:pb-0 min-h-screen">
        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>

            {/* Stats Cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                {
                  label: 'Today\'s Orders',
                  value: todayOrders.length,
                  icon: ShoppingBag,
                  color: 'bg-blue-500',
                },
                {
                  label: 'Today\'s Revenue',
                  value: `₦${todayRevenue.toLocaleString()}`,
                  icon: DollarSign,
                  color: 'bg-green-500',
                },
                {
                  label: 'Pending Orders',
                  value: pendingOrders.length,
                  icon: Clock,
                  color: 'bg-yellow-500',
                },
                {
                  label: 'Preparing',
                  value: preparingOrders.length,
                  icon: ChefHat,
                  color: 'bg-purple-500',
                },
              ].map((stat, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-sm">{stat.label}</p>
                      <p className="text-2xl font-bold mt-1">{stat.value}</p>
                    </div>
                    <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="p-6 border-b flex items-center justify-between">
                <h3 className="font-bold text-lg">Recent Orders</h3>
                <button
                  onClick={() => setActiveTab('orders')}
                  className="text-[#06a34c] font-medium hover:underline"
                >
                  View All
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {orders.slice(0, 5).map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-medium">{order.id}</td>
                        <td className="px-6 py-4">{order.customerInfo.fullName}</td>
                        <td className="px-6 py-4">₦{order.total.toLocaleString()}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                            {getStatusIcon(order.status)}
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <h2 className="text-2xl font-bold">Orders</h2>
              <button
                onClick={exportOrders}
                className="flex items-center gap-2 px-4 py-2 bg-[#06a34c] text-white rounded-xl hover:bg-[#048a3d] transition-colors"
              >
                <Download className="w-5 h-5" />
                Export CSV
              </button>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-2xl p-4 mb-6 flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search orders..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-2 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#06a34c]"
                />
              </div>
              <select
                value={orderFilter}
                onChange={(e) => setOrderFilter(e.target.value as OrderStatus | 'all')}
                className="px-4 py-2 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#06a34c]"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="preparing">Preparing</option>
                <option value="ready">Ready</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Items</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {filteredOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-medium">{order.id}</td>
                        <td className="px-6 py-4 text-sm">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-medium">{order.customerInfo.fullName}</p>
                            <p className="text-sm text-gray-500">{order.customerInfo.phone}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">{order.items.length} items</td>
                        <td className="px-6 py-4 font-semibold">₦{order.total.toLocaleString()}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                            {getStatusIcon(order.status)}
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <select
                            value={order.status}
                            onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                            className="px-3 py-1 bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#06a34c]"
                          >
                            <option value="pending">Pending</option>
                            <option value="preparing">Preparing</option>
                            <option value="ready">Ready</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {filteredOrders.length === 0 && (
                <div className="text-center py-12">
                  <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No orders found</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Menu Tab */}
        {activeTab === 'menu' && (
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Menu Management</h2>
              <button
                onClick={() => toast.info('Add product feature coming soon!')}
                className="flex items-center gap-2 px-4 py-2 bg-[#06a34c] text-white rounded-xl hover:bg-[#048a3d] transition-colors"
              >
                <Plus className="w-5 h-5" />
                Add Product
              </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {products.map((product) => (
                      <tr key={product.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                            <div>
                              <p className="font-medium">{product.name}</p>
                              {product.popular && (
                                <span className="text-xs text-[#f9c02d] flex items-center gap-1">
                                  <Star className="w-3 h-3 fill-current" />
                                  Popular
                                </span>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 capitalize">{product.category}</td>
                        <td className="px-6 py-4 font-semibold">₦{product.price.toLocaleString()}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                            product.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                          }`}>
                            {product.available ? 'Available' : 'Unavailable'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => toast.info('Edit feature coming soon!')}
                              className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => toast.info('Delete feature coming soon!')}
                              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Settings</h2>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Business Hours */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#06a34c]" />
                  Business Hours
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Opening Time</label>
                    <input
                      type="time"
                      defaultValue={settings.openingTime}
                      className="w-full px-4 py-2 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#06a34c]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Closing Time</label>
                    <input
                      type="time"
                      defaultValue={settings.closingTime}
                      className="w-full px-4 py-2 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#06a34c]"
                    />
                  </div>
                </div>
              </div>

              {/* Delivery Settings */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <Truck className="w-5 h-5 text-[#06a34c]" />
                  Delivery Settings
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Delivery Fee (₦)</label>
                    <input
                      type="number"
                      defaultValue={settings.deliveryFee}
                      className="w-full px-4 py-2 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#06a34c]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Minimum Order (₦)</label>
                    <input
                      type="number"
                      defaultValue={settings.minimumOrderAmount}
                      className="w-full px-4 py-2 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#06a34c]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Preparation Time (minutes)</label>
                    <input
                      type="number"
                      defaultValue={settings.preparationTime}
                      className="w-full px-4 py-2 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#06a34c]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="mt-6">
              <button
                onClick={() => toast.success('Settings saved successfully!')}
                className="px-6 py-3 bg-[#06a34c] text-white rounded-xl font-semibold hover:bg-[#048a3d] transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
