import ILogin from "../../types/login";
import IResponse from "../../types/response";
import { api } from "./api";

export const usersApi = api.injectEndpoints({
  endpoints:
    builder => ({
      login: builder.mutation<ILogin, { username: string, password: string }>({
        query: (arg) => ({
          body: {
            username: arg.username,
            password: arg.password,
          },
          url: "/user/login",
          method: "POST",
        }),
      }),

      register: builder.mutation<IResponse, { username: string, password: string }>({
        query: (arg) => ({
          url: "/user/register",
          body: {
            username: arg.username,
            password: arg.password,
          },
          method: "POST",
        }),
      }),
    }),
})

export const { useLoginMutation, useRegisterMutation } = usersApi