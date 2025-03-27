import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProductCard } from "@/components/ProductCard";
import { featuredProducts, categories, products } from "@/lib/data";

// Hero slider data
const heroSlides = [
  {
    title: "Premium Quality Products",
    description: "Discover our collection of meticulously crafted products",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2670&auto=format&fit=crop",
    link: "/products",
    color: "from-gray-900/70",
  },
  {
    title: "New Summer Collection",
    description: "Explore our latest arrivals for the season",
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=2073&auto=format&fit=crop",
    link: "/products?category=clothing",
    color: "from-blue-900/70",
  },
  {
    title: "Smart Technology",
    description: "Enhance your lifestyle with innovative electronics",
    image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=2701&auto=format&fit=crop",
    link: "/products?category=electronics",
    color: "from-slate-900/70",
  },
];

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [newProducts, setNewProducts] = useState([...products].slice(0, 4));
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Auto slide change
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        handleNextSlide();
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [currentSlide, isAnimating]);

  const handleSlideChange = (index: number) => {
    if (isAnimating || index === currentSlide) return;
    setIsAnimating(true);
    setCurrentSlide(index);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handlePrevSlide = () => {
    if (isAnimating) return;
    const newIndex = currentSlide === 0 ? heroSlides.length - 1 : currentSlide - 1;
    handleSlideChange(newIndex);
  };

  const handleNextSlide = () => {
    if (isAnimating) return;
    const newIndex = (currentSlide + 1) % heroSlides.length;
    handleSlideChange(newIndex);
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      // Swipe left
      handleNextSlide();
    } else if (touchStartX.current - touchEndX.current < -50) {
      // Swipe right
      handlePrevSlide();
    }
  };

  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Section with Slider */}
      <section 
        className="relative w-full h-[75vh] overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {heroSlides.map((slide, index) => (
          <div 
            key={index}
            className={cn(
              "absolute inset-0 transition-opacity duration-700",
              currentSlide === index ? "opacity-100 z-10" : "opacity-0 z-0"
            )}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent z-10" />
            <img 
              src={slide.image} 
              alt={slide.title}
              className="h-full w-full object-cover transition-transform duration-10000 ease-out"
              style={{
                transform: currentSlide === index ? "scale(1.05)" : "scale(1)",
                transitionDuration: "10s",
              }}
            />
            <div className="absolute inset-0 z-20 flex items-center justify-center">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-xl animate-fade-in">
                  <span className="inline-block px-3 py-1 mb-3 text-xs tracking-widest bg-white/10 backdrop-blur-md text-white rounded-full">
                    Featured Collection
                  </span>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">{slide.title}</h1>
                  <p className="text-lg text-white/90 mb-6">{slide.description}</p>
                  <Link 
                    to={slide.link}
                    className="inline-flex items-center space-x-2 bg-white text-gray-900 px-6 py-3 rounded-md font-medium hover:bg-white/90 transition-colors"
                  >
                    <span>Shop Now</span>
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Slider controls */}
        <div className="absolute z-30 bottom-6 left-0 right-0 flex justify-center space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => handleSlideChange(index)}
              className={cn(
                "w-2.5 h-2.5 rounded-full transition-all duration-300 focus:outline-none",
                currentSlide === index ? "bg-white w-8" : "bg-white/50 hover:bg-white/80"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={handlePrevSlide}
          className="absolute z-30 left-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md text-white p-2 rounded-full hover:bg-white/20 transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={handleNextSlide}
          className="absolute z-30 right-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md text-white p-2 rounded-full hover:bg-white/20 transition-colors"
          aria-label="Next slide"
        >
          <ChevronRight size={24} />
        </button>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Shop by Category</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Browse our carefully curated categories to find exactly what you're looking for.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.map(category => (
                <Link
                  key={category.id}
                  to={`/products${category.id === 'all' ? '' : `?category=${category.id}`}`}
                  className="group relative rounded-lg overflow-hidden bg-white shadow-sm transition-all hover:shadow-md"
                >
                  <div className="aspect-square bg-gray-100 relative">
                    <img src={category.image}/>
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent flex items-end p-4">
                      <h3 className="text-white font-medium text-center w-full group-hover:underline">
                        {category.name}
                      </h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Products</h2>
                <p className="text-gray-600">Explore our handpicked selection of premium products.</p>
              </div>
              <Link 
                to="/products" 
                className="inline-flex items-center space-x-1 text-primary font-medium hover:underline"
              >
                <span>View All</span>
                <ArrowRight size={16} />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map(product => (
                <div key={product.id} className="animate-fade-in">
                  <ProductCard product={product} variant="featured" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">New Arrivals</h2>
                <p className="text-gray-600">Check out our latest products added to the collection.</p>
              </div>
              <Link 
                to="/products?sort=newest" 
                className="inline-flex items-center space-x-1 text-primary font-medium hover:underline"
              >
                <span>View All</span>
                <ArrowRight size={16} />
              </Link>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {newProducts.map(product => (
                <div key={product.id} className="animate-fade-in">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Promotion Banner */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="relative overflow-hidden rounded-2xl">
              <div className="absolute inset-0">
                <img 
                  src="https://images.unsplash.com/photo-1607082349566-187342175e2f?q=80&w=2670&auto=format&fit=crop" 
                  alt="Special Offer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-transparent" />
              </div>
              
              <div className="relative py-24 px-8 sm:py-32 sm:px-16 text-white">
                <div className="max-w-md">
                  <span className="inline-block px-3 py-1 mb-3 text-xs font-medium tracking-widest bg-white/10 backdrop-blur-md rounded-full">
                    Limited Time Offer
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-bold mb-6">Get 20% Off on Selected Items</h2>
                  <p className="text-white/80 mb-8">
                    Shop our curated selection of premium products with an exclusive discount. 
                    Use code SPRING20 at checkout.
                  </p>
                  <Link 
                    to="/products?sale=true" 
                    className="inline-flex items-center space-x-2 bg-white text-gray-900 px-6 py-3 rounded-md font-medium hover:bg-white/90 transition-colors"
                  >
                    <span>Shop the Sale</span>
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Subscribe to Our Newsletter</h2>
            <p className="text-gray-600 mb-8">
              Stay updated with our latest products, exclusive offers, and design inspiration.
            </p>
            
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-1 input-primary"
                required
              />
              <button type="submit" className="btn-primary">
                Subscribe
              </button>
            </form>
            
            <p className="text-sm text-gray-500 mt-4">
              By subscribing you agree to our Privacy Policy. You can unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
