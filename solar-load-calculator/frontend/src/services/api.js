// solar-load-calculator/frontend/src/services/api.js
import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

const api = axios.create({
  baseURL: API_BASE + '/api',
})

// Attach JWT for protected endpoints
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export function downloadUrl(billId) {
  return API_BASE.replace(/\/$/, '') + `/api/download/${billId}`
}

export default api

