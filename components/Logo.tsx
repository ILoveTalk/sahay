import React from 'react';
import LeafIcon from './icons/LeafIcon';

const Logo: React.FC = () => (
  <div className="flex items-center gap-3">
    <img src="https://raw.githubusercontent.com/ILoveTalk/sahay/refs/heads/main/assets/logo.png" alt="Sahay Logo" className="w-8 h-8" />
    <span className="text-3xl font-['Poppins'] font-semibold text-[#343A40]">
      Sahay
    </span>
  </div>
);

export default Logo;
