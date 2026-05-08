// solar-load-calculator/frontend/src/pages/Signup.jsx
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

import { useAuth } from '../context/AuthContext.jsx'

export default function Signup() {
  const navigate = useNavigate()
  const { signup } = useAuth()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()
    if (submitting) return

    try {
      setSubmitting(true)
      await signup(name, email, password)
      navigate('/dashboard', { replace: true })
    } catch (err) {
      toast.error(err?.response?.data?.detail || err?.message || 'Signup failed')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md items-center">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
      >
        <h1 className="text-xl font-semibold">Create account</h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
          Your account is used to store extracted bill data.
        </p>

        <form className="mt-5 space-y-4" onSubmit={onSubmit}>
          <div>
            <label className="text-sm font-medium">Name</label>
            <input
              className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-slate-400 dark:border-slate-800 dark:bg-slate-950"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-slate-400 dark:border-slate-800 dark:bg-slate-950"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              autoComplete="email"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium">Password</label>
            <input
              className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-slate-400 dark:border-slate-800 dark:bg-slate-950"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              autoComplete="new-password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-60"
          >
            {submitting ? 'Creating...' : 'Create account'}
          </button>

          <div className="text-center text-sm text-slate-600 dark:text-slate-300">
            Already have an account?{' '}
            <Link className="font-medium text-slate-900 hover:underline dark:text-slate-100" to="/auth/login">
              Login
            </Link>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

