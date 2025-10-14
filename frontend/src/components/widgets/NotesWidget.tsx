import React, { useState } from 'react';
import { StickyNote, Plus, Trash2 } from 'lucide-react';

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
}

const NotesWidget: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: '1',
      title: 'Meeting Notes',
      content: 'Discuss project timeline and deliverables',
      createdAt: new Date('2024-01-15'),
    },
    {
      id: '2',
      title: 'Ideas',
      content: 'New feature concepts for the dashboard',
      createdAt: new Date('2024-01-14'),
    },
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [newNote, setNewNote] = useState({ title: '', content: '' });

  const handleAddNote = () => {
    if (!newNote.title.trim() || !newNote.content.trim()) return;

    const note: Note = {
      id: Date.now().toString(),
      title: newNote.title.trim(),
      content: newNote.content.trim(),
      createdAt: new Date(),
    };

    setNotes([note, ...notes]);
    setNewNote({ title: '', content: '' });
    setIsAdding(false);
  };

  const handleDeleteNote = (id: string) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  };

  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 h-full flex flex-col"
      role="region"
      aria-label="Quick Notes"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full flex items-center justify-center">
            <StickyNote className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">Quick Notes</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{notes.length} notes</p>
          </div>
        </div>
        <button
          onClick={() => setIsAdding(!isAdding)}
          aria-label="Add new note"
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <Plus className="h-4 w-4 text-gray-500 dark:text-gray-400" />
        </button>
      </div>

      {/* Add Note Form */}
      {isAdding && (
        <div className="mb-4 p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
          <input
            type="text"
            aria-label="Note title"
            placeholder="Note title..."
            value={newNote.title}
            onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
            autoFocus
            className="w-full mb-2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          />
          <textarea
            aria-label="Note content"
            placeholder="Note content..."
            value={newNote.content}
            onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
            rows={3}
            className="w-full mb-3 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          />
          <div className="flex space-x-2">
            <button
              onClick={handleAddNote}
              className="px-3 py-1 bg-gradient-to-r from-yellow-500 to-orange-600 text-white rounded-md hover:from-yellow-600 hover:to-orange-700 transition-all text-sm"
            >
              Add Note
            </button>
            <button
              onClick={() => setIsAdding(false)}
              className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-all text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Notes List */}
      <div className="flex-1 overflow-y-auto space-y-3">
        {notes.map((note) => (
          <div
            key={note.id}
            className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800"
            aria-label={`Note titled ${note.title}`}
          >
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-medium text-gray-900 dark:text-white text-sm">{note.title}</h4>
              <button
                onClick={() => handleDeleteNote(note.id)}
                aria-label={`Delete note titled ${note.title}`}
                className="p-1 hover:bg-red-100 dark:hover:bg-red-900/30 rounded transition-colors"
              >
                <Trash2 className="h-3 w-3 text-red-500" />
              </button>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">{note.content}</p>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {note.createdAt.toLocaleDateString()}
            </div>
          </div>
        ))}

        {notes.length === 0 && !isAdding && (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <StickyNote className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No notes yet. Click the + button to add one!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotesWidget;
