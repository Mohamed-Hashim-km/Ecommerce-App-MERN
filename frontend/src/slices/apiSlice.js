import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "ecommerce-app-mern-aiyc.vercel.app" }),
  tagTypes: ["Products","product","users"],
  endpoints: () => ({}),
});
