import React from 'react';
import { getImageUrl, BENTO_IMAGES } from '../constants';

interface HighlightsProps {
  onImageClick?: (id: string) => void;
}

const Highlights: React.FC<HighlightsProps> = ({ onImageClick }) => {
  const handleKeyDown = (e: React.KeyboardEvent, id: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onImageClick?.(id);
    }
  };

  return (
    <section id="highlights" className="scroll-mt-14 bg-[#f5f5f7] py-24">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-6xl font-semibold tracking-tighter text-apple-dark mb-12 text-center">
          Get the highlights.
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-6 md:grid-rows-2 gap-4 md:gap-6">
          
          {/* Large Primary Box */}
          <div 
            role="button"
            tabIndex={0}
            aria-label="View panoramic view highlight image"
            onClick={() => onImageClick?.(BENTO_IMAGES[0])}
            onKeyDown={(e) => handleKeyDown(e, BENTO_IMAGES[0])}
            className="col-span-1 md:col-span-4 row-span-1 bg-white rounded-[2rem] overflow-hidden relative group min-h-[400px] shadow-sm cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-apple-blue focus-visible:ring-offset-4"
          >
            <img 
              src={getImageUrl(BENTO_IMAGES[0], 'w1200')} 
              alt="" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
              decoding="async"
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-8 md:p-10">
              <h3 className="text-white text-3xl md:text-4xl font-semibold tracking-tight mb-2">
                A view to remember.
              </h3>
              <p className="text-gray-200 text-lg">Uninterrupted panoramas from every angle.</p>
            </div>
          </div>

          {/* Square Box 1 */}
          <div 
            role="button"
            tabIndex={0}
            aria-label="View comfort highlight image"
            onClick={() => onImageClick?.(BENTO_IMAGES[1])}
            onKeyDown={(e) => handleKeyDown(e, BENTO_IMAGES[1])}
            className="col-span-1 md:col-span-2 row-span-1 bg-white rounded-[2rem] overflow-hidden relative group min-h-[400px] shadow-sm cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-apple-blue focus-visible:ring-offset-4"
          >
            <img 
              src={getImageUrl(BENTO_IMAGES[1], 'w800')} 
              alt="" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
              decoding="async"
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-8">
              <h3 className="text-white text-2xl font-semibold tracking-tight">Pure comfort.</h3>
            </div>
          </div>

          {/* Square Box 2 (Text Only, not clickable) */}
          <div className="col-span-1 md:col-span-2 row-span-1 bg-apple-dark rounded-[2rem] overflow-hidden relative group min-h-[400px] shadow-sm flex flex-col justify-center items-center text-center p-8">
            <h3 className="text-white text-4xl font-bold tracking-tighter mb-4">Pro level space.</h3>
            <p className="text-gray-400 text-lg">Expansive living areas designed for ultimate relaxation and entertainment.</p>
          </div>

          {/* Medium Horizontal Box */}
          <div 
            role="button"
            tabIndex={0}
            aria-label="View impeccable details highlight image"
            onClick={() => onImageClick?.(BENTO_IMAGES[2])}
            onKeyDown={(e) => handleKeyDown(e, BENTO_IMAGES[2])}
            className="col-span-1 md:col-span-4 row-span-1 bg-white rounded-[2rem] overflow-hidden relative group min-h-[400px] shadow-sm cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-apple-blue focus-visible:ring-offset-4"
          >
            <img 
              src={getImageUrl(BENTO_IMAGES[2], 'w1200')} 
              alt="" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
              decoding="async"
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            <div className="absolute top-0 left-0 p-8 md:p-10">
              <h3 className="text-white text-3xl font-semibold tracking-tight">Impeccable details.</h3>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Highlights;
