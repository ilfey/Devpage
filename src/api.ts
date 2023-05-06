import axios from "axios"
import { clearToken, getToken } from "./coockie"
import ILogin from "./types/login"
import IResponse from "./types/response"
import IMessage from "./types/message"
import IErrorResponse from "./types/errorResponse"

export const API = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL
})


export const getMessages = () =>
  API.get<Array<IMessage>>("/messages")


export const postMessage = (content: string, reply_to: number | null) =>
  API.post<IResponse>("/user/message", {
    content,
    reply_to,
  }, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    }
  })
    .catch(e => {
      if (axios.isAxiosError<IErrorResponse>(e)) {
        switch (e.response?.status) {
          case 401:
            clearToken()
            sessionStorage.clear()
            break
        }
      }
    })



export const patchMessage = (id: number, content: string) =>
  API.patch<IResponse>(`/_user/message/${id}`, {
    content,
  }, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    }
  })
    .catch(e => {
      if (axios.isAxiosError<IErrorResponse>(e)) {
        switch (e.response?.status) {
          case 401:
            clearToken()
            sessionStorage.clear()
            break
        }
      }
    })


export const deleteMessage = (id: number) =>
  API.delete<IResponse>(`/user/message/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  })
    .catch(e => {
      if (axios.isAxiosError<IErrorResponse>(e)) {
        switch (e.response?.status) {
          case 401:
            clearToken()
            sessionStorage.clear()
            break
        }
      }
    })


export const postLogin = (username: string, password: string) =>
  API.post<ILogin>("/user/login", {
    username,
    password,
  })


export const postRegister = (username: string, password: string) =>
  API.post<IResponse>("/user/register", {
    username,
    password,
  })
