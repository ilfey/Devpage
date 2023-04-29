import axios from "axios"
import { getToken } from "./coockie"

export const API = axios.create({
  baseURL: "https://devback.onrender.com/api/v1/"
})

export const getMessages = () => API.get("/messages")

export const postMessage = (content: string, reply_to: number | null) => API.post("/user/message", {
  content,
  reply_to,
}, {
  headers: {
    "Authorization": `Bearer ${getToken()}`,
  }
})

export const deleteMessage = (id: number) =>
  API.delete(`/user/message/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  })
