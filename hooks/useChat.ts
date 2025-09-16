
import { useState, useCallback, useEffect } from 'react';
import type { Message } from '../types';
import { getAIResponse, getInitialGreeting } from '../services/geminiService';

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchGreeting = async () => {
      const greeting = await getInitialGreeting();
      setMessages([{
        id: 'init',
        text: greeting,
        sender: 'ai'
      }]);
      setIsLoading(false);
    };
    fetchGreeting();
  }, []);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
    };

    setMessages(prevMessages => [...prevMessages, userMessage]);
    setIsLoading(true);

    const aiResponseText = await getAIResponse(text);

    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: aiResponseText,
      sender: 'ai',
    };
    
    setMessages(prevMessages => [...prevMessages, aiMessage]);
    setIsLoading(false);
  }, []);

  return { messages, isLoading, sendMessage };
};
