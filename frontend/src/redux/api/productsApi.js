import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/v1`,
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  }),
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (params) => ({
      url :"/products",
      params: {
        page: params?.page,
        keyword : params?.keyword, 
        "price[gte]":params.min,
        "price[lte]":params.max,
        category:params.category,
        ratings:params.ratings,
      },
      }),
    }),
    getProductsDetails: builder.query({
      query: (id) => `/products/${id}`,
      providesTags: ["Product"],
    }),
    getProductsByCategory: builder.query({
      query: (category) => `/products?category=${category}`,
    }),
    canUserReview: builder.query({
      query: (productId) => `/canReview/?productId=${productId}`,
    }),

    submitReviews: builder.mutation({
      query(body) {
        return {
          url: "/reviews",
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["Product"],
    }),
  }),
});

// module.exports = productApi;
export const {
  useGetProductsQuery,
  useGetProductsDetailsQuery,
  useGetProductsByCategoryQuery,
  useSubmitReviewsMutation,
  useCanUserReviewQuery,
} = productApi;
