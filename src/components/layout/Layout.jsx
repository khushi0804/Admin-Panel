import React, { useState } from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import { useTranslation } from 'react-i18next'

const Layout = ({ children }) => {
  const { t } = useTranslation()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors duration-300 flex flex-col">
      <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-30 w-64 bg-white dark:bg-gray-900 shadow-sm min-h-screen transform transition-transform duration-300 ease-in-out
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            md:translate-x-0 md:static md:inset-auto`}
        >
          <Sidebar closeSidebar={() => setSidebarOpen(false)} />
        </aside>

        {/* Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-25 z-20 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 mt-3 px-2 overflow-auto md:ml-[1%] md:mt-[1%] md:px-2">
          {/* Padding should go *inside* your page component like Dashboard */}
          {children}
        </main>
      </div>
    </div>
  )
}

export default Layout
