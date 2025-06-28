import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'sonner';

// Define the shape of an individual order item
export interface OrderItem {
  id: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
  orderStatus: 'pending' | 'shipped' | 'delivered' | 'cancelled';
  orderDate: string;
  trackingNumber?: string;
  shippingAddress?: string;
  estimatedDelivery?: string;
  deliveredDate?: string;
  cancelledDate?: string;
}

// Utility functions for localStorage
const loadState = (key: string) => {
  try {
    const serializedState = localStorage.getItem(key);
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const saveState = (key: string, state: any) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(key, serializedState);
  } catch {
    // ignore write errors
  }
};

const NewOrders: OrderItem[] = []

// Define the shape of the orders slice state
interface OrdersState {
  orders: OrderItem[];
}

// Load initial state from localStorage or use dummy data
const initialState: OrdersState = {
  orders: loadState('orders') || NewOrders,
};

// Create the orders slice
export const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    // Add a new order
    addToOrders: (state, action) => {
      state.orders.unshift(action.payload);
      saveState('orders', state.orders);
      toast.success('Order added successfully');
    },
    // Update the status of an existing order
    updateOrderStatus: (state, action) => {
      const { id, status } = action.payload;
      const order = state.orders.find((o) => o.id === id);
      if (order) {
        order.orderStatus = status;
        saveState('orders', state.orders);
      }
    },
    // Clear all orders
    clearOrders: (state) => {
      state.orders = [];
      saveState('orders', state.orders);
    },
  },
});

// Export the action creators and the reducer
export const { addToOrders, updateOrderStatus, clearOrders } = orderSlice.actions;
export default orderSlice.reducer;