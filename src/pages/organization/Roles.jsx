import React, { useState } from 'react'
import { Edit, Trash2, Plus } from 'lucide-react'
import sampleData from '../../data/sampleData'
import usePagination from '../../hooks/usePagination'
import Button from '../../components/common/Button'
import Input from '../../components/common/Input'
import Modal from '../../components/common/Modal'
import Table from '../../components/common/Table'
import Pagination from '../../components/common/Pagination'

const Roles = () => {
  const [roles, setRoles] = useState(sampleData.roles)
  const pagination = usePagination(roles, 5)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newRole, setNewRole] = useState({
    name: '',
    permissions: '',
    users: ''
  })

  const handleAddRole = () => {
    if (newRole.name && newRole.permissions && newRole.users) {
      const formattedRole = {
        name: newRole.name,
        permissions: newRole.permissions.split(',').map(p => p.trim()),
        users: parseInt(newRole.users)
      }
      setRoles(prev => [...prev, formattedRole])
      setNewRole({ name: '', permissions: '', users: '' })
      setIsModalOpen(false)
      pagination.setCurrentPage(1)
    }
  }

  const columns = [
    { header: 'Name', accessor: 'name' },
    {
      header: 'Permissions',
      accessor: 'permissions',
      render: (permissions) => permissions.join(', ')
    },
    { header: 'Users', accessor: 'users' }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Roles</h1>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Role
        </Button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <Table columns={columns} data={pagination.currentData} />
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={pagination.setCurrentPage}
          hasNext={pagination.hasNext}
          hasPrev={pagination.hasPrev}
        />
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Role">
        <div className="space-y-4">
          <Input
            label="Name"
            value={newRole.name}
            onChange={e => setNewRole({ ...newRole, name: e.target.value })}
            placeholder="Role Name"
          />
          <Input
            label="Permissions (comma separated)"
            value={newRole.permissions}
            onChange={e => setNewRole({ ...newRole, permissions: e.target.value })}
            placeholder="e.g. read, write, delete"
          />
          <Input
            label="Users"
            type="number"
            value={newRole.users}
            onChange={e => setNewRole({ ...newRole, users: e.target.value })}
            placeholder="Number of users"
          />
          <Button onClick={handleAddRole}>Add Role</Button>
        </div>
      </Modal>
    </div>
  )
}

export default Roles
