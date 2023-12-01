import { createSlice } from "@reduxjs/toolkit";
import isEqual from "lodash/isEqual";

const items =
  localStorage.getItem("cartItems") !== null
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];

const totalAmount =
  localStorage.getItem("totalAmount") !== null
    ? JSON.parse(localStorage.getItem("totalAmount"))
    : 0;

const totalQuantity =
  localStorage.getItem("totalQuantity") !== null
    ? JSON.parse(localStorage.getItem("totalQuantity"))
    : 0;

const setItemFunc = (item, totalAmount, totalQuantity) => {
  localStorage.setItem("cartItems", JSON.stringify(item));
  localStorage.setItem("totalAmount", JSON.stringify(totalAmount));
  localStorage.setItem("totalQuantity", JSON.stringify(totalQuantity));
};

const initialState = {
  cartItems: items,
  totalQuantity: totalQuantity,
  totalAmount: totalAmount,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    addItem(state, action) {
      const newItem = action.payload;
      const existingItem = state.cartItems.find(
        (item) =>
          item.id === newItem.id &&
          isEqual(item.selectedOptions, newItem.selectedOptions)
      );
      state.totalQuantity++;

      if (!existingItem) {
        state.cartItems.push({
          id: newItem.id,
          title: newItem.title,
          image01: newItem.image01,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          selectedOptions: newItem.selectedOptions,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice =
          Number(existingItem.totalPrice) + Number(newItem.price);
      }

      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0
      );

      setItemFunc(
        state.cartItems.map((item) => item),
        state.totalAmount,
        state.totalQuantity
      );
    },

    removeItem(state, action) {
      const { id, selectedOptions } = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === id && isEqual(item.selectedOptions, selectedOptions));
      state.totalQuantity--;

      if (existingItem.quantity > 1) {
        existingItem.quantity--;
        existingItem.totalPrice =
          Number(existingItem.totalPrice) - Number(existingItem.price);
      } else {
        const existingItemIndex = state.cartItems.findIndex(
          (item) =>
            item.id === id && isEqual(item.selectedOptions, selectedOptions)
        );
        state.cartItems.splice(existingItemIndex, 1);
      }

      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0
      );

      setItemFunc(
        state.cartItems.map((item) => item),
        state.totalAmount,
        state.totalQuantity
      );
    },

    deleteItem(state, action) {
      const { id, selectedOptions } = action.payload;
      const existingItemIndex = state.cartItems.findIndex(
        (item) =>
          item.id === id && isEqual(item.selectedOptions, selectedOptions)
      );

      if (existingItemIndex !== -1) {
        const existingItem = state.cartItems[existingItemIndex];
        state.totalQuantity -= existingItem.quantity;
        state.totalAmount -= existingItem.totalPrice;

        state.cartItems.splice(existingItemIndex, 1);
      }

      setItemFunc(
        state.cartItems.map((item) => item),
        state.totalAmount,
        state.totalQuantity
      );
    },

    modifyOptions(state, action) {
      const { id, options } = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === id);

      if (existingItem && Array.isArray(options)) {
        const updatedOptions = existingItem.selectedOptions
          ? [...existingItem.selectedOptions, ...options]
          : [...options];

        existingItem.selectedOptions = updatedOptions;
        existingItem.totalPrice += options.reduce(
          (total, option) => total + option.price,
          0
        );
        state.totalAmount += options.reduce(
          (total, option) => total + option.price,
          0
        );
      }
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
