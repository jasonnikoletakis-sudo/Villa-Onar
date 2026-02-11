import React, { useState, useMemo, useEffect } from 'react';

type Step = 'select' | 'contact' | 'processing';

const Booking: React.FC = () => {
  const [step, setStep] = useState<Step>('select');
  
  // Booking Selection State
  const [guests, setGuests] = useState<number>(2);
  
  // Smart Initial Month: If viewed in off-season (Nov-Apr), jump to next open May.
  const [currentMonth, setCurrentMonth] = useState<Date>(() => {
    const d = new Date();
    d.setDate(1);
    d.setHours(0,0,0,0);
    const m = d.getMonth();
    if (m > 9) { // Nov, Dec -> Next Year May
      d.setFullYear(d.getFullYear() + 1);
      d.setMonth(4); 
    } else if (m < 4) { // Jan - Apr -> This Year May
      d.setMonth(4);
    }
    return d;
  });
  
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  
  // Contact Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    requests: ''
  });

  // Helper: Check if a date falls within the open season (May = 4 to Oct = 9)
  const isDateOpen = (date: Date) => {
    const m = date.getMonth();
    return m >= 4 && m <= 9;
  };

  // Helper: Get price for a specific night
  const getNightPrice = (date: Date) => {
    const m = date.getMonth();
    if (m === 6 || m === 7) return 195; // July, August
    return 165; // May, June, September, October
  };

  // Calculate nights and total dynamic cost
  const { nights, totalCost } = useMemo(() => {
    if (!checkIn || !checkOut || checkOut <= checkIn) {
      return { nights: 0, totalCost: 0 };
    }
    
    let nightsCount = 0;
    let cost = 0;
    let currentDate = new Date(checkIn);

    while (currentDate < checkOut) {
      nightsCount++;
      cost += getNightPrice(currentDate);
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return { nights: nightsCount, totalCost: cost };
  }, [checkIn, checkOut]);

  // Calendar Logic
  const daysInMonth = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const days: (Date | null)[] = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(new Date(year, month, i));
    
    return days;
  }, [currentMonth]);

  const isDisabled = (day: Date) => {
    const today = new Date();
    today.setHours(0,0,0,0);
    if (day < today) return true;

    // If we are selecting a checkout date
    if (checkIn && !checkOut) {
      if (day > checkIn) {
        // Enforce minimum 4 nights stay
        const diffDays = Math.round((day.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
        if (diffDays < 4) return true;

        // Allow checking out the day after an open night (e.g., Nov 1st if check-in is Oct 31st)
        const nightBefore = new Date(day);
        nightBefore.setDate(day.getDate() - 1);
        return !isDateOpen(nightBefore);
      }
    }
    
    // Otherwise, it must be an open season date
    return !isDateOpen(day);
  };

  const handleDayClick = (day: Date) => {
    if (isDisabled(day)) return;

    if (!checkIn || (checkIn && checkOut)) {
      setCheckIn(day);
      setCheckOut(null);
    } else if (checkIn && !checkOut) {
      if (day > checkIn) {
        setCheckOut(day);
      } else {
        setCheckIn(day);
      }
    }
  };

  const nextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  const prevMonth = () => {
    const today = new Date();
    today.setDate(1);
    today.setHours(0,0,0,0);
    const newMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1);
    
    if (newMonth >= today) {
      setCurrentMonth(newMonth);
    }
  };

  const isSelected = (day: Date) => {
    if (checkIn && day.getTime() === checkIn.getTime()) return true;
    if (checkOut && day.getTime() === checkOut.getTime()) return true;
    return false;
  };

  const isInRange = (day: Date) => {
    if (checkIn && checkOut) {
      return day > checkIn && day < checkOut;
    }
    return false;
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('processing');
  };

  // Processing simulation
  useEffect(() => {
    if (step === 'processing') {
      const timer = setTimeout(() => {
        // Here you would normally redirect to Stripe/PayPal or show final success
        // Simulating redirect by staying in this state for visual effect
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  return (
    <section id="book" className="scroll-mt-14 bg-[#f5f5f7] py-24 border-t border-gray-200">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-semibold tracking-tighter text-apple-dark mb-4">
            Secure your stay.
          </h2>
          <p className="text-xl text-gray-500 tracking-tight">
            Reserve your dates at Villa Onar today.
          </p>
        </div>

        <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
          
          {/* STEP 1: DATES & GUESTS */}
          {step === 'select' && (
            <div className="grid grid-cols-1 lg:grid-cols-5 divide-y lg:divide-y-0 lg:divide-x divide-gray-100">
              
              {/* Calendar Section */}
              <div className="lg:col-span-3 p-8 md:p-12">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-semibold text-apple-dark">Select Dates</h3>
                  <div className="flex items-center gap-4">
                    <button onClick={prevMonth} className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-500 hover:text-apple-dark" aria-label="Previous month">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                    </button>
                    <span className="text-[17px] font-semibold text-apple-dark w-36 text-center flex flex-col items-center leading-tight">
                      {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                      {!isDateOpen(currentMonth) && currentMonth.getMonth() !== 10 && (
                        <span className="text-[10px] uppercase tracking-wider text-gray-400 mt-1">Off Season</span>
                      )}
                    </span>
                    <button onClick={nextMonth} className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-500 hover:text-apple-dark" aria-label="Next month">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                    </button>
                  </div>
                </div>

                {/* Calendar Grid */}
                <div className="mb-2 grid grid-cols-7 gap-1 text-center">
                  {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
                    <div key={d} className="text-xs font-semibold text-gray-400 uppercase tracking-wider py-2">{d}</div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-y-2 gap-x-1">
                  {daysInMonth.map((day, idx) => {
                    if (!day) return <div key={`empty-${idx}`} className="h-12" />;
                    
                    const disabled = isDisabled(day);
                    const selected = isSelected(day);
                    const inRange = isInRange(day);
                    
                    let bgClass = "bg-white hover:bg-gray-100 text-apple-dark";
                    if (disabled) bgClass = "text-gray-300 cursor-not-allowed";
                    else if (selected) bgClass = "bg-apple-dark text-white shadow-md scale-105 z-10";
                    else if (inRange) bgClass = "bg-gray-100 text-apple-dark rounded-none";
                    
                    // Connect rounded corners for ranges
                    let roundedClass = "rounded-full";
                    if (inRange) roundedClass = "";
                    if (checkIn && checkOut) {
                      if (day.getTime() === checkIn.getTime()) roundedClass = "rounded-l-full rounded-r-none";
                      if (day.getTime() === checkOut.getTime()) roundedClass = "rounded-r-full rounded-l-none";
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleDayClick(day)}
                        disabled={disabled}
                        className={`h-12 w-full flex items-center justify-center text-[15px] font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-blue relative ${bgClass} ${roundedClass}`}
                      >
                        {day.getDate()}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Sidebar Section */}
              <div className="lg:col-span-2 p-8 md:p-12 bg-gray-50/50 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-semibold text-apple-dark mb-8">Details</h3>
                  
                  {/* Guests Selector */}
                  <div className="flex flex-col mb-8">
                    <label className="text-sm font-semibold tracking-wide text-gray-500 mb-3 uppercase">Guests</label>
                    <div className="flex items-center justify-between bg-white border border-gray-200 rounded-2xl p-2 shadow-sm">
                      <button 
                        onClick={() => setGuests(Math.max(1, guests - 1))}
                        disabled={guests <= 1}
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-xl text-apple-dark hover:bg-gray-100 disabled:opacity-30 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-blue"
                      >
                        -
                      </button>
                      <span className="text-xl font-medium text-apple-dark w-12 text-center">{guests}</span>
                      <button 
                        onClick={() => setGuests(Math.min(4, guests + 1))}
                        disabled={guests >= 4}
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-xl text-apple-dark hover:bg-gray-100 disabled:opacity-30 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-blue"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Summary */}
                  {checkIn && checkOut ? (
                    <div className="space-y-4 animate-fade-in">
                      <div className="flex justify-between text-[15px] text-gray-500">
                        <span>Stay ({nights} {nights === 1 ? 'night' : 'nights'})</span>
                        <span>€{totalCost.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-[15px] text-gray-500">
                        <span>Cleaning fee</span>
                        <span>€0</span>
                      </div>
                      <div className="pt-4 border-t border-gray-200 flex justify-between items-center">
                        <span className="text-lg font-semibold text-apple-dark">Total</span>
                        <span className="text-2xl font-semibold text-apple-dark">€{totalCost.toLocaleString()}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="text-gray-400 text-sm italic space-y-4">
                      <p>Please select check-in and check-out dates on the calendar to see the total cost.</p>
                      
                      <div className="bg-gray-100/70 p-4 rounded-2xl not-italic border border-gray-200/50">
                        <p className="font-semibold text-apple-dark mb-3 text-[15px]">Rules & Pricing</p>
                        <ul className="space-y-2 text-[13px] text-gray-500 font-medium">
                          <li className="flex justify-between"><span>May, Jun, Sep, Oct</span> <span>€165 / night</span></li>
                          <li className="flex justify-between"><span>July & August</span> <span>€195 / night</span></li>
                          <li className="flex justify-between pt-2 mt-2 border-t border-gray-200"><span>Minimum stay</span> <span>4 nights</span></li>
                          <li className="flex justify-between"><span>Maximum capacity</span> <span>4 guests</span></li>
                        </ul>
                      </div>
                    </div>
                  )}
                </div>

                <button 
                  onClick={() => setStep('contact')}
                  disabled={!checkIn || !checkOut}
                  className="w-full mt-8 bg-apple-blue text-white font-medium text-lg px-8 py-4 rounded-full hover:bg-apple-blueHover transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-apple-blue focus-visible:ring-offset-2"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: CONTACT DETAILS */}
          {step === 'contact' && (
            <div className="grid grid-cols-1 lg:grid-cols-5 divide-y lg:divide-y-0 lg:divide-x divide-gray-100">
              
              {/* Summary Sidebar */}
              <div className="lg:col-span-2 p-8 md:p-12 bg-gray-50/50 flex flex-col order-2 lg:order-1">
                <button 
                  onClick={() => setStep('select')}
                  className="self-start mb-8 text-sm font-medium text-gray-500 hover:text-apple-dark flex items-center gap-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-blue rounded-md"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                  Back to Calendar
                </button>
                
                <h3 className="text-2xl font-semibold text-apple-dark mb-6">Your Stay</h3>
                
                <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm mb-6">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider mb-1">Check-in</p>
                      <p className="font-medium text-apple-dark">{checkIn?.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider mb-1">Check-out</p>
                      <p className="font-medium text-apple-dark">{checkOut?.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-gray-100">
                    <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider mb-1">Guests</p>
                    <p className="font-medium text-apple-dark">{guests} Guests</p>
                  </div>
                </div>

                <div className="mt-auto pt-6 border-t border-gray-200 flex justify-between items-center">
                  <span className="text-lg font-semibold text-apple-dark">Total (EUR)</span>
                  <span className="text-3xl font-semibold text-apple-dark">€{totalCost.toLocaleString()}</span>
                </div>
              </div>

              {/* Form Section */}
              <div className="lg:col-span-3 p-8 md:p-12 order-1 lg:order-2">
                <h3 className="text-2xl font-semibold text-apple-dark mb-2">Guest Details</h3>
                <p className="text-gray-500 text-[15px] mb-8">Please enter your information to secure your reservation.</p>
                
                <form onSubmit={handleContactSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="flex flex-col">
                      <label htmlFor="firstName" className="text-sm font-semibold text-gray-600 mb-2">First Name</label>
                      <input 
                        id="firstName" type="text" required
                        value={formData.firstName}
                        onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                        className="bg-gray-50 border border-gray-200 focus:border-apple-blue focus:bg-white focus:ring-4 focus:ring-apple-blue/20 rounded-xl px-4 py-3 text-apple-dark outline-none transition-all"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="lastName" className="text-sm font-semibold text-gray-600 mb-2">Last Name</label>
                      <input 
                        id="lastName" type="text" required
                        value={formData.lastName}
                        onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                        className="bg-gray-50 border border-gray-200 focus:border-apple-blue focus:bg-white focus:ring-4 focus:ring-apple-blue/20 rounded-xl px-4 py-3 text-apple-dark outline-none transition-all"
                      />
                    </div>
                  </div>
                  
                  <div className="flex flex-col">
                    <label htmlFor="email" className="text-sm font-semibold text-gray-600 mb-2">Email Address</label>
                    <input 
                      id="email" type="email" required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="bg-gray-50 border border-gray-200 focus:border-apple-blue focus:bg-white focus:ring-4 focus:ring-apple-blue/20 rounded-xl px-4 py-3 text-apple-dark outline-none transition-all"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="phone" className="text-sm font-semibold text-gray-600 mb-2">Phone Number</label>
                    <input 
                      id="phone" type="tel" required
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="bg-gray-50 border border-gray-200 focus:border-apple-blue focus:bg-white focus:ring-4 focus:ring-apple-blue/20 rounded-xl px-4 py-3 text-apple-dark outline-none transition-all"
                    />
                  </div>

                  <div className="flex flex-col pt-2">
                    <button 
                      type="submit"
                      className="w-full bg-apple-dark text-white font-medium text-lg px-8 py-4 rounded-full hover:bg-black transition-all shadow-lg hover:shadow-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-apple-blue focus-visible:ring-offset-2 flex justify-center items-center gap-2"
                    >
                      Proceed to Payment
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                    </button>
                    <p className="text-center text-xs text-gray-400 mt-4 flex items-center justify-center gap-1.5">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                      You will be redirected to a secure payment gateway.
                    </p>
                  </div>
                </form>
              </div>

            </div>
          )}

          {/* STEP 3: PROCESSING / REDIRECTING */}
          {step === 'processing' && (
            <div className="p-16 md:p-32 flex flex-col items-center justify-center text-center animate-fade-in">
               <div className="w-20 h-20 border-4 border-gray-100 border-t-apple-blue rounded-full animate-spin mb-8"></div>
               <h3 className="text-3xl font-semibold tracking-tight text-apple-dark mb-3">Connecting to Secure Payment...</h3>
               <p className="text-gray-500 text-lg max-w-md mx-auto">
                 Please wait while we redirect you to complete your reservation for Villa Onar. Do not close this window.
               </p>
            </div>
          )}

        </div>
      </div>
    </section>
  );
};

export default Booking;
