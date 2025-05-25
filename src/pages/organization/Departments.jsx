import React, { useState } from 'react'
import { Edit, Trash2, Plus } from 'lucide-react'
import sampleData from '../../data/sampleData'
import usePagination from '../../hooks/usePagination'
import Button from '../../components/common/Button'
import Input from '../../components/common/Input'
import Modal from '../../components/common/Modal'
import Table from '../../components/common/Table'
import Pagination from '../../components/common/Pagination'

const Departments = () => {
  const [departments, setDepartments] = useState(sampleData.departments)
  const pagination = usePagination(departments, 5)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newDepartment, setNewDepartment] = useState({
    name: '',
    head: '',
    employees: ''
  })

  const handleAddDepartment = () => {
    if (newDepartment.name && newDepartment.head && newDepartment.employees) {
      setDepartments(prev => [...prev, newDepartment])
      setNewDepartment({ name: '', head: '', employees: '' })
      setIsModalOpen(false)
      pagination.setCurrentPage(1)
    }
  }

  const columns = [
    { header: 'Name', accessor: 'name' },
    { header: 'Department Head', accessor: 'head' },
    { header: 'Employees', accessor: 'employees' }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Departments</h1>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Department
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

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Department">
        <div className="space-y-4">
          <Input
            label="Name"
            value={newDepartment.name}
            onChange={e => setNewDepartment({ ...newDepartment, name: e.target.value })}
            placeholder="Department Name"
          />
          <Input
            label="Department Head"
            value={newDepartment.head}
            onChange={e => setNewDepartment({ ...newDepartment, head: e.target.value })}
            placeholder="Head of Department"
          />
          <Input
            label="Employees"
            type="number"
            value={newDepartment.employees}
            onChange={e => setNewDepartment({ ...newDepartment, employees: e.target.value })}
            placeholder="Number of Employees"
          />
          <Button onClick={handleAddDepartment}>Add Department</Button>
        </div>
      </Modal>
    </div>
  )
}

export default Departments
