// solar-load-calculator/frontend/src/components/common/StatCard.jsx
import React from 'react'

export default function StatCard({ title, value, icon: Icon, subtitle }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">{title}</p>
          <div className="mt-1 flex items-baseline gap-2">
            <p className="text-2xl font-semibold">{value}</p>
          </div>
          {subtitle ? <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{subtitle}</p> : null}
        </div>
        {Icon ? (
          <div className="rounded-lg bg-slate-100 p-2 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
            <Icon size={20} />
          </div>
        ) : null}
      </div>
    </div>
  )
}

