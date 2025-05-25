// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api',
  TIMEOUT: 30000,
  RETRY_ATTEMPTS: 3,
}


// Theme Constants
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system'
}

// User Roles
export const USER_ROLES = {
  SUPER_ADMIN: 'super_admin',
  ADMIN: 'admin',
  MODERATOR: 'moderator',
  USER: 'user',
  VIEWER: 'viewer'
}

// User Status
export const USER_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PENDING: 'pending',
  SUSPENDED: 'suspended',
  BLOCKED: 'blocked'
}

// Student Status
export const STUDENT_STATUS = {
  ENROLLED: 'enrolled',
  GRADUATED: 'graduated',
  SUSPENDED: 'suspended',
  DROPPED: 'dropped',
  TRANSFERRED: 'transferred'
}

// Organization Types
export const ORGANIZATION_TYPES = {
  COMPANY: 'company',
  SCHOOL: 'school',
  HOSPITAL: 'hospital',
  GOVERNMENT: 'government',
  NON_PROFIT: 'non_profit',
  OTHER: 'other'
}

// Device Health Status
export const DEVICE_STATUS = {
  ONLINE: 'online',
  OFFLINE: 'offline',
  WARNING: 'warning',
  ERROR: 'error',
  MAINTENANCE: 'maintenance'
}

// Time Zones
export const TIME_ZONES = [
  { value: 'UTC', label: 'UTC (Coordinated Universal Time)' },
  { value: 'America/New_York', label: 'Eastern Time (US & Canada)' },
  { value: 'America/Chicago', label: 'Central Time (US & Canada)' },
  { value: 'America/Denver', label: 'Mountain Time (US & Canada)' },
  { value: 'America/Los_Angeles', label: 'Pacific Time (US & Canada)' },
  { value: 'Europe/London', label: 'London' },
  { value: 'Europe/Paris', label: 'Paris' },
  { value: 'Europe/Berlin', label: 'Berlin' },
  { value: 'Asia/Tokyo', label: 'Tokyo' },
  { value: 'Asia/Shanghai', label: 'Shanghai' },
  { value: 'Asia/Kolkata', label: 'Mumbai, Kolkata' },
  { value: 'Australia/Sydney', label: 'Sydney' },
]

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [5, 10, 20, 50, 100],
  MAX_VISIBLE_PAGES: 5
}

// Date Formats
export const DATE_FORMATS = {
  SHORT: 'MM/DD/YYYY',
  LONG: 'MMMM DD, YYYY',
  WITH_TIME: 'MM/DD/YYYY hh:mm A',
  ISO: 'YYYY-MM-DD',
  TIME_ONLY: 'hh:mm A'
}

// Chart Colors
export const CHART_COLORS = {
  PRIMARY: '#3B82F6',
  SECONDARY: '#10B981',
  WARNING: '#F59E0B',
  DANGER: '#EF4444',
  INFO: '#06B6D4',
  SUCCESS: '#22C55E',
  GRADIENT: ['#3B82F6', '#8B5CF6', '#06B6D4', '#10B981', '#F59E0B', '#EF4444']
}

// Local Storage Keys
export const STORAGE_KEYS = {
  THEME: 'admin_panel_theme',
  TIMEZONE: 'admin_panel_timezone',
  USER_PREFERENCES: 'admin_panel_user_preferences',
  SIDEBAR_STATE: 'admin_panel_sidebar_state',
  TABLE_SETTINGS: 'admin_panel_table_settings',
  DASHBOARD_LAYOUT: 'admin_panel_dashboard_layout'
}

// Navigation Menu Items
export const MENU_ITEMS = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    path: '/dashboard',
    icon: 'home'
  },
  {
    id: 'organization',
    label: 'Organization',
    icon: 'building',
    children: [
      { id: 'organizations', label: 'Organizations', path: '/organization/organizations' },
      { id: 'groups', label: 'Groups', path: '/organization/groups' },
      { id: 'departments', label: 'Departments', path: '/organization/departments' },
      { id: 'roles', label: 'Roles', path: '/organization/roles' }
    ]
  },
  {
    id: 'users',
    label: 'Users',
    icon: 'users',
    children: [
      { id: 'users', label: 'User Management', path: '/users' },
      { id: 'user-listing', label: 'User Listing', path: '/users/listing' }
    ]
  },
  {
    id: 'students',
    label: 'Students',
    icon: 'academic-cap',
    children: [
      { id: 'students', label: 'Student Management', path: '/students' },
      { id: 'student-listing', label: 'Student Listing', path: '/students/listing' }
    ]
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: 'cog',
    children: [
      { id: 'device-health', label: 'Device Health', path: '/settings/device-health' },
      { id: 'theme', label: 'Theme Settings', path: '/settings/theme' },
      { id: 'timezone', label: 'Time Zone', path: '/settings/timezone' }
    ]
  }
]

// File Upload
export const FILE_UPLOAD = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'application/pdf', 'text/csv'],
  CHUNK_SIZE: 1024 * 1024 // 1MB chunks for large files
}

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  FORBIDDEN: 'Access denied.',
  NOT_FOUND: 'The requested resource was not found.',
  SERVER_ERROR: 'Internal server error. Please try again later.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  FILE_TOO_LARGE: 'File size exceeds the maximum allowed limit.',
  INVALID_FILE_TYPE: 'File type is not supported.'
}

// Success Messages
export const SUCCESS_MESSAGES = {
  SAVE_SUCCESS: 'Changes saved successfully.',
  DELETE_SUCCESS: 'Item deleted successfully.',
  UPDATE_SUCCESS: 'Item updated successfully.',
  CREATE_SUCCESS: 'Item created successfully.',
  UPLOAD_SUCCESS: 'File uploaded successfully.',
  EMAIL_SENT: 'Email sent successfully.'
}

export default {
  API_CONFIG,
  THEMES,
  USER_ROLES,
  USER_STATUS,
  STUDENT_STATUS,
  ORGANIZATION_TYPES,
  DEVICE_STATUS,
  TIME_ZONES,
  PAGINATION,
  DATE_FORMATS,
  CHART_COLORS,
  STORAGE_KEYS,
  MENU_ITEMS,
  FILE_UPLOAD,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES
}