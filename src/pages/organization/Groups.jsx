import React, { useState } from 'react'
import { Plus } from 'lucide-react'
import sampleData from '../../data/sampleData'
import usePagination from '../../hooks/usePagination'
import Button from '../../components/common/Button'
import Input from '../../components/common/Input'
import Modal from '../../components/common/Modal'
import Table from '../../components/common/Table'
import Pagination from '../../components/common/Pagination'

const Groups = () => {
  const [groups, setGroups] = useState(sampleData.groups)
  const pagination = usePagination(groups, 5)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newGroup, setNewGroup] = useState({
    name: '',
    organization: '',
    members: ''
  })

  const handleAddGroup = () => {
    if (newGroup.name && newGroup.organization && newGroup.members) {
      setGroups(prev => [...prev, newGroup])
      setNewGroup({ name: '', organization: '', members: '' })
      setIsModalOpen(false)
      pagination.setCurrentPage(1)
    }
  }

  const columns = [
    { header: 'Name', accessor: 'name' },
    { header: 'Organization', accessor: 'organization' },
    { header: 'Members', accessor: 'members' }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Groups</h1>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Group
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

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Group">
        <div className="space-y-4">
          <Input
            label="Name"
            value={newGroup.name}
            onChange={e => setNewGroup({ ...newGroup, name: e.target.value })}
            placeholder="Group Name"
          />
          <Input
            label="Organization"
            value={newGroup.organization}
            onChange={e => setNewGroup({ ...newGroup, organization: e.target.value })}
            placeholder="Organization Name"
          />
          <Input
            label="Members"
            value={newGroup.members}
            onChange={e => setNewGroup({ ...newGroup, members: e.target.value })}
            placeholder="Number of Members"
            type="number"
          />
          <Button onClick={handleAddGroup}>Add Group</Button>
        </div>
      </Modal>
    </div>
  )
}

export default Groups
