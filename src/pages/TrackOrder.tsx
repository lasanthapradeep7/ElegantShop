import { useState, FormEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getOrderById, Order } from "@/lib/data";
import { CheckCircle, Truck, Package, ArrowRight, Clock, Search } from "lucide-react";
import { cn } from "@/lib/utils";

const TrackOrder = () => {
  const { orderId: orderIdParam } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  
  const [orderId, setOrderId] = useState(orderIdParam || "");
  const [order, setOrder] = useState<Order | null>(orderIdParam ? getOrderById(orderIdParam) : null);
  const [error, setError] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!orderId.trim()) {
      setError("Please enter an order ID");
      return;
    }
    
    setIsSearching(true);
    
    // Simulate API call
    setTimeout(() => {
      const foundOrder = getOrderById(orderId);
      
      if (foundOrder) {
        setOrder(foundOrder);
        navigate(`/track-order/${orderId}`);
      } else {
        setError("Order not found. Please check the ID and try again.");
      }
      
      setIsSearching(false);
    }, 1000);
  };
  
  // Define status steps
  const statusSteps = [
    { id: "pending", label: "Order Placed", icon: Clock },
    { id: "processing", label: "Processing", icon: Package },
    { id: "shipped", label: "Shipped", icon: Truck },
    { id: "delivered", label: "Delivered", icon: CheckCircle },
  ];
  
  // Determine the current step index
  const getCurrentStepIndex = (status: string) => {
    return statusSteps.findIndex(step => step.id === status);
  };
  
  return (
    <main className="py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Track Your Order</h1>
          
          {/* Order Tracking Form */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-10">
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="orderId" className="block text-sm font-medium text-gray-700 mb-1">
                    Enter Your Order ID
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="orderId"
                      value={orderId}
                      onChange={(e) => setOrderId(e.target.value)}
                      placeholder="e.g. ORD-1234-5678"
                      className={cn(
                        "input-primary w-full pl-10",
                        error && "border-red-500 focus:ring-red-500"
                      )}
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                  {error && (
                    <p className="mt-1 text-sm text-red-600">{error}</p>
                  )}
                </div>
                
                <button
                  type="submit"
                  disabled={isSearching}
                  className={cn(
                    "w-full btn-primary py-3",
                    isSearching && "opacity-75 cursor-not-allowed"
                  )}
                >
                  {isSearching ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Searching...
                    </div>
                  ) : (
                    "Track Order"
                  )}
                </button>
              </div>
            </form>
          </div>
          
          {/* Order Tracking Results */}
          {order && (
            <div className="bg-white rounded-lg shadow-sm p-6 animate-fade-in">
              <div className="border-b border-gray-200 pb-6 mb-6">
                <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
                  <div>
                    <h2 className="text-lg font-medium text-gray-900">Order #{order.id}</h2>
                    <p className="text-sm text-gray-600">Placed on {order.date}</p>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-primary bg-opacity-10 text-primary text-sm font-medium">
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </div>
                </div>
                
                {/* Status Tracker */}
                <div className="relative">
                  <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 z-0" />
                  
                  <div className="relative z-10 flex justify-between">
                    {statusSteps.map((step, index) => {
                      const currentIndex = getCurrentStepIndex(order.status);
                      const isCompleted = index <= currentIndex;
                      const isCurrent = index === currentIndex;
                      
                      return (
                        <div key={step.id} className="flex flex-col items-center space-y-2">
                          <div
                            className={cn(
                              "h-10 w-10 rounded-full flex items-center justify-center",
                              isCompleted
                                ? "bg-primary text-white"
                                : "bg-gray-100 text-gray-400"
                            )}
                          >
                            <step.icon className="h-5 w-5" />
                          </div>
                          <span
                            className={cn(
                              "text-xs font-medium whitespace-nowrap",
                              isCompleted ? "text-gray-900" : "text-gray-500"
                            )}
                          >
                            {step.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              
              {/* Order Details */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-4">Order Details</h3>
                  <div className="divide-y divide-gray-200">
                    {order.items.map((item, index) => (
                      <div key={index} className="py-3 flex items-center">
                        <div className="h-16 w-16 flex-shrink-0 rounded-md border border-gray-200 overflow-hidden">
                          <img 
                            src={item.product.image} 
                            alt={item.product.name}
                            className="h-full w-full object-cover object-center" 
                          />
                        </div>
                        <div className="ml-4 flex-1">
                          <p className="text-sm font-medium text-gray-900">{item.product.name}</p>
                          <p className="mt-1 text-sm text-gray-500">Qty: {item.quantity}</p>
                        </div>
                        <p className="text-sm font-medium text-gray-900">${(item.product.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-2">Shipping Address</h3>
                    <address className="not-italic text-sm text-gray-600">
                      <p>{order.shippingAddress.name}</p>
                      <p>{order.shippingAddress.street}</p>
                      <p>
                        {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}
                      </p>
                      <p>{order.shippingAddress.country}</p>
                    </address>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-2">Payment Information</h3>
                    <p className="text-sm text-gray-600">Method: {order.paymentMethod}</p>
                    <p className="text-sm text-gray-600 mt-2">Total: ${order.total.toFixed(2)}</p>
                  </div>
                </div>
              </div>
              
              {/* Timeline Updates */}
              <div className="mt-8 border-t border-gray-200 pt-6">
                <h3 className="text-sm font-medium text-gray-900 mb-4">Shipping Updates</h3>
                <div className="space-y-6">
                  {/* This would normally be populated from the API */}
                  {order.status === "delivered" && (
                    <div className="relative pl-6">
                      <div className="absolute left-0 top-1.5 h-3 w-3 rounded-full bg-green-500" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Delivered</p>
                        <p className="text-sm text-gray-600">Your package has been delivered.</p>
                        <p className="text-xs text-gray-500 mt-1">Today, 10:32 AM</p>
                      </div>
                    </div>
                  )}
                  
                  {(order.status === "delivered" || order.status === "shipped") && (
                    <div className="relative pl-6">
                      <div className="absolute left-0 top-1.5 h-3 w-3 rounded-full bg-blue-500" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Out for Delivery</p>
                        <p className="text-sm text-gray-600">Your package is out for delivery.</p>
                        <p className="text-xs text-gray-500 mt-1">Today, 8:15 AM</p>
                      </div>
                    </div>
                  )}
                  
                  {(order.status === "delivered" || order.status === "shipped") && (
                    <div className="relative pl-6">
                      <div className="absolute left-0 top-1.5 h-3 w-3 rounded-full bg-blue-500" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Shipped</p>
                        <p className="text-sm text-gray-600">Your order has been shipped.</p>
                        <p className="text-xs text-gray-500 mt-1">Yesterday, 2:45 PM</p>
                      </div>
                    </div>
                  )}
                  
                  <div className="relative pl-6">
                    <div className="absolute left-0 top-1.5 h-3 w-3 rounded-full bg-blue-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Order Processing</p>
                      <p className="text-sm text-gray-600">Your order is being processed.</p>
                      <p className="text-xs text-gray-500 mt-1">{order.date}, 10:30 AM</p>
                    </div>
                  </div>
                  
                  <div className="relative pl-6">
                    <div className="absolute left-0 top-1.5 h-3 w-3 rounded-full bg-blue-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Order Placed</p>
                      <p className="text-sm text-gray-600">Your order has been placed successfully.</p>
                      <p className="text-xs text-gray-500 mt-1">{order.date}, 9:15 AM</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Need Help Section */}
              <div className="mt-8 border-t border-gray-200 pt-6">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Need Help?</h3>
                <p className="text-sm text-gray-600 mb-4">
                  If you have any questions about your order, please contact our customer support.
                </p>
                <a
                  href="/contact"
                  className="inline-flex items-center text-primary hover:text-primary-dark font-medium text-sm"
                >
                  <span>Contact Support</span>
                  <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default TrackOrder;
