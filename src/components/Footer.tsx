import React from 'react';
import { LegalDocumentType } from './LegalModal';

interface FooterProps {
  onOpenLegal: (type: LegalDocumentType) => void;
}

const Footer: React.FC<FooterProps> = ({ onOpenLegal }) => {
  return (
    <footer className="bg-[#f5f5f7] pt-8 pb-12 border-t border-gray-300">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-xs text-gray-500 space-y-3 mb-6">
          <p>1. Price per night is subject to change based on seasonality and availability.</p>
          <p>2. Images shown are for illustrative purposes. Actual setup may vary slightly.</p>
        </div>
        
        <div className="border-t border-gray-300 pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <div>
            Copyright © {new Date().getFullYear()} Villa Onar Inc. All rights reserved.
          </div>
          <div className="flex flex-wrap justify-center space-x-4">
            <button 
              onClick={() => onOpenLegal('privacy')} 
              className="hover:text-apple-dark hover:underline transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-blue"
            >
              Privacy Policy
            </button>
            <span className="border-l border-gray-400"></span>
            <button 
              onClick={() => onOpenLegal('terms')} 
              className="hover:text-apple-dark hover:underline transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-blue"
            >
              Terms of Use
            </button>
            <span className="border-l border-gray-400"></span>
            <button 
              onClick={() => onOpenLegal('legal')} 
              className="hover:text-apple-dark hover:underline transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-blue"
            >
              Legal
            </button>
            <span className="border-l border-gray-400"></span>
            <button 
              onClick={() => onOpenLegal('sitemap')} 
              className="hover:text-apple-dark hover:underline transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-blue"
            >
              Site Map
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
