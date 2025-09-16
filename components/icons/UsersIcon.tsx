import React from 'react';

const UsersIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M16.5 13.5c-1.2 0-3.5 1-3.5 1.5v1h7v-1c0-.5-2.3-1.5-3.5-1.5zM13 8.5c0 1.1.9 2 2 2s2-.9 2-2-.9-2-2-2-2 .9-2 2zM15 12c-2.7 0-8 1.3-8 4v3h16v-3c0-2.7-5.3-4-8-4zM8 8.5c0 1.1.9 2 2 2s2-.9 2-2-.9-2-2-2-2 .9-2 2zM10 12c-2.2 0-4.5.8-5.3 1.9.8-1.5 2.5-2.4 4.3-2.4.6 0 1.2.1 1.7.3-1-1-2.4-1.8-4.7-1.8z"/>
  </svg>
);

export default UsersIcon;