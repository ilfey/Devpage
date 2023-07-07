import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { getToken } from "../../coockie"

export const 
  TAG_MESSAGES = "messages",
  TAG_MESSAGE = "message"

export const api = createApi({
  reducerPath: "api",
  tagTypes: [TAG_MESSAGES, TAG_MESSAGE],
  refetchOnFocus: true,
  refetchOnReconnect: true,
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_APP_BACKEND_URL,
    prepareHeaders: (headers) => {
      const token = getToken()

      if (token) {
        headers.set("Authorization", `Bearer ${token}`)
      }
    },
  }),
  endpoints: () => ({}),
})