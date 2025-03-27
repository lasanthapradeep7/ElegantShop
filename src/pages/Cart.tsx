import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Trash2, Plus, Minus, ArrowRight, ArrowLeft, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import Visa from "../assets/visa.png";
import MC from "../assets/mc.png";
import Amex from "../assets/amex.png";
import Paypal from "../assets/paypal.png";

const Cart = () => {
  const { state: cart, removeItem, updateQuantity, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  
  const handleQuantityChange = (id: string, quantity: number) => {
    updateQuantity(id, quantity);
  };
  
  const handleRemoveItem = (id: string) => {
    removeItem(id);
    toast.success("Item removed from cart");
  };
  
  const handleCheckout = () => {
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      navigate("/checkout");
    }, 1000);
  };
  
  // Calculate shipping, tax, and total
  const subtotal = cart.total;
  const shipping = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.07; // 7% tax rate
  const total = subtotal + shipping + tax;
  
  return (
    <main className="py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Cart</h1>
        
        {cart.items.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <div className="mx-auto w-24 h-24 flex items-center justify-center rounded-full bg-gray-100 mb-6">
              <ShoppingBag className="h-12 w-12 text-gray-400" />
            </div>
            <h2 className="text-xl font-medium text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Looks like you haven't added anything to your cart yet. Browse our products and find something you love.
            </p>
            <Link 
              to="/products" 
              className="btn-primary flex items-center space-x-2 mx-auto w-fit"
            >
              <span>Browse Products</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <div className="lg:grid lg:grid-cols-12 lg:gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-8">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8 lg:mb-0">
                <ul className="divide-y divide-gray-200">
                  {cart.items.map((item) => (
                    <li key={item.id} className="p-6">
                      <div className="flex flex-col sm:flex-row">
                        {/* Product Image */}
                        <div className="sm:flex-shrink-0 h-24 w-24 sm:h-32 sm:w-32 bg-gray-100 rounded-md overflow-hidden mb-4 sm:mb-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        
                        {/* Product Details */}
                        <div className="sm:ml-6 flex-1 flex flex-col">
                          <div>
                            <div className="flex justify-between">
                              <h3 className="text-base font-medium text-gray-900">
                                <Link to={`/products/${item.id}`} className="hover:underline">
                                  {item.name}
                                </Link>
                              </h3>
                              <p className="ml-4 text-base font-medium text-gray-900">
                                ${(item.price * item.quantity).toFixed(2)}
                              </p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">{item.category}</p>
                          </div>
                          
                          <div className="mt-auto flex flex-col sm:flex-row sm:items-end justify-between">
                            {/* Quantity Controls */}
                            <div className="flex items-center mt-4 sm:mt-0">
                              <button
                                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                className={cn(
                                  "p-1 rounded-md border text-gray-600 hover:bg-gray-50",
                                  item.quantity <= 1 ? "opacity-50 cursor-not-allowed" : ""
                                )}
                                disabled={item.quantity <= 1}
                              >
                                <Minus className="h-4 w-4" />
                              </button>
                              <span className="mx-3 text-gray-900 w-8 text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                className="p-1 rounded-md border text-gray-600 hover:bg-gray-50"
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>
                            
                            {/* Remove Button */}
                            <button
                              onClick={() => handleRemoveItem(item.id)}
                              className="inline-flex mt-4 sm:mt-0 text-sm text-gray-500 hover:text-red-500"
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              <span>Remove</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                
                <div className="p-6 border-t border-gray-200">
                  <div className="flex justify-between">
                    <Link 
                      to="/products" 
                      className="inline-flex items-center text-sm font-medium text-primary hover:text-primary-dark"
                    >
                      <ArrowLeft className="h-4 w-4 mr-1" />
                      <span>Continue Shopping</span>
                    </Link>
                    <button
                      onClick={() => clearCart()}
                      className="text-sm font-medium text-gray-500 hover:text-gray-700"
                    >
                      Clear Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-4">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden sticky top-20">
                <div className="p-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-6">Order Summary</h2>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <p className="text-gray-600">Subtotal</p>
                      <p className="text-gray-900 font-medium">${subtotal.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-gray-600">Shipping</p>
                      <p className="text-gray-900 font-medium">
                        {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-gray-600">Tax (7%)</p>
                      <p className="text-gray-900 font-medium">${tax.toFixed(2)}</p>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-4 mt-4">
                      <div className="flex justify-between">
                        <p className="text-lg font-medium text-gray-900">Total</p>
                        <p className="text-lg font-medium text-gray-900">${total.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <button
                      onClick={handleCheckout}
                      disabled={isProcessing}
                      className={cn(
                        "btn-primary w-full py-3 flex items-center justify-center",
                        isProcessing && "opacity-75 cursor-not-allowed"
                      )}
                    >
                      {isProcessing ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </>
                      ) : (
                        <>
                          <span>Proceed to Checkout</span>
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </button>
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="text-sm font-medium text-gray-900 mb-2">We Accept</h3>
                    <div className="flex space-x-2">
                      <div className="h-8 w-12 bg-gray-100 rounded flex items-center justify-center"><img src={Visa}/></div>
                      <div className="h-8 w-12 bg-gray-100 rounded flex items-center justify-center"><img src={MC}/></div>
                      <div className="h-8 w-12 bg-gray-100 rounded flex items-center justify-center"><img src={Amex}/></div>
                      <div className="h-8 w-12 bg-gray-100 rounded flex items-center justify-center"><img src={Paypal}/></div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-6 border-t border-gray-200">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="ml-2 text-sm text-gray-600">
                      <span className="font-medium text-gray-900">Secure checkout</span>
                      {" "}- Your data is protected
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Cart;
