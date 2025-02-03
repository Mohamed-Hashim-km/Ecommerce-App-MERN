import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "https://ecommerce-app-mern-10.onrender.com/api" }),
  tagTypes: ["Products","product","users"],
  endpoints: () => ({}),
});
