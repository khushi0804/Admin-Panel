import React, { useState, useEffect, createContext, useContext } from 'react';
import { 
  Menu, X, Search, Globe, Sun, Moon, User, Users, Building, 
  UserCheck, GraduationCap, Settings, LogOut, Home, Shield,
  Layers, Monitor, Clock, Palette, MapPin, ChevronRight,
  Edit, Trash2, Plus, Eye, ChevronLeft, ChevronDown,
  Cloud, CloudRain, CloudSnow, Thermometer, Wind
} from 'lucide-react';

const Input = ({ label, error, className, ...props }) => (
  <div className="space-y-1">
    {label && <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>}
    <input
      className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white ${error ? 'border-red-500' : ''} ${className || ''}`}
      {...props}
    />
    {error && <p className="text-sm text-red-600">{error}</p>}
  </div>
);

export default Input;