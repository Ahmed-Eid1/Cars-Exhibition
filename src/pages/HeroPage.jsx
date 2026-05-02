import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

export default function HeroPage() {
  const videoRef = useRef(null)
  const sectionRef = useRef(null)
  const overlayRef = useRef(null)
  const logoRef = useRef(null)
  const scrollLabelRef = useRef(null)

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
      style={{ height: '700vh', position: 'relative' }}
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
          src="/cinematic-optimized.mp4"

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
            filter: 'brightness(1.3)'
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

      </div>
    </section>
  )
}
