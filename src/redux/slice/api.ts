import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { Product } from "./type";

const BASE_URL = "razorpodbackend-production.up.railway.app/api";

export const getAllProducts = createAsyncThunk(
  "product/getAllProducts",
  async (
    params: { limit?: number; skip?: number } = {},
    { rejectWithValue }
  ) => {
    try {
      const { limit = 12, skip = 0 } = params;
      const response = await axios.get(
        `${BASE_URL}/products?limit=${limit}&skip=${skip}`
      );
      console.log("RES", response.data?.products);

      return response.data.products as Product[];
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);

export const getProductById = createAsyncThunk(
  "product/getProductById",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/products/${id}`);
      return [response.data] as Product[]; // wrapped in array for consistency
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);

export const getCategories = createAsyncThunk(
  "product/getCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/categories`);
      return response.data as string[];
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);

export const getProductsByCategory = createAsyncThunk(
  "product/getProductsByCategory",
  async (category: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/category/${category}`);
      return response.data.products as Product[];
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);
