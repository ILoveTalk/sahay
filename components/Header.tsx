
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Logo from './Logo';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const activeLinkStyle = {
    color: '#A3B18A',
    textDecoration: 'underline',
  };

  useEffect(() => {
    // Disable body scroll when mobile menu is open
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    // Cleanup function
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <header className="sticky top-0 z-50 bg-[#FEFAE0]/80 backdrop-blur-sm shadow-sm">
      <nav className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <NavLink to="/" onClick={() => setIsMenuOpen(false)}>
          <Logo />
        </NavLink>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6 md:space-x-8 text-lg font-['Lato'] text-[#343A40]">
          <NavLink to="/" className="hover:text-[#A3B18A] transition-colors" style={({ isActive }) => isActive ? activeLinkStyle : undefined }>Home</NavLink>
          <NavLink to="/resources" className="hover:text-[#A3B18A] transition-colors" style={({ isActive }) => isActive ? activeLinkStyle : undefined }>Resources</NavLink>
          <NavLink to="/peer-support" className="hover:text-[#A3B18A] transition-colors" style={({ isActive }) => isActive ? activeLinkStyle : undefined }>Peer Support</NavLink>
          <NavLink to="/booking" className="hover:text-[#A3B18A] transition-colors" style={({ isActive }) => isActive ? activeLinkStyle : undefined }>Book a Session</NavLink>
          <NavLink to="/about" className="hover:text-[#A3B18A] transition-colors" style={({ isActive }) => isActive ? activeLinkStyle : undefined }>About</NavLink>
        </div>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#343A40]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#343A40]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#FEFAE0] shadow-xl animate-fade-in-down">
          <div className="flex flex-col items-center space-y-6 py-8 text-xl font-['Lato'] text-[#343A40]">
            <NavLink to="/" onClick={() => setIsMenuOpen(false)} style={({ isActive }) => isActive ? activeLinkStyle : undefined }>Home</NavLink>
            <NavLink to="/resources" onClick={() => setIsMenuOpen(false)} style={({ isActive }) => isActive ? activeLinkStyle : undefined }>Resources</NavLink>
            <NavLink to="/peer-support" onClick={() => setIsMenuOpen(false)} style={({ isActive }) => isActive ? activeLinkStyle : undefined }>Peer Support</NavLink>
            <NavLink to="/booking" onClick={() => setIsMenuOpen(false)} style={({ isActive }) => isActive ? activeLinkStyle : undefined }>Book a Session</NavLink>
            <NavLink to="/about" onClick={() => setIsMenuOpen(false)} style={({ isActive }) => isActive ? activeLinkStyle : undefined }>About</NavLink>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
