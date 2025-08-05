import { createSlice } from "@reduxjs/toolkit";
import type { ProductState } from "./type";
import {
  getAllProducts,
  getProductById,
  getCategories,
  getProductsByCategory,
} from "./api";

const initialState: ProductState = {
  loading: false,
  error: null,
  success: false,
  products: [],
  productDetail: null,
  categories: [],
  categoryProducts: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    clearCategoryProducts: (state) => {
      state.categoryProducts = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.success = true;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      })

      .addCase(getProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.productDetail = action.payload[0];
        state.success = true;
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      })

      // Get Categories
      .addCase(getCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
        state.success = true;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      })

      .addCase(getProductsByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getProductsByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categoryProducts = action.payload;
        state.success = true;
      })
      .addCase(getProductsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      });
  },
});
export const { clearCategoryProducts } = productSlice.actions;
export default productSlice.reducer;
