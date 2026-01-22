import { useState, KeyboardEvent } from "react";

interface TerminalInputProps {
  onSubmit: (input: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

const TerminalInput = ({ onSubmit, disabled = false, placeholder = "Enter command..." }: TerminalInputProps) => {
  const [input, setInput] = useState("");

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && input.trim()) {
      onSubmit(input.trim());
      setInput("");
    }
  };

  return (
    <div className="border border-border bg-secondary/50 p-4">
      <div className="flex items-center gap-2 text-lg">
        <span className="text-primary terminal-text">&gt;</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder={placeholder}
          className="terminal-input flex-1 text-lg terminal-text"
          autoFocus
        />
        <span className="text-primary terminal-text blink-cursor" />
      </div>
      
      <div className="mt-2 text-xs text-muted-foreground flex justify-between">
        <span>PRESS [ENTER] TO SUBMIT</span>
        <span className="glitch">CONNECTION: ACTIVE</span>
      </div>
    </div>
  );
};

export default TerminalInput;
