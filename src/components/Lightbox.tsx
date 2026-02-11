import React, { useEffect, useState, useRef } from 'react';
import { getImageUrl, ALL_IMAGE_IDS } from '../constants';

interface LightboxProps {
  selectedIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

const Lightbox: React.FC<LightboxProps> = ({ selectedIndex, onClose, onNavigate }) => {
  const [loadedImageIds, setLoadedImageIds] = useState<Set<string>>(new Set());
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  
  // Navigation Animation State
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  
  const dialogRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const triggerElementRef = useRef<HTMLElement | null>(null);
  const lastDistRef = useRef<number>(0);

  // Determine navigation direction for slide animations
  useEffect(() => {
    if (selectedIndex !== null && prevIndex !== null && selectedIndex !== prevIndex) {
      const isForward = (selectedIndex > prevIndex) || (prevIndex === ALL_IMAGE_IDS.length - 1 && selectedIndex === 0);
      const isBackward = (selectedIndex < prevIndex) || (prevIndex === 0 && selectedIndex === ALL_IMAGE_IDS.length - 1);
      
      if (isForward) setDirection('right');
      else if (isBackward) setDirection('left');
    } else if (selectedIndex !== null && prevIndex === null) {
      setDirection(null);
    }
    setPrevIndex(selectedIndex);
  }, [selectedIndex]);

  // Reset zoom state when changing images
  useEffect(() => {
    setScale(1);
    setOffset({ x: 0, y: 0 });
    setIsDragging(false);
  }, [selectedIndex]);

  // Keyboard navigation & Focus management
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === 'Escape') onClose();
      if (scale === 1) { 
        if (e.key === 'ArrowRight') handleNext();
        if (e.key === 'ArrowLeft') handlePrev();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    if (selectedIndex !== null) {
      if (!triggerElementRef.current) {
        triggerElementRef.current = document.activeElement as HTMLElement;
      }
      document.body.style.overflow = 'hidden';
      setTimeout(() => dialogRef.current?.focus(), 0);
    } else {
      document.body.style.overflow = 'unset';
      if (triggerElementRef.current) {
        triggerElementRef.current.focus();
        triggerElementRef.current = null;
      }
    }
    
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, onClose, onNavigate, scale]);

  const handleNext = () => {
    onNavigate((selectedIndex! + 1) % ALL_IMAGE_IDS.length);
  };

  const handlePrev = () => {
    onNavigate((selectedIndex! - 1 + ALL_IMAGE_IDS.length) % ALL_IMAGE_IDS.length);
  };

  // --- Zoom Logic ---

  // Zoom to Mouse Position
  const handleWheel = (e: React.WheelEvent) => {
    e.stopPropagation();
    
    const delta = -e.deltaY;
    const factor = Math.pow(1.002, delta); // Smooth exponential zoom
    const nextScale = Math.min(Math.max(1, scale * factor), 5);

    if (nextScale !== scale) {
      const rect = imageRef.current?.getBoundingClientRect();
      if (rect) {
        // Find cursor position relative to image center
        const mouseX = e.clientX - (rect.left + rect.width / 2);
        const mouseY = e.clientY - (rect.top + rect.height / 2);
        
        // Calculate new offset to keep point under cursor
        const ratio = nextScale / scale;
        const newOffsetX = offset.x - (mouseX * ratio - mouseX);
        const newOffsetY = offset.y - (mouseY * ratio - mouseY);

        setScale(nextScale);
        setOffset(nextScale === 1 ? { x: 0, y: 0 } : { x: newOffsetX, y: newOffsetY });
      }
    }
  };

  // Double click to toggle zoom
  const handleDoubleClick = (e: React.MouseEvent) => {
    if (scale > 1) {
      setScale(1);
      setOffset({ x: 0, y: 0 });
    } else {
      setScale(2.5);
      // Zoom towards click point
      const rect = imageRef.current?.getBoundingClientRect();
      if (rect) {
        const mouseX = e.clientX - (rect.left + rect.width / 2);
        const mouseY = e.clientY - (rect.top + rect.height / 2);
        setOffset({ x: -mouseX * 1.5, y: -mouseY * 1.5 });
      }
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale > 1) {
      setIsDragging(true);
      setStartPos({ x: e.clientX - offset.x, y: e.clientY - offset.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && scale > 1) {
      setOffset({
        x: e.clientX - startPos.x,
        y: e.clientY - startPos.y
      });
    }
  };

  const handleMouseUp = () => setIsDragging(false);

  // Pinch-to-Zoom & Touch Panning
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const dist = Math.hypot(
        e.touches[0].pageX - e.touches[1].pageX,
        e.touches[0].pageY - e.touches[1].pageY
      );
      lastDistRef.current = dist;
    } else if (e.touches.length === 1 && scale > 1) {
      setIsDragging(true);
      setStartPos({ 
        x: e.touches[0].pageX - offset.x, 
        y: e.touches[0].pageY - offset.y 
      });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const dist = Math.hypot(
        e.touches[0].pageX - e.touches[1].pageX,
        e.touches[0].pageY - e.touches[1].pageY
      );
      const delta = (dist - lastDistRef.current) * 0.01;
      const newScale = Math.min(Math.max(1, scale + delta), 5);
      setScale(newScale);
      lastDistRef.current = dist;
      if (newScale === 1) setOffset({ x: 0, y: 0 });
    } else if (e.touches.length === 1 && isDragging && scale > 1) {
      setOffset({
        x: e.touches[0].pageX - startPos.x,
        y: e.touches[0].pageY - startPos.y
      });
    }
  };

  if (selectedIndex === null) return null;

  const currentId = ALL_IMAGE_IDS[selectedIndex];
  const isLoaded = loadedImageIds.has(currentId);
  const transitionClass = direction === 'right' 
    ? 'animate-slide-right' 
    : direction === 'left' 
      ? 'animate-slide-left' 
      : 'animate-fade-in';

  return (
    <div 
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label="Interactive Gallery Lightbox"
      tabIndex={-1}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 outline-none overflow-hidden" 
      onClick={onClose}
      onWheel={handleWheel}
    >
      {/* Controls */}
      <div className="absolute top-0 inset-x-0 h-20 flex items-center justify-between px-6 z-[120] bg-gradient-to-b from-black/60 to-transparent pointer-events-none">
        <div className="text-white/70 text-sm font-medium tracking-tight pointer-events-auto">
          {selectedIndex + 1} / {ALL_IMAGE_IDS.length}
        </div>
        <div className="flex items-center gap-4 pointer-events-auto">
          {scale > 1 && (
             <button 
              onClick={(e) => { e.stopPropagation(); setScale(1); setOffset({x:0, y:0}); }}
              className="text-white/90 bg-white/10 hover:bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold transition-all"
             >
              Reset Zoom
             </button>
          )}
          <button 
            onClick={onClose} 
            className="text-white/90 hover:text-white p-2 transition-transform hover:scale-110 active:scale-95"
            aria-label="Close"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
      
      {scale === 1 && (
        <>
          <button 
            onClick={(e) => { e.stopPropagation(); handlePrev(); }} 
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white p-4 z-[110] transition-all rounded-full group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-blue"
            aria-label="Previous"
          >
            <svg className="w-10 h-10 transform transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button 
            onClick={(e) => { e.stopPropagation(); handleNext(); }} 
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white p-4 z-[110] transition-all rounded-full group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-blue"
            aria-label="Next"
          >
            <svg className="w-10 h-10 transform transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Main Image Container */}
      <div 
        key={`container-${currentId}`}
        ref={imageContainerRef}
        className={`relative w-full h-full flex items-center justify-center p-4 md:p-16 select-none will-change-transform ${transitionClass} ${scale > 1 ? 'cursor-grab active:cursor-grabbing' : 'cursor-default'}`} 
        onClick={(e) => e.stopPropagation()}
        onDoubleClick={handleDoubleClick}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={() => setIsDragging(false)}
        style={{
          transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
          transition: isDragging ? 'none' : 'transform 0.3s cubic-bezier(0.2, 0, 0.2, 1)',
        }}
      >
        <img 
          key={`placeholder-${currentId}`}
          src={getImageUrl(currentId, 'w600')} 
          alt="" 
          className={`absolute max-w-full max-h-full object-contain blur-2xl transition-opacity duration-700 ${isLoaded ? 'opacity-0' : 'opacity-100'}`}
          aria-hidden="true"
        />

        <img 
          ref={imageRef}
          key={`full-${currentId}`}
          src={getImageUrl(currentId, 'w1920')} 
          alt={`Villa Onar detail view ${selectedIndex + 1}`} 
          className={`relative z-10 max-w-full max-h-full object-contain drop-shadow-2xl transition-opacity duration-300 pointer-events-none ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setLoadedImageIds(prev => new Set(prev).add(currentId))}
          decoding="async"
        />
      </div>

      {/* Scale Indicator */}
      {scale > 1.05 && (
        <div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-xl border border-white/20 text-white/90 text-[10px] uppercase tracking-widest px-4 py-2 rounded-full z-[120] pointer-events-none transition-all animate-fade-in"
        >
          Zoom: {(scale * 100).toFixed(0)}%
        </div>
      )}
    </div>
  );
};

export default Lightbox;
