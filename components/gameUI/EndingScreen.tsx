import { useState, useEffect } from "react";
import CRTOverlay from "@/components/game/CRTOverlay";

interface EndingScreenProps {
  ending: "good" | "bad";
  onRestart: () => void;
}

const EndingScreen = ({ ending, onRestart }: EndingScreenProps) => {
  const [showContent, setShowContent] = useState(false);
  const [textRevealed, setTextRevealed] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowContent(true), 1000);
    setTimeout(() => setTextRevealed(true), 2500);
  }, []);

  if (ending === "good") {
    return (
      <div className="min-h-screen flex flex-col relative overflow-hidden bg-background">
        <CRTOverlay />
        
        {/* White light effect */}
        <div 
          className={`absolute inset-0 z-10 transition-opacity duration-3000 ${showContent ? "opacity-100" : "opacity-0"}`}
          style={{
            background: "radial-gradient(ellipse at center, rgba(255,255,255,0.1) 0%, transparent 70%)",
          }}
        />
        
        <div className={`relative z-20 flex-1 flex flex-col items-center justify-center p-8 transition-opacity duration-2000 ${showContent ? "opacity-100" : "opacity-0"}`}>
          
          {/* Main text */}
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-terminal text-safe tracking-wider mb-8" style={{ textShadow: "0 0 20px hsl(180 100% 70% / 0.5)" }}>
              You escaped.
            </h1>
            
            {textRevealed && (
              <div className="space-y-4 text-muted-foreground text-lg fade-in-slow">
                <p>The facility is behind you now.</p>
                <p>The sunlight feels foreign on your skin.</p>
                <p className="text-sm mt-8">But sometimes, in the quiet moments...</p>
                <p className="text-sm text-safe/50">you still hear the pulse of that red light.</p>
              </div>
            )}
          </div>

          {/* Restart button */}
          <button
            onClick={onRestart}
            className={`mt-16 px-8 py-3 border border-safe/30 text-safe/70 hover:bg-safe/10 transition-all duration-300 ${textRevealed ? "opacity-100" : "opacity-0"}`}
          >
            <span className="font-terminal tracking-wider">REINITIALIZE</span>
          </button>

          {/* Status */}
          <div className="mt-12 text-xs text-muted-foreground text-center">
            <p>SUBJECT STATUS: RELEASED</p>
            <p>INTEGRATION: REJECTED</p>
          </div>
        </div>
      </div>
    );
  }

  // Bad ending
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-background">
      <CRTOverlay />
      
      {/* Red pulse effect */}
      <div 
        className={`absolute inset-0 z-10 red-alert ${showContent ? "opacity-100" : "opacity-0"}`}
        style={{ animationDuration: "1s" }}
      />
      
      {/* Distortion overlay */}
      <div className={`absolute inset-0 z-15 ${showContent ? "distorted" : ""}`} />
      
      <div className={`relative z-20 flex-1 flex flex-col items-center justify-center p-8 transition-opacity duration-1000 ${showContent ? "opacity-100" : "opacity-0"}`}>
        
        {/* Main text - glitched */}
        <div className="text-center">
          <h1 className={`text-4xl md:text-6xl font-terminal danger-text tracking-wider mb-8 ${showContent ? "glitch-intense" : ""}`}>
            You were absorbed.
          </h1>
          
          {textRevealed && (
            <div className="space-y-4 text-danger/70 text-lg fade-in-slow">
              <p className="glitch">INTEGRATION: COMPLETE</p>
              <p className="glitch" style={{ animationDelay: "0.1s" }}>SUBJECT 47 IS NOW PART OF THE PROTOCOL</p>
              <p className="text-sm mt-8 text-muted-foreground">There was never an escape.</p>
              <p className="text-sm text-danger/50 glitch">Only awakening.</p>
            </div>
          )}
        </div>

        {/* Error messages */}
        {textRevealed && (
          <div className="mt-8 text-xs text-danger/50 text-center space-y-1 glitch">
            <p>ERROR: CONSCIOUSNESS FRAGMENTED</p>
            <p>ERROR: IDENTITY CORRUPTED</p>
            <p>ERROR: [DATA EXPUNGED]</p>
          </div>
        )}

        {/* Restart button */}
        <button
          onClick={onRestart}
          className={`mt-16 px-8 py-3 border border-danger/30 text-danger/70 hover:bg-danger/10 transition-all duration-300 glitch ${textRevealed ? "opacity-100" : "opacity-0"}`}
        >
          <span className="font-terminal tracking-wider">TRY AGAIN?</span>
        </button>

        {/* Status */}
        <div className="mt-12 text-xs text-danger/30 text-center">
          <p>SUBJECT STATUS: ABSORBED</p>
          <p>INTEGRATION: 100%</p>
        </div>
      </div>

      {/* Corner warnings */}
      <div className="absolute top-4 left-4 text-xs text-danger/40 z-30 glitch">
        <p>FATAL ERROR</p>
        <p>FATAL ERROR</p>
        <p>FATAL ERROR</p>
      </div>
      
      <div className="absolute bottom-4 right-4 text-xs text-danger/40 z-30 glitch">
        <p>GAME OVER</p>
        <p>GAME OVER</p>
      </div>
    </div>
  );
};

export default EndingScreen;
