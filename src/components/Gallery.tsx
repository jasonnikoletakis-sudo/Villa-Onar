import React, { useState, useEffect, useRef, memo } from 'react';
import { getImageUrl, ALL_IMAGE_IDS } from '../constants';

interface GalleryProps {
  onImageClick?: (id: string) => void;
}

const ImageBox = memo(({ id, aspectClass, imgSize = 'w800', onClick }: { id: string, aspectClass: string, imgSize?: string, onClick: (id: string) => void }) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.disconnect();
        }
      },
      { rootMargin: '400px' } // Preload earlier for smoother experience
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick(id);
    }
  };

  return (
    <div 
      ref={containerRef}
      role="button"
      tabIndex={0}
      aria-label="View gallery image full screen"
      onClick={() => onClick(id)}
      onKeyDown={handleKeyDown}
      className={`bg-[#f5f5f7] rounded-[2rem] overflow-hidden group cursor-pointer relative transition-all duration-700 ease-out hover:scale-[1.015] hover:shadow-2xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-apple-blue focus-visible:ring-offset-4 will-change-transform ${aspectClass}`}
    >
      {isIntersecting && (
        <img 
          src={getImageUrl(id, imgSize)} 
          alt="Villa Onar detail" 
          onLoad={() => setIsLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-1000 ease-out group-hover:scale-110 ${isLoaded ? 'opacity-100' : 'opacity-0 scale-105'}`} 
          loading="lazy"
          decoding="async"
        />
      )}
      {!isLoaded && (
        <div className="absolute inset-0 animate-pulse-light bg-[#f5f5f7]" />
      )}
      {/* Subtle hover overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500 pointer-events-none" />
    </div>
  );
});

ImageBox.displayName = 'ImageBox';

const Gallery: React.FC<GalleryProps> = ({ onImageClick }) => {
  const [showAll, setShowAll] = useState(false);
  const initialImages = ALL_IMAGE_IDS.slice(5, 12);
  const remainingImages = ALL_IMAGE_IDS.filter(id => !initialImages.includes(id));

  const handleInternalClick = (id: string) => {
    onImageClick?.(id);
  };

  return (
    <section id="gallery" className="scroll-mt-14 bg-white py-24 sm:py-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center md:text-left">
        <h2 className="text-4xl md:text-6xl font-semibold tracking-tighter text-apple-dark mb-4 leading-tight">
          Take a closer look.
        </h2>
        <p className="text-xl md:text-2xl text-gray-400 mt-4 tracking-tight leading-relaxed">
          Explore every corner of Villa Onar.
        </p>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
          <ImageBox id={initialImages[0]} aspectClass="md:col-span-2 aspect-[4/3] md:aspect-[16/9]" imgSize="w1200" onClick={handleInternalClick} />
          <ImageBox id={initialImages[1]} aspectClass="md:col-span-1 aspect-[4/3] md:aspect-[3/4]" imgSize="w800" onClick={handleInternalClick} />
          <ImageBox id={initialImages[2]} aspectClass="md:col-span-1 aspect-[4/3] md:aspect-square" imgSize="w800" onClick={handleInternalClick} />
          <ImageBox id={initialImages[3]} aspectClass="md:col-span-1 aspect-[4/3] md:aspect-square" imgSize="w800" onClick={handleInternalClick} />
          <ImageBox id={initialImages[4]} aspectClass="md:col-span-1 aspect-[4/3] md:aspect-square" imgSize="w800" onClick={handleInternalClick} />
        </div>

        <div className="mt-4 md:mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          <ImageBox id={initialImages[5]} aspectClass="aspect-[4/3] md:aspect-[16/9]" imgSize="w1200" onClick={handleInternalClick} />
          <ImageBox id={initialImages[6]} aspectClass="aspect-[4/3] md:aspect-[16/9]" imgSize="w1200" onClick={handleInternalClick} />
        </div>
        
        {showAll && (
          <div className="mt-4 md:mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8" aria-live="polite">
            {remainingImages.map((id) => (
              <ImageBox key={id} id={id} aspectClass="aspect-square" imgSize="w800" onClick={handleInternalClick} />
            ))}
          </div>
        )}

        <div className="mt-20 flex justify-center">
          {!showAll ? (
            <button
              onClick={() => setShowAll(true)}
              aria-expanded="false"
              className="bg-apple-dark text-white font-medium text-lg px-10 py-5 rounded-full hover:bg-black transition-all hover:scale-105 shadow-[0_20px_50px_rgba(0,0,0,0.1)] hover:shadow-[0_25px_60px_rgba(0,0,0,0.2)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-apple-blue focus-visible:ring-offset-2 active:scale-95"
            >
              Show all {ALL_IMAGE_IDS.length} photos
            </button>
          ) : (
            <button
              onClick={() => {
                setShowAll(false);
                document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' });
              }}
              aria-expanded="true"
              className="bg-gray-100 text-apple-dark font-medium text-lg px-10 py-5 rounded-full hover:bg-gray-200 transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-apple-blue focus-visible:ring-offset-2 active:scale-95"
            >
              Show less
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
