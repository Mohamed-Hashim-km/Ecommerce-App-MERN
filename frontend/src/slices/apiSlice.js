import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
   
const API_URL = "https://ecommerce-app-mern-aiyc.vercel.app" || "http://localhost:5000"; 
// Define a service using a base URL and expected endpoints
export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: API_URL, credentials: "include" }),
  tagTypes: ["Products", "product", "users"],
  endpoints: () => ({}),
});
