import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ 
    baseUrl: "https://ecommerce-app-mern-1121.onrender.com", // Deployed backend URL
  }),
  tagTypes: ["Products", "product", "users"],
  endpoints: () => ({}),
});