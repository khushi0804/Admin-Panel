import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Sidebar = () => {
  const location = useLocation()

  const menuItems = [
    {
      title: 'Dashboard',
      path: '/dashboard',
      icon: '📊'
    },
    {
      title: 'Organization',
      icon: '🏢',
      subItems: [
        { title: 'Organizations', path: '/organization/organizations' },
        { title: 'Groups', path: '/organization/groups' },
        { title: 'Departments', path: '/organization/departments' },
        { title: 'Roles', path: '/organization/roles' },
         { title: 'Weather', path: '/organization/weather' }
      ]
    },
    {
      title: 'Users',
      icon: '👥',
      subItems: [
        { title: 'Users', path: '/users' },
        { title: 'User Listing', path: '/users/listing' }
      ]
    },
    {
      title: 'Students',
      icon: '🎓',
      subItems: [
        { title: 'Students', path: '/students' },
        { title: 'Student Listing', path: '/students/listing' }
      ]
    },
    {
      title: 'Settings',
      icon: '⚙️',
      subItems: [
        { title: 'Device Health', path: '/settings/device-health' },
        { title: 'Theme Settings', path: '/settings/theme' },
        { title: 'Timezone Settings', path: '/settings/timezone' }
      ]
    }
  ]

  const isActive = (path) => location.pathname === path

  return (
    <aside className="w-64 bg-white shadow-sm min-h-screen">
      <div className="p-4">
        <nav className="space-y-2">
          {menuItems.map((item, index) => (
            <div key={index}>
              {item.path ? (
                <Link
                  to={item.path}
                  className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                    isActive(item.path)
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.title}
                </Link>
              ) : (
                <div>
                  <div className="flex items-center px-4 py-2 text-sm font-medium text-gray-900">
                    <span className="mr-3">{item.icon}</span>
                    {item.title}
                  </div>
                  {item.subItems && (
                    <div className="ml-6 space-y-1">
                      {item.subItems.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          to={subItem.path}
                          className={`block px-4 py-2 text-sm rounded-md ${
                            isActive(subItem.path)
                              ? 'bg-indigo-100 text-indigo-700'
                              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
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