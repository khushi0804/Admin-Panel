import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useTranslation } from 'react-i18next';

const Navbar = ({ toggleSidebar }) => {
  const { user, logout } = useAuth();
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Left: Hamburger + Title */}
          <div className="flex items-center space-x-4">
            {/* Hamburger button only on small screens */}
            <button
              onClick={toggleSidebar}
              className="md:hidden p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-label="Toggle sidebar"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
              {t('adminPanel')}
            </h1>
          </div>

          {/* Right: Welcome, Language, Logout */}
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-700 dark:text-gray-200">
              {t('welcome')}, {user?.name || t('user')}
            </span>

            <select
              onChange={(e) => changeLanguage(e.target.value)}
              className="text-sm px-2 py-1 border rounded-md dark:bg-gray-800 dark:text-white"
              defaultValue={i18n.language}
            >
              <option value="en">English</option>
              <option value="hi">हिंदी</option>
            </select>

            <button
              onClick={logout}
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-sm font-medium"
            >
              {t('logout')}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
