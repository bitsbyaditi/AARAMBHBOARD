import React, { useEffect, useState } from 'react';
import { layoutAPI } from '../services/api';
import { LayoutDashboard, FileText, CloudRain, AlertCircle } from 'lucide-react';

const WidgetList: React.FC = () => {
  const [layout, setLayout] = useState<any[]>([]);
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const userId = user?.id || 'default-user';

  useEffect(() => {
    layoutAPI.loadLayout()
      .then((res) => {
        const saved = localStorage.getItem('dashboardLayout');
        const config = saved ? JSON.parse(saved) : res.data?.layout || [];
        setLayout(config);
      })
      .catch((err) => {
        console.error('Failed to load layout', err);
        setLayout([]);
      });
  }, []);

  const getIcon = (title: string) => {
    if (title.includes('Chart')) return <LayoutDashboard className="h-5 w-5 text-blue-500" />;
    if (title.includes('Notes')) return <FileText className="h-5 w-5 text-orange-500" />;
    if (title.includes('Weather')) return <CloudRain className="h-5 w-5 text-teal-500" />;
    return <AlertCircle className="h-5 w-5 text-pink-500" />;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
      {layout.length > 0 ? (
        layout.map((widget, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 shadow rounded p-4 space-y-2">
            <div className="flex items-center space-x-2">
              {getIcon(widget.title || '')}
              <h3 className="font-bold text-gray-900 dark:text-white">
                {widget.title || 'Untitled Widget'}
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              {widget.content || 'No content available.'}
            </p>
          </div>
        ))
      ) : (
        <p className="text-gray-500 dark:text-gray-400">
          No widgets found. Try saving your layout.
        </p>
      )}
    </div>
  );
};

export default WidgetList;
