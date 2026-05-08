// solar-load-calculator/frontend/src/components/Layout/Layout.jsx
import React, { useMemo, useState } from 'react'
import Sidebar from './Sidebar.jsx'
import Navbar from './Navbar.jsx'

export default function Layout({ children }) {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme')
    return saved === 'dark' ? 'dark' : 'light'
  })

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    localStorage.setItem('theme', next)
    document.documentElement.classList.toggle('dark', next === 'dark')
  }

  const contentClass = useMemo(() => {
    return 'min-h-screen bg-slate-50 dark:bg-slate-950'
  }, [])

  return (
    <div className={contentClass}>
      <div className="flex">
        <Sidebar />

        <div className="flex min-w-0 flex-1 flex-col">
          <Navbar onToggleTheme={toggleTheme} />
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </div>
  )
}

