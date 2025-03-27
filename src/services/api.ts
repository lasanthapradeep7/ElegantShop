import axios from 'axios';
import { collection, getDocs, doc, getDoc, addDoc, query, where, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Product } from '@/context/CartContext';

// Firebase Firestore API
export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const productsCollection = collection(db, 'products');
    const productsSnapshot = await getDocs(productsCollection);
    const productsList = productsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Product[];
    return productsList;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const fetchProductById = async (id: string): Promise<Product | null> => {
  try {
    const productRef = doc(db, 'products', id);
    const productSnapshot = await getDoc(productRef);
    
    if (productSnapshot.exists()) {
      return { id: productSnapshot.id, ...productSnapshot.data() } as Product;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

// Order tracking
export interface Order {
  id: string;
  userId: string;
  items: any[];
  total: number;
  status: 'pending' | 'shipped' | 'delivered';
  createdAt: Date;
  updatedAt: Date;
}

export const fetchOrderById = async (orderId: string): Promise<Order | null> => {
  try {
    const orderRef = doc(db, 'orders', orderId);
    const orderSnapshot = await getDoc(orderRef);
    
    if (orderSnapshot.exists()) {
      return { id: orderSnapshot.id, ...orderSnapshot.data() } as Order;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching order:', error);
    throw error;
  }
};

export const fetchUserOrders = async (userId: string): Promise<Order[]> => {
  try {
    const ordersCollection = collection(db, 'orders');
    const q = query(
      ordersCollection, 
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    const ordersSnapshot = await getDocs(q);
    const ordersList = ordersSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Order[];
    return ordersList;
  } catch (error) {
    console.error('Error fetching user orders:', error);
    throw error;
  }
};

export const createOrder = async (orderData: Omit<Order, 'id'>): Promise<string> => {
  try {
    const ordersCollection = collection(db, 'orders');
    const newOrder = await addDoc(ordersCollection, orderData);
    return newOrder.id;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

// Mock API for development (can be used if Firebase isn't fully set up)
const API_BASE_URL = 'https://fakestoreapi.com';

export const fetchProductsApi = async (): Promise<any[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products`);
    return response.data.map((product: any) => ({
      id: product.id.toString(),
      name: product.title,
      price: product.price,
      image: product.image,
      description: product.description,
      category: product.category
    }));
  } catch (error) {
    console.error('Error fetching products from API:', error);
    throw error;
  }
};