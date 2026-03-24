import { useState, useEffect, useRef } from "react";

const GLITCH_CHARS = "!<>-_\\/[]{}—=+*^?#@$%&";

export default function GlitchText({ text, className = "" }) {
  const [display, setDisplay] = useState(text);
  const [hovering, setHovering] = useState(false);
  const intervalRef = useRef(null);
  const iterationRef = useRef(0);

  useEffect(() => {
    if (hovering) {
      iterationRef.current = 0;
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        setDisplay(
          text
            .split("")
            .map((char, i) => {
              if (i < iterationRef.current) return text[i];
              if (char === " ") return " ";
              return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
            })
            .join("")
        );
        if (iterationRef.current >= text.length) clearInterval(intervalRef.current);
        iterationRef.current += 0.5;
      }, 30);
    } else {
      clearInterval(intervalRef.current);
      // We wrap this in a check to avoid unnecessary state updates if already matches
      setDisplay((prev) => (prev === text ? prev : text));
    }
    return () => clearInterval(intervalRef.current);
  }, [hovering, text]);

  return (
    <span
      className={className}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      style={{ cursor: "default", letterSpacing: "0.03em" }}
    >
      {display}
    </span>
  );
}
