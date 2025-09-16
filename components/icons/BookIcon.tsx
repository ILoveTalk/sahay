import React from 'react';

const BookIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM9 4h2v5l-1-0.75L9 9V4zm6 12H9v-2h6v2zm3-4H9v-2h9v2zm0-3H9V7h9v2z"/>
  </svg>
);

export default BookIcon;