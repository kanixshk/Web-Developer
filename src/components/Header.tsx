import React, { useState } from 'react';
import { Menu, X, Heart, Shield, Users } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  openVolunteerModal: () => void;
}

export default function Header({ activeTab, setActiveTab, openVolunteerModal }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'projects', label: 'Our Initiatives' },
    { id: 'donation', label: 'Transparency & Donate' },
    { id: 'volunteer', label: 'Volunteer Portal' },
    { id: 'community', label: 'Impact Gallery' }
  ];

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/40 bg-white/70 backdrop-blur-md shadow-md shadow-deep-navy/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-20">
        {/* Brand Logo */}
        <button 
          onClick={() => { setActiveTab('home'); setIsOpen(false); }}
          className="flex items-center gap-2 cursor-pointer group text-left"
          id="header-logo-btn"
        >
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-105 transition-transform duration-200">
            <Heart className="w-6 h-6 fill-current" />
          </div>
          <div>
            <span className="font-display text-xl md:text-2xl font-bold text-primary block tracking-tight leading-none">InAmigos</span>
            <span className="font-sans text-[10px] tracking-widest uppercase font-bold text-on-surface-variant/70">Foundation</span>
          </div>
        </button>

        {/* Desktop Nav Items */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`font-display text-sm font-semibold tracking-tight cursor-pointer py-2 border-b-2 transition-all duration-200 ${
                activeTab === item.id
                  ? 'text-primary border-primary'
                  : 'text-on-surface-variant border-transparent hover:text-primary hover:border-primary/40'
              }`}
              id={`nav-item-${item.id}`}
            >
              {item.label}
            </button>
          ))}
          
          <button 
            onClick={openVolunteerModal}
            className="bg-accent-orange text-white px-6 py-2.5 rounded-full font-display font-semibold text-sm hover:scale-105 transition-transform duration-200 shadow-md shadow-accent-orange/20 cursor-pointer"
            id="volunteer-nav-btn"
          >
            Volunteer
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-primary p-2 focus:outline-none cursor-pointer rounded-lg hover:bg-surface-container"
          aria-label="Toggle Menu"
          id="mobile-menu-toggle"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-surface-container-high px-4 pt-2 pb-6 space-y-2 animate-fade-in">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setIsOpen(false);
              }}
              className={`block w-full text-left px-4 py-3 rounded-xl font-display font-semibold text-base transition-colors ${
                activeTab === item.id
                  ? 'bg-primary/10 text-primary'
                  : 'text-on-surface-variant hover:bg-surface-container'
              }`}
              id={`mobile-nav-item-${item.id}`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-4 border-t border-surface-container-high px-4">
            <button
              onClick={() => {
                openVolunteerModal();
                setIsOpen(false);
              }}
              className="w-full bg-accent-orange text-white py-3 rounded-full font-display font-semibold text-center hover:bg-accent-orange/95 shadow-md shadow-accent-orange/20 cursor-pointer"
              id="mobile-volunteer-nav-btn"
            >
              Volunteer
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
