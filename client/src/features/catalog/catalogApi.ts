import { createApi } from "@reduxjs/toolkit/query/react";
import { Product } from "../../app/models/products";
import { baseQueryWithErrorHandling } from "../../app/api/baseApi";

export const catalogApi = createApi({
  reducerPath: "catalogApi",
  baseQuery: baseQueryWithErrorHandling,
  endpoints: (builder) => ({
    fetchProducts: builder.query<Product[], void>({
      query: () => ({ url: "products" }),
    }),
    fetchProductDetails: builder.query<Product, number>({
      query: (productId) => ({ url: `products/${productId}` }),
    }),
    fetchFilters: builder.query<{ brands: string[]; types: string[] }, void>({
      query: () => ({ url: "products/filters" }),
    }),
  }),
});

export const {
  useFetchProductDetailsQuery,
  useFetchProductsQuery,
  useFetchFiltersQuery,
} = catalogApi;
