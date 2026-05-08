import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import api from '../services/api.js'
import DropzoneUpload from '../components/upload/DropzoneUpload.jsx'
import LoadingSpinner from '../components/common/LoadingSpinner.jsx'

export default function Upload() {
  const navigate = useNavigate()
  const [uploading, setUploading] = useState(false)

  const handleUpload = async (file) => {
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)

      const res = await api.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      toast.success('Extraction complete')
      navigate(`/bills/${res.data.bill_id}`)
    } catch (err) {
      toast.error(err?.response?.data?.detail || 'Upload/extraction failed')
    } finally {
      setUploading(false)
    }
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Upload Bill</h1>
          <p className="text-sm text-slate-500 dark:text-slate-300">PDF or image → Excel automation</p>
        </div>
      </div>

      <div className="mt-6">
        <DropzoneUpload onUpload={handleUpload} />
      </div>

      {uploading ? <LoadingSpinner label="Extracting & generating Excel…" /> : null}

      <div className="mt-6 text-sm text-slate-600 dark:text-slate-300">
        Processing happens securely on the server. Your Excel template formulas will be preserved.
      </div>
    </motion.div>
  )
}

