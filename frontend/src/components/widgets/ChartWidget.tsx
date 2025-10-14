import React from 'react';
import { BarChart3, TrendingUp } from 'lucide-react';

const ChartWidget: React.FC = () => {
  const data = [
    { month: 'Jan', value: 65 },
    { month: 'Feb', value: 78 },
    { month: 'Mar', value: 52 },
    { month: 'Apr', value: 91 },
    { month: 'May', value: 87 },
    { month: 'Jun', value: 95 },
  ];

  const maxValue = Math.max(...data.map(d => d.value));

  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 h-full"
      aria-label="Monthly Analytics Chart"
      role="region"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
            <BarChart3 className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">Analytics</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Monthly performance</p>
          </div>
        </div>
        <div className="flex items-center space-x-1 text-green-600 dark:text-green-400">
          <TrendingUp className="h-4 w-4" />
          <span className="text-sm font-medium">+12.5%</span>
        </div>
      </div>

      {/* Chart Bars */}
      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index} className="flex items-center space-x-3 group">
            <span className="w-8 text-sm font-medium text-gray-600 dark:text-gray-400">{item.month}</span>
            <div
              className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-3 relative"
              role="progressbar"
              aria-valuenow={item.value}
              aria-valuemin={0}
              aria-valuemax={maxValue}
              aria-label={`Performance for ${item.month}: ${item.value}`}
            >
              <div
                className="absolute top-0 left-0 h-3 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-500 ease-out group-hover:scale-y-125"
                style={{
                  width: `${(item.value / maxValue) * 100}%`,
                  transitionDelay: `${index * 100}ms`,
                }}
              />
            </div>
            <span className="w-8 text-sm font-medium text-gray-900 dark:text-white">{item.value}</span>
          </div>
        ))}
      </div>

      {/* Footer Summary */}
      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg">
        <div className="text-sm text-gray-600 dark:text-gray-400">Total Revenue</div>
        <div className="text-2xl font-bold text-gray-900 dark:text-white">$24,892</div>
      </div>
    </div>
  );
};

export default ChartWidget;
