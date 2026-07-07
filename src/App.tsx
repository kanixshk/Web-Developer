import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import ProjectsHub from './components/ProjectsHub';
import DonationHub from './components/DonationHub';
import VolunteerPortal from './components/VolunteerPortal';
import GalleryWall from './components/GalleryWall';
import InitiativeDetailModal from './components/InitiativeDetailModal';
import Footer from './components/Footer';
import { Initiative } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedInitiative, setSelectedInitiative] = useState<Initiative | null>(null);
  const [preSelectedInitId, setPreSelectedInitId] = useState<string>('');

  // Scroll to top on tab change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);

  // Handle direct navigation to Donation with preset initiative ID
  const handleDonateClick = (initiativeId: string) => {
    setPreSelectedInitId(initiativeId);
    setActiveTab('donation');
    setSelectedInitiative(null); // Close modal if open
  };

  // Handle direct navigation to Volunteer with preset initiative ID
  const handleVolunteerClick = (initiativeId: string) => {
    setPreSelectedInitId(initiativeId);
    setActiveTab('volunteer');
    setSelectedInitiative(null); // Close modal if open
  };

  const handleOpenGeneralVolunteer = () => {
    setPreSelectedInitId('');
    setActiveTab('volunteer');
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface-lowest text-on-surface select-none font-sans" id="app-root-container">
      {/* Background glow overlay */}
      <div className="fixed inset-0 pointer-events-none z-0 cursor-glow opacity-60"></div>

      {/* Navigation Header */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        openVolunteerModal={handleOpenGeneralVolunteer}
      />

      {/* Main Screen Router */}
      <main className="flex-grow z-10">
        {activeTab === 'home' && (
          <Dashboard 
            setActiveTab={setActiveTab}
            setSelectedInitiative={setSelectedInitiative}
            openVolunteerModalWithInitiative={handleVolunteerClick}
          />
        )}

        {activeTab === 'projects' && (
          <ProjectsHub 
            onDonateClick={handleDonateClick}
            onVolunteerClick={handleVolunteerClick}
            setSelectedInitiative={setSelectedInitiative}
          />
        )}

        {activeTab === 'donation' && (
          <DonationHub 
            initialInitiativeId={preSelectedInitId}
          />
        )}

        {activeTab === 'volunteer' && (
          <VolunteerPortal 
            initialInitiativeId={preSelectedInitId}
          />
        )}

        {activeTab === 'community' && (
          <GalleryWall />
        )}
      </main>

      {/* Campaign Deep Dive Overlay Modal */}
      {selectedInitiative && (
        <InitiativeDetailModal 
          initiative={selectedInitiative}
          onClose={() => setSelectedInitiative(null)}
          onDonateClick={handleDonateClick}
          onVolunteerClick={handleVolunteerClick}
        />
      )}

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}
