import React, { useState, useEffect } from 'react'
import { useTheme } from '../../contexts/ThemeContext'
import { DEVICE_STATUS } from '../../utils/constants'
import { formatDate, getRelativeTime } from '../../utils/helpers'

const DeviceHealth = () => {
  const themeContext = useTheme()

  // Add error handling for theme context
  if (!themeContext) {
    throw new Error('DeviceHealth must be used within a ThemeProvider')
  }

  const { isDark } = themeContext
  const [devices, setDevices] = useState([])
  const [selectedDevice, setSelectedDevice] = useState(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  // Mock device data
  useEffect(() => {
    const mockDevices = [
      {
        id: 1,
        name: 'Server-01',
        type: 'Server',
        status: DEVICE_STATUS.ONLINE,
        cpu: 45,
        memory: 67,
        disk: 23,
        network: 89,
        uptime: '15 days 6 hours',
        lastUpdate: new Date(Date.now() - 5 * 60 * 1000),
        location: 'Data Center A',
        ip: '192.168.1.10'
      },
      {
        id: 2,
        name: 'Database-01',
        type: 'Database',
        status: DEVICE_STATUS.WARNING,
        cpu: 78,
        memory: 92,
        disk: 67,
        network: 45,
        uptime: '8 days 12 hours',
        lastUpdate: new Date(Date.now() - 2 * 60 * 1000),
        location: 'Data Center A',
        ip: '192.168.1.20'
      },
      {
        id: 3,
        name: 'Router-Main',
        type: 'Network',
        status: DEVICE_STATUS.ONLINE,
        cpu: 12,
        memory: 34,
        disk: 8,
        network: 78,
        uptime: '45 days 3 hours',
        lastUpdate: new Date(Date.now() - 1 * 60 * 1000),
        location: 'Network Room',
        ip: '192.168.1.1'
      },
      {
        id: 4,
        name: 'Firewall-01',
        type: 'Security',
        status: DEVICE_STATUS.ERROR,
        cpu: 95,
        memory: 89,
        disk: 45,
        network: 12,
        uptime: '2 days 1 hour',
        lastUpdate: new Date(Date.now() - 30 * 60 * 1000),
        location: 'Security Zone',
        ip: '192.168.1.5'
      },
      {
        id: 5,
        name: 'Backup-Server',
        type: 'Storage',
        status: DEVICE_STATUS.MAINTENANCE,
        cpu: 0,
        memory: 0,
        disk: 78,
        network: 0,
        uptime: 'Offline',
        lastUpdate: new Date(Date.now() - 2 * 60 * 60 * 1000),
        location: 'Backup Room',
        ip: '192.168.1.30'
      }
    ]

    setTimeout(() => {
      setDevices(mockDevices)
      setLoading(false)
    }, 1000)
  }, [])

  const getStatusColor = (status) => {
    switch (status) {
      case DEVICE_STATUS.ONLINE:
        return 'text-green-600 bg-green-100'
      case DEVICE_STATUS.WARNING:
        return 'text-yellow-600 bg-yellow-100'
      case DEVICE_STATUS.ERROR:
        return 'text-red-600 bg-red-100'
      case DEVICE_STATUS.MAINTENANCE:
        return 'text-blue-600 bg-blue-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const getMetricColor = (value) => {
    if (value >= 90) return 'text-red-600'
    if (value >= 70) return 'text-yellow-600'
    return 'text-green-600'
  }

  const refreshDevices = async () => {
    setRefreshing(true)
    // Simulate API call
    setTimeout(() => {
      setDevices(prev => prev.map(device => ({
        ...device,
        lastUpdate: new Date(),
        cpu: Math.max(0, Math.min(100, device.cpu + (Math.random() - 0.5) * 10)),
        memory: Math.max(0, Math.min(100, device.memory + (Math.random() - 0.5) * 10)),
        network: Math.max(0, Math.min(100, device.network + (Math.random() - 0.5) * 10))
      })))
      setRefreshing(false)
    }, 1500)
  }

  const getOverallHealth = () => {
    const onlineDevices = devices.filter(d => d.status === DEVICE_STATUS.ONLINE).length
    const totalDevices = devices.length
    return totalDevices > 0 ? Math.round((onlineDevices / totalDevices) * 100) : 0
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Device Health Monitor
          </h1>
          <p className={`mt-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Monitor and manage all your devices in real-time
          </p>
        </div>
        <button
          onClick={refreshDevices}
          disabled={refreshing}
          className={`px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 flex items-center space-x-2 ${refreshing ? 'cursor-not-allowed' : ''}`}
        >
          <svg className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span>{refreshing ? 'Refreshing...' : 'Refresh'}</span>
        </button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className={`p-6 rounded-lg shadow ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Overall Health
              </p>
              <p className={`text-2xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {getOverallHealth()}%
              </p>
            </div>
          </div>
        </div>

        <div className={`p-6 rounded-lg shadow ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Total Devices
              </p>
              <p className={`text-2xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {devices.length}
              </p>
            </div>
          </div>
        </div>

        <div className={`p-6 rounded-lg shadow ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.636 18.364a9 9 0 010-12.728m12.728 0a9 9 0 010 12.728m-9.9-2.829a5 5 0 010-7.07m7.072 0a5 5 0 010 7.07M13 12a1 1 0 11-2 0 1 1 0 012 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Online
              </p>
              <p className={`text-2xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {devices.filter(d => d.status === DEVICE_STATUS.ONLINE).length}
              </p>
            </div>
          </div>
        </div>

        <div className={`p-6 rounded-lg shadow ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Issues
              </p>
              <p className={`text-2xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {devices.filter(d => d.status === DEVICE_STATUS.WARNING || d.status === DEVICE_STATUS.ERROR).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Device List */}
      <div className={`rounded-lg shadow ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Device Status
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className={isDark ? 'bg-gray-700' : 'bg-gray-50'}>
              <tr>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                  Device
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                  Status
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                  CPU
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                  Memory
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                  Disk
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                  Network
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                  Last Update
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className={`divide-y divide-gray-200 dark:divide-gray-700 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
              {devices.map((device) => (
                <tr key={device.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                          <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {device.name}
                        </div>
                        <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                          {device.type} • {device.ip}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(device.status)}`}>
                      {device.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className={`text-sm font-medium ${getMetricColor(device.cpu)} ${isDark ? '' : ''}`}>
                        {device.cpu}%
                      </span>
                      <div className="ml-2 w-16 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${device.cpu >= 90 ? 'bg-red-600' : device.cpu >= 70 ? 'bg-yellow-600' : 'bg-green-600'}`}
                          style={{ width: `${device.cpu}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className={`text-sm font-medium ${getMetricColor(device.memory)}`}>
                        {device.memory}%
                      </span>
                      <div className="ml-2 w-16 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${device.memory >= 90 ? 'bg-red-600' : device.memory >= 70 ? 'bg-yellow-600' : 'bg-green-600'}`}
                          style={{ width: `${device.memory}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className={`text-sm font-medium ${getMetricColor(device.disk)}`}>
                        {device.disk}%
                      </span>
                      <div className="ml-2 w-16 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${device.disk >= 90 ? 'bg-red-600' : device.disk >= 70 ? 'bg-yellow-600' : 'bg-green-600'}`}
                          style={{ width: `${device.disk}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className={`text-sm font-medium ${getMetricColor(device.network)}`}>
                        {device.network}%
                      </span>
                      <div className="ml-2 w-16 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${device.network >= 90 ? 'bg-red-600' : device.network >= 70 ? 'bg-yellow-600' : 'bg-green-600'}`}
                          style={{ width: `${device.network}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                    {getRelativeTime(device.lastUpdate)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => setSelectedDevice(device)}
                      className="text-indigo-600 hover:text-indigo-900 mr-3"
                    >
                      View Details
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      Restart
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Device Detail Modal */}
      {selectedDevice && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white dark:bg-gray-800">
            <div className="mt-3">
              <div className="flex justify-between items-center mb-4">
                <h3 className={`text-lg font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {selectedDevice.name} Details
                </h3>
                <button
                  onClick={() => setSelectedDevice(null)}
                  className={`text-gray-400 hover:text-gray-600 ${isDark ? 'hover:text-gray-300' : ''}`}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Type:</span>
                  <span className={isDark ? 'text-white' : 'text-gray-900'}>{selectedDevice.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Status:</span>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedDevice.status)}`}>
                    {selectedDevice.status}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>IP Address:</span>
                  <span className={isDark ? 'text-white' : 'text-gray-900'}>{selectedDevice.ip}</span>
                </div>
                <div className="flex justify-between">
                  <span className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Location:</span>
                  <span className={isDark ? 'text-white' : 'text-gray-900'}>{selectedDevice.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Uptime:</span>
                  <span className={isDark ? 'text-white' : 'text-gray-900'}>{selectedDevice.uptime}</span>
                </div>
                <div className="flex justify-between">
                  <span className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Last Update:</span>
                  <span className={isDark ? 'text-white' : 'text-gray-900'}>
                    {formatDate(selectedDevice.lastUpdate, 'MM/DD/YYYY hh:mm A')}
                  </span>
                </div>
              </div>

              <div className="flex justify-end mt-6 space-x-3">
                <button
                  onClick={() => setSelectedDevice(null)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                >
                  Close
                </button>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                  Restart Device
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DeviceHealth