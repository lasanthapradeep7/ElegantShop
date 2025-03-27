import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Heart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Product } from "@/context/CartContext";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  variant?: "default" | "featured" | "compact";
}

export const ProductCard = ({ product, variant = "default" }: ProductCardProps) => {
  const { addItem } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    toast.success(`${product.name} added to cart`);
  };
  
  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    toast.success(isFavorite ? "Removed from favorites" : "Added to favorites");
  };

  if (variant === "compact") {
    return (
      <Link 
        to={`/products/${product.id}`}
        className="group relative flex items-center gap-4 p-4 rounded-lg transition-all hover:bg-gray-50"
      >
        <div className="h-16 w-16 rounded-md bg-gray-100 overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-sm text-gray-900">{product.name}</h3>
          <p className="text-sm text-gray-500">${product.price.toFixed(2)}</p>
        </div>
      </Link>
    );
  }
  
  if (variant === "featured") {
    return (
      <div 
        className="group relative h-full flex flex-col overflow-hidden rounded-lg bg-white"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative h-80 overflow-hidden rounded-t-lg">
          <Link to={`/products/${product.id}`} className="absolute inset-0">
            <img 
              src={product.image} 
              alt={product.name}
              className="h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
            />
          </Link>
          
          {/* Product actions */}
          <div className={cn(
            "absolute right-3 flex flex-col items-center space-y-2 transition-all duration-300 ease-in-out",
            isHovered ? "top-3 opacity-100" : "top-0 opacity-0"
          )}>
            <button
              onClick={toggleFavorite}
              className={cn(
                "p-2 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors",
                isFavorite ? "text-red-500" : "text-gray-600"
              )}
              aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              <Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
            </button>
          </div>
        </div>
        
        <div className="flex flex-col flex-1 p-5">
          <h3 className="text-lg font-medium text-gray-900">
            <Link to={`/products/${product.id}`}>{product.name}</Link>
          </h3>
          <p className="mt-1 text-sm text-gray-500">{product.category}</p>
          <div className="mt-auto pt-4 flex items-center justify-between">
            <p className="text-lg font-medium text-gray-900">${product.price.toFixed(2)}</p>
            <button
              onClick={handleAddToCart}
              className="btn-primary flex items-center space-x-1"
            >
              <ShoppingCart size={16} />
              <span>Add</span>
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  // Default variant
  return (
    <div 
      className="group relative h-full flex flex-col overflow-hidden rounded-lg bg-white border border-gray-100 hover:shadow-md transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square overflow-hidden">
        <Link to={`/products/${product.id}`} className="absolute inset-0">
          <img 
            src={product.image} 
            alt={product.name}
            className="h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
          />
        </Link>
        
        {/* Quick actions */}
        <div className={cn(
          "absolute inset-x-0 bottom-0 flex items-center justify-center p-2 transition-all duration-300 ease-in-out",
          isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}>
          <div className="flex space-x-2 bg-white/80 backdrop-blur-sm p-1.5 rounded-full shadow-md">
            <button
              onClick={handleAddToCart}
              className="p-1.5 rounded-full hover:bg-gray-100 transition-colors text-gray-800"
              aria-label="Add to cart"
            >
              <ShoppingCart size={16} />
            </button>
            <button
              onClick={toggleFavorite}
              className={cn(
                "p-1.5 rounded-full hover:bg-gray-100 transition-colors",
                isFavorite ? "text-red-500" : "text-gray-800"
              )}
              aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              <Heart size={16} fill={isFavorite ? "currentColor" : "none"} />
            </button>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col flex-1 p-4">
        <h3 className="text-sm font-medium text-gray-900">
          <Link to={`/products/${product.id}`}>{product.name}</Link>
        </h3>
        <p className="mt-1 text-sm text-gray-500">{product.category}</p>
        <p className="mt-auto pt-2 text-sm font-medium text-gray-900">${product.price.toFixed(2)}</p>
      </div>
    </div>
  );
};
