import React from 'react';

const ChatBubbleIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8 9H8V9h4v2zm4 0h-2V9h2v2zm0-3h-2V6h2v2zm-4 0H8V6h4v2z"/>
  </svg>
);

export default ChatBubbleIcon;