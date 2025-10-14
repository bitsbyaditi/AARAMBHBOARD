import React, { useState } from 'react';

const PinnedTasks: React.FC = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Finalize dashboard layout', done: false },
    { id: 2, text: 'Connect chatbot to backend', done: false },
    { id: 3, text: 'Prepare demo for AarambhBoard', done: false },
  ]);

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, done: !task.done } : task));
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md h-full">
      <h2 className="text-lg font-bold mb-3 text-gray-900 dark:text-white">📌 Pinned Tasks</h2>
      <ul className="space-y-2">
        {tasks.map(task => (
          <li key={task.id} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={task.done}
              onChange={() => toggleTask(task.id)}
              className="form-checkbox h-4 w-4 text-indigo-600"
            />
            <span className={task.done ? 'line-through text-gray-400' : 'text-gray-700 dark:text-gray-200'}>
              {task.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PinnedTasks;
