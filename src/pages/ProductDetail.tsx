import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { Heart, ShoppingCart, ChevronLeft, ChevronRight, Star, Minus, Plus, Share, ArrowLeft } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { getProductById, products } from "@/lib/data";
import { ProductCard } from "@/components/ProductCard";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { addItem } = useCart();
  const [product, setProduct] = useState(id ? getProductById(id) : null);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState("description");
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [activeImage, setActiveImage] = useState(0);
  const slidesRef = useRef<HTMLDivElement>(null);
  
  // Images array - normally would come from product data
  const productImages = [
    product?.image,
    "https://images.unsplash.com/photo-1567374783626-237c6fabb078?q=80&w=2680&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1593085512500-5d55148d6f0d?q=80&w=2680&auto=format&fit=crop",
  ];
  
  useEffect(() => {
    if (id) {
      const foundProduct = getProductById(id);
      setProduct(foundProduct);
      
      // Get related products from the same category
      if (foundProduct) {
        const related = products
          .filter(p => p.category === foundProduct.category && p.id !== foundProduct.id)
          .slice(0, 4);
        setRelatedProducts(related);
      }
    }
  }, [id]);
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <div className="bg-white p-8 rounded-lg shadow-sm">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-6">The product you're looking for doesn't seem to exist.</p>
          <Link to="/products" className="btn-primary">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Products
          </Link>
        </div>
      </div>
    );
  }
  
  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    toast.success(`${quantity} ${quantity === 1 ? 'item' : 'items'} added to cart`);
  };
  
  const handleQuantityChange = (value: number) => {
    setQuantity(Math.max(1, value));
  };
  
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast.success(isFavorite ? "Removed from favorites" : "Added to favorites");
  };
  
  const nextImage = () => {
    setActiveImage((prev) => (prev + 1) % productImages.length);
  };
  
  const prevImage = () => {
    setActiveImage((prev) => (prev - 1 + productImages.length) % productImages.length);
  };
  
  return (
    <main className="py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex mb-8 text-sm">
          <ol className="flex items-center space-x-2">
            <li>
              <Link to="/" className="text-gray-500 hover:text-gray-900">Home</Link>
            </li>
            <li className="text-gray-500">/</li>
            <li>
              <Link to="/products" className="text-gray-500 hover:text-gray-900">Products</Link>
            </li>
            <li className="text-gray-500">/</li>
            <li>
              <Link 
                to={`/products?category=${product.category}`} 
                className="text-gray-500 hover:text-gray-900"
              >
                {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
              </Link>
            </li>
            <li className="text-gray-500">/</li>
            <li className="text-gray-900 font-medium">{product.name}</li>
          </ol>
        </nav>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main image with controls */}
            <div className="relative h-[400px] md:h-[500px] bg-gray-100 rounded-lg overflow-hidden">
              <div 
                ref={slidesRef}
                className="h-full w-full flex transition-transform duration-300"
                style={{ transform: `translateX(-${activeImage * 100}%)` }}
              >
                {productImages.map((img, idx) => (
                  <div key={idx} className="h-full w-full flex-shrink-0">
                    <img
                      src={img}
                      alt={`${product.name} - View ${idx + 1}`}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                ))}
              </div>
              
              {/* Navigation arrows */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md hover:bg-white transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md hover:bg-white transition-colors"
                aria-label="Next image"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
              
              {/* Dots indicator */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                {productImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={cn(
                      "w-2.5 h-2.5 rounded-full transition-all",
                      activeImage === idx ? "bg-primary w-6" : "bg-white/80"
                    )}
                    aria-label={`Go to image ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
            
            {/* Thumbnail images */}
            <div className="flex space-x-4">
              {productImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={cn(
                    "h-20 w-20 rounded-md overflow-hidden border-2",
                    activeImage === idx ? "border-primary" : "border-transparent"
                  )}
                >
                  <img
                    src={img}
                    alt={`${product.name} thumbnail ${idx + 1}`}
                    className="h-full w-full object-cover object-center"
                  />
                </button>
              ))}
            </div>
          </div>
          
          {/* Product Info */}
          <div className="flex flex-col">
            <div className="mb-6">
              <div className="flex items-center mb-2 text-sm">
                <span className="uppercase text-gray-500 tracking-wider">
                  {product.category}
                </span>
                <span className="mx-2 text-gray-300">•</span>
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={cn(
                        "h-4 w-4",
                        star <= 4 ? "text-yellow-400 fill-current" : "text-gray-300"
                      )}
                    />
                  ))}
                  <span className="ml-2 text-gray-500">(24 reviews)</span>
                </div>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              
              <div className="flex items-baseline space-x-3 mb-6">
                <span className="text-2xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
                {Math.random() > 0.5 && (
                  <span className="text-lg text-gray-500 line-through">${(product.price * 1.2).toFixed(2)}</span>
                )}
              </div>
              
              <p className="text-gray-600 mb-6">
                {product.description}
              </p>
              
              <div className="border-t border-gray-200 pt-6">
                {/* Quantity Selector */}
                <div className="mb-6">
                  <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                    Quantity
                  </label>
                  <div className="flex items-center">
                    <button
                      onClick={() => handleQuantityChange(quantity - 1)}
                      className="h-10 w-10 border border-gray-300 rounded-l-md flex items-center justify-center text-gray-600 hover:bg-gray-50"
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <input
                      type="number"
                      id="quantity"
                      value={quantity}
                      onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
                      min="1"
                      className="h-10 border-y border-gray-300 text-center w-16 text-gray-900"
                    />
                    <button
                      onClick={() => handleQuantityChange(quantity + 1)}
                      className="h-10 w-10 border border-gray-300 rounded-r-md flex items-center justify-center text-gray-600 hover:bg-gray-50"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                  <button
                    onClick={handleAddToCart}
                    className="btn-primary py-3 flex-1 flex items-center justify-center space-x-2"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    <span>Add to Cart</span>
                  </button>
                  <button
                    onClick={toggleFavorite}
                    className={cn(
                      "py-3 px-4 rounded-md border font-medium flex items-center justify-center",
                      isFavorite 
                        ? "bg-red-50 text-red-600 border-red-200" 
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                    )}
                  >
                    <Heart 
                      className="h-5 w-5" 
                      fill={isFavorite ? "currentColor" : "none"} 
                    />
                  </button>
                  <button
                    className="py-3 px-4 rounded-md border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 flex items-center justify-center"
                  >
                    <Share className="h-5 w-5" />
                  </button>
                </div>
              </div>
              
              {/* Product Highlights */}
              <div className="mt-8 space-y-4">
                <div className="flex items-center">
                  <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Free shipping over $50</span>
                </div>
                <div className="flex items-center">
                  <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700">30-day money-back guarantee</span>
                </div>
                <div className="flex items-center">
                  <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700">2-year warranty</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Product Tabs */}
        <div className="mt-16">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab("description")}
                className={cn(
                  "py-4 px-1 text-sm font-medium border-b-2 -mb-px transition-colors",
                  activeTab === "description"
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                )}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab("specifications")}
                className={cn(
                  "py-4 px-1 text-sm font-medium border-b-2 -mb-px transition-colors",
                  activeTab === "specifications"
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                )}
              >
                Specifications
              </button>
              <button
                onClick={() => setActiveTab("reviews")}
                className={cn(
                  "py-4 px-1 text-sm font-medium border-b-2 -mb-px transition-colors",
                  activeTab === "reviews"
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                )}
              >
                Reviews (24)
              </button>
            </nav>
          </div>
          
          <div className="py-6">
            {activeTab === "description" && (
              <div className="prose max-w-none">
                <p className="text-gray-600">
                  {product.description}
                </p>
                <p className="text-gray-600 mt-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Maecenas 
                  feugiat est eu semper finibus. Duis volutpat, nisl eu hendrerit varius, erat odio 
                  posuere orci, id fermentum erat ipsum quis ex. Sed id accumsan metus, a tempor justo. 
                  Phasellus eleifend, magna vel varius maximus, nibh neque commodo arcu, nec efficitur 
                  nulla orci vel mauris.
                </p>
                <h3 className="text-lg font-medium text-gray-900 mt-6 mb-2">Features</h3>
                <ul className="list-disc pl-5 text-gray-600">
                  <li>High-quality materials</li>
                  <li>Durable construction</li>
                  <li>Ergonomic design</li>
                  <li>Premium finish</li>
                  <li>Versatile functionality</li>
                </ul>
              </div>
            )}
            
            {activeTab === "specifications" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Technical Specifications</h3>
                  <dl className="divide-y divide-gray-200">
                    <div className="py-3 flex justify-between">
                      <dt className="text-sm font-medium text-gray-500">Material</dt>
                      <dd className="text-sm text-gray-900">Premium quality</dd>
                    </div>
                    <div className="py-3 flex justify-between">
                      <dt className="text-sm font-medium text-gray-500">Dimensions</dt>
                      <dd className="text-sm text-gray-900">10 x 8 x 4 inches</dd>
                    </div>
                    <div className="py-3 flex justify-between">
                      <dt className="text-sm font-medium text-gray-500">Weight</dt>
                      <dd className="text-sm text-gray-900">1.5 lbs</dd>
                    </div>
                    <div className="py-3 flex justify-between">
                      <dt className="text-sm font-medium text-gray-500">Color</dt>
                      <dd className="text-sm text-gray-900">Multiple options</dd>
                    </div>
                    <div className="py-3 flex justify-between">
                      <dt className="text-sm font-medium text-gray-500">Warranty</dt>
                      <dd className="text-sm text-gray-900">2 years</dd>
                    </div>
                  </dl>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Package Contents</h3>
                  <ul className="list-disc pl-5 text-gray-600 space-y-2">
                    <li>1 x {product.name}</li>
                    <li>1 x User Manual</li>
                    <li>1 x Warranty Card</li>
                    <li>Accessories (if applicable)</li>
                  </ul>
                </div>
              </div>
            )}
            
            {activeTab === "reviews" && (
              <div>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="flex-shrink-0">
                    <span className="text-5xl font-bold text-gray-900">4.2</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex mb-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={cn(
                            "h-5 w-5",
                            star <= 4 ? "text-yellow-400 fill-current" : "text-gray-300"
                          )}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-gray-500">Based on 24 reviews</p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  {/* Sample reviews */}
                  <div className="border-b border-gray-200 pb-6">
                    <div className="flex items-center mb-2">
                      <div className="flex mr-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={cn(
                              "h-4 w-4",
                              star <= 5 ? "text-yellow-400 fill-current" : "text-gray-300"
                            )}
                          />
                        ))}
                      </div>
                      <span className="text-sm font-medium text-gray-900">John D.</span>
                      <span className="mx-2 text-gray-300">•</span>
                      <span className="text-sm text-gray-500">2 months ago</span>
                    </div>
                    <h4 className="text-sm font-medium text-gray-900 mb-1">Exceeded my expectations!</h4>
                    <p className="text-sm text-gray-600">
                      This product is amazing! The quality is outstanding and it looks even better in person. 
                      I've been using it for a couple of months now and it still works like new.
                    </p>
                  </div>
                  
                  <div className="border-b border-gray-200 pb-6">
                    <div className="flex items-center mb-2">
                      <div className="flex mr-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={cn(
                              "h-4 w-4",
                              star <= 4 ? "text-yellow-400 fill-current" : "text-gray-300"
                            )}
                          />
                        ))}
                      </div>
                      <span className="text-sm font-medium text-gray-900">Emily S.</span>
                      <span className="mx-2 text-gray-300">•</span>
                      <span className="text-sm text-gray-500">3 months ago</span>
                    </div>
                    <h4 className="text-sm font-medium text-gray-900 mb-1">Great product, fast shipping</h4>
                    <p className="text-sm text-gray-600">
                      I'm really impressed with both the product quality and the fast shipping. 
                      It arrived well-packaged and in perfect condition. Would definitely recommend!
                    </p>
                  </div>
                  
                  <button className="w-full py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                    Load More Reviews
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">You Might Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {relatedProducts.map(product => (
              <div key={product.id} className="animate-fade-in">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetail;
