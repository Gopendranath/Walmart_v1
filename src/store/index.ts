import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './productsSlice.ts';
import cartReducer from './cartSlice.ts';
import wishlistReducer from './wishlistSlice.ts';
import ordersReducer from './orderSlice';

const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    orders: ordersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

