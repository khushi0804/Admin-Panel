import React, { useState, useEffect, createContext, useContext } from 'react';
import { 
  Menu, X, Search, Globe, Sun, Moon, User, Users, Building, 
  UserCheck, GraduationCap, Settings, LogOut, Home, Shield,
  Layers, Monitor, Clock, Palette, MapPin, ChevronRight,
  Edit, Trash2, Plus, Eye, ChevronLeft, ChevronDown,
  Cloud, CloudRain, CloudSnow, Thermometer, Wind
} from 'lucide-react';

const VisitorChart = () => {
  const data = [
    { name: 'Mon', visitors: 400 },
    { name: 'Tue', visitors: 300 },
    { name: 'Wed', visitors: 600 },
    { name: 'Thu', visitors: 800 },
    { name: 'Fri', visitors: 500 },
    { name: 'Sat', visitors: 700 },
    { name: 'Sun', visitors: 350 }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Weekly Visitors</h3>
        <BarChart3 className="w-5 h-5 text-gray-500" />
      </div>
      <div className="space-y-3">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">{item.name}</span>
            <div className="flex items-center space-x-3">
              <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full" 
                  style={{ width: `${(item.visitors / 800) * 100}%` }}
                ></div>
              </div>
              <span className="text-sm font-medium text-gray-900 dark:text-white">{item.visitors}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VisitorChart;