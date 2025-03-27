import { useState, FormEvent } from "react";
import { MapPin, Phone, Mail, Send, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const Contact = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formState.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!formState.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!formState.message.trim()) {
      newErrors.message = "Message is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
      
      toast.success("Message sent successfully! We'll get back to you soon.");
      
      // Reset success state after a few seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    }, 1500);
  };
  
  return (
    <main className="py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Contact Us</h1>
          <p className="text-xl text-gray-600">
            We'd love to hear from you. Get in touch with our team for any inquiries or feedback.
          </p>
        </div>
        
        {/* Contact Cards */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Email */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center animate-fade-in">
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Email Us</h3>
              <p className="text-gray-600 mb-4">
                Our friendly team is here to help.
              </p>
              <a href="mailto:hello@elegantshop.com" className="text-primary hover:underline font-medium">
                hello@elegantshop.com
              </a>
            </div>
            
            {/* Call */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center animate-fade-in delay-100">
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Call Us</h3>
              <p className="text-gray-600 mb-4">
                Mon-Fri from 8am to 5pm.
              </p>
              <a href="tel:+1-234-567-8901" className="text-primary hover:underline font-medium">
                +94 (78) 727 4932
              </a>
            </div>
            
            {/* Visit */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center animate-fade-in delay-200">
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Visit Us</h3>
              <p className="text-gray-600 mb-4">
                Come say hello at our office.
              </p>
              <address className="not-italic text-primary">
                Anuradhapura,<br />
                Sri Lanka
              </address>
            </div>
          </div>
        </div>
        
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-3">
              <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Send a Message</h2>
                
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        className={cn(
                          "input-primary w-full",
                          errors.name && "border-red-500 focus:ring-red-500"
                        )}
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formState.email}
                        onChange={handleChange}
                        className={cn(
                          "input-primary w-full",
                          errors.email && "border-red-500 focus:ring-red-500"
                        )}
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formState.phone}
                        onChange={handleChange}
                        className="input-primary w-full"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                        Subject
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formState.subject}
                        onChange={handleChange}
                        className="input-primary w-full"
                      >
                        <option value="">Select a subject</option>
                        <option value="general">General Inquiry</option>
                        <option value="support">Customer Support</option>
                        <option value="billing">Billing Question</option>
                        <option value="partnership">Partnership</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    
                    <div className="sm:col-span-2">
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={6}
                        value={formState.message}
                        onChange={handleChange}
                        className={cn(
                          "input-primary w-full",
                          errors.message && "border-red-500 focus:ring-red-500"
                        )}
                      ></textarea>
                      {errors.message && (
                        <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting || isSuccess}
                      className={cn(
                        "btn-primary py-3 px-6 flex items-center space-x-2",
                        (isSubmitting || isSuccess) && "opacity-75 cursor-not-allowed"
                      )}
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>Sending...</span>
                        </>
                      ) : isSuccess ? (
                        <>
                          <CheckCircle className="h-5 w-5 mr-2" />
                          <span>Message Sent</span>
                        </>
                      ) : (
                        <>
                          <Send className="h-5 w-5 mr-2" />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
            
            {/* Map */}
            <div className="lg:col-span-2">
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 h-full">
                <div className="w-full h-full min-h-[400px] bg-gray-100 rounded overflow-hidden">
                  {/* Google Maps iframe would go here in a real application */}
                  <div className="w-full h-full flex items-center justify-center bg-gray-200">
                    <div className="text-center p-6">
                      <MapPin className="h-10 w-10 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">Map view would appear here</p>
                      <p className="text-sm text-gray-500 mt-2">Anuradhapura, Sri Lanka, 50000</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto mt-24">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">What are your shipping times?</h3>
              <p className="text-gray-600">
                We offer standard shipping (5-7 business days) and express shipping (2-3 business days) 
                options. Shipping times may vary depending on your location. All orders are processed 
                within 1-2 business days.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">How can I return a product?</h3>
              <p className="text-gray-600">
                We accept returns within 30 days of delivery. Items must be in original condition with 
                all packaging and tags. To start a return, please contact our customer support team 
                or visit your account page.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Do you ship internationally?</h3>
              <p className="text-gray-600">
                Yes, we ship to most countries worldwide. International shipping times and rates vary 
                by location. Please note that additional customs fees or import taxes may apply depending 
                on your country's regulations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Contact;
