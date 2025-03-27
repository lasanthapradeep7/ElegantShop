import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchOrderById, Order } from '@/services/api';
import { toast } from 'sonner';
import { 
  Package, 
  Clock, 
  TruckIcon, 
  CheckCircle, 
  Search,
  AlertCircle
} from 'lucide-react';

const TrackOrder = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [orderIdInput, setOrderIdInput] = useState(orderId || '');
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch order if orderId is provided in URL
  useEffect(() => {
    if (orderId) {
      trackOrder(orderId);
    }
  }, [orderId]);

  const trackOrder = async (id: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const orderData = await fetchOrderById(id);
      if (orderData) {
        setOrder(orderData);
      } else {
        setError(`Order #${id} not found. Please check the order ID and try again.`);
        toast.error(`Order #${id} not found`);
      }
    } catch (err) {
      console.error('Error fetching order:', err);
      setError('Failed to fetch order information. Please try again later.');
      toast.error('Failed to fetch order information');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderIdInput.trim()) {
      toast.error('Please enter an Order ID');
      return;
    }
    
    navigate(`/track-order/${orderIdInput}`);
  };

  const getStatusStep = (status: string) => {
    switch (status) {
      case 'pending': return 1;
      case 'shipped': return 2;
      case 'delivered': return 3;
      default: return 0;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Track Your Order</h1>
      
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <label htmlFor="orderId" className="sr-only">
                Order ID
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Package className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="orderId"
                  value={orderIdInput}
                  onChange={(e) => setOrderIdInput(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                  placeholder="Enter your Order ID"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary flex items-center justify-center py-2 px-4"
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Tracking...
                </span>
              ) : (
                <>
                  <Search className="h-4 w-4 mr-2" />
                  Track Order
                </>
              )}
            </button>
          </div>
        </form>
      </div>
      
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 flex items-start space-x-3 mb-8">
          <AlertCircle className="h-6 w-6 text-red-500 flex-shrink-0" />
          <div>
            <h3 className="font-medium text-red-800">Error</h3>
            <p className="text-red-700 mt-1">{error}</p>
          </div>
        </div>
      )}
      
      {order && (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <div className="flex flex-wrap items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                Order #{order.id.slice(0, 8)}
              </h2>
              <div className="mt-2 sm:mt-0 text-sm text-gray-700">
                <p>
                  Placed on{' '}
                  {new Date(order.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>
          </div>
          
          {/* Order Status Timeline */}
          <div className="px-6 py-8">
            <div className="relative">
              {/* Progress Bar */}
              <div className="overflow-hidden h-2 mb-12 flex rounded bg-gray-200">
                <div 
                  className="bg-primary transition-all duration-500 ease-in-out"
                  style={{ 
                    width: `${(getStatusStep(order.status) / 3) * 100}%` 
                  }}
                ></div>
              </div>
              
              {/* Status Steps */}
              <div className="flex justify-between">
                <div className="text-center">
                  <div className={`rounded-full h-12 w-12 flex items-center justify-center mx-auto mb-2 ${
                    getStatusStep(order.status) >= 1 
                      ? 'bg-primary text-white' 
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    <Clock className="h-6 w-6" />
                  </div>
                  <div className="text-sm font-medium">Order Placed</div>
                  {getStatusStep(order.status) >= 1 && (
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  )}
                </div>
                
                <div className="text-center">
                  <div className={`rounded-full h-12 w-12 flex items-center justify-center mx-auto mb-2 ${
                    getStatusStep(order.status) >= 2 
                      ? 'bg-primary text-white' 
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    <TruckIcon className="h-6 w-6" />
                  </div>
                  <div className="text-sm font-medium">Shipped</div>
                  {getStatusStep(order.status) >= 2 && (
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(order.updatedAt).toLocaleDateString()}
                    </p>
                  )}
                </div>
                
                <div className="text-center">
                  <div className={`rounded-full h-12 w-12 flex items-center justify-center mx-auto mb-2 ${
                    getStatusStep(order.status) >= 3 
                      ? 'bg-primary text-white' 
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    <CheckCircle className="h-6 w-6" />
                  </div>
                  <div className="text-sm font-medium">Delivered</div>
                  {getStatusStep(order.status) >= 3 && (
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(order.updatedAt).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Order Items */}
          <div className="px-6 py-4 border-t border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Order Items</h3>
            <ul className="divide-y divide-gray-200">
              {order.items.map((item, index) => (
                <li key={index} className="py-4 flex">
                  <div className="flex-shrink-0 w-16 h-16 border border-gray-200 rounded-md overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-center object-cover"
                    />
                  </div>
                  <div className="ml-4 flex-1 flex flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h4>{item.name}</h4>
                        <p className="ml-4">${item.price.toFixed(2)}</p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">{item.category}</p>
                    </div>
                    <div className="flex-1 flex items-end justify-between text-sm">
                      <p className="text-gray-500">Qty {item.quantity}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Order Summary */}
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Total</p>
              <p>${order.total.toFixed(2)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackOrder;