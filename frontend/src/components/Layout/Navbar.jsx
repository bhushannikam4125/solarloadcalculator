import React from 'react'
import { FiMoon, FiSun } from 'react-icons/fi'
import { useAuth } from '../../context/AuthContext.jsx'

export default function Navbar({ onToggleTheme }) {
  const { user, logout } = useAuth()

  return (
    <header className="flex items-center justify-between px-4 md:px-6 py-4 border-b border-slate-200/60 dark:border-slate-700/60 bg-white/60 dark:bg-slate-900/50 backdrop-blur sticky top-0 z-10">
      <div>
        <div className="text-sm text-slate-500 dark:text-slate-300">Welcome back</div>
        <div className="text-lg font-semibold">{user?.name || 'User'}</div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={onToggleTheme}
          className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800/60 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
          aria-label="Toggle dark mode"
        >
          {/* Icon changes via CSS theme */}
          <span className="text-emerald-500">🌓</span>
        </button>
        <button
          onClick={logout}
          className="px-3 py-2 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 transition text-sm"
        >
          Logout
        </button>
      </div>
    </header>
  )
}

