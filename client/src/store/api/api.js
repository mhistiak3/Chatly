import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { server } from "../../constants/config";
const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: `${server}/api/v1/` }),
  tagTypes: ["Chat", "User"],
  endpoints: (builder) => ({
    userChats: builder.query({
      query: () => ({ url: "chat/get-user-chats", credentials: "include" }),
      providesTags: ["Chat"],
    }),
    searchUser: builder.query({
      query: (name) => ({
        url: `user/search-user?name=${name}`,
        credentials: "include",
      }),
      providesTags: ["User"],
    }),
    sendFriendRequest: builder.mutation({
      query: (data) => ({
        url: `/request/send-friend-request`,
        method: "POST",
        body: data,
        credentials:"include"
      }),
      invalidatesTags: ["User"],
    }),
  }),
});
export const { useUserChatsQuery, useLazySearchUserQuery,useSendFriendRequestMutation } = api;
export default api;
