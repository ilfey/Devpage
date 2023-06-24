import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { getToken } from "../../coockie"

export const 
  TAG_MESSAGES = "messages"

export const api = createApi({
  reducerPath: "api",
  tagTypes: [TAG_MESSAGES],
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