import React, { useState } from 'react';
import { 
  Edit, Trash2, Plus
} from 'lucide-react';
import sampleData from '../../data/sampleData';
import usePagination from '../../hooks/usePagination';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Modal from '../../components/common/Modal';
import Table from '../../components/common/Table';
import Pagination from '../../components/common/Pagination';

const Organizations = () => {
  const [organizations, setOrganizations] = useState(sampleData.organizations);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOrg, setEditingOrg] = useState(null);
  const [formData, setFormData] = useState({ name: '', type: '', employees: '', status: 'Active' });

  const pagination = usePagination(organizations, 5);

  const columns = [
    { header: 'Name', accessor: 'name' },
    { header: 'Type', accessor: 'type' },
    { header: 'Employees', accessor: 'employees' },
    { 
      header: 'Status', 
      accessor: 'status',
      render: (status) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {status}
        </span>
      )
    }
  ];

   const handleSubmit = (e) => {
    e.preventDefault();
    if (editingOrg) {
      setOrganizations(prev => prev.map(org => 
        org.id === editingOrg.id ? { ...org, ...formData } : org
      ));
    } else {
      const newOrg = { id: Date.now(), ...formData, employees: parseInt(formData.employees) };
      setOrganizations(prev => [...prev, newOrg]);
    }
    setIsModalOpen(false);
    setEditingOrg(null);
    setFormData({ name: '', type: '', employees: '', status: 'Active' });
  };

  const handleEdit = (org) => {
    setEditingOrg(org);
    setFormData({ ...org, employees: org.employees.toString() });
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setOrganizations(prev => prev.filter(org => org.id !== id));
  };

  const actions = (org) => (
    <>
      <Button variant="ghost" size="sm" onClick={() => handleEdit(org)}>
        <Edit className="w-4 h-4" />
      </Button>
      <Button variant="ghost" size="sm" onClick={() => handleDelete(org.id)}>
        <Trash2 className="w-4 h-4 text-red-500" />
      </Button>
    </>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Organizations</h1>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Organization
        </Button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <Table 
          columns={columns} 
          data={pagination.currentData} 
          actions={actions}
        />
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={pagination.setCurrentPage}
          hasNext={pagination.hasNext}
          hasPrev={pagination.hasPrev}
        />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingOrg(null);
          setFormData({ name: '', type: '', employees: '', status: 'Active' });
        }}
        title={editingOrg ? 'Edit Organization' : 'Add Organization'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Organization Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <Input
            label="Type"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            required
          />
          <Input
            label="Number of Employees"
            type="number"
            value={formData.employees}
            onChange={(e) => setFormData({ ...formData, employees: e.target.value })}
            required
          />
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <div className="flex justify-end space-x-3">
            <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {editingOrg ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Organizations;