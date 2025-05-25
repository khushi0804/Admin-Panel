import React, { useState, useEffect, createContext, useContext } from 'react';
import { 
  Menu, X, Search, Globe, Sun, Moon, User, Users, Building, 
  UserCheck, GraduationCap, Settings, LogOut, Home, Shield,
  Layers, Monitor, Clock, Palette, MapPin, ChevronRight,
  Edit, Trash2, Plus, Eye, ChevronLeft, ChevronDown,
  Cloud, CloudRain, CloudSnow, Thermometer, Wind
} from 'lucide-react';


import sampleData from '../../data/sampleData';
import usePagination from '../../hooks/usePagination';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Modal from '../../components/common/Modal';
import Table from '../../components/common/Table';
import Pagination from '../../components/common/Pagination';

const Student = () => {
  const [students, setStudents] = useState(sampleData.students);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [formData, setFormData] = useState({ 
    name: '', email: '', course: '', year: '1st Year', gpa: '' 
  });

  const pagination = usePagination(students, 5);

  const columns = [
    { header: 'Name', accessor: 'name' },
    { header: 'Email', accessor: 'email' },
    { header: 'Course', accessor: 'course' },
    { header: 'Year', accessor: 'year' },
    { header: 'GPA', accessor: 'gpa' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingStudent) {
      setStudents(prev => prev.map(student => 
        student.id === editingStudent.id ? { ...student, ...formData, gpa: parseFloat(formData.gpa) } : student
      ));
    } else {
      const newStudent = { id: Date.now(), ...formData, gpa: parseFloat(formData.gpa) };
      setStudents(prev => [...prev, newStudent]);
    }
    setIsModalOpen(false);
    setEditingStudent(null);
    setFormData({ name: '', email: '', course: '', year: '1st Year', gpa: '' });
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
    setFormData({ ...student, gpa: student.gpa.toString() });
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setStudents(prev => prev.filter(student => student.id !== id));
  };

  const actions = (student) => (
    <>
      <Button variant="ghost" size="sm" onClick={() => handleEdit(student)}>
        <Edit className="w-4 h-4" />
      </Button>
      <Button variant="ghost" size="sm" onClick={() => handleDelete(student.id)}>
        <Trash2 className="w-4 h-4 text-red-500" />
      </Button>
    </>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Student Management</h1>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Student
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
          setEditingStudent(null);
          setFormData({ name: '', email: '', course: '', year: '1st Year', gpa: '' });
        }}
        title={editingStudent ? 'Edit Student' : 'Add Student'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Full Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <Input
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <Input
            label="Course"
            value={formData.course}
            onChange={(e) => setFormData({ ...formData, course: e.target.value })}
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Year</label>
              <select
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="4th Year">4th Year</option>
              </select>
            </div>
            <Input
              label="GPA"
              type="number"
              step="0.1"
              min="0"
              max="4"
              value={formData.gpa}
              onChange={(e) => setFormData({ ...formData, gpa: e.target.value })}
              required
            />
          </div>
          <div className="flex justify-end space-x-3">
            <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {editingStudent ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Student;