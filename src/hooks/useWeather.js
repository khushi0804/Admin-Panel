import { useState, useEffect } from 'react';

export const useWeather = () => {
  const [weather, setWeather] = useState({
    temperature: 22,
    condition: 'Sunny',
    humidity: 65,
    windSpeed: 12,
    icon: '☀️'
  });

  useEffect(() => {
    // Simulate weather API call
    const updateWeather = () => {
      const conditions = [
        { temp: 22, condition: 'Sunny', humidity: 65, wind: 12, icon: '☀️' },
        { temp: 18, condition: 'Cloudy', humidity: 75, wind: 8, icon: '☁️' },
        { temp: 15, condition: 'Rainy', humidity: 85, wind: 15, icon: '🌧️' },
      ];
      const randomWeather = conditions[Math.floor(Math.random() * conditions.length)];
      setWeather({
        temperature: randomWeather.temp,
        condition: randomWeather.condition,
        humidity: randomWeather.humidity,
        windSpeed: randomWeather.wind,
        icon: randomWeather.icon
      });
    };

    updateWeather();
    const interval = setInterval(updateWeather, 30000);
    return () => clearInterval(interval);
  }, []);

  return weather;
};

// Also provide default export for flexibility
export default useWeather;