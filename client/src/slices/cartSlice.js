import { createSlice, createSelector } from '@reduxjs/toolkit';

const initialState = {
  cart: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const isItemExist = state.cart.find((i) => i._id === item._id);
      if (isItemExist) {
         state.cart = state.cart.map((i) => (i._id === isItemExist._id ? item : i));
       } else {
        state.cart.push(item);
       }
      localStorage.setItem("cartItems", JSON.stringify(state.cart));
    },

    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((i) => i._id !== action.payload);
      localStorage.setItem("cartItems", JSON.stringify(state.cart));
      console.log('action.payload:',action.payload);

    }
  }
});

export const selectCartItems = state => state.cart.cart; 
export const selectCartTotal = createSelector(
  [selectCartItems],
  (items) => items.reduce((total, item) => total + item.price , 0)
);

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
