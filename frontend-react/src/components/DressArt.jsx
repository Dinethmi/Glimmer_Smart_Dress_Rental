import React, { useRef, useEffect } from "react";

export default function DressArt({ id, src = "/modern-trend-dress.jpg", opacity = 1, style }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;
      
      // Global background removal using aggressive Brightness + Neutrality (Saturation) check
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        
        // Check if the pixel is bright enough to be background/floor shadow (down to medium grey)
        if (r > 160 && g > 160 && b > 160) {
          // Check if the pixel is neutral (low saturation)
          const max = Math.max(r, g, b);
          const min = Math.min(r, g, b);
          const diff = max - min;
          
          // Allow up to 30 diff for slightly tinted studio lighting on the floor
          if (diff < 35) {
            // It's the background! Make it transparent.
            const whiteness = (r + g + b) / 3;
            // Smooth fade: pure white is fully transparent, darker greys fade out smoothly
            data[i + 3] = whiteness >= 235 ? 0 : Math.max(0, 255 - (whiteness - 160) * 3.5);
          }
        }
      }
      ctx.putImageData(imgData, 0, 0);
    };
  }, [src]);

  return (
    <div style={{ 
      width: "100%", height: "100%", opacity, display: "flex", alignItems: "center", justifyContent: "center", 
      pointerEvents: "none", transition: "opacity 1.5s ease-in-out", ...style
    }}>
      <canvas ref={canvasRef} style={{ 
        width: "100%", height: "100%", objectFit: "contain",
        pointerEvents: "none"
      }} />
    </div>
  );
}
