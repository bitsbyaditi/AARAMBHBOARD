import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

interface ChatbotProps {
  isMinimized: boolean;
  onToggleMinimize: () => void;
}

const Chatbot: React.FC<ChatbotProps> = ({ isMinimized, onToggleMinimize }) => {
  const [messages, setMessages] = useState<string[]>([
    "Hi there! I'm AarambhBot. How can I help you today?",
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages((prev) => [...prev, userMessage]);

    // Simulate bot reply after short delay
    setTimeout(() => {
      const botReply = `You said: "${userMessage}". Let me help you with that!`;
      setMessages((prev) => [...prev, botReply]);
    }, 600);

    setInput("");
  };

  return (
    <div className="relative h-full">
      {/* Header with avatar and title */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <img
            src="/bot-avatar.gif"
            alt="Chatbot Avatar"
            className="w-10 h-10 rounded-full shadow-md ring-2 ring-pink-400 dark:ring-indigo-500"
          />
          <h3 className="font-semibold text-gray-900 dark:text-white">AarambhBot</h3>
        </div>
        <button
          onClick={onToggleMinimize}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition"
        >
          {isMinimized ? <MessageCircle className="h-5 w-5" /> : <X className="h-5 w-5" />}
        </button>
      </div>

      {/* Chat Window */}
      {!isMinimized && (
        <div className="flex flex-col h-full bg-white dark:bg-gray-800 rounded-lg shadow-inner p-4 space-y-3 overflow-y-auto">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-2 rounded-md text-sm max-w-xs ${
                index % 2 === 0
                  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-900 dark:text-blue-200 self-start'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white self-end'
              }`}
            >
              {msg}
            </div>
          ))}

          {/* Input */}
          <div className="mt-auto pt-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your message..."
              className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
