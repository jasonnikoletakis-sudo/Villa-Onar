import React, { useEffect, useState, useRef } from 'react';
import { getImageUrl, HERO_IMAGE_ID } from '../constants';

interface HeroProps {
  onImageClick?: (id: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onImageClick }) => {
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onImageClick?.(HERO_IMAGE_ID);
    }
  };

  // Parallax scale calculation: subtle zoom in as you scroll down
  const parallaxScale = 1 + (scrollY * 0.00008);
  const parallaxOpacity = Math.max(0, 1 - scrollY / 800);

  return (
    <section id="hero" className="scroll-mt-14 bg-white pt-24 pb-16 flex flex-col items-center text-center overflow-hidden">
      <div 
        className="px-4 transition-opacity duration-300"
        style={{ opacity: parallaxOpacity }}
      >
        <h1 className="text-5xl sm:text-7xl md:text-[88px] font-semibold tracking-tighter text-apple-dark mb-4 leading-[1.05] opacity-0 animate-fade-up [animation-delay:200ms]">
          Villa Onar.
        </h1>
        <p className="text-2xl sm:text-3xl md:text-4xl text-gray-400 font-medium tracking-tight mb-10 opacity-0 animate-fade-up [animation-delay:400ms]">
          Serenity. Mastered.
        </p>
        <p className="text-lg md:text-xl text-gray-500 mb-12 max-w-2xl mx-auto opacity-0 animate-fade-up [animation-delay:600ms] px-4 leading-relaxed">
          Experience the ultimate escape. Designed with meticulous attention to detail, 
          Villa Onar blends modern luxury with untouched natural beauty.
        </p>
      </div>
      
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mt-4 opacity-0 animate-fade-up [animation-delay:800ms]">
        <div 
          ref={heroRef}
          role="button"
          tabIndex={0}
          aria-label="View high resolution exterior photo of Villa Onar"
          onClick={() => onImageClick?.(HERO_IMAGE_ID)}
          onKeyDown={handleKeyDown}
          className="relative rounded-[2.5rem] overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] bg-gray-100 h-[55vh] sm:h-[65vh] md:h-[82vh] w-full cursor-pointer group focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-apple-blue focus-visible:ring-offset-4"
        >
          {/* Main Image Container for Combined Effects */}
          <div 
            className="w-full h-full overflow-hidden transition-transform duration-100 ease-out"
            style={{ 
              transform: `scale(${parallaxScale})`,
              willChange: 'transform'
            }}
          >
            {/* The actual image with Ken Burns loop */}
            <img
              src={getImageUrl(HERO_IMAGE_ID, 'w1200')}
              srcSet={`${getImageUrl(HERO_IMAGE_ID, 'w800')} 800w, ${getImageUrl(HERO_IMAGE_ID, 'w1200')} 1200w, ${getImageUrl(HERO_IMAGE_ID, 'w1600')} 1600w, ${getImageUrl(HERO_IMAGE_ID, 'w1920')} 1920w`}
              sizes="(max-width: 768px) 800px, (max-width: 1200px) 1200px, 1600px"
              alt="Villa Onar Full Exterior"
              className="w-full h-full object-cover object-center animate-hero-image animate-ken-burns transition-transform duration-1000 group-hover:scale-110"
              loading="eager"
              fetchPriority="high"
              decoding="sync"
            />
          </div>
          
          {/* Subtle vignette and glass overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-60 pointer-events-none" />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-1000 pointer-events-none" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
