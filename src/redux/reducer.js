import { createReducer } from "@reduxjs/toolkit";

export const cartReducer = createReducer(
  {
    cartItems: [],
    subTotal: 0,
    shipping: 0,
    tax: 0,
    total: 0,
  },
  {
    addToCart: (state, action) => {
      const items = action.payload;
      const isItemExist = state.cartItems.find((i) => i.id === items.id);
      if (isItemExist) {
        state.cartItems.forEach((i) => {
          if (i.id === items.id) i.quantity += 1;
        });
      } else {
        state.cartItems.push(items);
      }
    },
    decrement: (state, action) => {
      const items = state.cartItems.find((i) => i.id === action.payload);
      if (items.quantity > 1) {
        state.cartItems.forEach((i) => {
          if (i.id === items.id) i.quantity -= 1;
        });
      }
    },
    deleteFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (cart) => cart.id !== action.payload
      );
    },
    calculateTotal: (state) => {
      let sum = 0;
      state.cartItems.forEach((i) => (sum += i.price * i.quantity));
      state.subTotal = sum;
      state.shipping = state.subTotal < 1000 && state.subTotal > 0 ? 100 : 0;
      state.tax = +(state.subTotal * 0.13).toFixed(2);
      state.total = state.subTotal + state.shipping + state.tax;
    },
  }
);
