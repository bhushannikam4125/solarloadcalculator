import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext.jsx'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    if (!email || !password) {
      toast.error('Email and password are required')
      return
    }

    setLoading(true)
    try {
      await login(email, password)
      navigate('/dashboard')
    } catch (err) {
      toast.error(err?.response?.data?.detail || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl bg-white/70 dark:bg-slate-800/50 backdrop-blur shadow-sm ring-1 ring-slate-200/60 dark:ring-slate-700/60 p-6"
      >
        <div className="text-2xl font-bold text-emerald-600">Login</div>
        <div className="text-sm text-slate-500 dark:text-slate-300 mt-1">Access your solar load calculator history</div>

        <form className="mt-6" onSubmit={submit}>
          <label className="block text-sm font-medium">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-xl border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2"
            placeholder="you@example.com"
            type="email"
            required
          />

          <label className="block text-sm font-medium mt-4">Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full rounded-xl border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2"
            placeholder="••••••••"
            type="password"
            required
          />

          <button
            disabled={loading}
            className="mt-6 w-full rounded-xl bg-emerald-500 hover:bg-emerald-600 disabled:opacity-60 text-white py-2 font-semibold transition"
            type="submit"
          >
            {loading ? 'Logging in…' : 'Login'}
          </button>

          <div className="mt-4 text-sm text-slate-600 dark:text-slate-300">
            New here?{' '}
            <Link to="/auth/signup" className="text-emerald-600 hover:underline">
              Create an account
            </Link>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

