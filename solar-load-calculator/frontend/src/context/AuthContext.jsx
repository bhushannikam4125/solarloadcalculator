// solar-load-calculator/frontend/src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import api from '../services/api.js'

const AuthContext = createContext(null)

function getStoredToken() {
  try {
    return localStorage.getItem('token')
  } catch {
    return null
  }
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(getStoredToken())
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Hydrate auth state
  useEffect(() => {
    const run = async () => {
      if (!token) {
        setLoading(false)
        return
      }

      try {
        const res = await api.get('/auth/me')
        setUser(res.data)
      } catch {
        try {
          localStorage.removeItem('token')
        } catch {
          // ignore
        }
        setToken(null)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    run()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const value = useMemo(() => {
    return {
      token,
      user,
      loading,
      isAdmin: Boolean(user?.is_admin),

      login: async (email, password) => {
        const res = await api.post('/auth/login', { email, password })
        const accessToken = res?.data?.access_token
        const nextUser = res?.data?.user

        if (!accessToken) throw new Error('Login response missing access_token')

        try {
          localStorage.setItem('token', accessToken)
        } catch {
          // ignore
        }

        setToken(accessToken)
        setUser(nextUser)
        toast.success('Logged in')
        return res
      },

      signup: async (name, email, password) => {
        const res = await api.post('/auth/signup', { name, email, password })
        toast.success('Account created')

        // Auto-login for better UX
        const loginRes = await api.post('/auth/login', { email, password })
        const accessToken = loginRes?.data?.access_token
        const nextUser = loginRes?.data?.user

        if (!accessToken) throw new Error('Signup auto-login missing access_token')

        try {
          localStorage.setItem('token', accessToken)
        } catch {
          // ignore
        }

        setToken(accessToken)
        setUser(nextUser)
        return res
      },

      logout: () => {
        try {
          localStorage.removeItem('token')
        } catch {
          // ignore
        }
        setToken(null)
        setUser(null)
        toast.success('Logged out')
      },
    }
  }, [token, user, loading])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

