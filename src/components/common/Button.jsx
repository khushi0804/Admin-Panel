import React, { useState, useEffect, createContext, useContext } from 'react';
import { 
  Menu, X, Search, Globe, Sun, Moon, User, Users, Building, 
  UserCheck, GraduationCap, Settings, LogOut, Home, Shield,
  Layers, Monitor, Clock, Palette, MapPin, ChevronRight,
  Edit, Trash2, Plus, Eye, ChevronLeft, ChevronDown,
  Cloud, CloudRain, CloudSnow, Thermometer, Wind
} from 'lucide-react';

const Button = ({ children, variant = 'primary', size = 'md', onClick, className, disabled, ...props }) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white focus:ring-gray-500',
    danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500',
    ghost: 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className || ''}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;