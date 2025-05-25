"use client"

import React, { useState, useEffect } from "react"
import {
  Cloud,
  CloudRain,
  CloudSnow,
  Sun,
  Wind,
  Droplet,
  Eye,
  Gauge,
  Sunrise,
  Sunset,
  MapPin,
  Clock,
} from "lucide-react"

// Mock weather hook for demonstration
const useWeather = () => {
  const [weather] = useState({
    temperature: 24,
    condition: "Partly Cloudy",
    icon: "⛅",
    humidity: 65,
    windSpeed: 12,
    visibility: 10,
    pressure: 1013,
    uvIndex: 6,
    feelsLike: 27,
    location: "New York, NY",
    sunrise: "06:42",
    sunset: "19:28",
    hourlyForecast: [
      { time: "12:00", temp: 24, icon: "☀️" },
      { time: "13:00", temp: 26, icon: "⛅" },
      { time: "14:00", temp: 28, icon: "☀️" },
      { time: "15:00", temp: 27, icon: "🌤️" },
      { time: "16:00", temp: 25, icon: "⛅" },
    ],
    weeklyForecast: [
      { day: "Today", high: 28, low: 18, icon: "⛅", condition: "Partly Cloudy" },
      { day: "Tomorrow", high: 30, low: 20, icon: "☀️", condition: "Sunny" },
      { day: "Wednesday", high: 26, low: 16, icon: "🌧️", condition: "Rainy" },
      { day: "Thursday", high: 24, low: 14, icon: "⛈️", condition: "Thunderstorm" },
      { day: "Friday", high: 27, low: 17, icon: "🌤️", condition: "Partly Sunny" },
    ],
  })

  return weather
}

const WeatherWidget = () => {
  const weather = useWeather()
  const [activeTab, setActiveTab] = useState("current")
  const [isAnimating, setIsAnimating] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    setIsAnimating(true)
    const animTimer = setTimeout(() => setIsAnimating(false), 1000)

    const timeInterval = setInterval(() => setCurrentTime(new Date()), 1000)

    return () => {
      clearTimeout(animTimer)
      clearInterval(timeInterval)
    }
  }, [])

  const getWeatherGradient = (condition) => {
    switch (condition.toLowerCase()) {
      case "sunny":
        return "from-yellow-400 via-orange-500 to-red-500"
      case "rainy":
        return "from-gray-600 via-blue-600 to-blue-800"
      case "cloudy":
      case "partly cloudy":
        return "from-blue-400 via-purple-500 to-indigo-600"
      case "snowy":
        return "from-blue-200 via-blue-300 to-blue-500"
      default:
        return "from-blue-500 via-purple-600 to-indigo-700"
    }
  }

  // Use lucide-react icons for weather conditions
  const WeatherIcon = ({ condition, size = "w-8 h-8" }) => {
    switch (condition.toLowerCase()) {
      case "sunny":
        return <Sun className={`${size} text-yellow-300`} />
      case "rainy":
        return <CloudRain className={`${size} text-blue-300`} />
      case "cloudy":
      case "partly cloudy":
        return <Cloud className={`${size} text-gray-300`} />
      case "snowy":
        return <CloudSnow className={`${size} text-white`} />
      default:
        return <Cloud className={`${size} text-gray-300`} />
    }
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6">
      <div
        className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${getWeatherGradient(
          weather.condition
        )} shadow-2xl transition-all duration-700 ${isAnimating ? "scale-105" : "scale-100"}`}
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full animate-pulse"></div>
          <div className="absolute top-1/2 -left-8 w-32 h-32 bg-white/5 rounded-full animate-bounce"></div>
          <div className="absolute bottom-4 right-1/3 w-16 h-16 bg-white/10 rounded-full animate-ping"></div>
        </div>

        {/* Glass Morphism Overlay */}
        <div className="relative backdrop-blur-sm bg-white/10 border border-white/20">
          {/* Header */}
          <div className="p-6 sm:p-8 border-b border-white/20">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-white/80" aria-label="Location icon" />
                <h2 className="text-xl sm:text-2xl font-bold text-white">{weather.location}</h2>
              </div>
              <div className="flex items-center space-x-2 text-white/80">
                <Clock className="w-4 h-4" aria-label="Clock icon" />
                <span className="text-sm">{currentTime.toLocaleTimeString()}</span>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="px-6 sm:px-8 pt-6">
            <div className="flex space-x-1 bg-white/10 rounded-xl p-1">
              {["current", "hourly", "weekly"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-300 ${
                    activeTab === tab
                      ? "bg-white/20 text-white shadow-lg"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                  aria-pressed={activeTab === tab}
                  type="button"
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8">
            {activeTab === "current" && (
              <div className="space-y-8">
                {/* Main Weather Display */}
                <div className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="relative">
                      <div className="text-8xl sm:text-9xl animate-bounce" aria-label="Weather emoji icon">
                        {weather.icon}
                      </div>
                      <div className="absolute -bottom-2 -right-2 bg-white/20 rounded-full p-2">
                        <WeatherIcon condition={weather.condition} size="w-6 h-6" />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h1 className="text-6xl sm:text-7xl font-bold text-white mb-2">{weather.temperature}°</h1>
                    <p className="text-xl sm:text-2xl text-white/90 font-medium">{weather.condition}</p>
                    <p className="text-white/70">Feels like {weather.feelsLike}°C</p>
                  </div>
                </div>

                {/* Weather Details Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { icon: Wind, label: "Wind Speed", value: `${weather.windSpeed} km/h` },
                    { icon: Droplet, label: "Humidity", value: `${weather.humidity}%` },
                    { icon: Eye, label: "Visibility", value: `${weather.visibility} km` },
                    { icon: Gauge, label: "Pressure", value: `${weather.pressure} hPa` },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-white/20 rounded-xl">
                          <item.icon className="w-5 h-5 text-white" aria-hidden="true" />
                        </div>
                        <div>
                          <p className="text-white/70 text-sm">{item.label}</p>
                          <p className="text-white font-semibold">{item.value}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Sunrise & Sunset */}
                <div className="flex justify-center space-x-16 mt-6 text-white/80">
                  <div className="flex items-center space-x-2">
                    <Sunrise className="w-6 h-6" aria-label="Sunrise icon" />
                    <span>Sunrise: {weather.sunrise}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Sunset className="w-6 h-6" aria-label="Sunset icon" />
                    <span>Sunset: {weather.sunset}</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "hourly" && (
              <div className="grid grid-cols-5 gap-4 overflow-x-auto">
                {weather.hourlyForecast.map(({ time, temp, icon }, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col items-center bg-white/10 p-4 rounded-xl border border-white/20"
                  >
                    <span className="text-white/70 text-sm mb-2">{time}</span>
                    <span className="text-4xl mb-1" aria-label="Hourly weather icon">
                      {icon}
                    </span>
                    <span className="text-white font-semibold">{temp}°C</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "weekly" && (
              <div className="space-y-4">
                {weather.weeklyForecast.map(({ day, high, low, icon, condition }, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center bg-white/10 p-4 rounded-xl border border-white/20"
                  >
                    <div className="flex items-center space-x-4">
                      <span className="text-white font-semibold">{day}</span>
                      <span className="text-2xl" aria-label="Weekly weather icon">
                        {icon}
                      </span>
                      <span className="text-white/70">{condition}</span>
                    </div>
                    <div className="text-white font-semibold">
                      {high}° / {low}°
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default WeatherWidget
