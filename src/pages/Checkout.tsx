import { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronRight, CreditCard, ShieldCheck, ArrowLeft } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

// Step components
const CheckoutSteps = [
  { id: "shipping", title: "Shipping" },
  { id: "payment", title: "Payment" },
  { id: "review", title: "Review" },
];

const Checkout = () => {
  const { state: cart, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [currentStep, setCurrentStep] = useState("shipping");
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Form state
  const [shippingDetails, setShippingDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
  });
  
  const [paymentDetails, setPaymentDetails] = useState({
    cardName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    paymentMethod: "credit-card", // credit-card, paypal, bank-transfer, manual-slip
  });
  
  const [uploadedSlip, setUploadedSlip] = useState<File | null>(null);
  
  // Calculate totals
  const subtotal = cart.total;
  const shipping = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.07; // 7% tax rate
  const total = subtotal + shipping + tax;
  
  // Form handlers
  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setShippingDetails(prev => ({ ...prev, [name]: value }));
  };
  
  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPaymentDetails(prev => ({ ...prev, [name]: value }));
  };
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedSlip(e.target.files[0]);
    }
  };
  
  // Step navigation
  const goToStep = (step: string) => {
    setCurrentStep(step);
  };
  
  const handleNextStep = () => {
    if (currentStep === "shipping") {
      goToStep("payment");
    } else if (currentStep === "payment") {
      goToStep("review");
    }
  };
  
  const handlePrevStep = () => {
    if (currentStep === "payment") {
      goToStep("shipping");
    } else if (currentStep === "review") {
      goToStep("payment");
    }
  };
  
  // Submit order
  const handleSubmitOrder = (e: FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate API call to create order
    setTimeout(() => {
      setIsProcessing(false);
      const orderId = "ORD-" + Math.floor(100000 + Math.random() * 900000);
      
      // Clear cart
      clearCart();
      
      // Redirect to confirmation page
      navigate(`/order-confirmation/${orderId}`);
      
      toast.success("Order placed successfully!");
    }, 2000);
  };
  
  // Check if form is valid for current step
  const isShippingValid = () => {
    const { firstName, lastName, email, address, city, state, zipCode } = shippingDetails;
    return firstName && lastName && email && address && city && state && zipCode;
  };
  
  const isPaymentValid = () => {
    if (paymentDetails.paymentMethod === "manual-slip") {
      return !!uploadedSlip;
    }
    
    if (paymentDetails.paymentMethod === "credit-card") {
      const { cardName, cardNumber, expiryDate, cvv } = paymentDetails;
      return cardName && cardNumber && expiryDate && cvv;
    }
    
    return true; // Other payment methods don't require validation
  };
  
  // Render step indicators
  const renderSteps = () => {
    return (
      <div className="mb-8">
        <div className="flex items-center justify-center">
          {CheckoutSteps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              {/* Step circle */}
              <div
                className={cn(
                  "h-8 w-8 rounded-full flex items-center justify-center border-2 font-medium text-sm",
                  currentStep === step.id
                    ? "border-primary bg-primary text-white"
                    : CheckoutSteps.findIndex(s => s.id === currentStep) > index
                    ? "border-primary bg-primary text-white"
                    : "border-gray-300 text-gray-500"
                )}
              >
                {CheckoutSteps.findIndex(s => s.id === currentStep) > index ? (
                  <svg className="h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  index + 1
                )}
              </div>
              
              {/* Step title */}
              <div className="ml-2 mr-8">
                <div
                  className={cn(
                    "text-sm font-medium",
                    currentStep === step.id
                      ? "text-gray-900"
                      : CheckoutSteps.findIndex(s => s.id === currentStep) > index
                      ? "text-primary"
                      : "text-gray-500"
                  )}
                >
                  {step.title}
                </div>
              </div>
              
              {/* Connector line */}
              {index < CheckoutSteps.length - 1 && (
                <div
                  className={cn(
                    "flex-1 h-0.5 w-10 mx-2",
                    CheckoutSteps.findIndex(s => s.id === currentStep) > index
                      ? "bg-primary"
                      : "bg-gray-300"
                  )}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  // Render shipping form
  const renderShippingForm = () => {
    return (
      <div className="animate-fade-in">
        <h2 className="text-xl font-medium text-gray-900 mb-6">Shipping Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
              First Name *
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={shippingDetails.firstName}
              onChange={handleShippingChange}
              className="input-primary w-full"
              required
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
              Last Name *
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={shippingDetails.lastName}
              onChange={handleShippingChange}
              className="input-primary w-full"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={shippingDetails.email}
              onChange={handleShippingChange}
              className="input-primary w-full"
              required
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={shippingDetails.phone}
              onChange={handleShippingChange}
              className="input-primary w-full"
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
              Street Address *
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={shippingDetails.address}
              onChange={handleShippingChange}
              className="input-primary w-full"
              required
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="apartment" className="block text-sm font-medium text-gray-700 mb-1">
              Apartment, Suite, etc.
            </label>
            <input
              type="text"
              id="apartment"
              name="apartment"
              value={shippingDetails.apartment}
              onChange={handleShippingChange}
              className="input-primary w-full"
            />
          </div>
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
              City *
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={shippingDetails.city}
              onChange={handleShippingChange}
              className="input-primary w-full"
              required
            />
          </div>
          <div>
            <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
              State/Province *
            </label>
            <input
              type="text"
              id="state"
              name="state"
              value={shippingDetails.state}
              onChange={handleShippingChange}
              className="input-primary w-full"
              required
            />
          </div>
          <div>
            <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
              ZIP/Postal Code *
            </label>
            <input
              type="text"
              id="zipCode"
              name="zipCode"
              value={shippingDetails.zipCode}
              onChange={handleShippingChange}
              className="input-primary w-full"
              required
            />
          </div>
          <div>
            <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
              Country *
            </label>
            <select
              id="country"
              name="country"
              value={shippingDetails.country}
              onChange={handleShippingChange}
              className="input-primary w-full"
              required
            >
              <option value="United States">United States</option>
              <option value="Canada">Canada</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="Australia">Australia</option>
              <option value="Germany">Germany</option>
              <option value="France">France</option>
              <option value="Japan">Japan</option>
            </select>
          </div>
        </div>
        
        <div className="mt-8 flex justify-between">
          <Link to="/cart" className="btn-ghost">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Cart
          </Link>
          <button
            onClick={handleNextStep}
            disabled={!isShippingValid()}
            className={cn(
              "btn-primary",
              !isShippingValid() && "opacity-50 cursor-not-allowed"
            )}
          >
            Proceed to Payment
            <ChevronRight className="h-4 w-4 ml-2" />
          </button>
        </div>
      </div>
    );
  };
  
  // Render payment form
  const renderPaymentForm = () => {
    return (
      <div className="animate-fade-in">
        <h2 className="text-xl font-medium text-gray-900 mb-6">Payment Method</h2>
        
        <div className="space-y-4 mb-6">
          <div>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="paymentMethod"
                value="credit-card"
                checked={paymentDetails.paymentMethod === "credit-card"}
                onChange={handlePaymentChange}
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded-full"
              />
              <span className="text-sm font-medium text-gray-900">Credit Card</span>
            </label>
          </div>
          
          <div>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="paymentMethod"
                value="manual-slip"
                checked={paymentDetails.paymentMethod === "manual-slip"}
                onChange={handlePaymentChange}
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded-full"
              />
              <span className="text-sm font-medium text-gray-900">Manual Payment Slip</span>
            </label>
          </div>
        </div>
        
        {paymentDetails.paymentMethod === "credit-card" && (
          <div className="space-y-6 border rounded-md p-4 bg-gray-50">
            <div className="flex items-center">
              <CreditCard className="h-5 w-5 text-gray-500 mr-2" />
              <span className="text-sm font-medium text-gray-900">Credit Card Information</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
                  Name on Card
                </label>
                <input
                  type="text"
                  id="cardName"
                  name="cardName"
                  value={paymentDetails.cardName}
                  onChange={handlePaymentChange}
                  className="input-primary w-full"
                />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  Card Number
                </label>
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  value={paymentDetails.cardNumber}
                  onChange={handlePaymentChange}
                  placeholder="XXXX XXXX XXXX XXXX"
                  className="input-primary w-full"
                />
              </div>
              <div>
                <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Expiry Date
                </label>
                <input
                  type="text"
                  id="expiryDate"
                  name="expiryDate"
                  value={paymentDetails.expiryDate}
                  onChange={handlePaymentChange}
                  placeholder="MM/YY"
                  className="input-primary w-full"
                />
              </div>
              <div>
                <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                  CVV
                </label>
                <input
                  type="text"
                  id="cvv"
                  name="cvv"
                  value={paymentDetails.cvv}
                  onChange={handlePaymentChange}
                  placeholder="XXX"
                  className="input-primary w-full"
                />
              </div>
            </div>
            
            <div className="flex items-center">
              <ShieldCheck className="h-5 w-5 text-green-500 mr-2" />
              <span className="text-sm text-gray-600">Your payment information is secure and encrypted</span>
            </div>
          </div>
        )}
        
        {paymentDetails.paymentMethod === "manual-slip" && (
          <div className="space-y-6 border rounded-md p-4 bg-gray-50">
            <div>
              <p className="text-sm text-gray-700 mb-4">
                Please make a payment to the following bank account and upload the payment slip below:
              </p>
              
              <div className="bg-white p-3 rounded-md border mb-4">
                <p className="font-medium text-sm text-gray-900">Bank Transfer Details</p>
                <ul className="text-sm text-gray-600 mt-2 space-y-1">
                  <li>Bank Name: Example Bank</li>
                  <li>Account Name: ElegantShop Inc.</li>
                  <li>Account Number: 1234567890</li>
                  <li>Reference: Your Name</li>
                </ul>
              </div>
              
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Upload Payment Slip
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  {uploadedSlip ? (
                    <div>
                      <p className="text-sm text-gray-900">{uploadedSlip.name}</p>
                      <p className="text-xs text-gray-500">
                        {(uploadedSlip.size / 1024).toFixed(2)} KB
                      </p>
                      <button
                        type="button"
                        onClick={() => setUploadedSlip(null)}
                        className="text-xs text-red-500 mt-2 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <>
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-primary-dark focus-within:outline-none"
                        >
                          <span>Upload a file</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            onChange={handleFileUpload}
                            accept="image/*,.pdf"
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF, PDF up to 10MB</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className="mt-8 flex justify-between">
          <button
            onClick={handlePrevStep}
            className="btn-ghost"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Shipping
          </button>
          <button
            onClick={handleNextStep}
            disabled={!isPaymentValid()}
            className={cn(
              "btn-primary",
              !isPaymentValid() && "opacity-50 cursor-not-allowed"
            )}
          >
            Review Order
            <ChevronRight className="h-4 w-4 ml-2" />
          </button>
        </div>
      </div>
    );
  };
  
  // Render review form
  const renderReviewForm = () => {
    return (
      <div className="animate-fade-in">
        <h2 className="text-xl font-medium text-gray-900 mb-6">Review Your Order</h2>
        
        <div className="space-y-6">
          {/* Shipping Information */}
          <div className="border rounded-md overflow-hidden">
            <div className="bg-gray-50 py-3 px-4 flex justify-between">
              <h3 className="text-sm font-medium text-gray-900">Shipping Information</h3>
              <button
                onClick={() => goToStep("shipping")}
                className="text-sm text-primary hover:text-primary-dark font-medium"
              >
                Edit
              </button>
            </div>
            <div className="p-4 text-sm">
              <p className="font-medium text-gray-900">
                {shippingDetails.firstName} {shippingDetails.lastName}
              </p>
              <p className="text-gray-600 mt-1">{shippingDetails.email}</p>
              <p className="text-gray-600 mt-1">{shippingDetails.phone}</p>
              <div className="mt-2 text-gray-600">
                <p>{shippingDetails.address}</p>
                {shippingDetails.apartment && <p>{shippingDetails.apartment}</p>}
                <p>
                  {shippingDetails.city}, {shippingDetails.state} {shippingDetails.zipCode}
                </p>
                <p>{shippingDetails.country}</p>
              </div>
            </div>
          </div>
          
          {/* Payment Information */}
          <div className="border rounded-md overflow-hidden">
            <div className="bg-gray-50 py-3 px-4 flex justify-between">
              <h3 className="text-sm font-medium text-gray-900">Payment Method</h3>
              <button
                onClick={() => goToStep("payment")}
                className="text-sm text-primary hover:text-primary-dark font-medium"
              >
                Edit
              </button>
            </div>
            <div className="p-4 text-sm">
              {paymentDetails.paymentMethod === "credit-card" ? (
                <div>
                  <p className="font-medium text-gray-900">Credit Card</p>
                  <p className="text-gray-600 mt-1">
                    {paymentDetails.cardNumber.replace(/\d(?=\d{4})/g, "*")}
                  </p>
                  <p className="text-gray-600 mt-1">
                    Expires: {paymentDetails.expiryDate}
                  </p>
                </div>
              ) : (
                <div>
                  <p className="font-medium text-gray-900">Manual Payment Slip</p>
                  {uploadedSlip && (
                    <p className="text-gray-600 mt-1">
                      Uploaded: {uploadedSlip.name}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
          
          {/* Order Items */}
          <div className="border rounded-md overflow-hidden">
            <div className="bg-gray-50 py-3 px-4">
              <h3 className="text-sm font-medium text-gray-900">Order Summary</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {cart.items.map((item) => (
                <div key={item.id} className="p-4 flex items-center">
                  <div className="h-16 w-16 flex-shrink-0 rounded-md border border-gray-200 overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="h-full w-full object-cover object-center" 
                    />
                  </div>
                  <div className="ml-4 flex-1">
                    <p className="text-sm font-medium text-gray-900">{item.name}</p>
                    <p className="mt-1 text-sm text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Price Summary */}
          <div className="border rounded-md overflow-hidden">
            <div className="bg-gray-50 py-3 px-4">
              <h3 className="text-sm font-medium text-gray-900">Price Details</h3>
            </div>
            <div className="p-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <p className="text-gray-600">Subtotal</p>
                  <p className="text-gray-900 font-medium">${subtotal.toFixed(2)}</p>
                </div>
                <div className="flex justify-between text-sm">
                  <p className="text-gray-600">Shipping</p>
                  <p className="text-gray-900 font-medium">
                    {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                  </p>
                </div>
                <div className="flex justify-between text-sm">
                  <p className="text-gray-600">Tax (7%)</p>
                  <p className="text-gray-900 font-medium">${tax.toFixed(2)}</p>
                </div>
                <div className="pt-2 mt-2 border-t border-gray-200 flex justify-between">
                  <p className="text-base font-medium text-gray-900">Total</p>
                  <p className="text-base font-medium text-gray-900">${total.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 flex flex-col space-y-4">
          <button
            onClick={handleSubmitOrder}
            disabled={isProcessing}
            className={cn(
              "btn-primary py-3 flex items-center justify-center",
              isProcessing && "opacity-75 cursor-not-allowed"
            )}
          >
            {isProcessing ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing Order...
              </>
            ) : (
              "Place Order"
            )}
          </button>
          
          <button
            onClick={handlePrevStep}
            disabled={isProcessing}
            className={cn(
              "btn-ghost",
              isProcessing && "opacity-75 cursor-not-allowed"
            )}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Payment
          </button>
        </div>
      </div>
    );
  };
  
  // Render current step
  const renderCurrentStep = () => {
    switch (currentStep) {
      case "shipping":
        return renderShippingForm();
      case "payment":
        return renderPaymentForm();
      case "review":
        return renderReviewForm();
      default:
        return null;
    }
  };
  
  return (
    <main className="py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Checkout</h1>
          
          {/* Steps indicator */}
          {renderSteps()}
          
          {/* Main content */}
          <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
            {renderCurrentStep()}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Checkout;
