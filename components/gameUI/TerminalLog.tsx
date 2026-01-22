import { useEffect, useRef } from "react";

interface TerminalLogProps {
  messages: Array<{
    id: string;
    text: string;
    type: "system" | "player" | "narrative" | "warning" | "error";
    timestamp?: string;
  }>;
}

const TerminalLog = ({ messages }: TerminalLogProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const getMessageStyle = (type: string) => {
    switch (type) {
      case "system":
        return "text-muted-foreground";
      case "player":
        return "text-primary terminal-text";
      case "narrative":
        return "text-foreground terminal-text";
      case "warning":
        return "text-accent";
      case "error":
        return "danger-text";
      default:
        return "text-foreground";
    }
  };

  const getPrefix = (type: string) => {
    switch (type) {
      case "system":
        return "[SYS]";
      case "player":
        return ">";
      case "narrative":
        return "";
      case "warning":
        return "[WARN]";
      case "error":
        return "[ERR]";
      default:
        return "";
    }
  };

  return (
    <div 
      ref={scrollRef}
      className="flex-1 overflow-y-auto p-4 space-y-2 bg-background/50 border border-border"
    >
      {messages.map((message, index) => (
        <div 
          key={message.id} 
          className={`${getMessageStyle(message.type)} text-lg leading-relaxed ${
            index === messages.length - 1 ? "fade-in-slow" : ""
          }`}
        >
          {message.timestamp && (
            <span className="text-muted-foreground text-sm mr-2">
              [{message.timestamp}]
            </span>
          )}
          <span className="mr-2">{getPrefix(message.type)}</span>
          <span className={message.type === "narrative" ? "flicker" : ""}>
            {message.text}
          </span>
        </div>
      ))}
      
      {/* Blinking cursor at bottom */}
      <div className="text-primary terminal-text blink-cursor text-lg">_</div>
    </div>
  );
};

export default TerminalLog;
