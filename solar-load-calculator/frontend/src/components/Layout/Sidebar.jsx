// solar-load-calculator/frontend/src/components/Layout/Sidebar.jsx
import React from 'react'
import { NavLink } from 'react-router-dom'
import { FiHome, FiUpload, FiClock, FiUser } from 'react-icons/fi'
import { useAuth } from '../../context/AuthContext.jsx'

export default function Sidebar() {
  const { isAdmin } = useAuth()

  const linkClasses =
    'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-slate-100 dark:hover:bg-slate-800'

  return (
    <aside className="hidden w-64 flex-col border-r border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950 md:flex">
      <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Menu</div>

      <nav className="mt-4 flex flex-col gap-1">
        <NavLink
          to="/dashboard"
          className={({ isActive }) => `${linkClasses} ${isActive ? 'bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-white' : ''}`}
        >
          <FiHome size={18} /> Dashboard
        </NavLink>

        <NavLink
          to="/upload"
          className={({ isActive }) => `${linkClasses} ${isActive ? 'bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-white' : ''}`}
        >
          <FiUpload size={18} /> Upload
        </NavLink>

        <NavLink
          to="/history"
          className={({ isActive }) => `${linkClasses} ${isActive ? 'bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-white' : ''}`}
        >
          <FiClock size={18} /> History
        </NavLink>

        {isAdmin ? (
          <NavLink
            to="/admin"
            className={({ isActive }) => `${linkClasses} ${isActive ? 'bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-white' : ''}`}
          >
            <FiUser size={18} /> Admin
          </NavLink>
        ) : null}
      </nav>
    </aside>
  )
}

