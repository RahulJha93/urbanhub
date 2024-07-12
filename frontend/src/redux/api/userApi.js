import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setIsAuthenticated, setUser, setLoading } from "../features/userSlice";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/v1`,
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getMe: builder.query({
      query: () => "/me",
      transformResponse: (result) => result.user,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        dispatch(setLoading(true));
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
          dispatch(setIsAuthenticated(true));
        } catch (err) {
          console.log(err);
        } finally {
          dispatch(setLoading(false));
        }
      },
      providesTags: ["User"],
    }),
    updateProfile: builder.mutation({
      query(body) {
        return {
          url: "/me/update",
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["User"],
    }),
    uploadAvatar: builder.mutation({
      query(body) {
        return {
          url: "/me/uploadAvatar",
          method: "PUT",
          body,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };
      },
      invalidatesTags: ["User"],
    }),
    updatePassword: builder.mutation({
      query(body) {
        return {
          url: "/password/update",
          method: "PUT",
          body,
        };
      },
    }),
    forgetPassword: builder.mutation({
      query(body) {
        return {
          url: "/password/forget",
          method: "PUT",
          body,
        };
      },
    }),
    resetPassword: builder.mutation({
      query({ token, body }) {
        return {
          url: `/password/reset/${token}`,
          method: "PUT",
          body,
        };
      },
    }),
  }),
});

export const {
  useGetMeQuery,
  useUpdateProfileMutation,
  useUploadAvatarMutation,
  useForgetPasswordMutation,
  useResetPasswordMutation,
  useUpdatePasswordMutation,
} = userApi;
