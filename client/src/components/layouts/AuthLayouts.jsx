import React from "react";

const AuthLayouts = ({ children }) => {
  return (
    <div className="relative w-full h-screen overflow-hidden 
      bg-gradient-to-br from-[#03203C] via-[#021526] to-[#010A14]
      flex items-center justify-center">

      {/* --- Deep background vignette for cinematic depth --- */}
      <div className="absolute inset-0 bg-gradient-to-br 
        from-transparent via-[#00000060] to-[#000000A0] 
        pointer-events-none"></div>

      {/* --- Massive soft glow behind login card --- */}
      <div className="absolute w-[80%] h-[70%] 
        bg-[#0A3355]/40 rounded-[40px] blur-[140px]
        shadow-[0_0_200px_rgba(0,0,0,0.9)]
      "></div>

      {/* --- Blue energy blobs (stronger + darker glow) --- */}
      <div className="absolute top-[12%] left-[20%] w-64 h-64 
        bg-blue-500/20 rounded-full blur-[120px] 
        animate-float-slow"></div>

      <div className="absolute top-[45%] right-[10%] w-96 h-96 
        bg-indigo-500/25 rounded-full blur-[140px]
        animate-float-med"></div>

      <div className="absolute bottom-[8%] left-[30%] w-72 h-72 
        bg-cyan-400/15 rounded-full blur-[150px] 
        animate-float-fast"></div>

      {/* --- Soft curved shapes (wiggly abstract strokes) --- */}
      <div className="absolute top-24 right-[38%] w-48 h-48
        bg-gradient-to-r from-blue-700/40 to-blue-400/40
        blur-2xl rounded-full opacity-60 animate-wiggle-slow"></div>

      <div className="absolute bottom-36 right-[18%] w-56 h-56 
        bg-blue-500/25 blur-2xl rounded-full opacity-50 
        animate-wiggle-med"></div>

      <div className="absolute bottom-10 left-[38%] w-48 h-48 
        bg-cyan-300/20 blur-2xl rounded-full opacity-40 
        animate-wiggle-fast"></div>

      {/* --- Glass Morph Login Container --- */}
      <div
        className="
          relative z-20 w-full max-w-md p-10 rounded-3xl
          backdrop-blur-2xl bg-white/5 
          border border-white/15 
          shadow-[0_0_60px_rgba(0,0,0,0.5)]
        "
      >
        {children}
      </div>
    </div>
  );
};

export default AuthLayouts;
