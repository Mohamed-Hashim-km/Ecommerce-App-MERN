import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL || "https://ecommerce-app-mern-1121.onrender.com",
    credentials: "include", // Include credentials (cookies) in requests
  }),
  tagTypes: ["Products", "product", "users"],
  endpoints: () => ({}),
});