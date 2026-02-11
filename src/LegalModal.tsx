import React, { useEffect, useRef } from 'react';

export type LegalDocumentType = 'privacy' | 'terms' | 'legal' | 'sitemap' | null;

interface LegalModalProps {
  type: LegalDocumentType;
  onClose: () => void;
}

const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (type) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      setTimeout(() => modalRef.current?.focus(), 100);
    }
    
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [type, onClose]);

  if (!type) return null;

  const content = {
    privacy: {
      title: "Privacy Policy",
      body: (
        <div className="space-y-6 text-gray-500 leading-relaxed">
          <p><strong>Effective Date:</strong> January 1, 2024</p>
          <p>At Villa Onar, we respect your privacy and are committed to protecting your personal data. This privacy policy explains how we collect, use, and safeguard your information when you visit our website or book a stay.</p>
          <h4 className="text-xl font-semibold text-apple-dark mt-8 mb-4">Information We Collect</h4>
          <p>When you make a reservation, we collect personal information such as your name, email address, phone number, and payment details. This is strictly used to process your booking and communicate important details regarding your stay.</p>
          <h4 className="text-xl font-semibold text-apple-dark mt-8 mb-4">How We Use Your Data</h4>
          <ul className="list-disc pl-5 space-y-2">
            <li>To process and secure your reservation.</li>
            <li>To communicate with you before, during, and after your stay.</li>
            <li>To improve our services and website experience.</li>
          </ul>
          <h4 className="text-xl font-semibold text-apple-dark mt-8 mb-4">Data Protection</h4>
          <p>We implement a variety of security measures to maintain the safety of your personal information. We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties without your consent.</p>
        </div>
      )
    },
    terms: {
      title: "Terms of Use",
      body: (
        <div className="space-y-6 text-gray-500 leading-relaxed">
          <p>Welcome to Villa Onar. By accessing our website and booking a stay, you agree to comply with the following terms and conditions.</p>
          <h4 className="text-xl font-semibold text-apple-dark mt-8 mb-4">Booking & Payment</h4>
          <p>A minimum stay of 4 nights is required. The maximum occupancy for the villa is 4 guests. Full payment or a required deposit must be completed to secure your dates. Prices vary by season (May-Oct).</p>
          <h4 className="text-xl font-semibold text-apple-dark mt-8 mb-4">Cancellation Policy</h4>
          <p>Cancellations made 30 days prior to the check-in date will receive a full refund. Cancellations made within 30 days of check-in are non-refundable unless otherwise stated or negotiated under extenuating circumstances.</p>
          <h4 className="text-xl font-semibold text-apple-dark mt-8 mb-4">House Rules</h4>
          <ul className="list-disc pl-5 space-y-2">
            <li>Check-in is at 3:00 PM; Check-out is at 11:00 AM.</li>
            <li>No smoking inside the villa.</li>
            <li>Pets are not allowed unless previously arranged.</li>
            <li>Please respect the peaceful nature of the neighborhood; no loud parties.</li>
          </ul>
        </div>
      )
    },
    legal: {
      title: "Legal Notice",
      body: (
        <div className="space-y-6 text-gray-500 leading-relaxed">
          <p><strong>Villa Onar</strong></p>
          <p>Stoupa, Messenia, Peloponnese, Greece</p>
          <h4 className="text-xl font-semibold text-apple-dark mt-8 mb-4">Disclaimer</h4>
          <p>The information provided on this website is for general informational purposes only. While we strive to keep the information up to date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability with respect to the website or the information, products, services, or related graphics contained on the website for any purpose.</p>
          <h4 className="text-xl font-semibold text-apple-dark mt-8 mb-4">Liability</h4>
          <p>Villa Onar is not liable for any personal injuries, property damage, or loss experienced by guests during their stay, except where such liability is mandated by local law due to negligence on our part.</p>
        </div>
      )
    },
    sitemap: {
      title: "Site Map",
      body: (
        <div className="space-y-4 text-gray-500 leading-relaxed">
          <p>Navigate quickly to any section of the Villa Onar website:</p>
          <ul className="space-y-4 mt-8">
            <li>
              <button onClick={() => { onClose(); document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-apple-blue hover:underline text-lg font-medium transition-all">Home / Hero</button>
            </li>
            <li>
              <button onClick={() => { onClose(); document.getElementById('overview')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-apple-blue hover:underline text-lg font-medium transition-all">Overview</button>
            </li>
            <li>
              <button onClick={() => { onClose(); document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-apple-blue hover:underline text-lg font-medium transition-all">About the Villa & Neighborhood</button>
            </li>
            <li>
              <button onClick={() => { onClose(); document.getElementById('highlights')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-apple-blue hover:underline text-lg font-medium transition-all">Highlights</button>
            </li>
            <li>
              <button onClick={() => { onClose(); document.getElementById('amenities')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-apple-blue hover:underline text-lg font-medium transition-all">Amenities</button>
            </li>
            <li>
              <button onClick={() => { onClose(); document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-apple-blue hover:underline text-lg font-medium transition-all">Image Gallery</button>
            </li>
            <li>
              <button onClick={() => { onClose(); document.getElementById('book')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-apple-blue hover:underline text-lg font-medium transition-all">Reserve / Booking Calendar</button>
            </li>
          </ul>
        </div>
      )
    }
  };

  const currentContent = content[type];

  return (
    <div 
      className="fixed inset-0 z-[150] flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity p-4 sm:p-6"
      onClick={onClose}
    >
      <div 
        ref={modalRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden outline-none animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-10">
          <h2 id="modal-title" className="text-2xl font-semibold tracking-tight text-apple-dark">
            {currentContent.title}
          </h2>
          <button 
            onClick={onClose}
            className="p-2 -mr-2 text-gray-400 hover:text-apple-dark transition-colors rounded-full hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-blue"
            aria-label="Close modal"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>
        
        {/* Scrollable Content */}
        <div className="p-8 overflow-y-auto overscroll-contain">
          {currentContent.body}
        </div>
        
        {/* Footer */}
        <div className="px-8 py-6 border-t border-gray-100 bg-gray-50 flex justify-end">
          <button 
            onClick={onClose}
            className="bg-apple-dark text-white px-6 py-2.5 rounded-full font-medium hover:bg-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-blue focus-visible:ring-offset-2"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default LegalModal;