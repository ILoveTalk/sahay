
import React from 'react';
import Logo from './Logo';

const Footer: React.FC = () => (
  <footer className="bg-[#FEFAE0] mt-auto">
    <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
      <Logo />
      <p className="text-[#343A40] mt-4 sm:mt-0">&copy; {new Date().getFullYear()} Sahay. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;
