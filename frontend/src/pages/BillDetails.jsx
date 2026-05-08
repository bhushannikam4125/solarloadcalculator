import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import api, { downloadExcel } from '../services/api.js'

import LoadingSpinner from '../components/common/LoadingSpinner.jsx'
import toast from 'react-hot-toast'

function formatDate(d) {
  return d || '-' 
}

export default function BillDetails() {
  const { billId } = useParams()
  const [bill, setBill] = useState(null)
  const [loading, setLoading] = useState(true)
  const [busy, setBusy] = useState(false)

  const fetchBill = async () => {
    try {
      setLoading(true)
      const res = await api.get(`/history/${billId}`)
      setBill(res.data)
    } catch {
      // If history endpoint isn't implemented for single bill, fall back to extraction endpoint response
      try {
        const res = await api.post(`/extract/${billId}`)
        setBill(res.data)
      } catch (err) {
        toast.error(err?.response?.data?.detail || 'Failed to fetch bill')
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBill()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [billId])

  const reRunExtraction = async () => {
    setBusy(true)
    try {
      const res = await api.post(`/extract/${billId}`)
      setBill(res.data)
      toast.success('Extraction re-run')
    } catch (err) {
      toast.error(err?.response?.data?.detail || 'Re-extraction failed')
    } finally {
      setBusy(false)
    }
  }

  const downloadExcelAction = () => {
    downloadExcel(billId)
  }



  if (loading) return <LoadingSpinner />

  const extracted = bill?.extracted_data || {}

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Bill Details</h1>
          <p className="text-sm text-slate-500 dark:text-slate-300">AI extracted data and excel output</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={reRunExtraction}
            disabled={busy}
            className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800/60 hover:bg-slate-200 dark:hover:bg-slate-700 transition text-sm"
          >
            {busy ? 'Re-extracting…' : 'Re-run extraction'}
          </button>
          <button
            onClick={downloadExcelAction}

            className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white transition text-sm"
          >
            Download Excel
          </button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 rounded-2xl bg-white/70 dark:bg-slate-800/50 backdrop-blur shadow-sm ring-1 ring-slate-200/60 dark:ring-slate-700/60 p-4">
          <div className="font-semibold mb-3">Extracted Fields</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            {[
              ['Consumer Number', extracted.consumer_number],
              ['Consumer Name', extracted.consumer_name],
              ['Address', extracted.address],
              ['Billing From', extracted.billing_period?.from],
              ['Billing To', extracted.billing_period?.to],
              ['Units Consumed', extracted.units_consumed],
              ['Tariff', extracted.tariff],
              ['Sanctioned Load (kW)', extracted.sanctioned_load_kw],
              ['Meter Number', extracted.meter_number],
              ['Bill Amount', extracted.bill_amount],
              ['Due Date', extracted.due_date],
            ].map(([k, v]) => (
              <div key={k} className="rounded-xl bg-slate-50/60 dark:bg-slate-900/40 p-3">
                <div className="text-slate-500 dark:text-slate-300 text-xs">{k}</div>
                <div className="font-semibold mt-1 break-words">{v ?? '-'}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-white/70 dark:bg-slate-800/50 backdrop-blur shadow-sm ring-1 ring-slate-200/60 dark:ring-slate-700/60 p-4">
          <div className="font-semibold">Confidence</div>
          <div className="mt-3 text-4xl font-bold text-emerald-600">{Math.round((bill?.confidence_score ?? 0) * 100)}%</div>
          <div className="text-sm text-slate-600 dark:text-slate-300 mt-1">
            Confidence score based on missing/uncertain fields.
          </div>

          <div className="mt-4 rounded-xl bg-slate-50/60 dark:bg-slate-900/40 p-3 text-sm">
            <div className="text-slate-500 dark:text-slate-300">Original filename</div>
            <div className="font-semibold break-words mt-1">{bill?.original_filename || '-'}</div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

