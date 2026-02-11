import React, { useEffect, useRef, useState, memo } from 'react';
import { getImageUrl, ALL_IMAGE_IDS } from '../constants';

interface OverviewProps {
  onImageClick?: (id: string) => void;
}

const RevealSection = memo(({ children, type = 'up' }: { children: React.ReactNode, type?: 'up' | 'left' | 'right' }) => {
  const [isActive, setIsActive] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsActive(true);
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.1 });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const baseClass = type === 'up' ? 'reveal' : type === 'left' ? 'reveal-left' : 'reveal-right';
  return (
    <div ref={ref} className={`${baseClass} ${isActive ? 'active' : ''}`}>
      {children}
    </div>
  );
});

RevealSection.displayName = 'RevealSection';

const Overview: React.FC<OverviewProps> = ({ onImageClick }) => {
  const handleKeyDown = (e: React.KeyboardEvent, id: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onImageClick?.(id);
    }
  };

  return (
    <section id="overview" className="scroll-mt-14 bg-white py-24 sm:py-40 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-32 sm:mb-48">
        <RevealSection>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[76px] font-semibold tracking-tighter text-apple-dark mb-8 leading-[1.1]">
            A sanctuary of natural light.
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 tracking-tight max-w-3xl mx-auto leading-relaxed">
            Every space is purposefully designed to erase the boundaries between indoors and out, allowing the landscape to become part of your living experience.
          </p>
        </RevealSection>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-32 sm:space-y-56">
        <div className="flex flex-col md:flex-row items-center gap-16 md:gap-24">
          <div className="flex-1 md:pr-12">
            <RevealSection type="left">
              <div className="space-y-12">
                <h3 className="text-3xl sm:text-4xl md:text-[52px] font-semibold tracking-tighter text-apple-dark leading-tight">
                  Space to breathe.
                </h3>
                <p className="text-lg md:text-xl text-gray-500 tracking-tight leading-relaxed">
                  Generous open-plan living areas provide the perfect setting for both intimate gatherings and quiet reflection. Minimalist aesthetics ensure nothing distracts from the view.
                </p>
              </div>
            </RevealSection>
          </div>
          <div className="flex-1 w-full">
            <RevealSection type="right">
              <div 
                role="button"
                tabIndex={0}
                aria-label="View high resolution living area image"
                onClick={() => onImageClick?.(ALL_IMAGE_IDS[14])}
                onKeyDown={(e) => handleKeyDown(e, ALL_IMAGE_IDS[14])}
                className="rounded-[2.5rem] overflow-hidden bg-gray-100 aspect-square md:aspect-[4/3] shadow-lg cursor-pointer group focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-apple-blue focus-visible:ring-offset-4 transition-shadow hover:shadow-2xl"
              >
                <img
                  src={getImageUrl(ALL_IMAGE_IDS[14], 'w800')}
                  alt="Living area"
                  className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-108"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </RevealSection>
          </div>
        </div>

        <div className="flex flex-col md:flex-row-reverse items-center gap-16 md:gap-24">
          <div className="flex-1 md:pl-12">
            <RevealSection type="right">
              <div className="space-y-12">
                <h3 className="text-3xl sm:text-4xl md:text-[52px] font-semibold tracking-tighter text-apple-dark leading-tight">
                  Rest easy.
                </h3>
                <p className="text-lg md:text-xl text-gray-500 tracking-tight leading-relaxed">
                  Bedrooms crafted as private retreats. Premium materials, acoustic perfection, and beds that guarantee a restorative night's sleep after a day in the sun.
                </p>
              </div>
            </RevealSection>
          </div>
          <div className="flex-1 w-full">
            <RevealSection type="left">
              <div 
                role="button"
                tabIndex={0}
                aria-label="View high resolution bedroom image"
                onClick={() => onImageClick?.(ALL_IMAGE_IDS[16])}
                onKeyDown={(e) => handleKeyDown(e, ALL_IMAGE_IDS[16])}
                className="rounded-[2.5rem] overflow-hidden bg-gray-100 aspect-square md:aspect-[4/3] shadow-lg cursor-pointer group focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-apple-blue focus-visible:ring-offset-4 transition-shadow hover:shadow-2xl"
              >
                <img
                  src={getImageUrl(ALL_IMAGE_IDS[16], 'w800')}
                  alt="Bedroom"
                  className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-108"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </RevealSection>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Overview;