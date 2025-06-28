import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'sonner';

interface CartItem {
    id: string;
    title: string;
    price: number;
    image: string;
    quantity: number
}

interface CartState {
    cartItems: CartItem[]
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

const initialState: CartState = {
    cartItems: loadState('cart') || []
}


export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            if (state.cartItems.find((item: any) => item.id === action.payload.id)) {
                state.cartItems.map((item: any) => {
                    if (item.id === action.payload.id) {
                        item.quantity += 1;
                    }
                });
            } else {
                state.cartItems.push(action.payload);
            }
            saveState('cart', state.cartItems);
            toast.success(`${action.payload.title} added to cart`);
        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter(
                (item: any) => item.id !== action.payload
            );
            saveState('cart', state.cartItems);
            toast.success('Item removed from cart');
        },
        clearCart: (state) => {
            state.cartItems = [];
            saveState('cart', state.cartItems);
            toast.success('Cart cleared');
        },
        quantityIncrement: (state, action) => {
            state.cartItems.map((item: any) => {
                if (item.id === action.payload) {
                    item.quantity += 1;
                    toast.success(`${item.title} quantity increased`);
                }
            });
            saveState('cart', state.cartItems);

        },
        quantityDecrement: (state, action) => {
            state.cartItems.map((item: any) => {
                if (item.id === action.payload) {
                    item.quantity -= 1;
                    toast.success(`${item.title} quantity decreased`);
                }
            });
            saveState('cart', state.cartItems);
        },
        
    },
});

export const { addToCart, removeFromCart, clearCart, quantityIncrement, quantityDecrement } = cartSlice.actions;
export default cartSlice.reducer;