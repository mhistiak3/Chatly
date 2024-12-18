import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { server } from "../../constants/config";
const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: `${server}/api/v1/` }),
  tagTypes: ["Chat"],
  endpoints: (builder) => ({
    userChats: builder.query({
      query: () => ({ url: "chat/get-user-chats", credentials: "include" }),
      providesTags: ["Chat"],
    }),
    
  }),

});
export const { useUserChatsQuery } = api;
export default api;
