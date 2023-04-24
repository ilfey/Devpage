import axios from "axios"

export const API = axios.create({
  baseURL: "https://devback.onrender.com/api/v1/"
})