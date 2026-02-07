import { useEffect, useState } from "react";
import { Flame } from "lucide-react";

export const Preloader = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 40);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="preloader" data-testid="preloader">
      <div className="flex flex-col items-center">
        {/* Animated Logo */}
        <div className="relative mb-8">
          <Flame className="w-20 h-20 text-fire-red preloader-logo" />
          <div className="absolute inset-0 bg-fire-red blur-2xl opacity-30 animate-pulse" />
        </div>

        {/* Brand Name */}
        <h1 className="font-heading text-3xl font-bold uppercase tracking-widest text-chrome-white mb-8">
          Fire Moto
        </h1>

        {/* Progress Bar */}
        <div className="w-64 h-1 bg-white/10 overflow-hidden">
          <div
            className="h-full bg-fire-red transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Progress Text */}
        <div className="mt-4 font-body text-sm text-white/50">
          Carregando... {progress}%
        </div>

        {/* Loading Animation - Engine Pistons */}
        <div className="mt-8 flex gap-2">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-3 h-8 bg-fire-red/30"
              style={{
                animation: `pistonMove 0.6s ease-in-out ${i * 0.15}s infinite`,
              }}
            />
          ))}
        </div>

        <style>{`
          @keyframes pistonMove {
            0%, 100% { height: 32px; opacity: 0.3; }
            50% { height: 16px; opacity: 1; }
          }
        `}</style>
      </div>
    </div>
  );
};

export default Preloader;
