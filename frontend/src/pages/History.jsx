import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import api, { downloadExcel } from '../services/api.js'

import LoadingSpinner from '../components/common/LoadingSpinner.jsx'
import toast from 'react-hot-toast'

export default function History() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const run = async () => {
      try {
        const res = await api.get('/history')
        setItems(res.data.items || [])
      } catch (err) {
        toast.error(err?.response?.data?.detail || 'Failed to load history')
      } finally {
        setLoading(false)
      }
    }
    run()
  }, [])

  if (loading) return <LoadingSpinner />

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div>
        <h1 className="text-2xl font-bold">History</h1>
        <p className="text-sm text-slate-500 dark:text-slate-300">Past bill extractions and downloads</p>
      </div>

      <div className="mt-6 rounded-2xl bg-white/70 dark:bg-slate-800/50 backdrop-blur shadow-sm ring-1 ring-slate-200/60 dark:ring-slate-700/60 overflow-hidden">
        <div className="p-4 border-b border-slate-200/60 dark:border-slate-700/60">
          <div className="font-semibold">Bills</div>
        </div>
        <div className="p-4 overflow-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-slate-500 dark:text-slate-300">
              <tr>
                <th className="py-2">Consumer</th>
                <th className="py-2">Units</th>
                <th className="py-2">Amount</th>
                <th className="py-2">Confidence</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/60 dark:divide-slate-700/60">
              {items.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-6 text-center text-slate-500 dark:text-slate-300">
                    No bills found.
                  </td>
                </tr>
              ) : (
                items.map((b) => (
                  <tr key={b.id}>
                    <td className="py-3">{b.extracted_data?.consumer_name || b.original_filename}</td>
                    <td className="py-3">{b.extracted_data?.units_consumed ?? '-'}</td>
                    <td className="py-3">₹{b.extracted_data?.bill_amount ?? '-'}</td>
                    <td className="py-3">{Math.round((b.confidence_score ?? 0) * 100)}%</td>
                    <td className="py-3">
                      <div className="flex flex-wrap gap-2">
                        <a
                          href={`/bills/${b.id}`}
                          className="px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800/60 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
                        >
                          View
                        </a>
                        <button
                          type="button"
                          onClick={() => downloadExcel(b.id)}
                          className="px-3 py-2 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 transition inline-flex items-center"
                        >
                          Download
                        </button>

                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  )
}

