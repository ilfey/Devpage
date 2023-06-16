import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios"
import { clearToken, getToken } from "./coockie"
import ILogin from "./types/login"
import IResponse from "./types/response"
import IMessage from "./types/message"
// import IErrorResponse from "./types/errorResponse"

export const API = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  }
})

API.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getToken()

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

API.interceptors.response.use((res: AxiosResponse) => {

  if (res.status === 401) {
    clearToken()
    sessionStorage.clear()
  }

  return res
})


export const getMessages = () =>
  API.get<Array<IMessage>>(
    "/messages",
    )


export const postMessage = (content: string, reply_to: number | null) =>
  API.post<IResponse>(
    "/user/message",
    {
      content,
      reply_to,
    })


export const patchMessage = (id: number, content: string) =>
  API.patch<IResponse>(
    `/user/message/${id}`,
    {
      content,
    })


export const admPatchMessage = (id: number, content: string) =>
  API.patch<IResponse>(
    `${process.env.REACT_APP_ADMIN_PATH_PREFIX}/users/messages/${id}`,
    {
      content,
    })


export const deleteMessage = (id: number) =>
  API.delete<IResponse>(
    `/user/message/${id}`,
  )

export const admDeleteMessage = (id: number) =>
  API.delete<IResponse>(
    `${process.env.REACT_APP_ADMIN_PATH_PREFIX}/users/messages/${id}`,
  )


export const postLogin = (username: string, password: string) =>
  API.post<ILogin>(
    "/user/login",
    {
      username,
      password,
    })


export const postRegister = (username: string, password: string) =>
  API.post<IResponse>(
    "/user/register",
    {
      username,
      password,
    })
