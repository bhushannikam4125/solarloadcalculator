import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import LoadingSpinner from './LoadingSpinner.jsx'
import { useAuth } from '../../context/AuthContext.jsx'

export default function ProtectedRoute({ children }) {
  const { token, loading, user } = useAuth()

  if (loading) return <LoadingSpinner />
  if (!token) return <Navigate to="/auth/login" replace />

  // If admin route, Admin page will handle it. For now just protect auth.
  return children ? children : <Outlet />
}

