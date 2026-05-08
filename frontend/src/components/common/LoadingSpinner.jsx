import React from 'react'
import { motion } from 'framer-motion'

export default function LoadingSpinner({ label = 'Loading...' }) {
  return (
    <div className="flex items-center justify-center py-10">
      <motion.div
        className="h-10 w-10 rounded-full border-4 border-emerald-500/30 border-t-emerald-500"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
        aria-label={label}
      />
    </div>
  )
}

