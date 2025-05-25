import React, { useState, useEffect } from 'react';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Modal from '../../components/common/Modal';

const TimeZoneSettings = () => {
  const [selectedTimeZone, setSelectedTimeZone] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [dateFormat, setDateFormat] = useState('MM/DD/YYYY');
  const [timeFormat, setTimeFormat] = useState('12');
  const [autoDetect, setAutoDetect] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  // Common timezones with their display names and UTC offsets
  const timeZones = [
    { value: 'America/New_York', label: 'Eastern Time (ET)', offset: 'UTC-5/-4' },
    { value: 'America/Chicago', label: 'Central Time (CT)', offset: 'UTC-6/-5' },
    { value: 'America/Denver', label: 'Mountain Time (MT)', offset: 'UTC-7/-6' },
    { value: 'America/Los_Angeles', label: 'Pacific Time (PT)', offset: 'UTC-8/-7' },
    { value: 'America/Anchorage', label: 'Alaska Time (AKST)', offset: 'UTC-9/-8' },
    { value: 'Pacific/Honolulu', label: 'Hawaii Time (HST)', offset: 'UTC-10' },
    { value: 'UTC', label: 'Coordinated Universal Time (UTC)', offset: 'UTC+0' },
    { value: 'Europe/London', label: 'Greenwich Mean Time (GMT)', offset: 'UTC+0/+1' },
    { value: 'Europe/Paris', label: 'Central European Time (CET)', offset: 'UTC+1/+2' },
    { value: 'Europe/Moscow', label: 'Moscow Standard Time (MSK)', offset: 'UTC+3' },
    { value: 'Asia/Dubai', label: 'Gulf Standard Time (GST)', offset: 'UTC+4' },
    { value: 'Asia/Kolkata', label: 'India Standard Time (IST)', offset: 'UTC+5:30' },
    { value: 'Asia/Shanghai', label: 'China Standard Time (CST)', offset: 'UTC+8' },
    { value: 'Asia/Tokyo', label: 'Japan Standard Time (JST)', offset: 'UTC+9' },
    { value: 'Australia/Sydney', label: 'Australian Eastern Time (AEST)', offset: 'UTC+10/+11' },
    { value: 'Pacific/Auckland', label: 'New Zealand Time (NZST)', offset: 'UTC+12/+13' }
  ];

  const dateFormats = [
    { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY (US)', example: '12/25/2024' },
    { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY (UK)', example: '25/12/2024' },
    { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD (ISO)', example: '2024-12-25' },
    { value: 'DD-MM-YYYY', label: 'DD-MM-YYYY', example: '25-12-2024' },
    { value: 'MMM DD, YYYY', label: 'MMM DD, YYYY', example: 'Dec 25, 2024' },
    { value: 'DD MMM YYYY', label: 'DD MMM YYYY', example: '25 Dec 2024' }
  ];

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Load saved settings on component mount
  useEffect(() => {
    const savedTimeZone = localStorage.getItem('adminTimeZone') || Intl.DateTimeFormat().resolvedOptions().timeZone;
    const savedDateFormat = localStorage.getItem('adminDateFormat') || 'MM/DD/YYYY';
    const savedTimeFormat = localStorage.getItem('adminTimeFormat') || '12';
    const savedAutoDetect = localStorage.getItem('adminAutoDetect') === 'true';

    setSelectedTimeZone(savedTimeZone);
    setDateFormat(savedDateFormat);
    setTimeFormat(savedTimeFormat);
    setAutoDetect(savedAutoDetect);
  }, []);

  const handleAutoDetect = () => {
    if (autoDetect) {
      const detectedTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      setSelectedTimeZone(detectedTimeZone);
      setUnsavedChanges(true);
    }
  };

  useEffect(() => {
    handleAutoDetect();
  }, [autoDetect]);

  const filteredTimeZones = timeZones.filter(tz =>
    tz.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tz.value.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatTime = (date) => {
    try {
      const options = {
        timeZone: selectedTimeZone || 'UTC',
        hour12: timeFormat === '12',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      };
      return date.toLocaleTimeString('en-US', options);
    } catch (error) {
      return date.toLocaleTimeString();
    }
  };

  const formatDate = (date) => {
    try {
      const options = { timeZone: selectedTimeZone || 'UTC' };
      const localDate = new Date(date.toLocaleString('en-US', options));
      
      switch (dateFormat) {
        case 'MM/DD/YYYY':
          return localDate.toLocaleDateString('en-US');
        case 'DD/MM/YYYY':
          return localDate.toLocaleDateString('en-GB');
        case 'YYYY-MM-DD':
          return localDate.toISOString().split('T')[0];
        case 'DD-MM-YYYY':
          return localDate.toLocaleDateString('en-GB').replace(/\//g, '-');
        case 'MMM DD, YYYY':
          return localDate.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
          });
        case 'DD MMM YYYY':
          return localDate.toLocaleDateString('en-GB', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
          });
        default:
          return localDate.toLocaleDateString();
      }
    } catch (error) {
      return date.toLocaleDateString();
    }
  };

  const handleSaveSettings = () => {
    localStorage.setItem('adminTimeZone', selectedTimeZone);
    localStorage.setItem('adminDateFormat', dateFormat);
    localStorage.setItem('adminTimeFormat', timeFormat);
    localStorage.setItem('adminAutoDetect', autoDetect.toString());
    
    setShowSaveModal(true);
    setUnsavedChanges(false);
    
    setTimeout(() => {
      setShowSaveModal(false);
    }, 2000);
  };

  const handleInputChange = (setter) => (value) => {
    setter(value);
    setUnsavedChanges(true);
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Time Zone & Date Settings
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Configure your preferred time zone and date/time display formats
        </p>
      </div>

      {/* Current Time Display */}
      <div className="mb-8 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
          Current Time Preview
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Current Time</p>
            <p className="text-2xl font-mono font-bold text-blue-600 dark:text-blue-400">
              {formatTime(currentTime)}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Current Date</p>
            <p className="text-2xl font-mono font-bold text-indigo-600 dark:text-indigo-400">
              {formatDate(currentTime)}
            </p>
          </div>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 text-center">
          Time Zone: {selectedTimeZone || 'Not selected'}
        </p>
      </div>

      <div className="space-y-8">
        {/* Auto-Detect Setting */}
        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Auto-Detect Time Zone
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Automatically detect and use your system's time zone
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={autoDetect}
              onChange={(e) => handleInputChange(setAutoDetect)(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>

        {/* Time Zone Selection */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Select Time Zone
          </h3>
          
          {/* Search Input */}
          <div className="mb-4">
            <Input
              type="text"
              placeholder="Search time zones..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>

          {/* Time Zone Options */}
          <div className="max-h-64 overflow-y-auto border border-gray-200 dark:border-gray-600 rounded-lg">
            {filteredTimeZones.map((tz) => (
              <div
                key={tz.value}
                className={`p-3 border-b border-gray-200 dark:border-gray-600 last:border-b-0 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 ${
                  selectedTimeZone === tz.value ? 'bg-blue-50 dark:bg-blue-900/20 border-l-4 border-l-blue-500' : ''
                }`}
                onClick={() => handleInputChange(setSelectedTimeZone)(tz.value)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{tz.label}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{tz.value}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-mono text-gray-600 dark:text-gray-300">{tz.offset}</p>
                    {selectedTimeZone === tz.value && (
                      <div className="w-4 h-4 bg-blue-500 rounded-full mt-1 ml-auto"></div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Date Format Selection */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Date Format
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dateFormats.map((format) => (
              <div
                key={format.value}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                  dateFormat === format.value
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                }`}
                onClick={() => handleInputChange(setDateFormat)(format.value)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{format.label}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{format.example}</p>
                  </div>
                  <input
                    type="radio"
                    name="dateFormat"
                    value={format.value}
                    checked={dateFormat === format.value}
                    onChange={() => handleInputChange(setDateFormat)(format.value)}
                    className="text-blue-600"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Time Format Selection */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Time Format
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                timeFormat === '12'
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-gray-600 hover:border-gray-300'
              }`}
              onClick={() => handleInputChange(setTimeFormat)('12')}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">12-Hour Format</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">2:30 PM</p>
                </div>
                <input
                  type="radio"
                  name="timeFormat"
                  value="12"
                  checked={timeFormat === '12'}
                  onChange={() => handleInputChange(setTimeFormat)('12')}
                  className="text-blue-600"
                />
              </div>
            </div>
            <div
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                timeFormat === '24'
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-gray-600 hover:border-gray-300'
              }`}
              onClick={() => handleInputChange(setTimeFormat)('24')}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">24-Hour Format</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">14:30</p>
                </div>
                <input
                  type="radio"
                  name="timeFormat"
                  value="24"
                  checked={timeFormat === '24'}
                  onChange={() => handleInputChange(setTimeFormat)('24')}
                  className="text-blue-600"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t border-gray-200 dark:border-gray-600">
        <Button
          onClick={handleSaveSettings}
          variant="primary"
          className="flex-1"
          disabled={!unsavedChanges}
        >
          {unsavedChanges ? 'Save Changes' : 'Settings Saved'}
        </Button>
        <Button
          onClick={() => window.location.reload()}
          variant="secondary"
          className="flex-1"
        >
          Reset to System Default
        </Button>
      </div>

      {/* Success Modal */}
      <Modal
        isOpen={showSaveModal}
        onClose={() => setShowSaveModal(false)}
        title="Settings Saved"
      >
        <div className="p-4 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Your time zone and date format settings have been saved successfully!
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default TimeZoneSettings;