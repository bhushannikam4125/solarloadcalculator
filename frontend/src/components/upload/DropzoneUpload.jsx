import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { motion } from 'framer-motion'
import { FiUpload } from 'react-icons/fi'
import toast from 'react-hot-toast'

/**
 * Drag-and-drop upload component.
 * Validates file size/type client-side, server will re-validate too.
 */
export default function DropzoneUpload({ onUpload }) {
  const onDrop = useCallback(
    async (acceptedFiles) => {
      if (!acceptedFiles?.length) return
      const file = acceptedFiles[0]

      // Client-side guard (server also validates)
      const allowed = ['application/pdf', 'image/jpeg', 'image/png']
      const byMime = allowed.includes(file.type)
      const byExt = file.name.toLowerCase().match(/\.(pdf|png|jpe?g)$/)

      if (!byMime && !byExt) {
        toast.error('Unsupported file type')
        return
      }

      if (file.size > 10 * 1024 * 1024) {
        toast.error('File too large (max 10MB)')
        return
      }

      await onUpload(file)
    },
    [onUpload],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      'application/pdf': ['.pdf'],
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg'],
    },
    maxSize: 10 * 1024 * 1024,
  })

  return (
    <div {...getRootProps()} className="cursor-pointer" aria-label="Upload electricity bill">
      <input {...getInputProps()} />

      <motion.div
        whileHover={{ scale: 1.01 }}
        className={`rounded-2xl border-2 border-dashed p-8 text-center transition shadow-sm ${
          isDragActive
            ? 'border-emerald-500 bg-emerald-500/5'
            : 'border-slate-200 dark:border-slate-700 bg-white/60 dark:bg-slate-800/30'
        }`}
      >
        <div className="mx-auto w-14 h-14 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
          <FiUpload size={28} />
        </div>
        <div className="mt-4 font-semibold">Drag & drop your bill</div>
        <div className="text-sm text-slate-500 dark:text-slate-300 mt-1">PDF / JPG / PNG (max 10MB)</div>
      </motion.div>
    </div>
  )
}

