import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CheckCircle, ArrowRight, Search } from "lucide-react";
import { cn } from "@/lib/utils";

const OrderConfirmation = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [isAnimating, setIsAnimating] = useState(true);
  
  useEffect(() => {
    // Simulate animation delay
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <main className="py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          {isAnimating ? (
            <div className="flex flex-col items-center space-y-4 animate-pulse-slow">
              <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center">
                <div className="h-8 w-8 rounded-full bg-primary animate-ping" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Processing your order...</h1>
            </div>
          ) : (
            <div className="animate-scale-in">
              <div className="inline-flex h-24 w-24 items-center justify-center rounded-full bg-green-100 mb-8">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Confirmed!</h1>
              <p className="text-lg text-gray-600 mb-6">
                Thank you for your purchase. Your order has been received and is being processed.
              </p>
              
              <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <div className="flex flex-col items-center space-y-4">
                  <p className="text-gray-600">Your Order ID</p>
                  <p className="text-xl font-mono font-medium text-gray-900">{orderId}</p>
                  <p className="text-sm text-gray-500">
                    An email confirmation has been sent to your email address.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
                <Link 
                  to="/products" 
                  className="btn-primary flex items-center justify-center space-x-2"
                >
                  <span>Continue Shopping</span>
                  <ArrowRight size={16} />
                </Link>
                
                <Link 
                  to={`/track-order/${orderId}`} 
                  className="btn-secondary flex items-center justify-center space-x-2"
                >
                  <Search size={16} />
                  <span>Track Order</span>
                </Link>
              </div>
              
              <div className="text-center text-sm text-gray-500">
                <p>
                  If you have any questions about your order, please contact our{" "}
                  <Link to="/contact" className="text-primary hover:underline">
                    customer support
                  </Link>
                  .
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default OrderConfirmation;
