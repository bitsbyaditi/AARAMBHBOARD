import React, { useState, useEffect } from 'react';
import {
  Cloud,
  Sun,
  CloudRain,
  Wind,
  Droplets,
  Eye,
  Thermometer,
} from 'lucide-react';

const WeatherWidget: React.FC = () => {
  const weather = {
    location: 'New York City',
    temperature: 22,
    condition: 'Partly Cloudy',
    humidity: 65,
    windSpeed: 12,
    visibility: 10,
    uvIndex: 6,
    forecast: [
      { day: 'Today', high: 24, low: 18, condition: 'sunny' },
      { day: 'Tomorrow', high: 26, low: 20, condition: 'cloudy' },
      { day: 'Wed', high: 23, low: 17, condition: 'rainy' },
      { day: 'Thu', high: 25, low: 19, condition: 'sunny' },
    ],
  };

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
        return <Sun className="h-5 w-5 text-yellow-500" />;
      case 'cloudy':
        return <Cloud className="h-5 w-5 text-gray-500" />;
      case 'rainy':
        return <CloudRain className="h-5 w-5 text-blue-500" />;
      default:
        return <Sun className="h-5 w-5 text-yellow-500" />;
    }
  };

  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 h-full"
      role="region"
      aria-label="Weather Information"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full flex items-center justify-center">
            <Cloud className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">Weather</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{weather.location}</p>
          </div>
        </div>
      </div>

      {/* Current Weather */}
      <div className="text-center mb-6">
        <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          {weather.temperature}°C
        </div>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{weather.condition}</p>

        {/* Weather Details */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div
            className="flex items-center justify-center space-x-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg"
            aria-label={`Humidity: ${weather.humidity}%`}
          >
            <Droplets className="h-4 w-4 text-blue-500" />
            <span className="text-gray-700 dark:text-gray-300">{weather.humidity}%</span>
          </div>
          <div
            className="flex items-center justify-center space-x-2 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg"
            aria-label={`Wind Speed: ${weather.windSpeed} km/h`}
          >
            <Wind className="h-4 w-4 text-green-500" />
            <span className="text-gray-700 dark:text-gray-300">{weather.windSpeed} km/h</span>
          </div>
          <div
            className="flex items-center justify-center space-x-2 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg"
            aria-label={`Visibility: ${weather.visibility} km`}
          >
            <Eye className="h-4 w-4 text-purple-500" />
            <span className="text-gray-700 dark:text-gray-300">{weather.visibility} km</span>
          </div>
          <div
            className="flex items-center justify-center space-x-2 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg"
            aria-label={`UV Index: ${weather.uvIndex}`}
          >
            <Thermometer className="h-4 w-4 text-orange-500" />
            <span className="text-gray-700 dark:text-gray-300">UV {weather.uvIndex}</span>
          </div>
        </div>
      </div>

      {/* Forecast */}
      <div>
        <h4 className="font-medium text-gray-900 dark:text-white mb-3 text-sm">4-Day Forecast</h4>
        <div className="space-y-2">
          {weather.forecast.map((day, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
              aria-label={`${day.day} forecast: High ${day.high}°, Low ${day.low}°`}
            >
              <div className="flex items-center space-x-3">
                {getWeatherIcon(day.condition)}
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{day.day}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <span className="font-medium text-gray-900 dark:text-white">{day.high}°</span>
                <span className="text-gray-500 dark:text-gray-400">{day.low}°</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
