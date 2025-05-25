import React, { useState, useContext } from 'react';
import {ThemeContext } from '../../contexts/ThemeContext';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';

const ThemeSettings = () => {
  const { theme, setTheme, primaryColor, setPrimaryColor } = useContext(ThemeContext);
  const [showResetModal, setShowResetModal] = useState(false);
  const [tempTheme, setTempTheme] = useState(theme);
  const [tempPrimaryColor, setTempPrimaryColor] = useState(primaryColor);

  const themes = [
    { value: 'light', label: 'Light Theme', preview: 'bg-white text-gray-900' },
    { value: 'dark', label: 'Dark Theme', preview: 'bg-gray-900 text-white' },
    { value: 'auto', label: 'Auto (System)', preview: 'bg-gradient-to-r from-white to-gray-900 text-gray-700' }
  ];

  const colorOptions = [
    { value: 'blue', label: 'Blue', color: 'bg-blue-500' },
    { value: 'green', label: 'Green', color: 'bg-green-500' },
    { value: 'purple', label: 'Purple', color: 'bg-purple-500' },
    { value: 'red', label: 'Red', color: 'bg-red-500' },
    { value: 'orange', label: 'Orange', color: 'bg-orange-500' },
    { value: 'teal', label: 'Teal', color: 'bg-teal-500' },
    { value: 'pink', label: 'Pink', color: 'bg-pink-500' },
    { value: 'indigo', label: 'Indigo', color: 'bg-indigo-500' }
  ];

  const handleSaveSettings = () => {
    setTheme(tempTheme);
    setPrimaryColor(tempPrimaryColor);
    alert('Theme settings saved successfully!');
  };

  const handleResetToDefault = () => {
    setTempTheme('light');
    setTempPrimaryColor('blue');
    setTheme('light');
    setPrimaryColor('blue');
    setShowResetModal(false);
    alert('Theme settings reset to default!');
  };

  const handlePreview = () => {
    setTheme(tempTheme);
    setPrimaryColor(tempPrimaryColor);
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Theme Settings
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Customize the appearance and color scheme of your admin panel
        </p>
      </div>

      <div className="space-y-8">
        {/* Theme Selection */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Theme Mode
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {themes.map((themeOption) => (
              <div
                key={themeOption.value}
                className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                  tempTheme === themeOption.value
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                }`}
                onClick={() => setTempTheme(themeOption.value)}
              >
                <div className={`h-12 rounded mb-3 ${themeOption.preview}`}></div>
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900 dark:text-white">
                    {themeOption.label}
                  </span>
                  <input
                    type="radio"
                    name="theme"
                    value={themeOption.value}
                    checked={tempTheme === themeOption.value}
                    onChange={() => setTempTheme(themeOption.value)}
                    className="text-blue-600"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Primary Color Selection */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Primary Color
          </h3>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
            {colorOptions.map((color) => (
              <div
                key={color.value}
                className={`relative cursor-pointer rounded-lg p-3 border-2 transition-all duration-200 ${
                  tempPrimaryColor === color.value
                    ? 'border-gray-900 dark:border-white scale-105'
                    : 'border-gray-200 dark:border-gray-600 hover:border-gray-400'
                }`}
                onClick={() => setTempPrimaryColor(color.value)}
              >
                <div className={`w-8 h-8 rounded-full ${color.color} mx-auto`}></div>
                <p className="text-xs text-center mt-2 text-gray-700 dark:text-gray-300">
                  {color.label}
                </p>
                {tempPrimaryColor === color.value && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Theme Preview */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Preview
          </h3>
          <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium text-gray-900 dark:text-white">Sample Admin Panel</h4>
              <div className={`px-3 py-1 rounded-full text-white text-sm bg-${tempPrimaryColor}-500`}>
                Active
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white dark:bg-gray-800 p-3 rounded border">
                <h5 className="font-medium text-gray-900 dark:text-white mb-2">Card Example</h5>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  This is how your content will look with the selected theme.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-3 rounded border">
                <button className={`w-full py-2 px-4 rounded bg-${tempPrimaryColor}-500 text-white hover:bg-${tempPrimaryColor}-600 transition-colors`}>
                  Primary Button
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t border-gray-200 dark:border-gray-600">
        <Button
          onClick={handlePreview}
          variant="secondary"
          className="flex-1"
        >
          Preview Changes
        </Button>
        <Button
          onClick={handleSaveSettings}
          variant="primary"
          className="flex-1"
        >
          Save Settings
        </Button>
        <Button
          onClick={() => setShowResetModal(true)}
          variant="danger"
          className="flex-1"
        >
          Reset to Default
        </Button>
      </div>

      {/* Reset Confirmation Modal */}
      <Modal
        isOpen={showResetModal}
        onClose={() => setShowResetModal(false)}
        title="Reset Theme Settings"
      >
        <div className="p-4">
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Are you sure you want to reset all theme settings to their default values? 
            This action cannot be undone.
          </p>
          <div className="flex gap-3 justify-end">
            <Button
              onClick={() => setShowResetModal(false)}
              variant="secondary"
            >
              Cancel
            </Button>
            <Button
              onClick={handleResetToDefault}
              variant="danger"
            >
              Reset Settings
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ThemeSettings;