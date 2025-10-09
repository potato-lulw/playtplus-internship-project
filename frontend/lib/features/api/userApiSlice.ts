import { api } from "./apiSlice";

export interface User {
  _id: string;
  email: string;
  name: string;
  avatar?: string;
  cover?: string;
  followers: string[];
  following: string[];
  createdAt: string;
  updatedAt: string;
}


export const userApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<{ message: string; user: User }, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "GET",

      }),
    }),
    getAllusers: builder.query<{ message: string; users: User[] }, void>({
      query: () => ({
        url: `/users/all`,
        method: "GET",

      }),
    }),
    followUser: builder.mutation<{ message: string; following: boolean }, string>({
      query: (id) => ({
        url: `/users/${id}/follow`,
        method: "POST",

      }),
    }),
    getFollowingUsers: builder.query<{ message: string; following: string[] }, void>({
      query: () => ({
        url: `/users/following`,
        method: "GET",

      }),
    }),
    updateUser: builder.mutation<{ message: string; user: User }, FormData | { name: string, avatar: string, cover: string }>({
      query: (formData) => ({
        url: `/users/me`,
        method: "PATCH",

        body: formData
      })
    }),
    reportUser: builder.mutation({
      query: ({ id, reason }) => ({
        url: `/users/${id}/report`,
        method: "POST",
        body: { reason },

      }),
    }),
  }),
  // overrideExisting: true, 
});

export const { useGetUserQuery, useFollowUserMutation, useGetFollowingUsersQuery, useUpdateUserMutation, useGetAllusersQuery, useReportUserMutation } = userApiSlice;
