// solar-load-calculator/frontend/src/components/common/ToastNotification.jsx
import React from 'react'
import toast from 'react-hot-toast'

export function notifySuccess(message) {
  toast.success(message)
}

export function notifyError(message) {
  toast.error(message)
}

export default function ToastNotification() {
  return null
}

