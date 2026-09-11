import React from "react";

export default function GlimmerLogo({ size = 200 }) {
  return (
    <div style={{ 
      display: "flex", alignItems: "center", pointerEvents: "none",
      background: "rgba(0, 0, 0, 0.6)", // Darken the black background slightly
      padding: "5px 15px",
      borderRadius: 16,
      border: "1px solid rgba(255, 215, 0, 0.4)", // Golden glassy border
      boxShadow: "0 4px 15px rgba(212, 175, 55, 0.3)", // Shiny glassy glow
      backdropFilter: "blur(8px)" // Glassmorphism
    }}>
      <img 
        src="/logo2.png" 
        alt="Glimmer Logo" 
        style={{ 
          width: size, 
          objectFit: "contain",
          filter: "contrast(1.1) brightness(1.05)" 
        }} 
      />
    </div>
  );
}
