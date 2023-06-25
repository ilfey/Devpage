import LoginResponse from "../../entities/LoginResponse";
import IResponse from "../../entities/Response";
import { api } from "./api";

export const usersApi = api.injectEndpoints({
  endpoints:
    builder => ({
      login: builder.mutation<LoginResponse, { username: string, password: string }>({
        query: (arg) => ({
          body: {
            username: arg.username,
            password: arg.password,
          },
          url: "/login",
          method: "POST",
        }),
      }),

      register: builder.mutation<IResponse, { username: string, password: string }>({
        query: (arg) => ({
          url: "/register",
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