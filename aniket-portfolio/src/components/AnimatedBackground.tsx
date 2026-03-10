"use client";

import React from 'react';

const AnimatedBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 bg-black">
      <div 
        className="absolute inset-0 opacity-40 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(9,9,11,1)), url('https://images.unsplash.com/photo-1574943320219-553eb213f72d?q=80&w=2500')` 
        }}
      />
      {/* Animated Data Overlay */}
      <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] pointer-events-none"></div>
    </div>
  );
};

export default AnimatedBackground;