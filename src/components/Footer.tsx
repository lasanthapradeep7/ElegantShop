import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white border-t border-gray-100 pt-12 pb-8">
      <div className="container-fluid">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <span className="text-xl font-semibold">ElegantShop</span>
            </Link>
            <p className="text-gray-600 mb-6 max-w-xs">
              Elegant, minimalist, and functional products designed with purpose and precision.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://www.facebook.com/" 
                aria-label="Facebook"
                className="w-10 h-10 flex items-center justify-center rounded-full text-gray-600 hover:text-primary hover:bg-gray-100 transition-colors"
              >
                <Facebook size={18} />
              </a>
              <a 
                href="https://www.twitter.com/" 
                aria-label="Twitter"
                className="w-10 h-10 flex items-center justify-center rounded-full text-gray-600 hover:text-primary hover:bg-gray-100 transition-colors"
              >
                <Twitter size={18} />
              </a>
              <a 
                href="https://www.instagram.com/" 
                aria-label="Instagram"
                className="w-10 h-10 flex items-center justify-center rounded-full text-gray-600 hover:text-primary hover:bg-gray-100 transition-colors"
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products" className="text-gray-600 hover:text-primary transition-colors">All Products</Link>
              </li>
              <li>
                <Link to="/products?category=featured" className="text-gray-600 hover:text-primary transition-colors">Featured</Link>
              </li>
              <li>
                <Link to="/products?category=new" className="text-gray-600 hover:text-primary transition-colors">New Arrivals</Link>
              </li>
              <li>
                <Link to="/products?category=sale" className="text-gray-600 hover:text-primary transition-colors">Sale</Link>
              </li>
            </ul>
          </div>

          {/* Information */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Information</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-600 hover:text-primary transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-primary transition-colors">Contact Us</Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-gray-600 hover:text-primary transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms-conditions" className="text-gray-600 hover:text-primary transition-colors">Terms & Conditions</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                <span className="text-gray-600">Anuradhapura, Sri Lanka</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-gray-500 mr-3" />
                <span className="text-gray-600">+94 (78) 727 4932</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-gray-500 mr-3" />
                <span className="text-gray-600">hello@elegantshop.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-gray-100 text-center md:flex md:items-center md:justify-between">
          <p className="text-gray-500 text-sm">
            &copy; {currentYear} ElegantShop. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <div className="flex justify-center md:justify-end space-x-6">
              <Link to="/shipping-policy" className="text-sm text-gray-500 hover:text-gray-900">
                Shipping
              </Link>
              <Link to="/return-policy" className="text-sm text-gray-500 hover:text-gray-900">
                Returns
              </Link>
              <Link to="/faq" className="text-sm text-gray-500 hover:text-gray-900">
                FAQ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
