import EngineScene from './EngineScene'

export default function EngineSection({ scrollProgress }) {
  return (
    <div id="engine-section" style={{ height: '300vh', position: 'relative' }}>
      <EngineScene scrollProgress={scrollProgress} />
      <div style={{
        position: 'fixed',
        bottom: '40px',
        left: '50%',
        transform: 'translateX(-50%)',
        fontFamily: '"Bebas Neue", sans-serif',
        fontSize: '11px',
        letterSpacing: '0.4em',
        color: 'white',
        opacity: Math.max(0, 0.6 - scrollProgress * 6),
        pointerEvents: 'none',
        zIndex: 10
      }}>
        SCROLL TO DETONATE
      </div>
    </div>
  )
}
