import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Overview from './components/Overview';
import About from './components/About';
import Highlights from './components/Highlights';
import Amenities from './components/Amenities';
import Gallery from './components/Gallery';
import Booking from './components/Booking';
import Footer from './components/Footer';
import Lightbox from './components/Lightbox';
import LegalModal, { LegalDocumentType } from './components/LegalModal';
import { ALL_IMAGE_IDS } from './constants';

const App: React.FC = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [activeLegalDoc, setActiveLegalDoc] = useState<LegalDocumentType>(null);

  const handleImageClick = (id: string) => {
    const index = ALL_IMAGE_IDS.indexOf(id);
    if (index !== -1) {
      setLightboxIndex(index);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-apple-dark relative">
      <Header />
      <main>
        <Hero onImageClick={handleImageClick} />
        <Overview onImageClick={handleImageClick} />
        <About />
        <Highlights onImageClick={handleImageClick} />
        <Amenities />
        <Gallery onImageClick={handleImageClick} />
        <Booking />
      </main>
      <Footer onOpenLegal={setActiveLegalDoc} />
      
      <Lightbox 
        selectedIndex={lightboxIndex} 
        onClose={() => setLightboxIndex(null)} 
        onNavigate={setLightboxIndex} 
      />
      
      <LegalModal 
        type={activeLegalDoc} 
        onClose={() => setActiveLegalDoc(null)} 
      />
    </div>
  );
};

export default App;