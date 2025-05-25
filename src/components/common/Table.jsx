import React, { useState, useEffect, createContext, useContext } from 'react';
import { 
  Menu, X, Search, Globe, Sun, Moon, User, Users, Building, 
  UserCheck, GraduationCap, Settings, LogOut, Home, Shield,
  Layers, Monitor, Clock, Palette, MapPin, ChevronRight,
  Edit, Trash2, Plus, Eye, ChevronLeft, ChevronDown,
  Cloud, CloudRain, CloudSnow, Thermometer, Wind
} from 'lucide-react';


const Table = ({ columns, data, actions }) => (
  <div className="overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
      <thead className="bg-gray-50 dark:bg-gray-800">
        <tr>
          {columns.map((column, index) => (
            <th key={index} className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              {column.header}
            </th>
          ))}
          {actions && <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>}
        </tr>
      </thead>
      <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
        {data.map((row, rowIndex) => (
          <tr key={rowIndex} className="hover:bg-gray-50 dark:hover:bg-gray-800">
            {columns.map((column, colIndex) => (
              <td key={colIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                {column.render ? column.render(row[column.accessor], row) : row[column.accessor]}
              </td>
            ))}
            {actions && (
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                {actions(row)}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default Table;