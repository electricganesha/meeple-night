import { useMemo } from "react";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
}

export const StarField = () => {
  const stars = useMemo<Star[]>(() => {
    return Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 5,
      duration: Math.random() * 3 + 2,
      opacity: Math.random() * 0.5 + 0.3,
    }));
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      {stars.map((star) => (
        <div
          key={star.id}
          className="animate-twinkle"
          style={{
            position: "absolute",
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            borderRadius: "50%",
            background: "var(--foreground)",
            opacity: star.opacity,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
          }}
        />
      ))}
      {/* Special colored stars */}
      <div
        className="animate-twinkle"
        style={{
          position: "absolute",
          left: "15%",
          top: "20%",
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          background: "var(--primary)",
          opacity: 0.6,
          animationDelay: "0.5s",
        }}
      />
      <div
        className="animate-twinkle"
        style={{
          position: "absolute",
          left: "85%",
          top: "15%",
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          background: "var(--meeple-yellow)",
          opacity: 0.6,
          animationDelay: "1.5s",
        }}
      />
      <div
        className="animate-twinkle"
        style={{
          position: "absolute",
          left: "70%",
          top: "35%",
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          background: "var(--meeple-blue)",
          opacity: 0.6,
          animationDelay: "2.5s",
        }}
      />
    </div>
  );
};
