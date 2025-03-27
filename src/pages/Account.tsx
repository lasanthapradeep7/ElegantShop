import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { ChevronRight, User, Package, CreditCard, Settings, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { orders } from "@/lib/data";
import { ProductCard } from "@/components/ProductCard";

// Sidebar Navigation Item type
interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
  current: boolean;
}

const Account = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  
  // Redirect if not logged in
  if (!user) {
    return <Navigate to="/login?redirectTo=/account" replace />;
  }
  
  // Navigation items
  const navigation: NavItem[] = [
    { name: "Profile", href: "#profile", icon: User, current: activeTab === "profile" },
    { name: "Orders", href: "#orders", icon: Package, current: activeTab === "orders" },
    { name: "Payment Methods", href: "#payment", icon: CreditCard, current: activeTab === "payment" },
    { name: "Account Settings", href: "#settings", icon: Settings, current: activeTab === "settings" },
  ];
  
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };
  
  // Render the active tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Personal Information</h3>
              <p className="mt-1 text-sm text-gray-500">
                Update your personal details and contact information.
              </p>
            </div>
            
            <form className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                  First name
                </label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  defaultValue={user.name.split(' ')[0]}
                  className="input-primary mt-1 w-full"
                />
              </div>
              
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                  Last name
                </label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  defaultValue={user.name.split(' ')[1] || ''}
                  className="input-primary mt-1 w-full"
                />
              </div>
              
              <div className="sm:col-span-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  defaultValue={user.email}
                  className="input-primary mt-1 w-full"
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone number
                </label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  className="input-primary mt-1 w-full"
                />
              </div>
              
              <div>
                <label htmlFor="birthday" className="block text-sm font-medium text-gray-700">
                  Birthday
                </label>
                <input
                  type="date"
                  name="birthday"
                  id="birthday"
                  className="input-primary mt-1 w-full"
                />
              </div>
              
              <div className="sm:col-span-2 pt-4">
                <button
                  type="submit"
                  className="btn-primary px-6"
                >
                  Save Changes
                </button>
              </div>
            </form>
            
            <div className="pt-6 mt-6 border-t border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Address Information</h3>
              <p className="mt-1 text-sm text-gray-500">
                Manage your shipping and billing addresses.
              </p>
              
              <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="border rounded-md p-4 relative">
                  <div className="absolute top-4 right-4">
                    <button className="text-sm text-primary hover:text-primary-dark font-medium">
                      Edit
                    </button>
                  </div>
                  
                  <h4 className="text-sm font-medium text-gray-900">Default Shipping Address</h4>
                  <div className="mt-3 text-sm text-gray-600">
                    <p>{user.name}</p>
                    <p>123 Example Street</p>
                    <p>Apt 4B</p>
                    <p>Anuradhapura, North Central 5000</p>
                    <p>Sri Lanka</p>
                    <p className="mt-1">+94 (78) 727 4932</p>
                  </div>
                </div>
                
                <div className="border border-dashed rounded-md p-4 flex items-center justify-center">
                  <button className="text-sm text-primary hover:text-primary-dark font-medium">
                    + Add New Address
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
        
      case "orders":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Order History</h3>
              <p className="mt-1 text-sm text-gray-500">
                Check the status of recent orders and view order details.
              </p>
            </div>
            
            {orders.length > 0 ? (
              <div className="border rounded-md overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Order ID
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">View</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {orders.map((order) => (
                      <tr key={order.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {order.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {order.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={cn(
                            "px-2 inline-flex text-xs leading-5 font-semibold rounded-full",
                            order.status === "delivered" && "bg-green-100 text-green-800",
                            order.status === "shipped" && "bg-blue-100 text-blue-800",
                            order.status === "processing" && "bg-yellow-100 text-yellow-800",
                            order.status === "pending" && "bg-gray-100 text-gray-800"
                          )}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          ${order.total.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Link 
                            to={`/track-order/${order.id}`} 
                            className="text-primary hover:text-primary-dark"
                          >
                            View
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12 border rounded-md">
                <Package className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No orders yet</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Get started by browsing our products.
                </p>
                <div className="mt-6">
                  <Link
                    to="/products"
                    className="btn-primary px-6"
                  >
                    Browse Products
                  </Link>
                </div>
              </div>
            )}
            
            <div className="mt-10">
              <h3 className="text-lg font-medium text-gray-900 mb-6">Recently Viewed Products</h3>
              
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {orders.length > 0 && orders[0].items.slice(0, 4).map((item, index) => (
                  <ProductCard key={index} product={item.product} />
                ))}
              </div>
            </div>
          </div>
        );
        
      case "payment":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Payment Methods</h3>
              <p className="mt-1 text-sm text-gray-500">
                Manage your saved payment methods and preferences.
              </p>
            </div>
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="border rounded-md p-4 relative">
                <div className="absolute top-4 right-4">
                  <button className="text-sm text-primary hover:text-primary-dark font-medium">
                    Edit
                  </button>
                </div>
                
                <h4 className="text-sm font-medium text-gray-900">Credit Card</h4>
                <div className="mt-3 text-sm text-gray-600">
                  <p>**** **** **** 4242</p>
                  <p>Expires 12/24</p>
                  <p>{user.name}</p>
                </div>
                <div className="mt-3">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                    Default
                  </span>
                </div>
              </div>
              
              <div className="border border-dashed rounded-md p-4 flex items-center justify-center">
                <button className="text-sm text-primary hover:text-primary-dark font-medium">
                  + Add New Payment Method
                </button>
              </div>
            </div>
          </div>
        );
        
      case "settings":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Account Settings</h3>
              <p className="mt-1 text-sm text-gray-500">
                Manage your account preferences and privacy settings.
              </p>
            </div>
            
            <div className="border rounded-md divide-y">
              <div className="p-4 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Email Notifications</h4>
                  <p className="text-sm text-gray-500">Receive promotional emails and product updates</p>
                </div>
                <div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
              </div>
              
              <div className="p-4 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Order Updates</h4>
                  <p className="text-sm text-gray-500">Receive notifications about your orders</p>
                </div>
                <div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
              </div>
              
              <div className="p-4 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Two-Factor Authentication</h4>
                  <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                </div>
                <div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
              </div>
            </div>
            
            <div className="pt-6 mt-6 border-t border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Password</h3>
              <p className="mt-1 text-sm text-gray-500">
                Update your password to keep your account secure.
              </p>
              
              <form className="mt-6 space-y-4">
                <div>
                  <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
                    Current Password
                  </label>
                  <input
                    type="password"
                    id="currentPassword"
                    name="currentPassword"
                    className="input-primary mt-1 w-full"
                  />
                </div>
                
                <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                    New Password
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    className="input-primary mt-1 w-full"
                  />
                </div>
                
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    className="input-primary mt-1 w-full"
                  />
                </div>
                
                <div className="pt-2">
                  <button
                    type="submit"
                    className="btn-primary px-6"
                  >
                    Update Password
                  </button>
                </div>
              </form>
            </div>
            
            <div className="pt-6 mt-6 border-t border-gray-200">
              <h3 className="text-lg font-medium text-red-600">Danger Zone</h3>
              <p className="mt-1 text-sm text-gray-500">
                Permanently delete your account and all your data.
              </p>
              
              <div className="mt-6">
                <button
                  type="button"
                  className="inline-flex items-center justify-center px-4 py-2 border border-red-300 shadow-sm text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <main className="py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-8">
          {/* Sidebar */}
          <aside className="lg:col-span-3">
            <div className="sticky top-20 space-y-6">
              {/* User Profile Summary */}
              <div className="pb-6 mb-6 border-b border-gray-200">
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium text-lg">
                    {user.name.charAt(0)}
                  </div>
                  <div className="ml-3">
                    <h2 className="text-base font-medium text-gray-900">{user.name}</h2>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>
              </div>
              
              {/* Navigation */}
              <nav className="space-y-1">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleTabChange(item.href.substring(1));
                    }}
                    className={cn(
                      item.current
                        ? "bg-primary/10 text-primary"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                      "group flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    <item.icon
                      className={cn(
                        item.current 
                          ? "text-primary" 
                          : "text-gray-400 group-hover:text-gray-500",
                        "flex-shrink-0 -ml-1 mr-3 h-5 w-5"
                      )}
                      aria-hidden="true"
                    />
                    <span className="flex-1">{item.name}</span>
                    <ChevronRight
                      className={cn(
                        item.current 
                          ? "text-primary" 
                          : "text-gray-300 group-hover:text-gray-500",
                        "h-4 w-4"
                      )}
                    />
                  </a>
                ))}
                
                {/* Logout */}
                <button
                  onClick={() => logout()}
                  className="w-full text-left text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors"
                >
                  <LogOut
                    className="text-gray-400 group-hover:text-gray-500 flex-shrink-0 -ml-1 mr-3 h-5 w-5"
                    aria-hidden="true"
                  />
                  <span className="flex-1">Sign Out</span>
                </button>
              </nav>
            </div>
          </aside>
          
          {/* Main Content */}
          <div className="mt-10 lg:mt-0 lg:col-span-9">
            <div className="bg-white shadow-sm rounded-lg p-6 animate-fade-in">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Account;
