import React from 'react';

export default function MyProfilePage() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-8">
      <div className="w-full max-w-7xl">
        {/* 1200x628 Landing Page Service Banner */}
        <div className="relative w-full h-[628px] max-w-[1200px] mx-auto bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 rounded-2xl overflow-hidden shadow-2xl">
          
          {/* Dark blue tech background with soft gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-slate-900 to-purple-950"></div>
          
          {/* Subtle tech grid pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="techGrid" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                  <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#3b82f6" strokeWidth="0.5"/>
                  <circle cx="30" cy="30" r="1" fill="#3b82f6"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#techGrid)"/>
            </svg>
          </div>
          
          {/* Main content layout */}
          <div className="relative h-full flex items-center px-16">
            
            {/* Left side - Logo */}
            <div className="flex-1 flex items-center justify-center">
              <div className="relative">
                {/* Logo image with circular design */}
       <div className="relative z-10 w-40 h-40">
  <img 
    src="/images/logo2.png" 
    alt="Logo" 
    className="w-full h-full object-cover rounded-full"
  />
</div>
                
                {/* Subtle glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-2xl rounded-full -z-10"></div>
              </div>
            </div>
            
            {/* Right side - Text content */}
            <div className="flex-1 text-right">
              {/* Main heading */}
              <h1 className="text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
                Landing Page
              </h1>
              
              {/* Subtitle */}
              <p className="text-2xl text-white/80 font-light tracking-wide mb-8">
                100% Responsive &bull; Premium Design &bull; Fast Performance
              </p>
              
              {/* Price section with clean blue style */}
              <div className="inline-block relative">
                <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-xl px-8 py-4 rounded-2xl border border-blue-500/30 shadow-2xl">
                  <div className="flex items-center space-x-3">
                    <span className="text-white/90 font-medium text-lg">Landing Page</span>
                    <div className="w-px h-6 bg-blue-500/30"></div>
                    <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                      1,500
                    </span>
                    <span className="text-white/70 font-medium">THB</span>
                  </div>
                </div>
                
                {/* Glow effect behind price */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-500/30 blur-2xl rounded-2xl -z-10"></div>
              </div>
              
              {/* Additional benefits */}
              <div className="mt-8 space-y-2">
                <div className="flex items-center justify-end space-x-2">
                  <span className="text-blue-400 font-medium">Premium UI Design</span>
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                </div>
                <div className="flex items-center justify-end space-x-2">
                  <span className="text-blue-400 font-medium">High Conversion</span>
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                </div>
                <div className="flex items-center justify-end space-x-2">
                  <span className="text-blue-400 font-medium">Eye-catching Design</span>
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                </div>
              </div>
            </div>
            
          </div>
          
          {/* Dramatic lighting effects */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-blue-500/10 to-transparent"></div>
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-purple-500/10 to-transparent"></div>
          </div>
          
          {/* Corner decorations */}
          <div className="absolute top-4 left-4 w-16 h-16 border-t-2 border-l-2 border-blue-500/30 rounded-tl-lg"></div>
          <div className="absolute top-4 right-4 w-16 h-16 border-t-2 border-r-2 border-blue-500/30 rounded-tr-lg"></div>
          <div className="absolute bottom-4 left-4 w-16 h-16 border-b-2 border-l-2 border-blue-500/30 rounded-bl-lg"></div>
          <div className="absolute bottom-4 right-4 w-16 h-16 border-b-2 border-r-2 border-blue-500/30 rounded-br-lg"></div>
          
        </div>
        
      </div>
    </div>
  );
}