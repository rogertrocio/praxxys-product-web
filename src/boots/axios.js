import axios from "axios"
import { useAuthStore } from "@/stores/auth"



const baseURL = import.meta.env?.VITE_API_URL === ""
  ? 'http://127.0.0.1:8000/api'
  : import.meta.env.VITE_API_URL

const api = axios.create({ baseURL })

api.interceptors.request.use(function (config) {
  const store = useAuthStore()

  if (store.token) {
    config.headers.Authorization = `Bearer ${store.token}`
  }

  return config;
}, function (error) {
  return Promise.reject(error);
});

export { api }
