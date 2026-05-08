// solar-load-calculator/frontend/src/components/common/ProtectedRoute.jsx
import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'
import LoadingSpinner from './LoadingSpinner.jsx'

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LoadingSpinner size={28} />
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/auth/login" replace state={{ from: location.pathname }} />
  }

  return children
}

