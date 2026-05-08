import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext.jsx'

export default function Signup() {
  const { signup } = useAuth()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    if (!name || !email || !password) {
      toast.error('All fields are required')
      return
    }
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters')
      return
    }

    setLoading(true)
    try {
      await signup(name, email, password)
      navigate('/dashboard')
    } catch (err) {
      toast.error(err?.response?.data?.detail || 'Signup failed')
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
        <div className="text-2xl font-bold text-emerald-600">Create account</div>
        <div className="text-sm text-slate-500 dark:text-slate-300 mt-1">Get instant solar sizing from your electricity bill</div>

        <form className="mt-6" onSubmit={submit}>
          <label className="block text-sm font-medium">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full rounded-xl border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2"
            placeholder="Your name"
            required
          />

          <label className="block text-sm font-medium mt-4">Email</label>
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
            placeholder="At least 6 characters"
            type="password"
            required
          />

          <button
            disabled={loading}
            className="mt-6 w-full rounded-xl bg-emerald-500 hover:bg-emerald-600 disabled:opacity-60 text-white py-2 font-semibold transition"
            type="submit"
          >
            {loading ? 'Creating…' : 'Sign up'}
          </button>

          <div className="mt-4 text-sm text-slate-600 dark:text-slate-300">
            Already have an account?{' '}
            <Link to="/auth/login" className="text-emerald-600 hover:underline">
              Login
            </Link>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

