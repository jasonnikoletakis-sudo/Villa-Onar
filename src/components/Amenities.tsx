import React, { useEffect, useRef, useState, memo } from 'react';

const Icons = {
  Star: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
  ),
  Utensils: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></svg>
  ),
  Bath: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"/><line x1="10" y1="5" x2="8" y2="7"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="7" y1="19" x2="7" y2="21"/><line x1="17" y1="19" x2="17" y2="21"/></svg>
  ),
  Tv: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="20" height="15" x="2" y="7" rx="2" ry="2"/><polyline points="17 2 12 7 7 2"/></svg>
  ),
  Sun: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
  ),
  ShieldCheck: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg>
  )
};

const amenityCategories = [
  { title: "Most popular amenities", Icon: Icons.Star, items: ["Free Wi-Fi", "Free parking", "Non-smoking rooms", "Air conditioning", "Private bathroom", "Flat screen TV"] },
  { title: "Kitchen & Dining", Icon: Icons.Utensils, items: ["Dining table", "Coffee maker", "Toaster", "Oven", "Washing machine", "Microwave"] },
  { title: "Bedroom & Bathroom", Icon: Icons.Bath, items: ["Linens", "Wardrobe", "Toilet paper", "Towels", "Hair dryer", "Bathtub"] },
  { title: "Living & Multimedia", Icon: Icons.Tv, items: ["Sofa", "Fireplace", "Living room", "Streaming service", "DVD Player", "TV"] },
  { title: "Outdoor spaces & View", Icon: Icons.Sun, items: ["Outdoor furniture", "Sunny terrace", "Courtyard", "Sea view", "Mountain view", "Garden"] },
  { title: "Safety & General", Icon: Icons.ShieldCheck, items: ["Fire extinguishers", "Key access", "Safety gates", "Air conditioning", "Heating", "Smoke-free"] }
];

const AmenityCard = memo(({ category, idx, isVisible }: { category: typeof amenityCategories[0], idx: number, isVisible: boolean }) => {
  const IconComponent = category.Icon;
  return (
    <div 
      style={{ transitionDelay: `${idx * 50}ms` }}
      className={`bg-[#f5f5f7] rounded-[2rem] p-8 md:p-10 transition-all duration-500 stagger-item ${isVisible ? 'active' : ''} hover:scale-[1.01] hover:shadow-md`}
    >
      <IconComponent className="w-7 h-7 mb-5 text-apple-dark" strokeWidth={1.5} />
      <h3 className="text-2xl font-semibold tracking-tight text-apple-dark mb-6">
        {category.title}
      </h3>
      <ul className="space-y-3">
        {category.items.map((item, itemIdx) => (
          <li 
            key={itemIdx} 
            className="text-gray-500 text-[15px] leading-snug tracking-wide border-b border-gray-200/60 pb-3 last:border-0 last:pb-0"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
});

AmenityCard.displayName = 'AmenityCard';

const Amenities: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.1 });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="amenities" className="scroll-mt-14 bg-white py-24 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center md:text-left mb-16">
          <h2 className={`text-4xl md:text-6xl font-semibold tracking-tighter text-apple-dark reveal ${isVisible ? 'active' : ''}`}>
            Everything you need.
          </h2>
          <p className={`text-xl md:text-2xl text-gray-500 mt-4 tracking-tight reveal ${isVisible ? 'active' : ''} [transition-delay:50ms]`}>
            Thoughtfully equipped for an effortless stay.
          </p>
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {amenityCategories.map((category, idx) => (
            <AmenityCard key={idx} category={category} idx={idx} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Amenities;
