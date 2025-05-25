import React, { useState, useEffect, createContext, useContext } from 'react';
import { 
  Menu, X, Search, Globe, Sun, Moon, User, Users, Building, 
  UserCheck, GraduationCap, Settings, LogOut, Home, Shield,
  Layers, Monitor, Clock, Palette, MapPin, ChevronRight,
  Edit, Trash2, Plus, Eye, ChevronLeft, ChevronDown,
  Cloud, CloudRain, CloudSnow, Thermometer, Wind, Droplets
} from 'lucide-react';
import {useWeather} from '../../hooks/useWeather'; // Add this import

const WeatherWidget = () => {
  const weather = useWeather();

  return (
    <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-6 text-white">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Weather</h3>
        <span className="text-2xl">{weather.icon}</span>
      </div>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-3xl font-bold">{weather.temperature}°C</span>
          <span className="text-blue-100">{weather.condition}</span>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <Droplets className="w-4 h-4" />
            <span>{weather.humidity}%</span>
          </div>
          <div className="flex items-center space-x-2">
            <Wind className="w-4 h-4" />
            <span>{weather.windSpeed} km/h</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;