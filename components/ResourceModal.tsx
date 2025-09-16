import React from 'react';
import type { Resource } from '../types';
import Modal from './Modal';

interface ResourceModalProps {
  resource: Resource;
  onClose: () => void;
}

const ResourceModal: React.FC<ResourceModalProps> = ({ resource, onClose }) => {
  return (
    <Modal isOpen={!!resource} onClose={onClose}>
        <div className="flex items-center justify-between p-4 border-b border-gray-300/50 bg-gray-50/50 rounded-t-xl">
            <h2 className="text-xl font-['Poppins'] font-semibold text-[#343A40] truncate pr-4">{resource.title}</h2>
            <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-800 transition-colors"
                aria-label="Close resource viewer"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
        <div className="flex-grow bg-gray-100 rounded-b-xl">
            <iframe
                src={resource.link}
                title={resource.title}
                className="w-full h-full border-0 rounded-b-xl"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>
        </div>
    </Modal>
  );
};

export default ResourceModal;