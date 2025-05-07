import axios from "axios";


const BASE_URL = import.meta.env.VITE_API_BASE_URL || "";


export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept:"application/json",
  }
});