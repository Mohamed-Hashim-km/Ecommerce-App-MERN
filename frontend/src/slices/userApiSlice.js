import { apiSlice } from './apiSlice'

const userApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    sign: build.mutation({
      query: (data) => ({
        url:'/api/users',
        method: 'POST',
        body: data
      }),
    }),
    login: build.mutation({
        query: (data) => ({
          url:'/api/users/auth',
          method:"POST",
          body:data
        }),
      }),
      logout: build.mutation({
        query: () => ({
          url:'/api/users/logout',
          method:"POST"
        }),
      }),
  }),
})

export const { useSignMutation,useLoginMutation,useLogoutMutation } = userApi