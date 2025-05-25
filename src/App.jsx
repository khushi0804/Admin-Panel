import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Dashboard from './pages/Dashboard'
import Organizations from './pages/organization/Organizations'
import Groups from './pages/organization/Groups'
import Departments from './pages/organization/Departments'
import Roles from './pages/organization/Roles'
import Users from './pages/user/Users'
import UserListing from './pages/user/UserListing'
import Students from './pages/student/Students'
import StudentListing from './pages/student/StudentListing'
import DeviceHealth from './pages/settings/DeviceHealth'
import ThemeSettings from './pages/settings/ThemeSettings'
import TimeZoneSettings from './pages/settings/TimeZoneSettings'
import { useAuth } from './contexts/AuthContext'
import { ThemeProvider, useTheme } from './contexts/ThemeContext'
import WeatherWidget from './components/weather/WeatherWidget'

function App() {
  const { isAuthenticated, login } = useAuth()

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Admin Panel
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Please sign in to continue
            </p>
          </div>
          <div className="mt-8 space-y-6">
            <button
              onClick={login}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign In (Demo)
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <ThemeProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />

            {/* Organization Routes */}
            <Route path="/organization/organizations" element={<Organizations />} />
            <Route path="/organization/groups" element={<Groups />} />
            <Route path="/organization/departments" element={<Departments />} />
            <Route path="/organization/roles" element={<Roles />} />
            <Route path="/organization/weather" element={<WeatherWidget />} />


            {/* User Routes */}
            <Route path="/users" element={<Users />} />
            <Route path="/users/listing" element={<UserListing />} />

            {/* Student Routes */}
            <Route path="/students" element={<Students />} />
            <Route path="/students/listing" element={<StudentListing />} />

            {/* Settings Routes */}
            <Route path="/settings/device-health" element={<DeviceHealth />} />
            <Route path="/settings/theme" element={<ThemeSettings />} />
            <Route path="/settings/timezone" element={<TimeZoneSettings />} />

            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  )
}

export default App
