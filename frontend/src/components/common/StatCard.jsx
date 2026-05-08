import React from 'react'

export default function StatCard({ title, value, icon: Icon }) {
  return (
    <div className="rounded-xl bg-white/70 dark:bg-slate-800/60 p-4 shadow-sm ring-1 ring-slate-200/60 dark:ring-slate-700/60">
      <div className="flex items-start gap-3">
        {Icon ? (
          <div className="text-emerald-500">
            <Icon size={22} />
          </div>
        ) : null}
        <div className="min-w-0">
          <div className="text-sm text-slate-500 dark:text-slate-300">{title}</div>
          <div className="mt-1 text-xl font-semibold">{value}</div>
        </div>
      </div>
    </div>
  )
}

