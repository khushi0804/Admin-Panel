import React from 'react'

const Dashboard = () => {
  const stats = [
    { title: 'Total Users', value: '1,234', change: '+12%', changeType: 'positive' },
    { title: 'Active Students', value: '856', change: '+8%', changeType: 'positive' },
    { title: 'Organizations', value: '23', change: '+2%', changeType: 'positive' },
    { title: 'System Health', value: '98%', change: '-1%', changeType: 'negative' }
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <div className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleString()}
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
            <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {[
                { user: 'John Doe', action: 'Created new organization', time: '2 hours ago' },
                { user: 'Jane Smith', action: 'Updated user permissions', time: '4 hours ago' },
                { user: 'Bob Johnson', action: 'Added new student', time: '6 hours ago' },
                { user: 'Alice Brown', action: 'Modified system settings', time: '8 hours ago' }
              ].map((activity, index) => (
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

        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">System Status</h3>
            <div className="space-y-4">
              {[
                { service: 'Database', status: 'Online', statusColor: 'text-green-600' },
                { service: 'API Gateway', status: 'Online', statusColor: 'text-green-600' },
                { service: 'Authentication', status: 'Online', statusColor: 'text-green-600' },
                { service: 'File Storage', status: 'Warning', statusColor: 'text-yellow-600' }
              ].map((item, index) => (
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