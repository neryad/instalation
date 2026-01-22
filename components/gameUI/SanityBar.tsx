import { useEffect, useState } from "react";

interface SanityBarProps {
  sanity: number;
  maxSanity?: number;
}

const SanityBar = ({ sanity, maxSanity = 100 }: SanityBarProps) => {
  const [glitching, setGlitching] = useState(false);
  const percentage = (sanity / maxSanity) * 100;
  const isCritical = percentage <= 30;
  const isLow = percentage <= 50;

  useEffect(() => {
    if (isCritical) {
      const interval = setInterval(() => {
        setGlitching(true);
        setTimeout(() => setGlitching(false), 150);
      }, 500 + Math.random() * 1000);
      return () => clearInterval(interval);
    }
  }, [isCritical]);

  const getSanityLabel = () => {
    if (percentage > 70) return "STABLE";
    if (percentage > 50) return "UNSTABLE";
    if (percentage > 30) return "CRITICAL";
    return "FAILING";
  };

  return (
    <div className={`w-full ${isCritical ? "sanity-critical" : ""}`}>
      <div className="flex justify-between items-center mb-1 text-sm">
        <span className={`terminal-text ${glitching ? "glitch-intense" : ""}`}>
          SANITY_LEVEL
        </span>
        <span className={`${isCritical ? "danger-text" : isLow ? "text-accent" : "terminal-text"} ${glitching ? "glitch-intense" : ""}`}>
          [{getSanityLabel()}]
        </span>
      </div>
      
      <div className="relative h-3 bg-secondary border border-border overflow-hidden sanity-bar">
        <div
          className={`h-full transition-all duration-500 ${
            isCritical 
              ? "bg-danger" 
              : isLow 
                ? "bg-accent" 
                : "bg-primary"
          } ${glitching ? "glitch-intense" : ""}`}
          style={{ width: `${percentage}%` }}
        />
        
        {/* Scanline effect on bar */}
        <div className="absolute inset-0 opacity-30 bg-[repeating-linear-gradient(0deg,transparent,transparent_1px,rgba(0,0,0,0.3)_1px,rgba(0,0,0,0.3)_2px)]" />
      </div>

      <div className="flex justify-between text-xs mt-1 text-muted-foreground">
        <span>{sanity.toFixed(0)}%</span>
        <span className={glitching ? "glitch" : ""}>{maxSanity}%</span>
      </div>
    </div>
  );
};

export default SanityBar;
