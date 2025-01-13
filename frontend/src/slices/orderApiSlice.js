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
  }),
});

export const { useCreateOrderMutation, useGetOrderByIdQuery } = orderApi;
