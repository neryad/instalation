import { useState, useEffect } from "react";
import SanityBar from "@/components/game/SanityBar";
import TerminalLog from "@/components/game/TerminalLog";
import TerminalInput from "@/components/game/TerminalInput";
import CRTOverlay from "@/components/game/CRTOverlay";

interface GameScreenProps {
  onEnd: (ending: "good" | "bad") => void;
}

const generateId = () => Math.random().toString(36).substr(2, 9);
const getTimestamp = () => {
  const now = new Date();
  return `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`;
};

const GameScreen = ({ onEnd }: GameScreenProps) => {
  const [sanity, setSanity] = useState(100);
  const [messages, setMessages] = useState<Array<{
    id: string;
    text: string;
    type: "system" | "player" | "narrative" | "warning" | "error";
    timestamp?: string;
  }>>([]);
  const [gamePhase, setGamePhase] = useState(0);

  useEffect(() => {
    // Initial messages
    const introSequence = [
      { delay: 500, text: "Initializing neural interface...", type: "system" as const },
      { delay: 1500, text: "Connection established.", type: "system" as const },
      { delay: 2500, text: "WARNING: Anomalous activity detected in Sector 7.", type: "warning" as const },
      { delay: 4000, text: "You wake up. The room is dark. Cold metal beneath your fingertips.", type: "narrative" as const },
      { delay: 6000, text: "A red light pulses somewhere in the distance.", type: "narrative" as const },
      { delay: 8000, text: "You don't remember how you got here.", type: "narrative" as const },
      { delay: 10000, text: "Type 'look', 'door', 'terminal', or 'wait' to interact.", type: "system" as const },
    ];

    introSequence.forEach(({ delay, text, type }) => {
      setTimeout(() => {
        setMessages(prev => [...prev, { id: generateId(), text, type, timestamp: getTimestamp() }]);
      }, delay);
    });
  }, []);

  const handleInput = (input: string) => {
    const lowerInput = input.toLowerCase();
    
    // Add player input to log
    setMessages(prev => [...prev, { 
      id: generateId(), 
      text: input, 
      type: "player", 
      timestamp: getTimestamp() 
    }]);

    // Process commands
    setTimeout(() => {
      let response: { text: string; type: "system" | "narrative" | "warning" | "error" };
      let sanityChange = 0;

      if (lowerInput.includes("look") || lowerInput.includes("examine")) {
        response = { 
          text: "Concrete walls. No windows. A heavy steel door with a faded '7' painted on it. Someone has scratched 'DON'T TRUST THE VOICE' into the metal.", 
          type: "narrative" 
        };
        sanityChange = -2;
      } else if (lowerInput.includes("door") || lowerInput.includes("open")) {
        if (gamePhase < 1) {
          response = { text: "The door is locked. A keypad glows weakly beside it. The code... you almost remember it.", type: "narrative" };
          sanityChange = -5;
          setGamePhase(1);
        } else if (gamePhase === 1) {
          response = { text: "You try the code: 7734. The door hisses open. Cold air rushes in.", type: "narrative" };
          setGamePhase(2);
        } else {
          if (sanity > 50) {
            response = { text: "You step through. Light floods your vision. You're free.", type: "narrative" };
            setTimeout(() => onEnd("good"), 2000);
          } else {
            response = { text: "You step through. But something follows. Something that was always with you.", type: "error" };
            setTimeout(() => onEnd("bad"), 2000);
          }
        }
      } else if (lowerInput.includes("terminal") || lowerInput.includes("computer")) {
        response = { 
          text: "The terminal flickers to life. 'SUBJECT 47: PROTOCOL AWAKENING IN PROGRESS. INTEGRATION: 73%. DO NOT RESIST.' You feel something shift in your mind.", 
          type: "warning" 
        };
        sanityChange = -15;
      } else if (lowerInput.includes("wait") || lowerInput.includes("hide")) {
        response = { text: "You wait. Time passes. The red light continues to pulse. You hear footsteps somewhere above.", type: "narrative" };
        sanityChange = -3;
      } else if (lowerInput.includes("escape") || lowerInput.includes("run")) {
        if (sanity > 50) {
          response = { text: "You run. Your legs carry you through corridors you somehow know.", type: "narrative" };
          setTimeout(() => onEnd("good"), 2000);
        } else {
          response = { text: "ERROR: SUBJECT ATTEMPTING UNAUTHORIZED ACTION. INITIATING CONTAINMENT.", type: "error" };
          setTimeout(() => onEnd("bad"), 2000);
        }
      } else if (lowerInput.includes("remember") || lowerInput.includes("think")) {
        response = { 
          text: "Fragments. A facility. White coats. Your name... was it ever yours? The code: 7734. HELL inverted.", 
          type: "narrative" 
        };
        sanityChange = -8;
      } else {
        response = { text: "Command not recognized. The system is watching.", type: "system" };
        sanityChange = -1;
      }

      setMessages(prev => [...prev, { id: generateId(), text: response.text, type: response.type, timestamp: getTimestamp() }]);
      
      if (sanityChange !== 0) {
        setSanity(prev => Math.max(0, Math.min(100, prev + sanityChange)));
      }

      if (sanity + sanityChange <= 0) {
        setTimeout(() => {
          setMessages(prev => [...prev, { 
            id: generateId(), 
            text: "CRITICAL FAILURE. SUBJECT INTEGRATION COMPLETE.", 
            type: "error", 
            timestamp: getTimestamp() 
          }]);
          setTimeout(() => onEnd("bad"), 2000);
        }, 1000);
      }
    }, 500);
  };

  return (
    <div className={`min-h-screen flex flex-col bg-background ${sanity <= 30 ? "distorted" : ""}`}>
      <CRTOverlay />
      
      {/* Header */}
      <header className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-xl terminal-text glitch">PROTOCOL: AWAKENING</h1>
          <span className="text-sm text-muted-foreground flicker">SECTOR 7</span>
        </div>
        <SanityBar sanity={sanity} />
      </header>

      {/* Terminal Log */}
      <TerminalLog messages={messages} />

      {/* Input */}
      <TerminalInput onSubmit={handleInput} placeholder="Enter command..." />

      {/* Status Bar */}
      <footer className="p-2 border-t border-border flex justify-between text-xs text-muted-foreground">
        <span className="glitch">SURVEILLANCE: ACTIVE</span>
        <span>PHASE: {gamePhase + 1}/3</span>
        <span className="flicker">SYS: NOMINAL</span>
      </footer>
    </div>
  );
};

export default GameScreen;
