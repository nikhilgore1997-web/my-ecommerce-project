import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts(state, action) {
      state.items = action.payload;
    },
    addProduct(state, action) {
      state.items.push(action.payload);
    },
    updateProduct(state, action) {
      const index = state.items.findIndex(
        (p) => p.id === action.payload.id || p._id === action.payload._id
      );
      if (index !== -1) state.items[index] = action.payload;
    },
    removeProduct(state, action) {
      state.items = state.items.filter(
        (p) => p.id !== action.payload && p._id !== action.payload
      );
    },
  },
});

export const { setProducts, addProduct, updateProduct, removeProduct } =
  productSlice.actions;

export default productSlice.reducer;
