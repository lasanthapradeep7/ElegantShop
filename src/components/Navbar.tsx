import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, Menu, X, User, Search } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();
  const { state: cart } = useCart();
  const { user, logout } = useAuth();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const toggleSearch = () => setSearchOpen(!searchOpen);

  return (
    <header className="sticky top-0 z-40 backdrop-blur-lg bg-white/80 border-b border-gray-100">
      <div className="container-fluid">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-xl font-semibold"><span className="text-primary">Elegant</span>Shop</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "font-medium link-hover",
                  location.pathname === link.path
                    ? "text-primary"
                    : "text-foreground/80 hover:text-foreground"
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden md:flex items-center space-x-6">
            <button
              onClick={toggleSearch}
              className="text-foreground/80 hover:text-foreground transition-colors"
              aria-label="Search"
            >
              <Search size={20} />
            </button>
            
            {user ? (
            <Link 
              to="/cart" 
              className="text-foreground/80 hover:text-foreground transition-colors relative"
              aria-label="Shopping cart"
            >
              <ShoppingCart size={20} />
              {cart.items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cart.items.reduce((total, item) => total + item.quantity, 0)}
                </span>
              )}
            </Link>
            ) : (
              <Link to="/login" className="text-foreground/80 hover:text-foreground transition-colors">
                <ShoppingCart size={20} />
              </Link>
            )}

            {user ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 text-foreground/80 hover:text-foreground transition-colors">
                  <User size={20} />
                  <span className="text-sm font-medium">{user.name.split(' ')[0]}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-in-out">
                  <div className="py-2 bg-white rounded-md shadow-xl border border-gray-100">
                    <Link to="/account" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Account
                    </Link>
                    <Link to="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Orders
                    </Link>
                    <button
                      onClick={() => logout()}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link to="/login" className="text-foreground/80 hover:text-foreground transition-colors">
                <User size={20} />
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
          {user ? (
            <Link 
              to="/cart" 
              className="text-foreground/80 hover:text-foreground transition-colors relative"
              aria-label="Shopping cart"
            >
              <ShoppingCart size={20} />
              {cart.items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cart.items.reduce((total, item) => total + item.quantity, 0)}
                </span>
              )}
            </Link>
            ) : (
              <Link to="/login" className="text-foreground/80 hover:text-foreground transition-colors">
                <ShoppingCart size={20} />
              </Link>
            )}
            
            <button
              onClick={toggleMobileMenu}
              className="text-foreground/80 hover:text-foreground transition-colors"
              aria-label="Open mobile menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden animate-fade-in">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "block py-2 px-3 rounded-md font-medium",
                  location.pathname === link.path
                    ? "bg-primary/10 text-primary"
                    : "text-foreground/80 hover:bg-gray-50"
                )}
              >
                {link.name}
              </Link>
            ))}
            
            <div className="pt-4 pb-3 border-t border-gray-100">
              {user ? (
                <>
                  <div className="flex items-center px-4">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        {user.name.charAt(0)}
                      </div>
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium">{user.name}</div>
                      <div className="text-sm font-medium text-gray-500">{user.email}</div>
                    </div>
                  </div>
                  <div className="mt-3 space-y-1 px-2">
                    <Link
                      to="/account"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block py-2 px-3 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50"
                    >
                      Account
                    </Link>
                    <Link
                      to="/orders"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block py-2 px-3 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50"
                    >
                      Orders
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setMobileMenuOpen(false);
                      }}
                      className="block w-full text-left py-2 px-3 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50"
                    >
                      Sign out
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex justify-between px-4">
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="btn-primary w-full text-center"
                  >
                    Sign in
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Search Overlay */}
      {searchOpen && (
        <div className="absolute inset-0 z-50 bg-white animate-fade-in">
          <div className="container pt-20 pb-16">
            <button
              onClick={toggleSearch}
              className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700"
              aria-label="Close search"
            >
              <X size={24} />
            </button>
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-4 border-b-2 border-gray-200 focus:border-primary text-lg placeholder:text-gray-400 focus:outline-none bg-transparent"
                  placeholder="Search for products..."
                  autoFocus
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
