import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

export default function HeroPage() {
  const videoRef = useRef(null)
  const sectionRef = useRef(null)
  const overlayRef = useRef(null)
  const logoRef = useRef(null)
  const scrollLabelRef = useRef(null)

  const driveRef = useRef(null)
  const beyondRef = useRef(null)
  const builtRef = useRef(null)
  const estRef = useRef(null)
  const controlRef = useRef(null)
  const chaosRef = useRef(null)
  const taglineRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    const section = sectionRef.current
    if (!video || !section) return

    video.pause()
    video.currentTime = 0

    let rafId = null
    let lastProgress = -1
    let targetTime = 0

    const getProgress = () => {
      const rect = section.getBoundingClientRect()
      const sectionHeight = section.offsetHeight - window.innerHeight
      const scrolled = -rect.top
      return Math.min(Math.max(scrolled / sectionHeight, 0), 1)
    }

    const updateFrame = () => {
      if (!video.duration) return

      const progress = getProgress()

      if (Math.abs(progress - lastProgress) < 0.002) return
      lastProgress = progress
      const clampedProgress = Math.min(progress, 0.95)
      targetTime = clampedProgress * video.duration

      if (!video.seeking) {
        video.currentTime = targetTime
      }

      if (overlayRef.current) {
        const fadeIn = progress > 0.85 ? (progress - 0.85) / 0.15 : 0
        const fadeOut = Math.max(0, 0.6 - progress * 0.8)
        overlayRef.current.style.opacity = Math.max(fadeOut, fadeIn)
      }
      if (logoRef.current) {
        logoRef.current.style.opacity = Math.max(0, 1 - progress * 3)
        logoRef.current.style.transform = `translateY(${progress * -40}px)`
      }
      if (scrollLabelRef.current) {
        scrollLabelRef.current.style.opacity = Math.max(0, 0.6 - progress * 4)
      }

      const clamp = (v, a, b) => Math.min(Math.max(v, a), b)
      const inv = (a, b, v) => clamp((v - a) / (b - a), 0, 1)
      const lerp = (a, b, t) => a + (b - a) * t

      // DRIVE — slides in from right
      if (driveRef.current) {
        const flyIn = inv(0, 0.15, progress)
        const fadeOut = inv(0.25, 0.38, progress)
        driveRef.current.style.transform = `translateX(${lerp(120, 0, flyIn)}vw)`
        driveRef.current.style.opacity = flyIn > 0 ? Math.max(0, 1 - fadeOut) : 0
      }

      // BEYOND — rises from bottom
      if (beyondRef.current) {
        const flyIn = inv(0.04, 0.20, progress)
        const fadeOut = inv(0.28, 0.40, progress)
        beyondRef.current.style.transform = `translateY(${lerp(120, 0, flyIn)}px)`
        beyondRef.current.style.opacity = flyIn > 0 ? Math.max(0, 1 - fadeOut) : 0
      }

      // BUILT FOR SPEED — fade only
      if (builtRef.current) {
        const show = inv(0.63, 0.72, progress)
        const hide = inv(0.85, 0.94, progress)
        builtRef.current.style.opacity = Math.max(0, Math.min(show, 1 - hide))
      }

      // EST. 2024 — fade only
      if (estRef.current) {
        const show = inv(0.65, 0.74, progress)
        const hide = inv(0.85, 0.94, progress)
        estRef.current.style.opacity = Math.max(0, Math.min(show, 1 - hide))
      }

      // CONTROL — slides in from right
      if (controlRef.current) {
        const flyIn = inv(0.65, 0.76, progress)
        const hide = inv(0.85, 0.94, progress)
        controlRef.current.style.transform = `translateX(${lerp(100, 0, flyIn)}vw)`
        controlRef.current.style.opacity = flyIn > 0 ? Math.max(0, 1 - hide) : 0
      }

      // THE CHAOS — rises from bottom
      if (chaosRef.current) {
        const flyIn = inv(0.68, 0.79, progress)
        const hide = inv(0.85, 0.94, progress)
        chaosRef.current.style.transform = `translateY(${lerp(120, 0, flyIn)}px)`
        chaosRef.current.style.opacity = flyIn > 0 ? Math.max(0, 1 - hide) : 0
      }

      // POWER. PRECISION. DOMINANCE. — fade only
      if (taglineRef.current) {
        const show = inv(0.74, 0.82, progress)
        const hide = inv(0.86, 0.94, progress)
        taglineRef.current.style.opacity = Math.max(0, Math.min(show, 1 - hide))
      }
    }

    const handleSeeked = () => {
      if (Math.abs(video.currentTime - targetTime) > 0.05) {
        video.currentTime = targetTime
      }
    }

    const handleScroll = () => {
      if (rafId) cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(updateFrame)
    }

    video.addEventListener('seeked', handleSeeked)
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', handleScroll)
      video.removeEventListener('seeked', handleSeeked)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{ height: '400vh', position: 'relative' }}
    >
      {/* Sticky video container */}
      <div style={{
        position: 'sticky',
        top: 0,
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        background: '#000'
      }}>

        {/* Video */}
        <video
          ref={videoRef}
          src="https://vjfsex2gwdbfdpw9.private.blob.vercel-storage.com/cinematic-optimized.mp4"

          muted
          playsInline
          preload="auto"
          onLoadedMetadata={() => { videoRef.current.pause() }}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            pointerEvents: 'none',
            filter: 'brightness(1.2) contrast(1.4) saturate(0.7) '
          }}
        />

        {/* Dark overlay — fades as scroll progresses */}
        <div
          ref={overlayRef}
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.75) 100%)',
            transition: 'opacity 0.1s linear',
            pointerEvents: 'none'
          }}
        />

        {/* Logo — top left, fades out on scroll */}


        {/* Scroll label — bottom center, fades out quickly */}
        <div
          ref={scrollLabelRef}
          style={{
            position: 'absolute',
            bottom: 40,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 12,
            transition: 'opacity 0.2s ease',
            zIndex: 10,
            pointerEvents: 'none'
          }}
        >
          {/* Animated chevron */}
          <svg
            width="24"
            height="14"
            viewBox="0 0 24 14"
            fill="none"
            style={{ animation: 'chevronBob 1.4s ease-in-out infinite' }}
          >
            <path
              d="M2 2L12 12L22 2"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span style={{
            fontFamily: '"Bebas Neue", sans-serif',
            fontSize: 11,
            letterSpacing: '0.4em',
            color: 'rgba(255,255,255,0.5)'
          }}>
            SCROLL TO BEGIN
          </span>
        </div>
        {/* NOS */}
        <div ref={driveRef} style={{
          position: 'absolute', top: '60%', right: '8%',
          fontFamily: '"RaceFont", "Bebas Neue", sans-serif',
          fontSize: 'clamp(80px, 13vw, 130px)',
          color: '#ffffff', lineHeight: 1, opacity: 0, zIndex: 5,
          textShadow: '0 0 60px rgba(239,159,39,0.4), 2px 2px 0 rgba(0,0,0,0.8)',
          pointerEvents: 'none', willChange: 'transform, opacity'
        }}>NOS</div>

        {/* TURBO */}
        <div ref={beyondRef} style={{
          position: 'absolute', top: 'calc(60% + clamp(80px, 13vw, 120px))', right: '8%',
          fontFamily: '"RaceFont", "Bebas Neue", sans-serif',
          fontSize: 'clamp(80px, 13vw, 150px)',
          color: 'darkorange', lineHeight: 1, opacity: 0, zIndex: 5,
          textShadow: '0 0 80px rgba(239,159,39,0.8)',
          pointerEvents: 'none', willChange: 'transform, opacity'
        }}>TURBO</div>

        {/* BUILT FOR SPEED */}
        <div ref={builtRef} style={{
          position: 'absolute', top: 28, left: 50,
          fontFamily: '"RaceFont", "Bebas Neue", sans-serif',
          fontSize: 13, letterSpacing: '0.22em',
          color: 'lightgray', opacity: 0, zIndex: 10,
          display: 'flex', alignItems: 'center', gap: 10,
          pointerEvents: 'none'
        }}>
          <svg width="32" height="12" viewBox="0 0 32 12">
            {[0, 1, 2, 3, 4, 5, 6].map(i => (
              <rect key={i} x={i * 5} y={0} width={3} height={12} fill="white" opacity={0.7} />
            ))}
          </svg>
          BUILT FOR SPEED
        </div>

        {/* EST. 2024 */}
        <div ref={estRef} style={{
          position: 'absolute', top: 28, right: 32,
          fontFamily: '"RaceFont", "Bebas Neue", sans-serif',
          fontSize: 13, letterSpacing: '0.22em',
          color: 'lightgray', opacity: 0, zIndex: 10,
          pointerEvents: 'none'
        }}>EST. 2026</div>

        {/* CARS */}
        <div ref={controlRef} style={{
          position: 'absolute', bottom: '20%', right: '2%',
          fontFamily: '"RaceFont", "Bebas Neue", sans-serif',
          fontSize: 'clamp(40px, 10vw, 100px)',
          color: '#ffffff', lineHeight: 1, opacity: 0, zIndex: 5,
          textShadow: '3px 3px 0 rgba(0,0,0,0.9)',
          pointerEvents: 'none', willChange: 'transform, opacity'
        }}>CARS</div>

        {/* THE EXHIBITION */}
        <div ref={chaosRef} style={{
          position: 'absolute',
          bottom: 'calc(15% - clamp(60px, 10vw, 80px) * 0.9)',
          right: '3%',
          fontFamily: '"RaceFont", "Bebas Neue", sans-serif',
          fontSize: 'clamp(60px, 10vw, 120px)',
          fontStyle: 'italic', color: 'darkorange', lineHeight: 1, opacity: 0, zIndex: 5,
          textShadow: '0 0 80px red',
        }}>EXHIBITION</div>

        {/* POWER. PRECISION. DOMINANCE. */}
        <div ref={taglineRef} style={{
          position: 'absolute',
          bottom: 'calc(30% - clamp(60px, 10vw, 120px) * 1.85)',
          right: '6%',
          fontFamily: '"RaceFont", "Bebas Neue", sans-serif',
          fontSize: 13, letterSpacing: '0.25em',
          color: 'rgba(255,255,255,0.7)', opacity: 0, zIndex: 5,
          pointerEvents: 'none'
        }}>SAVAGERY. LUXURY. POWER.</div>

      </div>
    </section>
  )
}
