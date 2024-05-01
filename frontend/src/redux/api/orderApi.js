import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/v1`,
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  }),

    endpoints: (builder) => ({
      createNewOrder: builder.mutation({
        query(body) {
          return {
            url: "/orders/new",
            method: "POST",
            body,
          };
        },
      }),
      stripeCheckoutSession: builder.mutation({
        query(body) {
          return {
            url: "/payment/checkout",
            method: "POST",
            body,
          };
        },
      }),
    }),
});

// module.exports = productApi;
export const {useCreateNewOrderMutation,useStripeCheckoutSessionMutation} = orderApi;
