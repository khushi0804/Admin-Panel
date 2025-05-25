import React, { useState, useEffect, createContext, useContext } from 'react';
import { 
  Menu, X, Search, Globe, Sun, Moon, User, Users, Building, 
  UserCheck, GraduationCap, Settings, LogOut, Home, Shield,
  Layers, Monitor, Clock, Palette, MapPin, ChevronRight,
  Edit, Trash2, Plus, Eye, ChevronLeft, ChevronDown,
  Cloud, CloudRain, CloudSnow, Thermometer, Wind
} from 'lucide-react';

const StrengthChart = () => {
  const data = [
    { department: 'Students', count: 1250, color: 'bg-blue-500' },
    { department: 'Administration', count: 85, color: 'bg-green-500' },
    { department: 'Faculty', count: 120, color: 'bg-purple-500' },
    { department: 'Support Staff', count: 65, color: 'bg-orange-500' }
  ];

  const total = data.reduce((sum, item) => sum + item.count, 0);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Department Strength</h3>
        <PieChart className="w-5 h-5 text-gray-500" />
      </div>
      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">{item.department}</span>
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">{item.count}</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${item.color}`}
                style={{ width: `${(item.count / total) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StrengthChart;