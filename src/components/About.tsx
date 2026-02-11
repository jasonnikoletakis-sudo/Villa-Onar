import React from 'react';
import LocationMap from './LocationMap';

const Icons = {
  User: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
  ),
  MapPin: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
  ),
  Languages: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m5 8 6 6"/><path d="m4 14 6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="m22 22-5-10-5 10"/><path d="M14 18h6"/></svg>
  )
};

const About: React.FC = () => {
  return (
    <section id="about" className="scroll-mt-14 bg-white py-24 sm:py-32 border-t border-gray-100">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Description */}
        <div className="mb-20">
          <h2 className="text-4xl md:text-6xl font-semibold tracking-tighter text-apple-dark mb-8 leading-tight">
            Villa Onar. <br/>
            <span className="text-gray-400">A stone house with an amazing view.</span>
          </h2>
          
          <div className="space-y-6 text-lg md:text-xl text-gray-500 leading-relaxed tracking-tight">
            <p>
              Located in the village of Stoupa, just 1.5 km from Stoupa Beach, Villa Onar offers a cozy and modern retreat. This stone-built house provides free Wi-Fi, private parking, air conditioning, peace and quiet, and incredible views of the mountains and sea.
            </p>
            <p>
              The villa features three comfortable bedrooms, a bathroom, and a spacious living area with a fireplace. The fully equipped kitchen, with both indoor and outdoor dining spaces, opens to a sunny terrace, perfect for enjoying meals with amazing views. The house is air-conditioned and includes fresh linens, towels, and a flat-screen TV with streaming services in all rooms.
            </p>
            <p>
              The back garden of the house includes a jacuzzi that can seat up to four people. Around the jacuzzi, there are sunbeds for relaxing under the sun, as well as umbrellas for those who prefer shade. Villa Onar is perfect for families with children, offering a large outdoor area where kids can play freely. On sunny days, they can also have fun in the jacuzzi. The villa is equally ideal for large groups of friends looking to relax and enjoy their time together in Stoupa.
            </p>
            <p>
              Thanks to its location, Villa Onar provides a peaceful vacation experience. It is far enough from the village to avoid noise from roads and restaurants, yet close enough for a convenient walk to the village. Popular attractions near the villa include the Caves of Diros, 48 km away, the beautiful Kalogria Beach, just 1.8 km away, and nearby picturesque villages like Kardamyli and Agios Nikolaos.
            </p>
            <p>
              If you have any questions about the house or the village, I would be more than happy to answer them. Enjoy a relaxing stay at Villa Onar. Thank you!
            </p>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          
          {/* Host Card */}
          <div className="bg-[#f5f5f7] rounded-[2rem] p-8 md:p-10 flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 bg-apple-dark text-white rounded-full flex items-center justify-center mb-6">
                <Icons.User className="w-7 h-7" strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-semibold tracking-tight text-apple-dark mb-4">Meet Jason</h3>
              <p className="text-gray-500 text-[15px] leading-relaxed mb-8">
                Hi, I'm Jason! Growing up in a family with years of experience in hospitality since 2000, I've developed a true passion for creating amazing guest experiences. Managing this property gives me the chance to ensure every detail is just right for your stay. Feel free to reach out if you need anything—I'm here to help make your visit unforgettable!
              </p>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-500 font-medium bg-white px-5 py-3 rounded-full w-fit shadow-sm">
              <Icons.Languages className="w-5 h-5 text-apple-dark" strokeWidth={2} />
              Speaks Greek & English
            </div>
          </div>

          {/* Neighborhood Card */}
          <div className="bg-[#f5f5f7] rounded-[2rem] p-8 md:p-10">
            <div className="w-14 h-14 bg-apple-dark text-white rounded-full flex items-center justify-center mb-6">
              <Icons.MapPin className="w-7 h-7" strokeWidth={1.5} />
            </div>
            <h3 className="text-2xl font-semibold tracking-tight text-apple-dark mb-4">The Neighborhood</h3>
            <p className="text-gray-500 text-[15px] leading-relaxed">
              It's a quiet and beautiful area on the hill up in the road of Neohori with an astonishing view, nice paths and lovely houses. It's 15 minutes on foot from Stoupa and the best place to rest and relax away from the noise of the seashore.
            </p>
          </div>

        </div>

        {/* Interactive Map */}
        <LocationMap />

      </div>
    </section>
  );
};

export default About;
