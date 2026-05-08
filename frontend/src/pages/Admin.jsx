import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import api from '../services/api.js'
import LoadingSpinner from '../components/common/LoadingSpinner.jsx'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext.jsx'

export default function Admin() {
  const { isAdmin } = useAuth()
  const [users, setUsers] = useState([])
  const [bills, setBills] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const run = async () => {
      if (!isAdmin) {
        setLoading(false)
        return
      }
      try {
        const [u, b] = await Promise.all([api.get('/admin/users'), api.get('/admin/bills')])
        setUsers(u.data.items || u.data || [])
        setBills(b.data.items || b.data || [])
      } catch (err) {
        toast.error(err?.response?.data?.detail || 'Failed to load admin data')
      } finally {
        setLoading(false)
      }
    }
    run()
  }, [isAdmin])

  if (loading) return <LoadingSpinner />
  if (!isAdmin) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="rounded-2xl bg-white/70 dark:bg-slate-800/50 p-6 ring-1 ring-slate-200/60 dark:ring-slate-700/60">
          <div className="text-xl font-bold text-emerald-600">Admin access required</div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h1 className="text-2xl font-bold">Admin</h1>
      <p className="text-sm text-slate-500 dark:text-slate-300">Manage users and view all bills</p>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-2xl bg-white/70 dark:bg-slate-800/50 ring-1 ring-slate-200/60 dark:ring-slate-700/60 p-4 overflow-hidden">
          <div className="font-semibold mb-3">Users</div>
          <div className="overflow-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-slate-500 dark:text-slate-300">
                <tr>
                  <th className="py-2">Name</th>
                  <th className="py-2">Email</th>
                  <th className="py-2">Admin</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/60 dark:divide-slate-700/60">
                {users.map((u) => (
                  <tr key={u.id}>
                    <td className="py-3">{u.name}</td>
                    <td className="py-3">{u.email}</td>
                    <td className="py-3">{u.is_admin ? 'Yes' : 'No'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-2xl bg-white/70 dark:bg-slate-800/50 ring-1 ring-slate-200/60 dark:ring-slate-700/60 p-4 overflow-hidden">
          <div className="font-semibold mb-3">All Bills</div>
          <div className="overflow-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-slate-500 dark:text-slate-300">
                <tr>
                  <th className="py-2">Consumer</th>
                  <th className="py-2">User</th>
                  <th className="py-2">Confidence</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/60 dark:divide-slate-700/60">
                {bills.map((b) => (
                  <tr key={b.id}>
                    <td className="py-3">{b.extracted_data?.consumer_name || b.original_filename}</td>
                    <td className="py-3">{b.user?.email || '-'}</td>
                    <td className="py-3">{Math.round((b.confidence_score ?? 0) * 100)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

