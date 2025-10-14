import React from 'react';
import {
  Settings,
  Moon,
  Sun,
  LogOut,
  LayoutDashboard,
  FileText,
  ClipboardList,
  PlusCircle,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  addWidgetToLayout?: (type: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar, addWidgetToLayout }) => {
  const { isDarkMode, toggleTheme } = useTheme();

  const widgetOptions = [
    { name: 'Chart', type: 'chart' },
    { name: 'Notes', type: 'notes' },
    { name: 'Chatbot', type: 'chatbot' },
    { name: 'Pinned Tasks', type: 'tasks' },
  ];

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-900 shadow-lg transform transition-transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="p-6 space-y-6 h-full flex flex-col justify-between">
        {/* Branding */}
        <div className="text-center space-y-2">
          <img src="/logo.jpg" alt="Logo" className="mx-auto h-10 w-10 rounded-full shadow-md" />
          <h2 className="text-xl font-bold text-indigo-600 dark:text-indigo-400">AarambhBoard</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Teacher Panel</p>
        </div>

        {/* Navigation */}
        <nav className="space-y-4">
          <button className="flex items-center space-x-2 w-full text-left px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300">
            <LayoutDashboard className="h-5 w-5" />
            <span>Dashboard</span>
          </button>
          <button className="flex items-center space-x-2 w-full text-left px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300">
            <FileText className="h-5 w-5" />
            <span>Assignments</span>
          </button>
          <button className="flex items-center space-x-2 w-full text-left px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300">
            <ClipboardList className="h-5 w-5" />
            <span>Quizzes</span>
          </button>
        </nav>

        {/* Widget Library */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400">Add Widgets</h3>
          {widgetOptions.map((widget) => (
            <button
              key={widget.type}
              onClick={() => addWidgetToLayout?.(widget.type)}
              className="flex items-center space-x-2 w-full text-left px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700"
            >
              <PlusCircle className="h-5 w-5" />
              <span>{widget.name}</span>
            </button>
          ))}
        </div>

        {/* Controls */}
        <div className="space-y-3">
          <button
            onClick={toggleTheme}
            className="flex items-center space-x-2 w-full text-left px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
          >
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            <span>Toggle Theme</span>
          </button>

          <button className="flex items-center space-x-2 w-full text-left px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300">
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </button>

          <button className="flex items-center space-x-2 w-full text-left px-4 py-2 rounded hover:bg-red-100 dark:hover:bg-red-800 text-red-600 dark:text-red-400">
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>

          <button
            onClick={toggleSidebar}
            className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded hover:from-blue-600 hover:to-indigo-700 transition-all"
          >
            Close Sidebar
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
