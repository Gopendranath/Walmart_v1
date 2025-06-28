import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'sonner';

interface WishlistItem {
    dateAdded: string | number | Date;
    id: string;
    title: string;
    price: number;
    image: string;
}

interface WishlistState {
    wishlistItems: WishlistItem[];
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
}

const initialState: WishlistState = {
    wishlistItems: loadState('wishlist') || [],
};

export const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        addToWishlist: (state, action) => {
            const exists = state.wishlistItems.some((item: any) => item.id === action.payload.id);
            if (!exists) {
                state.wishlistItems.push(action.payload);
                saveState('wishlist', state.wishlistItems);
                toast.success(`${action.payload.title} added to wishlist`);
            }
        },
        removeFromWishlist: (state, action) => {
            state.wishlistItems = state.wishlistItems.filter(
                (item: any) => item.id !== action.payload
            );
            toast.success(
                'Item removed from wishlist'
            );
            saveState('wishlist', state.wishlistItems);
        },
        clearWishlist: (state) => {
            state.wishlistItems = [];
            saveState('wishlist', state.wishlistItems);
            toast.success('Wishlist cleared');
        },
    },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
