import toast from 'react-hot-toast'

export default function ToastNotification() {
  // This component is optional; react-hot-toast uses <Toaster /> in App.
  // Kept for assignment structure.
  return null
}

export const toastSuccess = (msg) => toast.success(msg)
export const toastError = (msg) => toast.error(msg)
export const toastInfo = (msg) => toast(msg)

