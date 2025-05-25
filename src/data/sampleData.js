const sampleData = {
  users: [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', department: 'IT' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Manager', status: 'Active', department: 'HR' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'Inactive', department: 'Finance' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'User', status: 'Active', department: 'Marketing' },
    { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'Manager', status: 'Active', department: 'Sales' },
  ],
  students: [
    { id: 1, name: 'Emma Davis', email: 'emma@student.com', course: 'Computer Science', year: '3rd Year', gpa: 3.8 },
    { id: 2, name: 'Michael Chen', email: 'michael@student.com', course: 'Business', year: '2nd Year', gpa: 3.6 },
    { id: 3, name: 'Sarah Johnson', email: 'sarah@student.com', course: 'Engineering', year: '4th Year', gpa: 3.9 },
    { id: 4, name: 'David Kim', email: 'david@student.com', course: 'Arts', year: '1st Year', gpa: 3.4 },
    { id: 5, name: 'Lisa Wang', email: 'lisa@student.com', course: 'Medicine', year: '3rd Year', gpa: 3.7 },
  ],
  organizations: [
    { id: 1, name: 'Tech Corp', type: 'Technology', employees: 500, status: 'Active' },
    { id: 2, name: 'Health Systems', type: 'Healthcare', employees: 200, status: 'Active' },
    { id: 3, name: 'Edu Institute', type: 'Education', employees: 150, status: 'Inactive' },
  ],
  groups: [
    { id: 1, name: 'Development Team', organization: 'Tech Corp', members: 25 },
    { id: 2, name: 'Marketing Team', organization: 'Tech Corp', members: 15 },
    { id: 3, name: 'Research Team', organization: 'Health Systems', members: 20 },
  ],
  departments: [
    { id: 1, name: 'Information Technology', head: 'John Doe', employees: 45 },
    { id: 2, name: 'Human Resources', head: 'Jane Smith', employees: 12 },
    { id: 3, name: 'Finance', head: 'Bob Johnson', employees: 18 },
  ],
  roles: [
    { id: 1, name: 'Admin', permissions: ['read', 'write', 'delete'], users: 5 },
    { id: 2, name: 'Manager', permissions: ['read', 'write'], users: 12 },
    { id: 3, name: 'User', permissions: ['read'], users: 25 },
  ]
};

export default sampleData;