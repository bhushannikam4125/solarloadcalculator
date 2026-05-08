import React from 'react'
import { NavLink } from 'react-router-dom'
import { FiHome, FiUpload, FiClock, FiShield, FiMoon, FiSun } from 'react-icons/fi'
import { useAuth } from '../../context/AuthContext.jsx'

export default function Sidebar({ onToggleTheme }) {
  const { isAdmin } = useAuth()

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
      isActive
        ? 'bg-emerald-500 text-white'
        : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/50'
    }`

  return (
    <aside className="hidden md:flex md:flex-col w-64 bg-white/80 dark:bg-slate-900/70 backdrop-blur border-r border-slate-200/60 dark:border-slate-700/60">
      <div className="p-5">
        <div className="text-lg font-bold text-emerald-600">Solar Load Calculator</div>
        <div className="text-xs text-slate-500 dark:text-slate-300">Excel automation</div>
      </div>

      <nav className="flex-1 px-3 pb-4">
        <NavLink to="/dashboard" className={linkClass} end>
          <FiHome /> Dashboard
        </NavLink>
        <NavLink to="/upload" className={linkClass}>
          <FiUpload /> Upload
        </NavLink>
        <NavLink to="/history" className={linkClass}>
          <FiClock /> History
        </NavLink>
        {isAdmin ? (
          <NavLink to="/admin" className={linkClass}>
            <FiShield /> Admin
          </NavLink>
        ) : null}
      </nav>

      <div className="p-3">
        <button
          onClick={onToggleTheme}
          className="w-full flex items-center justify-center gap-2 rounded-lg bg-slate-100 dark:bg-slate-800/60 hover:bg-slate-200 dark:hover:bg-slate-700 transition px-3 py-2 text-slate-700 dark:text-slate-200"
        >
          <span className="hidden sm:inline">Theme</span>
          <span className="text-emerald-500">⚙</span>
        </button>
      </div>
    </aside>
  )
}

