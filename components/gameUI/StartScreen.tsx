import { useState, useEffect } from "react";
import CRTOverlay from "@/components/game/CRTOverlay";
import facilityBg from "@/assets/facility-corridor.jpg";

interface StartScreenProps {
  onStart: () => void;
}

const StartScreen = ({ onStart }: StartScreenProps) => {
  const [showContent, setShowContent] = useState(false);
  const [glitchTitle, setGlitchTitle] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowContent(true), 500);
    
    // Random title glitch
    const glitchInterval = setInterval(() => {
      setGlitchTitle(true);
      setTimeout(() => setGlitchTitle(false), 150);
    }, 3000 + Math.random() * 2000);

    return () => clearInterval(glitchInterval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <CRTOverlay />
      
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${facilityBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(3px) brightness(0.3)",
        }}
      />
      
      {/* Red overlay */}
      <div className="absolute inset-0 z-10 bg-danger/10 red-alert" style={{ animationDuration: "4s" }} />
      
      {/* Content */}
      <div className={`relative z-20 flex-1 flex flex-col items-center justify-center p-8 transition-opacity duration-1000 ${showContent ? "opacity-100" : "opacity-0"}`}>
        
        {/* Title */}
        <div className="text-center mb-12">
          <h1 
            className={`text-4xl md:text-6xl font-terminal terminal-text mb-4 tracking-wider ${glitchTitle ? "glitch-intense" : "glitch"}`}
          >
            PROTOCOL:
          </h1>
          <h1 
            className={`text-5xl md:text-7xl font-terminal terminal-text tracking-widest ${glitchTitle ? "glitch-intense" : ""}`}
          >
            AWAKENING
          </h1>
          
          {/* Decorative line */}
          <div className="mt-6 h-px w-64 mx-auto bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
        </div>

        {/* Subtitle */}
        <p className="text-muted-foreground text-lg md:text-xl text-center max-w-md mb-12 flicker">
          The system is watching your decisions.
        </p>

        {/* Warning text */}
        <div className="text-xs text-danger/70 mb-8 text-center space-y-1">
          <p className="glitch">WARNING: NEURAL INTERFACE REQUIRED</p>
          <p>UNAUTHORIZED ACCESS WILL BE LOGGED</p>
        </div>

        {/* Start Button */}
        <button
          onClick={onStart}
          className="group relative px-12 py-4 border-2 border-primary bg-transparent hover:bg-primary/10 transition-all duration-300"
        >
          <span className="text-2xl font-terminal terminal-text tracking-widest group-hover:glitch">
            INIT SEQUENCE
          </span>
          
          {/* Button glow effect */}
          <div className="absolute inset-0 border-glow opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </button>

        {/* Bottom text */}
        <div className="mt-16 text-xs text-muted-foreground text-center space-y-2">
          <p>FACILITY: [REDACTED] | SECTOR: 7</p>
          <p className="flicker">SUBJECT STATUS: PENDING INTEGRATION</p>
        </div>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-4 left-4 text-xs text-muted-foreground z-20">
        <p>SYS_VER: 2.7.4</p>
        <p className="glitch">UPLINK: ACTIVE</p>
      </div>
      
      <div className="absolute top-4 right-4 text-xs text-muted-foreground text-right z-20">
        <p>DATE: [CORRUPTED]</p>
        <p>TIME: ██:██:██</p>
      </div>

      <div className="absolute bottom-4 left-4 text-xs text-danger/50 z-20">
        <p>⚠ CONTAINMENT BREACH: LEVEL 3</p>
      </div>

      <div className="absolute bottom-4 right-4 text-xs text-muted-foreground z-20 flicker">
        <p>MONITORING: 47 SUBJECTS</p>
      </div>
    </div>
  );
};

export default StartScreen;
