import { Product } from "@/context/CartContext";

// Categories
export const categories = [
  { id: "all", name: "All Products" },
  { id: "electronics", name: "Electronics" },
  { id: "clothing", name: "Clothing" },
  { id: "home", name: "Home & Kitchen" },
  { id: "beauty", name: "Beauty & Personal Care" },
  { id: "books", name: "Books" },
];

// Mock Products
export const products: Product[] = [
  {
    id: "1",
    name: "Wireless Noise Cancelling Headphones",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2670&auto=format&fit=crop",
    description: "Premium wireless headphones with active noise cancelling technology, 30-hour battery life, and crystal-clear sound quality perfect for music lovers and frequent travelers.",
    category: "electronics",
  },
  {
    id: "2",
    name: "Minimalist Smart Watch",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=2699&auto=format&fit=crop",
    description: "A sleek, minimalist smart watch with health tracking features, notifications, and a beautiful OLED display. Water-resistant and perfect for everyday use.",
    category: "electronics",
  },
  {
    id: "3",
    name: "Modern Desk Lamp",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=2670&auto=format&fit=crop",
    description: "Adjustable LED desk lamp with wireless charging pad and multiple brightness levels. Perfect for your home office or bedside table.",
    category: "home",
  },
  {
    id: "4",
    name: "Premium Cotton T-Shirt",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=2680&auto=format&fit=crop",
    description: "Ultra-soft premium cotton t-shirt with a modern fit. Available in multiple colors and sizes.",
    category: "clothing",
  },
  {
    id: "5",
    name: "Professional Camera Kit",
    price: 1299.99,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2764&auto=format&fit=crop",
    description: "Complete professional camera kit with a high-resolution sensor, multiple lenses, and accessories for both photography and videography.",
    category: "electronics",
  },
  {
    id: "6",
    name: "Minimalist Ceramic Vase",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=2574&auto=format&fit=crop",
    description: "Handcrafted ceramic vase with a minimalist design that complements any home decor. Available in white, black, and terracotta.",
    category: "home",
  },
  {
    id: "7",
    name: "Natural Face Serum",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1573575155376-b5010099301b?q=80&w=2570&auto=format&fit=crop",
    description: "Organic face serum with natural ingredients to hydrate, brighten, and nourish your skin. Suitable for all skin types.",
    category: "beauty",
  },
  {
    id: "8",
    name: "Leather Laptop Sleeve",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=2568&auto=format&fit=crop",
    description: "Premium leather laptop sleeve with soft interior lining to protect your device. Fits laptops up to 15 inches.",
    category: "electronics",
  },
  {
    id: "9",
    name: "Bestselling Novel Collection",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=2679&auto=format&fit=crop",
    description: "A collection of five bestselling novels from acclaimed authors. Perfect for book lovers or as a thoughtful gift.",
    category: "books",
  },
  {
    id: "10",
    name: "Minimalist Wall Clock",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1563861826100-9cb78f20f3a6?q=80&w=2670&auto=format&fit=crop",
    description: "Simple, elegant wall clock with a silent movement mechanism. Available in multiple colors to match any interior.",
    category: "home",
  },
  {
    id: "11",
    name: "Wireless Charging Pad",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?q=80&w=2670&auto=format&fit=crop",
    description: "Fast wireless charging pad compatible with all Qi-enabled devices. Sleek design with LED indicator.",
    category: "electronics",
  },
  {
    id: "12",
    name: "Premium Coffee Maker",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1520970519539-8c9eaad9d5fa?q=80&w=2574&auto=format&fit=crop",
    description: "High-quality coffee maker with programmable settings, built-in grinder, and thermal carafe to keep your coffee hot for hours.",
    category: "home",
  },
];

// Helper function to get product by ID
export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

// Helper function to get products by category
export const getProductsByCategory = (category: string): Product[] => {
  if (category === "all") return products;
  return products.filter(product => product.category === category);
};

// Helper function to search products
export const searchProducts = (query: string): Product[] => {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(lowercaseQuery) || 
    product.description.toLowerCase().includes(lowercaseQuery) ||
    product.category.toLowerCase().includes(lowercaseQuery)
  );
};

// Mock orders
export interface Order {
  id: string;
  date: string;
  status: "pending" | "processing" | "shipped" | "delivered";
  total: number;
  items: Array<{
    product: Product;
    quantity: number;
  }>;
  paymentMethod: string;
  shippingAddress: {
    name: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
}

export const orders: Order[] = [
  {
    id: "ORD-1234-5678",
    date: "2023-04-15",
    status: "delivered",
    total: 329.98,
    items: [
      { product: products[0], quantity: 1 },
      { product: products[2], quantity: 1 }
    ],
    paymentMethod: "Credit Card",
    shippingAddress: {
      name: "John Doe",
      street: "123 Main St",
      city: "Anuradhapura",
      state: "North Central",
      zip: "50000",
      country: "Sri Lanka"
    }
  },
  {
    id: "ORD-2345-6789",
    date: "2023-05-20",
    status: "shipped",
    total: 149.99,
    items: [
      { product: products[11], quantity: 1 }
    ],
    paymentMethod: "PayPal",
    shippingAddress: {
      name: "John Doe",
      street: "123 Main St",
      city: "Anuradhapura",
      state: "North Central",
      zip: "50000",
      country: "Sri Lanka"
    }
  },
  {
    id: "ORD-3456-7890",
    date: "2023-06-10",
    status: "processing",
    total: 279.97,
    items: [
      { product: products[3], quantity: 1 },
      { product: products[5], quantity: 1 },
      { product: products[6], quantity: 1 }
    ],
    paymentMethod: "Credit Card",
    shippingAddress: {
      name: "John Doe",
      street: "123 Main St",
      city: "Anuradhapura",
      state: "North Central",
      zip: "50000",
      country: "Sri Lanka"
    }
  }
];

// Helper function to get order by ID
export const getOrderById = (id: string): Order | undefined => {
  return orders.find(order => order.id === id);
};

// Mock featured products - could be a special curated list or best sellers
export const featuredProducts = [products[0], products[4], products[7], products[11]];
