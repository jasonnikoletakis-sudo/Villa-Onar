import React from 'react';

const LocationMap: React.FC = () => {
  // Villa Onar precise coordinates
  const lat = "36.845193957215";
  const lng = "22.27330942646871";
  
  // Google Maps embed URL with exact coordinates
  const mapUrl = `https://maps.google.com/maps?q=${lat},${lng}&t=m&z=15&output=embed`;
  
  // Google Maps directions URL
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;

  return (
    <div className="bg-[#f5f5f7] rounded-[2rem] p-8 md:p-10 flex flex-col">
      <div className="mb-8">
        <h3 className="text-2xl font-semibold tracking-tight text-apple-dark mb-2">Explore the area</h3>
        <p className="text-gray-500 text-[15px] leading-relaxed">Discover pristine beaches and historical landmarks just a short drive away.</p>
      </div>
      <div className="w-full h-[400px] md:h-[450px] rounded-[1.5rem] overflow-hidden relative shadow-sm border border-gray-200/50 z-10 bg-gray-200 group">
        
        <iframe
          title="Villa Onar Location"
          src={mapUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 w-full h-full"
        ></iframe>
        
        {/* Floating Glassmorphic Directions Button */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
          <a 
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 bg-white/80 backdrop-blur-xl text-apple-dark text-sm font-semibold px-6 py-3.5 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/50 hover:bg-white hover:scale-105 hover:shadow-[0_8px_30px_rgb(0,0,0,0.16)] transition-all duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-apple-blue"
            aria-label="Get directions to Villa Onar on Google Maps"
          >
            <svg className="w-5 h-5 text-apple-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            Get Directions
          </a>
        </div>
        
      </div>
    </div>
  );
};

export default LocationMap;
