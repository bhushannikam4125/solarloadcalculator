// solar-load-calculator/frontend/src/components/Layout/Navbar.jsx
import React from 'react'
import { FiMoon, FiSun } from 'react-icons/fi'
import { useAuth } from '../../context/AuthContext.jsx'

export default function Navbar({ onToggleTheme }) {
  const { user, logout, isAdmin } = useAuth()

  return (
    <header className="flex items-center justify-between gap-4 border-b border-slate-200 bg-white px-6 py-4 dark:border-slate-800 dark:bg-slate-950">
      <div>
        <div className="text-lg font-semibold">Solar Load Calculator</div>
        <div className="text-xs text-slate-500 dark:text-slate-400">{isAdmin ? 'Admin' : 'User'} Dashboard</div>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onToggleTheme}
          className="rounded-lg border border-slate-200 bg-white p-2 text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
          aria-label="Toggle theme"
        >
          {/* icon swaps via CSS based on dark mode */}
          <span className="hidden dark:inline-flex">
            <FiSun size={18} />
          </span>
          <span className="inline-flex dark:hidden">
            <FiMoon size={18} />
          </span>
        </button>

        {user ? (
          <button
            type="button"
            onClick={logout}
            className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-800"
          >
            Logout
          </button>
        ) : null}
      </div>
    </header>
  )
}

