import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

const api = axios.create({
  baseURL: API_BASE + '/api',
})

// Helper for endpoints that are downloaded/opened in the browser
export function downloadUrl(billId) {
  // Keep same-origin friendly if VITE_API_BASE_URL is not provided
  // but still works when frontend+backend are separated.
  return API_BASE.replace(/\/$/, '') + `/api/download/${billId}`
}

// Authenticated download (needed because browser <a> links can't send Authorization headers)
export async function downloadExcel(billId) {
  const token = localStorage.getItem('token')
  const res = await axios.get(downloadUrl(billId), {
    responseType: 'blob',
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  })


  const blob = new Blob([res.data], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  })
  const url = window.URL.createObjectURL(blob)

  const a = document.createElement('a')
  a.href = url
  a.download = `bill-${billId}.xlsx`
  document.body.appendChild(a)
  a.click()
  a.remove()
  window.URL.revokeObjectURL(url)
}


api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export default api


