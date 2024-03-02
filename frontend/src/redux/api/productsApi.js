import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/v1`,
  }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (params) => "/products",
    }),
    getProductsDetails: builder.query({
      query: (id) => `/products/${id}`,
    }),
  }),
});

// module.exports = productApi;
export const { useGetProductsQuery,useGetProductsDetailsQuery } = productApi;
