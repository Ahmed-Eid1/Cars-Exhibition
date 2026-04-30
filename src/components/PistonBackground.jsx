import { useEffect } from 'react';

export default function PistonBackground() {
  useEffect(() => {
    // Create inline styles for the piston animation
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes pistonMove {
        from { top: 12px; }
        to { top: 140px; }
      }
      @keyframes pistonShimmer {
        0%, 100% { border-top-color: #E24B4A; }
        50% { border-top-color: #FF6B35; }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Order: 1-8-4-3-6-5-7-2 with delays
  const cylinderConfig = [
    { index: 0, delay: '0s' },    // 1
    { index: 1, delay: '0.175s' }, // 8
    { index: 2, delay: '0.075s' }, // 4
    { index: 3, delay: '0.25s' },  // 3
    { index: 4, delay: '0.1s' },   // 6
    { index: 5, delay: '0.3s' },   // 5
    { index: 6, delay: '0.225s' }, // 7
    { index: 7, delay: '0.35s' },  // 2
  ];

  return (
    <div
      className="piston-background"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center', // Centers vertically instead of sticking to the bottom
        justifyContent: 'center',
        pointerEvents: 'none',
        opacity: 0.4, // Reduced to 40% opacity
      }}
    >
      <div 
        style={{
          display: 'flex',
          gap: '18px',
          transform: 'scale(4.5)', // Scales up the engine block to fill the entire screen
          transformOrigin: 'center center',
        }}
      >
        {cylinderConfig.map((cfg, i) => (
          <div
            key={i}
            className="cylinder"
            style={{
              width: '48px',
              height: '200px',
              background: '#111',
              border: '1px solid #1f1f1f',
              borderRadius: '4px 4px 0 0',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              className="piston"
              style={{
                position: 'absolute',
                left: '4px',
                right: '4px',
                height: '44px',
                background: 'linear-gradient(180deg, #2a2a2a 0%, #1c1c1c 100%)',
                borderRadius: '3px',
                border: '2px solid transparent',
                borderTopColor: '#E24B4A',
                animation: 'pistonMove 0.5s ease-in-out infinite alternate',
                animationDelay: cfg.delay,
              }}
            >
              {/* Shimmer effect via pseudo-element animation */}
              <style>{`
                .cylinder:nth-child(${i + 1}) .piston {
                  animation: pistonMove 0.5s ease-in-out infinite alternate,
                             pistonShimmer 1s ease-in-out infinite;
                }
              `}</style>
            </div>
            <div
              className="rod"
              style={{
                position: 'absolute',
                left: '50%',
                width: '4px',
                background: '#1a1a1a',
                height: '80px',
                transform: 'translateX(-50%)',
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
