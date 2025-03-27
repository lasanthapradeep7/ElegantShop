import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Filter, ArrowUpDown, ChevronDown, ChevronUp, X, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProductCard } from "@/components/ProductCard";
import { products, categories } from "@/lib/data";
import { Product } from "@/context/CartContext";

const Products = () => {
  const location = useLocation();
  const [searchParams] = useState(new URLSearchParams(location.search));
  const categoryParam = searchParams.get("category") || "all";
  const searchQuery = searchParams.get("q") || "";

  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [sortOption, setSortOption] = useState("featured");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1500 });
  const [currentPage, setCurrentPage] = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [searchValue, setSearchValue] = useState(searchQuery);
  
  const productsPerPage = 12;

  // Apply initial filters and sorting
  useEffect(() => {
    let filtered = [...products];
    
    // Apply category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    
    // Apply price filter
    filtered = filtered.filter(
      product => product.price >= priceRange.min && product.price <= priceRange.max
    );
    
    // Apply search filter
    if (searchValue.trim()) {
      const searchLower = searchValue.toLowerCase();
      filtered = filtered.filter(
        product => 
          product.name.toLowerCase().includes(searchLower) ||
          product.description.toLowerCase().includes(searchLower) ||
          product.category.toLowerCase().includes(searchLower)
      );
    }
    
    setFilteredProducts(filtered);
    
    // Apply sorting
    let sorted = [...filtered];
    switch (sortOption) {
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      // Default is "featured", which is the original order
    }
    
    // Pagination
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    setDisplayedProducts(sorted.slice(startIndex, endIndex));
  }, [selectedCategory, sortOption, priceRange, currentPage, searchValue]);

  // Update total pages whenever filtered products change
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Handle category change
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  // Handle sort change
  const handleSortChange = (option: string) => {
    setSortOption(option);
    setCurrentPage(1);
  };

  // Handle price range change
  const handlePriceRangeChange = (type: "min" | "max", value: number) => {
    setPriceRange(prev => ({ ...prev, [type]: value }));
    setCurrentPage(1);
  };

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Toggle filters on mobile
  const toggleFilters = () => {
    setFiltersOpen(!filtersOpen);
  };

  return (
    <main className="min-h-screen py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">All Products</h1>
          <p className="text-gray-600 mt-2">Browse our collection of high-quality products.</p>
        </div>
        
        {/* Search Bar */}
        <div className="mb-8">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="input-primary pl-10 w-full md:w-80"
                placeholder="Search products..."
              />
            </div>
          </form>
        </div>
        
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-4">
          <button
            onClick={toggleFilters}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50"
          >
            <Filter size={18} />
            <span>Filters</span>
            {filtersOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
        </div>
        
        <div className="flex flex-wrap lg:flex-nowrap gap-8">
          {/* Filters - Left Sidebar */}
          <div className={cn(
            "w-full lg:w-64 space-y-6 transition-all",
            filtersOpen ? "block" : "hidden lg:block"
          )}>
            {/* Category Filter */}
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Categories</h3>
              <div className="space-y-2">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryChange(category.id)}
                    className={cn(
                      "block w-full text-left py-1.5 px-2 rounded-md text-sm font-medium transition-colors",
                      selectedCategory === category.id
                        ? "bg-primary/10 text-primary"
                        : "text-gray-700 hover:bg-gray-50"
                    )}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Price Filter */}
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Price Range</h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-sm text-gray-500">Min ($)</label>
                    <input
                      type="number"
                      min="0"
                      value={priceRange.min}
                      onChange={(e) => handlePriceRangeChange("min", parseInt(e.target.value))}
                      className="input-primary w-full"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Max ($)</label>
                    <input
                      type="number"
                      min="0"
                      value={priceRange.max}
                      onChange={(e) => handlePriceRangeChange("max", parseInt(e.target.value))}
                      className="input-primary w-full"
                    />
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <button
                    onClick={() => setPriceRange({ min: 0, max: 1500 })}
                    className="text-sm text-gray-500 hover:text-gray-700"
                  >
                    Reset
                  </button>
                  <span className="text-sm text-gray-700">
                    ${priceRange.min} - ${priceRange.max}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Products */}
          <div className="flex-1">
            {/* Sort Controls */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-gray-600">
                Showing {displayedProducts.length} of {filteredProducts.length} products
              </p>
              
              <div className="flex items-center">
                <label htmlFor="sort" className="text-sm text-gray-600 mr-2">Sort by:</label>
                <div className="relative">
                  <select
                    id="sort"
                    value={sortOption}
                    onChange={(e) => handleSortChange(e.target.value)}
                    className="input-primary appearance-none pr-8"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="name-asc">Name: A to Z</option>
                    <option value="name-desc">Name: Z to A</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <ArrowUpDown className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Applied Filters */}
            {(selectedCategory !== "all" || searchValue || priceRange.min > 0 || priceRange.max < 1500) && (
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className="text-sm text-gray-600">Active filters:</span>
                
                {selectedCategory !== "all" && (
                  <div className="inline-flex items-center bg-gray-100 px-3 py-1 rounded-full text-sm">
                    <span className="mr-1">Category: {categories.find(c => c.id === selectedCategory)?.name}</span>
                    <button 
                      onClick={() => handleCategoryChange("all")}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <X size={14} />
                    </button>
                  </div>
                )}
                
                {searchValue && (
                  <div className="inline-flex items-center bg-gray-100 px-3 py-1 rounded-full text-sm">
                    <span className="mr-1">Search: {searchValue}</span>
                    <button 
                      onClick={() => setSearchValue("")}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <X size={14} />
                    </button>
                  </div>
                )}
                
                {(priceRange.min > 0 || priceRange.max < 1500) && (
                  <div className="inline-flex items-center bg-gray-100 px-3 py-1 rounded-full text-sm">
                    <span className="mr-1">Price: ${priceRange.min} - ${priceRange.max}</span>
                    <button 
                      onClick={() => setPriceRange({ min: 0, max: 1500 })}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <X size={14} />
                    </button>
                  </div>
                )}
                
                <button 
                  onClick={() => {
                    setSelectedCategory("all");
                    setSearchValue("");
                    setPriceRange({ min: 0, max: 1500 });
                  }}
                  className="text-sm text-primary hover:underline"
                >
                  Clear all
                </button>
              </div>
            )}
            
            {/* Product Grid */}
            {displayedProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {displayedProducts.map(product => (
                  <div key={product.id} className="animate-fade-in">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 mb-4">No products match your criteria</p>
                <button
                  onClick={() => {
                    setSelectedCategory("all");
                    setSearchValue("");
                    setPriceRange({ min: 0, max: 1500 });
                  }}
                  className="btn-primary"
                >
                  Reset Filters
                </button>
              </div>
            )}
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-12">
                <nav className="flex items-center space-x-1">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={cn(
                      "p-2 rounded-md border",
                      currentPage === 1 
                        ? "border-gray-200 text-gray-400 cursor-not-allowed" 
                        : "border-gray-300 text-gray-700 hover:bg-gray-50"
                    )}
                  >
                    <ChevronDown className="h-5 w-5 rotate-90" />
                  </button>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={cn(
                        "h-9 w-9 rounded-md flex items-center justify-center border text-sm",
                        page === currentPage
                          ? "bg-primary text-white border-primary"
                          : "border-gray-300 text-gray-700 hover:bg-gray-50"
                      )}
                    >
                      {page}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={cn(
                      "p-2 rounded-md border",
                      currentPage === totalPages 
                        ? "border-gray-200 text-gray-400 cursor-not-allowed" 
                        : "border-gray-300 text-gray-700 hover:bg-gray-50"
                    )}
                  >
                    <ChevronDown className="h-5 w-5 -rotate-90" />
                  </button>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Products;
