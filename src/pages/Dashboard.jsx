import React from 'react'
import { useTranslation } from 'react-i18next'

const Dashboard = () => {
  const { t } = useTranslation()

  const stats = [
    { title: t('totalUsers'), value: '1,234', change: '+12%', changeType: 'positive' },
    { title: t('activeStudents'), value: '856', change: '+8%', changeType: 'positive' },
    { title: t('organizations'), value: '23', change: '+2%', changeType: 'positive' },
    { title: t('systemHealth'), value: '98%', change: '-1%', changeType: 'negative' }
  ]

  const recentActivities = [
    { user: 'John Doe', action: t('createdNewOrganization'), time: t('2HoursAgo') },
    { user: 'Jane Smith', action: t('updatedUserPermissions'), time: t('4HoursAgo') },
    { user: 'Bob Johnson', action: t('addedNewStudent'), time: t('6HoursAgo') },
    { user: 'Alice Brown', action: t('modifiedSystemSettings'), time: t('8HoursAgo') }
  ]

  const systemStatus = [
    { service: t('database'), status: t('online'), statusColor: 'text-green-600' },
    { service: t('apiGateway'), status: t('online'), statusColor: 'text-green-600' },
    { service: t('authentication'), status: t('online'), statusColor: 'text-green-600' },
    { service: t('fileStorage'), status: t('warning'), statusColor: 'text-yellow-600' }
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">{t('dashboard')}</h1>
        <div className="text-sm text-gray-500">
          {t('lastUpdated')}: {new Date().toLocaleString()}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`text-sm font-medium ${
                stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">{t('recentActivity')}</h3>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex justify-between items-center py-2">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{activity.user}</p>
                    <p className="text-sm text-gray-600">{activity.action}</p>
                  </div>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* System Status */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">{t('systemStatus')}</h3>
            <div className="space-y-4">
              {systemStatus.map((item, index) => (
                <div key={index} className="flex justify-between items-center py-2">
                  <span className="text-sm font-medium text-gray-900">{item.service}</span>
                  <span className={`text-sm font-medium ${item.statusColor}`}>{item.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
