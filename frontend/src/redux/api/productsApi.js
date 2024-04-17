import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/v1`,
    // baseUrl: "/api",
    
  }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (params) => "/products",
    }),
    getProductsDetails: builder.query({
      query: (id) => `/products/${id}`,
    }),
    getProductsByCategory: builder.query({
      query :(category) => `/products?category=${category}`,

    }),
  }),
});

// module.exports = productApi;
export const { useGetProductsQuery,useGetProductsDetailsQuery ,useGetProductsByCategoryQuery} = productApi;
