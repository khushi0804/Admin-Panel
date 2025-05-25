import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import { useTranslation } from 'react-i18next'


const Layout = ({ children }) => {
    const { t } = useTranslation() // Add this

return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <h2 className="text-2xl font-semibold mb-4">{t('pageTitle')}</h2> {/* example */}
          {children}
        </main>
      </div>
    </div>
  )
}

export default Layout
