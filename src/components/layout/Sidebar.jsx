import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'  // import useTranslation

const Sidebar = () => {
  const { t } = useTranslation()   // get t function for translation
  const location = useLocation()

  const menuItems = [
    {
      title: t('dashboard'),  // use keys from your translation JSON files
      path: '/dashboard',
      icon: '📊'
    },
    {
      title: t('organization'),
      icon: '🏢',
      subItems: [
        { title: t('organizations'), path: '/organization/organizations' },
        { title: t('groups'), path: '/organization/groups' },
        { title: t('departments'), path: '/organization/departments' },
        { title: t('roles'), path: '/organization/roles' },
        { title: t('weather'), path: '/organization/weather' }
      ]
    },
    {
      title: t('users'),
      icon: '👥',
      subItems: [
        { title: t('users'), path: '/users' },
        { title: t('userListing'), path: '/users/listing' }
      ]
    },
    {
      title: t('students'),
      icon: '🎓',
      subItems: [
        { title: t('students'), path: '/students' },
        { title: t('studentListing'), path: '/students/listing' }
      ]
    },
    {
      title: t('settings'),
      icon: '⚙️',
      subItems: [
        { title: t('deviceHealth'), path: '/settings/device-health' },
        { title: t('themeSettings'), path: '/settings/theme' },
        { title: t('timezoneSettings'), path: '/settings/timezone' }
      ]
    }
  ]

  const isActive = (path) => location.pathname === path

  return (
    <aside className="w-64 bg-white dark:bg-gray-900 shadow-sm min-h-screen transition-colors duration-300">
      <div className="p-4">
        <nav className="space-y-2">
          {menuItems.map((item, index) => (
            <div key={index}>
              {item.path ? (
                <Link
                  to={item.path}
                  className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                    isActive(item.path)
                      ? 'bg-indigo-100 dark:bg-indigo-700 text-indigo-700 dark:text-indigo-100'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.title}
                </Link>
              ) : (
                <div>
                  <div className="flex items-center px-4 py-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                    <span className="mr-3">{item.icon}</span>
                    {item.title}
                  </div>
                  {item.subItems && (
                    <div className="ml-6 space-y-1">
                      {item.subItems.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          to={subItem.path}
                          className={`block px-4 py-2 text-sm rounded-md transition-colors duration-200 ${
                            isActive(subItem.path)
                              ? 'bg-indigo-100 dark:bg-indigo-700 text-indigo-700 dark:text-indigo-100'
                              : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                          }`}
                        >
                          {subItem.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </aside>
  )
}

export default Sidebar
