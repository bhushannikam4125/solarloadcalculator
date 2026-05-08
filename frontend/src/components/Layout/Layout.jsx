import React, { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import Sidebar from './Sidebar.jsx'
import Navbar from './Navbar.jsx'
import { FiMenu } from 'react-icons/fi'

export default function Layout() {
  const location = useLocation()
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('theme')
    const shouldDark = stored ? stored === 'dark' : window.matchMedia?.('(prefers-color-scheme: dark)')?.matches
    setIsDark(Boolean(shouldDark))
    if (shouldDark) document.documentElement.classList.add('dark')
    else document.documentElement.classList.remove('dark')
  }, [])

  const onToggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev
      localStorage.setItem('theme', next ? 'dark' : 'light')
      if (next) document.documentElement.classList.add('dark')
      else document.documentElement.classList.remove('dark')
      return next
    })
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto flex">
        <Sidebar onToggleTheme={onToggleTheme} />

        <div className="flex-1">
          <Navbar onToggleTheme={onToggleTheme} />

          <motion.main
            key={location.pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="p-4 md:p-6"
          >
            <Outlet />
          </motion.main>
        </div>
      </div>
    </div>
  )
}

