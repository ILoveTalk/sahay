import React from 'react';

const SparklesIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.5l1.09 2.72L16 6.31l-2.22 2.16.53 3.03L12 10.12l-2.31 1.38.53-3.03L8 6.31l2.91-1.09L12 2.5zm-5 5L6.09 5.22 4 4.13l2.22-.05.53-3.08L8.06 2.5l-2.31 1.38.53 3.03L4 9.13l2.91-1.09L8 5.5zm10 0l-1.09-2.28L14 2.13l2.22.05.53 3.08L18.06 6.5l-2.31-1.38-.53-3.03L18 9.13l-2.91-1.09L14 5.5zm-5 7.5l-1.09 2.72L8 16.31l2.22 2.16-.53 3.03L12 20.12l2.31 1.38-.53-3.03L16 16.31l-2.91-1.09L12 12.5z" />
    </svg>
);
export default SparklesIcon;
