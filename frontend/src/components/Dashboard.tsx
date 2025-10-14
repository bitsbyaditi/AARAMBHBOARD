import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { Menu, Save, Upload, RotateCcw } from 'lucide-react';
import Sidebar from './Sidebar';
import Chatbot from './Chatbot';
import ChartWidget from './widgets/ChartWidget';
import NotesWidget from './widgets/NotesWidget';
import PinnedTasks from './widgets/PinnedTasks';
import { layoutAPI } from '../services/api';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const ResponsiveGridLayout = WidthProvider(Responsive);

interface LayoutItem {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
  minW?: number;
  minH?: number;
}

const Dashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chatMinimized, setChatMinimized] = useState(false);
  const [layouts, setLayouts] = useState<{ [key: string]: LayoutItem[] }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState('Save Layout');
  const navigate = useNavigate();

  const defaultLayouts = {
    lg: [
      { i: 'chart', x: 0, y: 0, w: 6, h: 4 },
      { i: 'notes', x: 6, y: 0, w: 6, h: 4 },
      { i: 'tasks', x: 0, y: 4, w: 4, h: 3 },
      { i: 'chatbot', x: 4, y: 4, w: 8, h: 3 },
    ],
    md: [],
    sm: [],
    xs: [],
  };

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/login');
    } else {
      loadLayout();
    }
  }, []);

  const loadLayout = async () => {
    setIsLoading(true);
    try {
      const response = await layoutAPI.loadLayout();
      if (response.data?.layout && Object.keys(response.data.layout).length > 0) {
        setLayouts(response.data.layout);
      } else {
        setLayouts(defaultLayouts);
      }
    } catch (error) {
      console.error('Failed to load layout:', error);
      setLayouts(defaultLayouts);
    } finally {
      setIsLoading(false);
    }
  };

  const saveLayout = async () => {
    setIsLoading(true);
    try {
      await layoutAPI.saveLayout(layouts);
      setSaveStatus('Saved!');
      setTimeout(() => setSaveStatus('Save Layout'), 2000);
    } catch (error) {
      console.error('Failed to save layout:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetLayout = () => {
    setLayouts(defaultLayouts);
  };

  const handleLayoutChange = (_: LayoutItem[], updatedLayouts: { [key: string]: LayoutItem[] }) => {
    setLayouts(updatedLayouts);
  };

  const addWidgetToLayout = (type: string) => {
    const newItem: LayoutItem = {
      i: `${type}-${Date.now()}`,
      x: 0,
      y: Infinity,
      w: 4,
      h: 3,
    };
    setLayouts((prev) => ({
      ...prev,
      lg: [...(prev.lg || []), newItem],
    }));
  };

  const renderWidget = (key: string) => {
    try {
      if (key.startsWith('chart')) return <ChartWidget />;
      if (key.startsWith('notes')) return <NotesWidget />;
      if (key.startsWith('chatbot'))
        return (
          <Chatbot
            isMinimized={chatMinimized}
            onToggleMinimize={() => setChatMinimized(!chatMinimized)}
          />
        );
      if (key.startsWith('tasks')) return <PinnedTasks />;
      return <div className="p-4 text-red-500">Unknown widget: {key}</div>;
    } catch (err) {
      return <div className="p-4 text-red-500">Widget error: {String(err)}</div>;
    }
  };

  const userName = localStorage.getItem('userName') || 'User';

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        addWidgetToLayout={addWidgetToLayout}
      />

      <div className="flex-1 lg:pl-64">
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <Menu className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              </button>
              <div className="flex items-center space-x-3">
                <img src="/logo.jpg" alt="Logo" className="h-8 w-8 rounded-full shadow" />
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">AarambhBoard</h1>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={resetLayout}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200"
              >
                <RotateCcw className="h-4 w-4" />
                <span className="hidden sm:inline">Reset</span>
              </button>
              <button
                onClick={loadLayout}
                disabled={isLoading}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-all duration-200 disabled:opacity-50"
              >
                <Upload className="h-4 w-4" />
                <span className="hidden sm:inline">Load</span>
              </button>
              <button
                onClick={saveLayout}
                disabled={isLoading}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg hover:from-emerald-600 hover:to-teal-700 transition-all duration-200 disabled:opacity-50 shadow-lg hover:shadow-xl"
              >
                <Save className="h-4 w-4" />
                <span className="hidden sm:inline">{saveStatus}</span>
              </button>
            </div>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Welcome back, {userName}! Here's what's happening.
          </p>
        </header>

        <main className="p-6">
          <div className="h-screen">
            <ResponsiveGridLayout
              className="layout"
              layouts={layouts}
              onLayoutChange={handleLayoutChange}
              breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480 }}
              cols={{ lg: 12, md: 12, sm: 6, xs: 4 }}
              rowHeight={60}
              isDraggable
              isResizable
              margin={[16, 16]}
              containerPadding={[0, 0]}
              useCSSTransforms
            >
              {layouts.lg?.length > 0 ? (
                layouts.lg.map((item) => (
                  <div key={item.i} className="widget-container">
                    {renderWidget(item.i)}
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-500 dark:text-gray-400 p-6">
                  No widgets found in layout. Try resetting or loading a saved layout.
                </div>
              )}
            </ResponsiveGridLayout>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
