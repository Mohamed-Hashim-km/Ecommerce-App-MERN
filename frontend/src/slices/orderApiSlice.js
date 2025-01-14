import { apiSlice } from "./apiSlice";

const orderApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    createOrder: build.mutation({
      query: (data) => ({
        url: "/api/order",
        method: "POST",
        body: data,
      }),
    }),
    getOrderById: build.query({
      query: (id) => ({
        url: `/api/order/${id}`,
      }),
    }),
    getMyorder: build.query({
      query: () => ({
        url: `/api/order/mine`,
      }),
    }),
    getorder: build.query({
      query: () => ({
        url: `/api/order`,
      }),
    }),
  }),
});

export const { useCreateOrderMutation, useGetOrderByIdQuery,useGetMyorderQuery,useGetorderQuery } = orderApi;
