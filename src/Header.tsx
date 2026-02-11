import React from 'react';

const Header: React.FC = () => {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      // Height of the sticky header (h-14 = 56px)
      const headerOffset = 56; 
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className="sticky top-0 z-40 bg-white/70 backdrop-blur-xl border-b border-gray-200/50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-14 flex items-center justify-between">
        <a 
          href="#hero" 
          onClick={(e) => handleScroll(e, 'hero')} 
          className="text-xl font-semibold tracking-tight text-apple-dark cursor-pointer rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-blue focus-visible:ring-offset-2"
          aria-label="Villa Onar Home"
        >
          Villa Onar
        </a>
        <div className="flex items-center gap-6 text-[13px] font-medium tracking-wide">
          <a 
            href="#overview" 
            onClick={(e) => handleScroll(e, 'overview')} 
            className="hidden sm:block text-apple-dark hover:text-apple-blue transition-colors cursor-pointer rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-blue focus-visible:ring-offset-2"
          >
            Overview
          </a>
          <a 
            href="#about" 
            onClick={(e) => handleScroll(e, 'about')} 
            className="hidden sm:block text-apple-dark hover:text-apple-blue transition-colors cursor-pointer rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-blue focus-visible:ring-offset-2"
          >
            About
          </a>
          <a 
            href="#highlights" 
            onClick={(e) => handleScroll(e, 'highlights')} 
            className="hidden sm:block text-apple-dark hover:text-apple-blue transition-colors cursor-pointer rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-blue focus-visible:ring-offset-2"
          >
            Highlights
          </a>
          <a 
            href="#amenities" 
            onClick={(e) => handleScroll(e, 'amenities')} 
            className="hidden sm:block text-apple-dark hover:text-apple-blue transition-colors cursor-pointer rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-blue focus-visible:ring-offset-2"
          >
            Amenities
          </a>
          <a 
            href="#gallery" 
            onClick={(e) => handleScroll(e, 'gallery')} 
            className="hidden sm:block text-apple-dark hover:text-apple-blue transition-colors cursor-pointer rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-blue focus-visible:ring-offset-2"
          >
            Gallery
          </a>
          <a 
            href="#book" 
            onClick={(e) => handleScroll(e, 'book')} 
            className="bg-apple-blue text-white px-3 py-1 rounded-full hover:bg-apple-blueHover transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-blue focus-visible:ring-offset-2"
          >
            Reserve
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Header;