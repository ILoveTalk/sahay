
import React, { useState, useRef, useEffect } from 'react';
import type { Message } from '../types';
import { useChat } from '../hooks/useChat';

const ChatMessage: React.FC<{ message: Message }> = ({ message }) => {
  const isUser = message.sender === 'user';
  return (
    <div className={`flex items-end ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg px-4 py-3 rounded-2xl ${
          isUser
            ? 'bg-[#A3B18A] text-[#343A40] rounded-br-none'
            : 'bg-white text-[#343A40] rounded-bl-none'
        } shadow-sm`}
      >
        <p className="text-base leading-relaxed break-words">{message.text}</p>
      </div>
    </div>
  );
};

const ChatPage: React.FC = () => {
  const { messages, isLoading, sendMessage } = useChat();
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading || !inputText.trim()) return;
    sendMessage(inputText);
    setInputText('');
  };

  return (
    <div className="container mx-auto max-w-3xl h-[calc(100vh-150px)] sm:h-[calc(100vh-160px)] flex flex-col p-2 sm:p-4">
      <div className="flex-grow overflow-y-auto space-y-6 pr-2">
        {messages.map(msg => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
        {isLoading && (
           <div className="flex items-end justify-start">
            <div className="max-w-sm md:max-w-md lg:max-w-lg px-4 py-3 rounded-2xl bg-white text-[#343A40] rounded-bl-none shadow-sm">
                <div className="flex items-center space-x-2">
                    <p className="text-base text-gray-500 italic">Sahay is typing</p>
                    <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></span>
                </div>
            </div>
           </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="mt-auto pt-4">
        <form onSubmit={handleSend} className="relative">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your message..."
            className="w-full pl-4 pr-20 py-3 rounded-full border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#A3B18A] focus:border-transparent transition"
            autoFocus
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#A3B18A] text-[#343A40] rounded-full h-10 w-10 flex items-center justify-center hover:bg-opacity-90 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            aria-label="Send message"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatPage;
